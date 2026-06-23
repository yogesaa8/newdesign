import React from "react";
import BackgroundLinesDemo from "../components/background-lines-demo";
import JobList from "../components/JobsShowCase";
import HeroHighlightDemo from "../components/hero-highlight-demo";
import GridBackgroundDemo from "../components/grid-background-demo";
import FeaturesSection from "../components/FeaturesSection";
import FAQSection from "../components/FAQSection";
import Footer from "../components/Footer";

const LandingHomePage = () => {
  return (
    <div>
      <BackgroundLinesDemo />
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
