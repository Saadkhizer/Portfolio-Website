const SOCIALS = [
  { label: "Email", href: "mailto:saadkhizer9@gmail.com" },
  { label: "GitHub", href: "https://github.com/Saadkhizer" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} Saad Khizer. Built with Next.js.</p>
        <div className="flex gap-6">
          {SOCIALS.map((social) => (
            <a key={social.label} href={social.href} className="transition-colors hover:text-foreground">
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
