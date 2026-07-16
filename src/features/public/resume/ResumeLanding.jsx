import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Download,
  FileText,
  PenLine,
  Shield,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import useSEO from "@/seo/useSEO";
import seoMeta from "@/data/seoMeta";
import {
  buildBreadcrumbList,
  buildFAQPage,
  buildHowTo,
  buildWebPage,
} from "@/seo/schemas";
import resumeFaqs from "@/data/resumeFaqs";

const CLIENTS = [
  { name: "Microsoft", logo: "/images/clients/microsoft.svg" },
  { name: "Google", logo: "/images/clients/google.svg" },
  { name: "Airbnb", logo: "/images/clients/airbnb.svg" },
  { name: "Netflix", logo: "/images/clients/netflix.svg" },
  { name: "GE", logo: "/images/clients/ge.svg" },
  { name: "Google Cloud", logo: "/images/clients/google-cloud.svg" },
];

const FEATURES = [
  {
    icon: FileText,
    title: "Fresher-first sections",
    text: "Education, projects, internships, skills, and objective prompts structured for first-job applications in India.",
  },
  {
    icon: Sparkles,
    title: "AI writing help",
    text: "Claude rewrites your bullets, suggests missing skills, and grades your resume — before you download.",
    accent: "violet",
  },
  {
    icon: PenLine,
    title: "Live preview",
    text: "Fill guided fields and see your resume update instantly. Catch mistakes before they reach a recruiter.",
  },
  {
    icon: Download,
    title: "PDF download",
    text: "Export a print-ready PDF in one click and apply directly to verified fresher jobs on FJI.",
  },
  {
    icon: Zap,
    title: "6 ATS templates",
    text: "Classic, two-column, tech-optimised, creative, skills-first, and MBA — each built for a different recruiter.",
  },
  {
    icon: Shield,
    title: "100% private",
    text: "Your resume data never leaves your browser. No account needed and auto-saved locally.",
  },
  {
    icon: Target,
    title: "AI job tailor",
    text: "Paste a job description and Claude rewrites your resume to highlight the right keywords and skills.",
    accent: "violet",
  },
  {
    icon: CheckCircle2,
    title: "ATS score check",
    text: "Get an instant score on keyword coverage, formatting, and length — before you hit send.",
  },
];

const STEPS = [
  { n: "01", title: "Choose a format", desc: "Six ATS-tested layouts. Pick for your target role — switch any time." },
  { n: "02", title: "Add your details", desc: "Contact, education, projects, skills, internships and a career objective." },
  { n: "03", title: "Review AI suggestions", desc: "Let Claude polish your bullets, suggest skills, and score your resume." },
  { n: "04", title: "Download & apply", desc: "Export a clean PDF and start applying to 1,200+ fresher openings." },
];

const STATS = [
  { label: "100% free — always" },
  { label: "ATS-score in seconds" },
  { label: "50,000+ resumes built" },
];

const SOLUTION_POINTS = [
  "ATS-friendly formatting that passes automated screening",
  "AI scoring so you know your resume's strength before applying",
  "Keyword suggestions matched to the role you want",
  "6 templates built for different fresher job types",
];

const ResumeLanding = () => {
  const meta = seoMeta["/resume"];
  const seoElement = useSEO({
    title: meta.title,
    description: meta.description,
    path: meta.path,
    graph: [
      buildWebPage({
        path: meta.path,
        title: meta.title,
        description: meta.description,
        breadcrumbPath: meta.path,
      }),
      buildBreadcrumbList(
        [
          { name: "Home", path: "/" },
          { name: "Resume Builder", path: meta.path },
        ],
        meta.path,
      ),
      buildFAQPage(resumeFaqs),
      buildHowTo({
        name: "How to build a fresher resume on FirstJobIndia",
        description: "A short guide to building a recruiter-ready fresher resume on FirstJobIndia.",
        steps: [
          { name: "Choose a format", text: "Pick a resume format designed for your first-job target role." },
          { name: "Add your details", text: "Fill in contact details, education, projects, skills, and internships." },
          { name: "Review the live preview", text: "Use the preview and score prompts to improve structure and impact." },
          { name: "Download as PDF", text: "Export the finished resume and start applying to fresher jobs." },
        ],
      }),
    ],
  });

  return (
    <>
      {seoElement}
      <main className="min-h-screen bg-white text-n-900">

        {/* ── HERO ───────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-n-900 px-4 py-24 md:py-32">
          {/* Ambient blur circles */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-sk-primary/20 blur-3xl" />
            <div className="absolute -right-40 top-10 h-80 w-80 rounded-full bg-co-primary/15 blur-3xl" />
            <div className="absolute bottom-0 left-1/2 h-64 w-96 -translate-x-1/2 rounded-full bg-sk-primary/10 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-4xl text-center">
            <span className="inline-block rounded-full border border-sk-primary/25 bg-sk-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sk-primary">
              Free AI Resume Builder
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
              Build a resume that
              <br />
              <span className="text-sk-primary">gets you hired faster</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-n-400 md:text-lg">
              ATS-friendly templates, AI-powered writing help, and instant scoring —
              all free. Designed for Indian freshers applying to their first job.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/resume/builder"
                className="inline-flex items-center gap-2 rounded-lg bg-sk-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-sk-hover active:bg-sk-pressed"
              >
                Build my resume free
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/jobs"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-7 py-3.5 text-sm font-semibold text-white/70 transition hover:border-white/30 hover:text-white"
              >
                Browse jobs
              </Link>
            </div>

            {/* Stats strip */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-10">
              {STATS.map(({ label }) => (
                <span key={label} className="flex items-center gap-2.5 text-sm font-medium text-n-400">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sk-primary/20">
                    <Check className="h-3 w-3 text-sk-primary" />
                  </span>
                  {label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── LOGO STRIP ─────────────────────────────────────────────── */}
        <section className="border-b border-n-200 bg-n-50 px-4 py-10">
          <div className="mx-auto max-w-6xl">
            <p className="mb-8 text-center text-xs font-semibold uppercase tracking-widest text-n-400">
              Freshers placed at top companies use FJI resumes
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
              {CLIENTS.map(({ name, logo }) => (
                <img
                  key={name}
                  src={logo}
                  alt={name}
                  className="h-7 w-auto object-contain opacity-40 grayscale transition hover:opacity-70 hover:grayscale-0 md:h-8"
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURES GRID ──────────────────────────────────────────── */}
        <section className="px-4 py-16 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-sk-primary">
                Built for freshers
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-n-900 md:text-4xl">
                Everything you need,
                <br />
                nothing you don't
              </h2>
              <p className="mt-3 text-base leading-7 text-n-500">
                No fluff. Each feature exists because freshers asked for it.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {FEATURES.map(({ icon: Icon, title, text, accent }) => (
                <article
                  key={title}
                  className="group rounded-xl border border-n-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
                >
                  <div
                    className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${
                      accent === "violet"
                        ? "bg-co-surface text-co-primary"
                        : "bg-sk-surface text-sk-primary"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-semibold text-n-900">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-n-500">{text}</p>
                  <Link
                    to="/resume/builder"
                    className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-sk-primary transition-all group-hover:gap-2"
                  >
                    Try it free
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── SOLUTION SECTION ───────────────────────────────────────── */}
        <section className="border-y border-n-200 bg-sk-bg px-4 py-16 md:py-24">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 lg:flex-row lg:gap-20">

            {/* Left: copy */}
            <div className="flex-1">
              <span className="text-xs font-semibold uppercase tracking-widest text-sk-primary">
                Why it matters
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-n-900 md:text-4xl">
                Recruiters spend 6 seconds
                <br />
                on your resume
              </h2>
              <p className="mt-4 text-base leading-7 text-n-500">
                An ATS-optimised, well-structured resume gets you past automated screening
                and into the recruiter's shortlist. Our builder handles the hard parts.
              </p>

              <ul className="mt-6 space-y-3">
                {SOLUTION_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-n-700">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sk-primary/10">
                      <Check className="h-3 w-3 text-sk-primary" />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>

              <Link
                to="/resume/builder"
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-sk-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sk-hover active:bg-sk-pressed"
              >
                Start building free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Right: pie visualization */}
            <div className="w-full max-w-md shrink-0 lg:w-[420px]">
              <div className="rounded-2xl border border-n-200 bg-white p-8 shadow-xl">
                <img
                  src="/images/pie.svg"
                  alt="Resume score breakdown"
                  className="mx-auto w-full max-w-xs"
                />
                <div className="mt-6 grid grid-cols-2 gap-3 text-center text-xs">
                  {[
                    { label: "ATS Pass Rate", value: "94%", color: "text-sk-primary" },
                    { label: "Avg. Score", value: "82/100", color: "text-co-primary" },
                    { label: "Templates", value: "6", color: "text-success" },
                    { label: "Build Time", value: "~12 min", color: "text-info" },
                  ].map(({ label, value, color }) => (
                    <div key={label} className="rounded-lg bg-n-50 px-3 py-3">
                      <p className={`text-xl font-extrabold ${color}`}>{value}</p>
                      <p className="mt-0.5 text-n-500">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ───────────────────────────────────────────── */}
        <section className="bg-white px-4 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-sk-primary">Simple workflow</span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-n-900 md:text-4xl">
                From blank page to PDF in 4 steps
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map(({ n, title, desc }, idx) => (
                <div key={n} className="relative rounded-xl border border-n-200 bg-sk-bg p-6">
                  {idx < STEPS.length - 1 && (
                    <div className="absolute right-0 top-8 hidden h-px w-6 bg-n-200 lg:block translate-x-full" />
                  )}
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-sk-primary text-sm font-bold text-white shadow-sm">
                    {n}
                  </div>
                  <h3 className="text-base font-semibold text-n-900">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-n-500">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ─────────────────────────────────────────────── */}
        <section className="bg-n-900 px-4 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-white">
                  Ready to land your first job?
                </h2>
                <p className="mt-3 max-w-xl text-base text-n-400">
                  Build your resume once, auto-saved in your browser. No sign-up needed.
                </p>
              </div>
              <Link
                to="/resume/builder"
                className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-sk-primary px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sk-hover active:bg-sk-pressed"
              >
                Create my resume
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── FAQ ────────────────────────────────────────────────────── */}
        <section className="bg-sk-bg px-4 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-n-900">
                Resume questions freshers ask
              </h2>
              <p className="mt-3 text-base text-n-500">Common doubts, answered straight.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {resumeFaqs.map((faq) => (
                <article
                  key={faq.question}
                  className="rounded-xl border border-n-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sk-primary" />
                    <div>
                      <h3 className="text-sm font-semibold text-n-900">{faq.question}</h3>
                      <p className="mt-2 text-sm leading-6 text-n-500">{faq.answer}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

      </main>
    </>
  );
};

export default ResumeLanding;
