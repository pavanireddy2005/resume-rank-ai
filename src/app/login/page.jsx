"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useAuth } from "@/context/AuthContext";
import api from "@/lib/axios";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const { data } = await api.post("/auth/login", formData);

      login(data.user, data.token);

      router.push("/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message || "Login failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6 text-foreground transition-colors duration-300">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border border-border bg-card p-10 shadow-md transition-all duration-300"
      >
        {/* Header */}
        <div className="mb-8 text-center">

          <h1 className="text-3xl font-bold text-foreground">
            Welcome Back
          </h1>

          <p className="mt-2 text-muted">
            Sign in to continue to ResumeRank AI
          </p>

        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-5 rounded-xl border border-destructive bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {/* Email */}
        <div className="mb-5">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Password */}
        <div className="mb-4 relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-border bg-background px-4 py-3 pr-12 text-foreground placeholder:text-muted outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition"
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>

        <div className="mb-6 flex justify-end">
          <Link
            href="/forgot-password"
            className="text-sm text-primary hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground shadow-md transition-all duration-300 hover:scale-[1.02] hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Footer */}
        <p className="mt-6 text-center text-muted">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-primary transition-colors hover:underline hover:opacity-80"
          >
            Create one
          </Link>
        </p>

      </form>

    </div>
  );
}