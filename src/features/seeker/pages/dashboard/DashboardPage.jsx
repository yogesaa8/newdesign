import { useNavigate } from "react-router-dom";
import {
  FiBriefcase,
  FiBookmark,
  FiEye,
  FiTrendingUp,
  FiExternalLink,
  FiStar,
} from "react-icons/fi";
import {
  stats,
  applications,
  savedJobs,
  profileData,
} from "../../data/mockData";
import { StatCard } from "@/components/ui/StatCard";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";

const PROFILE_STRENGTH = profileData.completion ?? 85;

const statAccents = ["sk-primary", "info", "warning", "success"];
const statIcons = [
  <FiBriefcase key="briefcase" size={18} />,
  <FiBookmark key="bookmark" size={18} />,
  <FiTrendingUp key="trend" size={18} />,
  <FiEye key="eye" size={18} />,
];

const statusMap = {
  "Interview Scheduled": "info",
  Shortlisted: "success",
  Rejected: "error",
  Applied: "applied",
  Pending: "warning",
};

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="bg-white border border-sk-border rounded-2xl p-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-n-900">
            Good morning, {profileData.name.split(" ")[0]} 👋
          </h1>
          <p className="text-sm text-n-500 mt-0.5">
            Track your applications, interviews and career progress.
          </p>
        </div>
        <button
          onClick={() => navigate("/seeker/dashboard/profile")}
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg border border-sk-border text-sk-primary text-sm font-semibold hover:bg-sk-surface transition"
        >
          Improve Profile →
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            trend={stat.change !== "0%" ? stat.change : undefined}
            trendUp={stat.change.startsWith("+")}
            accentColor={statAccents[i]}
            icon={statIcons[i]}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left column (2/3) */}
        <div className="xl:col-span-2 space-y-6">
          {/* Profile completion */}
          <div className="bg-white border border-n-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-n-900">Profile Completion</h2>
              <span className="text-sm font-semibold text-sk-primary">{PROFILE_STRENGTH}%</span>
            </div>
            <div className="h-2 bg-n-200 rounded-full overflow-hidden mb-5">
              <div
                className="h-full bg-sk-primary rounded-full transition-all"
                style={{ width: `${PROFILE_STRENGTH}%` }}
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Applications", value: "12 Pending", color: "bg-sk-surface border-sk-border text-sk-primary" },
                { label: "Interviews", value: "2 This Week", color: "bg-info-bg border-info/20 text-info" },
                { label: "Messages", value: "5 Unread", color: "bg-co-surface border-co-border text-co-primary" },
              ].map(({ label, value, color }) => (
                <div key={label} className={`rounded-xl border p-3 ${color}`}>
                  <p className="text-xs opacity-70">{label}</p>
                  <p className="text-sm font-bold mt-0.5">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent applications */}
          <div className="bg-white border border-n-200 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-n-100">
              <h2 className="text-base font-semibold text-n-900">Recent Applications</h2>
              <button
                onClick={() => navigate("/seeker/dashboard/applications")}
                className="text-sm font-semibold text-sk-primary hover:underline"
              >
                View All →
              </button>
            </div>

            {applications.length === 0 ? (
              <div className="p-6">
                <EmptyState
                  icon="📄"
                  title="No applications yet"
                  description="Browse jobs and start applying."
                  actionLabel="Browse Jobs"
                  onAction={() => navigate("/jobs")}
                />
              </div>
            ) : (
              <div>
                {applications.slice(0, 4).map((app, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-4 px-6 py-4 ${i < 3 ? "border-b border-n-100" : ""}`}
                  >
                    <img
                      src={app.logo}
                      alt={app.company}
                      className="h-10 w-10 rounded-lg object-cover shrink-0 border border-n-100"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-n-900 text-sm truncate">{app.jobTitle}</p>
                      <p className="text-xs text-n-500 truncate">{app.company}</p>
                    </div>
                    <Badge status={statusMap[app.status] || "neutral"}>
                      {app.status}
                    </Badge>
                    <span className="text-xs text-n-400 shrink-0 hidden sm:block">{app.date}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* AI Job Match — upgrade gate */}
          <div className="bg-white border border-n-200 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-n-100">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold text-n-900">AI Job Matches</h2>
                <Badge status="prime">Prime</Badge>
              </div>
              <FiStar className="text-sk-primary" size={16} />
            </div>
            <div className="relative p-6">
              {/* Blurred mock cards */}
              <div className="space-y-3 select-none pointer-events-none blur-sm" aria-hidden>
                {[
                  { title: "Frontend Developer", company: "Razorpay", match: "94%" },
                  { title: "React Engineer", company: "Zepto", match: "89%" },
                  { title: "UI Developer", company: "CRED", match: "82%" },
                ].map((job) => (
                  <div key={job.title} className="flex items-center gap-4 p-3 border border-n-200 rounded-lg">
                    <div className="w-10 h-10 rounded-lg bg-n-100" />
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-n-900">{job.title}</p>
                      <p className="text-xs text-n-500">{job.company}</p>
                    </div>
                    <span className="text-xs font-bold text-co-primary bg-co-surface px-2 py-0.5 rounded-full">
                      {job.match} match
                    </span>
                  </div>
                ))}
              </div>
              {/* Upgrade overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-[2px] rounded-xl">
                <p className="text-n-700 font-semibold text-sm text-center px-4">
                  Upgrade to Prime to see your AI Match Scores
                </p>
                <button
                  onClick={() => navigate("/pricing")}
                  className="mt-3 px-4 py-2 rounded-lg bg-sk-primary text-white text-sm font-semibold hover:bg-sk-hover transition"
                >
                  See Prime Plans →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right column (1/3) */}
        <div className="space-y-6">
          {/* Recommended jobs */}
          <div className="bg-white border border-n-200 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-n-100">
              <h2 className="text-base font-semibold text-n-900">Recommended Jobs</h2>
            </div>
            <div className="p-4 space-y-1">
              {savedJobs.slice(0, 5).map((job, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-n-50 transition group cursor-pointer"
                  onClick={() => navigate("/jobs")}
                >
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="h-10 w-10 rounded-lg object-cover border border-n-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-n-900 truncate">{job.title}</p>
                    <p className="text-xs text-n-500 truncate">{job.company} · {job.location}</p>
                  </div>
                  <FiExternalLink size={15} className="text-n-400 group-hover:text-sk-primary transition shrink-0" />
                </div>
              ))}
            </div>
            <div className="px-4 pb-4">
              <button
                onClick={() => navigate("/jobs")}
                className="w-full py-2.5 rounded-lg bg-sk-primary hover:bg-sk-hover text-white text-sm font-semibold transition"
              >
                View More Jobs
              </button>
            </div>
          </div>

          {/* Recent activity */}
          <div className="bg-white border border-n-200 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-n-100">
              <h2 className="text-base font-semibold text-n-900">Recent Activity</h2>
            </div>
            <div className="p-5 space-y-4">
              {[
                { icon: <FiBriefcase size={16} />, text: "Applied to Google", time: "2 hours ago", color: "bg-sk-surface text-sk-primary" },
                { icon: <FiTrendingUp size={16} />, text: "Interview scheduled with Stripe", time: "Yesterday", color: "bg-info-bg text-info" },
                { icon: <FiBookmark size={16} />, text: "Saved Frontend role at Spotify", time: "3 days ago", color: "bg-co-surface text-co-primary" },
              ].map(({ icon, text, time, color }) => (
                <div key={text} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${color}`}>
                    {icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-n-900">{text}</p>
                    <p className="text-xs text-n-400 mt-0.5">{time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
