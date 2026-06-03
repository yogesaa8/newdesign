import { adminProfile } from "../adminDashboardData";

const profileFields = [
  ["Full Name", adminProfile.name],
  ["Email", adminProfile.email],
  ["Role", adminProfile.role],
  ["Phone", adminProfile.phone],
  ["Location", adminProfile.location],
  ["Last Login", adminProfile.lastLogin],
];

const AdminProfileTab = ({ onPasswordClick }) => {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <section className="rounded border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 border-b border-slate-100 pb-6 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-50 text-3xl font-bold text-orange-600">
            A
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-800">
              {adminProfile.name}
            </h3>
            <p className="mt-1 text-sm text-slate-500">{adminProfile.email}</p>
            <span className="mt-3 inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
              {adminProfile.role}
            </span>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {profileFields.map(([label, value]) => (
            <div key={label} className="rounded border border-slate-100 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {label}
              </p>
              <p className="mt-2 text-sm font-medium text-slate-800">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <aside className="rounded border border-slate-200 bg-white p-6 shadow-sm">
        <h4 className="text-lg font-bold text-slate-800">Account Security</h4>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Keep your admin credentials updated and rotate your password
          regularly for better platform security.
        </p>
        <button
          onClick={onPasswordClick}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded bg-orange-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-700"
        >
          <span className="material-symbols-outlined text-[18px]">lock</span>
          Change Password
        </button>
      </aside>
    </div>
  );
};

export default AdminProfileTab;
