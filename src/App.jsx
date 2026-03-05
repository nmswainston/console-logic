import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";
import Layout from "@/components/layout/Layout.jsx";

import TerminalBackground from "@/components/terminal/TerminalBackground.jsx";
import TerminalGlow from "@/components/terminal/TerminalGlow.jsx";
import ScanlineOverlay from "@/components/terminal/ScanlineOverlay.jsx";

import ErrorBoundary from "@/components/ErrorBoundary.jsx";

const Home = lazy(() => import("@/pages/Home.jsx"));
const Work = lazy(() => import("@/pages/Work.jsx"));
const About = lazy(() => import("@/pages/About.jsx"));
const NotFound = lazy(() => import("@/pages/NotFound.jsx"));

export default function App() {
  const router = createBrowserRouter([
    {
      element: (
        <ErrorBoundary>
          <Layout />
        </ErrorBoundary>
      ),
      children: [
        { index: true, element: <Home /> },
        { path: "projects", element: <Work /> },
        { path: "about", element: <About /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <>
      {/* Global terminal animation layers */}
      <TerminalBackground />
      <TerminalGlow />
      <ScanlineOverlay />

      {/* App router */}
      <RouterProvider
        router={router}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      />
    </>
  );
}
