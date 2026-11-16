import type { Metadata } from "next";
import { business, getAbsoluteUrl } from "@/lib/business";

export function buildMetadata(
  title: string,
  description: string,
  path = "/",
  overrides: Partial<Metadata> = {},
  socialImage?: { path: string; alt: string },
): Metadata {
  const canonical = getAbsoluteUrl(path);
  const imageUrl = business.websiteUrl
    ? new URL(socialImage?.path ?? "/images/hero-open-bonnet.jpg", business.websiteUrl).toString()
    : undefined;
  const imageAlt =
    socialImage?.alt ?? "Representative stock photo of a mechanic inspecting a car with its bonnet open.";

  return {
    title,
    description,
    ...(business.websiteUrl ? { metadataBase: new URL(business.websiteUrl) } : {}),
    ...(canonical ? { alternates: { canonical } } : {}),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      siteName: business.name,
      locale: "en_PK",
      ...(imageUrl ? { images: [{ url: imageUrl, alt: imageAlt }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
    ...overrides,
  };
}
