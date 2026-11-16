import Image from "next/image";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ContactForm } from "@/components/shared/ContactForm";
import { business, getAbsoluteUrl, getDirectionHref, getOpeningHoursText, getPhoneHref, getWhatsAppHref } from "@/lib/business";
import { buildBreadcrumbSchema, buildLocalBusinessSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(
  `Contact ${business.name} | Township, Lahore`,
  `Call or message ${business.name} in Township, Lahore about car repair, servicing, diagnostics, and other vehicle maintenance.`,
  "/contact",
);

export default function ContactPage() {
  const structuredData = [
    buildLocalBusinessSchema(),
    buildBreadcrumbSchema([
      { name: "Home", url: getAbsoluteUrl("/") },
      { name: "Contact", url: getAbsoluteUrl("/contact") },
    ]),
  ];

  const phoneHref = getPhoneHref();
  const whatsAppHref = getWhatsAppHref();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Contact" }]} />

        <div className="mb-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">Contact {business.name} in Township, Lahore</h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Tell us about your vehicle issue and we will help guide the next steps for repair or maintenance in a clear, practical way.
            </p>

            <section aria-labelledby="contact-details-heading" className="mt-8 space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(20,37,54,0.04)]">
              <h2 id="contact-details-heading" className="text-xl font-bold text-slate-900">Workshop contact details</h2>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f39a32]">Phone</p>
                <p className="mt-2 text-base text-slate-700">{phoneHref ? <a href={phoneHref} className="hover:text-[#142536]">{business.phone}</a> : "Phone number will be shared when confirmed."}</p>
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f39a32]">WhatsApp</p>
                <p className="mt-2 text-base text-slate-700"><a href={whatsAppHref} target="_blank" rel="noreferrer" className="hover:text-[#142536]">Send a quick inquiry</a></p>
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f39a32]">Location</p>
                <p className="mt-2 text-base text-slate-700">{business.address}</p>
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f39a32]">Opening Hours</p>
                <p className="mt-2 text-base text-slate-700">{getOpeningHoursText()}</p>
              </div>

              <div className="flex flex-wrap gap-3">
                {phoneHref ? (
                  <a href={phoneHref} className="inline-flex items-center justify-center rounded-full bg-[#f39a32] px-5 py-3 text-sm font-semibold text-slate-950">Call Now</a>
                ) : null}
                <a href={whatsAppHref} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full bg-[#142536] px-5 py-3 text-sm font-semibold text-white">WhatsApp Us</a>
                <a href={getDirectionHref()} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900">Get Directions</a>
              </div>
            </section>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-2 shadow-[0_25px_80px_rgba(20,37,54,0.08)]">
            <Image
              src="/images/under-car-inspection.jpg"
              alt="Representative stock photo of a mechanic inspecting the underside of a car on a workshop lift."
              width={1200}
              height={800}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-[520px] w-full rounded-[1.5rem] object-cover"
            />
            {/* <p className="px-3 pb-2 pt-3 text-xs text-slate-500">
              Representative stock photography; this is not a photo of our workshop.
            </p> */}
          </div>
        </div>

        <ContactForm />
      </div>
    </>
  );
}
