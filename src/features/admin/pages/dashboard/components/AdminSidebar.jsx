const AdminSidebar = ({ activeTab, tabs, onLogout, onTabChange }) => {
  return (
    <aside className="hidden md:flex w-64 flex-col border-r border-white/10 bg-n-900">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-white/10 px-6 py-5">
        <img
          src="/images/logos/fji_orange.png"
          alt="FirstJobIndia"
          className="h-8 w-8 object-contain"
        />
        <h1 className="text-base font-extrabold tracking-tight text-white">
          First<span className="text-sk-primary">Job</span>India
          <span className="ml-1 text-xs font-semibold text-n-400">.admin</span>
        </h1>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-0.5 px-2 py-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition-colors ${
              activeTab === tab.id
                ? "bg-sk-primary text-white"
                : "text-n-500 hover:bg-white/5 hover:text-white"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              {tab.icon}
            </span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 px-2 py-4 space-y-2">
        <button
          onClick={() => onTabChange("profile")}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition hover:bg-white/5"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sk-surface text-sm font-bold text-sk-primary">
            A
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Admin User</p>
            <p className="text-xs text-n-400">Super Admin</p>
          </div>
        </button>
        <button
          onClick={onLogout}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-red-400 transition hover:bg-white/5 hover:text-red-300"
        >
          <span className="material-symbols-outlined text-[18px]">logout</span>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
