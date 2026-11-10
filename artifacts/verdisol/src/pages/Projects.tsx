import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  MapPin,
  ArrowRight,
  Users,
  Globe,
  Plane,
  FileText,
  Droplets,
  Layers,
  ClipboardList,
  TrendingUp,
  Map,
  Bookmark,
} from "lucide-react";
import Layout from "@/components/Layout";
import vegetablesImage from "@assets/image_1794296544704.png";
import siteAnalysisImage from "@assets/Screenshot_2026-11-10_090239_1794296620040.png";
import commercialLandUseMapImage from "@assets/Screenshot_2026-02-23_143731_1794297611541.png";
import terrainAssessmentMap from "@assets/Screenshot_2026-11-10_123905_1794307874676.png";
import irrigationPlanningImage from "@assets/generated_images/irrigation-development-planning.jpg";
import boundaryVerificationImage from "@assets/generated_images/boundary-verification-survey.jpg";
import farmValuationImage from "@assets/generated_images/farm-valuation-assessment.jpg";
import plantationDevelopmentImage from "@assets/generated_images/plantation-development-plan.jpg";
import droneMappingImage from "@assets/generated_images/drone-mapping-project.jpg";
import investmentAssessmentImage from "@assets/generated_images/agricultural-investment-assessment.jpg";

/* ─── Helpers ────────────────────────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

function InViewSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Project data ───────────────────────────────────────────────────────── */

type ProjectCategory =
  | "All"
  | "Water Surveys"
  | "Land Use Planning"
  | "Drone Surveying"
  | "Valuations"
  | "Investment";

interface Project {
  id: number;
  image: string;
  imagePosition?: string;
  title: string;
  location: string;
  description: string;
  tag: string;
  filterTag: ProjectCategory;
  icon: React.ElementType;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    image: siteAnalysisImage,
    title: "450 ha Water Survey Project",
    location: "Mashonaland West",
    description:
      "Drone-assisted groundwater survey with borehole site ranking and full land water mapping for optimal drilling strategy.",
    tag: "Water Surveys",
    filterTag: "Water Surveys",
    icon: Droplets,
  },
  {
    id: 2,
    image: commercialLandUseMapImage,
    title: "Commercial Farm Land Use Plan",
    location: "Midlands",
    description:
      "Enterprise zoning and land capability analysis for a large-scale commercial farming operation including irrigation and livestock planning.",
    tag: "Land Use Planning",
    filterTag: "Land Use Planning",
    icon: Layers,
  },
  {
    id: 3,
    image: irrigationPlanningImage,
    title: "Irrigation Development Planning",
    location: "Mashonaland East",
    description:
      "GIS-based irrigation layout design and water distribution planning for high-efficiency crop production.",
    tag: "Land Use Planning",
    filterTag: "Land Use Planning",
    icon: Layers,
  },
  {
    id: 4,
    image: boundaryVerificationImage,
    title: "Boundary Verification Project",
    location: "Masvingo",
    description:
      "Boundary pegging and verification for title deed confirmation and dispute resolution across contested farm land.",
    tag: "Surveying",
    filterTag: "Drone Surveying",
    icon: Bookmark,
  },
  {
    id: 5,
    image: farmValuationImage,
    imagePosition: "center 30%",
    title: "Farm Valuation Assessment",
    location: "Manicaland",
    description:
      "Comprehensive farm valuation report including infrastructure, land capability and agricultural productivity assessment.",
    tag: "Valuations",
    filterTag: "Valuations",
    icon: ClipboardList,
  },
  {
    id: 6,
    image: plantationDevelopmentImage,
    title: "Plantation Development Plan",
    location: "Mashonaland Central",
    description:
      "Land preparation and enterprise planning for plantation agriculture with long-term production strategy.",
    tag: "Agricultural Planning",
    filterTag: "Land Use Planning",
    icon: Map,
  },
  {
    id: 7,
    image: droneMappingImage,
    title: "Drone Mapping Project",
    location: "Bulawayo Region",
    description:
      "High-resolution aerial mapping using drone imagery for terrain modelling and farm analysis.",
    tag: "Drone Surveying",
    filterTag: "Drone Surveying",
    icon: Plane,
  },
  {
    id: 8,
    image: investmentAssessmentImage,
    imagePosition: "center 40%",
    title: "Agricultural Investment Assessment",
    location: "Harare Region",
    description:
      "Feasibility study and investment analysis for commercial agricultural development project.",
    tag: "Investment Advisory",
    filterTag: "Investment",
    icon: TrendingUp,
  },
];

const FILTER_TAGS: ProjectCategory[] = [
  "All",
  "Water Surveys",
  "Land Use Planning",
  "Drone Surveying",
  "Valuations",
  "Investment",
];

/* ─── 1. Hero ────────────────────────────────────────────────────────────── */

function PageHero() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${vegetablesImage})`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#1F5D3A]/92 via-[#1F5D3A]/80 to-[#0f3320]/90" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block px-4 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium tracking-wider mb-6"
        >
          VerdiSol Agro · Project Portfolio
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
        >
          Our Projects
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed"
        >
          A portfolio of agricultural surveys, drone mapping, GIS analysis, land development
          planning and farm assessment projects across Zimbabwe.
        </motion.p>
      </div>
    </section>
  );
}

/* ─── 2. Intro ───────────────────────────────────────────────────────────── */

function Intro() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-gray-600 text-lg leading-relaxed mb-4"
        >
          VerdiSol Agro has completed a wide range of agricultural and land development
          projects across Zimbabwe, supporting farmers, investors and institutions with
          accurate data, drone technology and professional GIS analysis.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-gray-500 text-base leading-relaxed"
        >
          Our projects demonstrate practical solutions delivered across multiple provinces
          and farming environments.
        </motion.p>
      </div>
    </section>
  );
}

function AnalysisShowcase() {
  const examples = [
    {
      image: siteAnalysisImage,
      title: "Underground Water Survey",
      detail:
        "Survey mapping with identified targets and GPS coordinates to support groundwater assessment and borehole siting.",
    },
    {
      image: terrainAssessmentMap,
      title: "Slope & Terrain Assessment",
      detail:
        "A clear view of slope patterns to support land-use and development planning.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#123d2c] py-20 sm:py-24">
      <div className="pointer-events-none absolute -right-24 -top-28 h-96 w-96 rounded-full bg-[#8CC63F]/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#C7A85A]/15 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <span className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium tracking-wide text-[#cfe7a8]">
            Mapping in Detail
          </span>
          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
            Real outputs. Clearer decisions.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
            Explore examples of the GIS and terrain analysis visuals used to
            make land information easier to understand.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {examples.map(({ image, title, detail }, index) => (
            <motion.figure
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: index * 0.12 }}
              className="group overflow-hidden rounded-3xl border border-white/15 bg-white shadow-2xl shadow-black/20"
            >
              <div className="relative aspect-[1.16/1] overflow-hidden bg-[#f6f6f3] p-3 sm:p-5">
                <img
                  src={image}
                  alt={title}
                  className="h-full w-full rounded-xl object-contain transition-transform duration-500 group-hover:scale-[1.025]"
                />
                <span className="absolute left-6 top-6 rounded-full bg-[#1F5D3A] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-lg">
                  GIS deliverable
                </span>
              </div>
              <figcaption className="flex flex-col gap-2 p-6 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
                <div>
                  <h3 className="text-xl font-bold text-[#173f2d]">{title}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-600">
                    {detail}
                  </p>
                </div>
                <span className="mt-1 inline-flex shrink-0 items-center rounded-full bg-[#8CC63F]/15 px-3 py-1 text-xs font-semibold text-[#1F5D3A]">
                  VerdiSol Agro
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 3 + 4. Filter + Project Grid ─────────────────────────────────────── */

function ProjectCard({ project }: { project: Project }) {
  const Icon = project.icon;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl overflow-hidden transition-shadow"
    >
      <div className="aspect-[16/10] overflow-hidden relative">
        <img
          src={project.image}
          alt={project.title}
          style={{ objectPosition: project.imagePosition }}
          className={`w-full h-full transition-transform duration-500 ${
            project.image === siteAnalysisImage ||
            project.image === commercialLandUseMapImage
              ? "object-contain bg-white p-2"
              : "object-cover group-hover:scale-105"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* Category icon overlay */}
        <div className="absolute top-3 right-3 w-9 h-9 rounded-lg bg-[#1F5D3A] flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Icon className="w-4 h-4 text-white" />
        </div>
      </div>
      <div className="p-6">
        <span className="inline-block px-3 py-1 rounded-full bg-[#1F5D3A]/10 text-[#1F5D3A] text-xs font-semibold tracking-wide mb-3">
          {project.tag}
        </span>
        <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-[#1F5D3A] transition-colors leading-snug">
          {project.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-4">
          {project.description}
        </p>
        <div className="flex items-center gap-1.5 text-[#896F32] text-sm font-medium">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
          {project.location}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectGrid() {
  const [active, setActive] = useState<ProjectCategory>("All");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const filtered =
    active === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.filterTag === active);

  return (
    <section ref={ref} className="py-20 bg-[#F5F0E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <InViewSection className="text-center mb-10">
          <motion.span variants={fadeUp} className="inline-block px-4 py-1.5 rounded-full bg-[#1F5D3A]/10 text-[#1F5D3A] text-sm font-medium tracking-wide mb-4">
            Portfolio
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-bold text-gray-900">
            Completed Projects
          </motion.h2>
        </InViewSection>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-12"
        >
          {FILTER_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setActive(tag)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                active === tag
                  ? "bg-[#1F5D3A] text-white shadow-md"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-[#1F5D3A]/40 hover:text-[#1F5D3A]"
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            No projects in this category yet.
          </div>
        )}
      </div>
    </section>
  );
}

/* ─── 5. Coverage Map ────────────────────────────────────────────────────── */

const PROVINCES = [
  { name: "Harare", active: true },
  { name: "Bulawayo", active: true },
  { name: "Mashonaland East", active: true },
  { name: "Mashonaland West", active: true },
  { name: "Mashonaland Central", active: true },
  { name: "Midlands", active: true },
  { name: "Manicaland", active: true },
  { name: "Masvingo", active: true },
  { name: "Matabeleland North", active: true },
  { name: "Matabeleland South", active: true },
];

function CoverageSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <InViewSection className="text-center mb-12">
          <motion.span variants={fadeUp} className="inline-block px-4 py-1.5 rounded-full bg-[#1F5D3A]/10 text-[#1F5D3A] text-sm font-medium tracking-wide mb-4">
            Nationwide
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            Coverage Across All Provinces of Zimbabwe
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-500 max-w-xl mx-auto">
            Our field teams provide surveys, maps and plans across all ten provinces
            of Zimbabwe.
          </motion.p>
        </InViewSection>

        <InViewSection className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {PROVINCES.map(({ name, active }) => (
            <motion.div
              key={name}
              variants={fadeUp}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-colors ${
                active
                  ? "bg-[#1F5D3A] border-[#1F5D3A] text-white"
                  : "bg-[#F5F0E8] border-[#1F5D3A]/20 text-gray-600"
              }`}
            >
              <MapPin
                className={`w-4 h-4 flex-shrink-0 ${active ? "text-[#A5D33C]" : "text-gray-400"}`}
              />
              <span className="text-sm font-medium">{name}</span>
            </motion.div>
          ))}
        </InViewSection>

        <InViewSection>
          <motion.div variants={fadeUp} className="mt-8 flex items-center justify-center gap-5 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-[#1F5D3A]" />
              <span className="text-gray-500">Service coverage</span>
            </div>
          </motion.div>
        </InViewSection>
      </div>
    </section>
  );
}

/* ─── 6. Credibility Strip ───────────────────────────────────────────────── */

const CRED = [
  { icon: Users, value: "600+", label: "Clients Served" },
  { icon: Globe, value: "10", label: "Provinces Active" },
  { icon: Plane, value: "DJI", label: "Drone Technology" },
  { icon: FileText, value: "100%", label: "Professional Reporting" },
];

function CredibilityStrip() {
  return (
    <section className="py-14 bg-[#1F5D3A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <InViewSection className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {CRED.map(({ icon: Icon, value, label }) => (
            <motion.div
              key={label}
              variants={fadeUp}
              className="flex flex-col items-center text-center gap-3"
            >
              <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-white">{value}</div>
              <div className="text-white/70 text-sm font-medium">{label}</div>
            </motion.div>
          ))}
        </InViewSection>
      </div>
    </section>
  );
}

/* ─── 7. CTA ─────────────────────────────────────────────────────────────── */

function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} className="py-20 bg-[#F5F0E8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          <motion.span variants={fadeUp} className="inline-block px-4 py-1.5 rounded-full bg-[#1F5D3A]/10 text-[#1F5D3A] text-sm font-medium tracking-wide mb-6">
            Start Your Project
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-bold text-gray-900 mb-5">
            Have a Project You Want to Develop?
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-500 text-lg max-w-xl mx-auto mb-10">
            We provide professional agricultural and land development solutions across
            Zimbabwe. Talk to our team today.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-[#1F5D3A] text-white font-bold text-base hover:bg-[#174d2f] transition-colors shadow-md"
            >
              Request a Survey <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border-2 border-[#1F5D3A] text-[#1F5D3A] font-semibold text-base hover:bg-[#1F5D3A] hover:text-white transition-all"
            >
              View Our Services
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── PAGE ───────────────────────────────────────────────────────────────── */

export default function Projects() {
  return (
    <Layout>
      <PageHero />
      <Intro />
      <AnalysisShowcase />
      <ProjectGrid />
      <CoverageSection />
      <CredibilityStrip />
      <CTASection />
    </Layout>
  );
}
