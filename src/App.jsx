import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LandingHomePage from "./landing/LandingHomePage";
import Resume from "./common/landingNavSection/Resume";
import CompanyMainPage from "./components/companySide/CompanyMainPage";
import CollegeMainPage from "./components/collegeSide/CollegeMainPage";
import Contact from "./common/landingNavSection/Contact";
import Blog from "./common/landingFooter/Blog";
import Layout from "./landing/Layout";
import JobsPage from "./components/jobSeeker/JobsPage";
import DetailJobModal from "./components/jobSeeker/DetailJobModal";
import AboutUs from "./common/landingFooter/AboutUs";
import CompanyLogin from "./components/companySide/CompanyLogin";

// Company Components
import CompanyLayout from "./components/companySide/CompanyLayout";
import CompanyProfile from "./components/companySide/CompanyProfile";
import CompanySettings from "./components/companySide/CompanySettings";
import SecuritySettings from "./components/companySide/SecuritySettings";
import TeamManagement from "./components/companySide/TeamManagement";
import ApplicantsList from "./components/companySide/Applicantslist";
import CreateJobListing from "./components/companySide/CreateJobListing";
import Dashboard from "./components/companySide/Dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout Wrapper for Landing Pages */}
        <Route element={<Layout />}>
          <Route path="/" element={<LandingHomePage />} />

          {/* Header Routes */}
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/company" element={<CompanyMainPage />} />
          <Route path="/college" element={<CollegeMainPage />} />
          <Route path="/contact" element={<Contact />} />

          {/* Footer Routes */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/about-us" element={<AboutUs />} />

          {/* Jobs Route */}
          <Route path="/jobs/:id" element={<DetailJobModal />} />
        </Route>

        {/* Company Login (No Layout) */}
        <Route path="/company-login" element={<CompanyLogin />} />

            {/* Company Dashboard Routes (With Sidebar + Header Layout) */}
        <Route element={<CompanyLayout />}>
          <Route path="/company-profile" element={<CompanyProfile />} />
          <Route path="/company-security" element={<SecuritySettings />} />
          <Route path="/company-settings" element={<CompanySettings />} />
          <Route path="/company-team" element={<TeamManagement />} />
          {/* Add more company routes here as you build them */}
          {/* <Route path="/company-dashboard" element={<CompanyDashboard />} /> */}
          {/* <Route path="/company-jobs" element={<CompanyJobs />} /> */}
         <Route path="/company-applicants" element={<ApplicantsList />} />
         <Route  path="/company-jobs" element={<CreateJobListing/>}/>
         <Route path="/company-dashboard" element={<Dashboard/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;