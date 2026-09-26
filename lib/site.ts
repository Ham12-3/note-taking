/**
 * Brand config. Change the product name here and it updates everywhere.
 */
export const site = {
  name: "Notewell",
  // Used in <title>, OG tags, and the footer.
  tagline: "The AI notetaker for Google Meet",
  description:
    "Notewell joins your Google Meet calls, transcribes them live, and sends a clean summary with action items and decisions the moment the call ends.",
  url: "https://example.com", // TODO: replace with your production domain
  year: new Date().getFullYear(),
} as const;

export const NAME = site.name;
