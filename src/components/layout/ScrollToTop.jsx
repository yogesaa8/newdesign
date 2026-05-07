import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const [showButton, setShowButton] = useState(false);

  // Route change par top pe le jao
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  // Scroll hone par button show/hide
  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Main Container for smooth animations */}
      <div
        className={`fixed bottom-8 right-8 z-[9999] transition-all duration-500 ${
          showButton
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-10 scale-75 pointer-events-none"
        }`}
      >
        {/* Outer Glow Ring */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full blur-lg opacity-60 group-hover:opacity-100 group-hover:-inset-1.5 transition-all duration-300"></div>

          {/* Actual Button */}
          <button
            onClick={goTop}
            className="relative w-14 h-14 flex items-center justify-center rounded-full border border-white/20 text-white bg-zinc-900/80 backdrop-blur-xl shadow-2xl transition-all duration-300 group-hover:-translate-y-1 active:scale-95"
          >
            {/* Arrow SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            >
              <path d="M12 19V5" />
              <path d="m5 12 7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default ScrollToTop;
