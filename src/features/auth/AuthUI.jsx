import { Link } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { HeroHighlight } from "../../components/ui/hero-highlight";

const audienceTheme = {
  seeker: {
    pageBg: "bg-[#FFF7F3]",
    shell: "bg-[#FFF7F3]",
    card: "border-[#EADFD9] bg-white/82 shadow-sm backdrop-blur",
    logoWrap: "bg-[#FFF7F3] border-[#F3D3C4]",
    accent: "#FF6B35",
    accentHover: "#FF9566",
    accentRing: "rgb(255 107 53 / 0.18)",
  },
  company: {
    pageBg: "bg-[#F7F5F2]",
    shell: "bg-[#F7F5F2]",
    card: "border-[#C6AFFF]/50 bg-white shadow-sm",
    logoWrap: "bg-[#F7F5F2] border-[#C6AFFF]",
    accent: "#8500FA",
    accentHover: "#491EF7",
    accentRing: "rgb(133 0 250 / 0.16)",
  },
  institute: {
    pageBg: "bg-black",
    shell: "bg-black",
    card: "border-white/10 bg-white/95 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur",
    logoWrap: "bg-black border-violet-500/40",
    accent: "#7F22FE",
    accentHover: "#6D28D9",
    accentRing: "rgb(127 34 254 / 0.18)",
  },
};

const AuthCard = ({ audience, children }) => {
  const theme = audienceTheme[audience] || audienceTheme.seeker;

  return (
    <section
      className={`w-full max-w-[480px] rounded-[8px] border p-5 sm:p-8 ${theme.card}`}
    >
      <div className="mb-8 flex justify-center">
        <Link
          to="/"
          className={`inline-flex h-12 w-12 items-center justify-center rounded-[8px] border ${theme.logoWrap}`}
          aria-label="FirstJobIndia home"
        >
          <img
            src="/images/logos/fji_orange.png"
            alt=""
            className="h-8 w-8 object-contain"
          />
        </Link>
      </div>
      {children}
    </section>
  );
};

export const AuthShell = ({ audience = "seeker", children }) => {
  const theme = audienceTheme[audience] || audienceTheme.seeker;

  if (audience === "company") {
    return (
      <main
        className={`min-h-screen text-[#0A0A0A] ${theme.pageBg}`}
        style={{
          "--auth-accent": theme.accent,
          "--auth-accent-hover": theme.accentHover,
          "--auth-ring": theme.accentRing,
        }}
      >
        <HeroHighlight
          containerClassName={`min-h-screen ${theme.shell}`}
          className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-8"
        >
          <AuthCard audience={audience}>{children}</AuthCard>
        </HeroHighlight>
      </main>
    );
  }

  return (
    <main
      className={`min-h-screen text-[#0A0A0A] ${theme.pageBg}`}
      style={{
        "--auth-accent": theme.accent,
        "--auth-accent-hover": theme.accentHover,
        "--auth-ring": theme.accentRing,
      }}
    >
      <HeroHighlight
        containerClassName={`min-h-screen ${theme.shell}`}
        className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-8"
      >
        <AuthCard audience={audience}>{children}</AuthCard>
      </HeroHighlight>
    </main>
  );
};

export const AuthHeader = ({ eyebrow, title, description }) => (
  <div className="mb-8">
    {eyebrow && (
      <p className="text-sm font-semibold uppercase text-[var(--auth-accent)]">
        {eyebrow}
      </p>
    )}
    <h2 className="mt-2 text-3xl font-bold text-[#0A0A0A]">{title}</h2>
    {description && (
      <p className="mt-3 text-sm leading-6 text-[#6F6F76]">{description}</p>
    )}
  </div>
);

export const AuthInput = ({
  label,
  error,
  children,
  className = "",
  ...props
}) => (
  <div>
    <label className="mb-2 block text-xs font-semibold uppercase text-[#6F6F76]">
      {label}
    </label>
    <div className="relative">
      <input
        className={`w-full rounded-[8px] border bg-[#F7F5F2] px-3 py-3 text-sm text-[#0A0A0A] outline-none transition placeholder:text-[#9F9FA9] focus:ring-2 ${
          error
            ? "border-red-300 focus:border-red-400 focus:ring-red-100"
            : "border-[#EADFD9] focus:border-[var(--auth-accent)] focus:ring-[var(--auth-ring)]"
        } ${children ? "pr-11" : ""} ${className}`}
        {...props}
      />
      {children}
    </div>
    {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
  </div>
);

export const AuthSelect = ({ label, error, children, ...props }) => (
  <div>
    <label className="mb-2 block text-xs font-semibold uppercase text-[#6F6F76]">
      {label}
    </label>
    <select
      className={`w-full rounded-[8px] border bg-[#F7F5F2] px-3 py-3 text-sm text-[#0A0A0A] outline-none transition focus:ring-2 ${
        error
          ? "border-red-300 focus:border-red-400 focus:ring-red-100"
          : "border-[#EADFD9] focus:border-[var(--auth-accent)] focus:ring-[var(--auth-ring)]"
      }`}
      {...props}
    >
      {children}
    </select>
    {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
  </div>
);

export const AuthButton = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const styles =
    variant === "secondary"
      ? "border border-[#EADFD9] bg-white text-[#0A0A0A] hover:bg-[#F7F5F2]"
      : "bg-[var(--auth-accent)] text-white hover:bg-[var(--auth-accent-hover)]";

  return (
    <button
      className={`inline-flex w-full items-center justify-center gap-2 rounded-[8px] px-4 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-70 ${styles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

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

export const AuthDivider = ({ label = "Or continue with" }) => (
  <div className="flex items-center gap-3 py-1">
    <span className="h-px flex-1 bg-[#EADFD9]" />
    <span className="text-xs font-semibold uppercase text-[#9F9FA9]">
      {label}
    </span>
    <span className="h-px flex-1 bg-[#EADFD9]" />
  </div>
);

export const AuthFooterText = ({ children }) => (
  <p className="text-center text-sm text-[#6F6F76]">{children}</p>
);
