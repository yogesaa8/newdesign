import { cn } from "@/lib/utils";

const variantMap = {
  "primary-seeker":
    "bg-sk-primary hover:bg-sk-hover active:bg-sk-pressed text-white",
  "outline-seeker":
    "border border-sk-primary text-sk-primary hover:bg-sk-surface",
  "primary-company":
    "bg-co-primary hover:bg-co-hover active:bg-co-pressed text-white",
  "outline-company":
    "border border-co-primary text-co-primary hover:bg-co-surface",
  ghost: "text-n-700 hover:bg-n-100 border border-transparent",
  danger: "bg-error text-white hover:bg-red-600",
  ai: "bg-gradient-to-r from-sk-primary to-co-primary text-white",
};

const sizeMap = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

export function Button({
  variant = "primary-seeker",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  icon,
  className,
  children,
  ...props
}) {
  const isDisabled = disabled || loading;

  return (
    <button
      {...props}
      disabled={isDisabled}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-150 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        variantMap[variant],
        sizeMap[size],
        fullWidth && "w-full",
        isDisabled && "opacity-50 cursor-not-allowed pointer-events-none",
        loading && "pointer-events-none",
        className
      )}
    >
      {loading ? (
        <>
          <Spinner />
          {children}
        </>
      ) : (
        <>
          {icon && <span className="shrink-0">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
}
