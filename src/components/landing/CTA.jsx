import Link from "next/link";

export default function CTA() {
  return (
    <section className="bg-blue-600 py-24">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <h2 className="text-4xl font-bold text-white md:text-5xl">
          Ready to Boost Your Resume?
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">
          Join thousands of job seekers using ResumeRank AI
          to improve their ATS score, optimize resumes,
          and increase interview opportunities.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row">
          <Link
            href="/login"
            className="rounded-xl border-2 border-white px-8 py-4 text-lg font-semibold text-white transition-colors duration-300 hover:bg-white hover:text-blue-600"
          >
            Get Started
          </Link>

          <Link
            href="/register"
            className="rounded-xl border-2 border-white px-8 py-4 text-lg font-semibold text-white transition-colors duration-300 hover:bg-white hover:text-blue-600"
          >
            Create Free Account
          </Link>
        </div>
      </div>
    </section>
  );
}