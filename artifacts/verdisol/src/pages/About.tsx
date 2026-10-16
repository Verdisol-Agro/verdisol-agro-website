import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  Target,
  Eye,
  Globe,
  Users,
  Plane,
  Map,
  Sprout,
  Layers,
  CheckCircle2,
  ArrowRight,
  Shield,
  Lightbulb,
  HeartHandshake,
  Gauge,
  BarChart3,
  FileCheck,
  Compass,
} from "lucide-react";
import Layout from "@/components/Layout";

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

/* ─── 1. Hero ────────────────────────────────────────────────────────────── */

function PageHero() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=1600&q=80)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#1F5D3A]/92 via-[#1F5D3A]/82 to-[#0f3320]/90" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block px-4 py-1.5 rounded-full border border-white/30 bg-white/10 text-white/90 text-sm font-medium tracking-wider mb-6"
        >
          VerdiSol Agro · Our Story
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
        >
          About Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed"
        >
          A Zimbabwean agricultural consultancy combining precision technology, GIS
          expertise and local knowledge to empower farmers, investors, and institutions
          across Africa.
        </motion.p>
      </div>
    </section>
  );
}

/* ─── 2+3. Who We Are ────────────────────────────────────────────────────── */

const TEAM_DISCIPLINES = [
  { icon: Map, label: "GIS Specialists" },
  { icon: Plane, label: "Drone Operators" },
  { icon: Sprout, label: "Agricultural Consultants" },
  { icon: Layers, label: "Land Development Advisors" },
  { icon: Compass, label: "Field Survey Technicians" },
];

function WhoWeAre() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Text */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
          >
            <motion.span variants={fadeUp} className="inline-block px-4 py-1.5 rounded-full bg-[#1F5D3A]/10 text-[#1F5D3A] text-sm font-medium tracking-wide mb-5">
              Who We Are
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-bold text-gray-900 mb-5 leading-tight">
              Zimbabwe's Precision{" "}
              <span className="text-[#1F5D3A]">Agriculture Specialists</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-600 leading-relaxed mb-4">
              VerdiSol Agro (Pvt) Ltd is a Zimbabwean agricultural consultancy specialising
              in precision agriculture, drone surveying, GIS mapping, land use planning, and
              agricultural advisory services operating across Africa.
            </motion.p>
            <motion.p variants={fadeUp} className="text-gray-600 leading-relaxed mb-8">
              We support farmers, investors, agribusinesses, and institutions with
              data-driven insights for land development, productivity improvement, and
              investment decision-making.
            </motion.p>
            <motion.div variants={fadeUp} className="mb-8">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-widest mb-4">
                Our Multidisciplinary Team
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TEAM_DISCIPLINES.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#F5F0E8]">
                    <div className="w-8 h-8 rounded-lg bg-[#1F5D3A]/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-[#1F5D3A]" />
                    </div>
                    <span className="text-sm font-medium text-gray-800">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=900&q=80"
                alt="VerdiSol Agro team at work in the field"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Stats badge */}
            <div className="absolute -bottom-5 -left-4 bg-[#896F32] text-white px-5 py-3.5 rounded-xl shadow-lg">
              <div className="text-2xl font-bold">600+</div>
              <div className="text-xs text-white/80 font-medium">Clients Served</div>
            </div>
            <div className="absolute -top-4 -right-4 bg-[#1F5D3A] text-white px-5 py-3.5 rounded-xl shadow-lg">
              <div className="text-2xl font-bold">10</div>
              <div className="text-xs text-white/80 font-medium">Provinces Active</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── 4. What We Do ─────────────────────────────────────────────────────── */

const WHAT_WE_DO = [
  {
    icon: Plane,
    title: "Drone Technology",
    desc: "Aerial data collection using DJI Mavic 3 Multispectral and survey-grade drone equipment for high-resolution field intelligence.",
  },
  {
    icon: Map,
    title: "GIS Systems",
    desc: "Spatial analysis, orthomosaic mapping, digital elevation models, and GIS-based planning for accurate land insights.",
  },
  {
    icon: Sprout,
    title: "Agricultural Science",
    desc: "Crop planning, soil assessment, irrigation design, and productivity optimisation grounded in agricultural best practice.",
  },
  {
    icon: Layers,
    title: "Land Use Planning",
    desc: "Optimal farm design, enterprise zoning, and legacy blueprints that maximise land productivity and long-term profitability.",
  },
];

function WhatWeDo() {
  return (
    <section className="py-20 bg-[#F5F0E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <InViewSection className="text-center mb-14">
          <motion.span variants={fadeUp} className="inline-block px-4 py-1.5 rounded-full bg-[#1F5D3A]/10 text-[#1F5D3A] text-sm font-medium tracking-wide mb-4">
            Our Approach
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            What We Do
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-500 max-w-2xl mx-auto">
            We integrate four core disciplines to deliver comprehensive, reliable
            agricultural and land development solutions.
          </motion.p>
        </InViewSection>

        <InViewSection className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHAT_WE_DO.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="relative p-7 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-shadow group"
            >
              <div className="absolute top-5 right-5 text-gray-100 font-black text-5xl leading-none select-none">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#1F5D3A] flex items-center justify-center mb-5">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-3 group-hover:text-[#1F5D3A] transition-colors">
                {title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </InViewSection>
      </div>
    </section>
  );
}

/* ─── 5+6. Mission & Vision ─────────────────────────────────────────────── */

function MissionVision() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative p-10 rounded-2xl bg-[#1F5D3A] overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 rounded-bl-full bg-white/5" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-5">Our Mission</h2>
              <p className="text-white/80 leading-relaxed text-base">
                To help farmers, investors, and landowners make informed agricultural and
                land development decisions through accurate data, precision mapping, and
                professional consultancy services.
              </p>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative p-10 rounded-2xl bg-[#896F32] overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 rounded-bl-full bg-white/5" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mb-6">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-5">Our Vision</h2>
              <p className="text-white/80 leading-relaxed text-base">
                To become Africa's leading provider of precision agriculture, GIS, and land
                development solutions, empowering sustainable and profitable agricultural
                growth.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── 7. International Exposure ─────────────────────────────────────────── */

const INTERNATIONAL_POINTS = [
  { icon: Gauge, label: "Precision agriculture systems" },
  { icon: Sprout, label: "Controlled environment agriculture" },
  { icon: Map, label: "GIS and spatial analysis" },
  { icon: Layers, label: "Modern horticultural and agricultural engineering systems" },
];

function InternationalSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-20 bg-[#F5F0E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="rounded-2xl overflow-hidden aspect-[4/3] shadow-xl order-2 lg:order-1"
          >
            <img
              src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=900&q=80"
              alt="International agricultural operations"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Text */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="order-1 lg:order-2"
          >
            <motion.span variants={fadeUp} className="inline-block px-4 py-1.5 rounded-full bg-[#1F5D3A]/10 text-[#1F5D3A] text-sm font-medium tracking-wide mb-5">
              International Standards
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-bold text-gray-900 mb-5 leading-tight">
              International Standards &{" "}
              <span className="text-[#1F5D3A]">Exposure</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-600 leading-relaxed mb-4">
              VerdiSol Agro operates with exposure to international agricultural systems and
              modern precision farming methodologies from the Netherlands.
            </motion.p>
            <motion.p variants={fadeUp} className="text-gray-600 leading-relaxed mb-8">
              We align our work with international standards while adapting solutions to
              African agricultural conditions.
            </motion.p>
            <motion.div variants={fadeUp}>
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-widest mb-4">
                Our approach is informed by global best practices in:
              </h3>
              <ul className="space-y-3">
                {INTERNATIONAL_POINTS.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#1F5D3A]/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-[#1F5D3A]" />
                    </div>
                    <span className="text-gray-700 text-sm">{label}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-6 flex items-center gap-3 px-5 py-4 rounded-xl bg-white border border-[#1F5D3A]/15">
              <Globe className="w-6 h-6 text-[#1F5D3A] flex-shrink-0" />
              <span className="text-sm text-gray-600">
                Exposure to precision farming systems developed in{" "}
                <strong className="text-gray-900">the Netherlands</strong> — adapted for African conditions.
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── 8. Why Choose VerdiSol ─────────────────────────────────────────────── */

const WHY = [
  { icon: Users, title: "600+ Clients Served", desc: "Trusted by smallholder farmers, commercial operations, and institutions." },
  { icon: Globe, title: "International Exposure", desc: "Methodologies informed by global precision agriculture systems." },
  { icon: Plane, title: "Drone & GIS Expertise", desc: "DJI Mavic 3 Multispectral and survey-grade equipment on every engagement." },
  { icon: Gauge, title: "Precision Agricultural Mapping", desc: "Centimetre-accurate outputs for confident land decisions." },
  { icon: Layers, title: "Practical Land Development", desc: "Blueprints and plans that translate directly into productive operations." },
  { icon: FileCheck, title: "Professional Reporting Standards", desc: "Reports that meet institutional, banking, and investment requirements." },
  { icon: BarChart3, title: "Local Expertise + International Methods", desc: "Global standards applied with deep local Zimbabwe knowledge." },
  { icon: CheckCircle2, title: "Reliable, Data-Driven Decisions", desc: "Every recommendation backed by field data and technical analysis." },
];

function WhyChoose() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <InViewSection className="text-center mb-14">
          <motion.span variants={fadeUp} className="inline-block px-4 py-1.5 rounded-full bg-[#1F5D3A]/10 text-[#1F5D3A] text-sm font-medium tracking-wide mb-4">
            Why VerdiSol
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Why Choose VerdiSol Agro?
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-500 max-w-xl mx-auto">
            Precision, integrity, and practical expertise — the foundation of every project we deliver.
          </motion.p>
        </InViewSection>

        <InViewSection className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {WHY.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="p-6 rounded-2xl bg-[#F5F0E8] hover:shadow-md transition-shadow group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#1F5D3A]/10 flex items-center justify-center mb-4 group-hover:bg-[#1F5D3A] transition-colors">
                <Icon className="w-5 h-5 text-[#1F5D3A] group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mb-2">{title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </InViewSection>
      </div>
    </section>
  );
}

/* ─── 9. Values ─────────────────────────────────────────────────────────── */

const VALUES = [
  {
    icon: Gauge,
    name: "Precision",
    color: "bg-[#1F5D3A]",
    desc: "Every recommendation is based on accurate data and analysis. We do not guess — we measure, map, and verify.",
  },
  {
    icon: Shield,
    name: "Integrity",
    color: "bg-[#896F32]",
    desc: "We provide honest, transparent, and professional advice — even when the findings are not what a client hoped to hear.",
  },
  {
    icon: HeartHandshake,
    name: "Accessibility",
    color: "bg-[#1F5D3A]",
    desc: "We support both smallholder and commercial agricultural clients — making professional services available at every scale.",
  },
  {
    icon: Lightbulb,
    name: "Innovation",
    color: "bg-[#896F32]",
    desc: "We use modern technology and international methods to improve agricultural decision-making across Africa.",
  },
];

function ValuesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-20 bg-[#1F5D3A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="text-center mb-14"
        >
          <motion.span variants={fadeUp} className="inline-block px-4 py-1.5 rounded-full bg-white/15 text-white/90 text-sm font-medium tracking-wide mb-4">
            Our Principles
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Our Core Values
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/70 max-w-xl mx-auto">
            The principles that guide every project, every report, and every client relationship.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {VALUES.map(({ icon: Icon, name, desc }) => (
            <motion.div
              key={name}
              variants={fadeUp}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="p-8 rounded-2xl bg-white/10 border border-white/15 hover:bg-white/15 transition-colors text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-5">
                <Icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-white font-bold text-xl mb-3">{name}</h3>
              <p className="text-white/70 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── 10. CTA ────────────────────────────────────────────────────────────── */

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
            Work With Us
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-bold text-gray-900 mb-5">
            Need Agricultural Expertise You Can Trust?
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-500 text-lg max-w-xl mx-auto mb-10">
            We provide professional agricultural consultancy services across Africa — from
            smallholder farms to commercial investment projects.
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
              Explore Services
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── PAGE ───────────────────────────────────────────────────────────────── */

export default function About() {
  return (
    <Layout>
      <PageHero />
      <WhoWeAre />
      <WhatWeDo />
      <MissionVision />
      <InternationalSection />
      <WhyChoose />
      <ValuesSection />
      <CTASection />
    </Layout>
  );
}
