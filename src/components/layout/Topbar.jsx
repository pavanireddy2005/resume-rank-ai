"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bell,
  Search,
  ArrowLeft,
  Moon,
  Sun,
  Trash2,
  Menu,
} from "lucide-react";

import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "next-themes";

import { useAuth } from "@/context/AuthContext";
import { useNotifications } from "@/context/NotificationContext";

export default function Topbar({
  sidebarOpen,
  setSidebarOpen,
}) {
  const { user } = useAuth();

  const {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotifications();

  const router = useRouter();
  const pathname = usePathname();

  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notificationRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const name = user?.name || "User";
  const profession =
    user?.profession || "ResumeRank AI User";

  const avatar = name.charAt(0).toUpperCase();

  const showBackButton =
    pathname !== "/dashboard";

  const formatDate = (date) => {
    const now = new Date();
    const created = new Date(date);

    const diff =
      Math.floor((now - created) / 1000);

    if (diff < 60) return `${diff} sec ago`;
    if (diff < 3600)
      return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400)
      return `${Math.floor(diff / 3600)} hr ago`;

    return created.toLocaleDateString();
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card px-4 md:px-8">

      {/* Left */}

      <div className="flex items-center gap-3">

        {/* Mobile Hamburger */}

        <button
          onClick={() =>
            setSidebarOpen(!sidebarOpen)
          }
          className="rounded-lg p-2 hover:bg-background md:hidden"
        >
          <Menu size={24} />
        </button>

        {showBackButton && (
          <button
            onClick={() =>
              router.push("/dashboard")
            }
            className="hidden items-center gap-2 rounded-xl border border-border bg-background px-4 py-2 hover:border-primary hover:text-primary md:flex"
          >
            <ArrowLeft size={18} />
            Dashboard
          </button>
        )}

        {/* Search */}

        <div className="relative hidden md:block">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
          />

          <input
            placeholder="Search..."
            className="w-72 rounded-xl border border-border bg-background py-3 pl-11 pr-4 outline-none focus:border-primary"
          />

        </div>

      </div>

      {/* Right */}

      <div className="flex items-center gap-3">

        {/* Theme */}

        <button
          onClick={() =>
            mounted &&
            setTheme(
              theme === "dark"
                ? "light"
                : "dark"
            )
          }
          className="rounded-lg p-2 hover:bg-background"
        >
          {!mounted ? null : theme ===
            "dark" ? (
            <Sun size={20} />
          ) : (
            <Moon size={20} />
          )}
        </button>

        {/* Notifications */}

        <div
          className="relative"
          ref={notificationRef}
        >
          <button
            onClick={() =>
              setShowNotifications(
                !showNotifications
              )
            }
            className="relative rounded-lg p-2 hover:bg-background"
          >
            <Bell size={22} />

            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 max-h-96 w-80 overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl md:w-96">

              <div className="flex items-center justify-between border-b border-border p-4">

                <h3 className="font-semibold">
                  Notifications
                </h3>

                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-primary"
                  >
                    Mark all
                  </button>
                )}

              </div>

              {loading ? (
                <div className="p-5 text-center">
                  Loading...
                </div>
              ) : notifications.length ===
                0 ? (
                <div className="p-6 text-center text-muted">
                  No notifications
                </div>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n._id}
                    onClick={() =>
                      !n.isRead &&
                      markAsRead(n._id)
                    }
                    className={`cursor-pointer border-b border-border p-4 hover:bg-background ${
                      !n.isRead
                        ? "bg-primary/5"
                        : ""
                    }`}
                  >
                    <div className="flex justify-between gap-3">

                      <div className="flex-1">

                        <h4 className="font-semibold">
                          {n.title}
                        </h4>

                        <p className="mt-1 text-sm text-muted">
                          {n.message}
                        </p>

                        <p className="mt-2 text-xs text-muted">
                          {formatDate(
                            n.createdAt
                          )}
                        </p>

                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(
                            n._id
                          );
                        }}
                      >
                        <Trash2
                          size={16}
                        />
                      </button>

                    </div>
                  </div>
                ))
              )}

            </div>
          )}
        </div>

        {/* User */}

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-semibold text-white">
            {avatar}
          </div>

          <div className="hidden lg:block">

            <p className="font-semibold">
              {name}
            </p>

            <p className="text-sm text-muted">
              {profession}
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}