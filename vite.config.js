import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
// Explicit: the shared eslint config only declares browser globals.
import process from "node:process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Injects the Umami tracker into built HTML only.
//
// It is not written into index.html directly because the proxy paths it needs
// live in public/_redirects, which Netlify applies and the dev server does not:
// in dev the tag would resolve to the SPA fallback HTML and log a MIME error on
// every page load.
//
// The website id comes from the build environment (set UMAMI_WEBSITE_ID in
// Netlify). With no id there is nothing valid to emit, so the build ships
// without analytics rather than with a broken tag.
function umamiAnalytics() {
  const websiteId = process.env.UMAMI_WEBSITE_ID;

  return {
    name: "umami-analytics",
    apply: "build",
    transformIndexHtml() {
      if (!websiteId) {
        console.warn("[umami] UMAMI_WEBSITE_ID is not set; building without analytics.");
        return [];
      }

      return [
        {
          tag: "script",
          injectTo: "head",
          attrs: {
            defer: true,
            src: "/js/stats.js",
            "data-website-id": websiteId,
            // Required. Left off, the tracker posts to gateway.umami.is and
            // the proxy buys nothing. It appends /api/send to this itself.
            "data-host-url": "https://consolelogic.net",
            // Keeps deploy previews and any other host out of the numbers;
            // the script still loads there, it just never sends.
            "data-domains": "consolelogic.net",
          },
        },
      ];
    },
  };
}

export default defineConfig({
  plugins: [react(), umamiAnalytics()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules/react-router-dom")) return "vendor-router";
          if (id.includes("node_modules/framer-motion")) return "vendor-motion";
        },
      },
    },
  },
});
