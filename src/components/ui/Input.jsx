import { cn } from "@/lib/utils";

export function Input({
  audience = "seeker",
  label,
  error,
  hint,
  prefix,
  suffix,
  multiline = false,
  rows = 4,
  className,
  id,
  ...props
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  const focusRing =
    audience === "company"
      ? "focus:border-co-primary focus:ring-2 focus:ring-co-primary/10"
      : "focus:border-sk-primary focus:ring-2 focus:ring-sk-primary/10";

  const errorRing = "border-error focus:border-error focus:ring-error/10";

  const baseInput = cn(
    "w-full border border-n-200 rounded-lg px-4 py-3 text-sm text-n-900 placeholder:text-n-400 outline-none transition-all bg-white",
    error ? errorRing : focusRing,
    prefix && "pl-10",
    suffix && "pr-10",
    className
  );

  const field = multiline ? (
    <textarea
      id={inputId}
      rows={rows}
      className={cn(baseInput, "resize-none")}
      {...props}
    />
  ) : (
    <input id={inputId} className={baseInput} {...props} />
  );

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-n-700 mb-1.5"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-n-400">
            {prefix}
          </span>
        )}
        {field}
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-n-400">
            {suffix}
          </span>
        )}
      </div>
      {error && (
        <p className="mt-1 text-xs text-error flex items-center gap-1">
          <svg className="w-3 h-3 shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
      {hint && !error && (
        <p className="mt-1 text-xs text-n-400">{hint}</p>
      )}
    </div>
  );
}
