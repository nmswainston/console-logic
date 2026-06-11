import Layout from "@/components/layout/Layout.jsx";
import ErrorBoundary from "@/components/ErrorBoundary.jsx";

import Home from "@/pages/Home.jsx";
import Work from "@/pages/Work.jsx";
import ProjectCaseStudy from "@/pages/ProjectCaseStudy.jsx";
import About from "@/pages/About.jsx";
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
      { path: "*", element: <NotFound /> },
    ],
  },
];
