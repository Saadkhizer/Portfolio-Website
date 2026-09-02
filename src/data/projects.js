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
    tagline: "Restaurant ordering system with an owner console",
    context: "Own build — a complete restaurant platform, front to back",
    year: "2026",
    summary:
      "A full restaurant site: customers browse a categorised menu, keep a cart between visits, sign in, and order for delivery or pickup with live status tracking. The owner gets a separate console to run the menu and work through incoming orders.",
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
      "The Saffron & Sage homepage, with a full-bleed dining photograph and a reservation call to action",
    liveUrl: "https://saffron-sage-restaurant.vercel.app/",
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
];

export function getProject(slug) {
  return PROJECTS.find((p) => p.slug === slug);
}
