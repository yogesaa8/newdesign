import {
  pendingCompanies,
  statsData,
} from "../adminDashboardData";
import StatsGrid from "./StatsGrid";

const OverviewTab = ({ onTabChange }) => {
  return (
    <div className="space-y-8">
      <StatsGrid stats={statsData} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Pending Approvals */}
        <div className="overflow-hidden rounded-xl border border-n-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-n-100 p-4 md:p-6">
            <h3 className="text-sm font-bold text-n-900 md:text-base">Pending Approvals</h3>
            <button
              onClick={() => onTabChange("companies")}
              className="text-xs font-medium text-sk-primary transition-colors hover:underline md:text-sm"
            >
              View All
            </button>
          </div>
          <div className="divide-y divide-n-100">
            {pendingCompanies.map((company) => (
              <div
                key={company.id}
                className="flex flex-col gap-2 p-4 transition-colors hover:bg-n-50 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-n-900">{company.name}</p>
                  <p className="truncate text-xs text-n-500 md:text-sm">
                    {company.industry} • {company.hr}
                  </p>
                </div>
                <button className="w-full rounded-lg bg-sk-surface px-3 py-1.5 text-center text-xs font-medium text-sk-primary transition-colors hover:bg-sk-border sm:w-auto sm:text-sm">
                  Review
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Institute Accounts */}
        <div className="overflow-hidden rounded-xl border border-n-200 bg-white shadow-sm">
          <div className="border-b border-n-100 p-4 md:p-6">
            <h3 className="text-sm font-bold text-n-900 md:text-base">Institute Flow</h3>
          </div>
          <div className="divide-y divide-n-100">
            {[
              {
                id: 1,
                title: "Create institute login",
                detail: "Add email, phone, and temporary password.",
                status: "Admin",
              },
              {
                id: 2,
                title: "Track profile completion",
                detail: "See pending and completed institute profiles.",
                status: "Live",
              },
              {
                id: 3,
                title: "Course permissions",
                detail: "Review course and applicant export flags.",
                status: "View",
              },
            ].map((app) => (
              <div
                key={app.id}
                className="flex flex-col gap-2 p-4 transition-colors hover:bg-n-50 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-n-900">{app.title}</p>
                  <p className="truncate text-xs text-n-500 md:text-sm">
                    {app.detail}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onTabChange("institutes")}
                  className="w-fit rounded-full bg-green-50 px-3 py-1 text-center text-xs font-semibold text-green-700"
                >
                  {app.status}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
