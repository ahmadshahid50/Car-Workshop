import { business, getAbsoluteUrl } from "@/lib/business";
import type { WorkshopService } from "@/lib/services";

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: business.name,
    url: getAbsoluteUrl(),
    description: `${business.name} offers practical car repair and maintenance services in Township, Lahore, Pakistan.`,
  };
}

export function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: business.name,
    description: `${business.name} provides practical car repair, maintenance and workshop services in Township, Lahore.`,
    url: getAbsoluteUrl(),
    areaServed: `${business.area}, ${business.city}, ${business.country}`,
    ...(business.phone ? { telephone: business.phone } : {}),
    ...(business.email ? { email: business.email } : {}),
    address: {
      "@type": "PostalAddress",
      addressCountry: business.country,
      addressLocality: business.city,
      addressRegion: business.province,
    },
    openingHours: ["Mo-Sa 10:00-19:00"],
    ...(Object.values(business.social).some(Boolean)
      ? { sameAs: Object.values(business.social).filter(Boolean) }
      : {}),
  };
}

export function buildBreadcrumbSchema(items: Array<{ name: string; url?: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url ?? undefined,
    })),
  };
}

export function buildServiceSchema(service: WorkshopService) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    name: service.name,
    provider: {
      "@type": "LocalBusiness",
      name: business.name,
    },
    areaServed: `${business.area}, ${business.city}, ${business.country}`,
    description: service.description,
    url: getAbsoluteUrl(`/services/${service.slug}`),
  };
}
