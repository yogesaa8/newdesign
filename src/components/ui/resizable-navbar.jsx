"use client";;
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";

import React, { useRef, useState } from "react";
import { cn } from "../../lib/utils";


export const Navbar = ({
  children,
  className
}) => {
  const ref = useRef(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      // IMPORTANT: Change this to class of `fixed` if you want the navbar to be fixed
      className={cn("sticky inset-x-0 top-0 z-40 w-full", className)}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { visible })
          : child)}
    </motion.div>
  );
};

export const NavBody = ({
  children,
  className,
  visible
}) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "40%" : "100%",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      style={{
        minWidth: "800px",
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-white/85 px-4 py-2 backdrop-blur lg:flex dark:bg-inverse-surface/85",
        visible && "bg-white/85 dark:bg-inverse-surface/85",
        className
      )}>
      {children}
    </motion.div>
  );
};

export const NavItems = ({
  items,
  className,
  onItemClick
}) => {
  const [hovered, setHovered] = useState(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-slate-700 transition duration-200 hover:text-primary hover:bg-primary-container/10 lg:flex lg:space-x-2 dark:hover:bg-white/5",
        className,
      )}
    >
      {items.map((item, idx) => {
        const isOpen = hovered === idx;

        return (
          <div
            key={`link-${idx}`}
            className="relative"
            onMouseEnter={() => setHovered(idx)}
          >
            {/* Main Nav Item */}
            <a
              onClick={onItemClick}
              href={item.link || "#"}
              className="relative inline-flex items-center rounded-full px-4 py-2 text-slate-700 hover:bg-primary-container/80 hover:text-primary dark:text-surface-container-low dark:hover:bg-white/10"
            >
              {isOpen && (
                <motion.div
                  layoutId="hovered"
                  className="border absolute inset-0 h-full w-full rounded-full bg-primary-container/80 dark:bg-white/10"
                />
              )}
              <span className="relative z-20">{item.name}</span>
            </a>

            {/* ✅ Dropdown */}
            {item.children && (
              <div
                className={cn(
                  "absolute left-0 top-full mt-2 w-44 rounded-lg border border-outline-variant bg-white dark:bg-inverse-surface shadow-[0_12px_30px_rgba(15,23,42,0.08)] transition-all duration-200",
                  isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                )}
              >
                {item.children.map((child, i) => (
                  <a
                    key={i}
                    href={child.link}
                    className="block px-4 py-2 text-sm text-on-surface hover:rounded-[inherit] hover:bg-primary-container/70 hover:text-primary dark:hover:bg-on-surface-variant/20"
                  >
                    {child.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </motion.div>
  );
};

export const MobileNav = ({
  children,
  className,
  visible
}) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "90%" : "100%",
        paddingRight: visible ? "12px" : "0px",
        paddingLeft: visible ? "12px" : "0px",
        borderRadius: visible ? "4px" : "2rem",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-white/85 px-0 py-2 backdrop-blur lg:hidden",
        visible && "bg-white/85 dark:bg-inverse-surface/85",
        className
      )}>
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className
}) => {
  return (
    <div
      className={cn("flex w-full flex-row items-center justify-between", className)}>
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg border border-outline-variant bg-white px-4 py-8 shadow-[0_12px_30px_rgba(15,23,42,0.08)] dark:bg-inverse-surface",
            className
          )}>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick
}) => {
  return isOpen ? (
    <IconX className="text-on-surface dark:text-white" onClick={onClick} />
  ) : (
    <IconMenu2 className="text-on-surface dark:text-white" onClick={onClick} />
  );
};

export const NavbarLogo = () => {
  return (
    <a
      href="#"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-on-surface">
      <img
        src="https://assets.aceternity.com/logo-dark.png"
        alt="logo"
        width={30}
        height={30} />
      <span className="font-medium text-on-surface dark:text-white">Startup</span>
    </a>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}) => {
  const baseStyles =
    "px-4 py-2 rounded-xl button text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";

  const variantStyles = {
    primary:
      "bg-primary text-white shadow-[0_8px_20px_rgba(37,99,235,0.25)] hover:bg-primary-hover active:bg-primary-active",
    secondary: "border border-blue-300 bg-secondary text-primary shadow-none hover:bg-blue-200 dark:text-primary",
    dark: "bg-inverse-surface text-white shadow-[0_8px_20px_rgba(15,23,42,0.12)]",
    gradient:
      "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}>
      {children}
    </Tag>
  );
};
