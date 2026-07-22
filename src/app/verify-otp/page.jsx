"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { toast } from "sonner";

export default function VerifyOTPPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("resetEmail");

    if (!savedEmail) {
      router.push("/forgot-password");
      return;
    }

    setEmail(savedEmail);
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await api.post("/auth/verify-otp", {
        email,
        otp,
      });

      localStorage.setItem("verifiedOTP", otp);

      toast.success("OTP verified successfully.");
      router.push("/reset-password");

    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border border-border bg-card p-10 shadow-md"
      >
        <h1 className="mb-2 text-center text-3xl font-bold">
          Verify OTP
        </h1>

        <p className="mb-6 text-center text-muted">
          Enter the 6-digit OTP sent to your email.
        </p>

        {error && (
          <div className="mb-4 rounded-lg bg-red-100 p-3 text-red-600">
            {error}
          </div>
        )}

        <input
          type="text"
          maxLength={6}
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          className="mb-6 w-full rounded-xl border border-border px-4 py-3 text-center text-2xl tracking-[8px]"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-primary py-3 font-semibold text-white"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
}