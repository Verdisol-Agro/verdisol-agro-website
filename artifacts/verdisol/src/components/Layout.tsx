import { ReactNode, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { pathname, hash } = useLocation();
  useLayoutEffect(() => {
    if (hash) {
      let anchor = hash.slice(1);
      try { anchor = decodeURIComponent(anchor); } catch { /* Keep malformed URLs safe. */ }
      const target = document.getElementById(anchor);
      if (target) {
        target.scrollIntoView({ behavior: "instant" });
        return;
      }
    }
    // Override the site's smooth scrolling so route changes cannot retain the
    // previous page's offset while lazy content and animations are mounting.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);
  return (
    <div className="verdisol-site min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
