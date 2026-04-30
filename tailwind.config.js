/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",

        background: "#F8FAFC",
        surface: "#FFFFFF",
        "surface-bright": "#F8FAFC",
        "surface-dim": "#F1F5F9",

        "surface-container-lowest": "#FFFFFF",
        "surface-container-low": "#F8FAFC",
        "surface-container": "#F1F5F9",
        "surface-container-high": "#EFF6FF",
        "surface-container-highest": "#DBEAFE",

        primary: "#2563EB",
        "primary-hover": "#1D4ED8",
        "primary-active": "#1E40AF",
        "on-primary": "#FFFFFF",
        "primary-container": "#DBEAFE",
        "on-primary-container": "#1D4ED8",

        secondary: "#DBEAFE",
        "on-secondary": "#2563EB",
        "secondary-container": "#DBEAFE",
        "on-secondary-container": "#2563EB",

        tertiary: "#10B981",
        "on-tertiary": "#FFFFFF",
        "tertiary-container": "#D1FAE5",
        "on-tertiary-container": "#10B981",

        "text-main": "#0F172A",
        "on-background": "#0F172A",
        "on-surface": "#0F172A",
        "on-surface-variant": "#475569",

        outline: "#94A3B8",
        "outline-variant": "#E2E8F0",

        error: "#BA1A1A",
        "on-error": "#FFFFFF",
        "error-container": "#FFDAD6",
        "on-error-container": "#93000A",

        "soft-sage": "#EFF6FF",
        "sage-hover": "#DBEAFE",
        "surface-tint": "#2563EB",

        "inverse-surface": "#0B1120",
        "inverse-on-surface": "#94A3B8",
        "inverse-primary": "#60A5FA",

        "primary-fixed": "#DBEAFE",
        "primary-fixed-dim": "#BFDBFE",
        "on-primary-fixed": "#1E40AF",
        "on-primary-fixed-variant": "#1D4ED8",

        "secondary-fixed": "#EFF6FF",
        "secondary-fixed-dim": "#DBEAFE",
        "on-secondary-fixed": "#1E40AF",
        "on-secondary-fixed-variant": "#2563EB",

        "tertiary-fixed": "#D1FAE5",
        "tertiary-fixed-dim": "#A7F3D0",
        "on-tertiary-fixed": "#065F46",
        "on-tertiary-fixed-variant": "#10B981",
        "success-container": "#D1FAE5",
        success: "#10B981",
        "warning-container": "#FEF3C7",
        warning: "#F59E0B",
      },

      fontFamily: {
        headline: ["Rubik", "sans-serif"],
        body: ["Rubik", "sans-serif"],
        label: ["Rubik", "sans-serif"],
      },

      borderRadius: {
        DEFAULT: "0.75rem",
        lg: "1rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        full: "9999px",
      },
    },
  },

  plugins: [],
};
