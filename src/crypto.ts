export async function generateHmacSignature(
  secret: string,
  payload: string
): Promise<string> {
  // Validate input parameters
  if (!secret) {
    throw new Error("HMAC signature generation failed: Secret key is required");
  }
  if (!payload) {
    throw new Error("HMAC signature generation failed: Payload is required");
  }

  try {
    const encoder = new TextEncoder();

    // Import the secret key as a HMAC key
    const secretKey = await crypto.subtle
      .importKey(
        "raw",
        encoder.encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
      )
      .catch((error) => {
        throw new Error(
          `HMAC signature generation failed: Unable to import secret key - ${error.message}`
        );
      });

    // Generate the signature
    const signatureBuffer = await crypto.subtle
      .sign(
        { name: "HMAC", hash: "SHA-256" },
        secretKey,
        encoder.encode(payload)
      )
      .catch((error) => {
        throw new Error(
          `HMAC signature generation failed: Unable to sign payload - ${error.message}`
        );
      });

    // Convert signature to hex string
    return Array.from(new Uint8Array(signatureBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  } catch (error) {
    // Re-throw the error with a consistent error message format
    throw new Error(
      `HMAC signature generation failed: ${
        error instanceof Error ? error.message : "Unknown error occurred"
      }`
    );
  }
}

export function generateNonce(length: number = 16): string {
  // Validate input parameter
  if (length <= 0) {
    throw new Error(
      "Nonce generation failed: Length must be a positive number"
    );
  }

  const array = new Uint8Array(length);
  crypto.getRandomValues(array);

  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
    ""
  );
}
