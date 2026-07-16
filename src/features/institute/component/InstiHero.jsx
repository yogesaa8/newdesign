import React from "react";

const InstiHero = () => {
     const instituteStats = [
          {
               value: "Finance",
               label: "Banking, Investment and Fintech Programs",
          },
          {
               value: "Technology",
               label: "Software, AI, Data and Emerging Technologies",
          },
          {
               value: "Career",
               label: "Industry-Focused Training and Certifications",
          },
          {
               value: "Growth",
               label: "Skills, Employability and Placement Support",
          },
     ];

     return (
          <section className='relative overflow-hidden bg-black bg-[url("https://assets.prebuiltui.com/images/components/hero-section/hero-net-image.png")] bg-no-repeat bg-bottom bg-size-[100%_auto] px-4 pt-28 pb-24 md:pt-36 md:pb-32'>
               <div className="relative z-10 max-w-6xl mx-auto">
                    <div className="flex items-center gap-2 border border-white/15 rounded-full pl-2 pr-3 py-1 text-sm w-fit mx-auto">
                         <span className="flex items-center gap-1 text-violet-200 text-xs sm:text-sm">
                              <svg
                                   width="16"
                                   height="16"
                                   viewBox="0 0 16 16"
                                   fill="none"
                                   xmlns="http://www.w3.org/2000/svg"
                              >
                                   <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M5 4a.75.75 0 0 1 .738.616l.252 1.388A1.25 1.25 0 0 0 6.996 7.01l1.388.252a.75.75 0 0 1 0 1.476l-1.388.252A1.25 1.25 0 0 0 5.99 9.996l-.252 1.388a.75.75 0 0 1-1.476 0L4.01 9.996A1.25 1.25 0 0 0 3.004 8.99l-1.388-.252a.75.75 0 0 1 0-1.476l1.388-.252A1.25 1.25 0 0 0 4.01 6.004l.252-1.388A.75.75 0 0 1 5 4m7-3a.75.75 0 0 1 .721.544l.195.682c.118.415.443.74.858.858l.682.195a.75.75 0 0 1 0 1.442l-.682.195a1.25 1.25 0 0 0-.858.858l-.195.682a.75.75 0 0 1-1.442 0l-.195-.682a1.25 1.25 0 0 0-.858-.858l-.682-.195a.75.75 0 0 1 0-1.442l.682-.195a1.25 1.25 0 0 0 .858-.858l.195-.682A.75.75 0 0 1 12 1m-2 10a.75.75 0 0 1 .728.568.97.97 0 0 0 .704.704.75.75 0 0 1 0 1.456.97.97 0 0 0-.704.704.75.75 0 0 1-1.456 0 .97.97 0 0 0-.704-.704.75.75 0 0 1 0-1.456.97.97 0 0 0 .704-.704A.75.75 0 0 1 10 11"
                                        fill="#7F22FE"
                                   />
                              </svg>

                              Institute Learning Network
                         </span>

                         <span className="text-indigo-500 text-base">•</span>

                         <a
                              href="#institutes"
                              className="flex items-center gap-1 text-indigo-400 text-xs sm:text-xs"
                         >
                              Explore institutes

                              <svg
                                   className="mt-1"
                                   width="6"
                                   height="9"
                                   viewBox="0 0 6 9"
                                   fill="none"
                                   xmlns="http://www.w3.org/2000/svg"
                              >
                                   <path
                                        d="m1 1 4 3.5L1 8"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                   />
                              </svg>
                         </a>
                    </div>

                    <h1 className="text-4xl md:text-[58px]/19 text-center max-w-5xl mx-auto mt-5 text-white bg-clip-text leading-tight font-medium">
                         Discover Institutes That Prepare You for the Careers of
                         Tomorrow
                    </h1>

                    <p className="text-base md:text-lg mx-auto text-gray-400 text-center mt-5 max-w-3xl">
                         Explore trusted institutes offering programs in finance,
                         banking, fintech, technology, artificial intelligence, data,
                         management and other career-focused fields. Compare programs,
                         understand learning outcomes and choose the right institute for
                         your professional goals.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 mt-7 justify-center">
                         <a
                              href="#institutes"
                              className="bg-violet-600 hover:bg-violet-700 text-slate-100 text-xs md:text-sm px-6 py-3 rounded-full transition cursor-pointer text-center"
                         >
                              Explore Institutes
                         </a>

                         <a
                              href="/contact"
                              className="bg-white/10 hover:bg-white/20 border border-violet-900 text-gray-50 text-xs md:text-sm px-5 py-3 rounded-full transition cursor-pointer text-center"
                         >
                              Partner With Us
                         </a>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mt-14">
                         {instituteStats.map((item) => (
                              <div
                                   key={item.value}
                                   className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur px-4 py-5 text-center"
                              >
                                   <p className="text-xl md:text-2xl font-semibold text-white">
                                        {item.value}
                                   </p>

                                   <p className="text-xs md:text-sm text-white/50 mt-2 leading-relaxed">
                                        {item.label}
                                   </p>
                              </div>
                         ))}
                    </div>
               </div>
          </section>
     );
};

export default InstiHero;