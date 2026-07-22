"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import api from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
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

    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const { data } = await api.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      login(data.user, data.token);

      router.push("/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6 text-foreground transition-colors duration-300">

      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-md transition-all duration-300">

        {/* Header */}
        <div className="mb-8 text-center">

          <h1 className="text-3xl font-bold text-foreground">
            Create Account
          </h1>

          <p className="mt-2 text-muted">
            Create your ResumeRank AI account
          </p>

        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-xl border border-destructive bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
          />

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

          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            autoComplete="new-password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground shadow-md transition-all duration-300 hover:scale-[1.02] hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        <p className="mt-6 text-center text-muted">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-primary transition-colors hover:underline hover:opacity-80"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}