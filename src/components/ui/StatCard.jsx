import { cn } from "@/lib/utils";

const accentStyles = {
  "sk-primary": {
    border: "border-l-sk-primary",
    iconBg: "bg-sk-primary/10",
    iconText: "text-sk-primary",
  },
  "co-primary": {
    border: "border-l-co-primary",
    iconBg: "bg-co-primary/10",
    iconText: "text-co-primary",
  },
  success: {
    border: "border-l-success",
    iconBg: "bg-success-bg",
    iconText: "text-success",
  },
  warning: {
    border: "border-l-warning",
    iconBg: "bg-warning-bg",
    iconText: "text-warning",
  },
  error: {
    border: "border-l-error",
    iconBg: "bg-error-bg",
    iconText: "text-error",
  },
  info: {
    border: "border-l-info",
    iconBg: "bg-info-bg",
    iconText: "text-info",
  },
};

export function StatCard({
  label,
  value,
  trend,
  trendUp,
  accentColor = "sk-primary",
  icon,
  loading = false,
  className,
}) {
  const accent = accentStyles[accentColor] || accentStyles["sk-primary"];

  return (
    <div
      className={cn(
        "bg-white border border-n-200 rounded-xl p-5 border-l-4",
        accent.border,
        className
      )}
    >
      {icon && (
        <div
          className={cn(
            "w-9 h-9 rounded-lg flex items-center justify-center mb-3 text-lg",
            accent.iconBg,
            accent.iconText
          )}
        >
          {icon}
        </div>
      )}
      <p className="text-n-400 text-xs font-medium uppercase tracking-wider">
        {label}
      </p>
      {loading ? (
        <div className="mt-1 h-8 w-16 animate-pulse rounded bg-n-200" />
      ) : (
        <p className="mt-1 text-3xl font-extrabold text-n-900">{value}</p>
      )}
      {trend && !loading && (
        <p
          className={cn(
            "mt-1 text-xs font-semibold flex items-center gap-1",
            trendUp ? "text-success" : "text-error"
          )}
        >
          {trendUp ? "↑" : "↓"} {trend}
        </p>
      )}
    </div>
  );
}
