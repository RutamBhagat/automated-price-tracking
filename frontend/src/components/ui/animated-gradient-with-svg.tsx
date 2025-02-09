"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface AnimatedGradientProps {
  colors: string[];
  speed?: number;
  blur?: "light" | "medium" | "heavy";
}

export const AnimatedGradient: React.FC<AnimatedGradientProps> = ({
  colors,
  speed = 0,
  blur = "light",
}) => {
  const positions = [
    { top: "10%", left: "10%" },
    { top: "60%", left: "40%" },
    { top: "30%", left: "70%" },
  ];

  const blurClass =
    blur === "light"
      ? "blur-2xl"
      : blur === "medium"
        ? "blur-3xl"
        : "blur-[100px]";

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className={cn(`absolute inset-0`, blurClass)}>
        {positions.map((position, index) => (
          <div
            key={index}
            className="absolute h-[50vh] w-[50vh] rounded-full opacity-30 dark:opacity-[0.15]"
            style={{
              backgroundColor: colors[index % colors.length],
              top: position.top,
              left: position.left,
              transition:
                speed > 0 ? `transform ${1 / speed}s ease-in-out` : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
};
