import { cn } from "@/lib/utils";

const styleMap = {
  success: "bg-success-bg text-success",
  warning: "bg-warning-bg text-warning",
  error: "bg-error-bg text-error",
  info: "bg-info-bg text-info",
  neutral: "bg-n-100 text-n-700",
  applied: "bg-sk-surface text-sk-primary",
  aiMatch: "bg-co-surface text-co-primary",
  prime: "bg-sk-primary text-white",
  locked: "bg-n-100 text-n-400",
};

export function Badge({ status = "neutral", className, children, ...props }) {
  return (
    <span
      {...props}
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold",
        styleMap[status],
        className
      )}
    >
      {children}
    </span>
  );
}
