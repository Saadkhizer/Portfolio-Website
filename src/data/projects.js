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
];

export function getProject(slug) {
  return PROJECTS.find((p) => p.slug === slug);
}
