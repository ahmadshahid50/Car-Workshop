import { readFile } from "node:fs/promises";

const serviceSource = await readFile(new URL("../lib/services.ts", import.meta.url), "utf8");
const serviceSlugs = [...serviceSource.matchAll(/^\s*slug:\s*"([^"]+)"/gm)].map((match) => match[1]);
const routes = ["/", "/about", "/services", "/contact", ...serviceSlugs.map((slug) => `/services/${slug}`)];
const baseUrl = new URL(process.env.SEO_AUDIT_BASE_URL ?? "http://localhost:3000");
const errors = [];
const warnings = [];

function decodeEntities(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number.parseInt(code, 10)));
}

function attributes(tag) {
  const result = {};
  const pattern = /([^\s=/>]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g;
  for (const match of tag.matchAll(pattern)) {
    result[match[1].toLowerCase()] = decodeEntities(match[2] ?? match[3] ?? match[4] ?? "");
  }
  return result;
}

function textContent(value) {
  return decodeEntities(value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function tags(html, expression) {
  return [...html.matchAll(expression)].map((match) => match[0]);
}

function metadata(html) {
  const metaTags = tags(html, /<meta\b[^>]*>/gi).map(attributes);
  const values = {};
  for (const tag of metaTags) {
    const key = tag.name?.toLowerCase() ?? tag.property?.toLowerCase();
    if (key) values[key] = tag.content ?? "";
  }

  const canonicalTag = tags(html, /<link\b[^>]*>/gi)
    .map(attributes)
    .find((tag) => tag.rel?.split(/\s+/).includes("canonical"));
  const title = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "";

  return {
    title: textContent(title),
    description: values.description ?? "",
    canonical: canonicalTag?.href ?? "",
    robots: values.robots ?? "",
    openGraph: {
      title: values["og:title"] ?? "",
      description: values["og:description"] ?? "",
      url: values["og:url"] ?? "",
      image: values["og:image"] ?? "",
      siteName: values["og:site_name"] ?? "",
    },
  };
}

function headings(html) {
  const result = Object.fromEntries([1, 2, 3, 4, 5, 6].map((level) => [level, []]));
  for (const match of html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1\s*>/gi)) {
    result[Number(match[1])].push(textContent(match[2]));
  }
  return result;
}

function jsonLd(html) {
  const blocks = tags(html, /<script\b(?=[^>]*type=["']application\/ld\+json["'])[^>]*>[\s\S]*?<\/script>/gi);
  const parsed = [];
  for (const block of blocks) {
    const value = block.replace(/^<script\b[^>]*>/i, "").replace(/<\/script>$/i, "");
    try {
      parsed.push(JSON.parse(value));
    } catch (error) {
      errors.push(`Invalid JSON-LD: ${error.message}`);
    }
  }
  return { count: blocks.length, types: parsed.flatMap((item) => (Array.isArray(item) ? item : [item]).map((entry) => entry["@type"])) };
}

async function request(url) {
  try {
    return await fetch(url, { redirect: "follow" });
  } catch (error) {
    errors.push(`Request failed for ${url}: ${error.message}`);
    return undefined;
  }
}

const pageResults = [];
for (const route of routes) {
  const url = new URL(route, baseUrl);
  const response = await request(url);
  if (!response) {
    pageResults.push({ route, status: 0 });
    continue;
  }

  const html = await response.text();
  const pageHeadings = headings(html);
  const pageMetadata = metadata(html);
  const images = tags(html, /<img\b[^>]*>/gi).map(attributes);
  const links = tags(html, /<a\b[^>]*>/gi).map(attributes).map((tag) => tag.href).filter(Boolean);
  const schema = jsonLd(html);

  if (!response.ok) errors.push(`${route} returned HTTP ${response.status}`);
  if (pageHeadings[1].length !== 1) errors.push(`${route} has ${pageHeadings[1].length} H1 headings`);
  if (!pageMetadata.title) errors.push(`${route} is missing a title`);
  if (!pageMetadata.description) errors.push(`${route} is missing a meta description`);
  if (pageMetadata.canonical) {
    const canonical = new URL(pageMetadata.canonical, baseUrl);
    if (canonical.origin !== baseUrl.origin || canonical.pathname !== route) {
      errors.push(`${route} has an unexpected canonical: ${canonical.href}`);
    }
  } else {
    warnings.push(`${route} has no canonical; set NEXT_PUBLIC_SITE_URL for production metadata.`);
  }
  if (!pageMetadata.openGraph.title || !pageMetadata.openGraph.description || !pageMetadata.openGraph.siteName) {
    errors.push(`${route} is missing Open Graph title, description, or site name`);
  }
  if (images.some((image) => !image.alt?.trim())) errors.push(`${route} contains an image without alt text`);
  if (schema.count === 0) warnings.push(`${route} has no JSON-LD structured data`);

  pageResults.push({
    route,
    status: response.status,
    title: pageMetadata.title,
    description: pageMetadata.description,
    canonical: pageMetadata.canonical || null,
    robots: pageMetadata.robots || "default index, follow",
    headings: Object.fromEntries(Object.entries(pageHeadings).map(([level, values]) => [level, values.length])),
    images: images.length,
    imagesMissingAlt: images.filter((image) => !image.alt?.trim()).length,
    internalLinks: links,
    jsonLd: schema,
    html,
  });
}

const internalPaths = new Set();
const imageUrls = new Set();
for (const page of pageResults) {
  if (!page.html) continue;
  for (const link of page.internalLinks) {
    if (link.startsWith("#") || /^(tel:|mailto:|javascript:|data:)/i.test(link)) continue;
    const target = new URL(link, baseUrl);
    if (target.origin !== baseUrl.origin || target.pathname.startsWith("/_next/")) continue;
    internalPaths.add(target.pathname);
  }
  for (const source of tags(page.html, /<img\b[^>]*>/gi).map((tag) => attributes(tag).src).filter(Boolean)) {
    const image = new URL(source, baseUrl);
    if (image.origin === baseUrl.origin && image.pathname.startsWith("/_next/image")) imageUrls.add(image.href);
  }
}

const linkResults = await Promise.all(
  [...internalPaths].map(async (path) => {
    const response = await request(new URL(path, baseUrl));
    return { path, status: response?.status ?? 0 };
  }),
);
for (const result of linkResults) {
  if (!result.status || result.status >= 400) errors.push(`Internal link ${result.path} returned HTTP ${result.status}`);
}

const imageResults = await Promise.all(
  [...imageUrls].map(async (url) => {
    const response = await request(url);
    return { url, status: response?.status ?? 0 };
  }),
);
for (const result of imageResults) {
  if (!result.status || result.status >= 400) errors.push(`Optimized image returned HTTP ${result.status}: ${result.url}`);
}

const robotsResponse = await request(new URL("/robots.txt", baseUrl));
const robotsText = robotsResponse ? await robotsResponse.text() : "";
const sitemapResponse = await request(new URL("/sitemap.xml", baseUrl));
const sitemapText = sitemapResponse ? await sitemapResponse.text() : "";
const sitemapPaths = [...sitemapText.matchAll(/<loc>(.*?)<\/loc>/gi)].map((match) => new URL(decodeEntities(match[1]), baseUrl).pathname);
const expectedPaths = new Set(routes);
const missingSitemapPaths = [...expectedPaths].filter((route) => !sitemapPaths.includes(route));
const unexpectedSitemapPaths = sitemapPaths.filter((route) => !expectedPaths.has(route));
const hasSitemapDirective = /^sitemap:\s*.+$/im.test(robotsText);

if (sitemapResponse?.ok && sitemapPaths.length && (missingSitemapPaths.length || unexpectedSitemapPaths.length)) {
  errors.push(`Sitemap route mismatch. Missing: ${missingSitemapPaths.join(", ") || "none"}; unexpected: ${unexpectedSitemapPaths.join(", ") || "none"}`);
} else if (!sitemapPaths.length) {
  warnings.push("Sitemap contains no URLs; configure NEXT_PUBLIC_SITE_URL before production deployment.");
}
if (!robotsResponse?.ok || !/^allow:\s*\/\s*$/im.test(robotsText)) errors.push("robots.txt does not allow crawling of the public site");
if (businessSiteUrlConfigured() && !hasSitemapDirective) errors.push("robots.txt is missing its sitemap directive");

const report = {
  baseUrl: baseUrl.origin,
  routeCount: pageResults.length,
  pages: pageResults.map((page) => ({
    route: page.route,
    status: page.status,
    title: page.title,
    description: page.description,
    canonical: page.canonical,
    robots: page.robots,
    headings: page.headings,
    images: page.images,
    imagesMissingAlt: page.imagesMissingAlt,
    jsonLd: page.jsonLd,
  })),
  sitemap: {
    status: sitemapResponse?.status ?? 0,
    urlCount: sitemapPaths.length,
    missingRoutes: missingSitemapPaths,
    unexpectedRoutes: unexpectedSitemapPaths,
  },
  robots: { status: robotsResponse?.status ?? 0, allowsPublicSite: /^allow:\s*\/\s*$/im.test(robotsText), hasSitemapDirective },
  checkedInternalLinks: linkResults.length,
  checkedOptimizedImages: imageResults.length,
  errors,
  warnings,
};

console.log(JSON.stringify(report, null, 2));
if (errors.length) process.exitCode = 1;

function businessSiteUrlConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SITE_URL);
}
