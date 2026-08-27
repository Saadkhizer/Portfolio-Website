import Link from "next/link";

const NAV = [
  { href: "/#services", label: "Services" },
  { href: "/#work", label: "Work" },
  { href: "/#stack", label: "Stack" },
  { href: "/#about", label: "About" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="font-mono text-sm font-semibold tracking-tight">
          saad khizer
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-muted sm:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/#contact"
          className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
        >
          Let&apos;s talk
        </Link>
      </div>
    </header>
  );
}
