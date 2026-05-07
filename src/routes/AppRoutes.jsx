// route.jsx
import { Navigate, Route, Routes } from "react-router-dom";

/* PUBLIC IMPORTS */
import PublicLayout from "../features/public/layouts/PublicLayout";
import LandingHomePage from "../features/public/pages/home/LandingHomePage";
import CollegeMainPage from "../features/public/pages/college/CollegeMainPage";
import Review from "../features/public/pages/reviews/Review";
import Blog from "../features/public/pages/blog/Blog";
import AboutUs from "../features/public/pages/about/AboutUs";
import ResumeLanding from "../features/public/pages/resume/ResumeLanding";
import PrivacyPolicy from "../features/public/pages/legal/PrivacyPolicy";
import TermsConditions from "../features/public/pages/legal/TermsConditions";

/* JOB SEEKER IMPORTS */
import JobsPage from "../features/seeker/pages/jobs/JobsPage";
import JobDetailsPage from "../features/seeker/pages/jobs/JobDetailsPage";
import JobSeekerLogin from "../features/seeker/pages/auth/JobSeekerLogin";
import JobSeekerSignUp from "../features/seeker/pages/auth/JobSeekerSignUp";
import JobSeekerResetPassword from "../features/seeker/pages/auth/JobSeekerResetPassword";
import SeekerVerifyOtp from "../features/seeker/pages/auth/SeekerVerifyOtp";

import DashboardLayout from "../features/seeker/layouts/DashboardLayout";
import DashboardPage from "../features/seeker/pages/dashboard/DashboardPage";
import Profile from "../features/seeker/pages/dashboard/Profile";
import Applications from "../features/seeker/pages/dashboard/Applications";
import SavedJobs from "../features/seeker/pages/dashboard/SavedJobs";
import JobAlerts from "../features/seeker/pages/dashboard/JobAlerts";
import Messages from "../features/seeker/pages/dashboard/Messages";
import Interviews from "../features/seeker/pages/dashboard/Interviews";
import Documents from "../features/seeker/pages/dashboard/Documents";
import Support from "../features/seeker/pages/dashboard/Support";
import Settings from "../features/seeker/pages/dashboard/Settings";

/* COMPANY IMPORTS */
import CompanySignupPage from "../features/company/pages/auth/CompanySignupPage";
import CompanyLogin from "../features/company/pages/auth/CompanyLogin";
import CompanyProfile from "../features/company/pages/dashboard/CompanyProfile";
import SecuritySettings from "../features/company/pages/dashboard/SecuritySettings";
import CompanyLayout from "../features/company/layouts/CompanyLayout";
import ApplicantsList from "../features/company/pages/dashboard/ApplicantsList";
import JobList from "../features/company/pages/dashboard/JobList";
import JobPostForm from "../features/company/pages/dashboard/CreateJobListing";
import Dashboard from "../features/company/pages/dashboard/Dashboard";

/* ADMIN IMPORTS */
import AdminDashboard from "../features/admin/pages/dashboard/AdminDashboard";
import AdminLogin from "../features/admin/pages/auth/AdminLogin";
import CareerGPS from "../features/public/pages/career/CareerGPS";
import UnderDevelopment from "../components/ui/UnderDevelopment";
import SeekerProtectedRoute from "./SeekerProtectedRoute";
import CompanyProtectedRoute from "./CompanyProtectedRoute";
import AdminProtectedRoute from "./AdminProtectedRoute";
import CompanyForgotPassword from "../features/company/pages/auth/CompanyForgotPassword";

const AppRoutes = () => {
  return (
    <Routes>
      {/* PUBLIC ROUTES (Koi bhi dekh sakta hai) */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingHomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/jobs/:jobId" element={<JobDetailsPage />} />
        <Route path="/resume" element={<ResumeLanding />} />
        <Route path="/college" element={<CollegeMainPage />} />
        <Route path="/reviews" element={<Review />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/career-gps" element={<CareerGPS />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/terms-condition" element={<TermsConditions />} />
      </Route>

      {/* AUTH ROUTES (Form pages) */}
      <Route element={<PublicLayout />}>
        <Route path="/job-seeker/login" element={<JobSeekerLogin />} />
        <Route path="/job-seeker/signup" element={<JobSeekerSignUp />} />
        <Route
          path="/job-seeker/reset-password"
          element={<JobSeekerResetPassword />}
        />
        <Route path="/job-seeker/verify-otp" element={<SeekerVerifyOtp />} />

        <Route path="/company/login" element={<CompanyLogin />} />
        <Route path="/company/signup" element={<CompanySignupPage />} />
        <Route
          path="/company/reset-password"
          element={<CompanyForgotPassword />}
        />
        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />
      </Route>



      {/* JOB SEEKER DASHBOARD */}
      <Route
        path="/job-seeker"
        element={<Navigate to="/job-seeker/dashboard" replace />}
      />
      <Route
        path="/job-seeker/dashboard"
        element={
          <SeekerProtectedRoute>
            <DashboardLayout />
          </SeekerProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="profile" element={<Profile />} />
        <Route path="applications" element={<Applications />} />
        <Route path="saved-jobs" element={<SavedJobs />} />
        <Route path="job-alerts" element={<JobAlerts />} />
        <Route path="messages" element={<Messages />} />
        <Route path="interviews" element={<Interviews />} />
        <Route path="documents" element={<Documents />} />
        <Route path="support" element={<Support />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* COMPANY DASHBOARD */}
      <Route
        path="/company"
        element={
          <CompanyProtectedRoute>
            <CompanyLayout />
          </CompanyProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/company/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="jobs" element={<JobList />} />
        <Route path="jobs/new" element={<JobPostForm />} />
        <Route path="applicants" element={<ApplicantsList />} />
        <Route
          path="applicants/:applicantId/resume"
          element={<UnderDevelopment title="Resume Preview" icon="visibility" />}
        />
        <Route path="profile" element={<CompanyProfile />} />
        <Route
          path="settings"
          element={<Navigate to="/company/settings/security" replace />}
        />
        <Route path="settings/security" element={<SecuritySettings />} />
      </Route>

      {/* ADMIN DASHBOARD */}
      <Route
        path="/admin"
        element={<Navigate to="/admin/dashboard" replace />}
      />
      <Route
        path="/admin/dashboard"
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        } 
      />
    </Routes>
  );
};

export default AppRoutes;
