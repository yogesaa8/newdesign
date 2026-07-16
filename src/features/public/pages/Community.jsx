import { useState } from "react";
import { MessageSquare, Eye, ChevronUp, Search } from "lucide-react";
import Footer from "../components/Footer";
import useSEO from "@/seo/useSEO";
import toast from "@/lib/toast";

const CATEGORIES = ["All", "Resume", "Interview", "Career", "Off-Campus"];

const POSTS = [
  {
    id: 1,
    category: "Resume",
    title: "How do I explain a 6-month gap after graduation on my resume?",
    preview: "I graduated in May 2024 and spent time preparing for UPSC before deciding to pivot to the private sector. HR keeps asking about the gap...",
    author: "Priya M.",
    avatar: "PM",
    time: "2h ago",
    answers: 14,
    views: 342,
    votes: 47,
  },
  {
    id: 2,
    category: "Interview",
    title: "TCS NQT exam pattern 2025 — what changed this year?",
    preview: "Attempted TCS NQT last week. The Verbal section was significantly harder than previous years, and there was a new 'Hands-on Coding' module worth...",
    author: "Rohit K.",
    avatar: "RK",
    time: "5h ago",
    answers: 31,
    views: 1204,
    votes: 89,
  },
  {
    id: 3,
    category: "Career",
    title: "Is a CSE degree necessary for a Data Analyst role at a product company?",
    preview: "I'm a commerce graduate with self-taught Python and SQL skills. Cleared two rounds at a Bangalore startup but the final rejection said 'educational background'...",
    author: "Sneha T.",
    avatar: "ST",
    time: "1d ago",
    answers: 22,
    views: 876,
    votes: 63,
  },
  {
    id: 4,
    category: "Off-Campus",
    title: "Infosys InfyTQ vs Wipro Elite NTH — which is better for freshers in 2025?",
    preview: "Comparing compensation, learning curve, and promotion timelines for both programmes. Anyone who has cleared both and made a choice, please share...",
    author: "Arjun S.",
    avatar: "AS",
    time: "1d ago",
    answers: 19,
    views: 2100,
    votes: 112,
  },
  {
    id: 5,
    category: "Resume",
    title: "Should I list projects from college hackathons even if they weren't finished?",
    preview: "I participated in 4 hackathons but only one resulted in a fully working product. The others are half-built ideas. Will listing incomplete projects hurt me?",
    author: "Ananya B.",
    avatar: "AB",
    time: "2d ago",
    answers: 9,
    views: 418,
    votes: 34,
  },
  {
    id: 6,
    category: "Interview",
    title: "How to answer 'Why do you want to join our company?' for a startup you've never heard of?",
    preview: "Got a cold call from a recruiter for a Series A startup. The JD looked good but I had to research them in 30 minutes before the call. Tips?",
    author: "Vikram N.",
    avatar: "VN",
    time: "2d ago",
    answers: 7,
    views: 290,
    votes: 28,
  },
  {
    id: 7,
    category: "Career",
    title: "Core engineering vs. IT service company — which gives more growth?",
    preview: "I have offers from a core mechanical firm (OEM supplier) and an Infosys unit. Salary is similar. My long-term goal is a management role. Which path...",
    author: "Deepak R.",
    avatar: "DR",
    time: "3d ago",
    answers: 26,
    views: 1560,
    votes: 77,
  },
  {
    id: 8,
    category: "Off-Campus",
    title: "AMCAT score required for Cognizant GenC Next program 2025?",
    preview: "The official site says 'above average' without a specific cutoff. Multiple forums mention 60+ percentile. Can someone who got shortlisted confirm?",
    author: "Neha P.",
    avatar: "NP",
    time: "3d ago",
    answers: 44,
    views: 3200,
    votes: 156,
  },
  {
    id: 9,
    category: "Resume",
    title: "One page vs two page resume for a fresh graduate with internships?",
    preview: "I have 2 internships (6 months total), 3 projects, and 4 certifications. My resume is spilling to 1.4 pages. Should I compress everything to fit one page?",
    author: "Kavya J.",
    avatar: "KJ",
    time: "4d ago",
    answers: 18,
    views: 723,
    votes: 51,
  },
  {
    id: 10,
    category: "Interview",
    title: "How to negotiate salary as a fresher without seeming greedy?",
    preview: "I got an offer 15% below the CTC they advertised on the job board. HR said 'take it or leave it' but I've seen posts where people pushed back successfully...",
    author: "Manish G.",
    avatar: "MG",
    time: "5d ago",
    answers: 33,
    views: 4100,
    votes: 198,
  },
  {
    id: 11,
    category: "Career",
    title: "Joining date pushed 3 times — should I wait or look for other offers?",
    preview: "Got offer letter in August, joining was Dec, then Feb, now April. The company is legit (listed mid-cap) but I'm getting anxious. HR still sounds positive...",
    author: "Ritu A.",
    avatar: "RA",
    time: "6d ago",
    answers: 41,
    views: 5800,
    votes: 234,
  },
  {
    id: 12,
    category: "Off-Campus",
    title: "Does referral actually work for freshers at big tech companies?",
    preview: "LinkedIn connections keep offering 'referrals' for a fee. Separately, a college senior offered a genuine referral at Flipkart. How much does it actually help?",
    author: "Sanjay M.",
    avatar: "SM",
    time: "1w ago",
    answers: 29,
    views: 6700,
    votes: 183,
  },
];

const TOP_CONTRIBUTORS = [
  { name: "Rahul Verma", initials: "RV", answers: 142, badge: "Career Coach" },
  { name: "Divya Singh", initials: "DS", answers: 98, badge: "Top Answerer" },
  { name: "Aakash Jain", initials: "AJ", answers: 87, badge: "Resume Expert" },
  { name: "Pooja Menon", initials: "PM", answers: 74, badge: "Interview Pro" },
  { name: "Karthik R.", initials: "KR", answers: 61, badge: "Off-Campus" },
];

const CATEGORY_COLORS = {
  Resume: "bg-sk-surface text-sk-primary",
  Interview: "bg-co-surface text-co-primary",
  Career: "bg-info-bg text-info",
  "Off-Campus": "bg-warning-bg text-warning",
};

export default function Community() {
  const [active, setActive] = useState("All");

  const seoElement = useSEO({
    title: "Community | FirstJobIndia",
    description: "Ask questions, share experiences, and get answers from India's fresher job community.",
    path: "/community",
  });

  const filtered = active === "All" ? POSTS : POSTS.filter((p) => p.category === active);

  return (
    <>
      {seoElement}

      {/* Hero */}
      <section className="border-b border-n-200 bg-white py-14 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <span className="inline-block rounded-full bg-co-surface px-3 py-1 text-xs font-semibold text-co-primary">
            Community
          </span>
          <h1 className="mt-3 text-4xl font-extrabold text-n-900">
            Ask. Answer. Grow together.
          </h1>
          <p className="mt-3 text-n-500">
            Real questions from freshers like you — answered by peers, mentors, and hiring managers.
          </p>

          {/* Fake search → login nudge */}
          <div className="relative mx-auto mt-6 max-w-md">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-n-400" />
            <input
              type="text"
              placeholder="Ask anything..."
              readOnly
              onClick={() => toast.info("Sign in to post your question")}
              className="w-full cursor-pointer rounded-xl border border-n-200 bg-n-50 py-3 pl-11 pr-4 text-sm text-n-500 outline-none focus:border-co-primary"
            />
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="bg-n-50 py-10">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col gap-8 lg:flex-row">

            {/* Feed */}
            <div className="flex-1 min-w-0">
              {/* Category pills */}
              <div className="mb-6 flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActive(cat)}
                    className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition ${
                      active === cat
                        ? "border-co-primary bg-co-surface text-co-primary"
                        : "border-n-200 bg-white text-n-500 hover:border-n-300 hover:text-n-700"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Post cards */}
              <div className="space-y-3">
                {filtered.map((post) => (
                  <article
                    key={post.id}
                    className="rounded-xl border border-n-200 bg-white p-5 transition hover:shadow-md"
                  >
                    <div className="flex gap-4">
                      {/* Vote */}
                      <div className="flex shrink-0 flex-col items-center gap-1">
                        <button
                          onClick={() => toast.info("Sign in to vote")}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-n-200 text-n-400 transition hover:border-co-primary hover:text-co-primary"
                        >
                          <ChevronUp className="h-4 w-4" />
                        </button>
                        <span className="text-sm font-bold text-n-700">{post.votes}</span>
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                              CATEGORY_COLORS[post.category] ?? "bg-n-100 text-n-600"
                            }`}
                          >
                            {post.category}
                          </span>
                          <span className="text-xs text-n-400">{post.time}</span>
                        </div>
                        <h3 className="text-sm font-bold leading-snug text-n-900 hover:text-co-primary cursor-pointer">
                          {post.title}
                        </h3>
                        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-n-500">
                          {post.preview}
                        </p>
                        <div className="mt-3 flex items-center gap-4 text-xs text-n-400">
                          <div className="flex items-center gap-1">
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-sk-surface text-[9px] font-bold text-sk-primary">
                              {post.avatar}
                            </div>
                            <span className="font-medium text-n-600">{post.author}</span>
                          </div>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="h-3 w-3" />
                            {post.answers} answers
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {post.views.toLocaleString()} views
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <p className="mt-6 text-center text-sm text-n-400">
                Showing {filtered.length} discussions ·{" "}
                <button
                  onClick={() => toast.info("Sign in to see all discussions")}
                  className="text-co-primary underline"
                >
                  View all
                </button>
              </p>
            </div>

            {/* Sidebar */}
            <aside className="w-full lg:w-72 shrink-0 space-y-6">
              {/* Active today */}
              <div className="rounded-xl border border-n-200 bg-white p-5">
                <h3 className="mb-3 text-sm font-bold text-n-900">Active Today</h3>
                <div className="space-y-2 text-sm text-n-500">
                  <div className="flex justify-between">
                    <span>Questions asked</span>
                    <span className="font-semibold text-n-900">38</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Answers posted</span>
                    <span className="font-semibold text-n-900">124</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Members online</span>
                    <span className="font-semibold text-success">● 214</span>
                  </div>
                </div>
              </div>

              {/* Top contributors */}
              <div className="rounded-xl border border-n-200 bg-white p-5">
                <h3 className="mb-4 text-sm font-bold text-n-900">Top Contributors</h3>
                <div className="space-y-3">
                  {TOP_CONTRIBUTORS.map((c, i) => (
                    <div key={c.name} className="flex items-center gap-3">
                      <span className="text-xs font-bold text-n-400 w-4">{i + 1}</span>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-co-surface text-xs font-bold text-co-primary">
                        {c.initials}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-semibold text-n-900">{c.name}</p>
                        <p className="text-[11px] text-n-400">{c.badge}</p>
                      </div>
                      <span className="text-xs font-bold text-co-primary">{c.answers}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="rounded-xl border border-sk-border bg-sk-surface p-5 text-center">
                <p className="text-sm font-bold text-n-900">Got a question?</p>
                <p className="mt-1 text-xs text-n-500">
                  Join 12,000+ freshers sharing job search tips.
                </p>
                <button
                  onClick={() => toast.info("Sign in to post your question")}
                  className="mt-4 w-full rounded-lg bg-sk-primary py-2 text-xs font-semibold text-white transition hover:bg-sk-hover"
                >
                  Ask the Community
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
