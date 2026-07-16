import { cn } from "@/lib/utils";

const variantMap = {
  flat: "bg-white border border-n-200 rounded-xl",
  raised: "bg-white rounded-xl shadow-sm",
  hover:
    "bg-white rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer",
};

const paddingMap = {
  sm: "p-4",
  md: "p-5",
  lg: "p-8",
  none: "",
};

const accentBorderMap = {
  "sk-primary": "border-l-4 border-l-sk-primary",
  "co-primary": "border-l-4 border-l-co-primary",
  success: "border-l-4 border-l-success",
  warning: "border-l-4 border-l-warning",
  error: "border-l-4 border-l-error",
  info: "border-l-4 border-l-info",
};

export function Card({
  variant = "flat",
  padding = "md",
  accentColor,
  className,
  children,
  ...props
}) {
  return (
    <div
      {...props}
      className={cn(
        variantMap[variant],
        paddingMap[padding],
        accentColor && accentBorderMap[accentColor],
        className
      )}
    >
      {children}
    </div>
  );
}
