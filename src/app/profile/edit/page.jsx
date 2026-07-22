"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function EditProfilePage() {
  const { user, setUser } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    profession: user?.profession || "",
    education: user?.education || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      ...formData,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    if (setUser) {
      setUser(updatedUser);
    }

    router.push("/profile");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6 text-foreground transition-colors duration-300">

      <div className="w-full max-w-xl rounded-2xl border border-border bg-card p-8 shadow-md transition-all duration-300">

        {/* Header */}
        <div className="mb-8">

          <h1 className="text-3xl font-bold text-foreground">
            Edit Profile
          </h1>

          <p className="mt-2 text-muted">
            Update your personal information.
          </p>

        </div>

        <div className="space-y-6">

          {/* Full Name */}
          <div>

            <label className="mb-2 block font-medium text-foreground">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />

          </div>

          {/* Profession */}
          <div>

            <label className="mb-2 block font-medium text-foreground">
              Profession
            </label>

            <input
              type="text"
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              placeholder="Enter your profession"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />

          </div>

          {/* Education */}
          <div>

            <label className="mb-2 block font-medium text-foreground">
              Education
            </label>

            <input
              type="text"
              name="education"
              value={formData.education}
              onChange={handleChange}
              placeholder="Enter your education"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />

          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-2">

            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 rounded-xl border border-border bg-background py-3 font-semibold text-foreground transition-all duration-300 hover:bg-card"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="flex-1 rounded-xl bg-primary py-3 font-semibold text-primary-foreground shadow-md transition-all duration-300 hover:scale-[1.02] hover:opacity-90"
            >
              Save Profile
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}