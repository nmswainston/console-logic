import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function Layout() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Nav />
      <main id="main" tabIndex={-1} className="pt-16">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}


