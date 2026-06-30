import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  Droplets,
  Plane,
  Map,
  Layers,
  ClipboardList,
  Bookmark,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Database,
  BarChart3,
  Compass,
  FileText,
  Users,
  Globe,
  Gauge,
} from "lucide-react";
import Layout from "@/components/Layout";

/* ─── Animation helpers ─────────────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
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

/* ─── 1. Page Hero ──────────────────────────────────────────────────────── */

function PageHero() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600&q=80)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#1F5D3A]/90 via-[#1F5D3A]/80 to-[#0f3320]/90" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block px-4 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium tracking-wider mb-6"
        >
          VerdiSol Agro · Professional Services
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
        >
          Our Services
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed"
        >
          Precision agriculture, GIS solutions, drone surveying, land development and
          agricultural consultancy services across Zimbabwe.
        </motion.p>
      </div>
    </section>
  );
}

/* ─── 2. Services Intro ─────────────────────────────────────────────────── */

function ServicesIntro() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-lg text-gray-600 leading-relaxed"
        >
          VerdiSol Agro delivers data-driven agricultural and land development solutions
          using drone technology, GIS analysis, and professional agricultural expertise. Our
          services support farmers, investors, and institutions in making informed land and
          investment decisions.
        </motion.p>
      </div>
    </section>
  );
}

/* ─── Service Detail Card (alternating layout) ──────────────────────────── */

interface ServiceDetailProps {
  id: number;
  icon: React.ElementType;
  title: string;
  tagline: string;
  description: string;
  bullets: string[];
  image: string;
  flipped?: boolean;
}

function ServiceDetail({
  id,
  icon: Icon,
  title,
  tagline,
  description,
  bullets,
  image,
  flipped = false,
}: ServiceDetailProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const content = (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className="flex flex-col justify-center"
    >
      <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5">
        <div className="w-12 h-12 rounded-xl bg-[#1F5D3A] flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <span className="text-[#8B5E3C] text-sm font-semibold tracking-wider uppercase">
          Service {String(id).padStart(2, "0")}
        </span>
      </motion.div>

      <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3 leading-tight">
        {title}
      </motion.h2>

      <motion.p variants={fadeUp} className="text-[#1F5D3A] font-semibold text-base mb-4">
        {tagline}
      </motion.p>

      <motion.p variants={fadeUp} className="text-gray-600 leading-relaxed mb-7">
        {description}
      </motion.p>

      <motion.ul variants={stagger} className="space-y-2.5 mb-8">
        {bullets.map((b) => (
          <motion.li key={b} variants={fadeUp} className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#1F5D3A] flex-shrink-0 mt-0.5" />
            <span className="text-gray-700 text-sm leading-relaxed">{b}</span>
          </motion.li>
        ))}
      </motion.ul>

      <motion.div variants={fadeUp}>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1F5D3A] text-white text-sm font-semibold hover:bg-[#174d2f] transition-colors shadow-sm"
        >
          Enquire About This Service <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </motion.div>
  );

  const imageEl = (
    <motion.div
      initial={{ opacity: 0, x: flipped ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="rounded-2xl overflow-hidden aspect-[4/3] shadow-xl"
    >
      <img src={image} alt={title} className="w-full h-full object-cover" />
    </motion.div>
  );

  return (
    <section
      ref={ref}
      className={`py-20 ${id % 2 === 0 ? "bg-[#F5F0E8]" : "bg-white"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {flipped ? (
            <>
              {imageEl}
              {content}
            </>
          ) : (
            <>
              {content}
              {imageEl}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─── Service data ──────────────────────────────────────────────────────── */

const SERVICES: ServiceDetailProps[] = [
  {
    id: 1,
    icon: Droplets,
    title: "Underground Water Surveys",
    tagline: "Data-driven borehole siting for reliable water access.",
    description:
      "Using drone-assisted geophysical surveys and advanced geological interpretation, we locate the most viable underground water sources across any terrain. Our approach eliminates guesswork — every recommendation is backed by field data and expert analysis.",
    bullets: [
      "Drone-assisted groundwater detection across large areas",
      "Geological interpretation and subsurface modelling",
      "Borehole site ranking and prioritised recommendations",
      "Full property water resource mapping",
      "GPS pegging of identified drilling points",
      "Comprehensive water survey reporting with findings",
    ],
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=900&q=80",
    flipped: false,
  },
  {
    id: 2,
    icon: Plane,
    title: "Drone Surveying",
    tagline: "High-resolution aerial data for informed decision-making.",
    description:
      "Our DJI Mavic 3 Multispectral drone fleet captures accurate, detailed aerial data for agricultural and infrastructure applications — giving clients a birds-eye view that transforms how they manage land and assets.",
    bullets: [
      "Agricultural aerial surveys and crop monitoring",
      "Infrastructure and facility inspections",
      "High-resolution imagery capture and processing",
      "Farm monitoring, health analysis, and change detection",
      "NDVI and multispectral crop stress mapping",
      "Rapid deployment across all Zimbabwe provinces",
    ],
    image: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=900&q=80",
    flipped: true,
  },
  {
    id: 3,
    icon: Map,
    title: "Aerial Mapping",
    tagline: "Precision GIS mapping for land management and planning.",
    description:
      "We produce publication-quality GIS maps and spatial analyses used by farmers, developers, and government agencies. From orthomosaics to full topographic surveys, our mapping outputs drive confident land decisions.",
    bullets: [
      "Orthomosaic mapping and georeferenced imagery",
      "Contour mapping and terrain analysis",
      "Digital Elevation Models (DEM) and surface models",
      "GIS spatial analysis and layer integration",
      "Topographic surveys for development planning",
      "Map deliverables in multiple GIS and PDF formats",
    ],
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=80",
    flipped: false,
  },
  {
    id: 4,
    icon: Layers,
    title: "Land Use Planning",
    tagline: "Strategic planning to maximise land productivity and profitability.",
    description:
      "Our land use planning service transforms raw land into productive, profitable operations. We design enterprise zoning layouts, assess soil capability, and develop investment-ready implementation plans that align with international agricultural standards.",
    bullets: [
      "Enterprise zoning maps — cattle, poultry, irrigation, horticulture, plantation",
      "Land capability analysis and soil productivity assessment",
      "Investment appraisal and financial feasibility reports",
      "Strategic implementation planning and phased rollout",
      "Labour and human resource planning",
      "Equipment and infrastructure planning",
      "Full project execution strategy and timeline",
    ],
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=900&q=80",
    flipped: true,
  },
  {
    id: 5,
    icon: ClipboardList,
    title: "Farm Assessments & Valuations",
    tagline: "Professional appraisals for investment, finance, and decision-making.",
    description:
      "We conduct thorough farm inspections and produce independent valuation reports used by banks, investors, and landowners. Our assessments cover physical condition, agricultural performance, and market value — giving every stakeholder a reliable, defensible basis for decisions.",
    bullets: [
      "On-site farm inspections and condition assessments",
      "Agricultural performance and productivity evaluation",
      "Independent property valuation reports",
      "Investment feasibility analysis and ROI projections",
      "Bank and finance-ready documentation",
      "Comparative market analysis and benchmarking",
    ],
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=900&q=80",
    flipped: false,
  },
  {
    id: 6,
    icon: Bookmark,
    title: "Boundary Pegging",
    tagline: "Accurate demarcation for property security and legal compliance.",
    description:
      "We use GPS and survey-grade equipment to verify, peg, and document property boundaries — providing landowners and investors with the certainty they need to protect their assets and resolve disputes.",
    bullets: [
      "GPS-accurate boundary verification surveys",
      "Title deed support and documentation",
      "Subdivision planning and plot demarcation",
      "Dispute resolution surveys with independent reporting",
      "Beaconing and physical boundary marking",
      "GIS-referenced survey deliverables",
    ],
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=900&q=80",
    flipped: true,
  },
  {
    id: 7,
    icon: TrendingUp,
    title: "Agricultural Investment & Consultancy",
    tagline: "Expert guidance from concept to commercial operation.",
    description:
      "We support investors and agribusinesses through every stage of agricultural development — from initial feasibility through to operational implementation. Our consultancy bridges the gap between land potential and bankable, productive returns.",
    bullets: [
      "Agricultural feasibility studies and market analysis",
      "Agricultural business planning and financial modelling",
      "Investment advisory and risk assessment",
      "Project implementation support and supervision",
      "Stakeholder and community engagement guidance",
      "Ongoing performance monitoring and advisory",
    ],
    image: "https://images.unsplash.com/photo-1486328228599-85db4443971f?w=900&q=80",
    flipped: false,
  },
];

/* ─── 4. Why Our Services Work ──────────────────────────────────────────── */

const WHY_POINTS = [
  {
    icon: Database,
    title: "Data-Driven Decisions",
    desc: "Every recommendation is backed by field data, geophysical readings, and GIS analysis — never guesswork.",
  },
  {
    icon: Gauge,
    title: "Drone + GIS Precision",
    desc: "DJI Mavic 3 Multispectral and survey-grade GIS deliver centimetre-accurate outputs you can act on.",
  },
  {
    icon: Compass,
    title: "Local Zimbabwe Expertise",
    desc: "Our teams understand Zimbabwe's soils, geology, and land tenure systems inside out.",
  },
  {
    icon: Globe,
    title: "International Planning Standards",
    desc: "All reports and plans meet international agricultural and surveying benchmarks.",
  },
  {
    icon: BarChart3,
    title: "Practical Agricultural Outcomes",
    desc: "We focus on recommendations that translate into productive, profitable farming operations.",
  },
  {
    icon: FileText,
    title: "Bank-Ready Reporting",
    desc: "Our documentation is structured to satisfy financial institutions, investors, and regulators.",
  },
];

function WhySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-20 bg-[#1F5D3A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Section className="text-center mb-14">
          <motion.span variants={fadeUp} className="inline-block px-4 py-1.5 rounded-full bg-white/15 text-white/90 text-sm font-medium tracking-wide mb-4">
            Our Approach
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Why Our Services Work
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/70 max-w-xl mx-auto">
            The principles that make every VerdiSol Agro engagement reliable, practical, and impactful.
          </motion.p>
        </Section>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {WHY_POINTS.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="flex gap-4 p-6 rounded-2xl bg-white/10 border border-white/15 hover:bg-white/15 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1.5">{title}</h3>
                <p className="text-white/65 text-sm leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── 5. Services Quick Nav ─────────────────────────────────────────────── */

const NAV_SERVICES = [
  { icon: Droplets, label: "Water Surveys" },
  { icon: Plane, label: "Drone Surveying" },
  { icon: Map, label: "Aerial Mapping" },
  { icon: Layers, label: "Land Use Planning" },
  { icon: ClipboardList, label: "Farm Assessments" },
  { icon: Bookmark, label: "Boundary Pegging" },
  { icon: TrendingUp, label: "Consultancy" },
];

function ServicesQuickNav() {
  return (
    <section className="bg-white border-b border-gray-100 sticky top-16 lg:top-20 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
          {NAV_SERVICES.map(({ icon: Icon, label }, i) => (
            <button
              key={label}
              onClick={() => {
                const el = document.getElementById(`service-${i + 1}`);
                el?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-[#1F5D3A] hover:bg-[#1F5D3A]/5 transition-colors whitespace-nowrap flex-shrink-0"
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ────────────────────────────────────────────────────────────────── */

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
          <motion.div variants={fadeUp} className="w-16 h-16 rounded-2xl bg-[#1F5D3A]/10 flex items-center justify-center mx-auto mb-6">
            <Users className="w-8 h-8 text-[#1F5D3A]" />
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-bold text-gray-900 mb-5">
            Need a Professional Agricultural Solution?
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-500 text-lg max-w-xl mx-auto mb-10">
            Talk to our team today. We'll recommend the right service for your land, budget, and goals.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-[#1F5D3A] text-white font-bold text-base hover:bg-[#174d2f] transition-colors shadow-md"
            >
              Request a Survey <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border-2 border-[#1F5D3A] text-[#1F5D3A] font-semibold text-base hover:bg-[#1F5D3A] hover:text-white transition-all"
            >
              About Our Team
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── PAGE ───────────────────────────────────────────────────────────────── */

export default function Services() {
  return (
    <Layout>
      <PageHero />
      <ServicesIntro />
      <ServicesQuickNav />
      {SERVICES.map((service, i) => (
        <div key={service.id} id={`service-${i + 1}`}>
          <ServiceDetail {...service} />
        </div>
      ))}
      <WhySection />
      <CTASection />
    </Layout>
  );
}
