import "@/styles/globals.css";
import { ViteReactSSG } from "vite-react-ssg";
import { routes } from "@/App.jsx";

// ViteReactSSG drives both the static build (Node, no browser) and client
// hydration. Head/meta is managed per-route via the <Head> component from
// "vite-react-ssg" (see the page components).
export const createRoot = ViteReactSSG({ routes });
