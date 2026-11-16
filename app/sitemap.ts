import type { MetadataRoute } from "next";
import { business } from "@/lib/business";
import { services } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = business.websiteUrl;
  if (!baseUrl) return [];

  const routes = [
    "/",
    "/about",
    "/services",
    "/contact",
    ...services.map((service) => `/services/${service.slug}`),
  ];

  return routes.map((route) => ({
    url: new URL(route, baseUrl).toString(),
  }));
}
