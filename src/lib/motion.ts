import type { Variants, Transition } from "framer-motion";

/**
 * SPARTAN MOTION SYSTEM — ADAPTIVE PERFORMANCE EDITION
 * Desktop: Subtle spatial depth, controlled momentum, crisp settling.
 * Mobile / Low-power: Snappy translateY + opacity, zero heavy 3D matrix transforms, 400-500ms duration.
 */

// Premium physical momentum easing curve: swift initial impulse with smooth, cushioned deceleration
export const SPARTAN_EASE = [0.19, 1, 0.22, 1] as const;

// Helper to detect mobile/touch environment safely in client runtime
const isMobileClient = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches;
};

export const DEFAULT_TRANSITION: Transition = {
  duration: 0.46,
  ease: SPARTAN_EASE,
};

export const QUICK_TRANSITION: Transition = {
  duration: 0.32,
  ease: SPARTAN_EASE,
};

export const SPATIAL_TRANSITION: Transition = {
  duration: 0.50,
  ease: SPARTAN_EASE,
};

// Viewport trigger threshold: triggers cleanly on initial scroll contact
export const defaultViewport = {
  once: true,
  amount: 0.08,
  margin: "0px 0px -20px 0px",
} as const;

/**
 * 1. LEFT → CENTER
 * Desktop: Subtle 36px sweep with minor 3D rotateY.
 * Mobile: Snappy 8px vertical lift, zero horizontal or scale strain.
 */
export const fadeInLeft: Variants = {
  hidden: () => {
    const isMobile = isMobileClient();
    return {
      x: isMobile ? 0 : -36,
      y: isMobile ? 8 : 0,
      opacity: 0,
      rotateY: 0,
      scale: 1,
    };
  },
  visible: {
    x: 0,
    y: 0,
    opacity: 1,
    rotateY: 0,
    scale: 1,
    transition: DEFAULT_TRANSITION,
  },
};

/**
 * 2. RIGHT → CENTER
 * Desktop: Subtle 36px sweep with minor 3D rotateY.
 * Mobile: Snappy 8px vertical lift, zero horizontal or scale strain.
 */
export const fadeInRight: Variants = {
  hidden: () => {
    const isMobile = isMobileClient();
    return {
      x: isMobile ? 0 : 36,
      y: isMobile ? 8 : 0,
      opacity: 0,
      rotateY: 0,
      scale: 1,
    };
  },
  visible: {
    x: 0,
    y: 0,
    opacity: 1,
    rotateY: 0,
    scale: 1,
    transition: DEFAULT_TRANSITION,
  },
};

/**
 * 3. BOTTOM → CENTER
 * Controlled upward lift with clean settling.
 */
export const fadeInUp: Variants = {
  hidden: () => {
    const isMobile = isMobileClient();
    return {
      y: isMobile ? 10 : 24,
      opacity: 0,
      scale: 1,
    };
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
 * Desktop: Restrained spatial depth.
 * Mobile: Light 10px vertical fade-in without 3D rotation.
 */
export const depthReveal: Variants = {
  hidden: () => {
    const isMobile = isMobileClient();
    return {
      z: isMobile ? 0 : -25,
      y: isMobile ? 10 : 0,
      scale: isMobile ? 1 : 0.97,
      opacity: 0,
      rotateX: 0,
    };
  },
  visible: {
    z: 0,
    y: 0,
    scale: 1,
    opacity: 1,
    rotateX: 0,
    transition: SPATIAL_TRANSITION,
  },
};

/**
 * 5. SCALE REVEAL
 * Clean focal expansion.
 */
export const scaleReveal: Variants = {
  hidden: {
    scale: 0.98,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: QUICK_TRANSITION,
  },
};

/**
 * Directional variants with custom delay
 */
export function createFadeInLeft(delay = 0, distance = 36): Variants {
  return {
    hidden: () => {
      const isMobile = isMobileClient();
      return {
        x: isMobile ? 0 : -distance,
        y: isMobile ? 8 : 0,
        opacity: 0,
        rotateY: 0,
        scale: 1,
      };
    },
    visible: {
      x: 0,
      y: 0,
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

export function createFadeInRight(delay = 0, distance = 36): Variants {
  return {
    hidden: () => {
      const isMobile = isMobileClient();
      return {
        x: isMobile ? 0 : distance,
        y: isMobile ? 8 : 0,
        opacity: 0,
        rotateY: 0,
        scale: 1,
      };
    },
    visible: {
      x: 0,
      y: 0,
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

export function createFadeInUp(delay = 0, distance = 24): Variants {
  return {
    hidden: () => {
      const isMobile = isMobileClient();
      return {
        y: isMobile ? 10 : distance,
        opacity: 0,
        scale: 1,
      };
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
    hidden: () => {
      const isMobile = isMobileClient();
      return {
        z: isMobile ? 0 : -25,
        y: isMobile ? 10 : 0,
        scale: isMobile ? 1 : 0.97,
        opacity: 0,
        rotateX: 0,
      };
    },
    visible: {
      z: 0,
      y: 0,
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
      scale: 0.98,
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
export function createStaggerContainer(staggerDelay = 0.08, delayChildren = 0): Variants {
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
 * Card hover physics: subtle lift without heavy layout jumps
 */
export const subtleHoverLift = {
  y: -4,
  scale: 1.01,
  transition: {
    duration: 0.2,
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
