export default function MinimalEbookLanding() {
  const categories = [
    {
      category: "Communication",
      items: [
        {
          title: "Professional Communication Guide",
          role: "For Freshers",
          pages: "124 Pages",
          lessons: "18 Modules",
          test: "12 Mock Tests",
          desc: "Improve speaking, confidence, interview communication and workplace interaction with practical examples.",
        },
        {
          title: "Business English Notes",
          role: "Career Growth",
          pages: "88 Pages",
          lessons: "10 Modules",
          test: "8 Mock Tests",
          desc: "Professional email writing, workplace vocabulary and fluent communication practices.",
        },
        {
          title: "Interview Speaking Handbook",
          role: "Placement Ready",
          pages: "102 Pages",
          lessons: "14 Modules",
          test: "10 Mock Tests",
          desc: "HR interview speaking practice, confidence building and communication strategies.",
        },
      ],
    },
    {
      category: "Aptitude",
      items: [
        {
          title: "Aptitude Preparation Handbook",
          role: "Placement Ready",
          pages: "98 Pages",
          lessons: "20 Modules",
          test: "15 Mock Tests",
          desc: "Quantitative aptitude, logical reasoning and shortcut tricks for placement preparation.",
        },
        {
          title: "Logical Reasoning Mastery",
          role: "Interview Focused",
          pages: "116 Pages",
          lessons: "16 Modules",
          test: "9 Mock Tests",
          desc: "Reasoning concepts, puzzle solving and company-based aptitude preparation.",
        },
        {
          title: "Quant Shortcut Tricks",
          role: "Fast Learning",
          pages: "76 Pages",
          lessons: "11 Modules",
          test: "6 Mock Tests",
          desc: "Shortcut methods and calculation techniques to solve aptitude faster.",
        },
      ],
    },
    {
      category: "Placement Preparation",
      items: [
        {
          title: "Complete Placement Preparation",
          role: "Interview Focused",
          pages: "143 Pages",
          lessons: "25 Modules",
          test: "18 Mock Tests",
          desc: "Company interview questions, resume tips, coding rounds and HR preparation resources.",
        },
        {
          title: "Resume & HR Preparation",
          role: "Career Guide",
          pages: "67 Pages",
          lessons: "9 Modules",
          test: "5 Mock Tests",
          desc: "Resume building, HR round questions and personality development guidance.",
        },
        {
          title: "Coding Interview Crash Course",
          role: "Developer Track",
          pages: "132 Pages",
          lessons: "22 Modules",
          test: "14 Mock Tests",
          desc: "DSA preparation, coding interview patterns and technical interview concepts.",
        },
      ],
    },
  ];

  const trendingBooks = [
    {
      title: "Complete Placement Preparation",
      href: "#placement-preparation",
      gradient: "hover:from-orange-400 hover:to-pink-500",
    },
    {
      title: "Professional Communication Guide",
      href: "#communication",
      gradient: "hover:from-blue-400 hover:to-cyan-400",
    },
    {
      title: "Aptitude Preparation Handbook",
      href: "#aptitude",
      gradient: "hover:from-violet-500 hover:to-fuchsia-500",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f2] text-black px-6 md:px-14 py-10 font-sans">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[40px] border border-black/10 bg-white px-8 md:px-14 py-16 shadow-sm">
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-black/5 blur-3xl" />

        <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm tracking-[0.25em] uppercase text-black/50 mb-5">
              Curated Learning PDFs
            </p>

            <h1 className="text-5xl md:text-7xl leading-[0.95] tracking-tight font-light">
              Learn Faster.
              <br />
              Grow Smarter.
            </h1>

            <p className="mt-7 text-black/60 text-lg leading-8 max-w-xl">
              Premium ebooks & PDFs for freshers and experienced professionals.
              Simple notes, practical concepts, interview prep and real-world
              learning resources — all in one place.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button className="px-7 py-3 rounded-full bg-black text-white text-sm tracking-wide hover:scale-[1.02] transition">
                Explore PDFs
              </button>

              <button className="px-7 py-3 rounded-full border border-black/10 bg-white text-sm tracking-wide hover:bg-black hover:text-white transition">
                View Collection
              </button>
            </div>
          </div>

          <div className="relative flex justify-center md:justify-end">
            <div className="w-[260px] rotate-[-8deg] rounded-[28px] border border-black/10 bg-[#ecece7] p-4 shadow-xl">
              <div className="aspect-[3/4] rounded-[22px] bg-white p-6 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center text-xs">
                    PDF
                  </div>

                  <h3 className="mt-6 text-2xl font-medium leading-tight">
                    Complete Interview Preparation
                  </h3>
                </div>

                <div className="text-sm text-black/50">
                  Beginner → Advanced Learning
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Books Marquee */}
      <section className="mt-20 overflow-hidden">
        <div className="mb-8">
          <p className="uppercase tracking-[0.25em] text-black/40 text-sm">
            Featured Collection
          </p>

          <h2 className="mt-3 text-4xl md:text-5xl font-light tracking-tight">
            Our Top 3 Trending Books
          </h2>
        </div>

        <div className="relative flex overflow-hidden">
          <div className="flex min-w-full animate-[marquee_18s_linear_infinite] gap-6">
            {[...trendingBooks, ...trendingBooks].map((book, index) => (
              <a
                key={index}
                href={book.href}
                className={`group min-w-[320px] rounded-[32px] bg-[#e7e7e2] p-6 transition-all duration-500 hover:text-white bg-gradient-to-br ${book.gradient}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.2em] text-black/40 group-hover:text-white/70 transition">
                    Trending PDF
                  </span>

                  <span className="text-sm text-black/40 group-hover:text-white/70 transition">
                    View
                  </span>
                </div>

                <h3 className="mt-10 text-3xl font-light leading-tight text-black group-hover:text-white transition duration-500">
                  {book.title}
                </h3>
              </a>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes marquee {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}</style>
      </section>

      {/* PDF Showcase Section */}
      <section className="mt-16 space-y-8">
        {categories.map((category, categoryIndex) => {
          return (
            <div
              key={categoryIndex}
              id={category.category.toLowerCase().split(" ").join("-")}
              className="mb-24"
            >
              <div className="mb-10 flex items-center justify-between">
                <div>
                  <p className="uppercase tracking-[0.25em] text-black/40 text-sm">
                    Category
                  </p>

                  <h2 className="mt-3 text-4xl md:text-5xl font-light tracking-tight">
                    {category.category}
                  </h2>
                </div>

                <div className="hidden md:flex items-center gap-3 text-sm text-black/40">
                  <span>{category.items.length} PDFs</span>
                </div>
              </div>

              <div className="space-y-14">
                {category.items.map((pdf, index) => {
                  return (
                    <div
                      key={index}
                      className="grid lg:grid-cols-[320px_1fr] gap-8 items-center rounded-[36px] p-6 md:p-8"
                    >
                      {/* Left PDF */}
                      <div className="flex justify-center lg:justify-start">
                        <div className="w-[240px] rotate-[-4deg] rounded-[30px] border border-black/10 bg-[#ecece7] p-4 transition duration-300 hover:rotate-0">
                          <div className="aspect-[3/4] rounded-[24px] bg-black text-white p-6 flex flex-col justify-between">
                            <div>
                              <div className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center text-xs font-medium">
                                PDF
                              </div>

                              <h3 className="mt-6 text-2xl leading-tight font-light">
                                {pdf.title}
                              </h3>
                            </div>

                            <div>
                              <p className="text-sm text-white/50">{pdf.role}</p>
                              <p className="text-sm text-white/30 mt-1">{pdf.pages}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Overview */}
                      <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-5xl leading-[1.05] tracking-tight font-light">
                          {pdf.title}
                        </h2>

                        <p className="mt-6 text-black/60 leading-8 text-lg">
                          {pdf.desc} This PDF is designed to help learners understand concepts in a clean and practical way with focused notes, structured learning and real interview-based preparation.
                        </p>

                        <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-black/50">
                          <span>{pdf.lessons}</span>
                          <span>{pdf.test}</span>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-4">
                          <button className="px-7 py-3 rounded-full bg-black text-white text-sm transition hover:scale-[1.03]">
                            Download PDF
                          </button>

                          <button className="px-7 py-3 rounded-full bg-black/5 text-sm transition hover:bg-black hover:text-white">
                            Mock Test
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
