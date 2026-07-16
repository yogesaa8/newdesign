import { Link } from "react-router-dom";
import { useEffect } from "react";
import toast from "@/lib/toast";

// ─── Brand panels ────────────────────────────────────────────────────────────

const CheckIcon = () => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

const SeekerBrandPanel = () => (
  <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-sk-primary to-sk-pressed flex-col justify-between p-12">
    {/* Decorative circles */}
    <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-white/8 pointer-events-none" />
    <div className="absolute top-1/2 -right-16 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
    <div className="absolute -bottom-10 left-1/4 w-56 h-56 rounded-full bg-white/6 pointer-events-none" />

    <div className="relative z-10">
      <Link to="/" className="inline-flex items-center gap-2">
        <img src="/images/logos/fji_white.png" alt="FirstJobIndia" className="h-8 object-contain" onError={(e) => {
          e.currentTarget.style.display = 'none';
          e.currentTarget.nextSibling.style.display = 'inline';
        }} />
        <span className="hidden text-white font-bold text-xl tracking-tight">FirstJobIndia</span>
      </Link>
    </div>

    <div className="relative z-10 space-y-6">
      <div>
        <p className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-3">For Job Seekers</p>
        <h1 className="text-white font-extrabold text-4xl leading-tight">
          Your first job<br />starts here.
        </h1>
        <p className="text-white/75 text-base mt-4 leading-relaxed max-w-sm">
          AI-powered tools to help freshers and final-year students land their first job faster.
        </p>
      </div>

      <ul className="space-y-3">
        {[
          "AI-matched jobs for your skills & stream",
          "Resume builder with instant AI feedback",
          "Mock interviews & skill gap analysis",
        ].map((item) => (
          <li key={item} className="flex items-center gap-3 text-white text-sm font-medium">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/20 text-white shrink-0">
              <CheckIcon />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>

    <div className="relative z-10">
      <p className="text-white/50 text-xs">© 2024 FirstJobIndia · Free for all students</p>
    </div>
  </div>
);

const CompanyBrandPanel = () => (
  <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-co-primary to-co-pressed flex-col justify-between p-12">
    {/* Decorative circles */}
    <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/8 pointer-events-none" />
    <div className="absolute top-1/2 -left-16 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
    <div className="absolute -bottom-10 right-1/4 w-56 h-56 rounded-full bg-white/6 pointer-events-none" />

    <div className="relative z-10">
      <Link to="/" className="inline-flex items-center gap-2">
        <img src="/images/logos/fji_white.png" alt="FirstJobIndia" className="h-8 object-contain" onError={(e) => {
          e.currentTarget.style.display = 'none';
          e.currentTarget.nextSibling.style.display = 'inline';
        }} />
        <span className="hidden text-white font-bold text-xl tracking-tight">FirstJobIndia</span>
      </Link>
    </div>

    <div className="relative z-10 space-y-6">
      <div>
        <p className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-3">For Employers</p>
        <h1 className="text-white font-extrabold text-4xl leading-tight">
          Hire India's<br />freshest talent.
        </h1>
        <p className="text-white/75 text-base mt-4 leading-relaxed max-w-sm">
          Post jobs, review AI-matched candidates, and build your fresher pipeline — all in one place.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {[
          { stat: "10,000+", label: "Active job seekers" },
          { stat: "AI-matched", label: "Candidate recommendations" },
          { stat: "First post", label: "Always free" },
        ].map(({ stat, label }) => (
          <div key={stat} className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
            <span className="text-white font-bold text-sm">{stat}</span>
            <span className="text-white/70 text-sm">{label}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="relative z-10">
      <p className="text-white/50 text-xs">© 2024 FirstJobIndia · Verified employer network</p>
    </div>
  </div>
);

// ─── Form panel (right/left depending on audience) ────────────────────────────

const FormPanel = ({ audience, children }) => {
  const bg = audience === "seeker" ? "bg-sk-bg" : audience === "company" ? "bg-co-bg" : "bg-gray-50";

  return (
    <div className={`flex flex-1 lg:w-1/2 min-h-screen items-center justify-center px-6 py-12 ${bg}`}>
      <div className="w-full max-w-md">
        {/* Mobile logo */}
        <div className="flex justify-center mb-8 lg:hidden">
          <Link to="/" className="inline-flex items-center gap-2">
            <img src="/images/logos/fji_orange.png" alt="FirstJobIndia" className="h-8 object-contain" />
          </Link>
        </div>
        <div className="bg-white rounded-2xl border border-n-200 shadow-sm p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

// ─── AuthShell ────────────────────────────────────────────────────────────────

export const AuthShell = ({ audience = "seeker", children }) => {
  // Institute keeps centered single-card layout (not redesigned in this sprint)
  if (audience === "institute") {
    return (
      <main
        className="min-h-screen flex items-center justify-center bg-black px-4 py-8"
        style={{
          "--auth-accent": "#7F22FE",
          "--auth-accent-hover": "#6D28D9",
          "--auth-ring": "rgb(127 34 254 / 0.18)",
        }}
      >
        <div className="w-full max-w-[480px] rounded-2xl border border-white/10 bg-white p-8 shadow-2xl">
          <div className="mb-8 flex justify-center">
            <Link to="/" aria-label="FirstJobIndia home">
              <img src="/images/logos/fji_orange.png" alt="" className="h-8 object-contain" />
            </Link>
          </div>
          {children}
        </div>
      </main>
    );
  }

  const isSeeker = audience === "seeker";
  const accentVars = isSeeker
    ? { "--auth-accent": "#FF6B35", "--auth-accent-hover": "#FF9566", "--auth-ring": "rgb(255 107 53 / 0.18)" }
    : { "--auth-accent": "#7C3AED", "--auth-accent-hover": "#A855F7", "--auth-ring": "rgb(124 58 237 / 0.18)" };

  const brandPanel = isSeeker ? <SeekerBrandPanel /> : <CompanyBrandPanel />;
  const formPanel = <FormPanel audience={audience}>{children}</FormPanel>;

  return (
    <main className="min-h-screen flex" style={accentVars}>
      {/* Seeker: Brand LEFT → Form RIGHT | Company: Form LEFT → Brand RIGHT */}
      {isSeeker ? brandPanel : formPanel}
      {isSeeker ? formPanel : brandPanel}
    </main>
  );
};

// ─── AuthHeader ───────────────────────────────────────────────────────────────

export const AuthHeader = ({ eyebrow, title, description }) => (
  <div className="mb-7">
    {eyebrow && (
      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--auth-accent)] mb-1">
        {eyebrow}
      </p>
    )}
    <h2 className="text-2xl font-bold text-n-900">{title}</h2>
    {description && (
      <p className="mt-2 text-sm leading-6 text-n-500">{description}</p>
    )}
  </div>
);

// ─── AuthInput ────────────────────────────────────────────────────────────────

export const AuthInput = ({ label, error, children, className = "", ...props }) => (
  <div>
    {label && (
      <label className="mb-1.5 block text-sm font-medium text-n-700">
        {label}
      </label>
    )}
    <div className="relative">
      <input
        className={`w-full rounded-lg border bg-white px-4 py-3 text-sm text-n-900 outline-none transition placeholder:text-n-400
          ${error
            ? "border-error focus:border-error focus:ring-2 focus:ring-error/10"
            : "border-n-200 focus:border-[var(--auth-accent)] focus:ring-2 focus:ring-[var(--auth-ring)]"
          }
          ${children ? "pr-11" : ""}
          ${className}`}
        {...props}
      />
      {children}
    </div>
    {error && (
      <p className="mt-1 text-xs text-error flex items-center gap-1">
        <svg className="w-3 h-3 shrink-0" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        {error}
      </p>
    )}
  </div>
);

// ─── AuthSelect ───────────────────────────────────────────────────────────────

export const AuthSelect = ({ label, error, children, ...props }) => (
  <div>
    {label && (
      <label className="mb-1.5 block text-sm font-medium text-n-700">
        {label}
      </label>
    )}
    <select
      className={`w-full rounded-lg border bg-white px-4 py-3 text-sm text-n-900 outline-none transition
        ${error
          ? "border-error focus:border-error focus:ring-2 focus:ring-error/10"
          : "border-n-200 focus:border-[var(--auth-accent)] focus:ring-2 focus:ring-[var(--auth-ring)]"
        }`}
      {...props}
    >
      {children}
    </select>
    {error && (
      <p className="mt-1 text-xs text-error flex items-center gap-1">
        <svg className="w-3 h-3 shrink-0" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        {error}
      </p>
    )}
  </div>
);

// ─── AuthButton ───────────────────────────────────────────────────────────────

export const AuthButton = ({ children, variant = "primary", className = "", ...props }) => {
  const styles =
    variant === "secondary"
      ? "border border-n-200 bg-white text-n-700 hover:bg-n-50"
      : "bg-[var(--auth-accent)] text-white hover:bg-[var(--auth-accent-hover)]";

  return (
    <button
      className={`inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.98] ${styles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// ─── AuthAlert (toast-based) ──────────────────────────────────────────────────

export const AuthAlert = ({ type = "error", children }) => {
  useEffect(() => {
    if (!children) return;
    if (type === "success") {
      toast.success(children);
      return;
    }
    toast.error(children);
  }, [children, type]);

  return null;
};

// ─── AuthDivider ──────────────────────────────────────────────────────────────

export const AuthDivider = ({ label = "Or continue with" }) => (
  <div className="flex items-center gap-3 py-1">
    <span className="h-px flex-1 bg-n-200" />
    <span className="text-xs font-semibold uppercase tracking-wider text-n-400">
      {label}
    </span>
    <span className="h-px flex-1 bg-n-200" />
  </div>
);

// ─── AuthFooterText ───────────────────────────────────────────────────────────

export const AuthFooterText = ({ children }) => (
  <p className="text-center text-sm text-n-500">{children}</p>
);
