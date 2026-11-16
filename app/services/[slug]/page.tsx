import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { business, getAbsoluteUrl, getDirectionHref, getWhatsAppHref } from "@/lib/business";
import { buildBreadcrumbSchema, buildLocalBusinessSchema, buildServiceSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { services, servicesBySlug } from "@/lib/services";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = servicesBySlug[slug];

  if (!item) {
    return {
      title: `Service Not Found | ${business.name}`,
      description: "The requested car service could not be located.",
      robots: { index: false, follow: true },
    };
  }

  return buildMetadata(
    `${item.name} in Township, Lahore | ${business.name}`,
    `${item.shortDescription} Contact ${business.name} in Township, Lahore to discuss this service.`,
    `/services/${item.slug}`,
    {},
    { path: item.image, alt: item.imageAlt },
  );
}

export default function ServiceDetailPage({ params }: ServicePageProps) {
  return (
    <Suspense
      fallback={
        <p role="status" className="mx-auto max-w-7xl px-4 py-16 text-slate-600 sm:px-6 lg:px-8">
          Loading service details…
        </p>
      }
    >
      <ServiceDetailContent params={params} />
    </Suspense>
  );
}

async function ServiceDetailContent({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = servicesBySlug[slug];

  if (!service) {
    notFound();
  }

  const relatedServices = services.filter((item) => item.slug !== service.slug).slice(0, 3);
  const structuredData = [
    buildLocalBusinessSchema(),
    buildServiceSchema(service),
    buildBreadcrumbSchema([
      { name: "Home", url: getAbsoluteUrl("/") },
      { name: "Services", url: getAbsoluteUrl("/services") },
      { name: service.name },
    ]),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Services", href: "/services" }, { name: service.name }]} />

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#f39a32]">{service.highlight}</p>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">{service.pageHeading}</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">{service.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={getWhatsAppHref(`Hello, I would like to discuss ${service.name}.`)} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full bg-[#f39a32] px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_12px_40px_rgba(243,154,50,0.2)] transition hover:bg-[#e38f28]">
                Ask on WhatsApp
              </a>
              <a href={getDirectionHref()} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50">
                Get Directions
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-2 shadow-[0_30px_90px_rgba(20,37,54,0.08)]">
            <Image
              src={service.image}
              alt={service.imageAlt}
              width={1200}
              height={900}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-[420px] w-full rounded-[1.5rem] object-cover"
            />
            <p className="px-3 pb-2 pt-3 text-xs text-slate-500">
              Representative stock photography; this is not a photo of our workshop.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(20,37,54,0.04)]">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">What we inspect or repair</h2>
            <ul className="mt-6 space-y-4 text-base text-slate-600">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-[#f39a32]" aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Common reasons for an inspection</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              {service.commonProblems}
            </p>
          </div>
        </div>

        <section className="mt-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">When to book this service</h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">{service.whenToVisit}</p>
        </section>

        <section className="mt-12 rounded-3xl bg-slate-50 p-8">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Why timely maintenance matters</h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">{service.maintenanceBenefit}</p>
        </section>

        <section className="mt-16 rounded-3xl bg-slate-50 p-8">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Frequently asked questions</h2>
          <div className="mt-6 space-y-5">
            {service.faqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="text-lg font-semibold text-slate-900">{faq.question}</h3>
                <p className="mt-2 text-base leading-7 text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Related services</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {relatedServices.map((item) => (
              <Link key={item.slug} href={`/services/${item.slug}`} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_20px_50px_rgba(20,37,54,0.04)] transition hover:-translate-y-1">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#f39a32]">{item.highlight}</p>
                <h3 className="mt-3 text-xl font-bold text-slate-900">{item.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.shortDescription}</p>
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-16 rounded-3xl bg-[#142536] p-8 text-white sm:p-10">
          <h2 className="text-3xl font-bold tracking-tight">Need advice on this service?</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200">
            Contact {business.name} to discuss your vehicle, explain the issue and get a practical recommendation for the right service.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={getWhatsAppHref(`Hello, I need help with ${service.name}.`)} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full bg-[#f39a32] px-5 py-3 text-sm font-semibold text-slate-950">
              WhatsApp Us
            </a>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white">
              Contact Workshop
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
