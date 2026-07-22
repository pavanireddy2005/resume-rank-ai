"use client";

import Image from "next/image";
import {
  User,
  Mail,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import { useRouter } from "next/navigation";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import BackButton from "@/components/BackButton";

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    user?.name || "User"
  )}&background=2563eb&color=fff&size=150`;

  return (
    <ProtectedRoute>
      <div className="space-y-8 text-foreground">

        <>
          <div className="space-y-4">

            <BackButton />

            <div>
              <h1 className="text-4xl font-bold text-foreground">
                Profile
              </h1>

              <p className="text-muted">
                View and manage your personal information.
              </p>
            </div>

          </div>

          <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card p-8 shadow-md transition-all duration-300">
          {/* Profile Header */}
          <div className="flex flex-col items-center">

            <Image
              src={avatarUrl}
              alt={`${user?.name || "User"} profile`}
              width={128}
              height={128}
              priority
              className="rounded-full border-4 border-primary/20 shadow-md"
            />

            <h1 className="mt-5 text-3xl font-bold text-foreground">
              {user?.name || "User"}
            </h1>

            <p className="mt-3 text-lg text-muted">
              <span>{user?.profession || "Not specified"}</span>

              <span className="mx-2 text-border">|</span>

              <span>{user?.education || "Not specified"}</span>
            </p>

          </div>

          {/* Information Cards */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">

            <div className="flex items-center gap-4 rounded-xl border border-border bg-background p-5 transition-all duration-300 hover:shadow-sm">

              <div className="rounded-lg bg-primary/10 p-3">
                <User className="text-primary" />
              </div>

              <div>
                <p className="text-sm text-muted">
                  Full Name
                </p>

                <p className="font-semibold text-foreground">
                  {user?.name || "Not available"}
                </p>
              </div>

            </div>

            <div className="flex items-center gap-4 rounded-xl border border-border bg-background p-5 transition-all duration-300 hover:shadow-sm">

              <div className="rounded-lg bg-primary/10 p-3">
                <Mail className="text-primary" />
              </div>

              <div>
                <p className="text-sm text-muted">
                  Email
                </p>

                <p className="font-semibold text-foreground">
                  {user?.email || "Not available"}
                </p>
              </div>

            </div>

            <div className="flex items-center gap-4 rounded-xl border border-border bg-background p-5 transition-all duration-300 hover:shadow-sm">

              <div className="rounded-lg bg-primary/10 p-3">
                <Briefcase className="text-primary" />
              </div>

              <div>
                <p className="text-sm text-muted">
                  Profession
                </p>

                <p className="font-semibold text-foreground">
                  {user?.profession || "Not specified"}
                </p>
              </div>

            </div>

            <div className="flex items-center gap-4 rounded-xl border border-border bg-background p-5 transition-all duration-300 hover:shadow-sm">

              <div className="rounded-lg bg-primary/10 p-3">
                <GraduationCap className="text-primary" />
              </div>

              <div>
                <p className="text-sm text-muted">
                  Education
                </p>

                <p className="font-semibold text-foreground">
                  {user?.education || "Not specified"}
                </p>
              </div>

            </div>

          </div>

          {/* Edit Button */}
          <button
            type="button"
            onClick={() => router.push("/profile/edit")}
            className="mt-10 w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground shadow-md transition-all duration-300 hover:scale-[1.02] hover:opacity-90"
          >
            Edit Profile
          </button>

          </div>
        </>

      </div>
    </ProtectedRoute>

  );
}