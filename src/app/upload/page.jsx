"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud, FileText, Trash2 } from "lucide-react";

import api from "@/lib/axios";
import ProtectedRoute from "@/components/ProtectedRoute";
import BackButton from "@/components/BackButton";

const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export default function UploadPage() {
  const router = useRouter();

  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Only PDF, DOC, and DOCX files are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File size should be less than 5MB.");
      return;
    }

    setError("");
    setResume(file);
  };

  const handleUpload = async () => {
    if (loading) return;

    if (!resume) {
      setError("Please select a resume.");
      return;
    }

    const trimmedJobDescription = jobDescription.trim();

    if (!trimmedJobDescription) {
      setError("Please enter a job description.");
      return;
    }

    setError("");

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("resume", resume);
      formData.append("jobDescription", trimmedJobDescription);

      const { data: uploadData } = await api.post(
        "/resume/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      localStorage.removeItem("uploadedResume");
      localStorage.removeItem("analysis");

      localStorage.setItem(
        "uploadedResume",
        JSON.stringify({
          fileName: uploadData.fileName,
          jobDescription: uploadData.jobDescription,
        })
      );

      const { data: analysisData } = await api.post("/analysis", {
        resumeId: uploadData.resumeId,
        resumeText: uploadData.resumeText,
        jobDescription: uploadData.jobDescription,
      });

      localStorage.setItem(
        "analysis",
        JSON.stringify(analysisData.analysis)
      );

      router.push("/analysis");
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Upload or analysis failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="space-y-8 bg-background text-foreground transition-colors duration-300">

        {/* Header */}
        <div className="space-y-4">

          <BackButton />

          <div>
            <h1 className="text-4xl font-bold text-foreground">
              Upload Resume
            </h1>

            <p className="mt-2 text-muted">
              Upload your resume and compare it with any job description.
            </p>
          </div>

        </div>

        {/* Error Message */}
        {error && (
          <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-red-600 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300">
            {error}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-2">

          {/* Resume Card */}
          <div className="rounded-2xl border border-border bg-card p-8 shadow-md transition-all duration-300">

            <h2 className="mb-6 text-xl font-bold text-foreground">
              Resume
            </h2>

            {!resume ? (
              <label className="flex h-72 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-primary transition-all duration-300 hover:bg-background">

                <UploadCloud
                  size={60}
                  className="mb-4 text-primary"
                />

                <p className="text-lg font-semibold text-foreground">
                  Drag & Drop Resume
                </p>

                <p className="mt-2 text-muted">
                  or click to browse
                </p>

                <p className="mt-4 text-sm text-muted">
                  PDF / DOC / DOCX • Max 5MB
                </p>

                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={handleFile}
                />
              </label>
            ) : (
                            <div className="rounded-2xl border border-border bg-card p-6">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-4">

                    <div className="rounded-xl bg-primary/10 p-4">
                      <FileText className="text-primary" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-foreground">
                        {resume.name}
                      </h3>

                      <p className="text-sm text-muted">
                        {(resume.size / 1024).toFixed(2)} KB
                      </p>
                    </div>

                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setResume(null);
                      setError("");
                    }}
                    className="rounded-lg p-2 text-destructive transition hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 size={20} />
                  </button>

                </div>

                {/* Upload Progress */}

                <div className="mt-6">

                  <div className="mb-2 flex justify-between text-sm text-muted">
                    <span>Upload Progress</span>
                    <span>100%</span>
                  </div>

                  <div className="h-3 w-full overflow-hidden rounded-full bg-border">
                    <div className="h-full w-full rounded-full bg-success" />
                  </div>

                </div>

              </div>
            )}

          </div>

          {/* Job Description Card */}

          <div className="rounded-2xl border border-border bg-card p-8 shadow-md transition-all duration-300">

            <h2 className="mb-6 text-xl font-bold text-foreground">
              Job Description
            </h2>

            <textarea
              rows={12}
              value={jobDescription}
              onChange={(e) => {
                setJobDescription(e.target.value);

                if (error) {
                  setError("");
                }
              }}
              placeholder="Paste the complete job description here..."
              className="w-full resize-none rounded-xl border border-border bg-background p-4 text-foreground placeholder:text-muted outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
                        <button
              type="button"
              onClick={handleUpload}
              disabled={!resume || !jobDescription.trim() || loading}
              className={`mt-6 w-full rounded-xl py-3 font-semibold transition-all duration-300 ${
                !resume || !jobDescription.trim() || loading
                  ? "cursor-not-allowed bg-border text-muted opacity-60"
                  : "bg-primary text-primary-foreground shadow-md hover:scale-[1.02] hover:opacity-90"
              }`}
            >
              {loading ? "Analyzing Resume..." : "Analyze Resume"}
            </button>

          </div>

        </div>

      </div>
    </ProtectedRoute>
  );
}