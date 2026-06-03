import React, { useState } from "react";

const AboutUs = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };
  return (
    <div className="min-h-screen font-sans">
      {/* Hero */}
      <section className="pt-16 pb-12 text-center">
        <h1 className="text-5xl font-bold mb-8">About Us</h1>

        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-semibold leading-tight">
              Et nunc ut tempus duis nisl sed massa
            </h2>
          </div>
          <div className="">
            <p>
              Nunc sed a nisl purus. Nibh dis faucibus proin tristique. Sit cong
              non vitae odio sit est in. Felis eu ultrices a sed massa. Commodo
              fringilla sed tempor risus laoreet ultrices ipsum. Habitasse morbi
              faucibus in iaculis lectus. Nisi enim feugiat enim volutpat. Sem
              quis viverra odio mauris nunc.
            </p>
          </div>
        </div>

        <div className="mt-12 max-w-6xl mx-auto px-6">
          <div className="h-80 rounded-2xl" />
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-semibold mb-3">How it works</h2>
            <p className="">
              At eu lobortis pretium tincidunt amet lacus ut aenean aliquet.
              Blandit a massa elementum id scelerisque rhoncus.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                icon: "👤",
                title: "Create Account",
                desc: "Nunc sed a nisl purus. Nibh dis faucibus proin lacus",
              },
              {
                icon: "📄",
                title: "Upload Resume",
                desc: "Felis eu ultrices a sed massa. Commodo fringilla sed tempor",
              },
              {
                icon: "💼",
                title: "Find Jobs",
                desc: "Commodo fringilla sed tempor risus laoreet ultrices ipsum",
              },
              {
                icon: "✅",
                title: "Apply Job",
                desc: "Nisi enim feugiat enim volutpat. Sem quis viverra",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="border rounded-2xl p-8 text-center hover:shadow-md transition"
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="font-semibold text-xl mb-2">{step.title}</h3>
                <p className="text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative h-[420px] rounded-3xl flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0" />
            <button className="w-20 h-20 rounded-full flex items-center justify-center z-10 hover:scale-110 transition">
              <div className="w-0 h-0 border-t-8 border-l-[18px] border-b-8 ml-1" />
            </button>

            <div className="absolute bottom-0 left-0 right-0 p-10">
              <h2 className="text-4xl font-bold mb-8">
                Good Life Begins With A Good Company
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="flex gap-4">
                    <div className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0 text-sm font-bold">
                      {n}
                    </div>
                    <div>
                      <p className="font-medium">
                        Elit gravida lorem amet porta risus vitae at
                      </p>
                      <a href="#" className="text-sm mt-1 inline-block">
                        Learn more →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-semibold">
              Frequently Asked Questions
            </h2>
            <p className="mt-2">
              At eu lobortis pretium tincidunt amet lacus ut aenean aliquet
            </p>
          </div>

          <div className="space-y-3">
            {[
              "Can I upload a CV?",
              "How long will the recruitment process take?",
              "Do you recruit for Graduates, Apprentices and Students?",
              "What does the recruitment and selection process involve?",
              "Can I receive notifications for any future jobs that may interest me?",
            ].map((q, i) => (
              <div key={i} className="border rounded-2xl overflow-hidden">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full px-8 py-6 flex justify-between items-center text-left"
                >
                  <span className="font-medium">
                    {`0${i + 1}`} {q}
                  </span>
                  <span className="text-2xl">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <div className="px-8 pb-8 text-sm leading-relaxed">
                    Nunc sed a nisl purus. Nibh dis faucibus proin tristique.
                    Sit cong non vitae odio sit est in. Felis eu ultrices a sed
                    massa. Commodo fringilla sed tempor risus laoreet ultrices
                    ipsum.
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* We're Only Working With The Best */}
      <section className="py-20 border-t">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-2 gap-6">
              <div className="aspect-video rounded-2xl" />
              <div className="space-y-6">
                <div className="aspect-video rounded-2xl" />
                <div className="aspect-video rounded-2xl" />
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-bold leading-tight mb-8">
                We’re Only Working With The Best
              </h2>
              <p className="mb-12">
                Ultrices purus dolor viverra mi laoreet at cursus justo.
                Ultrices purus diam egestas amet faucibus tempor blandit.
              </p>

              <div className="grid grid-cols-2 gap-8">
                <div className="flex gap-4">
                  <div className="text-3xl">😊</div>
                  <div>
                    <div className="font-semibold">Quality Job</div>
                    <div className="text-sm">Top Companies</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-3xl">📝</div>
                  <div>
                    <div className="font-semibold">Resume builder</div>
                    <div className="text-sm">Top Talents</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News and Blog */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-semibold">News and Blog</h2>
              <p className="mt-2">
                Metus faucibus sed turpis lectus feugiat tincidunt. Rhoncus sed
                tristique in dolor
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="group">
              <div className="h-80 rounded-3xl mb-6 relative overflow-hidden">
                <div className="absolute top-6 left-6 text-xs px-4 py-1 rounded">
                  News
                </div>
              </div>
              <div className="text-sm mb-2">30 March 2024</div>
              <h3 className="text-xl font-semibold leading-tight">
                Revitalizing Workplace Morale: Innovative Tactics For Boosting
                Employee Engagement In 2024
              </h3>
              <a
                href="#"
                className="inline-flex items-center gap-2 mt-4 text-sm font-medium"
              >
                Read more →
              </a>
            </div>

            <div className="group">
              <div className="h-80 rounded-3xl mb-6 relative overflow-hidden">
                <div className="absolute top-6 left-6 text-xs px-4 py-1 rounded">
                  Blog
                </div>
              </div>
              <div className="text-sm mb-2">30 March 2024</div>
              <h3 className="text-xl font-semibold leading-tight">
                How To Avoid The Top Six Most Common Job Interview Mistakes
              </h3>
              <a
                href="#"
                className="inline-flex items-center gap-2 mt-4 text-sm font-medium"
              >
                Read more →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
