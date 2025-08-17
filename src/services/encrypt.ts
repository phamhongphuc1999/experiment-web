// aes_compat.ts
import CryptoJS from 'crypto-js';

/**
 * Derive a 32-byte AES key from password (SHA-256).
 * Exactly same as Rust's derive_key().
 */
function deriveKey(password: string): CryptoJS.lib.WordArray {
  return CryptoJS.SHA256(password);
}

/**
 * Parse 16-byte IV from hex string (32 hex chars).
 * Same as Rust's iv_from_hex().
 */
function parseIvHex(ivHex: string): CryptoJS.lib.WordArray {
  if (!/^[0-9a-fA-F]{32}$/.test(ivHex)) throw new Error('IV must be 16 bytes (32 hex chars).');
  return CryptoJS.enc.Hex.parse(ivHex);
}

/**
 * Encrypt plaintext with AES-256-CBC + PKCS7.
 * Returns Base64 ciphertext (like Rust).
 */
export function encryptText(password: string, ivHex: string, plaintext: string): string {
  const key = deriveKey(password);
  const iv = parseIvHex(ivHex);

  const encrypted = CryptoJS.AES.encrypt(plaintext, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  // Use ciphertext only (not OpenSSL salt header)
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}

/**
 * Decrypt Base64 ciphertext produced by Rust.
 */
export function decryptText(password: string, ivHex: string, cipherBase64: string): string {
  const key = deriveKey(password);
  const iv = parseIvHex(ivHex);

  // Wrap ciphertext properly as CipherParams
  const cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Base64.parse(cipherBase64),
  });

  const decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  const text = decrypted.toString(CryptoJS.enc.Utf8);
  if (text === '') {
    throw new Error('Decryption failed (wrong key/IV/ciphertext).');
  }
  return text;
}

/** Helper: generate random IV as hex (useful in browser/Node 19+). */
export function randomIvHex(): string {
  const iv = new Uint8Array(16);
  crypto.getRandomValues(iv);
  return Array.from(iv)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}
