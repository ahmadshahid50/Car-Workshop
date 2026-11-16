import Link from "next/link";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { OwnerProfile } from "@/components/sections/OwnerProfile";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { business, getAbsoluteUrl, getDirectionHref } from "@/lib/business";
import { buildBreadcrumbSchema, buildLocalBusinessSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(
  `About ${business.name} | Car Repair Workshop in Township, Lahore`,
  `Learn about ${business.name} in Township, Lahore, and the owner's 30 years of automotive repair experience and customer-focused service.`,
  "/about",
);

const values = [
  "Multiple vehicle services under one roof",
  "Customer-focused communication and transparency",
  "Practical solutions for everyday driving needs",
  "Convenient workshop access in Township, Lahore",
];

export default function AboutPage() {
  const structuredData = [
    buildLocalBusinessSchema(),
    buildBreadcrumbSchema([
      { name: "Home", url: getAbsoluteUrl("/") },
      { name: "About", url: getAbsoluteUrl("/about") },
    ]),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "About" }]} />

        <div className="mb-16">
          <h1 className="mb-8 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            About {business.name}
          </h1>
          <OwnerProfile headingLevel="h2" />
        </div>

        <section className="mb-16 rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(20,37,54,0.04)]">
          <SectionHeading
            eyebrow="Workshop Philosophy"
            title="Practical car care for local vehicle owners"
            description="We believe a dependable workshop should be easy to contact, clear about vehicle issues and focused on honest recommendations."
          />

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {values.map((value) => (
              <div key={value} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-base font-medium text-slate-700">
                {value}
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">What the workshop does</h2>
            <p className="mt-5 text-base leading-7 text-slate-600">
              The workshop supports common vehicle repair and maintenance requirements, including mechanical work,
              denting and painting, AC service, electrical repairs and regular servicing. The goal is to help drivers
              manage the daily upkeep of their vehicles without unnecessary confusion.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Customer service approach</h2>
            <p className="mt-5 text-base leading-7 text-slate-600">
              We focus on clear discussion, useful inspection and honest guidance. If repair work goes beyond the
              initial problem, customers are informed before extra work is carried out so they can decide with clarity.
            </p>
          </div>
        </section>

        <div className="mt-16 rounded-3xl bg-[#142536] p-8 text-white sm:p-10">
          <h2 className="text-3xl font-bold tracking-tight">Visit the workshop in Township, Lahore</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200">
            {business.name} is based in {business.area}, {business.city}, {business.country}. We welcome customers who want to discuss vehicle repairs, maintenance and servicing needs in a convenient local setting.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={getDirectionHref()} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full bg-[#f39a32] px-5 py-3 text-sm font-semibold text-slate-950">
              Get Directions
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
