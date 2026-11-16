import { business } from "@/lib/business";

type BrandLogoProps = {
  className?: string;
  color?: "brand" | "navy" | "orange" | "white";
};

const logoColors = {
  brand: "#f39a32",
  navy: "#142536",
  orange: "#F39A32",
  white: "#ffffff",
};

export function BrandLogo({ className = "", color = "brand" }: BrandLogoProps) {
  return (
    <span
      role="img"
      aria-label={`${business.name} logo`}
      className={`block ${className}`}
      style={{
        backgroundColor: logoColors[color],
        maskImage: "url('/logo-brand.png')",
        maskPosition: "center",
        maskRepeat: "no-repeat",
        maskSize: "contain",
        WebkitMaskImage: "url('/logo-brand.png')",
        WebkitMaskPosition: "center",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
      }}
    />
  );
}
