export type ServiceFaq = {
  question: string;
  answer: string;
};

export type WorkshopService = {
  slug: string;
  name: string;
  pageHeading: string;
  shortDescription: string;
  description: string;
  commonProblems: string;
  whenToVisit: string;
  maintenanceBenefit: string;
  image: string;
  imageAlt: string;
  highlight: string;
  features: string[];
  faqs: ServiceFaq[];
};

export const services: WorkshopService[] = [
  {
    slug: "car-denting-painting",
    name: "Car Denting & Painting",
    pageHeading: "Car Denting & Painting in Lahore",
    shortDescription: "Bodywork repair and paint finishing to restore your vehicle's appearance and surface quality.",
    description:
      "Our workshop handles dent removal, paint touch-ups and body refinishing for everyday cars after minor damage or wear.",
    commonProblems:
      "Dents, scratches, chipped paint and damaged panels can affect a vehicle's appearance and may need attention after everyday wear or a minor impact.",
    whenToVisit:
      "Arrange an inspection after a scrape or minor collision, or when paint begins to peel. The repair approach depends on the panel and finish condition.",
    maintenanceBenefit:
      "An assessment helps clarify whether the panel needs a touch-up, dent correction or wider refinishing before you decide how to proceed.",
    image: "/images/denting-painting.jpg",
    imageAlt: "Representative stock photo of a mechanic spray painting a car body in a paint booth.",
    highlight: "Body restoration and paint finish",
    features: ["Dent correction", "Paint touch-up", "Panel refinishing", "Surface preparation"],
    faqs: [
      {
        question: "Do you handle small dents and scratches?",
        answer: "Yes, we assess the damage and advise on the best repair approach for your vehicle's condition and budget.",
      },
      {
        question: "Can I get a repair estimate before work starts?",
        answer: "We discuss the issue, the repair scope and expected outcome before proceeding with any bodywork.",
      },
    ],
  },
  {
    slug: "engine-mechanical-repair",
    name: "Engine Repair & Mechanical Work",
    pageHeading: "Engine Repair in Township, Lahore",
    shortDescription: "Practical repair for engine issues, mechanical faults and vehicle performance concerns.",
    description:
      "From rough idling and performance issues to mechanical faults, we help diagnose and service the vehicle components that affect reliability and driving comfort.",
    commonProblems:
      "Rough idling, unusual engine noise, overheating, warning lights and loss of power are common reasons to have the engine or related mechanical systems inspected.",
    whenToVisit:
      "Contact the workshop if a new warning light appears or the vehicle starts running differently. Describe when the symptom occurs to help guide the inspection.",
    maintenanceBenefit:
      "A clear inspection can help identify the source of a mechanical symptom and explain what repair options are appropriate for the vehicle.",
    image: "/images/engine-repair.jpg",
    imageAlt: "Representative stock photo of a mechanic checking an engine beneath an open bonnet.",
    highlight: "Reliable engine and mechanical repair",
    features: ["Engine diagnosis", "Mechanical fault checks", "Performance troubleshooting", "Repair planning"],
    faqs: [
      {
        question: "What signs suggest my engine needs attention?",
        answer: "Warning lights, rough running, overheating, unusual noises, or reduced power are common reasons to inspect the engine.",
      },
      {
        question: "Can I discuss the problem before bringing the car in?",
        answer: "Yes. We encourage customers to explain the vehicle symptoms clearly so we can assess the issue efficiently.",
      },
    ],
  },
  {
    slug: "car-ac-repair",
    name: "Car AC Repair & Maintenance",
    pageHeading: "Car AC Repair in Township, Lahore",
    shortDescription: "Cooling system repair and cabin comfort service for Lahore's hot weather conditions.",
    description:
      "We help keep your vehicle comfortable by checking AC performance, refrigerant flow and related components that affect cooling efficiency.",
    commonProblems:
      "Weak airflow, warm air, unusual smells or noises, and inconsistent cooling can indicate a problem with the air-conditioning system or its related components.",
    whenToVisit:
      "Book an inspection when cooling performance drops or the AC develops a new smell or sound, especially before regular use in Lahore's hot weather.",
    maintenanceBenefit:
      "Checking the system can help locate the cause of poor cooling and clarify which maintenance or repair work is needed.",
    image: "/images/car-ac-controls.jpg",
    imageAlt: "Representative stock photo of a car air conditioning control dial.",
    highlight: "Air conditioning and cooling support",
    features: ["Cooling check", "AC troubleshooting", "Cabin comfort inspection", "System maintenance"],
    faqs: [
      {
        question: "Do you provide AC repair for everyday cars?",
        answer: "Yes, we inspect the air conditioning system and explain the repair needs based on the actual condition of the vehicle.",
      },
      {
        question: "How do I know if my AC needs service?",
        answer: "Weak airflow, warm air, unusual odors or poor cooling are common indicators that the AC system needs attention.",
      },
    ],
  },
  {
    slug: "auto-electrical-services",
    name: "Auto Electrical Services",
    pageHeading: "Auto Electrical Repair in Township, Lahore",
    shortDescription: "Electrical fault diagnosis and repairs for lighting, wiring and vehicle systems.",
    description:
      "Electrical issues can affect comfort, safety and daily usability, so we inspect wiring, battery-related concerns and system faults with practical solutions.",
    commonProblems:
      "Starting difficulties, flickering lights, battery-related concerns and electrical features that work intermittently can point to wiring or system faults.",
    whenToVisit:
      "Arrange an inspection when an electrical feature stops working or a fault returns intermittently. Note which systems are affected and when the issue occurs.",
    maintenanceBenefit:
      "A focused check can narrow down the affected circuit or component and help avoid replacing parts without first understanding the fault.",
    image: "/images/auto-electrical.jpg",
    imageAlt: "Representative stock photo of a mechanic checking a car battery connection with pliers.",
    highlight: "Diagnosis of electrical faults",
    features: ["Wiring inspection", "Lighting checks", "Power system troubleshooting", "Electrical repair planning"],
    faqs: [
      {
        question: "Do you handle electrical problems in old or common cars?",
        answer: "Yes, we assess the issue based on the actual vehicle condition and the symptoms you are facing.",
      },
      {
        question: "Can I bring the car in if the issue is intermittent?",
        answer: "Yes, describing the timing, warning signs and pattern helps us inspect the fault more efficiently.",
      },
    ],
  },
  {
    slug: "suspension-brake-repair",
    name: "Suspension & Brake Repair",
    pageHeading: "Suspension & Brake Repair in Lahore",
    shortDescription: "Vehicle handling and braking support for safer and more comfortable driving.",
    description:
      "Suspension and brake maintenance are essential for road safety, smooth handling and confident driving. We inspect the condition and recommend needed repairs.",
    commonProblems:
      "Squealing, vibration while braking, pulling to one side, a change in pedal feel, uneven tyre wear or a rough ride may need a brake or suspension check.",
    whenToVisit:
      "Arrange an inspection if braking or handling changes, or if you hear a new noise from the wheels or suspension. Avoid ignoring symptoms that affect vehicle control.",
    maintenanceBenefit:
      "Checking these systems helps identify worn or damaged components and gives you clearer information about repairs that affect braking and handling.",
    image: "/images/brake-repair.jpg",
    imageAlt: "Representative stock photo of a mechanic inspecting an exposed car brake disc.",
    highlight: "Safer driving and smoother handling",
    features: ["Brake inspection", "Suspension checks", "Ride comfort assessment", "Road safety review"],
    faqs: [
      {
        question: "How do I know if my brakes need attention?",
        answer: "Squealing, vibration, reduced stopping power and unusual noises can indicate brake-related issues.",
      },
      {
        question: "Do you inspect suspension issues too?",
        answer: "Yes, we check for vehicle wobble, uneven tyre wear or poor ride comfort that may be linked to suspension components.",
      },
    ],
  },
  {
    slug: "car-tuning-maintenance",
    name: "Car Tuning & Maintenance",
    pageHeading: "Car Tuning & Maintenance in Lahore",
    shortDescription: "Performance checks and routine maintenance to keep daily driving reliable and efficient.",
    description:
      "Routine checks and scheduled maintenance help you keep track of your car's condition and everyday service needs.",
    commonProblems:
      "Changes in how the car starts, idles or drives, missed service intervals and unfamiliar warning signs are reasons to review routine maintenance needs.",
    whenToVisit:
      "Plan a service according to the vehicle manufacturer's schedule, or arrange a check when the car's everyday performance changes.",
    maintenanceBenefit:
      "Regular checks help you keep track of the vehicle's condition and address maintenance needs before they become harder to assess.",
    image: "/images/under-car-inspection.jpg",
    imageAlt: "Representative stock photo of a mechanic inspecting a car on a workshop lift.",
    highlight: "Better performance and day-to-day reliability",
    features: ["Routine tuning", "Maintenance planning", "Drive quality review", "Performance checks"],
    faqs: [
      {
        question: "What does tuning involve?",
        answer: "It can include inspection and adjustment of systems that influence drivability, performance and smooth operation.",
      },
      {
        question: "Why is regular maintenance important?",
        answer: "Routine care helps prevent bigger repair issues and supports steadier long-term vehicle performance.",
      },
    ],
  },
  {
    slug: "computerized-car-diagnostics",
    name: "Computerized Car Diagnostics",
    pageHeading: "Car Diagnostics in Township, Lahore",
    shortDescription: "Modern vehicle inspection to identify faults using diagnostic tools and system checks.",
    description:
      "Computerized diagnostics help inspect electronic and engine systems in a structured way so the actual issue can be traced with greater clarity.",
    commonProblems:
      "Dashboard warning lights, intermittent electronic faults, rough performance and unexplained changes in the way the car runs can warrant diagnostic checks.",
    whenToVisit:
      "Request diagnostics when a warning light appears or an electronic or engine symptom persists. A scan is one part of inspection and may need follow-up checks.",
    maintenanceBenefit:
      "Diagnostic information can help narrow the inspection and guide further checks, rather than relying on a warning light alone to identify the cause.",
    image: "/images/computerized-diagnostics.jpg",
    imageAlt: "Representative stock photo of a mechanic using a diagnostic scanner beside a car.",
    highlight: "Precise fault identification",
    features: ["System scans", "Fault tracing", "Electronic checks", "Vehicle health review"],
    faqs: [
      {
        question: "Why are diagnostics useful?",
        answer: "They help pinpoint the root cause of warning lights, rough performance or intermittent faults before major repair work begins.",
      },
      {
        question: "Can diagnostics help with unusual engine or electrical issues?",
        answer: "Yes, it is often the quickest way to narrow down the actual problem affecting the vehicle's systems.",
      },
    ],
  },
  {
    slug: "oil-change-general-servicing",
    name: "Oil Change & General Servicing",
    pageHeading: "Oil Change & Car Servicing in Township, Lahore",
    shortDescription: "Routine maintenance to keep your car clean, lubricated and running smoothly.",
    description:
      "Regular servicing is a practical way to maintain engine health, reduce wear and keep everyday driving dependable across the seasons.",
    commonProblems:
      "An overdue service, low oil level or a reminder on the dashboard are reasons to check the vehicle's maintenance schedule and condition.",
    whenToVisit:
      "Follow the service interval in your owner's manual and arrange an oil change when it is due. Driving conditions and vehicle requirements can affect the schedule.",
    maintenanceBenefit:
      "Routine servicing provides an opportunity to check basic maintenance items and keep records of work completed on the vehicle.",
    image: "/images/oil-change.jpg",
    imageAlt: "Representative stock photo of engine oil being poured into a vehicle engine.",
    highlight: "Essential routine upkeep",
    features: ["Oil change", "General servicing", "Basic checks", "Daily reliability support"],
    faqs: [
      {
        question: "How often should I service my car?",
        answer: "Service intervals depend on vehicle condition, usage and the manufacturer's guidance, but routine upkeep is recommended to stay on top of maintenance needs.",
      },
      {
        question: "Do you provide general checks along with oil change service?",
        answer: "Yes, general servicing often includes a review of the key systems that support safe and dependable daily driving.",
      },
    ],
  },
];

export const servicesBySlug = Object.fromEntries(
  services.map((service) => [service.slug, service]),
) as Record<string, WorkshopService>;

export const featuredServices = services.slice(0, 4);
