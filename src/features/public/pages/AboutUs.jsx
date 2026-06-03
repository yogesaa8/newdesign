import React, { useState } from "react";
import useSEO from "@/seo/useSEO";
import seoMeta from "@/data/seoMeta";
import {
  buildWebPage,
  buildBreadcrumbList,
  buildAboutPage,
  buildFAQPage,
} from "@/seo/schemas";
import {
  aboutHero,
  aboutHowItWorks,
  aboutVideoBullets,
  aboutFaq,
  aboutPartners,
  aboutNews,
} from "@/data/aboutUsCopy";

const AboutUs = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const meta = seoMeta["/about-us"];
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "About Us", path: meta.path },
  ];
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
      buildBreadcrumbList(breadcrumbs, meta.path),
      buildAboutPage({
        path: meta.path,
        title: meta.title,
        description: meta.description,
      }),
      buildFAQPage(aboutFaq.items),
    ],
  });

  return (
    <div className="min-h-screen font-sans">
      {seoElement}
      {/* Hero */}
      <section className="pt-16 pb-12 text-center">
        <h1 className="text-5xl font-bold mb-8">{aboutHero.title}</h1>

        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-semibold leading-tight">
              {aboutHero.heading}
            </h2>
          </div>
          <div className="">
            <p>{aboutHero.body}</p>
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
            <h2 className="text-4xl font-semibold mb-3">
              {aboutHowItWorks.heading}
            </h2>
            <p className="">{aboutHowItWorks.description}</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {aboutHowItWorks.steps.map((step, i) => (
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
                {aboutVideoBullets.heading}
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {aboutVideoBullets.items.map((text, n) => (
                  <div key={n} className="flex gap-4">
                    <div className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0 text-sm font-bold">
                      {n + 1}
                    </div>
                    <div>
                      <p className="font-medium">{text}</p>
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
            <h2 className="text-4xl font-semibold">{aboutFaq.heading}</h2>
            <p className="mt-2">{aboutFaq.subtitle}</p>
          </div>

          <div className="space-y-3">
            {aboutFaq.items.map((faq, i) => (
              <div key={i} className="border rounded-2xl overflow-hidden">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full px-8 py-6 flex justify-between items-center text-left"
                >
                  <span className="font-medium">
                    {`0${i + 1}`} {faq.question}
                  </span>
                  <span className="text-2xl">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <div className="px-8 pb-8 text-sm leading-relaxed">
                    {faq.answer}
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
                {aboutPartners.heading}
              </h2>
              <p className="mb-12">{aboutPartners.body}</p>

              <div className="grid grid-cols-2 gap-8">
                {aboutPartners.highlights.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="text-3xl">{item.icon}</div>
                    <div>
                      <div className="font-semibold">{item.title}</div>
                      <div className="text-sm">{item.subtitle}</div>
                    </div>
                  </div>
                ))}
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
              <h2 className="text-4xl font-semibold">{aboutNews.heading}</h2>
              <p className="mt-2">{aboutNews.subtitle}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {aboutNews.items.map((item, i) => (
              <div key={i} className="group">
                <div className="h-80 rounded-3xl mb-6 relative overflow-hidden">
                  <div className="absolute top-6 left-6 text-xs px-4 py-1 rounded">
                    {item.tag}
                  </div>
                </div>
                <div className="text-sm mb-2">{item.date}</div>
                <h3 className="text-xl font-semibold leading-tight">
                  {item.title}
                </h3>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 mt-4 text-sm font-medium"
                >
                  Read more →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
