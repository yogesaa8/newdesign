const AdminHeader = ({ activeTab }) => {
  const title =
    activeTab === "overview"
      ? "Dashboard Overview"
      : activeTab.charAt(0).toUpperCase() + activeTab.slice(1);

  return (
    <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 md:text-3xl">
          {title}
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Welcome back! Here&apos;s what&apos;s happening today.
        </p>
      </div>
      <div className="relative flex w-full max-w-xs items-center rounded border border-slate-200 bg-white px-4 py-2.5 shadow-sm focus-within:border-orange-400 focus-within:ring-1 focus-within:ring-orange-400">
        <span className="material-symbols-outlined mr-2 text-lg text-slate-400">
          search
        </span>
        <input
          type="text"
          placeholder="Search anything..."
          className="w-full outline-none text-sm text-slate-700"
        />
      </div>
    </div>
  );
};

export default AdminHeader;
