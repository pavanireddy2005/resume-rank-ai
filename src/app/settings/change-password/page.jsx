"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Lock } from "lucide-react";

import api from "@/lib/axios";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function ChangePasswordPage() {
  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const { data } = await api.put("/auth/change-password", {
        currentPassword,
        newPassword,
      });

      if (data.success) {
        setSuccess("Password updated successfully.");

        setTimeout(() => {
          router.push("/settings");
        }, 1200);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to update password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background p-8 text-foreground transition-colors duration-300">

        <div className="mx-auto max-w-lg rounded-2xl border border-border bg-card p-8 shadow-md transition-all duration-300">

          {/* Back Button */}
          <button
            type="button"
            onClick={() => router.back()}
            className="mb-6 flex items-center gap-2 text-primary transition-colors duration-300 hover:opacity-80"
          >
            <ArrowLeft size={20} />
            Back
          </button>

          {/* Header */}
          <div className="mb-8 flex items-center gap-4">

            <div className="rounded-xl bg-success/10 p-3">
              <Lock
                size={30}
                className="text-success"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Change Password
              </h1>

              <p className="text-sm text-muted">
                Update your account password.
              </p>
            </div>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Current Password */}
            <div>

              <label className="mb-2 block font-medium text-foreground">
                Current Password
              </label>

              <input
                type="password"
                value={currentPassword}
                onChange={(e) =>
                  setCurrentPassword(e.target.value)
                }
                placeholder="Enter current password"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
              />

            </div>

            {/* New Password */}
            <div>

              <label className="mb-2 block font-medium text-foreground">
                New Password
              </label>

              <input
                type="password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(e.target.value)
                }
                placeholder="Enter new password"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
              />

            </div>

            {/* Confirm Password */}
            <div>

              <label className="mb-2 block font-medium text-foreground">
                Confirm Password
              </label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                placeholder="Confirm new password"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
              />

            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-destructive bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="rounded-xl border border-success bg-success/10 px-4 py-3 text-sm text-success">
                {success}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-success py-3 font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Updating Password..."
                : "Update Password"}
            </button>

          </form>

        </div>

      </div>
    </ProtectedRoute>
  );
}