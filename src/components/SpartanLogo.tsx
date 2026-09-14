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
        src="/branding/Spartan-final-logo.png"
        alt="SPARTAN Logo"
        width={size * 3}
        height={size * 3}
        className="w-full h-full object-contain"
        priority={priority}
      />
    </div>
  );
}
