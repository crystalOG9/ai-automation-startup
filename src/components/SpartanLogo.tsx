import Image from "next/image";

interface SpartanLogoProps {
  size?: number;
  className?: string;
  priority?: boolean;
}

export function SpartanLogo({
  size = 34,
  className = "",
  priority = false,
}: SpartanLogoProps) {
  return (
    <div
      className={`relative shrink-0 select-none flex items-center justify-center rounded-lg overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/branding/spartan-logo.png"
        alt="SPARTAN Logo"
        width={size * 2}
        height={size * 2}
        className="w-full h-full object-contain"
        priority={priority}
      />
    </div>
  );
}
