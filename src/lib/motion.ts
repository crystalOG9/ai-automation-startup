import type { Variants, Transition } from "framer-motion";

/**
 * SPARTAN MOTION SYSTEM — DYNAMIC 3D EDITION
 * Tangible momentum, spatial depth, directional entrance, and precision settling.
 */

// Premium physical momentum easing curve: swift initial impulse with smooth, cushioned deceleration
export const SPARTAN_EASE = [0.19, 1, 0.22, 1] as const;

export const DEFAULT_TRANSITION: Transition = {
  duration: 0.72,
  ease: SPARTAN_EASE,
};

export const QUICK_TRANSITION: Transition = {
  duration: 0.56,
  ease: SPARTAN_EASE,
};

export const SPATIAL_TRANSITION: Transition = {
  duration: 0.82,
  ease: SPARTAN_EASE,
};

// Viewport trigger threshold: triggers as soon as 18% of the element enters view
export const defaultViewport = {
  once: true,
  amount: 0.18,
  margin: "0px 0px -40px 0px",
} as const;

/**
 * 1. LEFT → CENTER
 * Tangible left sweep with noticeable 3D rotateY and scale recovery.
 */
export const fadeInLeft: Variants = {
  hidden: {
    x: -90,
    opacity: 0,
    rotateY: -8,
    scale: 0.95,
  },
  visible: {
    x: 0,
    opacity: 1,
    rotateY: 0,
    scale: 1,
    transition: DEFAULT_TRANSITION,
  },
};

/**
 * 2. RIGHT → CENTER
 * Tangible right sweep with noticeable 3D rotateY and scale recovery.
 */
export const fadeInRight: Variants = {
  hidden: {
    x: 90,
    opacity: 0,
    rotateY: 8,
    scale: 0.95,
  },
  visible: {
    x: 0,
    opacity: 1,
    rotateY: 0,
    scale: 1,
    transition: DEFAULT_TRANSITION,
  },
};

/**
 * 3. BOTTOM → CENTER
 * Upward lift with perceptible elevation and crisp settling.
 */
export const fadeInUp: Variants = {
  hidden: {
    y: 75,
    opacity: 0,
    scale: 0.94,
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: DEFAULT_TRANSITION,
  },
};

/**
 * 4. DEPTH → FRONT
 * Spatial 3D launch from negative Z-space with subtle rotateX pitch.
 */
export const depthReveal: Variants = {
  hidden: {
    z: -140,
    scale: 0.90,
    opacity: 0,
    rotateX: 7,
  },
  visible: {
    z: 0,
    scale: 1,
    opacity: 1,
    rotateX: 0,
    transition: SPATIAL_TRANSITION,
  },
};

/**
 * 5. SCALE REVEAL
 * Focal point expansion with distinct zoom-to-precision impulse.
 */
export const scaleReveal: Variants = {
  hidden: {
    scale: 0.91,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: QUICK_TRANSITION,
  },
};

/**
 * Helper to generate directional variants with custom delay
 */
export function createFadeInLeft(delay = 0, distance = 90): Variants {
  return {
    hidden: {
      x: -distance,
      opacity: 0,
      rotateY: -8,
      scale: 0.95,
    },
    visible: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: {
        ...DEFAULT_TRANSITION,
        delay,
      },
    },
  };
}

export function createFadeInRight(delay = 0, distance = 90): Variants {
  return {
    hidden: {
      x: distance,
      opacity: 0,
      rotateY: 8,
      scale: 0.95,
    },
    visible: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: {
        ...DEFAULT_TRANSITION,
        delay,
      },
    },
  };
}

export function createFadeInUp(delay = 0, distance = 75): Variants {
  return {
    hidden: {
      y: distance,
      opacity: 0,
      scale: 0.94,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        ...DEFAULT_TRANSITION,
        delay,
      },
    },
  };
}

export function createDepthReveal(delay = 0): Variants {
  return {
    hidden: {
      z: -140,
      scale: 0.90,
      opacity: 0,
      rotateX: 7,
    },
    visible: {
      z: 0,
      scale: 1,
      opacity: 1,
      rotateX: 0,
      transition: {
        ...SPATIAL_TRANSITION,
        delay,
      },
    },
  };
}

export function createScaleReveal(delay = 0): Variants {
  return {
    hidden: {
      scale: 0.91,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        ...QUICK_TRANSITION,
        delay,
      },
    },
  };
}

/**
 * Stagger container for cascading child elements
 */
export function createStaggerContainer(staggerDelay = 0.1, delayChildren = 0): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren,
      },
    },
  };
}

/**
 * Enhanced card hover physics:
 * translateY(-6px), scale(1.015)
 */
export const subtleHoverLift = {
  y: -6,
  scale: 1.015,
  transition: {
    duration: 0.24,
    ease: "easeOut",
  },
};

/**
 * 3D Perspective CSS helper
 */
export const PERSPECTIVE_CONTAINER = {
  perspective: 1200,
  transformStyle: "preserve-3d" as const,
};
