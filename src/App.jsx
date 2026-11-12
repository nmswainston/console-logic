import Layout from "@/components/layout/Layout.jsx";
import ErrorBoundary from "@/components/ErrorBoundary.jsx";

import Home from "@/pages/Home.jsx";
import Work from "@/pages/Work.jsx";
import ProjectCaseStudy from "@/pages/ProjectCaseStudy.jsx";
import About from "@/pages/About.jsx";
import Privacy from "@/pages/Privacy.jsx";
import NotFound from "@/pages/NotFound.jsx";

import { projects } from "@/data/projects";

/**
 * Route table shared by the client router and the static-site generator.
 * vite-react-ssg crawls these at build time and emits one HTML file per
 * route, expanding the dynamic case-study route via getStaticPaths.
 */
export const routes = [
  {
    path: "/",
    element: (
      <ErrorBoundary>
        <Layout />
      </ErrorBoundary>
    ),
    entry: "src/components/layout/Layout.jsx",
    children: [
      { index: true, element: <Home /> },
      { path: "projects", element: <Work /> },
      {
        path: "projects/:slug",
        element: <ProjectCaseStudy />,
        getStaticPaths: () => projects.map((p) => `projects/${p.slug}`),
      },
      { path: "about", element: <About /> },
      { path: "privacy", element: <Privacy /> },
      // Prerendered to dist/404.html. Netlify serves that file, with a real
      // 404 status, for any URL that matches no file, so this route exists to
      // give the build something to render rather than to be visited.
      { path: "404", element: <NotFound /> },
      // The same page for unknown URLs once the client router has taken over.
      { path: "*", element: <NotFound /> },
    ],
  },
];
