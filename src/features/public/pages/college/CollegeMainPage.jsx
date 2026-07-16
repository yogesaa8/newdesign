import { useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  ChartNoAxesCombined,
  CheckCircle2,
  ClipboardList,
  GraduationCap,
  Handshake,
  LayoutDashboard,
  Mail,
  Network,
  Phone,
  SearchCheck,
  UsersRound,
  Building2,
  TrendingUp,
  Shield,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import useSEO from "@/seo/useSEO";
import seoMeta from "@/data/seoMeta";
import { buildWebPage, buildBreadcrumbList } from "@/seo/schemas";
import Footer from "../../components/Footer";

const PAIN_POINTS = [
  {
    icon: Phone,
    title: "Recruiter follow-ups stay scattered",
    text: "Placement teams juggle calls, email threads, JD revisions, and drive dates without one reliable source of truth.",
  },
  {
    icon: SearchCheck,
    title: "Shortlists take too long",
    text: "Eligibility rules, branch filters, resumes, and student interest lists are still checked manually for every drive.",
  },
  {
    icon: ClipboardList,
    title: "Reports need repeated cleanup",
    text: "Offer counts, package bands, student participation, and recruiter outcomes are rebuilt whenever leadership asks.",
  },
];

const PLATFORM_FEATURES = [
  {
    icon: Network,
    title: "Recruiter pipeline",
    text: "Match your batch with verified fresher hiring teams by sector, package band, role type, and hiring window.",
  },
  {
    icon: CalendarDays,
    title: "Drive calendar",
    text: "Coordinate virtual and campus drives with student RSVP, round status, attendance, and offer tracking.",
  },
  {
    icon: LayoutDashboard,
    title: "Placement dashboard",
    text: "Track every student, interview round, shortlist, and final offer across departments in one view.",
    accent: true,
  },
  {
    icon: ChartNoAxesCombined,
    title: "Audit-ready reports",
    text: "Export placement summaries for NAAC, AICTE, NIRF, department reviews, and recruiter reviews.",
  },
];

const AUDIENCE = [
  {
    icon: GraduationCap,
    title: "Placement officers",
    text: "Run eligibility checks, coordinate drives, and track offer letters from one calm, structured workspace.",
  },
  {
    icon: UsersRound,
    title: "Students",
    text: "Give students clearer access to internship opportunities, campus drives, and real-time application updates.",
  },
  {
    icon: Handshake,
    title: "Recruiters",
    text: "Help employers reach eligible fresher talent faster with structured, verified campus data.",
  },
];

const STATS = [
  { value: "214+", label: "Verified recruiters" },
  { value: "1,126", label: "Offer letters tracked" },
  { value: "68%", label: "Avg. placement rate" },
  { value: "4.8 LPA", label: "Median package" },
];

const ACCREDITATIONS = ["NAAC", "AICTE", "NIRF", "Department review", "UGC"];

const CollegeMainPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const meta = seoMeta["/college"];
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
          { name: "College Partners", path: meta.path },
        ],
        meta.path,
      ),
    ],
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <>
      {seoElement}
      <main className="min-h-screen bg-white text-n-900">

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-n-900 px-4 py-24 md:py-32">
          {/* Ambient blurs */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-co-primary/20 blur-3xl" />
            <div className="absolute -right-32 top-10 h-72 w-72 rounded-full bg-co-primary/10 blur-3xl" />
            <div className="absolute bottom-0 left-1/2 h-56 w-96 -translate-x-1/2 rounded-full bg-co-primary/10 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-5xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-co-primary/30 bg-co-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-co-hover">
              <Building2 className="h-3.5 w-3.5" />
              College Partnerships
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
              Run placements from{" "}
              <span className="text-co-hover">one trusted</span>
              <br />
              campus dashboard.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-n-400 md:text-lg">
              FirstJobIndia helps placement teams coordinate recruiters, shortlist
              eligible students, track offers, and generate audit-ready reports —
              without spreadsheets or scattered calls.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl bg-co-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-co-hover active:bg-co-pressed"
              >
                Book a campus demo
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#platform"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-7 py-3.5 text-sm font-semibold text-white/70 transition hover:border-white/30 hover:text-white"
              >
                See the platform
              </a>
            </div>

            {/* Trust chips */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {[
                "Free to partner",
                "No long-term contract",
                "Responds in 1 working day",
              ].map((note) => (
                <span
                  key={note}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-n-400"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                  {note}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── STATS STRIP ──────────────────────────────────────────────── */}
        <section className="bg-co-primary px-4 py-10">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 md:grid-cols-4">
            {STATS.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-3xl font-extrabold text-white">{value}</p>
                <p className="mt-1 text-xs font-medium text-co-surface/80">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── PAIN POINTS ──────────────────────────────────────────────── */}
        <section id="why-partner" className="bg-n-50 px-4 py-16 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-co-primary">
                Why partner
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-n-900 md:text-4xl">
                Placement work should not depend
                <br />
                on scattered files.
              </h2>
              <p className="mt-3 text-base leading-7 text-n-500">
                Built around the operational gaps placement officers tell us they
                face every season.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {PAIN_POINTS.map(({ icon: Icon, title, text }) => (
                <article
                  key={title}
                  className="rounded-xl border border-n-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-co-surface text-co-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-n-900">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-n-500">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── PLATFORM FEATURES ────────────────────────────────────────── */}
        <section id="platform" className="bg-white px-4 py-16 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 grid gap-10 lg:grid-cols-[340px_1fr] lg:items-start">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-co-primary">
                  Platform
                </span>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-n-900 md:text-4xl">
                  Four tools your placement cell can use together.
                </h2>
                <p className="mt-3 text-base leading-7 text-n-500">
                  Recruiter coordination, student readiness, and reporting — all
                  in the same workflow.
                </p>
                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-co-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-co-hover"
                >
                  Get a walkthrough <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {PLATFORM_FEATURES.map(({ icon: Icon, title, text, accent }) => (
                  <article
                    key={title}
                    className={`rounded-xl border p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                      accent
                        ? "border-co-border bg-co-surface"
                        : "border-n-200 bg-n-50"
                    }`}
                  >
                    <div
                      className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${
                        accent
                          ? "bg-co-primary text-white"
                          : "bg-white text-co-primary border border-n-200"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-semibold text-n-900">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-n-500">{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── ACCREDITATION / REPORTS ──────────────────────────────────── */}
        <section className="border-y border-n-200 bg-n-50 px-4 py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_420px] lg:items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-co-primary">
                Reports
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-n-900 md:text-4xl">
                Audit-ready numbers,
                <br />
                without rebuilding spreadsheets.
              </h2>
              <p className="mt-4 text-base leading-7 text-n-500">
                Export placement summaries by batch, branch, recruiter, package
                band, interview stage, and final offers whenever leadership or
                accreditation teams need them.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {ACCREDITATIONS.map((label) => (
                  <span
                    key={label}
                    className="rounded-full border border-co-border bg-co-surface px-3 py-1 text-xs font-semibold text-co-primary"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats card */}
            <div className="rounded-2xl border border-n-200 bg-white shadow-sm">
              {[
                { label: "Placement rate", value: "68%", note: "up 12% YoY", color: "text-success" },
                { label: "Median package", value: "4.8 LPA", note: "Batch 2026", color: "text-co-primary" },
                { label: "Active recruiters", value: "214", note: "verified", color: "text-info" },
                { label: "Offer letters", value: "1,126", note: "tracked", color: "text-sk-primary" },
              ].map(({ label, value, note, color }, i, arr) => (
                <div
                  key={label}
                  className={`flex items-center justify-between gap-4 px-6 py-5 ${
                    i < arr.length - 1 ? "border-b border-n-200" : ""
                  }`}
                >
                  <div>
                    <p className="text-sm font-semibold text-n-900">{label}</p>
                    <p className="mt-0.5 text-xs text-n-400">{note}</p>
                  </div>
                  <p className={`text-2xl font-extrabold ${color}`}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHO IT'S FOR ─────────────────────────────────────────────── */}
        <section className="bg-white px-4 py-16 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-co-primary">
                Who benefits
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-n-900 md:text-4xl">
                Built for every stakeholder in your placement ecosystem.
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {AUDIENCE.map(({ icon: Icon, title, text }) => (
                <article
                  key={title}
                  className="rounded-xl border border-n-200 bg-n-50 p-6 shadow-sm text-center transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-co-surface text-co-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-semibold text-n-900">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-n-500">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── SOCIAL PROOF QUOTE ───────────────────────────────────────── */}
        <section className="bg-co-surface px-4 py-14">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-co-primary text-co-primary" />
              ))}
            </div>
            <blockquote className="text-xl font-semibold leading-relaxed text-n-900 md:text-2xl">
              "We reduced recruiter follow-up time by 60% and generated our NAAC
              report in under 10 minutes. This is what placement tech should feel like."
            </blockquote>
            <p className="mt-5 text-sm font-semibold text-co-primary">
              Dr. Anita Sharma — Placement Officer, Government College of Engineering, Pune
            </p>
          </div>
        </section>

        {/* ── CONTACT FORM ─────────────────────────────────────────────── */}
        <section id="contact" className="bg-n-900 px-4 py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-start">

            {/* Left copy */}
            <div className="text-white">
              <span className="text-xs font-semibold uppercase tracking-widest text-co-hover">
                Talk to us
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                Tell us about your campus.
              </h2>
              <p className="mt-4 text-base leading-7 text-n-400">
                Share a few details and our partnerships team will respond within
                one working day with a walkthrough scoped to your batch size and
                recruiter goals.
              </p>

              <div className="mt-8 space-y-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-co-surface/10">
                    <Mail className="h-4 w-4 text-co-hover" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Email</p>
                    <p className="text-sm text-n-400">contact@firstjobind.in</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-co-surface/10">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Response time</p>
                    <p className="text-sm text-n-400">Under one working day</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-co-surface/10">
                    <Shield className="h-4 w-4 text-co-hover" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">No commitment</p>
                    <p className="text-sm text-n-400">Free to partner, no lock-in</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <form
              className="rounded-2xl border border-n-700 bg-white p-6 shadow-xl md:p-8"
              onSubmit={handleSubmit}
            >
              {isSubmitted && (
                <div className="mb-5 flex items-center gap-3 rounded-xl border border-success/20 bg-success-bg px-4 py-3 text-sm font-semibold text-success">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  Thanks! Our partnerships team will get back within one working day.
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-n-500">
                    Your name
                  </label>
                  <input
                    type="text"
                    placeholder="Dr. Anita Sharma"
                    required
                    className="w-full rounded-lg border border-n-200 bg-n-50 px-4 py-3 text-sm text-n-900 outline-none transition placeholder:text-n-400 focus:border-co-primary focus:bg-white focus:ring-2 focus:ring-co-primary/10"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-n-500">
                    Your role
                  </label>
                  <input
                    type="text"
                    placeholder="Placement officer"
                    required
                    className="w-full rounded-lg border border-n-200 bg-n-50 px-4 py-3 text-sm text-n-900 outline-none transition placeholder:text-n-400 focus:border-co-primary focus:bg-white focus:ring-2 focus:ring-co-primary/10"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-n-500">
                  College / institute
                </label>
                <input
                  type="text"
                  placeholder="Government College of Engineering"
                  required
                  className="w-full rounded-lg border border-n-200 bg-n-50 px-4 py-3 text-sm text-n-900 outline-none transition placeholder:text-n-400 focus:border-co-primary focus:bg-white focus:ring-2 focus:ring-co-primary/10"
                />
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-n-500">
                    Work email
                  </label>
                  <input
                    type="email"
                    placeholder="placements@college.edu.in"
                    required
                    className="w-full rounded-lg border border-n-200 bg-n-50 px-4 py-3 text-sm text-n-900 outline-none transition placeholder:text-n-400 focus:border-co-primary focus:bg-white focus:ring-2 focus:ring-co-primary/10"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-n-500">
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98xxxxxxxx"
                    required
                    className="w-full rounded-lg border border-n-200 bg-n-50 px-4 py-3 text-sm text-n-900 outline-none transition placeholder:text-n-400 focus:border-co-primary focus:bg-white focus:ring-2 focus:ring-co-primary/10"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-n-500">
                  What should we prepare?
                </label>
                <textarea
                  rows={4}
                  placeholder="Batch size, departments, placement season, reporting needs..."
                  className="w-full resize-none rounded-lg border border-n-200 bg-n-50 px-4 py-3 text-sm text-n-900 outline-none transition placeholder:text-n-400 focus:border-co-primary focus:bg-white focus:ring-2 focus:ring-co-primary/10"
                />
              </div>

              <button
                type="submit"
                className="mt-5 w-full rounded-xl bg-co-primary py-3.5 text-sm font-semibold text-white transition hover:bg-co-hover active:bg-co-pressed"
              >
                Request a demo →
              </button>

              <p className="mt-3 text-center text-xs text-n-400">
                Free to join. No commitment required.
              </p>
            </form>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default CollegeMainPage;
