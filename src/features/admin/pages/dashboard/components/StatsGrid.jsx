const StatsGrid = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-6">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="group rounded border border-slate-200 bg-white p-4 md:p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500 md:text-sm">
                {stat.title}
              </p>
              <h3 className="mt-1 text-xl font-bold text-slate-800 md:text-2xl">
                {stat.value}
              </h3>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-orange-600 transition-colors group-hover:bg-orange-100 md:h-14 md:w-14">
              <span className="material-symbols-outlined text-xl md:text-2xl">
                {stat.icon}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
