import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Share2, Copy } from "lucide-react";
import Footer from "../components/Footer";
import useSEO from "@/seo/useSEO";
import toast from "@/lib/toast";

const QUESTIONS = [
  {
    q: "Which of these best describes your educational background?",
    options: [
      "Engineering / Computer Science",
      "Commerce / Business / MBA",
      "Arts / Humanities / Social Science",
      "Science (non-CS) / Life Sciences",
    ],
  },
  {
    q: "What kind of work environment excites you most?",
    options: [
      "Building products used by millions",
      "Analysing data to drive business decisions",
      "Collaborating with clients and stakeholders",
      "Creating content, campaigns, or designs",
    ],
  },
  {
    q: "What's your strongest skill right now?",
    options: [
      "Coding / Technical problem solving",
      "Communication and persuasion",
      "Research and critical thinking",
      "Creativity and visual storytelling",
    ],
  },
  {
    q: "What matters most to you in your first job?",
    options: [
      "High CTC from day one",
      "Learning curve and mentorship",
      "Brand name / social credibility",
      "Work-life balance and flexibility",
    ],
  },
  {
    q: "How comfortable are you with ambiguity?",
    options: [
      "Love it — I thrive in fast-moving environments",
      "Somewhat — I prefer loose structure",
      "Not much — I like clear roles and processes",
      "Depends on the domain",
    ],
  },
];

const RESULTS = [
  {
    path: "Software Development",
    accent: "border-l-sk-primary",
    icon: "💻",
    why:
      "Your mix of technical skill and product curiosity lines up strongly with software roles. India's tech hiring is robust for freshers with solid fundamentals.",
    skills: ["DSA", "System Design", "React / Node", "SQL", "Git"],
    salary: "₹4L – ₹18L CTC",
    firstStep: "Build a CRUD project and deploy it on Vercel or Railway.",
  },
  {
    path: "Data & Business Analytics",
    accent: "border-l-co-primary",
    icon: "📊",
    why:
      "Your analytical approach and preference for data-backed decisions makes analytics a strong fit — one of the fastest-growing entry-level tracks at Indian product companies.",
    skills: ["Excel / Sheets", "SQL", "Python (Pandas)", "Power BI", "Statistics"],
    salary: "₹3.5L – ₹12L CTC",
    firstStep: "Complete a public dataset analysis on Kaggle and share it on LinkedIn.",
  },
  {
    path: "Marketing & Growth",
    accent: "border-l-info",
    icon: "📣",
    why:
      "Your communication strengths and creative instincts suit growth and marketing roles, especially at D2C brands and startups that value hustle and ownership.",
    skills: ["Copywriting", "Meta Ads", "SEO basics", "Google Analytics", "Canva"],
    salary: "₹2.5L – ₹8L CTC",
    firstStep: "Run a ₹500 Meta ad campaign for a local business or side project.",
  },
];

export default function CareerAdvisor() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const seoElement = useSEO({
    title: "Career Advisor | FirstJobIndia",
    description: "Take the 5-question career quiz to discover the best job paths for your skills and interests.",
    path: "/career-advisor",
  });

  function handleSelect(option) {
    setSelected(option);
  }

  function handleNext() {
    if (!selected) return;
    const next = [...answers, selected];
    setAnswers(next);
    setSelected(null);
    if (step + 1 >= QUESTIONS.length) {
      setShowResult(true);
    } else {
      setStep(step + 1);
    }
  }

  function handleRestart() {
    setStep(0);
    setAnswers([]);
    setSelected(null);
    setShowResult(false);
  }

  return (
    <>
      {seoElement}

      {/* Hero */}
      <section className="border-b border-n-200 bg-n-900 py-16 text-center">
        <div className="mx-auto max-w-xl px-4">
          <span className="inline-block rounded-full bg-sk-surface px-3 py-1 text-xs font-semibold text-sk-primary">
            Career Advisor
          </span>
          <h1 className="mt-4 text-4xl font-extrabold text-white">
            Find your best career path
          </h1>
          <p className="mt-3 text-n-400">
            5 questions · 2 minutes · No sign-up needed
          </p>
        </div>
      </section>

      <section className="min-h-[60vh] bg-n-50 py-16">
        <div className="mx-auto max-w-xl px-4">
          {!showResult ? (
            <>
              {/* Step indicator */}
              <div className="mb-8 flex items-center gap-2">
                {QUESTIONS.map((_, i) => (
                  <div key={i} className="flex flex-1 items-center gap-2">
                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition ${
                        i < step
                          ? "bg-sk-primary text-white"
                          : i === step
                          ? "border-2 border-sk-primary bg-white text-sk-primary ring-4 ring-sk-primary/10"
                          : "bg-n-200 text-n-400"
                      }`}
                    >
                      {i < step ? "✓" : i + 1}
                    </div>
                    {i < QUESTIONS.length - 1 && (
                      <div
                        className={`h-px flex-1 ${i < step ? "bg-sk-primary" : "bg-n-200"}`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <p className="mb-2 text-center text-xs text-n-400">
                Step {step + 1} of {QUESTIONS.length}
              </p>

              {/* Question card */}
              <div className="rounded-2xl border border-n-200 bg-white p-8 shadow-sm">
                <h2 className="mb-6 text-lg font-bold text-n-900">
                  {QUESTIONS[step].q}
                </h2>
                <div className="space-y-3">
                  {QUESTIONS[step].options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleSelect(opt)}
                      className={`w-full rounded-xl border p-4 text-left text-sm font-medium transition ${
                        selected === opt
                          ? "border-2 border-sk-primary bg-sk-surface text-n-900"
                          : "border-n-200 bg-white text-n-700 hover:border-n-300 hover:bg-n-50"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleNext}
                  disabled={!selected}
                  className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition ${
                    selected
                      ? "bg-sk-primary text-white hover:bg-sk-hover"
                      : "cursor-not-allowed bg-n-100 text-n-400"
                  }`}
                >
                  {step + 1 === QUESTIONS.length ? "See my results" : "Next"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Results */}
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-extrabold text-n-900">
                  Your top career paths
                </h2>
                <p className="mt-1 text-sm text-n-500">
                  Based on your answers, here's where you're most likely to thrive.
                </p>
              </div>

              <div className="space-y-5">
                {RESULTS.map((r, i) => (
                  <div
                    key={r.path}
                    className={`rounded-xl border border-n-200 bg-white p-6 shadow-sm border-l-4 ${r.accent}`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{r.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-n-900">{r.path}</h3>
                          {i === 0 && (
                            <span className="rounded-full bg-sk-surface px-2 py-0.5 text-[10px] font-bold text-sk-primary">
                              Best Match
                            </span>
                          )}
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-n-500">{r.why}</p>

                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {r.skills.map((s) => (
                            <span
                              key={s}
                              className="rounded-full bg-n-100 px-2.5 py-1 text-xs text-n-700"
                            >
                              {s}
                            </span>
                          ))}
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-xs font-semibold text-sk-primary">
                            {r.salary}
                          </span>
                        </div>

                        {/* First step — blurred if not first result */}
                        <div className="relative mt-4 rounded-lg border border-n-100 bg-n-50 p-3">
                          <p className="text-xs font-semibold text-n-700">
                            Recommended first step:
                          </p>
                          <p
                            className={`mt-1 text-xs text-n-500 ${
                              i > 0 ? "blur-sm select-none" : ""
                            }`}
                          >
                            {r.firstStep}
                          </p>
                          {i > 0 && (
                            <div className="absolute inset-0 flex items-center justify-center rounded-lg">
                              <Link
                                to="/seeker/signup"
                                className="rounded-lg bg-sk-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-sk-hover"
                              >
                                Sign up to unlock
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Share row */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => toast.info("Opening WhatsApp...")}
                  className="flex items-center gap-2 rounded-xl border border-n-200 bg-white px-4 py-2.5 text-sm font-semibold text-n-700 transition hover:bg-n-50"
                >
                  <Share2 className="h-4 w-4" />
                  Share on WhatsApp
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    toast.success("Link copied!");
                  }}
                  className="flex items-center gap-2 text-sm font-semibold text-co-primary hover:underline"
                >
                  <Copy className="h-4 w-4" />
                  Copy link
                </button>
                <button
                  onClick={handleRestart}
                  className="text-sm text-n-400 hover:text-n-700 underline"
                >
                  Retake quiz
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
