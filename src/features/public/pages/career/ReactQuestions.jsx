import useSEO from "@/seo/useSEO";
import seoMeta from "@/data/seoMeta";
import {
  buildWebPage,
  buildBreadcrumbList,
  buildBook,
} from "@/seo/schemas";

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
      gradient: "from-[#8500FA] to-[#6D00D2]",
    },
    {
      title: "Professional Communication Guide",
      href: "#communication",
      gradient: "from-[#FF6B35] to-[#FF9566]",
    },
    {
      title: "Aptitude Preparation Handbook",
      href: "#aptitude",
      gradient: "from-[#C6AFFF] to-[#8500FA]",
    },
  ];

  const meta = seoMeta["/e-book"];
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
          { name: "E-book", path: meta.path },
        ],
        meta.path,
      ),
      buildBook({
        name: "FirstJobIndia Learning Library for Fresher Interviews",
        description:
          "Curated PDFs, notes, and mock-test packs for Indian freshers preparing for first interviews across communication, aptitude, frontend, backend, and HR rounds.",
        path: meta.path,
        inLanguage: "en-IN",
      }),
    ],
  });

  return (
    <div className="min-h-screen bg-[#FFF7F3] px-6 py-10 font-body text-[#0A0A0A] md:px-14">
      {seoElement}
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[8px] border border-[#EADFD9] bg-white px-8 py-16 shadow-sm md:px-14">
        <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm tracking-[0.25em] uppercase text-black/50 mb-5">
              Free for FirstJobIndia members
            </p>

            <h1 className="text-5xl md:text-7xl leading-[0.95] tracking-tight font-light">
              Interview-ready,
              <br />
              fresher-focused.
            </h1>

            <p className="mt-7 text-black/60 text-lg leading-8 max-w-xl">
              Curated PDFs, notes, and mock-test packs for Indian freshers
              preparing for their first interview. Communication, aptitude,
              frontend, backend, and HR rounds, all in one library.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button className="rounded-[8px] bg-[#FF6B35] px-7 py-3 text-sm tracking-wide text-white transition hover:bg-[#FF9566]">
                Open the library
              </button>

              <button className="rounded-[8px] border border-[#EADFD9] bg-white px-7 py-3 text-sm tracking-wide transition hover:border-[#C6AFFF] hover:text-[#8500FA]">
                Browse by topic
              </button>
            </div>
          </div>

          <div className="relative flex justify-center md:justify-end">
            <div className="w-[260px] rotate-[-8deg] rounded-[8px] border border-[#EADFD9] bg-[#F7F5F2] p-4 shadow-xl">
              <div className="aspect-[3/4] rounded-[8px] bg-white p-6 flex flex-col justify-between">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-[8px] bg-[#111114] text-xs text-white">
                    PDF
                  </div>

                  <h3 className="mt-6 text-2xl font-medium leading-tight">
                    Complete Interview Preparation
                  </h3>
                </div>

                <div className="text-sm text-black/50">
                  From beginner to interview-ready
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
            Featured this month
          </p>

          <h2 className="mt-3 text-4xl md:text-5xl font-light tracking-tight">
            Most downloaded this month
          </h2>
        </div>

        <div className="relative flex overflow-hidden">
          <div className="flex min-w-full animate-[marquee_18s_linear_infinite] gap-6">
            {[...trendingBooks, ...trendingBooks].map((book, index) => (
              <a
                key={index}
                href={book.href}
                className={`min-w-[320px] rounded-[8px] p-6 bg-gradient-to-br ${book.gradient}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.2em] text-white/70">
                    Trending PDF
                  </span>

                  <span className="text-sm text-white/70">
                    View
                  </span>
                </div>

                <h3 className="mt-10 text-3xl font-light leading-tight text-white">
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
          const coverColor =
            category.category === "Communication"
              ? "bg-[#8500FA]"
              : category.category === "Aptitude"
                ? "bg-[#6D00D2]"
                : category.category === "Placement Preparation"
                  ? "bg-[#FF6B35]"
                  : "bg-[#111114]";

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
                      className="grid items-center gap-8 rounded-[8px] p-6 md:p-8 lg:grid-cols-[320px_1fr]"
                    >
                      {/* Left PDF */}
                      <div className="flex justify-center lg:justify-start">
                        <div className="w-[240px] rotate-[-4deg] rounded-[8px] border border-[#EADFD9] bg-[#F7F5F2] p-4 transition duration-300 hover:rotate-0">
                          <div className={`aspect-[3/4] rounded-[8px] ${coverColor} text-white p-6 flex flex-col justify-between`}>
                            <div>
                              <div className="flex h-12 w-12 items-center justify-center rounded-[8px] bg-white text-xs font-medium text-[#0A0A0A]">
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
                          <button className="rounded-[8px] bg-[#FF6B35] px-7 py-3 text-sm text-white transition hover:bg-[#FF9566]">
                            Download PDF
                          </button>

                          <button className="rounded-[8px] bg-[#F7F5F2] px-7 py-3 text-sm transition hover:bg-[#111114] hover:text-white">
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
