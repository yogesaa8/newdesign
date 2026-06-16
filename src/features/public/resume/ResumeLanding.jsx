import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Download,
  FileText,
  PenLine,
  Sparkles,
} from "lucide-react";
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
} from "../../../components/ui/resizable-navbar";
import navItems from "../data/headerData.json";
import useSEO from "@/seo/useSEO";
import seoMeta from "@/data/seoMeta";
import {
  buildBreadcrumbList,
  buildFAQPage,
  buildHowTo,
  buildWebPage,
} from "@/seo/schemas";
import resumeFaqs from "@/data/resumeFaqs";
import { HeroHighlight } from "../../../components/ui/hero-highlight";

const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded-[8px] bg-[#FF6B35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#FF9566]";
const secondaryButton =
  "inline-flex items-center justify-center gap-2 rounded-[8px] border border-[#EADFD9] bg-white px-5 py-3 text-sm font-semibold text-[#0A0A0A] transition hover:border-[#C6AFFF] hover:text-[#8500FA]";
const resumeNavItems = navItems.filter((item) => item.name !== "Services");

const FeatureBlock = ({ icon, title, text, accent = "orange" }) => {
  const FeatureIcon = icon;

  return (
    <article className="rounded-[8px] border border-[#EADFD9] bg-[#F7F5F2] p-6">
      <div
        className={`mb-5 flex h-10 w-10 items-center justify-center rounded-[8px] border ${
          accent === "purple"
            ? "border-[#C6AFFF] bg-[#8500FA] text-white"
            : "border-[#F3D3C4] bg-[#FFF7F3] text-[#FF6B35]"
        }`}
      >
        <FeatureIcon className="h-5 w-5" />
      </div>
      <h3 className="text-xl font-semibold text-[#0A0A0A]">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[#6F6F76]">{text}</p>
    </article>
  );
};

const ResumeLanding = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
        description:
          "A short guide to building a recruiter-ready fresher resume on FirstJobIndia.",
        steps: [
          {
            name: "Choose a format",
            text: "Pick a resume format designed for your first-job target role.",
          },
          {
            name: "Add your details",
            text: "Fill in contact details, education, projects, skills, and internships.",
          },
          {
            name: "Review the live preview",
            text: "Use the preview and score prompts to improve structure and impact.",
          },
          {
            name: "Download as PDF",
            text: "Export the finished resume and start applying to fresher jobs.",
          },
        ],
      }),
    ],
  });

  const features = [
    {
      icon: FileText,
      title: "Fresher-first sections",
      text: "Education, projects, internships, skills, and objective prompts are structured for first-job applications in India.",
    },
    {
      icon: Sparkles,
      title: "AI writing help",
      text: "Purple-marked AI tools help rewrite bullets, suggest skills, and review gaps before you download.",
      accent: "purple",
    },
    {
      icon: PenLine,
      title: "Live editing",
      text: "Fill guided fields and see your resume update instantly, so mistakes are easier to catch.",
    },
    {
      icon: Download,
      title: "PDF download",
      text: "Export a clean, print-ready PDF and use it when applying to verified fresher jobs.",
    },
  ];

  return (
    <>
      {seoElement}
      <main className="min-h-screen bg-[#FFF7F3] text-[#0A0A0A]">
        <div className="relative w-full bg-[#fff7f3]">
          <Navbar>
            <NavBody disableScrollResize>
              <NavbarLogo />
              <NavItems items={resumeNavItems} />
              <div className="flex items-center gap-4">
                <NavbarButton as={Link} to="/seeker/login" variant="secondary">
                  Sign in
                </NavbarButton>
                <NavbarButton as={Link} to="/seeker/signup" variant="primary">
                  Start free
                </NavbarButton>
              </div>
            </NavBody>

            <MobileNav disableScrollResize>
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
                {resumeNavItems.map((item, idx) => (
                  <div key={`mobile-link-${idx}`} className="w-full">
                    {item.link && (
                      <a
                        href={item.link}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-2 text-on-surface-variant dark:text-surface-container-low"
                      >
                        {item.name}
                      </a>
                    )}

                    {item.children && (
                      <div className="flex flex-col gap-2">
                        <span className="py-2 font-medium text-on-surface dark:text-surface-container-low">
                          {item.name}
                        </span>

                        <div className="ml-4 flex flex-col gap-2">
                          {item.children.map((child, i) => (
                            <a
                              key={i}
                              href={child.link}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="text-sm text-outline"
                            >
                              {child.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                <div className="flex w-full flex-col gap-4">
                  <NavbarButton
                    href="/seeker/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    variant="primary"
                    className="w-full"
                  >
                    Sign in
                  </NavbarButton>

                  <NavbarButton
                    href="/seeker/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    variant="primary"
                    className="w-full"
                  >
                    Start free
                  </NavbarButton>
                </div>
              </MobileNavMenu>
            </MobileNav>
          </Navbar>
        </div>

        <HeroHighlight
          containerClassName="border-b border-[#EADFD9] bg-[#FFF7F3]"
          className="px-4 py-16 md:py-20"
        >
          <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase text-[#8500FA]">
                AI resume builder
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-tight text-[#0A0A0A] md:text-6xl">
                Build a fresher-ready resume.
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#6F6F76] md:text-lg">
                Create a clear, ATS-friendly resume for Indian fresher jobs.
                Add your details, improve bullets with AI, and download a PDF.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link to="/resume/builder" className={primaryButton}>
                  Create resume
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/jobs" className={secondaryButton}>
                  Browse jobs
                </Link>
              </div>
            </div>
          </div>
        </HeroHighlight>

        <section className="px-4 py-14 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight text-[#0A0A0A] md:text-4xl">
                What the builder helps you finish
              </h2>
              <p className="mt-4 text-base leading-7 text-[#6F6F76]">
                No extra decoration, no confusing choices. Each step moves your
                resume closer to being ready for applications.
              </p>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <FeatureBlock key={feature.title} {...feature} />
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[#EADFD9] bg-white px-4 py-14 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[360px_1fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#FF6B35]">
                Simple workflow
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#0A0A0A] md:text-4xl">
                From blank page to PDF in four steps.
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Pick a clean format",
                "Add education and projects",
                "Review AI suggestions",
                "Download and apply",
              ].map((step, index) => (
                <div
                  key={step}
                  className="rounded-[8px] border border-[#EADFD9] bg-[#F7F5F2] p-5"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#0B0B0D] text-sm font-semibold text-white">
                    {index + 1}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-[#0A0A0A]">
                    {step}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-14 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 rounded-[8px] border border-[#2A2A2F] bg-[#15151A] p-6 text-white md:grid-cols-[1fr_auto] md:items-center md:p-8">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight">
                  Ready to create your resume?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#D8D8DF]">
                  Build it once, save it in your browser, and use it across your
                  fresher job applications.
                </p>
              </div>
              <Link to="/resume/builder" className={primaryButton}>
                Create resume
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-[#F6EAE0] px-4 py-14 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight text-[#0A0A0A]">
                Resume questions freshers ask
              </h2>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {resumeFaqs.map((faq) => (
                <article
                  key={faq.question}
                  className="rounded-[8px] border border-[#EADFD9] bg-[#F7F5F2] p-5"
                >
                  <div className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#8500FA]" />
                    <div>
                      <h3 className="text-base font-semibold text-[#0A0A0A]">
                        {faq.question}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-[#6F6F76]">
                        {faq.answer}
                      </p>
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
