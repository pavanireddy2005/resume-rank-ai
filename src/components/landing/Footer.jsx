import Link from "next/link";
import { Mail } from "lucide-react";
import {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}

          <div>
            <h2 className="text-3xl font-bold text-white">
              Resume
              <span className="text-blue-500">Rank</span>
              <span className="text-indigo-400">AI</span>
            </h2>

            <p className="mt-6 leading-7 text-slate-400">
              AI-powered resume analysis that helps
              job seekers improve ATS scores,
              discover missing keywords,
              and land more interviews.
            </p>
          </div>

          {/* Quick Links */}

          <div>
            <h3 className="mb-5 text-xl font-semibold text-white">
              Quick Links
            </h3>

            <div className="space-y-3">
              <Link
                href="/"
                className="block transition-colors hover:text-blue-400"
              >
                Home
              </Link>

              <Link
                href="/login"
                className="block transition-colors hover:text-blue-400"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="block transition-colors hover:text-blue-400"
              >
                Register
              </Link>
            </div>
          </div>

          {/* Features */}

          <div>
            <h3 className="mb-5 text-xl font-semibold text-white">
              Features
            </h3>

            <div className="space-y-3">
              <p>Resume Analysis</p>
              <p>ATS Score</p>
              <p>AI Suggestions</p>
              <p>Keyword Matching</p>
            </div>
          </div>

          {/* Contact */}

          <div>
            <h3 className="mb-5 text-xl font-semibold text-white">
              Connect
            </h3>

            <div className="flex gap-4">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-800 transition-colors hover:bg-blue-600"
              >
                <FaGithub size={20} />
              </a>

              <a
                href="https://linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-800 transition-colors hover:bg-blue-600"
              >
                <FaLinkedin size={20} />
              </a>

              <a
                href="https://x.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-800 transition-colors hover:bg-blue-600"
              >
                <FaXTwitter size={20} />
              </a>

              <a
                href="mailto:support@resumerankai.com"
                aria-label="Email Support"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-800 transition-colors hover:bg-blue-600"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 md:flex-row">
          <p className="text-slate-500">
            © 2026 ResumeRank AI. All rights reserved.
          </p>

          <div className="flex gap-6 text-slate-500">
            <Link
              href="/privacy"
              className="transition-colors hover:text-blue-400"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="transition-colors hover:text-blue-400"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}