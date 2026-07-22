import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-2">
        {/* LEFT */}

        <div>
          <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            🚀 AI-Powered Resume Analyzer
          </span>

          <h1 className="mt-8 text-5xl font-extrabold leading-tight text-slate-900 md:text-6xl">
            Get Your Resume

            <span className="block text-blue-600">
              ATS Ready
            </span>

            in Minutes
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-slate-600">
            Upload your resume, compare it with a job description,
            receive an ATS score, discover missing skills, and
            get AI-powered suggestions to improve your chances
            of landing interviews.
          </p>

          <div className="mt-10 flex flex-wrap gap-5">
            <Link
              href="/register"
              aria-label="Get started with ResumeRank AI"
              className="rounded-xl bg-blue-600 px-7 py-4 font-semibold text-white shadow-lg transition-colors hover:bg-blue-700"
            >
              Get Started Free
            </Link>

            <Link
              href="#features"
              aria-label="Learn more about ResumeRank AI features"
              className="rounded-xl border border-slate-900 px-7 py-4 font-semibold text-slate-900 transition-colors hover:border-blue-600 hover:text-blue-600"
            >
              Learn More
            </Link>
          </div>

          {/* Statistics */}

          <div className="mt-14 grid grid-cols-3 gap-8">
            <div>
              <h2 className="text-4xl font-bold text-slate-900">
                10K+
              </h2>

              <p className="mt-2 text-slate-600">
                Resumes Analyzed
              </p>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-slate-900">
                95%
              </h2>

              <p className="mt-2 text-slate-600">
                ATS Accuracy
              </p>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-slate-900">
                24/7
              </h2>

              <p className="mt-2 text-slate-600">
                AI Support
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT */}

        <div className="flex justify-center">
          <div
            className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl"
            aria-label="Resume analysis preview"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">
                Resume Analysis
              </h2>

              <span className="font-bold text-green-600">
                Complete
              </span>
            </div>

            <div className="mt-8 space-y-6">
              {/* Score */}

              <div>
                <div className="mb-2 flex justify-between text-slate-700">
                  <span>ATS Score</span>

                  <span className="font-bold text-green-600">
                    89%
                  </span>
                </div>

                <div
                  className="h-3 w-full rounded-full bg-slate-200"
                  role="progressbar"
                  aria-label="ATS Score"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={89}
                >
                  <div className="h-3 w-[89%] rounded-full bg-green-500" />
                </div>
              </div>

              {/* Skills */}

              <div className="rounded-xl bg-green-50 p-4 font-medium text-green-800">
                ✅ Skills Matched

                <p className="mt-2 text-sm font-normal">
                  React • JavaScript • Node.js
                </p>
              </div>

              {/* Missing */}

              <div className="rounded-xl bg-red-50 p-4 font-medium text-red-800">
                ❌ Missing Skills

                <p className="mt-2 text-sm font-normal">
                  Docker • AWS
                </p>
              </div>

              {/* Suggestion */}

              <div className="rounded-xl bg-blue-50 p-5 text-blue-900">
                <h3 className="mb-2 font-semibold">
                  💡 AI Suggestion
                </h3>

                <p className="leading-7">
                  Add measurable achievements, include missing
                  keywords from the job description, and quantify
                  your project impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}