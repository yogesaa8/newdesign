import { useState } from "react";
import { Download, Lock } from "lucide-react";
import Footer from "../components/Footer";
import useSEO from "@/seo/useSEO";
import toast from "@/lib/toast";

const CATEGORIES = ["All", "Placement", "Interview", "Resume", "Career"];

const EBOOKS = [
  {
    title: "The Complete Campus Placement Handbook 2025",
    category: "Placement",
    emoji: "🎓",
    pages: 84,
    prime: false,
    gradient: "from-sk-surface to-orange-50",
    desc: "Aptitude, coding rounds, GD, HR — everything covered with real examples from top MNCs.",
  },
  {
    title: "Crack the TCS NQT: Full Strategy Guide",
    category: "Placement",
    emoji: "📋",
    pages: 56,
    prime: false,
    gradient: "from-sk-surface to-orange-50",
    desc: "Section-wise tips, time management, and 200+ practice questions with solutions.",
  },
  {
    title: "Off-Campus Drive Tracker & Preparation Kit",
    category: "Placement",
    emoji: "🚀",
    pages: 40,
    prime: true,
    gradient: "from-sk-surface to-orange-50",
    desc: "Company-wise patterns, off-campus portals, and a weekly preparation schedule.",
  },
  {
    title: "50 Most Asked HR Interview Questions (With Model Answers)",
    category: "Interview",
    emoji: "🎙️",
    pages: 62,
    prime: false,
    gradient: "from-co-surface to-violet-50",
    desc: "Structured answers for 'Tell me about yourself', 'Salary expectations', and more.",
  },
  {
    title: "Technical Interview Prep for CS Freshers",
    category: "Interview",
    emoji: "💻",
    pages: 110,
    prime: true,
    gradient: "from-co-surface to-violet-50",
    desc: "DSA patterns, OS/DBMS concepts, and system design basics for fresher rounds.",
  },
  {
    title: "The Group Discussion Mastery Guide",
    category: "Interview",
    emoji: "🗣️",
    pages: 38,
    prime: false,
    gradient: "from-co-surface to-violet-50",
    desc: "20 common GD topics with frameworks, dos & don'ts, and sample scripts.",
  },
  {
    title: "Fresher Resume Templates + Writing Guide",
    category: "Resume",
    emoji: "📄",
    pages: 32,
    prime: false,
    gradient: "from-success-bg to-green-50",
    desc: "5 ATS-friendly templates with line-by-line instructions for each section.",
  },
  {
    title: "How to Write an AI Cover Letter That Gets Noticed",
    category: "Resume",
    emoji: "✍️",
    pages: 24,
    prime: false,
    gradient: "from-success-bg to-green-50",
    desc: "Prompts, edits, and before/after examples using FJI's AI Cover Letter tool.",
  },
  {
    title: "LinkedIn Profile Optimisation for Freshers",
    category: "Resume",
    emoji: "🔗",
    pages: 28,
    prime: true,
    gradient: "from-success-bg to-green-50",
    desc: "Headline formulas, keyword strategy, and how to get noticed by recruiters on LinkedIn.",
  },
  {
    title: "First Job to Fast Growth: A 90-Day Career Blueprint",
    category: "Career",
    emoji: "📈",
    pages: 50,
    prime: false,
    gradient: "from-info-bg to-blue-50",
    desc: "Week-by-week plan for your first 3 months at work — habits, visibility, and learning.",
  },
  {
    title: "Salary Negotiation for Freshers (Indian Market Edition)",
    category: "Career",
    emoji: "💰",
    pages: 20,
    prime: false,
    gradient: "from-info-bg to-blue-50",
    desc: "Scripts, counters, and what to never say during offer negotiation in India.",
  },
  {
    title: "Career Switching 101: Core to IT, Commerce to Tech",
    category: "Career",
    emoji: "🔄",
    pages: 44,
    prime: true,
    gradient: "from-info-bg to-blue-50",
    desc: "Real stories and step-by-step plans for freshers pivoting from non-CS backgrounds.",
  },
];

export default function EbookLibrary() {
  const [active, setActive] = useState("All");

  const seoElement = useSEO({
    title: "Free E-Books | FirstJobIndia",
    description: "Download free placement guides, interview prep handbooks, and career resources for freshers.",
    path: "/resources/ebooks",
  });

  const filtered = active === "All" ? EBOOKS : EBOOKS.filter((e) => e.category === active);

  function handleDownload(book) {
    if (book.prime) {
      toast.info("This e-book is available on Prime. Upgrade to access.");
    } else {
      toast.success(`Opening "${book.title}"...`);
    }
  }

  return (
    <>
      {seoElement}

      {/* Hero */}
      <section className="border-b border-n-200 bg-n-900 py-16 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <span className="inline-block rounded-full bg-sk-surface px-3 py-1 text-xs font-semibold text-sk-primary">
            Free Resources
          </span>
          <h1 className="mt-4 text-4xl font-extrabold text-white">
            E-Book Library
          </h1>
          <p className="mt-3 text-n-400">
            Practical guides written for Indian freshers — download free, no sign-up required.
          </p>
          <div className="mt-3 flex items-center justify-center gap-2 text-sm">
            <span className="rounded-full bg-success/20 px-3 py-1 text-xs font-semibold text-success">
              {EBOOKS.filter((e) => !e.prime).length} free downloads
            </span>
            <span className="rounded-full bg-sk-surface px-3 py-1 text-xs font-semibold text-sk-primary">
              ⭐ {EBOOKS.filter((e) => e.prime).length} Prime-only
            </span>
          </div>
        </div>
      </section>

      <section className="bg-n-50 py-12">
        <div className="mx-auto max-w-6xl px-4">

          {/* Category pills */}
          <div className="mb-8 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition ${
                  active === cat
                    ? "border-sk-primary bg-sk-surface text-sk-primary"
                    : "border-n-200 bg-white text-n-500 hover:border-n-300 hover:text-n-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((book) => (
              <div
                key={book.title}
                className="flex flex-col overflow-hidden rounded-xl border border-n-200 bg-white shadow-sm transition hover:shadow-md"
              >
                {/* Cover */}
                <div
                  className={`relative flex h-40 items-center justify-center bg-gradient-to-br ${book.gradient}`}
                >
                  <span className="text-5xl">{book.emoji}</span>
                  {book.prime && (
                    <span className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-sk-primary px-2 py-0.5 text-[10px] font-bold text-white">
                      <Lock className="h-2.5 w-2.5" />
                      Prime
                    </span>
                  )}
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-full bg-n-100 px-2 py-0.5 text-[10px] font-semibold text-n-600">
                      {book.category}
                    </span>
                    <span className="text-[10px] text-n-400">{book.pages} pages</span>
                  </div>
                  <h3 className="flex-1 text-sm font-bold leading-snug text-n-900">
                    {book.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-n-500 line-clamp-2">
                    {book.desc}
                  </p>
                  <button
                    onClick={() => handleDownload(book)}
                    className={`mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg py-2.5 text-xs font-semibold transition ${
                      book.prime
                        ? "border border-sk-primary text-sk-primary hover:bg-sk-surface"
                        : "bg-sk-primary text-white hover:bg-sk-hover"
                    }`}
                  >
                    {book.prime ? (
                      <>
                        <Lock className="h-3 w-3" />
                        Prime Only
                      </>
                    ) : (
                      <>
                        <Download className="h-3 w-3" />
                        Download Free
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Prime CTA */}
          <div className="mt-12 rounded-2xl border border-sk-border bg-sk-surface p-8 text-center">
            <p className="text-2xl font-extrabold text-n-900">
              Unlock all Prime-only e-books
            </p>
            <p className="mt-2 text-sm text-n-500">
              Plus unlimited job applications, AI cover letters, and 2 free mentor sessions.
            </p>
            <a
              href="/pricing"
              className="mt-5 inline-block rounded-xl bg-sk-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-sk-hover"
            >
              See Prime Plans →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
