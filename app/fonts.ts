import { Sora, Inter, Space_Grotesk, IBM_Plex_Sans_Arabic } from "next/font/google";

// Latin display — geometric grotesk ("industrial precision")
export const sora = Sora({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-sora",
  display: "swap",
});

// Latin body — neutral, legible, tabular figures for stats/prices
export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

// CS+ sub-brand typeface — quarantined to the CS+ widget (.cs-scope)
export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

// Arabic — modern engineered geometry that harmonizes with Sora/Inter
export const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-arabic",
  display: "swap",
});

export const fontVariables = [
  sora.variable,
  inter.variable,
  spaceGrotesk.variable,
  plexArabic.variable,
].join(" ");
