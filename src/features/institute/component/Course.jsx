import React from "react";

const institutes = [
  {
    id: "international-college-of-financial-planning",
    name: "International College of Financial Planning",
    category: "Finance and Wealth Management Institute",
    location: "India",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200",
    logo: "IC",
    description:
      "A finance-focused education institute offering industry-oriented learning in financial planning, wealth management, banking, investment products, capital markets, and BFSI career development.",
    highlights: [
      "Financial planning and wealth management programs",
      "Banking, investment and BFSI-focused curriculum",
      "Industry-oriented certifications and training",
      "Career preparation and placement support",
    ],
    stats: [
      { value: "Finance", label: "Primary Domain" },
      { value: "BFSI", label: "Career Focus" },
      { value: "Industry", label: "Relevant Learning" },
    ],
    link: "/institute/international-college-of-financial-planning",
  },
  {
    id: "technology-training-institute",
    name: "Technology Training Institute",
    category: "Technology and Digital Skills Institute",
    location: "India",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200",
    logo: "TI",
    description:
      "A technology-focused training institute helping students build practical skills in software development, artificial intelligence, data analytics, cloud computing, cybersecurity, and emerging technologies.",
    highlights: [
      "Software development and programming courses",
      "Artificial intelligence and data training",
      "Hands-on projects and technical assignments",
      "Job-oriented learning and interview preparation",
    ],
    stats: [
      { value: "Tech", label: "Primary Domain" },
      { value: "Projects", label: "Practical Learning" },
      { value: "Career", label: "Job Preparation" },
    ],
    link: "/institute/technology-training-institute",
  },
];

const Course = () => {
  return (
    <section
      id="institutes"
      className="w-full overflow-hidden bg-black px-4 py-16 sm:px-6 md:py-24"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex w-fit items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-3 py-1 text-violet-200">
              <svg
                width="13"
                height="14"
                viewBox="0 0 13 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.613 8.2a.62.62 0 0 1-.553-.341.59.59 0 0 1 .076-.637l6.048-6.118a.31.31 0 0 1 .375-.069c.061.033.11.084.137.147a.3.3 0 0 1 .014.197L6.537 4.991a.59.59 0 0 0 .07.552.61.61 0 0 0 .504.257h4.276a.62.62 0 0 1 .553.341.59.59 0 0 1-.076.637l-6.048 6.119a.31.31 0 0 1-.375.067.295.295 0 0 1-.15-.344l1.172-3.61a.59.59 0 0 0-.07-.553.61.61 0 0 0-.504-.257z"
                  stroke="currentColor"
                  strokeMiterlimit="5.759"
                  strokeLinecap="round"
                />
              </svg>

              <span className="text-xs sm:text-sm">Featured Institutes</span>
            </div>

            <h2 className="max-w-3xl text-3xl font-medium leading-tight text-white sm:text-4xl lg:text-5xl">
              Explore Institutes Across Finance, Technology and Career Skills
            </h2>

            <p className="mb-10 mt-4 max-w-2xl text-sm leading-6 text-gray-400 sm:mb-12 sm:text-base">
              Discover institutes offering industry-relevant programs in
              finance, banking, fintech, software development, artificial
              intelligence, data, management and other career-focused fields.
            </p>
          </div>

          {/* One card on small devices and two cards in one row on large devices */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
            {institutes.map((institute) => (
              <article
                key={institute.id}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur"
              >
                {/* Institute image on top */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900 sm:aspect-[16/9]">
                  <img
                    src={institute.image}
                    alt={institute.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  <div className="absolute left-4 top-4 flex max-w-[calc(100%-2rem)] items-center gap-3 sm:left-5 sm:top-5">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-black/60 text-sm font-semibold text-white backdrop-blur sm:size-12">
                      {institute.logo}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-xs text-violet-200">
                        {institute.category}
                      </p>

                      <p className="mt-0.5 truncate text-xs text-white/70 sm:text-sm">
                        {institute.location}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Institute content below image */}
                <div className="flex flex-1 flex-col p-5 sm:p-6 lg:p-7">
                  <h3 className="text-xl font-medium leading-tight text-white sm:text-2xl">
                    {institute.name}
                  </h3>

                  <p className="mt-4 text-sm leading-6 text-gray-400">
                    {institute.description}
                  </p>

                  <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2">
                    {institute.highlights.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-2 rounded-xl border border-white/10 bg-black/30 px-3 py-3 text-sm leading-5 text-gray-300"
                      >
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-violet-400" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
                    {institute.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="min-w-0 rounded-xl border border-white/10 bg-black/40 px-2 py-3 text-center sm:px-3 sm:py-4"
                      >
                        <p className="truncate text-sm font-semibold text-white sm:text-lg lg:text-xl">
                          {stat.value}
                        </p>

                        <p className="mt-1 text-[9px] leading-3 text-white/50 sm:text-[11px] sm:leading-4">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-col gap-3 pt-7 sm:flex-row md:flex-col xl:flex-row">
                    <a
                      href={institute.link}
                      className="inline-flex flex-1 items-center justify-center rounded-full bg-violet-600 px-5 py-3 text-center text-sm font-medium text-white transition hover:bg-violet-700"
                    >
                      View Institute Details
                    </a>

                    <a
                      href="/contact"
                      className="inline-flex flex-1 items-center justify-center rounded-full border border-violet-900 bg-white/10 px-5 py-3 text-center text-sm font-medium text-gray-50 transition hover:bg-white/20"
                    >
                      Become a Partner
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Course;