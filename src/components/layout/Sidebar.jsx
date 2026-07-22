"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Upload,
  FileText,
  User,
  Settings,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";

const menu = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Upload Resume",
    href: "/upload",
    icon: Upload,
  },
  {
    name: "Analysis",
    href: "/analysis",
    icon: FileText,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("sidebarCollapsed");

    if (saved) {
      setCollapsed(JSON.parse(saved));
    }
  }, []);

  const toggleSidebar = () => {
    const value = !collapsed;

    setCollapsed(value);
    localStorage.setItem(
      "sidebarCollapsed",
      JSON.stringify(value)
    );
  };

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  const closeMobile = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50
        flex flex-col
        border-r border-border
        bg-card shadow-lg
        transition-all duration-300

        ${
          collapsed
            ? "md:w-20"
            : "md:w-64"
        }

        w-64
        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }

        md:translate-x-0
        md:static
        md:shadow-sm
      `}
    >
      {/* Header */}

      <div className="flex items-center justify-between border-b border-border p-5">

        {!collapsed && (
          <h1 className="text-2xl font-bold whitespace-nowrap">
            Resume
            <span className="text-primary">Rank</span>
            <span className="text-indigo-500">
              AI
            </span>
          </h1>
        )}

        <button
          onClick={toggleSidebar}
          className="hidden rounded-lg p-2 hover:bg-background md:block"
        >
          {collapsed ? (
            <PanelLeftOpen size={22} />
          ) : (
            <PanelLeftClose size={22} />
          )}
        </button>
      </div>

      {/* Navigation */}

      <nav className="mt-5 flex flex-col gap-2 px-3">

        {menu.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={closeMobile}
              title={
                collapsed ? item.name : ""
              }
              className={`flex items-center rounded-xl px-4 py-3 font-medium transition-all

                ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted hover:bg-background hover:text-primary"
                }

                ${
                  collapsed
                    ? "justify-center md:justify-center"
                    : "gap-4"
                }
              `}
            >
              <Icon size={22} />

              {!collapsed && (
                <span>{item.name}</span>
              )}
            </Link>
          );
        })}

      </nav>

      {/* Logout */}

      <div className="mt-auto border-t border-border p-4">

        <button
          onClick={handleLogout}
          className={`flex w-full items-center rounded-xl px-4 py-3 font-medium text-destructive transition hover:bg-red-100 dark:hover:bg-red-900/20

            ${
              collapsed
                ? "justify-center"
                : "gap-4"
            }
          `}
        >
          <LogOut size={22} />

          {!collapsed && (
            <span>Logout</span>
          )}
        </button>

      </div>
    </aside>
  );
}