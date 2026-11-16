import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { business, getAbsoluteUrl } from "@/lib/business";
import { services } from "@/lib/services";
import { buildBreadcrumbSchema, buildLocalBusinessSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(
  `Car Repair Services in Township, Lahore | ${business.name}`,
  `Browse the full list of services offered by ${business.name} in Township, Lahore, including denting, diagnostics, AC repair, electrical work and general servicing.`,
  "/services",
);

export default function ServicesPage() {
  const structuredData = [
    buildLocalBusinessSchema(),
    buildBreadcrumbSchema([
      { name: "Home", url: getAbsoluteUrl("/") },
      { name: "Services", url: getAbsoluteUrl("/services") },
    ]),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Services" }]} />
        <div className="max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#f39a32]">Workshop Services</p>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Car Repair & Maintenance Services in Township, Lahore
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            {business.name} offers practical support for common vehicle concerns, from everyday servicing
            to mechanical, electrical and bodywork repairs.
          </p>
        </div>
        <p className="mt-4 text-sm text-slate-500">
          Service photos are representative stock images and do not show our workshop.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <article key={service.slug} className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_25px_80px_rgba(20,37,54,0.05)] transition hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(20,37,54,0.08)]">
              <Image
                src={service.image}
                alt={service.imageAlt}
                width={1200}
                height={800}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="h-56 w-full object-cover"
              />
              <div className="space-y-4 p-6">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#f39a32]">{service.highlight}</p>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900">{service.name}</h2>
                </div>
                <p className="text-sm leading-7 text-slate-600">{service.shortDescription}</p>
                <Link href={`/services/${service.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-[#142536] hover:text-[#f39a32]">
                  Learn More About {service.name}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
