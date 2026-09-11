"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import React from "react";

interface ScrollRevealProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  scale?: number;
  tilt?: boolean;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  direction = "up",
  distance = 32,
  scale = 0.98,
  tilt = true,
  ...props
}: ScrollRevealProps) {
  const getInitialOffsets = () => {
    switch (direction) {
      case "up":
        return { y: distance, x: 0 };
      case "down":
        return { y: -distance, x: 0 };
      case "left":
        return { x: distance, y: 0 };
      case "right":
        return { x: -distance, y: 0 };
      case "none":
        return { x: 0, y: 0 };
    }
  };

  const offset = getInitialOffsets();

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...offset,
        scale,
        rotateX: tilt && direction === "up" ? 5 : 0,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotateX: 0,
      }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      style={{ perspective: 1000 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
