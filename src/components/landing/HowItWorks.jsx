import { Upload, BrainCircuit, BarChart3, Briefcase } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Upload Resume",
    description:
      "Upload your resume in PDF format securely. Our platform instantly prepares it for analysis.",
    icon: Upload,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: "02",
    title: "AI Analysis",
    description:
      "Our AI compares your resume with ATS standards and job descriptions to detect missing keywords.",
    icon: BrainCircuit,
    color: "bg-green-100 text-green-600",
  },
  {
    id: "03",
    title: "Get ATS Score",
    description:
      "Receive an ATS compatibility score along with detailed insights and improvement suggestions.",
    icon: BarChart3,
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: "04",
    title: "Improve & Apply",
    description:
      "Update your resume using AI recommendations and confidently apply for your dream job.",
    icon: Briefcase,
    color: "bg-orange-100 text-orange-600",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-slate-50 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}

        <div className="text-center">
          <span className="font-semibold uppercase tracking-wider text-blue-600">
            How It Works
          </span>

          <h2 className="mt-3 text-4xl font-bold text-slate-900 md:text-5xl">
            Improve Your Resume
            <span className="text-blue-600"> in Four Simple Steps</span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            ResumeRank AI makes resume optimization simple.
            Upload your resume, let AI analyze it,
            improve your score, and apply with confidence.
          </p>
        </div>

        {/* Timeline */}

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.id}
                className="relative rounded-3xl border border-slate-200 bg-white p-8 transition-shadow duration-300 hover:shadow-xl"
              >
                {/* Step Number */}

                <div className="absolute right-6 top-6 text-4xl font-extrabold text-slate-300">
                  {step.id}
                </div>

                {/* Icon */}

                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl ${step.color}`}
                >
                  <Icon size={30} />
                </div>

                {/* Title */}

                <h3 className="mt-8 text-2xl font-bold text-slate-900">
                  {step.title}
                </h3>

                {/* Description */}

                <p className="mt-4 leading-7 text-slate-600">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}