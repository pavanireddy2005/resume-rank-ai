import {
  FileText,
  Brain,
  BarChart3,
} from "lucide-react";

export default function Features() {
  return (
    <section
      id="features"
      className="bg-white py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}

        <div className="text-center">
          <span className="font-semibold uppercase tracking-wider text-blue-600">
            Features
          </span>

          <h2 className="mt-3 text-4xl font-bold text-slate-900 md:text-5xl">
            Everything You Need to Build
            <span className="text-blue-600"> Better Resumes</span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            ResumeRank AI analyzes your resume using AI,
            identifies missing keywords, compares it with
            job descriptions, and helps improve your ATS score.
          </p>
        </div>

        {/* Cards */}

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 */}

          <div className="rounded-3xl border border-slate-200 p-8 transition-shadow duration-300 hover:shadow-xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">
              <FileText
                size={30}
                className="text-blue-600"
              />
            </div>

            <h3 className="mt-8 text-2xl font-bold text-slate-900">
              Resume Analysis
            </h3>

            <p className="mt-4 leading-7 text-slate-600">
              Upload your resume and instantly receive a
              detailed ATS compatibility report with
              improvement suggestions.
            </p>
          </div>

          {/* Card 2 */}

          <div className="rounded-3xl border border-slate-200 p-8 transition-shadow duration-300 hover:shadow-xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100">
              <Brain
                size={30}
                className="text-green-600"
              />
            </div>

            <h3 className="mt-8 text-2xl font-bold text-slate-900">
              AI Suggestions
            </h3>

            <p className="mt-4 leading-7 text-slate-600">
              Receive smart recommendations to improve
              wording, skills, achievements,
              and ATS keyword matching.
            </p>
          </div>

          {/* Card 3 */}

          <div className="rounded-3xl border border-slate-200 p-8 transition-shadow duration-300 hover:shadow-xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100">
              <BarChart3
                size={30}
                className="text-purple-600"
              />
            </div>

            <h3 className="mt-8 text-2xl font-bold text-slate-900">
              ATS Score
            </h3>

            <p className="mt-4 leading-7 text-slate-600">
              Measure your resume&apos;s ATS score and
              track improvements before applying
              for your dream job.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}