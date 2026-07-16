import React from "react";

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-n-800 relative overflow-hidden">
      {/* Subtle Background Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-co-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-info/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl text-center font-bold leading-tight mb-6 max-w-max lg:max-w-3xl lg:mx-auto bg-clip-text text-transparent bg-gradient-to-b from-white to-n-400">
            Built for your first job, not your fifth.
          </h2>
          <p className="text-base font-normal text-n-400 lg:max-w-2xl lg:mx-auto mb-10">
            FirstJobIndia gives freshers the resume, the analytics, and the
            recruiter access that older job boards reserve for senior talent.
          </p>
          <div className="flex flex-col justify-center md:flex-row gap-4 max-w-lg mx-auto md:max-w-2xl lg:max-w-full">
            <a
              href="/jobs"
              className="cursor-pointer py-3 px-8 rounded-full flex items-center justify-center text-sm font-semibold bg-white text-n-900 hover:bg-n-200 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)]"
            >
              See first jobs
            </a>
            <a
              href="/company/login"
              className="cursor-pointer border border-n-700 text-n-200 hover:border-n-500 hover:text-white py-3 px-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300"
            >
              For employers
            </a>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-lg mx-auto md:max-w-2xl lg:max-w-full">
          {/* Card 1 (Large) */}
          <div className="relative w-full h-auto md:col-span-2 group">
            <div className="rounded-3xl flex justify-between flex-row flex-wrap h-full border border-n-700 bg-n-900/50 backdrop-blur-sm p-1 transition-all duration-500 hover:border-co-primary/50 hover:shadow-[0_0_40px_-10px_rgba(124,58,237,0.4)]">
              <div className="p-6 xl:p-8 w-full md:w-1/2 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-co-primary/10 flex items-center justify-center mb-6 border border-co-primary/20">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 12.5V18.75M18.75 2.5L11.25 2.5M15 28.75C8.7868 28.75 3.75 23.7132 3.75 17.5C3.75 11.2868 8.7868 6.25 15 6.25C21.2132 6.25 26.25 11.2868 26.25 17.5C26.25 23.7132 21.2132 28.75 15 28.75Z"
                        stroke="url(#grad1)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <defs>
                        <linearGradient
                          id="grad1"
                          x1="3.75"
                          y1="2.5"
                          x2="26.25"
                          y2="28.75"
                        >
                          <stop stopColor="#a855f7" />
                          <stop offset="1" stopColor="#6366f1" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold xl:text-2xl py-4 w-full xl:w-64 text-white">
                    AI resume builder, tuned for freshers
                  </h3>
                  <p className="text-sm font-normal w-full mb-8 xl:w-64 text-n-400 leading-relaxed">
                    Generate, edit, and tailor your resume with generative AI
                    prompts written for Indian freshers, not generic templates.
                  </p>
                </div>
                <a
                  href="/resume"
                  className="self-start py-2.5 px-6 border border-n-700 hover:border-co-primary text-n-200 hover:text-co-primary rounded-full gap-2 text-xs font-semibold flex items-center justify-between transition-all duration-300"
                >
                  Open resume
                  <svg
                    width="6"
                    height="10"
                    viewBox="0 0 6 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 9L3.58579 6.41421C4.25245 5.74755 4.58579 5.41421 4.58579 5C4.58579 4.58579 4.25245 4.25245 3.58579 3.58579L1 1"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </a>
              </div>
              <div className="relative hidden h-auto md:w-1/2 md:block overflow-hidden rounded-[20px]">
                <img
                  src="https://pagedone.io/asset/uploads/1695028873.png"
                  alt="Header tailwind Section"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Subtle overlay on image for better text separation if they ever overlap */}
                <div className="absolute inset-0 bg-gradient-to-r from-n-900/50 to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative w-full h-auto group">
            <div className="rounded-3xl p-6 xl:p-8 h-full border border-n-700 bg-n-900/50 backdrop-blur-sm transition-all duration-500 hover:border-info/50 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.4)] hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-info/10 flex items-center justify-center mb-6 border border-info/20">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24.6429 11.4286C24.6429 14.3872 20.2457 16.7857 14.8214 16.7857C9.3972 16.7857 5 14.3872 5 11.4286M24.6429 16.7857C24.6429 19.7444 20.2457 22.1429 14.8214 22.1429C9.3972 22.1429 5 19.7444 5 16.7857M24.6429 22.1429C24.6429 25.1015 20.2457 27.5 14.8214 27.5C9.3972 27.5 5 25.1015 5 22.1429M24.6429 6.96429C24.6429 9.42984 20.2457 11.4286 14.8214 11.4286C9.3972 11.4286 5 9.42984 5 6.96429C5 4.49873 9.3972 2.5 14.8214 2.5C20.2457 2.5 24.6429 4.49873 24.6429 6.96429Z"
                    stroke="url(#grad2)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  ></path>
                  <defs>
                    <linearGradient
                      id="grad2"
                      x1="5"
                      y1="2.5"
                      x2="24.6429"
                      y2="27.5"
                    >
                      <stop stopColor="#3b82f6" />
                      <stop offset="1" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h3 className="py-4 text-lg font-bold xl:text-xl text-white">
                Verified Indian employers
              </h3>
              <p className="text-sm font-normal mb-8 text-n-400 leading-relaxed">
                Every recruiter is vetted before posting, so you only apply to
                companies that actually pay and actually call back.
              </p>
              <a
                href="/jobs"
                className="self-start py-2.5 px-6 border border-n-700 hover:border-info text-n-200 hover:text-info rounded-full gap-2 text-xs font-semibold flex items-center justify-between transition-all duration-300"
              >
                Browse jobs
                <svg
                  width="6"
                  height="10"
                  viewBox="0 0 6 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 9L3.58579 6.41421C4.25245 5.74755 4.58579 5.41421 4.58579 5C4.58579 4.58579 4.25245 4.25245 3.58579 3.58579L1 1"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative w-full h-auto group">
            <div className="rounded-3xl p-6 xl:p-8 h-full border border-n-700 bg-n-900/50 backdrop-blur-sm transition-all duration-500 hover:border-success/50 hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.4)] hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center mb-6 border border-success/20">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M26.7301 15.661C26.7301 22.1995 21.306 27.5 14.6151 27.5C7.9241 27.5 2.5 22.1995 2.5 15.661C2.5 9.1225 7.9241 3.822 14.6151 3.822M18.1313 10.1507L18.1313 4.85383C18.1313 3.22503 19.6455 2.00299 21.1519 2.70013C23.7608 3.90751 26.6177 6.25557 27.456 10.2563C27.7542 11.6798 26.4931 12.8563 25.0064 12.8368L20.7873 12.7814C19.3147 12.762 18.1313 11.5899 18.1313 10.1507Z"
                    stroke="url(#grad3)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  ></path>
                  <defs>
                    <linearGradient
                      id="grad3"
                      x1="2.5"
                      y1="3.822"
                      x2="27.456"
                      y2="27.5"
                    >
                      <stop stopColor="#10b981" />
                      <stop offset="1" stopColor="#34d399" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h3 className="py-4 text-lg font-bold xl:text-xl text-white">
                Career-readiness analytics
              </h3>
              <p className="text-sm font-normal mb-8 text-n-400 leading-relaxed">
                Track your readiness score across resume, skills, and
                interviews. We tell you what to fix before the recruiter sees
                it.
              </p>
              <a
                href="/career-gps"
                className="self-start py-2.5 px-6 border border-n-700 hover:border-success text-n-200 hover:text-success rounded-full gap-2 text-xs font-semibold flex items-center justify-between transition-all duration-300"
              >
                Open CareerGPS
                <svg
                  width="6"
                  height="10"
                  viewBox="0 0 6 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 9L3.58579 6.41421C4.25245 5.74755 4.58579 5.41421 4.58579 5C4.58579 4.58579 4.25245 4.25245 3.58579 3.58579L1 1"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Card 4 */}
          <div className="relative w-full h-auto group">
            <div className="rounded-3xl p-6 xl:p-8 h-full border border-n-700 bg-n-900/50 backdrop-blur-sm transition-all duration-500 hover:border-sk-primary/50 hover:shadow-[0_0_40px_-10px_rgba(255,107,53,0.4)] hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-sk-primary/10 flex items-center justify-center mb-6 border border-sk-primary/20 text-sk-primary font-bold">
                C
              </div>
              <h3 className="py-4 text-lg font-bold xl:text-xl text-white">
                College placement tools
              </h3>
              <p className="text-sm font-normal mb-8 text-n-400 leading-relaxed">
                Help placement teams coordinate fresher drives, shortlist
                students, and keep recruiter conversations in one place.
              </p>
              <a
                href="/college"
                className="self-start py-2.5 px-6 border border-n-700 hover:border-sk-primary text-n-200 hover:text-sk-primary rounded-full gap-2 text-xs font-semibold flex items-center justify-between transition-all duration-300"
              >
                View college
                <svg
                  width="6"
                  height="10"
                  viewBox="0 0 6 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 9L3.58579 6.41421C4.25245 5.74755 4.58579 5.41421 4.58579 5C4.58579 4.58579 4.25245 4.25245 3.58579 3.58579L1 1"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Card 5 */}
          <div className="relative w-full h-auto group">
            <div className="rounded-3xl p-6 xl:p-8 h-full border border-n-700 bg-n-900/50 backdrop-blur-sm transition-all duration-500 hover:border-co-primary/50 hover:shadow-[0_0_40px_-10px_rgba(124,58,237,0.4)] hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-co-primary/10 flex items-center justify-center mb-6 border border-co-primary/20 text-co-primary font-bold">
                E
              </div>
              <h3 className="py-4 text-lg font-bold xl:text-xl text-white">
                Interview e-book library
              </h3>
              <p className="text-sm font-normal mb-8 text-n-400 leading-relaxed">
                Download fresher-focused notes, communication guides, aptitude
                prep, and interview practice packs from one library.
              </p>
              <a
                href="/e-book"
                className="self-start py-2.5 px-6 border border-n-700 hover:border-co-primary text-n-200 hover:text-co-primary rounded-full gap-2 text-xs font-semibold flex items-center justify-between transition-all duration-300"
              >
                Open library
                <svg
                  width="6"
                  height="10"
                  viewBox="0 0 6 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 9L3.58579 6.41421C4.25245 5.74755 4.58579 5.41421 4.58579 5C4.58579 4.58579 4.25245 4.25245 3.58579 3.58579L1 1"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Card 6 */}
          <div className="relative w-full h-auto group">
            <div className="rounded-3xl p-6 xl:p-8 h-full border border-n-700 bg-n-900/50 backdrop-blur-sm transition-all duration-500 hover:border-error/50 hover:shadow-[0_0_40px_-10px_rgba(239,68,68,0.4)] hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-error/10 flex items-center justify-center mb-6 border border-error/20 text-error font-bold">
                F
              </div>
              <h3 className="py-4 text-lg font-bold xl:text-xl text-white">
                Product feedback
              </h3>
              <p className="text-sm font-normal mb-8 text-n-400 leading-relaxed">
                Tell us what feels confusing, broken, or missing. Your feedback
                helps us improve the fresher hiring experience.
              </p>
              <a
                href="/reviews"
                className="self-start py-2.5 px-6 border border-n-700 hover:border-error text-n-200 hover:text-error rounded-full gap-2 text-xs font-semibold flex items-center justify-between transition-all duration-300"
              >
                Send feedback
                <svg
                  width="6"
                  height="10"
                  viewBox="0 0 6 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 9L3.58579 6.41421C4.25245 5.74755 4.58579 5.41421 4.58579 5C4.58579 4.58579 4.25245 4.25245 3.58579 3.58579L1 1"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Card 7 */}
          <div className="relative w-full h-auto group">
            <div className="rounded-3xl p-6 xl:p-8 h-full border border-n-700 bg-n-900/50 backdrop-blur-sm transition-all duration-500 hover:border-warning/50 hover:shadow-[0_0_40px_-10px_rgba(245,158,11,0.4)] hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center mb-6 border border-warning/20 text-warning font-bold">
                H
              </div>
              <h3 className="py-4 text-lg font-bold xl:text-xl text-white">
                Employer workspace
              </h3>
              <p className="text-sm font-normal mb-8 text-n-400 leading-relaxed">
                Companies can post fresher roles, review applicants, and manage
                hiring activity from a focused workspace.
              </p>
              <a
                href="/company/login"
                className="self-start py-2.5 px-6 border border-n-700 hover:border-warning text-n-200 hover:text-warning rounded-full gap-2 text-xs font-semibold flex items-center justify-between transition-all duration-300"
              >
                Employer login
                <svg
                  width="6"
                  height="10"
                  viewBox="0 0 6 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 9L3.58579 6.41421C4.25245 5.74755 4.58579 5.41421 4.58579 5C4.58579 4.58579 4.25245 4.25245 3.58579 3.58579L1 1"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
