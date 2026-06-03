import React from "react";
import CardHoverEffectDemo from "./card-hover-effect-demo";
import { cn } from "../../../lib/utils";

export default function GridBackgroundDemo() {
  return (
    <div className="relative flex min-h-[80vh] md:min-h-screen w-full items-center justify-center py-10 bg-black dark:bg-black">
      <div className={cn("absolute inset-0", "bg-size-[40px_40px]", "", "")} />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center"></div>
      <CardHoverEffectDemo />
    </div>
  );
}
