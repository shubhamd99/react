"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const sent = searchParams.get("sent");

  const [status, setStatus] = useState<"loading" | "success" | "error" | "idle">(
    token ? "loading" : "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [resendEmail, setResendEmail] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  useEffect(() => {
    if (!token) return;

    async function verifyToken() {
      try {
        const res = await fetch(`/api/auth/verify-email?token=${token}`);
        const data = await res.json();

        if (data.success) {
          setStatus("success");
        } else {
          setStatus("error");
          setErrorMessage(data.error ?? "Verification failed");
        }
      } catch {
        setStatus("error");
        setErrorMessage("Something went wrong");
      }
    }

    verifyToken();
  }, [token]);

  async function handleResend() {
    if (!resendEmail) return;
    setResendLoading(true);
    setResendSuccess(false);

    try {
      const res = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resendEmail }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setResendSuccess(true);
      } else {
        setErrorMessage(data.error ?? "Failed to resend");
      }
    } catch {
      setErrorMessage("Something went wrong");
    } finally {
      setResendLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-sm space-y-6 text-center">
      {/* Email sent state */}
      {sent && status === "idle" && (
        <>
          <div className="flex justify-center">
            <div className="rounded-full bg-blue-500/10 p-4">
              <Mail className="size-8 text-blue-500" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Check your email</h1>
            <p className="text-sm text-muted-foreground">
              We sent you a verification link. Click the link in the email to
              activate your account.
            </p>
            <p className="text-xs text-muted-foreground">
              Don&apos;t see it? Check your spam folder.
            </p>
          </div>
          <Link href="/sign-in">
            <Button variant="outline" className="w-full mt-4">
              Back to sign in
            </Button>
          </Link>
        </>
      )}

      {/* Verifying token */}
      {status === "loading" && (
        <>
          <div className="flex justify-center">
            <Loader2 className="size-8 animate-spin text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">Verifying your email...</p>
        </>
      )}

      {/* Verification success */}
      {status === "success" && (
        <>
          <div className="flex justify-center">
            <div className="rounded-full bg-emerald-500/10 p-4">
              <CheckCircle className="size-8 text-emerald-500" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Email verified</h1>
            <p className="text-sm text-muted-foreground">
              Your email has been verified. You can now sign in.
            </p>
          </div>
          <Link href="/sign-in">
            <Button className="w-full mt-4">Sign in</Button>
          </Link>
        </>
      )}

      {/* Verification error */}
      {status === "error" && (
        <>
          <div className="flex justify-center">
            <div className="rounded-full bg-destructive/10 p-4">
              <XCircle className="size-8 text-destructive" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Verification failed</h1>
            <p className="text-sm text-muted-foreground">{errorMessage}</p>
          </div>

          {!resendSuccess ? (
            <div className="space-y-3 mt-4">
              <p className="text-sm text-muted-foreground">
                Enter your email to get a new verification link:
              </p>
              <input
                type="email"
                placeholder="you@example.com"
                value={resendEmail}
                onChange={(e) => setResendEmail(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <Button
                className="w-full"
                onClick={handleResend}
                disabled={resendLoading || !resendEmail}
              >
                {resendLoading ? "Sending..." : "Resend verification email"}
              </Button>
            </div>
          ) : (
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400 mt-4">
              Verification email sent! Check your inbox.
            </div>
          )}

          <Link href="/sign-in">
            <Button variant="outline" className="w-full mt-3">
              Back to sign in
            </Button>
          </Link>
        </>
      )}

      {/* Fallback: no params */}
      {!sent && !token && status === "idle" && (
        <>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Email Verification</h1>
            <p className="text-sm text-muted-foreground">
              This page is used to verify your email address.
            </p>
          </div>
          <Link href="/sign-in">
            <Button variant="outline" className="w-full mt-4">
              Go to sign in
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}

function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Suspense
        fallback={
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="size-8 animate-spin text-muted-foreground" />
          </div>
        }
      >
        <VerifyEmailContent />
      </Suspense>
    </div>
  );
}

export default VerifyEmailPage;
