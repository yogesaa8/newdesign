import React from "react";
import { FiX } from "react-icons/fi";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-99999 flex items-center justify-center bg-black/40 px-4">
      <div className="relative w-full max-w-xl rounded-2xl border border-outline-variant bg-white shadow-2xl dark:border-outline-variant/30 dark:bg-inverse-surface">
        <div className="flex items-center justify-between border-b border-outline-variant py-4 px-6 dark:border-outline-variant/30">
          <h3 className="font-medium text-on-surface dark:text-white">{title}</h3>
          <button
            onClick={onClose}
            className="text-outline hover:text-primary transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
