import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Services = lazy(() => import("@/pages/Services"));
const Projects = lazy(() => import("@/pages/Projects"));
const Contact = lazy(() => import("@/pages/Contact"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const queryClient = new QueryClient();

const base = import.meta.env.BASE_URL.replace(/\/$/, "");

const PAGE_METADATA: Record<string, { title: string; description: string }> = {
  "/": {
    title: "VerdiSol Agro | Precision Agriculture in Zimbabwe",
    description:
      "VerdiSol Agro provides precision agriculture, drone surveying, GIS mapping, land planning and farm advisory services across Zimbabwe.",
  },
  "/about": {
    title: "About VerdiSol Agro | Agriculture Specialists",
    description:
      "Meet VerdiSol Agro, a Zimbabwean agricultural consultancy supporting farmers, investors and institutions with surveying and precision agriculture.",
  },
  "/services": {
    title: "Agricultural Surveying Services | VerdiSol Agro",
    description:
      "Explore VerdiSol Agro services including drone surveying, GIS mapping, land-use planning, soil analysis, valuations and agricultural advisory.",
  },
  "/projects": {
    title: "Agricultural Projects | VerdiSol Agro",
    description:
      "See VerdiSol Agro project examples in agricultural surveys, drone mapping, GIS analysis, land development planning and farm assessment.",
  },
  "/contact": {
    title: "Contact VerdiSol Agro | Request a Survey",
    description:
      "Contact VerdiSol Agro to discuss agricultural surveys, drone mapping, GIS analysis, land development planning and consultancy.",
  },
};

function PageMetadata() {
  const { pathname } = useLocation();

  useEffect(() => {
    const route = pathname.replace(/\/+$/, "") || "/";
    const metadata = PAGE_METADATA[route] ?? {
      title: "Page Not Found | VerdiSol Agro",
      description:
        "This page could not be found. Visit VerdiSol Agro to explore our agricultural surveying and advisory services.",
    };

    document.title = metadata.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", metadata.description);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", metadata.title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", metadata.description);
    document
      .querySelector('meta[name="twitter:title"]')
      ?.setAttribute("content", metadata.title);
    document
      .querySelector('meta[name="twitter:description"]')
      ?.setAttribute("content", metadata.description);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={base}>
        <PageMetadata />
        <ErrorBoundary>
        <Suspense fallback={<p role="status" className="p-12 text-center text-[#1F5D3A]">Loading page…</p>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
