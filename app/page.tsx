import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageCircle, Phone } from "lucide-react";
import { OwnerProfile } from "@/components/sections/OwnerProfile";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { business, getDirectionHref, getPhoneHref, getWhatsAppHref } from "@/lib/business";
import { buildLocalBusinessSchema, buildWebSiteSchema } from "@/lib/schema";
import { featuredServices, services } from "@/lib/services";

const faqs = [
  {
    question: `Where is ${business.name} located?`,
    answer: "The workshop is based in Township, Lahore, Pakistan, and serves local car owners looking for practical repair and maintenance support.",
  },
  {
    question: "What types of cars do you service?",
    answer: "The workshop supports common passenger vehicles used in Lahore, including locally popular models such as Suzuki and Honda vehicles, along with other everyday cars.",
  },
  {
    question: "Do you provide car denting and painting?",
    answer: "Yes, bodywork and paint-related support is part of the workshop services offered for vehicle owners who need cosmetic and surface restoration.",
  },
  {
    question: "Can I contact the workshop before visiting?",
    answer: "Yes. Customers can contact the workshop to describe the issue, ask about the service and arrange the next inspection or visit.",
  },
  {
    question: "Do you provide car AC repair?",
    answer: "Yes, AC repair and maintenance support forms part of the workshop's practical vehicle service offer.",
  },
];

const whyChooseUs = [
  "Multiple car services under one roof",
  "Convenient Township location for local customers",
  "Clear discussion about repair requirements",
  "Practical and dependable maintenance solutions",
  "Friendly customer support",
  "Communication before additional repair work",
];

const steps = [
  { title: "Contact Us", description: "Reach out by phone or WhatsApp to explain your vehicle issue or service requirement." },
  { title: "Explain Your Vehicle Problem", description: "Share the symptoms, warning signs or concerns so the workshop can understand the problem clearly." },
  { title: "Visit Our Workshop for Inspection and Service", description: "Bring the vehicle in for inspection and practical repair or maintenance support." },
];

export default function Home() {
  const structuredData = [buildLocalBusinessSchema(), buildWebSiteSchema()];
  const phoneHref = getPhoneHref();
  const whatsAppHref = getWhatsAppHref();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="bg-[#142536] pb-14 pt-8 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pb-12 lg:pt-12">
          <div className="flex flex-col justify-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-[#f39a32]">{business.tagline}</p>
            <h1 className="max-w-xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              Car Repair & Maintenance in Township, Lahore
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-200">
              {business.name} provides practical car repair and maintenance services in Township, Lahore.
              From engine repairs and car AC servicing to denting, painting and electrical work, we help everyday car
              owners maintain their vehicles with convenient local service. We welcome familiar daily drivers such as
              Suzuki Alto, Cultus and Wagon R, Honda City and Civic, and Toyota Corolla and Yaris.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f39a32] px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_15px_35px_rgba(243,154,50,0.2)] transition hover:bg-[#e38f28]">
                Book Your Service
              </Link>
              <a href={phoneHref ?? "/contact"} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                <Phone className="h-4 w-4" />
                Call Now
              </a>
              <a href={whatsAppHref} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                <MessageCircle className="h-4 w-4" />
                WhatsApp Us
              </a>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <p className="text-2xl font-black text-[#f39a32]">Local</p>
                <p className="mt-1 text-sm text-slate-200">Township workshop</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <p className="text-2xl font-black text-[#f39a32]">Practical</p>
                <p className="mt-1 text-sm text-slate-200">Repair solutions</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <p className="text-2xl font-black text-[#f39a32]">Reliable</p>
                <p className="mt-1 text-sm text-slate-200">Friendly support</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-[#f39a32]/20 to-transparent blur-3xl" />
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-2 shadow-[0_30px_80px_rgba(20,37,54,0.35)]">
              <figure>
                <Image
                  src="/images/under-car-inspection.jpg"
                  alt="Representative stock photo of a mechanic inspecting a car on a workshop lift."
                  width={1600}
                  height={900}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  fetchPriority="high"
                  className="h-[560px] w-full rounded-[1.5rem] object-cover"
                />
                {/* <figcaption className="px-3 pb-2 pt-3 text-xs text-slate-300">
                  Representative stock photography; this is not a photo of our workshop.
                </figcaption> */}
              </figure>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="services"
          title="Complete Car Repair Services in Township, Lahore"
          description="From regular maintenance to body and electrical repair, our workshop covers the practical needs of local drivers and their everyday vehicles."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featuredServices.map((service) => (
            <article key={service.slug} className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_20px_50px_rgba(20,37,54,0.04)] transition hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(20,37,54,0.08)]">
              <Image
                src={service.image}
                alt={service.imageAlt}
                width={1200}
                height={800}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                className="h-52 w-full object-cover"
              />
              <div className="space-y-4 p-5">
                <div>
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#f39a32]">{service.highlight}</p>
                  <h3 className="text-2xl font-bold tracking-tight text-slate-900">{service.name}</h3>
                </div>
                <p className="text-sm leading-7 text-slate-600">{service.shortDescription}</p>
                <Link href={`/services/${service.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-[#142536] hover:text-[#f39a32]">
                  Learn More About {service.name} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <OwnerProfile />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="why choose us"
          title={`Why Choose ${business.name}?`}
          description="We focus on practical, dependable support that makes it easier for local car owners to get the repair and maintenance work their vehicles need."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {whyChooseUs.map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_20px_50px_rgba(20,37,54,0.04)]">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#f39a32]" />
              <p className="text-base text-slate-700">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#142536] py-16  text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
          <SectionHeading
            eyebrow="process"
            title="How to Get Your Car Serviced"
            description="A simple three-step process designed to make the service inquiry and inspection easy for local customers."
            align="center"
            onDarkBackground
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.title} className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#f39a32] text-base font-black text-slate-950">
                  {index + 1}
                </div>
                <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                <p className="mt-4 text-base leading-7 text-slate-200">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="gallery"
          title="Inside Our Car Repair Workshop"
          description="Examples of the hands-on repair and maintenance work involved in keeping everyday cars running safely and smoothly."
        />
        <p className="mt-4 text-sm text-slate-500">
          These are representative stock photos, not photographs of {business.name}.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {services.slice(0, 4).map((service) => (
            <div key={service.slug} className="overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-[0_20px_50px_rgba(20,37,54,0.04)]">
              <Image src={service.image} alt={service.imageAlt} width={1200} height={800} sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw" className="h-64 w-full object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-bold text-slate-900">{service.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="location"
            title={`Visit ${business.name} in Township, Lahore`}
            description="We are conveniently located for local car owners looking for trustworthy repair, service and maintenance support."
          />
          <div className="mt-12 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(20,37,54,0.04)] lg:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f39a32]">Workshop Location</p>
                <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">Township, Lahore, Pakistan</h3>
                <p className="mt-4 text-base leading-7 text-slate-600">
                  {business.address}.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={getDirectionHref()} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full bg-[#f39a32] px-5 py-3 text-sm font-semibold text-slate-950">
                    Get Directions
                  </a>
                  <a href={phoneHref ?? "/contact"} className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-900">
                    Call Now
                  </a>
                </div>
              </div>
              <div className="overflow-hidden rounded-[1.6rem] border border-slate-200 bg-slate-100">
                <Image
                  src="/images/workshop-inspection.jpg"
                  alt="Representative stock photo of a mechanic inspecting a vehicle in a workshop."
                  width={1400}
                  height={900}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="h-full min-h-[280px] w-full object-cover"
                />
                <p className="px-4 pb-3 pt-2 text-xs text-slate-500">
                  Representative stock photography; this is not a photo of our workshop.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="faq"
          title="Frequently Asked Questions About Car Repair"
          description="Helpful answers for local customers looking for practical service questions before visiting the workshop."
        />

        <div className="mt-12 space-y-5">
          {faqs.map((item) => (
            <div key={item.question} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_20px_50px_rgba(20,37,54,0.04)]">
              <h3 className="text-lg font-semibold text-slate-900">{item.question}</h3>
              <p className="mt-2 text-base leading-7 text-slate-600">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#142536] py-16 text-white">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#f39a32]">Workshop support</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">Need Reliable Car Repair in Township, Lahore?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-200">
            Get in touch with {business.name} to discuss your vehicle repair and maintenance requirements.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={phoneHref ?? "/contact"} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f39a32] px-5 py-3 text-sm font-semibold text-slate-950">Call Now</a>
            <a href={whatsAppHref} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white">WhatsApp Us</a>
            <a href={getDirectionHref()} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white">Get Directions</a>
          </div>
        </div>
      </section>
    </>
  );
}
