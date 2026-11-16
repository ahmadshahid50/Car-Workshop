"use client";

import { Menu, MessageCircle, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { Button } from "@/components/shared/Button";
import { business, getDirectionHref, getPhoneHref, getWhatsAppHref } from "@/lib/business";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact Us" },
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const phoneHref = getPhoneHref();
  const whatsAppHref = getWhatsAppHref();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center" aria-label={`${business.name} home page`}>
          <BrandLogo color="navy" className="h-12 w-[162px] shrink-0 sm:h-14 sm:w-[188px]" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition ${active ? "text-[#142536]" : "text-slate-600 hover:text-[#142536]"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {phoneHref ? (
            <Button href={phoneHref} variant="secondary" className="gap-2 px-4 py-2.5 text-sm">
              <Phone className="h-4 w-4" />
              Call Now
            </Button>
          ) : null}
          <Button href={whatsAppHref} target="_blank" rel="noreferrer" variant="dark" className="gap-2 px-4 py-2.5 text-sm">
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex items-center justify-center rounded-full border border-slate-200 p-2 text-slate-700 md:hidden"
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen ? (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4" aria-label="Mobile navigation">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-xl px-3 py-2 text-sm font-medium ${active ? "bg-slate-100 text-[#142536]" : "text-slate-700 hover:bg-slate-50"}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {phoneHref ? (
                <a href={phoneHref} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f39a32] px-4 py-2.5 text-sm font-semibold text-slate-950">
                  <Phone className="h-4 w-4" />
                  Call Now
                </a>
              ) : null}
              <a href={whatsAppHref} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#142536] px-4 py-2.5 text-sm font-semibold text-white">
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
              <a href={getDirectionHref()} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-900 sm:col-span-2">
                Get Directions
              </a>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
