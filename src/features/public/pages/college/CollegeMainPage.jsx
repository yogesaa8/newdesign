import React from "react";
import { motion } from "motion/react";

import {
  IconChevronDown,
  IconNetwork,
  IconLayoutDashboard,
  IconFileAnalytics,
  IconBriefcase2,
  IconPhoneCall,
  IconClipboardList,
  IconUsersGroup,
  IconChartBar,
  IconCalendarEvent,
  IconBuilding,
} from "@tabler/icons-react";
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  Navbar,
  NavbarButton,
  NavbarLogo,
  NavBody,
  NavItems,
} from "../../../../components/ui/resizable-navbar";
import useSEO from "@/seo/useSEO";
import seoMeta from "@/data/seoMeta";
import { buildWebPage, buildBreadcrumbList } from "@/seo/schemas";

const CollegeMainPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

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

  const navItems = [
    { name: "Why Partner", link: "#why-partner" },
    {
      name: "Platform",
      link: "#platform",
      children: [
        { name: "Recruiter Pipeline", link: "#platform" },
        { name: "Drive Coordinator", link: "#platform" },
        { name: "Reports & Analytics", link: "#reports" },
        { name: "Internship Feed", link: "#platform" },
      ],
    },
    { name: "Reports", link: "#reports" },
  ];

  return (
    <div className="bg-white text-slate-900">
      {seoElement}
      {/* Navbar */}
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-3">
            <NavbarButton href="#contact" variant="secondary">
              Talk to Us
            </NavbarButton>
            <NavbarButton href="#contact" variant="dark">
              Book a Demo
            </NavbarButton>
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>
          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                className="text-lg font-medium text-slate-600 hover:text-slate-900"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="mt-4 flex flex-col gap-3 w-full">
              <NavbarButton
                href="#contact"
                variant="secondary"
                className="w-full"
              >
                Talk to Us
              </NavbarButton>
              <NavbarButton href="#contact" variant="dark" className="w-full">
                Book a Demo
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center pt-40 pb-20 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <span className="inline-block mb-6 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-900">
            For Placement Cells & College Administration
          </span>
          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl bg-gradient-to-b from-blue-950 via-blue-900 to-slate-500 bg-clip-text text-transparent">
            Run your placement cell, <br /> plugged into 1,000+ recruiters.
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-slate-600">
            FirstJobIndia gives your placement office a single dashboard to
            coordinate recruiter drives, screen students, track every offer, and
            generate NAAC and AICTE-ready reports, without adding a single
            person to your team.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <NavbarButton
              href="#contact"
              variant="dark"
              className="text-base px-8 py-3"
            >
              Book a 20-min Demo
            </NavbarButton>
            <NavbarButton
              href="#why-partner"
              variant="secondary"
              className="text-base px-8 py-3 border border-slate-200"
            >
              See How It Works{" "}
              <IconChevronDown className="inline-block ml-1 w-4 h-4" />
            </NavbarButton>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            {[
              ["1,000+", "Verified Recruiters"],
              ["120+", "Partner Campuses"],
              ["85%", "Avg. Placement Lift"],
            ].map(([num, label]) => (
              <div key={label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-emerald-700">
                  {num}
                </div>
                <div className="mt-1 text-xs uppercase tracking-widest text-slate-500">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Why Partner Section */}
      <section id="why-partner" className="py-24 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold tracking-tight text-slate-900">
              Where Placement Cells Lose Time Today
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Most placement teams spend more time on coordination than on
              actually placing students. We built the platform to cut that
              overhead.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: IconPhoneCall,
                title: "Scattered Recruiter Outreach",
                desc: "Calling and following up with each company manually, chasing JDs, dates, and slot confirmations every recruitment season.",
              },
              {
                icon: IconClipboardList,
                title: "Manual Student Filtering",
                desc: "Sorting hundreds of resumes against each company's CGPA cutoff, branch list, and skill criteria, by hand, every drive.",
              },
              {
                icon: IconFileAnalytics,
                title: "NAAC & AICTE Reporting",
                desc: "Compiling placement statistics, salary ranges, and offer letters into reporting formats, every quarter, every audit cycle.",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-900">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Platform Section */}
      <section id="platform" className="py-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold tracking-tight text-slate-900">
              How FirstJobIndia Plugs Into Your Placement Cell
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              One dashboard. Four operational shifts. No new hires.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: IconNetwork,
                title: "Verified Recruiter Pipeline",
                desc: "Direct access to 1,000+ vetted companies actively hiring freshers; sorted by sector, package band, and intake season.",
              },
              {
                icon: IconCalendarEvent,
                title: "Campus Drive Coordinator",
                desc: "Schedule, RSVP, and run on-campus and virtual drives in one panel. Student attendance and shortlist tracked automatically.",
              },
              {
                icon: IconLayoutDashboard,
                title: "Placement Dashboard",
                desc: "Every applicant, interview round, and offer letter visible in real time, for every batch, every branch, every recruiter.",
              },
              {
                icon: IconBriefcase2,
                title: "Year-Round Internship Feed",
                desc: "Internship listings refreshed daily so students stay engaged in second and third year, not just final-year placement season.",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-left hover:bg-white hover:shadow-lg"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-900 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reports & Analytics Section (replaces dead "Campus Events" nav) */}
      <section id="reports" className="py-24 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold tracking-tight text-slate-900">
              Reports That Write Themselves
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              The platform auto-compiles the numbers your audit cycle, governing
              body, and leadership ask for, exportable in one click.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: IconChartBar,
                title: "NAAC / AICTE / NIRF Reports",
                desc: "Pre-formatted placement statistics, package bands, and offer summaries; ready for accreditation submission.",
              },
              {
                icon: IconUsersGroup,
                title: "Batch & Branch Analytics",
                desc: "Compare placement performance across years, departments, and recruiter segments without spreadsheets.",
              },
              {
                icon: IconBuilding,
                title: "Alumni Engagement Loop",
                desc: "Placed alumni stay connected to the platform; recruiter referrals, mentor sessions, and salary updates feed back automatically.",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Social Proof CTA */}
      <section className="py-24 px-4 bg-blue-950 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold tracking-tight">
              Trusted by 120+ campuses across India.
            </h2>
            <p className="mt-6 text-lg text-slate-300 leading-relaxed">
              From state engineering colleges to private universities, placement
              cells use FirstJobIndia to run higher offer volumes with smaller
              teams. Book a 20-minute walkthrough and see your campus's
              dashboard before you decide.
            </p>
            <div className="mt-10">
              <NavbarButton
                href="#contact"
                variant="gradient"
                className="text-base px-10 py-4 rounded-full"
              >
                Book a 20-min Demo
              </NavbarButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Talk to Us / Contact Section */}
      <section id="contact" className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="inline-block mb-4 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-900">
              Talk to Us
            </span>
            <h2 className="text-4xl font-bold tracking-tight text-slate-900">
              Tell us about your campus.
            </h2>
            <p className="mt-5 text-lg text-slate-600 leading-relaxed">
              Share a few details and our partnerships team will reach out
              within one working day with a 20-minute walkthrough scoped to your
              college's batch size and recruiter goals.
            </p>

            <div className="mt-10 space-y-5">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-900 shrink-0">
                  <IconPhoneCall className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    Partnerships team
                  </div>
                  <div className="text-sm text-slate-600">
                    partnerships@firstjobindia.com
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-900 shrink-0">
                  <IconCalendarEvent className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    Average response time
                  </div>
                  <div className="text-sm text-slate-600">
                    Under 1 working day
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form className="rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-sm space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-slate-600 mb-2">
                Your name
              </label>
              <input
                type="text"
                placeholder="Dr. Anita Sharma"
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-700/20"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-slate-600 mb-2">
                  College / Institute
                </label>
                <input
                  type="text"
                  placeholder="Govt. College of Engineering"
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-700/20"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-slate-600 mb-2">
                  Your role
                </label>
                <input
                  type="text"
                  placeholder="Placement Officer"
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-700/20"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-slate-600 mb-2">
                  Work email
                </label>
                <input
                  type="email"
                  placeholder="placements@college.edu.in"
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-700/20"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-slate-600 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  placeholder="+91 98xxxxxxxx"
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-700/20"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-slate-600 mb-2">
                What would you like to discuss?
              </label>
              <textarea
                rows="4"
                placeholder="Batch size, hiring goals, current placement gaps..."
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-700/20 resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-900 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-800"
            >
              Request a Demo
            </button>
            <p className="text-xs text-slate-500 text-center">
              We respond within one working day. No sales pressure, no scripts.
            </p>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-12 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <NavbarLogo />
          <p className="text-sm text-slate-500">
            © 2026 FirstJobIndia. Built for the placement officers running
            India's campuses.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CollegeMainPage;
