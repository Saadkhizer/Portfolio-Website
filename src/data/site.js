/**
 * Site content that isn't project data. Everything a client reads before they
 * reach the work lives here, so copy edits never mean touching JSX.
 */

export const PROFILE = {
  name: "Saad Khizer",
  role: "Full-stack web developer",
  // Kept deliberately stack-neutral. Naming one stack in the hero dates badly
  // and invites "but this project doesn't use that" from anyone who reads the
  // repos — the Stack section below carries the detail instead.
  headline: "I build web apps that go live and stay up.",
  intro:
    "I work across the front end and the server: interfaces in React and Next.js, APIs and authentication in Node and Express, and the deployment that puts them in front of real users.",
  email: "saadkhizer9@gmail.com",
  github: "https://github.com/Saadkhizer",
  location: "Islamabad, Pakistan",
  available: true,

  // Leave a channel as an empty string and its button simply does not render.
  // Better a missing button than one that goes nowhere.
  //
  // whatsapp: digits only, with country code and no "+" or spaces.
  //   e.g. 923001234567  ->  https://wa.me/923001234567
  whatsapp: "923365204441",
  linkedin: "https://www.linkedin.com/in/sheikh-mohammad-saad-khizar-a5410a324",
};

/** Prefilled WhatsApp link, or null when no number is configured. */
export function whatsappLink() {
  if (!PROFILE.whatsapp) return null;
  const text = encodeURIComponent(
    "Hi Saad, I saw your portfolio and I'd like to talk about a project."
  );
  return `https://wa.me/${PROFILE.whatsapp}?text=${text}`;
}

export const SERVICES = [
  {
    title: "Business websites",
    body: "A fast, responsive site that loads quickly, reads well on a phone, and gives customers a reason to get in touch. Built to be found, not just to look good.",
    points: ["Responsive on every screen", "Built for search engines", "Yours to own — no page builder lock-in"],
  },
  {
    title: "Ordering & e-commerce",
    body: "Menus and catalogues, carts, checkout, and the receipts that follow. The customer-facing half of a shop that actually takes money.",
    points: ["Cart and checkout flow", "Customer accounts and sign-in", "Invoices and order confirmation"],
  },
  {
    title: "Dashboards & internal tools",
    body: "The side your staff use. Order consoles, admin panels, and the role-based access that keeps them separate from what customers can reach.",
    points: ["Role-based access control", "Live order and status views", "Built around how the team works"],
  },
];

export const STACK = [
  {
    group: "Front end",
    items: ["React", "Next.js", "JavaScript", "Tailwind CSS", "React Router", "Vite"],
  },
  {
    group: "Back end",
    items: ["Node.js", "Express", "REST APIs", "JWT auth", "Google OAuth", "Python"],
  },
  {
    group: "Data",
    items: ["MongoDB", "PostgreSQL", "Supabase", "Schema design"],
  },
  {
    group: "Ship & run",
    items: ["Git & GitHub", "Vercel", "Render", "Docker", "Environment config"],
  },
];

export const PROCESS = [
  {
    step: "01",
    title: "We scope it",
    body: "A short conversation about what the site has to do and who it is for. You get a plain-language summary of what I will build, what it costs, and when it lands — before any code is written.",
  },
  {
    step: "02",
    title: "I build it",
    body: "You see a working link early and often, not a big reveal at the end. Feedback goes in as we go, so there are no surprises when it is finished.",
  },
  {
    step: "03",
    title: "It goes live",
    body: "I deploy it, connect your domain, and hand over everything — the code, the accounts, the access. It is your site, and it keeps working without me.",
  },
];

export const ABOUT = [
  "I am a full-stack developer based in Islamabad. I trained in the MERN stack with Nexsuberry Training & Solutions, and most of what I know past that came from building real things and getting them working.",
  "I build the whole thing: the interface people click on, the API behind it, the login, and the deployment that keeps it online. Most of my work so far has been for small businesses, where the owner is often the same person answering the phone, and a website has to pay for itself.",
  "I would rather explain a trade-off in plain language than hand over something you cannot maintain. If you want the fuller picture of my background, my LinkedIn and GitHub are linked below.",
  "I am taking on freelance projects now. Tell me what you need it to do and I will tell you straight whether I am the right person to build it.",
];
