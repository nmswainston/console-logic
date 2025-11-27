import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import Layout from "./layout/Layout";

const Home = lazy(() => import("./pages/Home"));
const Projects = lazy(() => import("./pages/Projects"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));

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
        { path: "projects", element: <Projects /> },
        { path: "about", element: <About /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <RouterProvider
      router={router}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    />
  );
}
