import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";

const modalSizeClasses = {
  sm: "max-w-md",
  md: "max-w-xl",
  lg: "max-w-3xl",
};

const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex h-screen items-start justify-center overflow-hidden bg-black/50 p-3 backdrop-blur-sm sm:items-center sm:p-4">
      <div
        className={`relative flex max-h-[calc(100vh-1.5rem)] min-h-0 w-full ${modalSizeClasses[size] || modalSizeClasses.md} flex-col overflow-hidden rounded border border-orange-100 bg-white shadow-2xl sm:max-h-[calc(100vh-3rem)]`}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-orange-100 bg-orange-50 px-4 py-3 sm:px-6 sm:py-4">
          <h3 className="min-w-0 text-base font-semibold text-orange-700 sm:text-lg">
            {title}
          </h3>

          <button
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded text-orange-500 transition hover:bg-orange-100 hover:text-orange-700"
          >
            <FiX size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
