import React from "react";
import { NavbarDemo } from "../common/Header";
import JobList from "../components/landingpage/JobsShowCase";
import HeroHighlightDemo from "../components/landingpage/hero-highlight-demo";
import GridBackgroundDemo from "../components/landingpage/grid-background-demo";
import FeaturesSection from "../components/landingpage/FeaturesSection";
import FAQSection from "../components/landingpage/FAQSection";
import Footer from "../common/Footer";

const LandingHomePage = () => {
  return (
    <div>
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
