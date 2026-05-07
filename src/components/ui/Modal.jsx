import React from "react";
import { FiX } from "react-icons/fi";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-xl rounded border border-orange-100 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-orange-100 bg-orange-50 px-6 py-4 rounded-t-2xl">
          <h3 className="text-lg font-semibold text-orange-700">{title}</h3>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded text-orange-500 transition hover:bg-orange-100 hover:text-orange-700"
          >
            <FiX size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
