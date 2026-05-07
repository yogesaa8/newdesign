import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { cn } from "../../lib/utils";

export const HoverEffect = ({ items, className }) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10",
        className,
      )}
    >
      {items.map((item, idx) => {
        // --- SEPARATOR LINES LOGIC ---
        // 3 columns hain, isliye index 0,1,2 pe right border lagao (3,4,5 pe nahi)
        const isNotLastCol = idx % 3 !== 2;
        // Total 6 items hain, index 0,1,2 wale upar hain, unke neeche border lagao (3,4,5 ke neeche nahi)
        const isNotLastRow = idx < 3;

        return (
          <a
            href={item?.link}
            key={item?.link}
            className={cn(
              "relative group block p-2 h-full w-full",
              isNotLastCol && "border-r border-white/10", // Vertical Line
              isNotLastRow && "border-b border-white/10", // Horizontal Line
            )}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-orange-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            <Card>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </Card>
          </a>
        );
      })}
    </div>
  );
};

export const Card = ({ className, children }) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20 transition-all duration-300 group-hover:-translate-y-1",
        className,
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export const CardTitle = ({ className, children }) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};

export const CardDescription = ({ className, children }) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className,
      )}
    >
      {children}
    </p>
  );
};
