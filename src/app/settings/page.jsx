"use client";

import { useEffect, useState } from "react";
import { Moon, Bell, Lock, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import BackButton from "@/components/BackButton";

export default function SettingsPage() {
  const router = useRouter();
  const { logout } = useAuth();

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  const handleChangePassword = () => {
    router.push("/settings/change-password");
  };

  return (
    <ProtectedRoute>
      <div className="space-y-8 text-foreground">

        <div className="space-y-4">

          <BackButton />

          <div>
            <h1 className="text-4xl font-bold text-foreground">
              Settings
            </h1>

            <p className="mt-2 text-muted">
              Manage your account preferences and application settings.
            </p>
          </div>

        </div>

        <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card p-8 shadow-md transition-all duration-300">

          <section className="space-y-6">

            {/* Dark Mode */}
            <div className="flex items-center justify-between rounded-xl border border-border bg-background p-5 transition-all duration-300 hover:shadow-sm">

              <div className="flex items-center gap-4">

                <div className="rounded-xl bg-primary/10 p-3">
                  <Moon
                    size={26}
                    className="text-primary"
                  />
                </div>

                <div>
                  <h2 className="font-semibold text-foreground">
                    Dark Mode
                  </h2>

                  <p className="text-sm text-muted">
                    Enable or disable dark theme
                  </p>
                </div>

              </div>

              {mounted && (
                <input
                  type="checkbox"
                  checked={theme === "dark"}
                  onChange={(e) =>
                    setTheme(e.target.checked ? "dark" : "light")
                  }
                  className="h-5 w-5 cursor-pointer accent-primary"
                />
              )}

            </div>

            {/* Notifications */}
            <div className="flex items-center justify-between rounded-xl border border-border bg-background p-5 transition-all duration-300 hover:shadow-sm">

              <div className="flex items-center gap-4">

                <div className="rounded-xl bg-warning/10 p-3">
                  <Bell
                    size={26}
                    className="text-warning"
                  />
                </div>

                <div>
                  <h2 className="font-semibold text-foreground">
                    Notifications
                  </h2>

                  <p className="text-sm text-muted">
                    Receive analysis updates
                  </p>
                </div>

              </div>

              <input
                type="checkbox"
                defaultChecked
                className="h-5 w-5 cursor-pointer accent-primary"
              />

            </div>

            {/* Change Password */}
            <div className="flex items-center justify-between rounded-xl border border-border bg-background p-5 transition-all duration-300 hover:shadow-sm">

              <div className="flex items-center gap-4">

                <div className="rounded-xl bg-success/10 p-3">
                  <Lock
                    size={26}
                    className="text-success"
                  />
                </div>

                <div>
                  <h2 className="font-semibold text-foreground">
                    Change Password
                  </h2>

                  <p className="text-sm text-muted">
                    Update your account password
                  </p>
                </div>

              </div>

              <button
                type="button"
                onClick={handleChangePassword}
                className="rounded-xl bg-success px-5 py-2 font-semibold text-white transition-all duration-300 hover:scale-105 hover:opacity-90"
              >
                Change
              </button>

            </div>

            {/* Logout */}
            <div className="flex items-center justify-between rounded-xl border border-border bg-background p-5 transition-all duration-300 hover:shadow-sm">

              <div className="flex items-center gap-4">

                <div className="rounded-xl bg-destructive/10 p-3">
                  <LogOut
                    size={26}
                    className="text-destructive"
                  />
                </div>

                <div>
                  <h2 className="font-semibold text-foreground">
                    Logout
                  </h2>

                  <p className="text-sm text-muted">
                    Sign out of your account
                  </p>
                </div>

              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-xl bg-destructive px-5 py-2 font-semibold text-white transition-all duration-300 hover:scale-105 hover:opacity-90"
              >
                Logout
              </button>

            </div>

          </section>

        </div>

      </div>
    </ProtectedRoute>
  );
}