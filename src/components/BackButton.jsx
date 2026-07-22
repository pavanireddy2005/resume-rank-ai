"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/dashboard") return null;

  return (
    <button
      onClick={() => router.push("/dashboard")}
      className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-foreground shadow-sm transition hover:border-primary hover:text-primary"
    >
      <ArrowLeft size={18} />
    </button>
  );
}