import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

// --- Upstash client (lazy — only created if env vars exist) ---

function createRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

let redis: Redis | null | undefined;

function getRedis(): Redis | null {
  if (redis === undefined) {
    redis = createRedis();
  }
  return redis;
}

// --- Limiter factory (cached instances) ---

const limiterCache = new Map<string, Ratelimit>();

function getLimiter(
  prefix: string,
  tokens: number,
  window: Parameters<typeof Ratelimit.slidingWindow>[1]
): Ratelimit | null {
  const client = getRedis();
  if (!client) return null;

  const cacheKey = prefix;
  const cached = limiterCache.get(cacheKey);
  if (cached) return cached;

  const limiter = new Ratelimit({
    redis: client,
    limiter: Ratelimit.slidingWindow(tokens, window),
    prefix: `ratelimit:${prefix}`,
  });
  limiterCache.set(cacheKey, limiter);
  return limiter;
}

// --- Pre-configured limiters ---

export const loginLimiter = () => getLimiter("login", 5, "15 m");
export const registerLimiter = () => getLimiter("register", 3, "1 h");
export const forgotPasswordLimiter = () => getLimiter("forgot", 3, "1 h");
export const resetPasswordLimiter = () => getLimiter("reset", 5, "15 m");
export const resendVerificationLimiter = () => getLimiter("resend", 3, "15 m");

// --- IP extraction ---

export function getIP(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return "127.0.0.1";
}

// --- Rate limit check (fail-open) ---

interface RateLimitResult {
  success: boolean;
  remaining: number;
  reset: number;
}

export async function checkRateLimit(
  limiterFn: () => Ratelimit | null,
  key: string
): Promise<RateLimitResult> {
  try {
    const limiter = limiterFn();
    if (!limiter) {
      return { success: true, remaining: -1, reset: 0 };
    }
    const result = await limiter.limit(key);
    return {
      success: result.success,
      remaining: result.remaining,
      reset: result.reset,
    };
  } catch (error) {
    console.warn("[rate-limit] Upstash unavailable, failing open:", error);
    return { success: true, remaining: -1, reset: 0 };
  }
}

// --- 429 response builder ---

export function rateLimitResponse(reset: number): NextResponse {
  const retryAfterSeconds = Math.max(1, Math.ceil((reset - Date.now()) / 1000));
  const minutes = Math.ceil(retryAfterSeconds / 60);

  return NextResponse.json(
    { error: `Too many attempts. Please try again in ${minutes} minute${minutes === 1 ? "" : "s"}.` },
    {
      status: 429,
      headers: { "Retry-After": String(retryAfterSeconds) },
    }
  );
}
