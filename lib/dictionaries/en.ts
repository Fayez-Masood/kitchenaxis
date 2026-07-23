import { site } from "@/lib/site";

const R = site.responseHours;

export const en = {
  dir: "ltr",
  meta: {
    title: "Commercial Kitchen Repair & Maintenance | KitchenAxis KSA",
    description:
      "Fast repair, maintenance & installation for commercial kitchens across Saudi Arabia. 24/7 emergency, 2-hour response, certified techs & AMC plans.",
  },
  nav: {
    services: "Services",
    amc: "Maintenance Plans",
    industries: "Who We Serve",
    coverage: "Coverage",
    about: "About",
    contact: "Contact",
    getQuote: "Get a Free Quote",
    emergency: "Emergency",
  },
  langToggle: { target: "العربية", aria: "التغيير إلى العربية" },
  hero: {
    eyebrow: "Commercial kitchen specialists · Saudi Arabia",
    titleLead: "Commercial kitchens",
    titleAccent: "don’t get downtime.",
    titleTail: "",
    subtitle:
      "Installation, preventive maintenance and rapid repairs for restaurants, hotels, cafés and central kitchens across Saudi Arabia.",
    ctaPrimary: "Request service",
    ctaSecondary: "Call now",
    trust: [
      "Certified technicians",
      `${R}-hour emergency response`,
      "Warranty-backed work",
    ],
  },
  emergency: {
    label: "Equipment down?",
    text: `We respond within ${R} hours across the Kingdom.`,
    call: "Call now",
    whatsapp: "WhatsApp us",
    whatsappMsg: "Hi KitchenAxis, my kitchen equipment needs urgent service.",
  },
  services: {
    eyebrow: "Our Services",
    title: "Everything your kitchen needs to run",
    intro:
      "From a single fryer to a full commissioning, one accountable partner for repair, maintenance, and installation.",
    learnMore: "Learn more",
    items: {
      cooking: {
        title: "Cooking Equipment Repair",
        desc: "Gas & electric ranges, fryers, griddles, ovens, bakery equipment, and commercial dishwashers.",
      },
      refrigeration: {
        title: "Refrigeration & Cold Rooms",
        desc: "Walk-in chillers & freezers, commercial refrigerators, and deep freezers — diagnosed and restored fast.",
      },
      beverage: {
        title: "Coffee & Beverage Equipment",
        desc: "Espresso machines, grinders, ice-cream machines, and juice dispensers serviced to spec.",
      },
      installation: {
        title: "Installation & Commissioning",
        desc: "Professional installation, alignment, and safe commissioning of new kitchen lines and equipment.",
      },
      amc: {
        title: "Annual Maintenance Contracts",
        desc: "Scheduled preventive maintenance that extends equipment life and prevents breakdowns before they happen.",
      },
      emergency: {
        title: "24/7 Emergency Callout",
        desc: `Round-the-clock rapid response when equipment fails mid-service — technician within ${R} hours.`,
      },
    },
  },
  why: {
    eyebrow: "Why KitchenAxis",
    title: "Honest service, technical excellence",
    intro:
      "We reduce downtime, ensure safety, and extend the life of your equipment through accurate diagnosis and quality repairs.",
    points: {
      certified: {
        title: "Trained, certified technicians",
        desc: "Accurate fault diagnosis and quality repairs by specialists who know your equipment.",
      },
      response: {
        title: "Guaranteed fast response",
        desc: `A technician responds within ${R} hours for emergencies — because every hour of downtime costs you covers and revenue.`,
      },
      parts: {
        title: "Genuine spare parts",
        desc: "We fit genuine parts and stock common components to get you back online sooner.",
      },
      warranty: {
        title: "Warranty-backed workmanship",
        desc: "Transparent quotes with no call-out surprises, and a warranty on the work we do.",
      },
    },
    stats: {
      years: { label: "Years of experience", suffix: "+" },
      kitchens: { label: "Kitchens served", suffix: "+" },
      response: { label: "Hour response", suffix: "h" },
      support: { label: "Emergency support", value: "24/7", suffix: "" },
    },
  },
  gallery: {
    eyebrow: "Real Work · Real Kitchens",
    title: "Seen on the job across the Kingdom",
    intro:
      "No stock photos — every image is our own technicians servicing real commercial kitchen equipment on site.",
    note: "A selection from recent service visits. Hover to see any job in full detail.",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Answers before you call",
    items: [
      {
        q: "How fast can you reach my kitchen in an emergency?",
        a: `For emergencies we aim to have a technician on the way within ${R} hours across Riyadh, Jeddah, Dammam, Makkah and Madinah. Calling or WhatsApp is always the fastest route.`,
      },
      {
        q: "Which cities do you cover?",
        a: "We serve commercial kitchens across Saudi Arabia, with technicians in Riyadh, Jeddah, Dammam, Makkah and Madinah. Elsewhere in the Kingdom? Ask us — we often cover surrounding areas.",
      },
      {
        q: "What types of equipment do you repair?",
        a: "Cooking lines (ranges, fryers, griddles, ovens, salamanders), refrigeration and cold rooms, dishwashers, bakery ovens, espresso and beverage machines, ice and ice-cream makers, and more.",
      },
      {
        q: "Which brands do you service?",
        a: "Our technicians work across all major commercial kitchen brands — including Rational, Electrolux, Hobart, Winterhalter, Williams, Foster and La Marzocco. Tell us your model and we'll confirm.",
      },
      {
        q: "Do you offer a warranty on repairs?",
        a: "Yes. Every repair comes with a written workmanship warranty, and we fit genuine spare parts wherever possible.",
      },
      {
        q: "How much does an Annual Maintenance Contract cost?",
        a: "AMC pricing depends on your equipment count, kitchen type and number of sites. We build a plan around your needs and give you a fixed, predictable annual price — request a free quote.",
      },
      {
        q: "Do you charge a call-out fee?",
        a: "We give you a transparent quote before any work begins — no hidden call-out surprises. Any inspection or diagnostic fee is disclosed upfront.",
      },
      {
        q: "Can you handle multiple branches under one contract?",
        a: "Yes. Our Enterprise plan covers all your sites under a single contract, one point of contact, and consolidated reporting.",
      },
    ],
  },
  industries: {
    eyebrow: "Who We Serve",
    title: "Trusted across the hospitality & care sectors",
    intro:
      "One reliable partner for every commercial kitchen — from a neighbourhood café to a hospital catering line.",
    items: {
      restaurants: "Restaurants",
      hotels: "Hotels",
      cafes: "Cafés",
      bakeries: "Bakeries",
      hospitals: "Hospitals",
      catering: "Catering",
    },
  },
  process: {
    eyebrow: "How It Works",
    title: "From breakdown to back-in-service, fast",
    intro: "A clear, accountable process every time you call us.",
    steps: {
      book: {
        title: "Book",
        desc: "Call, WhatsApp, or request a visit online. Tell us the equipment and your city.",
      },
      diagnose: {
        title: "Diagnose",
        desc: "A certified technician inspects on-site and gives you a transparent quote.",
      },
      service: {
        title: "Service",
        desc: "We repair, maintain, or install using genuine parts and safe procedures.",
      },
      report: {
        title: "Report & Warranty",
        desc: "You get a service report, recommendations, and a warranty on the work.",
      },
    },
  },
  amc: {
    eyebrow: "Maintenance Plans",
    title: "Prevent breakdowns before they start",
    intro:
      "Annual Maintenance Contracts keep your equipment compliant, safe, and running — with priority response when you need us.",
    popular: "Most Popular",
    cta: "Request this plan",
    contactCta: "Talk to us",
    perVisit: "per visit",
    custom: "Custom",
    plans: {
      basic: {
        name: "Essential",
        priceNote: "Scheduled preventive visits",
        features: [
          "Quarterly preventive maintenance",
          "Priority booking",
          "Genuine parts (billed separately)",
          "Service report each visit",
        ],
      },
      pro: {
        name: "Professional",
        priceNote: "Best for busy kitchens",
        features: [
          "Monthly preventive maintenance",
          `Emergency response within ${R} hours`,
          "Discounted parts & labour",
          "Dedicated account contact",
          "Compliance & safety checks",
        ],
      },
      enterprise: {
        name: "Enterprise",
        priceNote: "Multi-site & institutional",
        features: [
          "Tailored maintenance schedule",
          "Coverage across all your branches",
          "24/7 guaranteed SLA",
          "Full documentation & reporting",
          "Single point of contact",
        ],
      },
    },
  },
  testimonials: {
    eyebrow: "Client Voices",
    title: "Kitchens that count on us",
    items: {
      one: {
        quote:
          "Our fryer failed mid-service and a technician arrived the same day. Fast, professional, and fairly priced.",
        name: "Operations Manager",
        role: "Restaurant Group",
        company: "Riyadh",
      },
      two: {
        quote:
          "The AMC has cut our breakdowns dramatically. We finally have a maintenance partner we can rely on.",
        name: "Facilities Manager",
        role: "Hotel",
        company: "Jeddah",
      },
      three: {
        quote:
          "Cold room back online within hours — they understood how critical uptime is for our catering line.",
        name: "F&B Manager",
        role: "Catering Company",
        company: "Dammam",
      },
    },
    disclaimer: "Sample testimonials — replace with real, attributed client quotes before launch.",
  },
  contact: {
    eyebrow: "Get in touch",
    title: "Ready to keep your kitchen running?",
    subtitle:
      "Request a free quote or book a service visit. For emergencies, call or WhatsApp us for the fastest response.",
    call: "Call us",
    whatsapp: "WhatsApp",
    orFill: "Or send us your details",
  },
  form: {
    name: "Full name",
    namePh: "e.g. Ahmed Al-Otaibi",
    phone: "Phone number",
    phonePh: "5X XXX XXXX",
    email: "Email (optional)",
    emailPh: "you@company.com",
    company: "Business name (optional)",
    companyPh: "Your restaurant / hotel / café",
    service: "What do you need?",
    serviceSelect: "Select a service",
    city: "City",
    citySelect: "Select your city",
    message: "Message (optional)",
    messagePh: "Tell us about the equipment and the issue…",
    urgency: "How urgent is it?",
    emergency: "Emergency",
    scheduled: "Scheduled",
    preferredDate: "Preferred date",
    submit: "Send request",
    submitting: "Sending…",
    successTitle: "Request received",
    successBody: `Thank you — a KitchenAxis specialist will reach out shortly. For faster help, message us on WhatsApp.`,
    errorTitle: "Something went wrong",
    errorBody: "Please try again, or call us directly.",
    required: "required",
    consent: "I agree to be contacted by KitchenAxis about my request.",
    reassure: "No obligation. We usually reply within minutes during working hours.",
  },
  cs: {
    launcher: "CS+ support",
    launcherLabel: "Need help?",
    headerTitle: "KitchenAxis Support",
    headerSub: "Booking & inquiries · powered by CS+",
    poweredBy: "Powered by CS+",
    back: "Back",
    close: "Close",
    intentPrompt: "How can we help today?",
    intents: {
      schedule: "Book a Service Visit",
      emergency: "Emergency Repair",
      quote: "Request a Quote",
      question: "Ask a Question",
    },
    intentDesc: {
      schedule: "Plan a maintenance or repair visit",
      emergency: "Equipment down — need help now",
      quote: "Pricing for a job or AMC",
      question: "General inquiry",
    },
    emergencyBanner: "For emergencies, calling is fastest:",
    callNow: "Call now",
    whatsapp: "WhatsApp",
    detailsPrompt: "A few details",
    contactPrompt: "Where can we reach you?",
    next: "Continue",
    submit: "Send request",
    submitting: "Sending…",
    successTitle: "Thank you!",
    successBody: `We've received your request. A specialist will contact you${""} shortly — or message us on WhatsApp for faster help.`,
    successRef: "Reference",
    newRequest: "Start a new request",
    stepOf: "Step {n} of {total}",
  },
  callback: {
    tab: "Request a callback",
    title: "Prefer we call you?",
    desc: "Leave your number and we'll call you back — no obligation.",
    submit: "Call me back",
    success: "Got it — we'll call you shortly.",
  },
  footer: {
    blurb:
      "Commercial kitchen equipment repair, maintenance, and installation across Saudi Arabia. Equipment · Service · Excellence.",
    colServices: "Services",
    colCompany: "Company",
    colContact: "Contact",
    coverageTitle: "Coverage",
    hours: "Sat–Thu, 8am–8pm · 24/7 emergency line",
    rights: "All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    crLabel: "CR No.",
    vatLabel: "VAT No.",
    tagline: "Equipment · Service · Excellence",
  },
};

export type Dictionary = typeof en;
