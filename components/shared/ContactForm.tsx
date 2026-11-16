"use client";

import { type FormEvent, useState } from "react";
import { ArrowUpRight, Send } from "lucide-react";
import { getWhatsAppHref } from "@/lib/business";

const initialState = {
  name: "",
  phone: "",
  vehicle: "",
  service: "",
  description: "",
};

export function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("");

  const handleChange = (field: keyof typeof initialState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (!form.name.trim()) nextErrors.name = "Please enter your name.";
    if (!form.phone.trim()) nextErrors.phone = "Please enter your phone number.";
    if (!form.vehicle.trim()) nextErrors.vehicle = "Please enter your vehicle make and model.";
    if (!form.service.trim()) nextErrors.service = "Please select a service.";
    if (!form.description.trim()) nextErrors.description = "Please tell us about your vehicle problem.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    const message = [
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Vehicle: ${form.vehicle}`,
      `Service: ${form.service}`,
      `Problem: ${form.description}`,
    ].join("\n");

    const href = getWhatsAppHref(message);
    window.open(href, "_blank", "noopener,noreferrer");
    setStatus("Your inquiry is prepared in WhatsApp. Please send it to continue the discussion.");
    setForm(initialState);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_18px_45px_rgba(20,37,54,0.06)] sm:p-8">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900">Send a car repair inquiry</h2>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Customer Name</span>
          <input
            type="text"
            value={form.name}
            onChange={(event) => handleChange("name", event.target.value)}
            autoComplete="name"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-900 focus:border-[#f39a32] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#142536]"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            placeholder="Your full name"
          />
          {errors.name ? <span id="name-error" className="mt-2 block text-xs text-red-600">{errors.name}</span> : null}
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Phone Number</span>
          <input
            type="tel"
            value={form.phone}
            onChange={(event) => handleChange("phone", event.target.value)}
            autoComplete="tel"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-900 focus:border-[#f39a32] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#142536]"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            placeholder="03xx xxxxxxx"
          />
          {errors.phone ? <span id="phone-error" className="mt-2 block text-xs text-red-600">{errors.phone}</span> : null}
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Vehicle Make and Model</span>
          <input
            type="text"
            value={form.vehicle}
            onChange={(event) => handleChange("vehicle", event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-900 focus:border-[#f39a32] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#142536]"
            aria-invalid={Boolean(errors.vehicle)}
            aria-describedby={errors.vehicle ? "vehicle-error" : undefined}
            placeholder="Honda Civic, Suzuki Alto, Toyota Corolla"
          />
          {errors.vehicle ? <span id="vehicle-error" className="mt-2 block text-xs text-red-600">{errors.vehicle}</span> : null}
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Required Service</span>
          <select
            value={form.service}
            onChange={(event) => handleChange("service", event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-900 focus:border-[#f39a32] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#142536]"
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? "service-error" : undefined}
          >
            <option value="">Select a service</option>
            <option value="Car Denting & Painting">Car Denting & Painting</option>
            <option value="Engine Repair & Mechanical Work">Engine Repair & Mechanical Work</option>
            <option value="Car AC Repair & Maintenance">Car AC Repair & Maintenance</option>
            <option value="Auto Electrical Services">Auto Electrical Services</option>
            <option value="Suspension & Brake Repair">Suspension & Brake Repair</option>
            <option value="Car Tuning & Maintenance">Car Tuning & Maintenance</option>
            <option value="Computerized Car Diagnostics">Computerized Car Diagnostics</option>
            <option value="Oil Change & General Servicing">Oil Change & General Servicing</option>
          </select>
          {errors.service ? <span id="service-error" className="mt-2 block text-xs text-red-600">{errors.service}</span> : null}
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-slate-700">Description of Vehicle Problem</span>
        <textarea
          value={form.description}
          onChange={(event) => handleChange("description", event.target.value)}
          rows={5}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-900 focus:border-[#f39a32] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#142536]"
          aria-invalid={Boolean(errors.description)}
          aria-describedby={errors.description ? "description-error" : undefined}
          placeholder="Please describe the sounds, warning lights, leaks, AC issue, or repair concern."
        />
        {errors.description ? <span id="description-error" className="mt-2 block text-xs text-red-600">{errors.description}</span> : null}
      </label>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f39a32] px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_10px_30px_rgba(243,154,50,0.2)] transition hover:bg-[#e38f28]"
        >
          Send Inquiry
          <Send className="h-4 w-4" />
        </button>
        <div className="text-sm text-slate-600" aria-live="polite">{status || "We will help you continue the conversation over WhatsApp."}</div>
      </div>

      <div className="rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
        Need quick help? <a href={getWhatsAppHref()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-medium text-[#142536] underline-offset-4 hover:underline">Open WhatsApp <ArrowUpRight className="h-4 w-4" /></a>
      </div>
    </form>
  );
}
