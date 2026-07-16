import { useState } from "react";
import { Star } from "lucide-react";
import Footer from "../components/Footer";
import useSEO from "@/seo/useSEO";
import toast from "@/lib/toast";

const MENTORS = [
  {
    name: "Ananya Krishnan",
    initials: "AK",
    company: "Google",
    role: "Software Engineer L4",
    domain: "Software Dev",
    exp: "3–5 yrs",
    rating: 4.9,
    reviews: 34,
    rates: [{ label: "30 min", price: "₹500" }, { label: "60 min", price: "₹900" }],
    tags: ["DSA", "System Design", "Interviews"],
  },
  {
    name: "Rohit Mehra",
    initials: "RM",
    company: "Flipkart",
    role: "Senior PM",
    domain: "Product",
    exp: "5–8 yrs",
    rating: 4.8,
    reviews: 27,
    rates: [{ label: "30 min", price: "₹600" }, { label: "60 min", price: "₹1,100" }],
    tags: ["Product Strategy", "Case Studies", "PGDM Prep"],
  },
  {
    name: "Priya Sharma",
    initials: "PS",
    company: "Deloitte",
    role: "Data Analyst",
    domain: "Data & Analytics",
    exp: "2–4 yrs",
    rating: 4.7,
    reviews: 19,
    rates: [{ label: "30 min", price: "₹400" }, { label: "60 min", price: "₹750" }],
    tags: ["SQL", "Power BI", "Excel"],
  },
  {
    name: "Vikram Nair",
    initials: "VN",
    company: "HUL",
    role: "Brand Manager",
    domain: "Marketing",
    exp: "3–5 yrs",
    rating: 4.8,
    reviews: 22,
    rates: [{ label: "30 min", price: "₹450" }, { label: "60 min", price: "₹800" }],
    tags: ["Marketing Strategy", "FMCG", "MBA Prep"],
  },
  {
    name: "Deepika Rao",
    initials: "DR",
    company: "Swiggy",
    role: "UX Designer",
    domain: "Design",
    exp: "2–4 yrs",
    rating: 4.9,
    reviews: 41,
    rates: [{ label: "30 min", price: "₹500" }, { label: "60 min", price: "₹900" }],
    tags: ["Figma", "Portfolio Review", "UX Research"],
  },
  {
    name: "Arjun Kapoor",
    initials: "AK",
    company: "Razorpay",
    role: "Backend Engineer",
    domain: "Software Dev",
    exp: "3–5 yrs",
    rating: 4.7,
    reviews: 18,
    rates: [{ label: "30 min", price: "₹500" }, { label: "60 min", price: "₹950" }],
    tags: ["Node.js", "Microservices", "Interview Prep"],
  },
  {
    name: "Neha Gupta",
    initials: "NG",
    company: "McKinsey",
    role: "Business Analyst",
    domain: "Consulting",
    exp: "2–4 yrs",
    rating: 4.9,
    reviews: 53,
    rates: [{ label: "30 min", price: "₹700" }, { label: "60 min", price: "₹1,300" }],
    tags: ["Case Interviews", "Frameworks", "Resume"],
  },
  {
    name: "Karthik Iyer",
    initials: "KI",
    company: "Amazon",
    role: "SDE II",
    domain: "Software Dev",
    exp: "3–5 yrs",
    rating: 4.8,
    reviews: 30,
    rates: [{ label: "30 min", price: "₹550" }, { label: "60 min", price: "₹1,000" }],
    tags: ["Java", "AWS", "Leadership Principles"],
  },
  {
    name: "Pooja Menon",
    initials: "PM",
    company: "Zepto",
    role: "Growth Manager",
    domain: "Marketing",
    exp: "2–4 yrs",
    rating: 4.6,
    reviews: 15,
    rates: [{ label: "30 min", price: "₹400" }, { label: "60 min", price: "₹700" }],
    tags: ["Growth Hacking", "Meta Ads", "Analytics"],
  },
  {
    name: "Suresh Pillai",
    initials: "SP",
    company: "ICICI Bank",
    role: "Risk Analyst",
    domain: "Finance",
    exp: "5–8 yrs",
    rating: 4.7,
    reviews: 24,
    rates: [{ label: "30 min", price: "₹450" }, { label: "60 min", price: "₹800" }],
    tags: ["Banking", "CFA Prep", "Excel Modelling"],
  },
];

const DOMAINS = ["All", "Software Dev", "Product", "Data & Analytics", "Marketing", "Design", "Consulting", "Finance"];
const EXPERIENCES = ["All", "2–4 yrs", "3–5 yrs", "5–8 yrs"];

const DOMAIN_COLORS = {
  "Software Dev": "bg-co-surface text-co-primary",
  "Product": "bg-sk-surface text-sk-primary",
  "Data & Analytics": "bg-info-bg text-info",
  "Marketing": "bg-warning-bg text-warning",
  "Design": "bg-success-bg text-success",
  "Consulting": "bg-co-surface text-co-primary",
  "Finance": "bg-sk-surface text-sk-primary",
};

export default function MentorsList() {
  const [domain, setDomain] = useState("All");
  const [exp, setExp] = useState("All");

  const seoElement = useSEO({
    title: "Mentors | FirstJobIndia",
    description: "Book a 1:1 session with experienced professionals across software, product, marketing, and more.",
    path: "/mentors",
  });

  const filtered = MENTORS.filter(
    (m) =>
      (domain === "All" || m.domain === domain) &&
      (exp === "All" || m.exp === exp),
  );

  return (
    <>
      {seoElement}

      {/* Hero */}
      <section className="border-b border-n-200 bg-n-900 py-16 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <span className="inline-block rounded-full bg-co-surface px-3 py-1 text-xs font-semibold text-co-primary">
            1:1 Mentor Sessions
          </span>
          <h1 className="mt-4 text-4xl font-extrabold text-white">
            Learn from people doing your dream job
          </h1>
          <p className="mt-3 text-n-400">
            Book a focused 30 or 60-minute session. Get feedback on your resume, crack interview prep, or chart your career roadmap.
          </p>
        </div>
      </section>

      <section className="bg-n-50 py-10">
        <div className="mx-auto max-w-6xl px-4">

          {/* Prime nudge */}
          <div className="mb-8 flex items-center justify-between rounded-xl border border-sk-border bg-sk-surface px-5 py-4">
            <p className="text-sm font-medium text-n-700">
              ⭐ <strong>Prime members</strong> get 2 free mentor sessions every month.
            </p>
            <a
              href="/pricing"
              className="shrink-0 rounded-lg border border-sk-primary px-4 py-1.5 text-xs font-semibold text-sk-primary transition hover:bg-sk-primary hover:text-white"
            >
              See Prime →
            </a>
          </div>

          {/* Filters */}
          <div className="mb-6 flex flex-wrap gap-3">
            <div>
              <label className="mb-1 block text-xs font-semibold text-n-500">Domain</label>
              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="rounded-lg border border-n-200 bg-white px-3 py-2 text-sm text-n-900 outline-none focus:border-co-primary"
              >
                {DOMAINS.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-n-500">Experience</label>
              <select
                value={exp}
                onChange={(e) => setExp(e.target.value)}
                className="rounded-lg border border-n-200 bg-white px-3 py-2 text-sm text-n-900 outline-none focus:border-co-primary"
              >
                {EXPERIENCES.map((e) => (
                  <option key={e}>{e}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="rounded-xl border-2 border-dashed border-n-200 py-16 text-center">
              <p className="text-n-400">No mentors match your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((m) => (
                <div
                  key={m.name}
                  className="rounded-xl border border-n-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-co-surface text-lg font-bold text-co-primary">
                      {m.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-n-900 truncate">{m.name}</p>
                      <p className="text-xs text-n-500 truncate">{m.role}</p>
                      <p className="text-xs font-semibold text-n-700">{m.company}</p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        DOMAIN_COLORS[m.domain] ?? "bg-n-100 text-n-600"
                      }`}
                    >
                      {m.domain}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-warning">
                      <Star className="h-3 w-3 fill-warning" />
                      {m.rating}
                      <span className="text-n-400">({m.reviews})</span>
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {m.tags.map((t) => (
                      <span key={t} className="rounded-full bg-n-100 px-2 py-0.5 text-[11px] text-n-600">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {m.rates.map((r) => (
                      <span
                        key={r.label}
                        className="rounded-lg bg-n-100 px-2.5 py-1 text-xs font-semibold text-n-700"
                      >
                        {r.label} · {r.price}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => toast.info("Booking coming soon! We'll notify you when live.")}
                    className="mt-4 w-full rounded-xl bg-sk-primary py-2.5 text-sm font-semibold text-white transition hover:bg-sk-hover"
                  >
                    Book Session
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
