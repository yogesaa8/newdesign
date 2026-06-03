import React, { useState } from "react";
import { Link } from "react-router-dom";
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
  buildWebPage,
  buildBreadcrumbList,
  buildFAQPage,
  buildHowTo,
} from "@/seo/schemas";
import resumeFaqs from "@/data/resumeFaqs";

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
        description:
          "A short guide to building a recruiter-ready fresher resume on FirstJobIndia.",
        steps: [
          {
            name: "Choose a template",
            text: "Pick a clean, ATS-friendly template designed for first-time job seekers in India.",
          },
          {
            name: "Add your details",
            text: "Fill in education, internships, projects, and skills using guided prompts that suggest stronger phrasing.",
          },
          {
            name: "Highlight outcomes",
            text: "Turn responsibilities into measurable outcomes with action verbs and numbers.",
          },
          {
            name: "Download as PDF",
            text: "Export a recruiter-ready PDF and start applying to verified fresher jobs.",
          },
        ],
      }),
    ],
  });

  // const navItems = [
  //   {
  //     name: "Jobs",
  //     link: "/jobs",
  //   },
  //   {
  //     name: "Resume",
  //     link: "/resume",
  //   },
  //   {
  //     name: "Services",
  //     children: [
  //       { name: "Company", link: "/company" },
  //       { name: "College", link: "/college" },
  //       { name: "Career GPS", link: "/career-gps" },
  //     ],
  //   },
  //   {
  //     name: "Review",
  //     link: "/reviews",
  //   },
  // ];

  const features = [
    {
      title: "Templates built for freshers",
      text: "Clean, single-column resume layouts designed for Indian fresher hiring and tested by real recruiters.",
      image: "https://cdn-icons-png.flaticon.com/512/4341/4341139.png",
      alt: "Resume template illustration",
    },
    {
      title: "AI content guidance",
      text: "Prompts that turn your college projects and internships into bullet points recruiters actually read.",
      image: "https://cdn-icons-png.flaticon.com/512/4341/4341134.png",
      alt: "Resume content illustration",
    },
    {
      title: "Six-second scan ready",
      text: "Every section sized for the six-second recruiter scan, the standard in Indian hiring.",
      image: "https://cdn-icons-png.flaticon.com/512/4341/4341160.png",
      alt: "Recruiter ready illustration",
    },
    {
      title: "Free PDF and share link",
      text: "Download a print-ready PDF or share a hosted link with recruiters in one tap.",
      image: "https://cdn-icons-png.flaticon.com/512/4341/4341025.png",
      alt: "Resume download illustration",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {seoElement}
      <Navbar className="bg-[#FFF7F3] dark:bg-[#121212]">
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton as={Link} to="/seeker/login" variant="secondary">
              Sign in
            </NavbarButton>
            <NavbarButton as={Link} to="/seeker/signup" variant="primary">
              Build my resume
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
              <div key={`mobile-link-${idx}`} className="w-full">
                {item.link && (
                  <a
                    href={item.link}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 text-[#5C534D] dark:text-[#9CA3AF]"
                  >
                    {item.name}
                  </a>
                )}

                {item.children && (
                  <div className="flex flex-col gap-2">
                    <span className="py-2 font-medium text-[#2D2926] dark:text-white">
                      {item.name}
                    </span>

                    <div className="ml-4 flex flex-col gap-2">
                      {item.children.map((child, i) => (
                        <a
                          key={i}
                          href={child.link}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-sm text-[#8A827C] dark:text-[#9CA3AF]"
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
                Build my resume
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      <main className="relative overflow-hidden bg-[#FFF7F3] dark:bg-[#121212]">
        <section className="relative overflow-hidden w-full" id="home">
          <div
            aria-hidden="true"
            className="absolute inset-0 grid grid-cols-2 -space-x-20 opacity-40 pointer-events-none dark:opacity-20 md:-space-x-52"
          >
            <div className="h-40 blur-[80px] bg-linear-to-br from-[#FC9664] to-[#DDE8D8] dark:from-[#4A2C1A] dark:to-[#1E1E1E] md:h-56 md:blur-[106px]" />
            <div className="h-32 blur-[80px] bg-linear-to-r from-[#FFF7F3] to-[#DDE8D8] dark:from-[#2D2926] dark:to-[#121212] md:blur-[106px]" />
          </div>

          <div className="mx-auto max-w-7xl px-6 md:px-12">
            <div className="relative pt-28 md:pt-36">
              <div className="mx-auto text-center lg:w-2/3">
                <h1 className="text-4xl font-bold text-[#2D2926] dark:text-white sm:text-5xl md:text-6xl xl:text-7xl">
                  Your first resume, recruiter-ready in minutes.
                </h1>

                <p className="mx-auto mt-8 max-w-2xl text-[#5C534D] dark:text-[#9CA3AF]">
                  FirstJobIndia&apos;s AI resume builder writes, rewrites, and
                  formats every section for Indian recruiters. Free for
                  freshers, always.
                </p>

                <div className="mt-12 flex flex-col flex-wrap justify-center gap-4 sm:flex-row sm:gap-6 md:mt-16">
                  <a
                    href="#features"
                    className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-[#FC9664] before:transition before:duration-300 hover:before:scale-105 active:before:scale-95 sm:w-max"
                  >
                    <span className="relative text-base font-semibold text-[#2D2926]">
                      Start building free
                    </span>
                  </a>

                  <a
                    href="#templates"
                    className="relative flex h-11 w-full items-center justify-center px-6 text-[#FC9664] before:absolute before:inset-0 before:rounded-full before:border before:border-[#E0D8D3] before:bg-[#FC9664]/10 before:transition before:duration-300 hover:before:scale-105 active:before:scale-95 dark:text-white dark:before:border-[#333333] dark:before:bg-[#333333] sm:w-max"
                  >
                    <span className="relative text-base font-semibold">
                      See sample resumes
                    </span>
                  </a>
                </div>

                <div className="mt-16 hidden justify-between gap-6 border-y border-[#E0D8D3] py-8 dark:border-[#333333] sm:flex">
                  <div className="text-left">
                    <h6 className="text-lg font-semibold text-[#2D2926] dark:text-white">
                      Free for freshers
                    </h6>
                    <p className="mt-2 text-[#5C534D] dark:text-[#9CA3AF]">
                      No paywall, no card, no limits.
                    </p>
                  </div>

                  <div className="text-left">
                    <h6 className="text-lg font-semibold text-[#2D2926] dark:text-white">
                      ATS-friendly format
                    </h6>
                    <p className="mt-2 text-[#5C534D] dark:text-[#9CA3AF]">
                      Cleared by every major Indian ATS.
                    </p>
                  </div>

                  <div className="text-left">
                    <h6 className="text-lg font-semibold text-[#2D2926] dark:text-white">
                      Instant PDF
                    </h6>
                    <p className="mt-2 text-[#5C534D] dark:text-[#9CA3AF]">
                      Share with one tap, even on slow networks.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
                <div className="p-4 grayscale transition duration-200 hover:grayscale-0">
                  <img
                    src="./images/clients/microsoft.svg"
                    className="mx-auto h-12 w-auto"
                    loading="lazy"
                    alt="Microsoft logo, recruiter trust signal on FirstJobIndia resume builder"
                  />
                </div>

                <div className="p-4 grayscale transition duration-200 hover:grayscale-0">
                  <img
                    src="./images/clients/airbnb.svg"
                    className="mx-auto h-12 w-auto"
                    loading="lazy"
                    alt="Airbnb logo, recruiter trust signal on FirstJobIndia resume builder"
                  />
                </div>

                <div className="flex p-4 grayscale transition duration-200 hover:grayscale-0">
                  <img
                    src="./images/clients/google.svg"
                    className="m-auto h-9 w-auto"
                    loading="lazy"
                    alt="Google logo, recruiter trust signal on FirstJobIndia resume builder"
                  />
                </div>

                <div className="p-4 grayscale transition duration-200 hover:grayscale-0">
                  <img
                    src="./images/clients/ge.svg"
                    className="mx-auto h-12 w-auto"
                    loading="lazy"
                    alt="GE logo, recruiter trust signal on FirstJobIndia resume builder"
                  />
                </div>

                <div className="flex p-4 grayscale transition duration-200 hover:grayscale-0">
                  <img
                    src="./images/clients/netflix.svg"
                    className="m-auto h-8 w-auto"
                    loading="lazy"
                    alt="Netflix logo, recruiter trust signal on FirstJobIndia resume builder"
                  />
                </div>

                <div className="p-4 grayscale transition duration-200 hover:grayscale-0">
                  <img
                    src="./images/clients/google-cloud.svg"
                    className="mx-auto h-12 w-auto"
                    loading="lazy"
                    alt="Google Cloud logo, recruiter trust signal on FirstJobIndia resume builder"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24" id="features">
          <div className="mx-auto max-w-7xl px-6 md:px-12">
            <div className="md:w-2/3 lg:w-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6 text-[#FC9664]"
              >
                <path
                  fillRule="evenodd"
                  d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z"
                  clipRule="evenodd"
                />
              </svg>

              <h2 className="my-8 text-2xl font-bold text-[#2D2926] dark:text-white md:text-4xl">
                Everything a fresher needs to win the first interview.
              </h2>
              <p className="text-[#5C534D] dark:text-[#9CA3AF]">
                A sharp resume is the cheapest career investment you will make.
                We make it sharp for you.
              </p>
            </div>

            <div className="mt-16 grid overflow-hidden rounded-3xl  divide-[#E0D8D3] dark:border-[#333333] dark:bg-[#1E1E1E] dark:divide-[#333333] sm:grid-cols-2 sm:divide-x lg:grid-cols-4 xl:grid-cols-4">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`group relative transition hover:z-[1] hover:shadow-2xl ${
                    index === features.length - 1
                      ? "bg-[#FFF7F3] dark:bg-[#121212]"
                      : ""
                  }`}
                >
                  <div
                    className={`relative space-y-8 p-8 py-12 transition duration-300 ${
                      index === features.length - 1
                        ? "group-hover:bg-white dark:group-hover:bg-[#1E1E1E]"
                        : ""
                    }`}
                  >
                    <img
                      src={feature.image}
                      className="w-12"
                      width="512"
                      height="512"
                      alt={feature.alt}
                    />

                    <div className="space-y-2">
                      <h5 className="text-xl font-semibold text-[#2D2926] transition group-hover:text-[#FC9664] dark:text-white">
                        {feature.title}
                      </h5>
                      <p className="text-[#5C534D] dark:text-[#9CA3AF]">
                        {feature.text}
                      </p>
                    </div>
                    <a
                      href="#solution"
                      className="flex items-center justify-between text-[#FC9664]"
                    >
                      <span className="text-sm">Read more</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-24" id="solution">
          <div className="mx-auto max-w-7xl px-6 md:px-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6 text-[#2D6A4F]"
            >
              <path
                fillRule="evenodd"
                d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z"
                clipRule="evenodd"
              />
            </svg>

            <div className="space-y-6 justify-between md:flex md:flex-row-reverse md:gap-6 md:space-y-0 lg:items-center lg:gap-12">
              <div className="md:5/12 lg:w-1/2">
                <img
                  src="./images/pie.svg"
                  alt="Resume builder preview"
                  loading="lazy"
                  className="w-full"
                />
              </div>
              <div className="md:7/12 lg:w-1/2">
                <h2 className="text-3xl font-bold text-[#2D2926] dark:text-white md:text-4xl">
                  Why freshers pick the FirstJobIndia resume builder.
                </h2>
                <p className="my-8 text-[#5C534D] dark:text-[#9CA3AF]">
                  Freshers do not have ten years of work to show. We help you
                  show what you do have, framed the way Indian recruiters want
                  to see it.
                </p>
                <div className="space-y-4">
                  <div className="mt-8 flex gap-4 md:items-center">
                    <div className="flex h-12 w-12 rounded-full bg-[#FFF7F3] dark:bg-[#4A2C1A]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="m-auto h-6 w-6 text-[#FC9664]"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="w-5/6">
                      <h3 className="text-lg font-semibold text-[#2D2926] dark:text-[#FC9664]">
                        Generative AI
                      </h3>
                      <p className="text-[#5C534D] dark:text-[#9CA3AF]">
                        Rewrite any section to match the JD you are applying
                        for.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4 md:items-center">
                    <div className="flex h-12 w-12 rounded-full bg-[#DDE8D8] dark:bg-[#1A2E1A]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="m-auto h-6 w-6 text-[#2D6A4F]"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="w-5/6">
                      <h3 className="text-lg font-semibold text-[#2D2926] dark:text-[#DDE8D8]">
                        ATS-optimised
                      </h3>
                      <p className="text-[#5C534D] dark:text-[#9CA3AF]">
                        Tested against every major Indian ATS, including Naukri
                        RMS and Workday IN.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ResumeLanding;
