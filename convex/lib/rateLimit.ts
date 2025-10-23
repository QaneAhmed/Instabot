type Bucket = {
  tokens: number;
  updatedAt: number;
};

const buckets = new Map<string, Bucket>();

export const rateLimit = ({
  key,
  tokens = 1,
  refillRatePerSecond = 1,
  burst = 5,
}: {
  key: string;
  tokens?: number;
  refillRatePerSecond?: number;
  burst?: number;
}): boolean => {
  const now = Date.now();
  const bucket = buckets.get(key) ?? { tokens: burst, updatedAt: now };
  const elapsedSeconds = (now - bucket.updatedAt) / 1000;
  const replenished = Math.min(burst, bucket.tokens + elapsedSeconds * refillRatePerSecond);
  if (replenished < tokens) {
    buckets.set(key, { tokens: replenished, updatedAt: now });
    return false;
  }

  buckets.set(key, { tokens: replenished - tokens, updatedAt: now });
  return true;
};
