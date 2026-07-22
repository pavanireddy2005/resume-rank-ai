"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FileText,
  Briefcase,
  BarChart3,
  Upload,
} from "lucide-react";

import ProtectedRoute from "@/components/ProtectedRoute";
import api from "@/lib/axios";

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const { data } = await api.get("/resume/dashboard");

      if (data.success) {
        setDashboardData(data.data);
      }
    } catch (err) {
      console.log(err);
      setDashboardData(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
          Loading...
        </div>
      </ProtectedRoute>
    );
  }

  const hasResume =
    dashboardData &&
    dashboardData.uploadedFiles > 0;

  return (
    <ProtectedRoute>
      <div className="w-full space-y-10">

        {/* Heading */}
        <section className="mb-10">
          <h1 className="text-4xl font-bold text-foreground">
            Dashboard
          </h1>

          <p className="mt-3 text-lg text-muted">
            Welcome back! Ready to improve your resume today?
          </p>
        </section>

        {!hasResume ? (
          /* Empty State */
          <section className="rounded-3xl border border-border bg-card p-16 shadow-lg">

            <div className="mx-w-full text-center">

              <div className="mb-8 flex justify-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
                  <Upload className="h-12 w-12 text-primary" />
                </div>
              </div>

              <h2 className="text-3xl font-bold text-foreground">
                Welcome to ResumeRank AI
              </h2>

              <p className="mt-5 text-lg leading-8 text-muted">
                Upload your resume and compare it with a job description
                to receive an ATS score, matched skills, missing skills,
                AI suggestions and detailed feedback.
              </p>

              <Link
                href="/upload"
                className="mt-10 inline-flex items-center rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-md transition hover:opacity-90"
              >
                Upload Resume
              </Link>

            </div>

          </section>
        ) : (
          <>
            {/* Cards */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

              <div className="rounded-2xl border border-border bg-card p-6 shadow-md">

                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                  <BarChart3 className="text-primary" />
                </div>

                <p className="text-sm text-muted">
                  ATS Score
                </p>

                <h2 className="mt-2 text-3xl font-bold text-foreground">
                  {dashboardData.atsScore}%
                </h2>

              </div>

              <div className="rounded-2xl border border-border bg-card p-6 shadow-md">

                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-success/10">
                  <Briefcase className="text-success" />
                </div>

                <p className="text-sm text-muted">
                  Role
                </p>

                <h2 className="mt-2 text-2xl font-bold text-foreground">
                  {dashboardData.role}
                </h2>

              </div>

              <div className="rounded-2xl border border-border bg-card p-6 shadow-md">

                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-warning/10">
                  <FileText className="text-warning" />
                </div>

                <p className="text-sm text-muted">
                  Uploaded Files
                </p>

                <h2 className="mt-2 text-3xl font-bold text-foreground">
                  {dashboardData.uploadedFiles}
                </h2>

              </div>

            </div>

            {/* Upload Button */}
            <div className="mt-12 flex justify-center">

              <Link
                href="/upload"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-md transition hover:scale-105 hover:opacity-90"
              >
                <Upload size={20} />
                Upload New Resume
              </Link>

            </div>
          </>
        )}
      </div>
    </ProtectedRoute>
  );
}