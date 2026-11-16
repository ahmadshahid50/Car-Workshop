import { MessageCircle, Navigation, Phone } from "lucide-react";
import { business, getDirectionHref, getPhoneHref, getWhatsAppHref } from "@/lib/business";

export function MobileActionBar() {
  const phoneHref = getPhoneHref();
  const whatsAppHref = getWhatsAppHref();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/90 p-2 backdrop-blur-xl md:hidden">
      <div className="grid grid-cols-3 gap-2">
        {phoneHref ? (
          <a href={phoneHref} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f39a32] px-4 py-3 text-sm font-semibold text-slate-950">
            <Phone className="h-4 w-4" />
            Call
          </a>
        ) : (
          <a href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f39a32] px-4 py-3 text-sm font-semibold text-slate-950">
            <Phone className="h-4 w-4" />
            Call
          </a>
        )}

        <a href={whatsAppHref} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#142536] px-4 py-3 text-sm font-semibold text-white">
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>

        <a href={getDirectionHref()} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900">
          <Navigation className="h-4 w-4" />
          Directions
        </a>
      </div>
      <p className="mt-2 text-center text-[11px] text-slate-500">{business.address}</p>
    </div>
  );
}
