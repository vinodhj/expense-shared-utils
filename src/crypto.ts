export async function generateHmacSignature(
  secret: string,
  payload: string
): Promise<string> {
  const encoder = new TextEncoder();

  // Import the secret key as a HMAC key
  const secretKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  // Generate the signature
  const signatureBuffer = await crypto.subtle.sign(
    { name: "HMAC", hash: "SHA-256" },
    secretKey,
    encoder.encode(payload)
  );

  // Convert signature to hex string
  return Array.from(new Uint8Array(signatureBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function generateNonce(length: number = 16): string {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
    ""
  );
}
