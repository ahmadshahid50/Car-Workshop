import Link from "next/link";
import type { Metadata } from "next";
import { business } from "@/lib/business";

export const metadata: Metadata = {
  title: `Page Not Found | ${business.name}`,
  description: "The requested page could not be found.",
  robots: { index: false, follow: true },
  alternates: { canonical: undefined },
};

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
      <p className="mb-6 text-sm font-semibold uppercase tracking-[0.24em] text-[#f39a32]">404 Error</p>
      <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">Page not found</h1>
      <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
        The page you are looking for does not exist or may have moved. Return to the homepage and browse the workshop services.
      </p>
      <Link href="/" className="mt-8 inline-flex items-center justify-center rounded-full bg-[#f39a32] px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_12px_40px_rgba(243,154,50,0.2)] transition hover:bg-[#e38f28]">
        Go to Homepage
      </Link>
    </div>
  );
}
