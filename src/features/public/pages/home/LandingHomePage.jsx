import React from "react";
import { NavbarDemo } from "../../components/LandingHeader";
import JobList from "../../components/JobsShowCase";
import HeroHighlightDemo from "../../components/hero-highlight-demo";
import GridBackgroundDemo from "../../components/grid-background-demo";
import FeaturesSection from "../../components/FeaturesSection";
import FAQSection from "../../components/FAQSection";
import Footer from "../../components/Footer";
import useSEO from "@/seo/useSEO";
import seoMeta from "@/data/seoMeta";
import { buildWebPage, buildFAQPage } from "@/seo/schemas";
import faqs from "@/data/faqs";

const LandingHomePage = () => {
  const meta = seoMeta["/"];
  const seoElement = useSEO({
    title: meta.title,
    description: meta.description,
    path: meta.path,
    graph: [
      buildWebPage({
        path: meta.path,
        title: meta.title,
        description: meta.description,
      }),
      buildFAQPage(faqs),
    ],
  });

  return (
    <div>
      {seoElement}
      <NavbarDemo />
      <JobList />
      <HeroHighlightDemo />
      <GridBackgroundDemo />
      <FeaturesSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default LandingHomePage;
