import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useInView,
  animate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  ChevronDown,
  Droplets,
  Plane,
  Map,
  Layers,
  ClipboardList,
  Bookmark,
  CheckCircle2,
  Users,
  Globe,
  Gauge,
  FileCheck,
  Star,
  ArrowRight,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Quote,
  FlaskConical,
  Sprout,
  Waves,
  Fence,
} from "lucide-react";
import Layout from "@/components/Layout";
import vegetablesImage from "@assets/image_1794296544704.png";
import farmlandHeroImage from "@assets/Golden_Hour_Sustainable_Farmland_Banner_1794305560425.png";
import aboutFarmlandImage from "@assets/image_search/about-farmland.jpg";
import cropProductionImage from "@assets/image_search/crop-production.jpg";
import siteAnalysisImage from "@assets/Screenshot_2026-11-10_090239_1794296620040.png";
import slopeAnalysisImage from "@assets/Screenshot_2026-11-10_123905_1794307874676.png";
import fieldVideo from "@assets/0_VID-20261109-WA0022_1794297093106.mp4";

/* ────────────────────────────────────────────────────────────────────────── */
/* Helpers                                                                   */
/* ────────────────────────────────────────────────────────────────────────── */

function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, target, { duration: 2, ease: "easeOut" });
    return controls.stop;
  }, [inView, target, count]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

/* ────────────────────────────────────────────────────────────────────────── */
/* 1. HERO SECTION                                                            */
/* ────────────────────────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#123d2c] py-24 sm:py-28">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${farmlandHeroImage})` }}
      />

      {/* Preserve the golden light while providing contrast behind the copy. */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#092c20]/75 via-[#0c3022]/60 to-[#092c20]/25" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-[#082a1c]/70" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.span
            variants={fadeUp}
            className="inline-block px-4 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium tracking-wider mb-8"
          >
            Professional Agricultural Consultancy
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6 drop-shadow-lg"
          >
            VERDISOL AGRO(PVT) LIMITED &{" "}
            <span className="text-[#A5D951]">
              Revolutionising farming with Drone
            </span>{" "}
            Technology
          </motion.h1>

          <p className="flex items-center justify-center gap-3 text-xl sm:text-2xl font-semibold text-[#F1D78C] tracking-wide mb-5 drop-shadow-md">
            <span aria-hidden="true" className="h-px w-8 bg-[#F1D78C]/70" />
            Redefining Farming
            <span aria-hidden="true" className="h-px w-8 bg-[#F1D78C]/70" />
          </p>

          <motion.p
            variants={fadeUp}
            className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-10 drop-shadow-md"
          >
            Helping farmers, investors and landowners make informed decisions
            through precision agriculture, drone technology, GIS mapping, land
            development and agricultural consultancy.{" "}
            <span className="text-white/85">
              Based in Zimbabwe, serving agricultural projects across Africa.
            </span>
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-[#1F5D3A] text-white font-semibold text-base hover:bg-[#174d2f] transition-all shadow-lg hover:shadow-xl"
            >
              Request a Survey
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border border-white/40 bg-white/10 backdrop-blur-sm text-white font-semibold text-base hover:bg-white/20 transition-all"
            >
              Explore Services
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/60"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4" />
      </motion.div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/* 2. STATISTICS SECTION                                                      */
/* ────────────────────────────────────────────────────────────────────────── */

const STATS = [
  { icon: Users, value: 600, suffix: "+", label: "Clients Served" },
  { icon: Map, value: 120, suffix: "+", label: "Projects Completed" },
  { icon: Globe, value: 10, suffix: "", label: "Provinces Covered" },
  { icon: Gauge, value: 15, suffix: "+", label: "GIS & Drone Specialists" },
];

function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {STATS.map(({ icon: Icon, value, suffix, label }) => (
            <motion.div
              key={label}
              variants={fadeUp}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-[#F5F0E8] border border-[#1F5D3A]/10 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-[#1F5D3A]/10 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-[#1F5D3A]" />
              </div>
              <span className="text-3xl lg:text-4xl font-bold text-[#1F5D3A] mb-1">
                <AnimatedCounter target={value} suffix={suffix} />
              </span>
              <span className="text-sm text-gray-500 font-medium">{label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/* 3. COVERAGE STRIP                                                          */
/* ────────────────────────────────────────────────────────────────────────── */

const PROVINCES = [
  "Harare",
  "Bulawayo",
  "Mashonaland East",
  "Mashonaland West",
  "Mashonaland Central",
  "Midlands",
  "Manicaland",
  "Masvingo",
  "Matabeleland North",
  "Matabeleland South",
];

function CoverageSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-16 bg-[#1F5D3A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="text-center mb-10"
        >
          <motion.span
            variants={fadeUp}
            className="inline-block px-4 py-1.5 rounded-full bg-white/15 text-white/90 text-sm font-medium tracking-wide mb-4"
          >
            Zimbabwe · Africa
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-3xl lg:text-4xl font-bold text-white mb-3"
          >
            Based in Zimbabwe, Serving Africa
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-white/70 max-w-xl mx-auto"
          >
            VerdiSol Agro (Pvt) Ltd is an agricultural consultancy based in
            Zimbabwe, operating across projects in Africa.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"
        >
          {PROVINCES.map((province) => (
            <motion.div
              key={province}
              variants={fadeUp}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 border border-white/20 hover:bg-white/15 transition-colors"
            >
              <MapPin className="w-4 h-4 text-[#8CC63F] flex-shrink-0" />
              <span className="text-white text-sm font-medium">{province}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/* 4. SERVICES PREVIEW                                                        */
/* ────────────────────────────────────────────────────────────────────────── */

const SERVICES = [
  {
    icon: Droplets,
    title: "Underground Water Surveys",
    description:
      "Advanced geophysical techniques to locate reliable underground water sources for boreholes and irrigation.",
  },
  {
    icon: Plane,
    title: "Drone Surveying",
    description:
      "High-resolution aerial surveys using DJI Mavic 3 Multispectral technology for accurate field data.",
  },
  {
    icon: Map,
    title: "Aerial Mapping",
    description:
      "Precision GIS mapping and orthomosaic imagery for land management and agricultural planning.",
  },
  {
    icon: Layers,
    title: "Land Use Planning",
    description:
      "Strategic land use assessment and planning aligned with international standards and local regulations.",
  },
  {
    icon: ClipboardList,
    title: "Farm Assessments & Valuations",
    description:
      "Comprehensive farm appraisals covering soil health, productivity potential, and market valuation.",
  },
  {
    icon: Bookmark,
    title: "Boundary Pegging",
    description:
      "Accurate property demarcation and boundary verification using GPS and survey-grade equipment.",
  },
  {
    icon: FlaskConical,
    title: "Soil Analysis",
    description:
      "Soil assessment and interpretation to guide crop selection, soil improvement, and farm management.",
  },
  {
    icon: Sprout,
    title: "Crop Advisory",
    description:
      "Practical crop selection, seasonal planning, and in-season guidance tailored to local field conditions.",
  },
  {
    icon: Waves,
    title: "Irrigation Planning",
    description:
      "Water-demand and field-layout planning to help farms use available water efficiently.",
  },
  {
    icon: Fence,
    title: "Agricultural Engineering (Fencing)",
    description:
      "Farm perimeter and paddock fencing plans designed around terrain, access, and livestock movement.",
  },
];

function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="text-center mb-14"
        >
          <motion.span
            variants={fadeUp}
            className="inline-block px-4 py-1.5 rounded-full bg-[#1F5D3A]/10 text-[#1F5D3A] text-sm font-medium tracking-wide mb-4"
          >
            What We Offer
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
          >
            Our Core Services
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-gray-500 max-w-2xl mx-auto"
          >
            Precision-driven agricultural solutions powered by drone technology
            and expert GIS analysis.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SERVICES.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group p-7 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-lg hover:border-[#1F5D3A]/20 transition-all cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-[#1F5D3A]/10 flex items-center justify-center mb-5 group-hover:bg-[#1F5D3A] transition-colors">
                <Icon className="w-6 h-6 text-[#1F5D3A] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-gray-900 font-semibold text-lg mb-3 group-hover:text-[#1F5D3A] transition-colors">
                {title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {description}
              </p>
              <div className="flex items-center gap-1 mt-5 text-[#1F5D3A] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="text-center mt-12"
        >
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-[#1F5D3A] text-[#1F5D3A] font-semibold hover:bg-[#1F5D3A] hover:text-white transition-all"
          >
            View All Services <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/* 5. ABOUT PREVIEW                                                           */
/* ────────────────────────────────────────────────────────────────────────── */

function AboutPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-20 bg-[#F5F0E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-gray-200 shadow-xl">
              <img
                src={aboutFarmlandImage}
                alt="Aerial view of green crops planted in precise rows"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-5 -right-4 bg-[#1F5D3A] text-white px-5 py-3.5 rounded-xl shadow-lg">
              <div className="text-2xl font-bold">10+</div>
              <div className="text-xs text-white/80 font-medium">
                Years Experience
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
          >
            <motion.span
              variants={fadeUp}
              className="inline-block px-4 py-1.5 rounded-full bg-[#1F5D3A]/10 text-[#1F5D3A] text-sm font-medium tracking-wide mb-5"
            >
              About VerdiSol Agro
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Multidisciplinary Expertise,{" "}
              <span className="text-[#1F5D3A]">Local Knowledge</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-gray-600 leading-relaxed mb-4"
            >
              VerdiSol Agro is a multidisciplinary agricultural consultancy
              combining GIS specialists, drone operators, and agricultural
              advisors.
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="text-gray-600 leading-relaxed mb-8"
            >
              We integrate drone technology, GIS mapping, agricultural science,
              and international land-use planning standards with deep local
              expertise — giving our clients reliable, actionable insights for
              every project.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-8">
              {[
                "GIS Mapping",
                "Drone Technology",
                "Agricultural Science",
                "Land Planning",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-[#1F5D3A]/10 text-[#1F5D3A] text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
            <motion.div variants={fadeUp}>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#1F5D3A] text-white font-semibold hover:bg-[#174d2f] transition-colors shadow-sm"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/* 6. WHY CHOOSE VERDISOL                                                     */
/* ────────────────────────────────────────────────────────────────────────── */

const FEATURES = [
  {
    icon: Users,
    title: "600+ Clients Served",
    desc: "Trusted by farmers, investors, and institutions across Africa.",
  },
  {
    icon: Globe,
    title: "Africa Coverage",
    desc: "Based in Zimbabwe, delivering agricultural projects across Africa.",
  },
  {
    icon: Plane,
    title: "Drone & GIS Expertise",
    desc: "DJI Mavic 3 Multispectral and survey-grade GIS equipment.",
  },
  {
    icon: Gauge,
    title: "Precision Mapping",
    desc: "Centimeter-accurate outputs for confident decision-making.",
  },
  {
    icon: CheckCircle2,
    title: "Practical Solutions",
    desc: "Recommendations grounded in local farming realities.",
  },
  {
    icon: FileCheck,
    title: "International Standards",
    desc: "Reports that meet global agricultural and surveying benchmarks.",
  },
];

function WhyVerdiSol() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="text-center mb-14"
        >
          <motion.span
            variants={fadeUp}
            className="inline-block px-4 py-1.5 rounded-full bg-[#1F5D3A]/10 text-[#1F5D3A] text-sm font-medium tracking-wide mb-4"
          >
            Why Choose Us
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
          >
            Why Choose VerdiSol Agro?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-gray-500 max-w-xl mx-auto"
          >
            Precision, reliability, and practical expertise — all under one
            roof.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="flex gap-4 p-6 rounded-2xl bg-[#F5F0E8] hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 rounded-lg bg-[#1F5D3A]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon className="w-5 h-5 text-[#1F5D3A]" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/* 7. FEATURED PROJECTS                                                       */
/* ────────────────────────────────────────────────────────────────────────── */

const PROJECTS = [
  {
    image: cropProductionImage,
    title: "Fresh Crop Production",
    description:
      "A closer look at crops and produce supported by informed agricultural planning.",
    location: "Agricultural practice",
    tag: "Crop Production",
  },
  {
    image: siteAnalysisImage,
    title: "GIS Site Analysis",
    description:
      "Spatial mapping output showing survey targets, terrain patterns, and coordinates.",
    location: "GIS deliverable",
    tag: "Site Mapping",
  },
  {
    image: slopeAnalysisImage,
    title: "Slope & Terrain Analysis",
    description:
      "Terrain analysis output that makes slope conditions easier to review and plan around.",
    location: "GIS deliverable",
    tag: "Terrain Analysis",
  },
];

function FeaturedProjects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-20 bg-[#F5F0E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
        >
          <div>
            <motion.span
              variants={fadeUp}
              className="inline-block px-4 py-1.5 rounded-full bg-[#1F5D3A]/10 text-[#1F5D3A] text-sm font-medium tracking-wide mb-4"
            >
              Our Work
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="text-3xl lg:text-4xl font-bold text-gray-900"
            >
              Featured Projects
            </motion.h2>
          </div>
          <motion.div variants={fadeUp}>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-[#1F5D3A] font-semibold hover:gap-3 transition-all"
            >
              View All Projects <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {PROJECTS.map(({ image, title, description, location, tag }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all group"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={image}
                  alt={title}
                  className={`w-full h-full ${
                    image === siteAnalysisImage || image === slopeAnalysisImage
                      ? "object-contain bg-white p-2"
                      : "object-cover group-hover:scale-105 transition-transform duration-500"
                  }`}
                />
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 rounded-full bg-[#1F5D3A]/10 text-[#1F5D3A] text-xs font-medium mb-3">
                  {tag}
                </span>
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  {title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  {description}
                </p>
                <div className="flex items-center gap-1.5 text-[#896F32] text-sm font-medium">
                  <MapPin className="w-3.5 h-3.5" />
                  {location}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/* 8. DRONE VIDEO SECTION                                                     */
/* ────────────────────────────────────────────────────────────────────────── */

function DroneVideoSection() {
  return (
    <section className="relative overflow-hidden bg-[#123d2c] py-20 sm:py-24">
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-[#8CC63F]/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-[28rem] w-[28rem] rounded-full bg-[#C7A85A]/15 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="max-w-xl"
        >
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium tracking-wide text-[#cfe7a8]">
            Technology in Action
          </span>
          <h2 className="mt-5 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            See the work behind the results.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/75 sm:text-lg">
            A field view of VerdiSol’s agricultural work, supported by drone
            technology, careful surveying, and practical land analysis.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {["Field operations", "Drone technology", "Zimbabwe"].map((label) => (
              <span
                key={label}
                className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white/85"
              >
                {label}
              </span>
            ))}
          </div>
          <p className="mt-10 text-sm font-semibold tracking-[0.2em] text-[#8CC63F]">
            REDEFINING FARMING
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto w-full max-w-[390px]"
        >
          <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-[#8CC63F]/60 via-white/10 to-[#C7A85A]/50 blur-xl" />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/20 bg-black p-2 shadow-2xl shadow-black/40">
            <video
              controls
              playsInline
              preload="metadata"
              poster={vegetablesImage}
              className="aspect-[9/16] w-full rounded-[1.2rem] bg-black object-contain"
              aria-label="VerdiSol field operations video"
            >
              <source src={fieldVideo} type="video/mp4" />
              Your browser does not support embedded video.
            </video>
          </div>
          <div className="absolute -bottom-5 -left-5 rounded-2xl border border-white/15 bg-[#f5f0e8] px-5 py-3 shadow-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1F5D3A]">
              VerdiSol Agro
            </p>
            <p className="mt-1 text-sm font-medium text-gray-700">
              Field footage
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/* 9. TESTIMONIALS                                                            */
/* ────────────────────────────────────────────────────────────────────────── */

const TESTIMONIALS = [
  {
    name: "Mr. Tendai Moyo",
    role: "Smallholder Farmer",
    location: "Mashonaland West",
    text: "VerdiSol located water on my farm in a day. I now have a borehole that irrigates 15 hectares year-round. Their service changed my farming completely.",
    rating: 5,
  },
  {
    name: "Ms. Rudo Chikwanda",
    role: "Agribusiness Investor",
    location: "Harare",
    text: "The GIS maps and farm assessment report VerdiSol provided gave us the confidence to invest in a 300 ha commercial farm. Highly professional team.",
    rating: 5,
  },
  {
    name: "FBC Bank Ltd",
    role: "Institutional Client",
    location: "Harare CBD",
    text: "We engaged VerdiSol for boundary verification across multiple loan-secured farms. Their accuracy, timeliness, and reports meet our institutional standards.",
    rating: 5,
  },
];

function Testimonials() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const prev = () =>
    setActive((a) => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setActive((a) => (a + 1) % TESTIMONIALS.length);

  return (
    <section ref={ref} className="py-20 bg-[#F5F0E8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="text-center mb-12"
        >
          <motion.span
            variants={fadeUp}
            className="inline-block px-4 py-1.5 rounded-full bg-[#1F5D3A]/10 text-[#1F5D3A] text-sm font-medium tracking-wide mb-4"
          >
            Client Stories
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-3xl lg:text-4xl font-bold text-gray-900"
          >
            What Our Clients Say
          </motion.h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="bg-white rounded-2xl shadow-md p-8 sm:p-10 min-h-[260px] flex flex-col justify-between">
            <Quote className="w-10 h-10 text-[#1F5D3A]/20 mb-4" />

            <motion.div
              key={active}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35 }}
            >
              <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                "{TESTIMONIALS[active].text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-[#1F5D3A]/10 flex items-center justify-center">
                  <span className="text-[#1F5D3A] font-bold text-sm">
                    {TESTIMONIALS[active].name[0]}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {TESTIMONIALS[active].name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {TESTIMONIALS[active].role} ·{" "}
                    {TESTIMONIALS[active].location}
                  </div>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: TESTIMONIALS[active].rating }).map(
                    (_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-[#896F32] fill-[#896F32]"
                      />
                    ),
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-[#1F5D3A]/30 flex items-center justify-center text-[#1F5D3A] hover:bg-[#1F5D3A] hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === active ? "bg-[#1F5D3A] w-5" : "bg-[#1F5D3A]/30"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-[#1F5D3A]/30 flex items-center justify-center text-[#1F5D3A] hover:bg-[#1F5D3A] hover:text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/* 10. CTA SECTION                                                            */
/* ────────────────────────────────────────────────────────────────────────── */

function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-20 bg-[#1F5D3A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-5 leading-tight"
          >
            Need a Professional Agricultural Survey?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-white/70 text-lg max-w-xl mx-auto mb-10"
          >
            Talk to our team today. We'll assess your needs and recommend the
            right solution for your land.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-[#1F5D3A] font-bold text-base hover:bg-[#F5F0E8] transition-colors shadow-lg"
            >
              Request a Survey <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border border-white/30 bg-white/10 text-white font-semibold text-base hover:bg-white/20 transition-colors"
            >
              Our Services
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/* HOME PAGE                                                                  */
/* ────────────────────────────────────────────────────────────────────────── */

export default function Home() {
  return (
    <Layout>
      <Hero />
      <StatsSection />
      <CoverageSection />
      <ServicesSection />
      <AboutPreview />
      <WhyVerdiSol />
      <FeaturedProjects />
      <DroneVideoSection />
      <Testimonials />
      <CTASection />
    </Layout>
  );
}
