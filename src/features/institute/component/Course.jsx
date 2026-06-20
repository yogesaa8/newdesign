const institutes = [
  {
    id: "arcanum-academic-partner",
    name: "Arcanum Academic Partner Institute",
    category: "Academic UAV Partner",
    location: "Gurugram, Haryana",
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1200",
    logo: "AI",
    description:
      "A dedicated institute partnership focused on drone education, UAV system configuration, field testing, research projects, and industry-ready skill development for students.",
    highlights: [
      "Drone technology workshops",
      "Hands-on UAV field training",
      "Mapping and payload system demonstrations",
      "Student innovation and research support",
    ],
    stats: [
      { value: "120+", label: "Students Trained" },
      { value: "04", label: "Training Tracks" },
      { value: "15km", label: "Control Range Demo" },
    ],
    link: "/institute/arcanum-academic-partner",
  },
  {
    id: "technical-training-institute",
    name: "Technical Training Institute",
    category: "Skill Development Partner",
    location: "Delhi NCR",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200",
    logo: "TI",
    description:
      "A professional training collaboration designed to help students gain practical exposure in drone operations, hardware handling, safety practices, and real-world UAV applications.",
    highlights: [
      "Practical drone operation sessions",
      "Drone maintenance and safety training",
      "Industry-oriented certification support",
      "Live project-based learning",
    ],
    stats: [
      { value: "80+", label: "Learners Guided" },
      { value: "06", label: "Practical Sessions" },
      { value: "10+", label: "Live Projects" },
    ],
    link: "/institute/technical-training-institute",
  },
];

const Course = () => {
  return (
    <section
      id="institutes"
      className="w-full overflow-hidden bg-black px-4 py-16 sm:px-6 md:py-24"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="flex flex-col items-center px-0 text-center">
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
              <span className="text-xs sm:text-sm">Partner Institutes</span>
            </div>

            <h2 className="max-w-3xl text-3xl font-medium leading-tight text-white sm:text-4xl lg:text-5xl">
              Institute Collaborations for Practical Drone Learning
            </h2>

            <p className="mb-10 mt-4 max-w-2xl text-sm leading-6 text-gray-400 sm:mb-12 sm:text-base">
              Each institute partnership is designed to provide students with
              hands-on UAV exposure, technical workshops, field demonstrations,
              drone lab support, and innovation-driven project guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:gap-8">
            {institutes.map((institute) => (
              <article
                key={institute.id}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative min-h-[240px] overflow-hidden bg-neutral-900 sm:min-h-[320px] lg:min-h-full">
                    <img
                      src={institute.image}
                      alt={institute.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:bg-gradient-to-r" />

                    <div className="absolute left-4 top-4 flex max-w-[calc(100%-2rem)] items-center gap-3 sm:left-5 sm:top-5">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-black/50 font-semibold text-white backdrop-blur sm:size-14">
                        {institute.logo}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-xs text-violet-200">
                          {institute.category}
                        </p>
                        <p className="truncate text-sm text-white/70">
                          {institute.location}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center p-5 sm:p-8 lg:p-10">
                    <h3 className="text-2xl font-medium leading-tight text-white sm:text-3xl">
                      {institute.name}
                    </h3>

                    <p className="mt-4 text-sm leading-6 text-gray-400 sm:text-base sm:leading-7">
                      {institute.description}
                    </p>

                    <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {institute.highlights.map((item) => (
                        <div
                          key={item}
                          className="flex items-start gap-2 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm leading-5 text-gray-300"
                        >
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-violet-400" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-3 min-[420px]:grid-cols-3">
                      {institute.stats.map((stat) => (
                        <div
                          key={stat.label}
                          className="rounded-2xl border border-white/10 bg-black/40 px-3 py-4 text-center"
                        >
                          <p className="text-xl font-semibold text-white sm:text-2xl">
                            {stat.value}
                          </p>
                          <p className="mt-1 text-[11px] leading-4 text-white/50 sm:text-xs">
                            {stat.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                      <a
                        href={institute.link}
                        className="inline-flex items-center justify-center rounded-full bg-violet-600 px-6 py-3 text-center text-sm font-medium text-white transition hover:bg-violet-700"
                      >
                        View Institute Details
                      </a>

                      <a
                        href="/contact"
                        className="inline-flex items-center justify-center rounded-full border border-violet-900 bg-white/10 px-6 py-3 text-center text-sm font-medium text-gray-50 transition hover:bg-white/20"
                      >
                        Add Institute Partner
                      </a>
                    </div>
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
