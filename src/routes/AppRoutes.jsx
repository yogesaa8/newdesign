import { Route, Routes } from "react-router-dom";

/*  PUBLIC IMPORTS  */
import PublicLayout from "../features/public/layouts/PublicLayout";
import LandingHomePage from "../features/public/pages/LandingHomePage";
import CollegeMainPage from "../features/public/pages/CollegeMainPage";
import Review from "../features/public/pages/Review";
import Blog from "../features/public/pages/Blog";
import AboutUs from "../features/public/pages/AboutUs";
import ResumeLanding from "../features/public/pages/resume/ResumeLanding";

/*  JOB SEEKER IMPORTS  */
import JobsPage from "../features/seeker/pages/JobsPage";
import JobDetailsPage from "../features/seeker/pages/JobDetailsPage";
import JobSeekerLogin from "../features/seeker/pages/JobSeekerLogin";
import JobSeekerSignUp from "../features/seeker/pages/JobSeekerSignUp";
import JobSeekerResetPassword from "../features/seeker/pages/JobSeekerResetPassword";
import SeekerVerifyOtp from "../features/seeker/pages/SeekerVerifyOtp";

import DashboardLayout from "../features/seeker/layouts/DashboardLayout";
import DashboardPage from "../features/seeker/pages/DashboardPage";
import Profile from "../features/seeker/pages/Profile";
import Applications from "../features/seeker/pages/Applications";
import SavedJobs from "../features/seeker/pages/SavedJobs";
import JobAlerts from "../features/seeker/pages/JobAlerts";
import Messages from "../features/seeker/pages/Messages";
import Interviews from "../features/seeker/pages/Interviews";
import Documents from "../features/seeker/pages/Documents";
import Support from "../features/seeker/pages/Support";
import Settings from "../features/seeker/pages/Settings";

/*  COMPANY IMPORTS  */
import CompanySignupPage from "../features/company/pages/CompanySignupPage";
import CompanyLogin from "../features/company/pages/CompanyLogin";
import CompanyProfile from "../features/company/pages/CompanyProfile";
import SecuritySettings from "../features/company/pages/SecuritySettings";
import CompanyLayout from "../features/company/layouts/CompanyLayout";
import ApplicantsList from "../features/company/pages/ApplicantsList";
import JobList from "../features/company/pages/JobList";
import JobPostForm from "../features/company/pages/CreateJobListing";
import Dashboard from "../features/company/pages/Dashboard";

/*  ADMIN IMPORTS  */
import AdminDashboard from "../features/admin/pages/AdminDashboard";

const AppRoutes = () => {
  return (
    <Routes>
      {/*  PUBLIC ROUTES  */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingHomePage />} />

        {/* Header Routes */}
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/jobs/:id" element={<JobDetailsPage />} />

        {/* Static Pages */}
        <Route path="/resume" element={<ResumeLanding />} />
        <Route path="/college" element={<CollegeMainPage />} />
        <Route path="/review" element={<Review />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about-us" element={<AboutUs />} />

        {/* Company Entry (Public) */}
      </Route>

      {/*  JOB SEEKER AUTH ROUTES  */}
      <Route element={<PublicLayout />}>
        <Route path="/job-seeker-login" element={<JobSeekerLogin />} />
        <Route path="/job-seeker-signup" element={<JobSeekerSignUp />} />
        <Route
          path="/job-seeker-reset-password"
          element={<JobSeekerResetPassword />}
        />
        <Route path="/seeker-verify-otp" element={<SeekerVerifyOtp />} />
      </Route>

      {/*  JOB SEEKER DASHBOARD ROUTES  */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="profile" element={<Profile />} />
        <Route path="applications" element={<Applications />} />
        <Route path="saved" element={<SavedJobs />} />
        <Route path="alerts" element={<JobAlerts />} />
        <Route path="messages" element={<Messages />} />
        <Route path="interviews" element={<Interviews />} />
        <Route path="documents" element={<Documents />} />
        <Route path="settings" element={<Settings />} />
        <Route path="support" element={<Support />} />
      </Route>

      {/* Company Auth */}
      <Route path="/company-login" element={<CompanyLogin />} />
      <Route path="/company" element={<CompanySignupPage />} />

      {/* Company Dashboard */}
      <Route element={<CompanyLayout />}>
        <Route path="/company-dashboard" element={<Dashboard />} />
        <Route path="/company-jobs" element={<JobList />} />
        <Route path="/company-post-job" element={<JobPostForm />} />
        <Route path="/company-applicants" element={<ApplicantsList />} />
        <Route path="/company-profile" element={<CompanyProfile />} />
        <Route path="/company-security" element={<SecuritySettings />} />
      </Route>

      {/*  ADMIN ROUTES  */}
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
};

export default AppRoutes;
