const MobileAdminNav = ({ activeTab, tabs, onTabChange }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-slate-200 bg-white px-2 py-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] md:hidden">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex flex-col items-center justify-center rounded px-3 py-1.5 transition-all ${
            activeTab === tab.id
              ? "text-orange-600"
              : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">
            {tab.icon}
          </span>
          <span className="mt-0.5 text-[10px] font-semibold leading-tight">
            {tab.label}
          </span>

          {activeTab === tab.id && (
            <div className="mt-1 h-1 w-1 rounded-full bg-orange-600"></div>
          )}
        </button>
      ))}
    </nav>
  );
};

export default MobileAdminNav;
