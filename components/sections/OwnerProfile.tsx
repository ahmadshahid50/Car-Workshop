import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Gauge, MapPin, MessageCircle, Wrench, type LucideIcon } from "lucide-react";
import { business } from "@/lib/business";

type OwnerProfileProps = {
  headingLevel?: "h1" | "h2";
};

const highlights: { icon: LucideIcon; label: string }[] = [
  { icon: Wrench, label: "30+ Years of Automotive Experience" },
  { icon: Gauge, label: "Complete Car Repair Services" },
  { icon: MessageCircle, label: "Customer-Focused Approach" },
  { icon: CheckCircle2, label: "Reliable and Affordable Solutions" },
];

export function OwnerProfile({ headingLevel = "h2" }: OwnerProfileProps) {
  const Heading = headingLevel;

  return (
    <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(20,37,54,0.08)]">
      <div className="grid lg:grid-cols-[0.88fr_1.12fr]">
        <figure className="relative min-h-[440px] bg-[#142536] sm:min-h-[560px]">
          <Image
            src="/images/workshop-owner.jpg"
            alt={`Portrait of the owner of ${business.name} in an automotive workshop.`}
            width={520}
            height={768}
            className="absolute inset-0 h-full w-full object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 42vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#142536]/70 via-transparent to-transparent" aria-hidden="true" />
          <figcaption className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/20 bg-[#142536]/85 px-4 py-3 text-sm font-medium text-white backdrop-blur-sm">
            Founder and owner of {business.name}
          </figcaption>
        </figure>

        <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#c96c08]">Founder &amp; Owner</p>
          <Heading className="mt-3 text-3xl font-black leading-tight tracking-tight text-[#142536] sm:text-4xl">
            A Trusted Name in Car Repair for Over 30 Years
          </Heading>

          <div className="mt-6 inline-flex w-fit items-center gap-3 rounded-2xl bg-[#142536] px-5 py-3 text-white shadow-lg shadow-slate-200">
            <span className="text-4xl font-black leading-none text-[#f39a32]">30+</span>
            <span className="max-w-28 text-sm font-semibold leading-5">Years of Experience</span>
          </div>

          <p className="mt-6 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            The owner has run {business.name} for more than 30 years, bringing hands-on experience,
            a passion for automotive repair, and a lasting commitment to customers. Based in Township, Lahore,
            Pakistan, the workshop helps everyday drivers find reliable and affordable repair and maintenance
            solutions.
          </p>

          <p className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#142536]">
            <MapPin className="h-4 w-4 text-[#c96c08]" aria-hidden="true" />
            Township, Lahore, Pakistan
          </p>

          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {highlights.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#c96c08]" aria-hidden="true" />
                <span className="text-sm font-semibold leading-6 text-slate-800">{label}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-[#f39a32] px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-[#e38f28]">
              Book Your Service
            </Link>
            <Link href="/services" className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-bold text-[#142536] transition hover:bg-slate-50">
              Explore Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
