import React, { useState } from "react";
import faqs from "@/data/faqs";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="py-24 px-4 relative bg-[#0a0a0a] overflow-hidden">
      {/* Background Glow Orbs */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-zinc-400 text-lg max-w-xl mx-auto">
            Real answers from the FirstJobIndia team about your first
            application, your first interview, and your first offer.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* LEFT SIDE - ACCORDION */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`rounded border p-5 cursor-pointer transition-all duration-300 backdrop-blur-sm ${
                  activeIndex === index
                    ? "bg-zinc-900/60 border-purple-500/50 shadow-[0_0_30px_-10px_rgba(168,85,247,0.4)]"
                    : "bg-zinc-900/30 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50"
                }`}
                onClick={() => toggleAccordion(index)}
              >
                <div className="flex justify-between items-center gap-4">
                  <h3
                    className={`font-medium transition-colors duration-300 ${
                      activeIndex === index
                        ? "text-purple-300"
                        : "text-zinc-200"
                    }`}
                  >
                    {faq.question}
                  </h3>

                  {/* Animated Plus/Minus Icon */}
                  <span
                    className={`text-2xl text-zinc-500 font-light transition-transform duration-300 flex-shrink-0 ${
                      activeIndex === index ? "rotate-45 text-purple-400" : ""
                    }`}
                  >
                    +
                  </span>
                </div>

                {/* Answer with smooth height transition */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    activeIndex === index
                      ? "max-h-40 mt-4 opacity-100"
                      : "max-h-0 mt-0 opacity-0"
                  }`}
                >
                  <p className="text-sm text-zinc-400 leading-relaxed border-t border-zinc-800 pt-4">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE - CONTACT FORM */}
          <div className="rounded border border-zinc-800 bg-zinc-900/40 backdrop-blur-md p-8 shadow-xl">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white">
                Cannot find your answer? Ask us.
              </h3>
              <p className="text-sm text-zinc-400 mt-2">
                Tell us where you are stuck and someone from our team will reply
                within one working day.
              </p>
            </div>

            <div className="space-y-5">
              <input
                type="text"
                placeholder="Your name"
                className="w-full bg-zinc-900/60 border border-zinc-800 rounded px-4 py-3 outline-none text-white placeholder-zinc-600 focus:border-purple-500 focus:shadow-[0_0_15px_-5px_rgba(168,85,247,0.3)] transition-all duration-300"
              />

              <input
                type="email"
                placeholder="you@example.com"
                className="w-full bg-zinc-900/60 border border-zinc-800 rounded px-4 py-3 outline-none text-white placeholder-zinc-600 focus:border-purple-500 focus:shadow-[0_0_15px_-5px_rgba(168,85,247,0.3)] transition-all duration-300"
              />

              <textarea
                placeholder="Describe your question..."
                rows={4}
                className="w-full bg-zinc-900/60 border border-zinc-800 rounded px-4 py-3 outline-none text-white placeholder-zinc-600 focus:border-purple-500 focus:shadow-[0_0_15px_-5px_rgba(168,85,247,0.3)] transition-all duration-300 resize-none"
              ></textarea>

              <button className="w-full py-3 rounded text-white font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.5)] active:scale-[0.98]">
                Send my question
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
