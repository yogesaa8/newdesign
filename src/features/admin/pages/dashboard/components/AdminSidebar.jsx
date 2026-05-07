const AdminSidebar = ({ activeTab, tabs, onLogout, onTabChange }) => {
  return (
    <aside className="hidden md:flex w-64 flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-100 p-6">
        <h1 className="text-2xl font-bold text-slate-800">
          JobPortal<span className="text-orange-600">.admin</span>
        </h1>
      </div>
      <nav className="flex-1 space-y-2 p-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex w-full items-center gap-3 rounded px-4 py-3 text-left text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "bg-orange-500 text-white shadow-md"
                : "text-slate-600 hover:bg-orange-50 hover:text-orange-600"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              {tab.icon}
            </span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
      <div className="space-y-3 border-t border-slate-100 p-4">
        <button
          onClick={() => onTabChange("profile")}
          className="flex w-full items-center gap-3 rounded p-2 text-left transition hover:bg-slate-50"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 font-bold text-orange-600">
            A
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">Admin User</p>
            <p className="text-xs text-slate-500">Super Admin</p>
          </div>
        </button>
        <button
          onClick={onLogout}
          className="flex w-full items-center justify-center gap-2 rounded border border-red-100 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
        >
          <span className="material-symbols-outlined text-[18px]">logout</span>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
