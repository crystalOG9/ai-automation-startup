import Image from "next/image";

interface SpartanLogoProps {
  size?: number;
  className?: string;
  priority?: boolean;
}

export function SpartanLogo({
  size = 36,
  className = "",
  priority = false,
}: SpartanLogoProps) {
  return (
    <div
      className={`relative shrink-0 select-none flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/branding/spartan-3d-logo-red.png"
        alt="SPARTAN Logo"
        width={size * 2}
        height={size * 2}
        className="w-full h-full object-contain drop-shadow-[0_0_12px_rgba(225,29,72,0.45)]"
        priority={priority}
        unoptimized
      />
    </div>
  );
}
