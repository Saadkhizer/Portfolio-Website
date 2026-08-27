import { PROFILE, whatsappLink } from "@/data/site";

/* Only channels that are actually configured are rendered — a footer full of
   links that go nowhere reads worse than a short one. */
function socials() {
  const whatsapp = whatsappLink();
  return [
    { label: "Email", href: `mailto:${PROFILE.email}` },
    whatsapp && { label: "WhatsApp", href: whatsapp },
    { label: "GitHub", href: PROFILE.github },
    PROFILE.linkedin && { label: "LinkedIn", href: PROFILE.linkedin },
  ].filter(Boolean);
}

export default function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} {PROFILE.name}. Built with Next.js.</p>
        <div className="flex gap-6">
          {socials().map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noreferrer"
              className="transition-colors hover:text-foreground"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
