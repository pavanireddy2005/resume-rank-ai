"use client";

import { useState } from "react";
import Link from "next/link";
import api from "@/lib/axios";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const { data } = await api.post("/auth/forgot-password", {
        email,
      });

      setMessage(data.message);
      toast.success("OTP sent successfully.");

      localStorage.setItem("resetEmail", email);

      window.location.href = "/verify-otp";

    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong."
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
          Forgot Password
        </h1>

        <p className="mb-6 text-center text-muted">
          Enter your email to receive an OTP.
        </p>

        {error && (
          <div className="mb-4 rounded-lg bg-red-100 p-3 text-red-600">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-4 rounded-lg bg-green-100 p-3 text-green-600">
            {message}
          </div>
        )}

        <input
          type="email"
          placeholder="Email Address"
          required
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="mb-6 w-full rounded-xl border border-border px-4 py-3"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-primary py-3 font-semibold text-white"
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>

        <p className="mt-6 text-center">
          <Link
            href="/login"
            className="text-primary hover:underline"
          >
            Back to Login
          </Link>
        </p>
      </form>
    </div>
  );
}