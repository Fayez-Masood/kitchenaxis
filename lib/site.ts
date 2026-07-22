/**
 * KitchenAxis — single source of truth for contact details & key figures.
 * ⚠️ Replace every value marked TODO with the client's real, verified data
 * before launch. The response-time SLA is reused across hero, emergency strip,
 * and CS+ success copy, so changing it here changes it everywhere.
 */
export const site = {
  name: "KitchenAxis",
  domain: "kitchenaxis.co",
  url: "https://kitchenaxis.co",

  // --- Contact (TODO: confirm real numbers) -------------------------------
  phone: "+966500377309", // dial format (E.164)
  phoneDisplay: "+966 50 037 7309",
  whatsapp: "966554550052", // digits only, country code, no +  (for wa.me links)
  email: "info@kitchenaxis.co",

  // --- Key trust figures (TODO: confirm) ----------------------------------
  responseHours: 2, // "technician response within X hours" — the headline SLA
  yearsExperience: 10,
  kitchensServed: 200,
  citiesCount: 5,

  // Cities covered (TODO: confirm actual coverage)
  cities: ["Riyadh", "Jeddah", "Dammam", "Makkah", "Madinah"],
  citiesAr: ["الرياض", "جدة", "الدمام", "مكة المكرمة", "المدينة المنورة"],

  // Legal / KSA trust signals (TODO: fill in)
  crNumber: "", // Commercial Registration No.
  vatNumber: "", // VAT No.

  social: {
    instagram: "",
    linkedin: "",
    x: "",
  },
} as const;

/** Pre-filled WhatsApp deep link. `text` should already be localized. */
export function whatsappUrl(text: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}
