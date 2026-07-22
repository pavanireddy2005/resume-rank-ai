"use client";

import ProtectedRoute from "@/components/ProtectedRoute";

const resumes = [
  {
    id: 1,
    fileName: "Resume_Frontend.pdf",
    role: "Frontend Developer",
    score: 88,
    date: "17 Jul 2026",
  },
  {
    id: 2,
    fileName: "Resume_MERN.pdf",
    role: "MERN Stack Developer",
    score: 82,
    date: "15 Jul 2026",
  },
  {
    id: 3,
    fileName: "Resume_AI.pdf",
    role: "AI Engineer",
    score: 91,
    date: "12 Jul 2026",
  },
];

export default function HistoryPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background p-8 text-foreground transition-colors duration-300">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground">
            Resume History
          </h1>

          <p className="mt-2 text-muted">
            View all previously analyzed resumes and their ATS scores.
          </p>
        </div>

        {/* History Table */}
        <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-md transition-all duration-300">

          {resumes.length === 0 ? (
            <div className="p-12 text-center text-muted">
              No resume history available.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <caption className="sr-only">
                  Resume upload and analysis history
                </caption>

                <thead className="border-b border-border bg-background">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Resume
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Job Role
                    </th>

                    <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">
                      ATS Score
                    </th>

                    <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">
                      Date
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {resumes.map((resume) => (
                    <tr
                      key={resume.id}
                      className="border-b border-border transition-colors duration-300 hover:bg-background"
                    >
                      <td className="px-6 py-5 font-medium text-foreground">
                        {resume.fileName}
                      </td>

                      <td className="px-6 py-5 text-muted">
                        {resume.role}
                      </td>

                      <td className="px-6 py-5 text-center">
                        <span className="inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
                          {resume.score}%
                        </span>
                      </td>

                      <td className="px-6 py-5 text-center text-muted">
                        {resume.date}
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}

        </section>

      </div>
    </ProtectedRoute>
  );
}