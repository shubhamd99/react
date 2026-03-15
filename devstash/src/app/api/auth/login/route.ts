import { NextResponse } from "next/server";
import { z } from "zod";
import {
  checkRateLimit,
  getIP,
  loginLimiter,
  rateLimitResponse,
} from "@/lib/rate-limit";

const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      const firstError = result.error.issues[0]?.message ?? "Invalid input";
      return NextResponse.json(
        { success: false, error: firstError },
        { status: 400 }
      );
    }

    const { email } = result.data;
    const ip = getIP(request);

    // Rate limit check
    const rl = await checkRateLimit(loginLimiter, `${ip}:${email}`);
    if (!rl.success) {
      return rateLimitResponse(rl.reset);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 }
    );
  }
}
