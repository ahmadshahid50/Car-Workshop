import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "dark";
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
  target?: string;
  rel?: string;
};

export function Button({
  href,
  onClick,
  variant = "primary",
  className = "",
  children,
  ariaLabel,
  target,
  rel,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#f39a32]";

  const variants = {
    primary: "bg-[#f39a32] text-slate-950 shadow-[0_10px_30px_rgba(243,154,50,0.22)] hover:bg-[#e38f28]",
    secondary: "bg-white text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50",
    dark: "bg-[#142536] text-white hover:bg-[#1a2d43]",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel} target={target} rel={rel}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
