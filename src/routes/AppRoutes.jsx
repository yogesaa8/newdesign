import { Route, Routes } from "react-router-dom";
import Layout from "../landing/Layout";
import LandingHomePage from "../landing/LandingHomePage";
import JobsPage from "../components/jobSeeker/JobsPage";
import Resume from "../common/landingNavSection/Resume";
import CompanyMainPage from "../components/companySide/CompanyMainPage";
import CollegeMainPage from "../components/collegeSide/CollegeMainPage";
import Contact from "../common/landingNavSection/Contact";
import Blog from "../common/landingNavSection/Blog";
import AboutUs from "../common/landingFooter/AboutUs";
import DetailJobModal from "../components/jobSeeker/DetailJobModal";
import CompanyLogin from "../components/companySide/CompanyLogin";
import CompanyProfile from "../components/companySide/CompanyProfile";
import SecuritySettings from "../components/companySide/SecuritySettings";
import CompanySettings from "../components/companySide/CompanySettings";
import TeamManagement from "../components/companySide/TeamManagement";
import CompanyLayout from "../components/companySide/CompanyLayout";
import ApplicantsList from "../components/companySide/Applicantslist";
import CreateJobListing from "../components/companySide/CreateJobListing";
import Dashboard from "../components/companySide/Dashboard";
import JobSeekerLogin from "../components/jobSeeker/components/JobSeekerLogin";
import JobSeekerSignUp from "../components/jobSeeker/components/JobSeekerSignUp";
import JobSeekerResetPassword from "../components/jobSeeker/components/JobSeekerResetPassword";
import SeekerVerifyOtp from "../components/jobSeeker/components/SeekerVerifyOtp";
import DashboardLayout from "../components/jobSeeker/components/layout/DashboardLayout";
import DashboardData from "../components/jobSeeker/components/DashboardData";
import Profile from "../components/jobSeeker/pages/Profile";
import Applications from "../components/jobSeeker/pages/Applications";
import SavedJobs from "../components/jobSeeker/pages/SavedJobs";
import JobAlerts from "../components/jobSeeker/pages/JobAlerts";
import Messages from "../components/jobSeeker/pages/Messages";
import Interviews from "../components/jobSeeker/pages/Interviews";
import Documents from "../components/jobSeeker/pages/Documents";
import Support from "../components/jobSeeker/pages/Support";
import Settings from "../components/jobSeeker/pages/Settings";



const AppRoutes = () => {
    return (
        <Routes>

            <Route element={<Layout />}>
                <Route path="/" element={<LandingHomePage />} />

                {/* Job seeker Login */}
                <Route path="/job-seeker-login" element={<JobSeekerLogin />} />
                <Route path="/job-seeker-signup" element={<JobSeekerSignUp />} />
                <Route path="/job-seeker-reset-password" element={<JobSeekerResetPassword />} />
                <Route path="/seeker-verify-otp" element={<SeekerVerifyOtp />} />

                <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<DashboardData />} />
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
                <Route path="/company-applicants" element={<ApplicantsList />} />
                <Route path="/company-jobs" element={<CreateJobListing />} />
                <Route path="/company-dashboard" element={<Dashboard />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes