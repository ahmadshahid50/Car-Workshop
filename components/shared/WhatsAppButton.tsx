import { MessageCircleMore } from "lucide-react";
import { business, getWhatsAppHref } from "@/lib/business";
import { Button } from "@/components/shared/Button";

export function WhatsAppButton({ className = "" }: { className?: string }) {
  const href = getWhatsAppHref();

  return (
    <Button href={href} target="_blank" rel="noreferrer" variant="dark" className={`${className} gap-2`} ariaLabel={`Message ${business.name} on WhatsApp`}>
      <MessageCircleMore className="h-4 w-4" />
      WhatsApp
    </Button>
  );
}
