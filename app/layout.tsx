import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { business } from "@/lib/business";
import { buildMetadata } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = buildMetadata(
  `Car Repair in Township, Lahore | ${business.name}`,
  `${business.name} provides car repair and maintenance in Township, Lahore, including mechanical repairs, car AC service, denting and painting, and electrical work.`,
  "/",
  {
    icons: {
      icon: "/icon.svg",
    },
    other: {
      "theme-color": "#142536",
    },
  },
);

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-slate-50 text-slate-900">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <MobileActionBar />
        </div>
      </body>
    </html>
  );
}
