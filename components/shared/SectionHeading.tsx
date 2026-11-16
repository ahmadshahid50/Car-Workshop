type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  onDarkBackground?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  onDarkBackground = false,
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#f39a32]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl ${onDarkBackground ? "text-white" : "text-slate-900"}`}>{title}</h2>
      {description ? (
        <p className={`mt-4 text-base leading-7 ${onDarkBackground ? "text-white" : "text-slate-600"}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
