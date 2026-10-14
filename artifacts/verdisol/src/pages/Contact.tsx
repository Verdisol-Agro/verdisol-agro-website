import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  ArrowRight,
  Send,
  CheckCircle2,
  Droplets,
  Plane,
  Map,
  Layers,
  ClipboardList,
  TrendingUp,
  Gauge,
  FileCheck,
  Globe,
  Users,
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

const WHATSAPP_URL = "https://wa.me/263777226654";

/* ─── 1. Hero ────────────────────────────────────────────────────────────── */

function PageHero() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-[#1F5D3A]">
      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 50%, #4CAF73 0%, transparent 50%),
                            radial-gradient(circle at 75% 20%, #8B5E3C 0%, transparent 40%)`,
        }}
      />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block px-4 py-1.5 rounded-full border border-white/30 bg-white/10 text-white/90 text-sm font-medium tracking-wider mb-6"
        >
          VerdiSol Agro · Get in Touch
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
        >
          Contact Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed"
        >
          Get in touch for agricultural surveys, drone mapping, GIS analysis,
          land development planning, and consultancy services across Africa and
          beyond.
        </motion.p>
      </div>
    </section>
  );
}

/* ─── 3. Contact Form ────────────────────────────────────────────────────── */

const SERVICE_OPTIONS = [
  "Underground Water Surveys",
  "Drone Surveying",
  "Aerial Mapping",
  "Land Use Planning",
  "Farm Assessment & Valuation",
  "Boundary Pegging",
  "Agricultural Investment Consultancy",
];

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  location: string;
  service: string;
  message: string;
}

function ContactForm() {
  const [form, setForm] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
    location: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate submission (wire to real endpoint later)
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center text-center py-16 px-8"
      >
        <div className="w-16 h-16 rounded-full bg-[#1F5D3A]/10 flex items-center justify-center mb-5">
          <CheckCircle2 className="w-8 h-8 text-[#1F5D3A]" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Request Sent!</h3>
        <p className="text-gray-500 max-w-sm">
          Thank you for contacting VerdiSol Agro. We typically respond within 24
          hours.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({
              fullName: "",
              phone: "",
              email: "",
              location: "",
              service: "",
              message: "",
            });
          }}
          className="mt-8 px-5 py-2.5 rounded-lg border border-[#1F5D3A] text-[#1F5D3A] text-sm font-semibold hover:bg-[#1F5D3A] hover:text-white transition-colors"
        >
          Send Another Request
        </button>
      </motion.div>
    );
  }

  const inputCls =
    "w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1F5D3A]/30 focus:border-[#1F5D3A] transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            name="fullName"
            type="text"
            required
            value={form.fullName}
            onChange={handleChange}
            placeholder="Your full name"
            className={inputCls}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            name="phone"
            type="tel"
            required
            value={form.phone}
            onChange={handleChange}
            placeholder="+263777226654"
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Email Address
        </label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="your@email.com"
          className={inputCls}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Farm / Project Location <span className="text-red-500">*</span>
        </label>
        <input
          name="location"
          type="text"
          required
          value={form.location}
          onChange={handleChange}
          placeholder="e.g. Mashonaland East, Zimbabwe"
          className={inputCls}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Service Required <span className="text-red-500">*</span>
        </label>
        <select
          name="service"
          required
          value={form.service}
          onChange={handleChange}
          className={`${inputCls} appearance-none cursor-pointer`}
        >
          <option value="">Select a service…</option>
          {SERVICE_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Message / Project Details <span className="text-red-500">*</span>
        </label>
        <textarea
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Describe your project, land size, specific requirements…"
          className={`${inputCls} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#1F5D3A] text-white font-bold text-base hover:bg-[#174d2f] disabled:opacity-70 transition-all shadow-md hover:shadow-lg"
      >
        {loading ? (
          <>
            <svg
              className="animate-spin w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
            Sending…
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Send Request
          </>
        )}
      </button>

      <p className="text-center text-xs text-gray-400">
        We typically respond within 24 hours on business days.
      </p>
    </form>
  );
}

/* ─── 4. Contact Details ─────────────────────────────────────────────────── */

function ContactDetails() {
  return (
    <div className="space-y-6">
      {/* Intro */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          Contact Information
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed">
          We are available to support agricultural projects across Africa.
          Contact VerdiSol Agro for professional surveying, mapping, and
          agricultural consultancy services. We typically respond within 24
          hours.
        </p>
      </div>

      {/* Info cards */}
      {[
        {
          icon: MapPin,
          label: "Office Location",
          value: "Msasa, Harare, Zimbabwe",
          sub: null,
        },
        {
          icon: Phone,
          label: "Phone",
          value: "+263 777 226 6654",
          sub: null,
        },
        {
          icon: Mail,
          label: "Email",
          value: "info@verdisolagro.com",
          sub: null,
        },
        {
          icon: Clock,
          label: "Business Hours",
          value: "Monday – Friday: 8:00 – 17:00",
          sub: "Saturday: By appointment",
        },
      ].map(({ icon: Icon, label, value, sub }) => (
        <div key={label} className="flex gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#1F5D3A]/10 flex items-center justify-center flex-shrink-0">
            <Icon className="w-5 h-5 text-[#1F5D3A]" />
          </div>
          <div>
            <div className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">
              {label}
            </div>
            <div className="text-gray-900 font-semibold text-sm">{value}</div>
            {sub && <div className="text-gray-400 text-xs mt-0.5">{sub}</div>}
          </div>
        </div>
      ))}

      {/* WhatsApp button */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-[#25D366] text-white font-semibold hover:bg-[#1fb355] transition-colors shadow-sm mt-6 w-full justify-center"
      >
        <MessageCircle className="w-5 h-5" />
        Chat on WhatsApp
      </a>

      {/* Service response list */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <h4 className="text-sm font-semibold text-gray-700 mb-4">
          We respond to enquiries related to:
        </h4>
        <ul className="space-y-2">
          {[
            { icon: Droplets, label: "Water Surveys" },
            { icon: Plane, label: "Drone Mapping" },
            { icon: Map, label: "Farm Planning" },
            { icon: Layers, label: "Land Development" },
            { icon: TrendingUp, label: "Agricultural Investment Projects" },
          ].map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-3 text-sm text-gray-600"
            >
              <CheckCircle2 className="w-4 h-4 text-[#1F5D3A] flex-shrink-0" />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ─── 5. Floating WhatsApp (mobile) ─────────────────────────────────────── */

function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-[#25D366] text-white text-sm font-semibold shadow-xl hover:bg-[#1fb355] transition-all hover:scale-105 lg:hidden"
    >
      <MessageCircle className="w-5 h-5" />
      WhatsApp
    </a>
  );
}

/* ─── 6. Map ─────────────────────────────────────────────────────────────── */

function MapSection() {
  return (
    <section className="py-16 bg-[#F5F0E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <InViewSection className="mb-8 text-center">
          <motion.h2
            variants={fadeUp}
            className="text-2xl font-bold text-gray-900 mb-2"
          >
            Our Location
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-500 text-sm">
            Msasa, Harare, Zimbabwe
          </motion.p>
        </InViewSection>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl overflow-hidden shadow-xl border border-gray-200"
        >
          <iframe
            title="VerdiSol Agro Location — Msasa, Harare"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15188.344!2d31.108!3d-17.834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1931a4e5a6b5a5a5%3A0x0!2sMsasa%2C%20Harare%2C%20Zimbabwe!5e0!3m2!1sen!2szw!4v1700000000000"
            width="100%"
            height="420"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ─── 8. Why Contact VerdiSol ────────────────────────────────────────────── */

const WHY = [
  {
    icon: ClipboardList,
    title: "Professional Agricultural Consultancy",
    desc: "Expert agronomists, GIS specialists, and drone operators working together.",
  },
  {
    icon: Plane,
    title: "Drone & GIS Specialists",
    desc: "DJI Mavic 3 Multispectral and survey-grade equipment on every project.",
  },
  {
    icon: Globe,
    title: "Continent Coverage",
    desc: "Active across Zimbabwe and expanding to support clients across Africa.",
  },
  {
    icon: Gauge,
    title: "Data-Driven Decision Making",
    desc: "Every recommendation backed by field data and technical analysis.",
  },
  {
    icon: FileCheck,
    title: "Reliable Reporting & Analysis",
    desc: "Bank-ready, investor-grade reports delivered on time, every time.",
  },
  {
    icon: Users,
    title: "600+ Clients Served",
    desc: "Trusted by farmers, investors, and institutions across Zimbabwe.",
  },
];

function WhyContact() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <InViewSection className="text-center mb-10">
          <motion.span
            variants={fadeUp}
            className="inline-block px-4 py-1.5 rounded-full bg-[#1F5D3A]/10 text-[#1F5D3A] text-sm font-medium tracking-wide mb-4"
          >
            Why VerdiSol Agro
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-2xl lg:text-3xl font-bold text-gray-900"
          >
            Why Contact VerdiSol Agro?
          </motion.h2>
        </InViewSection>

        <InViewSection className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {WHY.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="flex gap-4 p-5 rounded-2xl bg-[#F5F0E8] hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 rounded-lg bg-[#1F5D3A]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon className="w-5 h-5 text-[#1F5D3A]" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">
                  {title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </InViewSection>
      </div>
    </section>
  );
}

/* ─── 9. Final CTA ───────────────────────────────────────────────────────── */

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
            className="text-3xl lg:text-4xl font-bold text-white mb-4"
          >
            Need a Professional Agricultural Solution?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-white/70 text-lg max-w-xl mx-auto mb-10"
          >
            We help farmers and investors make informed land and agricultural
            decisions.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#contact-form"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-[#1F5D3A] font-bold text-base hover:bg-[#F5F0E8] transition-colors shadow-lg"
            >
              Request a Survey <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border border-white/30 bg-white/10 text-white font-semibold text-base hover:bg-white/20 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── PAGE ───────────────────────────────────────────────────────────────── */

export default function Contact() {
  return (
    <Layout>
      <PageHero />

      {/* Form + Details section */}
      <section id="contact-form" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-14">
            {/* Form — wider column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="mb-8">
                <span className="inline-block px-4 py-1.5 rounded-full bg-[#1F5D3A]/10 text-[#1F5D3A] text-sm font-medium tracking-wide mb-4">
                  Send an Enquiry
                </span>
                <h2 className="text-3xl font-bold text-gray-900">
                  Tell Us About Your Project
                </h2>
              </div>
              <div className="bg-[#F5F0E8] rounded-2xl p-8">
                <ContactForm />
              </div>
            </motion.div>

            {/* Details — narrower column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <ContactDetails />
            </motion.div>
          </div>
        </div>
      </section>

      <MapSection />
      <WhyContact />
      <CTASection />

      {/* Floating WhatsApp — mobile only */}
      <FloatingWhatsApp />
    </Layout>
  );
}
