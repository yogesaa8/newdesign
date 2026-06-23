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
} from "lucide-react";

import useSEO from "@/seo/useSEO";
import seoMeta from "@/data/seoMeta";
import { buildWebPage, buildBreadcrumbList } from "@/seo/schemas";
import {
  HeroHighlight,
  Highlight,
} from "../../../../components/ui/hero-highlight";

const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded-[8px] bg-[#FF6B35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#FF9566]";
const secondaryButton =
  "inline-flex items-center justify-center gap-2 rounded-[8px] border border-[#EADFD9] bg-white px-5 py-3 text-sm font-semibold text-[#0A0A0A] transition hover:border-[#C6AFFF] hover:text-[#8500FA]";
const fieldClass =
  "w-full rounded-[8px] border border-[#EADFD9] bg-white px-4 py-3 text-sm text-[#0A0A0A] outline-none transition placeholder:text-[#9F9FA9] focus:border-[#8500FA] focus:ring-2 focus:ring-[#8500FA]/15";
const labelClass = "mb-2 block text-xs font-semibold uppercase text-[#6F6F76]";

const painPoints = [
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

const platformBlocks = [
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
    accent: "purple",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Audit-ready reports",
    text: "Export placement summaries for department reviews, accreditation, leadership updates, and recruiter reviews.",
  },
];

const FeatureBlock = ({ icon, title, text, accent = "orange" }) => {
  const Icon = icon;

  return (
    <article className="rounded-[8px] border border-[#EADFD9] bg-[#F7F5F2] p-6">
      <div
        className={`mb-5 flex h-10 w-10 items-center justify-center rounded-[8px] border ${
          accent === "purple"
            ? "border-[#C6AFFF] bg-[#8500FA] text-white"
            : "border-[#EADFD9] bg-[#FFF7F3] text-[#FF6B35]"
        }`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-lg font-semibold text-[#0A0A0A]">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[#6F6F76]">{text}</p>
    </article>
  );
};

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
      <main className="min-h-screen bg-[#FFF7F3] text-[#0A0A0A]">
        <HeroHighlight
          containerClassName="border-b border-[#EADFD9] bg-[#FFF7F3]"
          className="px-4 py-16 md:py-20"
        >
          <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase text-[#8500FA]">
                College partnerships
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-tight text-[#0A0A0A] md:text-6xl">
                Run placements from one trusted{" "}
                <Highlight className="rounded-[8px] px-2 pb-1">
                  campus dashboard.
                </Highlight>
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#6F6F76] md:text-lg">
                FirstJobIndia helps placement teams coordinate recruiters,
                shortlist eligible students, track offers, and prepare reports
                without spreading work across calls and spreadsheets.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <a href="#contact" className={primaryButton}>
                  Book a campus demo
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#platform" className={secondaryButton}>
                  See platform
                </a>
              </div>
            </div>
          </div>
        </HeroHighlight>

        <section id="why-partner" className="px-4 py-14 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase text-[#FF6B35]">
                Why partner
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-[#0A0A0A] md:text-4xl">
                Placement work should not depend on scattered files.
              </h2>
              <p className="mt-4 text-base leading-7 text-[#6F6F76]">
                The page is built around the operational gaps placement officers
                tell us they face every season.
              </p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {painPoints.map((item) => (
                <FeatureBlock key={item.title} {...item} />
              ))}
            </div>
          </div>
        </section>

        <section
          id="platform"
          className="border-y border-[#EADFD9] bg-white px-4 py-14 md:py-20"
        >
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-[360px_1fr] lg:items-start">
              <div>
                <p className="text-sm font-semibold uppercase text-[#8500FA]">
                  Platform
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-[#0A0A0A] md:text-4xl">
                  Four tools your placement cell can use together.
                </h2>
                <p className="mt-4 text-base leading-7 text-[#6F6F76]">
                  Keep recruiter coordination, student readiness, and reporting
                  in the same workflow.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {platformBlocks.map((item) => (
                  <FeatureBlock key={item.title} {...item} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="reports" className="bg-[#F6EAE0] px-4 py-14 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_420px] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase text-[#FF6B35]">
                Reports
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-[#0A0A0A] md:text-4xl">
                Audit-ready numbers without rebuilding spreadsheets.
              </h2>
              <p className="mt-4 text-base leading-7 text-[#6F6F76]">
                Export placement summaries by batch, branch, recruiter, package
                band, interview stage, and final offers whenever leadership or
                accreditation teams need them.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {["NAAC", "AICTE", "NIRF", "Department review"].map((label) => (
                  <span
                    key={label}
                    className="rounded-[8px] border border-[#EADFD9] bg-white px-3 py-1.5 text-sm font-semibold text-[#6F6F76]"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[8px] border border-[#EADFD9] bg-white p-5">
              {[
                ["Placement rate", "68%", "up 12%"],
                ["Median package", "4.8 LPA", "batch 2026"],
                ["Active recruiters", "214", "verified"],
                ["Offer letters", "1,126", "tracked"],
              ].map(([label, value, note]) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-4 border-b border-[#EADFD9] py-4 first:pt-0 last:border-b-0 last:pb-0"
                >
                  <div>
                    <div className="text-sm font-semibold text-[#0A0A0A]">
                      {label}
                    </div>
                    <div className="mt-1 text-xs text-[#6F6F76]">{note}</div>
                  </div>
                  <div className="text-2xl font-bold text-[#8500FA]">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-14 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
            {[
              {
                icon: GraduationCap,
                title: "For placement officers",
                text: "Run eligibility, drives, and offer tracking from one calm workspace.",
              },
              {
                icon: UsersRound,
                title: "For students",
                text: "Give students clearer access to internships, drives, and application updates.",
              },
              {
                icon: Handshake,
                title: "For recruiters",
                text: "Help employers reach eligible fresher talent faster with structured campus data.",
              },
            ].map((item) => (
              <FeatureBlock key={item.title} {...item} />
            ))}
          </div>
        </section>

        <section id="contact" className="bg-[#15151A] px-4 py-14 text-white md:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase text-[#FF9566]">
                Talk to us
              </p>
              <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
                Tell us about your campus.
              </h2>
              <p className="mt-4 text-base leading-7 text-[#EADFD9]">
                Share a few details and the partnerships team will respond
                within one working day with a walkthrough scoped to your batch
                size and recruiter goals.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 text-[#C6AFFF]" />
                  <div>
                    <div className="text-sm font-semibold">Email</div>
                    <div className="text-sm text-[#EADFD9]">
                      partnerships@firstjobindia.com
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-400" />
                  <div>
                    <div className="text-sm font-semibold">Response time</div>
                    <div className="text-sm text-[#EADFD9]">
                      Under one working day
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <form
              className="rounded-[8px] border border-[#2A2A2F] bg-[#FFF7F3] p-5 text-[#0A0A0A] md:p-6"
              onSubmit={handleSubmit}
            >
              {isSubmitted && (
                <div className="mb-5 rounded-[8px] border border-green-100 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
                  Thanks. Our partnerships team will get back within one
                  working day.
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Your name</label>
                  <input
                    className={fieldClass}
                    type="text"
                    placeholder="Dr. Anita Sharma"
                    required
                  />
                </div>
                <div>
                  <label className={labelClass}>Your role</label>
                  <input
                    className={fieldClass}
                    type="text"
                    placeholder="Placement officer"
                    required
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className={labelClass}>College / institute</label>
                <input
                  className={fieldClass}
                  type="text"
                  placeholder="Government College of Engineering"
                  required
                />
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Work email</label>
                  <input
                    className={fieldClass}
                    type="email"
                    placeholder="placements@college.edu.in"
                    required
                  />
                </div>
                <div>
                  <label className={labelClass}>Phone</label>
                  <input
                    className={fieldClass}
                    type="tel"
                    placeholder="+91 98xxxxxxxx"
                    required
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className={labelClass}>What should we prepare?</label>
                <textarea
                  className={`${fieldClass} min-h-28 resize-none`}
                  placeholder="Batch size, departments, placement season, reporting needs..."
                />
              </div>

              <button type="submit" className={`${primaryButton} mt-5 w-full`}>
                Request a demo
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </section>

        <footer className="border-t border-[#EADFD9] bg-[#FFF7F3] px-4 py-10">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 text-sm font-normal text-black">
              <img
                src="/images/logos/fji_orange.png"
                alt="FirstJobIndia"
                className="h-8 w-8 object-contain"
              />
              <span className="font-medium">
                <span className="text-black">First</span>
                <span className="text-orange-600">Job</span>
                <span className="text-black">India</span>
              </span>
            </div>
            <p className="text-sm text-[#6F6F76]">
              © 2026 FirstJobIndia. Built for placement teams across India.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
};

export default CollegeMainPage;
