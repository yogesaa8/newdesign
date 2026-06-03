"use client";
import { motion } from "motion/react";
import {
  HeroHighlight,
  Highlight,
} from "../../../components/ui/hero-highlight";

export default function HeroHighlightDemo() {
  return (
    <HeroHighlight className="min-h-[60vh] md:min-h-[70vh] flex items-center px-4 py-10 md:py-16">
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-xl sm:text-2xl px-4 md:text-4xl lg:text-5xl font-bold max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto"
      >
        Explore fresher jobs from top{" "}
        <Highlight> employers worldwide</Highlight>.
      </motion.h1>
    </HeroHighlight>
  );
}
