import Link from "next/link";
import { MapPin, Clock3, MessageCircle, Phone } from "lucide-react";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { business, getDirectionHref, getOpeningHoursText, getPhoneHref, getWhatsAppHref } from "@/lib/business";

const serviceLinks = [
  { href: "/services/car-denting-painting", label: "Car Denting & Painting" },
  { href: "/services/engine-mechanical-repair", label: "Engine Repair & Mechanical Work" },
  { href: "/services/car-ac-repair", label: "Car AC Repair & Maintenance" },
  { href: "/services/auto-electrical-services", label: "Auto Electrical Services" },
  { href: "/services/suspension-brake-repair", label: "Suspension & Brake Repair" },
  { href: "/services/car-tuning-maintenance", label: "Car Tuning & Maintenance" },
  { href: "/services/computerized-car-diagnostics", label: "Computerized Car Diagnostics" },
  { href: "/services/oil-change-general-servicing", label: "Oil Change & General Servicing" },
];

export function Footer() {
  const phoneHref = getPhoneHref();
  const whatsAppHref = getWhatsAppHref();

  return (
    <footer className="bg-[#142536] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_1fr_1fr] lg:px-8">
        <div>
          <div className="mb-4">
            <BrandLogo color="orange" className="h-12 w-[162px] max-w-xs shrink-0" />
          </div>
          <p className="max-w-sm text-sm leading-7 text-slate-300">
            {business.name} helps local vehicle owners with practical and dependable repair solutions in Township, Lahore.
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#f39a32]">Navigation</h2>
          <ul className="space-y-3 text-sm text-slate-300">
            <li><Link href="/" className="transition hover:text-white">Home</Link></li>
            <li><Link href="/about" className="transition hover:text-white">About Us</Link></li>
            <li><Link href="/services" className="transition hover:text-white">Services</Link></li>
            <li><Link href="/contact" className="transition hover:text-white">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#f39a32]">Services</h2>
          <ul className="space-y-3 text-sm text-slate-300">
            {serviceLinks.map((service) => (
              <li key={service.href}>
                <Link href={service.href} className="transition hover:text-white">{service.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#f39a32]">Contact</h2>
          <ul className="space-y-3 text-sm text-slate-300">
            {phoneHref ? (
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[#f39a32]" />
                <a href={phoneHref} className="transition hover:text-white">{business.phone}</a>
              </li>
            ) : null}
            <li className="flex items-center gap-3">
              <MessageCircle className="h-4 w-4 text-[#f39a32]" />
              <a href={whatsAppHref} target="_blank" rel="noreferrer" className="transition hover:text-white">WhatsApp inquiry</a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-[#f39a32]" />
              <a href={getDirectionHref()} target="_blank" rel="noreferrer" className="transition hover:text-white">{business.address}</a>
            </li>
            <li className="flex items-center gap-3">
              <Clock3 className="h-4 w-4 text-[#f39a32]" />
              <span>{getOpeningHoursText()}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-sm text-slate-300 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {business.name}. All rights reserved.</p>
          <p>{business.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
