import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Development only — Next.js 16 blocks dev-server requests (HMR, /_next/*)
  // coming from a host other than localhost. Listing the LAN address lets you
  // open the dev site on a phone on the same WiFi. Has no effect on `next
  // build` or production. If your router hands out a different local IP later,
  // update this entry to match.
  allowedDevOrigins: ["192.168.100.12"],

  turbopack: {
    // Next.js infers the workspace root by walking up looking for a
    // lockfile. A stray lockfile in a parent folder (e.g. the user's home
    // directory) makes it pick the wrong root, which breaks file resolution.
    // Pinning this costs nothing and prevents a confusing warning + failure.
    root: __dirname,
  },
  images: {
    // next/image refuses remote hosts that are not listed here — add real
    // image CDN / Supabase storage hostnames per project.
    remotePatterns: [
      // { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
