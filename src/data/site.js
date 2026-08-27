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
};

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
  "I am a self-taught full-stack developer based in Islamabad. I build the whole thing — the interface people click on, the API behind it, the authentication, and the deployment that keeps it online.",
  "Most of what I have built so far is for small businesses: the kind where the owner is also the one answering the phone, and a website has to earn its cost. That shapes how I work. I would rather explain a trade-off in plain language than hand over something you cannot maintain.",
  "I am taking on freelance projects now. If you have something in mind, tell me what it needs to do and I will tell you honestly whether I am the right person to build it.",
];
