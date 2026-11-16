import Image from "next/image";
import { business } from "@/lib/business";

type BrandLogoProps = {
  className?: string;
  dark?: boolean;
};

export function BrandLogo({ className = "", dark = false }: BrandLogoProps) {
  return (
    <Image
      src="/logo-brand.png"
      alt={`${business.name} logo`}
      width={917}
      height={272}
      priority
      className={className}
      style={dark ? { filter: "brightness(0) invert(1)" } : undefined}
    />
  );
}
