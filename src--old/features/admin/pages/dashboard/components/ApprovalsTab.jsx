import { pendingCompanies } from "../adminDashboardData";

const ApprovalsTab = () => {
  return (
    <div className="overflow-hidden rounded border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="whitespace-nowrap p-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                Company Name
              </th>
              <th className="whitespace-nowrap p-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                HR Contact
              </th>
              <th className="whitespace-nowrap p-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                Industry
              </th>
              <th className="whitespace-nowrap p-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                Applied On
              </th>
              <th className="whitespace-nowrap p-4 text-xs font-bold uppercase tracking-wider text-slate-400 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {pendingCompanies.map((company) => (
              <tr
                key={company.id}
                className="border-b border-slate-100 transition-colors last:border-0 hover:bg-slate-50"
              >
                <td className="p-4 text-sm font-medium text-slate-800">
                  {company.name}
                </td>
                <td className="p-4 text-sm text-slate-600">{company.hr}</td>
                <td className="p-4 text-sm text-slate-600">
                  {company.industry}
                </td>
                <td className="p-4 text-sm text-slate-500">{company.date}</td>
                <td className="p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:justify-end sm:space-x-2">
                    <button className="w-full rounded bg-orange-600 px-4 py-1.5 text-xs font-medium text-white shadow-sm transition-all hover:bg-orange-700 sm:w-auto md:text-sm">
                      Approve
                    </button>
                    <button className="w-full rounded border border-slate-200 bg-white px-4 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600 sm:w-auto md:text-sm">
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovalsTab;
