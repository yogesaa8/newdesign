import {
  pendingCompanies,
  recentApplications,
  statsData,
  statusColors,
} from "../adminDashboardData";
import StatsGrid from "./StatsGrid";

const OverviewTab = ({ onTabChange }) => {
  return (
    <div className="space-y-8">
      <StatsGrid stats={statsData} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="overflow-hidden rounded border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 p-4 md:p-6">
            <h3 className="text-sm font-bold text-slate-800 md:text-base">
              Pending Approvals
            </h3>
            <button
              onClick={() => onTabChange("approvals")}
              className="text-xs font-medium text-orange-600 transition-colors hover:underline md:text-sm"
            >
              View All
            </button>
          </div>
          <div className="divide-y divide-slate-100">
            {pendingCompanies.map((company) => (
              <div
                key={company.id}
                className="flex flex-col gap-2 p-4 transition-colors hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
              >
                <div className="min-w-0">
                  <p className="truncate font-semibold text-slate-800 text-sm">
                    {company.name}
                  </p>
                  <p className="truncate text-xs text-slate-500 md:text-sm">
                    {company.industry} • {company.hr}
                  </p>
                </div>
                <button className="w-full rounded bg-orange-50 px-3 py-1.5 text-center text-xs font-medium text-orange-600 transition-colors hover:bg-orange-100 sm:w-auto sm:text-sm">
                  Review
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-4 md:p-6">
            <h3 className="text-sm font-bold text-slate-800 md:text-base">
              Recent Applications
            </h3>
          </div>
          <div className="divide-y divide-slate-100">
            {recentApplications.map((app) => (
              <div
                key={app.id}
                className="flex flex-col gap-2 p-4 transition-colors hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
              >
                <div className="min-w-0">
                  <p className="truncate font-semibold text-slate-800 text-sm">
                    {app.seeker}
                  </p>
                  <p className="truncate text-xs text-slate-500 md:text-sm">
                    applied for {app.job} at {app.company}
                  </p>
                </div>
                <span
                  className={`w-fit rounded-full px-3 py-1 text-center text-xs font-semibold ${statusColors[app.status]}`}
                >
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
