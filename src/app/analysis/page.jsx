"use client";

import { useEffect, useState } from "react";
import {
  Award,
  CheckCircle,
  XCircle,
  Lightbulb,
} from "lucide-react";

import ProtectedRoute from "@/components/ProtectedRoute";
import BackButton from "@/components/BackButton";

export default function AnalysisPage() {
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("analysis");

      if (stored) {
        setAnalysis(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Invalid analysis data:", error);
      localStorage.removeItem("analysis");
    }
  }, []);

  if (!analysis) {
    return (
      <ProtectedRoute>
        <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
          <h2 className="text-2xl font-semibold text-foreground">
            No Analysis Found
          </h2>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="space-y-8 text-foreground">

        {/* Page Title */}
        <div className="space-y-4">

          <BackButton />

          <div>
            <h1 className="text-4xl font-bold text-foreground">
              Resume Analysis
            </h1>

            <p className="text-muted">
              View your ATS score, matched skills and AI recommendations.
            </p>
          </div>

        </div>

        {/* ATS Score */}
        <section className="rounded-2xl border border-border bg-card p-6 shadow-md transition-all duration-300">

          <h2 className="mb-4 flex items-center gap-3 text-2xl font-semibold text-foreground">
            <Award
              size={28}
              className="text-primary"
            />
            ATS Score
          </h2>

          <div className="flex items-end gap-3">

            <p className="text-6xl font-bold text-primary">
              {analysis?.atsScore ?? 0}
            </p>

            <span className="pb-2 text-2xl font-semibold text-muted">
              %
            </span>

          </div>

          <div className="mt-6 h-3 w-full overflow-hidden rounded-full bg-border">

            <div
              className="h-full rounded-full bg-primary transition-all duration-700"
              style={{
                width: `${analysis?.atsScore ?? 0}%`,
              }}
            />

          </div>

        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">

          {/* Matched Skills */}
                    <section className="rounded-2xl border border-border bg-card p-6 shadow-md transition-all duration-300">

            <h2 className="mb-4 flex items-center gap-3 text-2xl font-semibold text-foreground">
              <CheckCircle
                size={26}
                className="text-success"
              />
              Matched Skills
            </h2>

            <div className="flex flex-wrap gap-3">
              {analysis.matchedSkills?.length ? (
                analysis.matchedSkills.map((skill, index) => (
                  <span
                    key={`${skill}-${index}`}
                    className="rounded-full bg-success/10 px-4 py-2 font-medium text-success"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-muted">
                  No matched skills found.
                </p>
              )}
            </div>

          </section>

          {/* Missing Skills */}

          <section className="rounded-2xl border border-border bg-card p-6 shadow-md transition-all duration-300">

            <h2 className="mb-4 flex items-center gap-3 text-2xl font-semibold text-foreground">
              <XCircle
                size={26}
                className="text-destructive"
              />
              Missing Skills
            </h2>

            <div className="flex flex-wrap gap-3">
              {analysis.missingSkills?.length ? (
                analysis.missingSkills.map((skill, index) => (
                  <span
                    key={`${skill}-${index}`}
                    className="rounded-full bg-destructive/10 px-4 py-2 font-medium text-destructive"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-muted">
                  No missing skills found.
                </p>
              )}
            </div>

          </section>

        </div>

        {/* AI Suggestions */}
                <section className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-md transition-all duration-300">

          <h2 className="mb-4 flex items-center gap-3 text-2xl font-semibold text-foreground">
            <Lightbulb
              size={26}
              className="text-warning"
            />
            AI Suggestions
          </h2>

          {analysis.suggestions?.length ? (
            <ul className="ml-5 list-disc space-y-2 text-foreground">
              {analysis.suggestions.map((item, index) => (
                <li key={`${item}-${index}`}>
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">
              No suggestions available.
            </p>
          )}

        </section>

        {/* Overall Feedback */}

        {analysis.overallFeedback && (
          <section className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-md transition-all duration-300">

            <h2 className="mb-4 text-2xl font-semibold text-foreground">
              Overall Feedback
            </h2>

            <p className="leading-8 text-muted">
              {analysis.overallFeedback}
            </p>

          </section>
        )}

      </div>
    </ProtectedRoute>
  );
}