"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        {/* Logo */}
        <Link
          href="/"
          className="text-3xl font-extrabold tracking-tight text-slate-900"
        >
          Resume<span className="text-blue-600">Rank</span>
          <span className="text-indigo-600">AI</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-10 md:flex">
          <Link
            href="#features"
            className="font-medium text-slate-700 transition-colors hover:text-blue-600"
          >
            Features
          </Link>

          <Link
            href="#how-it-works"
            className="font-medium text-slate-700 transition-colors hover:text-blue-600"
          >
            How It Works
          </Link>

          <Link
            href="/login"
            className="font-medium text-slate-700 transition-colors hover:text-blue-600"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-blue-700"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="text-slate-800 md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="border-t border-slate-200 bg-white md:hidden text-slate-700"
        >
          <div className="flex flex-col gap-5 p-6">
            <Link href="#features">Features</Link>

            <Link href="#how-it-works">
              How It Works
            </Link>

            <Link href="/login">
              Login
            </Link>

            <Link
              href="/register"
              className="rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}