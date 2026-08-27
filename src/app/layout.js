import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AmbientBackground from "@/components/AmbientBackground";
import ParticleField from "@/components/motion/ParticleField";

/* Deliberately no next/font/google here — see references/critical-fixes.md.
   Fetching a font from Google during compilation makes the dev server stall
   on any network that can't reach fonts.googleapis.com quickly. System fonts
   need nothing from the network and render instantly. If a brand typeface is
   required, use next/font/local with font files committed to the repo. */

export const metadata = {
  title: {
    default: "Saad Khizer — Full-Stack Web Developer",
    template: "%s · Saad Khizer",
  },
  description:
    "Full-stack web developer in Islamabad. I build business websites, ordering platforms and admin dashboards with React, Next.js, Node and Express — and deploy them.",
};

/* themeColor matches --background / the dark variant so mobile browser
   chrome blends with the page. maximumScale intentionally left alone —
   locking zoom breaks accessibility. */
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F6F4F0" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0C0E" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <AmbientBackground />
        {/* Fixed behind every section rather than scoped to the hero, so the
            constellation continues down the whole page instead of stopping
            abruptly at the fold. */}
        <ParticleField className="fixed inset-0 -z-10" />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
