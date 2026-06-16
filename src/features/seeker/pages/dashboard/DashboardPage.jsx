import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FiBriefcase,
  FiBookmark,
  FiClock,
  FiEye,
  FiArrowUpRight,
  FiArrowDownRight,
  FiExternalLink,
} from "react-icons/fi";
import {
  stats,
  applications,
  savedJobs,
  profileData,
} from "../../data/mockData";
import Breadcrumb from "../../../../components/ui/Breadcrumb";

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Breadcrumb pageName="Overview" />

      {/* Greeting */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Good Morning, Yogesh 👋</h1>
        <p className="text-[#6F6F76] mt-1">
          Track your applications, interviews and career progress.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="border border-[#EADFD9] bg-white py-6 px-7 shadow-sm hover:shadow-md transition-all"
          >
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-[8px]
              ${
                index === 0
                  ? "bg-[#FFF1E9] text-[#FF6B35]"
                  : index === 1
                    ? "bg-blue-100 text-blue-600"
                    : index === 2
                      ? "bg-purple-100 text-purple-600"
                      : "bg-green-100 text-green-600"
              }`}
            >
              {index === 0 && <FiBriefcase size={22} />}
              {index === 1 && <FiBookmark size={22} />}
              {index === 2 && <FiClock size={22} />}
              {index === 3 && <FiEye size={22} />}
            </div>

            <div className="mt-4 flex items-end justify-between">
              <div>
                <h4 className="text-2xl font-bold">{stat.value}</h4>
                <span className="text-sm text-[#6F6F76]">{stat.label}</span>
              </div>

              <span
                className={`flex items-center gap-1 text-sm font-medium ${
                  stat.change.startsWith("+")
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {stat.change}
                {stat.change.startsWith("+") ? (
                  <FiArrowUpRight size={16} />
                ) : (
                  <FiArrowDownRight size={16} />
                )}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-12 gap-6">
        {/* Left */}
        <div className="col-span-12 xl:col-span-8">
          {/* Profile Completion */}
          <div className="border border-[#EADFD9] bg-white px-6 pt-6 pb-6 shadow-sm">
            <div className="mb-6 flex justify-between items-center">
              <h4 className="text-xl font-semibold">Profile Completion</h4>
              <span className="font-medium text-[#FF6B35]">
                {profileData.completion}% Complete
              </span>
            </div>

            <div className="relative mb-6 h-4 w-full rounded-full bg-[#E6DAD2]">
              <div
                className="absolute left-0 h-full rounded-full bg-[#FF6B35]"
                style={{ width: `${profileData.completion}%` }}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="p-4 rounded bg-[#FFF7F3] border border-[#F3D3C4]">
                <p className="text-sm text-[#6F6F76]">Applications</p>
                <p className="text-lg font-bold">12 Pending</p>
              </div>

              <div className="p-4 rounded bg-blue-50 border border-blue-100">
                <p className="text-sm text-[#6F6F76]">Interviews</p>
                <p className="text-lg font-bold">2 This Week</p>
              </div>

              <div className="p-4 rounded bg-purple-50 border border-purple-100">
                <p className="text-sm text-[#6F6F76]">Messages</p>
                <p className="text-lg font-bold">5 Unread</p>
              </div>
            </div>
          </div>

          {/* Applications */}
          <div className="mt-6  border border-[#EADFD9] bg-white px-6 pt-6 pb-3 shadow-sm">
            <div className="mb-6 flex justify-between items-center">
              <h4 className="text-xl font-semibold">Recent Applications</h4>
              <button
                onClick={() => navigate("/seeker/dashboard/applications")}
                className="text-sm font-medium text-[#FF6B35] hover:underline"
              >
                View All
              </button>
            </div>

            {applications.slice(0, 4).map((app, key) => (
              <div
                key={key}
                className={`grid grid-cols-4 items-center py-4 ${
                  key !== 3 ? "border-b border-[#EFE7E1]" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={app.logo}
                    alt={app.company}
                    className="h-10 w-10 rounded-md object-cover"
                  />
                  <span className="font-medium">{app.company}</span>
                </div>

                <div>{app.jobTitle}</div>

                <div>
                  <span
                    className={`inline-flex rounded-full py-1 px-3 text-xs font-medium
                    ${
                      app.status === "Interview Scheduled"
                        ? "bg-blue-100 text-blue-700"
                        : app.status === "Shortlisted"
                          ? "bg-green-100 text-green-700"
                          : app.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {app.status}
                  </span>
                </div>

                <div className="text-[#6F6F76]">{app.date}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="col-span-12 xl:col-span-4">
          {/* Recommended Jobs */}
          <div className="border border-[#EADFD9] bg-white shadow-sm">
            <div className="border-b border-[#D8C9C0] px-6 py-4">
              <h3 className="font-semibold">Recommended Jobs</h3>
            </div>

            <div className="p-6 space-y-5">
              {savedJobs.map((job, key) => (
                <div
                  key={key}
                  className="flex items-center gap-4 border-b border-[#D8C9C0] pb-4 last:border-0 hover:bg-[#F7F5F2]  p-2 transition-all"
                >
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="h-12 w-12 rounded-md"
                  />

                  <div className="flex-1">
                    <h5 className="font-medium">{job.title}</h5>
                    <p className="text-xs text-[#6F6F76]">
                      {job.company} • {job.location}
                    </p>
                  </div>

                  <button className="text-[#FF6B35] hover:scale-110 transition">
                    <FiExternalLink size={18} />
                  </button>
                </div>
              ))}

              <button className="w-full py-3 font-bold bg-[#FF6B35] hover:bg-[#FF9566] text-white shadow-md transition-all">
                View More Jobs
              </button>
            </div>
          </div>

          {/* Activity */}
          <div className="mt-6 border border-[#EADFD9] bg-white shadow-sm">
            <div className="border-b border-[#D8C9C0] px-6 py-4">
              <h3 className="font-semibold">Recent Activity</h3>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex gap-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF1E9] text-[#FF6B35]">
                  <FiBriefcase size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium">Applied to Google</p>
                  <p className="text-xs text-[#6F6F76]">2 hours ago</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <FiClock size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    Interview scheduled with Stripe
                  </p>
                  <p className="text-xs text-[#6F6F76]">Yesterday</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                  <FiBookmark size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    Saved Frontend role at Spotify
                  </p>
                  <p className="text-xs text-[#6F6F76]">3 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
