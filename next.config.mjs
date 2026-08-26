import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
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
