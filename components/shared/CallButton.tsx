import { Phone } from "lucide-react";
import { business, getPhoneHref } from "@/lib/business";
import { Button } from "@/components/shared/Button";

export function CallButton({ className = "" }: { className?: string }) {
  const href = getPhoneHref();

  if (!href) {
    return null;
  }

  return (
    <Button href={href} variant="primary" className={`${className} gap-2`} ariaLabel={`Call ${business.name}`}>
      <Phone className="h-4 w-4" />
      Call Now
    </Button>
  );
}
