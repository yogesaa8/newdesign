import React from "react";
import { motion } from "motion/react";

import { IconChevronDown } from "@tabler/icons-react";
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

const CollegeMainPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { name: "Why Us", link: "#why-us" },
    {
      name: "Programs",
      link: "#programs",
      children: [
        { name: "Web Development", link: "#web-dev" },
        { name: "Data Science", link: "#data-science" },
        { name: "AI & ML", link: "#ai-ml" },
        { name: "GenAI & Prompt Engineering", link: "#genai" },
      ],
    },
    { name: "Campus Events", link: "#events" },
  ];

  return (
    // <div className="relative min-h-screen w-full overflow-x-hidden bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white">
    <div>
      {/* Navbar */}
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-3">
            <NavbarButton href="#contact" variant="secondary">
              Talk to Us
            </NavbarButton>
            <NavbarButton href="#join" variant="dark">
              Join Bootcamp
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
            {/* Mobile menu items yahan aayenge */}
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                className="text-lg font-medium text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition"
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
              <NavbarButton href="#join" variant="dark" className="w-full">
                Join Bootcamp
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
          <span className="inline-block mb-6 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400">
            Empowering College Students
          </span>
          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl bg-gradient-to-b from-black via-black to-neutral-400 dark:from-white dark:via-white dark:to-neutral-600 bg-clip-text text-transparent">
            Don’t Just Graduate. <br /> Get Industry Ready.
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
            Your college syllabus teaches you the basics, but the industry
            demands practical skills. We bridge the gap between boring
            theoretical lectures and high-paying tech jobs with hands-on
            bootcamps, real-world projects, and direct mentorship from tech
            experts.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <NavbarButton
              href="#programs"
              variant="dark"
              className="text-base px-8 py-3"
            >
              Explore Programs
            </NavbarButton>
            <NavbarButton
              href="#why-us"
              variant="secondary"
              className="text-base px-8 py-3 border border-neutral-200 dark:border-neutral-800"
            >
              Know More{" "}
              <IconChevronDown className="inline-block ml-1 w-4 h-4" />
            </NavbarButton>
          </div>
        </motion.div>
      </section>

      {/* Why Us / Motivation Section */}
      <section
        id="why-us"
        className="py-24 px-4 bg-neutral-50 dark:bg-neutral-900/50"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold tracking-tight">
              The College Reality Check
            </h2>
            <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Every year, millions of students graduate, but only a handful are
              actually ready for the tech industry. Why? Because theory doesn't
              build products.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Outdated Syllabus",
                desc: "While colleges are still teaching older technologies, the industry has moved on to AI, Cloud, and modern frameworks.",
              },
              {
                title: "Zero Practical Exposure",
                desc: "Writing code on paper doesn't make you a developer. You need to build real projects, face real bugs, and deploy them.",
              },
              {
                title: "No Placement Guidance",
                desc: "Colleges teach you how to give interviews, but not how to build a portfolio that makes companies chase you.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-950"
              >
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Provide Section */}
      <section id="programs" className="py-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold tracking-tight">
              What We Bring To Your Campus
            </h2>
            <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              We don’t just provide courses. We provide an ecosystem to make you
              job-ready before you even finish your degree.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🚀",
                title: "Industry Bootcamps",
                desc: "Intensive 4-6 week programs tailored for college students to master modern tech stacks.",
              },
              {
                icon: "🧑‍💻",
                title: "Real-World Projects",
                desc: "Work on client projects and open-source contributions, not just dummy to-do apps.",
              },
              {
                icon: "🤝",
                title: "1-on-1 Mentorship",
                desc: "Get guided directly by SDEs, Data Scientists, and Product Managers from top companies.",
              },
              {
                icon: "💼",
                title: "Placement Prep",
                desc: "Resume building, LinkedIn optimization, mock interviews, and direct referral access.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-left transition-all hover:bg-white hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-950"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Motivational CTA Section */}
      <section className="py-24 px-4 bg-black text-white dark:bg-white dark:text-black">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold tracking-tight">
              Your Degree is Just a Piece of Paper. Your Skills Are Your Real
              Currency.
            </h2>
            <p className="mt-6 text-lg text-neutral-400 dark:text-neutral-600 leading-relaxed">
              Stop waiting for the placement cell to magically get you a job.
              Take control of your career right now. The tech industry doesn’t
              care about your CGPA; it cares about what you can build. Let’s
              start building.
            </p>
            <div className="mt-10">
              <NavbarButton
                href="#join"
                variant="gradient"
                className="text-base px-10 py-4 rounded-full"
              >
                Start Your Journey Today
              </NavbarButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 py-12 px-4 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <NavbarLogo />
          <p className="text-sm text-neutral-500 dark:text-neutral-500">
            © 2024 YourStartup. Bridging the gap between college and the
            industry.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CollegeMainPage;
