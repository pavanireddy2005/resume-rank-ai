"use client";

import { useEffect, useState } from "react";
import { FileText, Download, Eye } from "lucide-react";

import ProtectedRoute from "@/components/ProtectedRoute";

export default function PreviewPage() {
  const [resume, setResume] = useState(null);

  useEffect(() => {
    try {
      const storedResume = localStorage.getItem("uploadedResume");

      if (storedResume) {
        setResume(JSON.parse(storedResume));
      }
    } catch (error) {
      console.error("Failed to load resume:", error);
      localStorage.removeItem("uploadedResume");
    }
  }, []);

  if (!resume) {
    return (
      <ProtectedRoute>
        <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
          <h2 className="text-2xl font-semibold text-foreground">
            No uploaded resume found.
          </h2>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background p-8 text-foreground transition-colors duration-300">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground">
            Resume Preview
          </h1>

          <p className="mt-2 text-muted">
            Review your uploaded resume before downloading or viewing.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">

          {/* Resume Details */}
          <section className="rounded-2xl border border-border bg-card p-6 shadow-md transition-all duration-300">

            <div className="mb-6 flex items-center gap-4">

              <div className="rounded-xl bg-primary/10 p-4">
                <FileText
                  size={36}
                  className="text-primary"
                />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  {resume.fileName}
                </h2>

                <p className="text-muted">
                  Ready for analysis
                </p>
              </div>

            </div>

            <div className="space-y-5">

              <div className="flex items-center justify-between">

                <span className="text-muted">
                  Status
                </span>

                <span className="font-semibold text-success">
                  Ready
                </span>

              </div>

              {resume.jobDescription && (
                <div>

                  <p className="mb-2 font-medium text-foreground">
                    Job Description
                  </p>

                  <p className="line-clamp-6 text-sm leading-6 text-muted">
                    {resume.jobDescription}
                  </p>

                </div>
              )}

            </div>

            <div className="mt-8 space-y-4">

              <button
                type="button"
                disabled
                className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-primary py-3 font-semibold text-primary-foreground opacity-60"
              >
                <Eye size={20} />
                Preview Resume
              </button>

              <button
                type="button"
                disabled
                className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-border py-3 font-semibold text-foreground opacity-60"
              >
                <Download size={20} />
                Download Resume
              </button>

            </div>

          </section>

          {/* Preview Area */}
          <section className="rounded-2xl border border-border bg-card p-6 shadow-md transition-all duration-300 lg:col-span-2">

            <div className="flex h-[700px] items-center justify-center rounded-xl border-2 border-dashed border-border bg-background">

              <div className="text-center">

                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">

                  <FileText
                    size={50}
                    className="text-primary"
                  />

                </div>

                <h2 className="text-2xl font-semibold text-foreground">
                  Resume Preview
                </h2>

                <p className="mt-3 text-muted">
                  PDF preview functionality will appear here.
                </p>

              </div>

            </div>

          </section>

        </div>

      </div>
    </ProtectedRoute>
  );
}