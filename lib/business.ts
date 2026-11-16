const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const parsedSiteUrl = configuredSiteUrl ? new URL(configuredSiteUrl) : undefined;

if (process.env.NODE_ENV === "production" && parsedSiteUrl && parsedSiteUrl.protocol !== "https:") {
  throw new Error("NEXT_PUBLIC_SITE_URL must use HTTPS in production.");
}

export const business = {
  name: "Auto Specialists",
  shortName: "AUTO SPECIALISTS",
  tagline: "Reliable Service. Fair Prices.",
  area: "Township",
  city: "Lahore",
  province: "Punjab",
  country: "Pakistan",
  address: "Township, Lahore, Punjab, Pakistan",
  phone: "+92 321 4729 417",
  whatsapp: "+92 321 4729 417",
  email: "ahmadshahid95@icloud.com",
  websiteUrl:
    parsedSiteUrl?.origin ??
    (process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000"),
  mapQuery: "Township Lahore Pakistan",
  openingHours: {
    weekday: "10:00 AM - 7:00 PM",
    sunday: "Off",
  },
  social: {
    facebook: "",
    instagram: "",
    tiktok: "",
  },
};

export function getOpeningHoursText() {
  return `Mon - Sat: ${business.openingHours.weekday} | Sunday: ${business.openingHours.sunday}`;
}

export function getAbsoluteUrl(path = "/") {
  return business.websiteUrl ? new URL(path, business.websiteUrl).toString() : undefined;
}

export function normalizePhone(value: string) {
  return value.replace(/[^\d+]/g, "");
}

export function getPhoneHref() {
  if (!business.phone) return undefined;
  return `tel:${normalizePhone(business.phone)}`;
}

export function getWhatsAppHref(message = `Hello ${business.name}, I would like to book a service.`) {
  const basePhone = business.whatsapp ? normalizePhone(business.whatsapp) : "";
  const url = business.whatsapp
    ? `https://wa.me/${basePhone}`
    : "https://wa.me/?text=";

  const text = encodeURIComponent(message);
  return business.whatsapp ? `${url}?text=${text}` : `${url}${text}`;
}

export function getDirectionHref() {
  const query = encodeURIComponent(business.mapQuery || business.address || "Township Lahore Pakistan");
  return `https://www.google.com/maps/dir//F853%2BJ3F+Muhammad+Ali+Chowk,+Block+A+3+Phase+1+Johar+Town,+Lahore,+54770/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x3919017f00b8540f:0x8051ae49d405f3a7?sa=X&ved=1t:57443&ictx=111`;
}
