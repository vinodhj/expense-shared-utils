declare global {
  interface Crypto {
    readonly subtle: SubtleCrypto;
    getRandomValues<T extends ArrayBufferView>(array: T): T;
  }
}

declare module "@vinodhj/expense-shared-utils" {
  /**
   * Generates an HMAC (Hash-based Message Authentication Code) signature
   * using the SHA-256 algorithm.
   *
   * @param secret - The secret key used for generating the HMAC signature
   * @param payload - The data to be signed
   * @returns A Promise that resolves to a hexadecimal string representation of the signature
   */
  export function generateHmacSignature(
    secret: string,
    payload: string
  ): Promise<string>;

  /**
   * Generates a cryptographically secure random nonce (number used once)
   *
   * @param length - The length of the nonce in bytes (default is 16)
   * @returns A hexadecimal string representation of the random bytes
   */
  export function generateNonce(length?: number): string;
}

export {};
