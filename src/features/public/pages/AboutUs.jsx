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
    <div className="fji-page font-sans">
      {seoElement}
      {/* Hero */}
      <section className="pt-16 pb-12 text-center">
        <h1 className="fji-heading mb-8 text-5xl">{aboutHero.title}</h1>

        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="fji-heading text-4xl leading-tight">
              {aboutHero.heading}
            </h2>
          </div>
          <div className="">
            <p className="fji-copy">{aboutHero.body}</p>
          </div>
        </div>

        <div className="mt-12 max-w-6xl mx-auto px-6">
          <div className="h-80 rounded-[8px] border border-n-200 bg-n-50" />
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="fji-heading mb-3 text-4xl">
              {aboutHowItWorks.heading}
            </h2>
            <p className="fji-copy">{aboutHowItWorks.description}</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {aboutHowItWorks.steps.map((step, i) => (
              <div
                key={i}
                className="fji-card p-8 text-center transition hover:bg-n-50"
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="mb-2 text-xl font-semibold text-n-900">
                  {step.title}
                </h3>
                <p className="text-sm text-n-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative flex h-[420px] items-center justify-center overflow-hidden rounded-[8px] border border-n-200 bg-n-50">
            <div className="absolute inset-0" />
            <button className="z-10 flex h-20 w-20 items-center justify-center rounded-[8px] bg-white text-sk-primary transition hover:bg-sk-bg">
              <div className="ml-1 h-0 w-0 border-b-8 border-l-[18px] border-t-8 border-b-transparent border-l-sk-primary border-t-transparent" />
            </button>

            <div className="absolute bottom-0 left-0 right-0 p-10">
              <h2 className="fji-heading mb-8 text-4xl">
                {aboutVideoBullets.heading}
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {aboutVideoBullets.items.map((text, n) => (
                  <div key={n} className="flex gap-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[8px] bg-white text-sm font-bold text-co-primary">
                      {n + 1}
                    </div>
                    <div>
                      <p className="font-medium text-n-900">{text}</p>
                      <a href="#" className="mt-1 inline-block text-sm text-co-primary">
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
            <h2 className="fji-heading text-4xl">{aboutFaq.heading}</h2>
            <p className="fji-copy mt-2">{aboutFaq.subtitle}</p>
          </div>

          <div className="space-y-3">
            {aboutFaq.items.map((faq, i) => (
              <div key={i} className="fji-card overflow-hidden">
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
                  <div className="px-8 pb-8 text-sm leading-relaxed text-n-500">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* We're Only Working With The Best */}
      <section className="border-t border-n-200 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-2 gap-6">
              <div className="aspect-video rounded-[8px] border border-n-200 bg-n-50" />
              <div className="space-y-6">
                <div className="aspect-video rounded-[8px] border border-n-200 bg-n-50" />
                <div className="aspect-video rounded-[8px] border border-n-200 bg-n-50" />
              </div>
            </div>

            <div>
              <h2 className="fji-heading mb-8 text-4xl leading-tight">
                {aboutPartners.heading}
              </h2>
              <p className="fji-copy mb-12">{aboutPartners.body}</p>

              <div className="grid grid-cols-2 gap-8">
                {aboutPartners.highlights.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="text-3xl">{item.icon}</div>
                    <div>
                      <div className="font-semibold text-n-900">{item.title}</div>
                      <div className="text-sm text-n-500">{item.subtitle}</div>
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
              <h2 className="fji-heading text-4xl">{aboutNews.heading}</h2>
              <p className="fji-copy mt-2">{aboutNews.subtitle}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {aboutNews.items.map((item, i) => (
              <div key={i} className="group">
                <div className="relative mb-6 h-80 overflow-hidden rounded-[8px] border border-n-200 bg-n-50">
                  <div className="absolute left-6 top-6 rounded-[8px] bg-white px-4 py-1 text-xs text-co-primary">
                    {item.tag}
                  </div>
                </div>
                <div className="mb-2 text-sm text-n-500">{item.date}</div>
                <h3 className="text-xl font-semibold leading-tight text-n-900">
                  {item.title}
                </h3>
                <a
                  href="#"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-co-primary"
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
