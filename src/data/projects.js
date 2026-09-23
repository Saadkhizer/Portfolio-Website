/**
 * Portfolio project data.
 *
 * Single source of truth for both the homepage "Selected work" grid and the
 * /work/[slug] case-study pages. Adding a project = adding one object here.
 * No CMS yet on purpose — content lives in the repo until there's enough of
 * it to justify a database.
 */

export const PROJECTS = [
  {
    slug: "sheen",
    name: "Sheen",
    tagline: "Shawarma ordering demo with a scroll-flight hero",
    context: "Client demo build for a shawarma restaurant in Bahria Enclave, Islamabad",
    year: "2026",
    summary:
      "A branded ordering site for a shawarma restaurant: a scroll-scrubbed cinematic hero, a 37-item menu with search and categories, per-wrap customization, and a checkout that hands the order to WhatsApp. Ordering and payment are deliberately not connected — this is the site the owner sees before deciding to build the real one.",
    tech: [
      "Next.js 16",
      "React",
      "Tailwind CSS v4",
      "Framer Motion",
      "Supabase",
      "Playwright",
      "Sharp",
    ],
    image: "/projects/sheen.jpg",
    imageAlt:
      "The Sheen homepage, with the Big On Shawarma headline over a warm evening shot of the restaurant front",
    liveUrl: "https://sheen-restaurant.vercel.app/",
    repoUrl: "https://github.com/Saadkhizer/Sheen-restaurant-",
    highlights: [
      "Scroll-scrubbed camera-flight hero — video legs with poster frames, no cuts",
      "37-item menu with search, categories and a deals section",
      "Per-wrap customization: size, cheese and extras, each priced separately",
      "Cart priced in integer paisa and re-derived from the catalogue on restore",
      "WhatsApp order preview with an explicit copy action — nothing sends itself",
      "Demo receipt at /order/CODE, held for 24 hours in the originating tab only",
      "Native modal semantics throughout: focus restore, scroll lock, Escape to close",
    ],
    challenges: [
      {
        title: "A demo that cannot accidentally take a real order",
        body: "The whole point was to show the owner a working site before any backend exists, which makes an accidental live order the worst possible outcome. Direct server ordering is disabled in the server action itself rather than behind a flag, card payments cannot be switched on by an environment variable, and the production order path exists only as a documented boundary. The demo receipt is a real receipt in every way except that it never leaves the tab it was created in.",
      },
      {
        title: "Money that survives an edited browser",
        body: "Prices stay integer paisa until the moment they are displayed, so no float rounding ever touches a total. The cart persists to localStorage, but on restore every line's product identity and extras are regenerated against the catalogue — a customer who edits their stored cart changes what they ordered, never what it costs.",
      },
      {
        title: "37 MB of menu photography down to 879 KB",
        body: "The menu photos came in at roughly 37 MB, which on a phone on mobile data is not a website at all. A Sharp script generates 1400px WebP copies from the original sources, keeps the originals untouched, and writes the social image and favicons in the same pass. Components use responsive Next Image sizing with selective hero preload and a placeholder for any image that fails.",
      },
      {
        title: "A cinematic hero that does not hijack the page",
        body: "The hero is a scroll-scrubbed camera flight, which is exactly the kind of effect that usually breaks native scrolling and strands anyone on a slow connection. The scrub engine drives pre-rendered video legs from real scroll position rather than taking scroll over, poster frames carry the first paint, and reduced-motion settings drop it to a still. The page heading stays in the markup either way, so the hero is never load-bearing for the content.",
      },
    ],
  },
  {
    slug: "marais",
    name: "MARAIS",
    tagline: "Fashion e-commerce with accounts and a real checkout",
    context: "Own build — a production-grade storefront, front to back",
    year: "2026",
    summary:
      "A fashion storefront: browse the collection, build a cart, and move through a three-step checkout that the server reprices before it will accept the order. Customers get real accounts with order history, and any order can be looked up later from a shared reference link.",
    tech: [
      "React 19",
      "Vite",
      "Tailwind CSS v4",
      "React Router",
      "Express 5",
      "Supabase",
      "PostgreSQL",
    ],
    image: "/projects/marais.jpg",
    imageAlt:
      "The MARAIS storefront, with the Considered essentials, made to last headline above the autumn winter collection",
    liveUrl: "https://marais-shopping-ecommerce.vercel.app/",
    repoUrl: "https://github.com/Saadkhizer/Marais-shopping-Ecommerce",
    highlights: [
      "Storefront with categories, product grid, editorial and lookbook sections",
      "Three-step checkout — contact, shipping, review — validated at every step",
      "Supabase Auth accounts, guarded order history, email confirmation",
      "Order confirmation that works from a shared link, not just after checkout",
      "Row level security with the matching table grants, verified by impersonation",
      "Demo mode with local seed data so the whole flow runs with no database",
    ],
    challenges: [
      {
        title: "The server decides what the order costs",
        body: "The client posts product ids, sizes and quantities and nothing else. Prices, shipping and the total all come back from the database at the moment the order is created. A checkout that accepts a total from the browser is a checkout that accepts a discount from the browser, and that difference is most of what separates a demo store from one a business can take money through.",
      },
      {
        title: "A policy that looks right and still returns permission denied",
        body: "Postgres checks table privileges before it evaluates a row level security policy, so a flawless policy on a table with no GRANT fails with 42501 before the policy ever runs. That cost an evening. The schema now ships create policy and grant select together, and the README shows how to verify by impersonating the anon role rather than by reading the policy and assuming it works.",
      },
      {
        title: "Showing a client the account flow before there is a database",
        body: "Clients want to see sign-in, checkout and order history in the first meeting, which is usually before anyone has provisioned anything. With no keys present the app runs in demo mode against local seed data and an in-memory session, and every screen using it says so on the page. Honest fallbacks beat a broken deploy in front of a client.",
      },
      {
        title: "A React Router app that survives a refresh on /checkout",
        body: "A static host serves files, and there is no file at /checkout, so a refresh there returns a 404 on a site that works perfectly while you click through it. A _redirects file and a vercel.json rewrite hand every path back to the app. It is two small files, and without them the deployed site is broken on every route except the home page.",
      },
    ],
  },
  {
    slug: "hafsum",
    name: "Hafsum Coffee & Cake",
    tagline: "Ordering platform with a live staff console",
    // Kept honest: this was built as a proposal for a real café. They went
    // with a WordPress site instead, so this is not presented as their site.
    context: "Proposal build for a café in Bahria Enclave, Islamabad",
    year: "2026",
    summary:
      "A full ordering site for a café: customers browse the menu, build a cart and check out, while staff get a separate console where orders arrive and move through preparation to completion.",
    tech: [
      "React 19",
      "Vite",
      "Tailwind CSS",
      "React Router",
      "Node.js",
      "Express",
      "JWT",
      "Google OAuth",
    ],
    // Screenshot of the live site. Lives in /public so next/image can serve
    // it without a remote host allowlist. 1200px wide is enough for a card
    // and a case-study header without shipping a needlessly large file.
    image: "/projects/hafsum.jpg",
    imageAlt: "The Hafsum Coffee & Cake homepage, showing the menu navigation and ordering call to action",
    liveUrl: "https://hafsum.vercel.app/",
    repoUrl: "https://github.com/Saadkhizer/hafsum",
    highlights: [
      "Menu browsing, cart and checkout with a Rs. 500 minimum-order rule",
      "Customer sign-in with Google, plus a separate password login for shop staff",
      "Staff order console — incoming orders, status updates, order history",
      "Generated invoice receipts with GST calculated per order",
      "Rate limiting, health checks and env-based config on the API",
    ],
    challenges: [
      {
        title: "Cart state that stays honest across the whole flow",
        body: "The cart appears in a drawer, on the checkout page and again on the confirmation screen. Rather than reach for a state library, I kept it in a React context with a single reducer so there is exactly one place where quantities and totals change. Every view reads the same numbers, so the price on the drawer and the price on the invoice can never drift apart.",
      },
      {
        title: "Two kinds of login on one auth layer",
        body: "Customers sign in with Google; shop staff sign in with an email and password and land somewhere customers must never reach. Both issue the same JWT, but the token carries a role, and the API checks it on every admin route rather than trusting the frontend to hide the page. Protected routes on the client are convenience — the server is the actual gate.",
      },
      {
        title: "Invoices that a real shop can hand to a customer",
        body: "Receipts needed line items, GST at the correct rate, the shop's tax number and a total that matches what was charged. Getting rounding right so the line items actually sum to the printed total took more care than the rest of the checkout combined.",
      },
      {
        title: "A Vite SPA on Vercel talking to an Express API on Render",
        body: "Frontend and backend deploy to different hosts, which means CORS, an API base URL injected at build time instead of hardcoded, and SPA rewrites so a refresh on /checkout does not 404. The Render blueprint documents both the free demo setup and what has to change to run it for real.",
      },
    ],
  },
  {
    slug: "saffron-sage",
    name: "Saffron & Sage",
    tagline: "Food ordering app with a live owner console",
    context: "Own build — a complete restaurant platform, front to back",
    year: "2026",
    summary:
      "A fast-food ordering site: customers browse a categorised menu, keep a cart between visits, sign in, and order for delivery or pickup with live status tracking. The owner gets a separate console to run the menu and work through incoming orders as they arrive.",
    tech: [
      "React 18",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Zustand",
      "Framer Motion",
      "Node.js",
      "Express",
      "SQLite",
      "JWT",
      "Google OAuth",
    ],
    image: "/projects/saffron-sage.jpg",
    imageAlt:
      "The Saffron & Sage ordering homepage, with a flame-grilled burger, a 30-minute delivery badge and an Order Now button",
    // The plain saffron-sage-restaurant.vercel.app domain serves an older,
    // unrelated fine-dining site. THIS repo deploys to the -bay domain. Do not
    // "tidy" this URL back to the short one without checking what it serves.
    liveUrl: "https://saffron-sage-restaurant-bay.vercel.app/",
    repoUrl: "https://github.com/Saadkhizer/saffron-sage-restaurant",
    highlights: [
      "Categorised menu with search, filtering and popular badges",
      "Cart that survives a refresh, delivery or pickup, and a live delivery fee",
      "Email/password and Google sign-in, with checkout and dashboard behind auth",
      "Order confirmation, live status tracking and full order history",
      "Owner console: live stats, accept or advance orders, edit the menu and upload dish photos",
      "Dark mode, loading skeletons, empty states and keyboard-accessible throughout",
    ],
    challenges: [
      {
        title: "Never trusting the browser with money",
        body: "The cart lives in the browser, so the prices in it are whatever the browser says they are. On checkout the API takes only the item ids and quantities and recomputes every price from the database, then stores the total in cents rather than floats. A customer editing their cart in devtools changes what they ordered, never what they pay.",
      },
      {
        title: "An owner console the owner can actually run",
        body: "The restaurant needs to change prices, mark a dish unavailable at 7pm and add a new item without calling me. The console covers menu items, categories, availability and photo uploads, with the upload endpoint capped at 5MB and restricted by MIME type so a mistake there cannot fill the disk or land an executable in the images folder.",
      },
      {
        title: "A database with nothing to install",
        body: "Data sits in SQLite through Node's built-in node:sqlite, so there is no native module to compile and no database server to provision. On a small restaurant's budget that removes a monthly bill and an entire class of deploy failure, and the schema still has proper tables for users, addresses, categories, menu items, orders and order lines.",
      },
      {
        title: "Two hosts, one app",
        body: "The React frontend runs on Vercel and the Express API on Render, which means CORS, an API base URL injected at build time, and a rewrite so that opening /checkout directly serves the app instead of a 404. I wrote a small in-memory rate limiter for the auth routes too, rather than adding a dependency for what a Map and a timestamp can do on a single instance.",
      },
    ],
  },
  {
    slug: "sami-jee-decor",
    name: "Sami Jee Decor",
    tagline: "E-commerce store with local payments and an admin panel",
    context: "Paid client build for an interior-finishing business in Islamabad",
    year: "2026",
    summary:
      "A full online store for a company selling wallpaper, blinds, flooring, artificial grass and wall panels. Customers filter and search a catalogue, order with JazzCash, Easypaisa, card or cash on delivery, and track the order afterwards. The owner runs the whole thing from an admin panel.",
    tech: [
      "React 18",
      "Vite",
      "React Router",
      "Tailwind CSS",
      "Framer Motion",
      "Node.js",
      "Express",
      "SQLite",
      "JWT",
      "Stripe",
    ],
    image: "/projects/sami-jee-decor.jpg",
    imageAlt:
      "The Sami Jee Decor storefront, showing the category navigation and an interior photograph",
    liveUrl: "https://decora-interiors.vercel.app/",
    repoUrl: "https://github.com/Saadkhizer/Decora-interiors",
    highlights: [
      "Catalogue with category and price filters, sort, search and pagination",
      "Cart, checkout, order confirmation and order tracking by reference number",
      "Customer accounts with profile and order history",
      "JazzCash, Easypaisa, card and cash on delivery, with a sandbox mode for testing",
      "Admin panel: revenue and order dashboard, products, orders, inquiries, blog and project gallery",
      "Quote requests, WhatsApp contact, showroom map, and accessible throughout",
    ],
    challenges: [
      {
        title: "Payment methods that Pakistani customers actually use",
        body: "Most e-commerce tutorials stop at Stripe, which is not how people here pay. This takes JazzCash, Easypaisa, card and cash on delivery. Each gateway sits behind a common adapter with its own return handler, so adding another one later means writing one file rather than reworking checkout, and a sandbox mode lets the whole flow be tested without moving real money.",
      },
      {
        title: "The price is whatever the server says it is",
        body: "Carts live in the browser and browsers can be edited. The API accepts product ids and quantities, then recomputes the order total from the database before any payment is initiated. It is a small amount of code that closes the difference between a demo store and one you would let a real business take money through.",
      },
      {
        title: "An admin panel wide enough to hand over",
        body: "The owner needed more than a product list: orders and their payment status, customer inquiries, blog posts and the project gallery all had to be editable, with image uploads for each. The point of building that breadth is that the business never has to call me to change the site, which is also what makes the work worth paying for.",
      },
      {
        title: "Zero-config data, deliberately",
        body: "SQLite through better-sqlite3 means the database is a file. No server to provision, no monthly cost, no connection pool to misconfigure. For a business this size that is the right trade: the ceiling is high enough that they will not hit it, and the setup cost is nothing.",
      },
    ],
  },
];

export function getProject(slug) {
  return PROJECTS.find((p) => p.slug === slug);
}
