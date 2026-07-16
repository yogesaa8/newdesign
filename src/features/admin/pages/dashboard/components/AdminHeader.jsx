const AdminHeader = ({ activeTab }) => {
  const title =
    activeTab === "overview"
      ? "Dashboard Overview"
      : activeTab.charAt(0).toUpperCase() + activeTab.slice(1);

  return (
    <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-sk-primary">Admin</p>
        <h2 className="mt-1 text-2xl font-bold text-n-900 md:text-3xl">{title}</h2>
        <p className="mt-1 text-sm text-n-500">
          Welcome back! Here&apos;s what&apos;s happening today.
        </p>
      </div>
      <div className="relative flex w-full max-w-xs items-center rounded-lg border border-n-200 bg-white px-4 py-2.5 shadow-sm focus-within:border-sk-primary focus-within:ring-2 focus-within:ring-sk-primary/10">
        <span className="material-symbols-outlined mr-2 text-lg text-n-400">search</span>
        <input
          type="text"
          placeholder="Search anything..."
          className="w-full text-sm text-n-900 outline-none"
        />
      </div>
    </div>
  );
};

export default AdminHeader;
