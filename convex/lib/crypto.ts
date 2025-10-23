import { createDecipheriv, createCipheriv, randomBytes } from "node:crypto";

const TOKEN_SECRET = process.env.TOKEN_SECRET;
const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12;
const AUTH_TAG_LENGTH = 16;

if (!TOKEN_SECRET && process.env.NODE_ENV !== "test") {
  console.warn("TOKEN_SECRET is not set. Encryption helpers will throw.");
}

const getKey = () => {
  if (!TOKEN_SECRET) {
    throw new Error("TOKEN_SECRET must be configured for encryption.");
  }

  if (TOKEN_SECRET.length < 32) {
    throw new Error("TOKEN_SECRET must be at least 32 characters long.");
  }

  return Buffer.from(TOKEN_SECRET.slice(0, 32));
};

export const encrypt = (plaintext: string): string => {
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, getKey(), iv, {
    authTagLength: AUTH_TAG_LENGTH,
  });
  const ciphertext = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return Buffer.concat([iv, authTag, ciphertext]).toString("base64");
};

export const decrypt = (ciphertext: string): string => {
  const payload = Buffer.from(ciphertext, "base64");
  const iv = payload.subarray(0, IV_LENGTH);
  const authTag = payload.subarray(IV_LENGTH, IV_LENGTH + AUTH_TAG_LENGTH);
  const encrypted = payload.subarray(IV_LENGTH + AUTH_TAG_LENGTH);
  const decipher = createDecipheriv(ALGORITHM, getKey(), iv, {
    authTagLength: AUTH_TAG_LENGTH,
  });
  decipher.setAuthTag(authTag);
  const plaintext = Buffer.concat([decipher.update(encrypted), decipher.final()]);
  return plaintext.toString("utf8");
};
