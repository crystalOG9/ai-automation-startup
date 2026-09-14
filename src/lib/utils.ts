import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Universal, reliable smooth scroll to section helper.
 * Handles hash navigation without Next.js App Router duplicate-hash stalls.
 */
export function scrollToSection(
  hashOrId: string,
  e?: React.MouseEvent | React.TouchEvent | MouseEvent
) {
  if (e && typeof e.preventDefault === "function") {
    e.preventDefault();
  }

  if (typeof window === "undefined") return;

  const id = hashOrId.replace(/^#/, "").trim();

  if (!id || id === "hero" || id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
    return;
  }

  const target = document.getElementById(id);
  if (target) {
    const navHeight = 84;
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navHeight;

    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior: "smooth",
    });

    window.history.replaceState(null, "", `#${id}`);
  }
}

