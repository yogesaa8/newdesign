import { adminProfile } from "../adminDashboardData";
import AdminPasswordTab from "./AdminPasswordTab";

const profileFields = [
  ["Full Name", adminProfile.name],
  ["Email", adminProfile.email],
  ["Role", adminProfile.role],
  ["Phone", adminProfile.phone],
  ["Location", adminProfile.location],
  ["Last Login", adminProfile.lastLogin],
];

const AdminProfileTab = () => {
  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
      <section className="rounded-xl border border-n-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 border-b border-n-100 pb-6 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-sk-surface text-3xl font-bold text-sk-primary">
            A
          </div>
          <div>
            <h3 className="text-2xl font-bold text-n-900">{adminProfile.name}</h3>
            <p className="mt-1 text-sm text-n-500">{adminProfile.email}</p>
            <span className="mt-3 inline-flex rounded-full bg-sk-surface px-3 py-1 text-xs font-semibold text-sk-primary">
              {adminProfile.role}
            </span>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {profileFields.map(([label, value]) => (
            <div key={label} className="rounded-lg border border-n-100 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-n-400">{label}</p>
              <p className="mt-2 text-sm font-medium text-n-900">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <aside className="rounded-xl border border-n-200 bg-white p-6 shadow-sm">
        <AdminPasswordTab embedded />
      </aside>
    </div>
  );
};

export default AdminProfileTab;
