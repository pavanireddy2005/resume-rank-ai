"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import api from "@/lib/axios";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("resetEmail");
    const savedOTP = localStorage.getItem("verifiedOTP");

    if (!savedEmail || !savedOTP) {
      router.push("/forgot-password");
      return;
    }

    setEmail(savedEmail);
    setOtp(savedOTP);
  }, [router]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await api.post("/auth/reset-password", {
        email,
        otp,
        newPassword: formData.newPassword,
      });

      localStorage.removeItem("resetEmail");
      localStorage.removeItem("verifiedOTP");

      toast.success("Password reset successfully!");

        setTimeout(() => {
        router.push("/login");
        }, 1200);

    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Failed to reset password.";

        setError(message);
        toast.error(message);
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
          Reset Password
        </h1>

        <p className="mb-6 text-center text-muted">
          Create your new password.
        </p>

        {error && (
          <div className="mb-5 rounded-xl border border-red-500 bg-red-100 p-3 text-red-600">
            {error}
          </div>
        )}

        {/* New Password */}

        <div className="relative mb-5">

          <input
            type={showPassword ? "text" : "password"}
            name="newPassword"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-border px-4 py-3 pr-12"
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>

        </div>

        {/* Confirm Password */}

        <div className="relative mb-6">

          <input
            type={showConfirm ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-border px-4 py-3 pr-12"
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirm(!showConfirm)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            {showConfirm ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>

        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-primary py-3 font-semibold text-white"
        >
          {loading
            ? "Updating..."
            : "Reset Password"}
        </button>

      </form>

    </div>
  );
}