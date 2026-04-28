/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "on-secondary": "#ffffff",
        /* Periwinkle 500 tint */
        "surface-tint": "#4d00ff",
        /* Glaucous 500 */
        "secondary": "#5063af",
        /* Periwinkle 200 */
        "inverse-primary": "#b899ff",
        /* Slate Grey 900 */
        "inverse-surface": "#17181c",
        /* Glaucous 100 */
        "surface-container": "#dce0ef",
        /* Glaucous 50 */
        "background": "#eeeff7",
        /* Periwinkle 600 */
        "primary-container": "#3d00cc",
        /* Periwinkle 500 */
        "primary": "#4d00ff",
        /* Glaucous 50 */
        "surface-bright": "#eeeff7",
        "surface-container-lowest": "#ffffff",
        /* Glaucous 700 */
        "on-secondary-container": "#303c69",
        "on-tertiary-fixed-variant": "#7d2d00",
        "tertiary-fixed-dim": "#ffb596",
        /* Periwinkle 50 */
        "on-primary-container": "#ede5ff",
        /* Glaucous 200 */
        "secondary-container": "#b9c1df",
        /* Slate Grey 900 */
        "on-surface": "#17181c",
        /* Glaucous 100 */
        "surface-variant": "#dce0ef",
        "on-error-container": "#93000a",
        /* Slate Grey 700 */
        "on-surface-variant": "#444855",
        "error-container": "#ffdad6",
        "on-error": "#ffffff",
        "on-tertiary-container": "#ffede6",
        "tertiary-container": "#bc4800",
        /* Glaucous 50 */
        "surface": "#eeeff7",
        /* Slate Grey 100 */
        "outline-variant": "#e3e4e8",
        /* Periwinkle 50 */
        "primary-fixed": "#ede5ff",
        "tertiary": "#943700",
        "tertiary-fixed": "#ffdbcd",
        /* Glaucous 900 */
        "on-secondary-fixed": "#101423",
        "on-primary": "#ffffff",
        /* Glaucous 100 */
        "surface-dim": "#dce0ef",
        /* Periwinkle 200 */
        "primary-fixed-dim": "#b899ff",
        /* Glaucous 200 */
        "surface-container-high": "#b9c1df",
        "on-tertiary-fixed": "#360f00",
        /* Slate Grey 500 */
        "outline": "#71788e",
        /* Slate Grey 900 */
        "on-background": "#17181c",
        "on-tertiary": "#ffffff",
        /* Glaucous 50 */
        "secondary-fixed": "#eeeff7",
        /* Glaucous 700 */
        "on-secondary-fixed-variant": "#303c69",
        /* Glaucous 50 */
        "inverse-on-surface": "#eeeff7",
        /* Slate Grey 50 */
        "surface-container-low": "#f1f1f4",
        /* Glaucous 300 */
        "surface-container-highest": "#96a2cf",
        /* Glaucous 200 */
        "secondary-fixed-dim": "#b9c1df",
        "error": "#ba1a1a",
        /* Periwinkle 900 */
        "on-primary-fixed": "#0f0033",
        /* Periwinkle 700 */
        "on-primary-fixed-variant": "#2e0099"
      },
      fontFamily: {
        headline: ["Manrope", "sans-serif"],
        body: ["Inter", "sans-serif"],
        label: ["Inter", "sans-serif"]
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        full: "9999px"
      }
    },
  },
  plugins: [],
}
