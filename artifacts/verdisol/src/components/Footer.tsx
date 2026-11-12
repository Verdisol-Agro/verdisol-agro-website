import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { FaFacebookF, FaXTwitter } from "react-icons/fa6";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "Contact", to: "/contact" },
];

const services = [
  "Underground Water Surveys",
  "Drone Surveying",
  "Aerial Mapping",
  "Land Use Planning",
  "Farm Assessments & Valuations",
  "Boundary Pegging",
  "Agricultural Investment & Consultancy",
  "Soil Analysis",
  "Crop Advisory",
  "Irrigation Planning",
  "Agricultural Engineering (Fencing)",
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1F5D3A] text-white">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-5 w-fit rounded-md bg-white px-2 py-1.5">
              <img
                src={`${import.meta.env.BASE_URL}verdisol-logo.png`}
                alt="VerdiSol Agro (Pvt) Ltd"
                className="block w-44 h-auto"
              />
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-xs">
              Professional agricultural surveying and advisory services. Committed to sustainable and productive farming solutions across Zimbabwe and Africa.
            </p>
            {/* WhatsApp Button */}
            <a
              href="https://wa.me/263777226654"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#A5D33C] text-[#1F5D3A] text-sm font-semibold hover:bg-[#8FC22F] transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
            <div className="mt-5 flex items-center gap-3">
              <span className="text-xs text-white/60">Follow us</span>
              <a
                href="https://x.com/Tatenda_Agro"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="VerdiSol Agro on X (Twitter)"
                title="X (Twitter)"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white/80 transition-colors hover:border-[#A5D33C] hover:bg-[#A5D33C] hover:text-[#1F5D3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A5D33C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F5D3A]"
              >
                <FaXTwitter aria-hidden="true" className="h-4 w-4" />
              </a>
              <a
                href="https://www.facebook.com/share/19m36uBt4H/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="VerdiSol Agro on Facebook"
                title="Facebook"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white/80 transition-colors hover:border-[#A5D33C] hover:bg-[#A5D33C] hover:text-[#1F5D3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A5D33C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F5D3A]"
              >
                <FaFacebookF aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-5 pb-2 border-b border-white/20">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-white/70 text-sm hover:text-white transition-colors hover:pl-1 inline-block duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-5 pb-2 border-b border-white/20">
              Services
            </h3>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-white/70 text-sm">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-5 pb-2 border-b border-white/20">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D1B766] mt-0.5 flex-shrink-0" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=VerdiSol%20Agro%2C%20Borgward%2C%20Msasa%2C%20Harare%2C%20Zimbabwe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 text-sm leading-relaxed hover:text-white hover:underline underline-offset-4 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D1B766] rounded-sm"
                  aria-label="Find VerdiSol Agro at Borgward, Msasa, Harare in Google Maps (opens in a new tab)"
                >
                  Borgward, Masasa,<br />
                  Harare, Zimbabwe
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#D1B766] flex-shrink-0" />
                <div className="flex flex-col text-sm">
                  <a
                    href="tel:+263777226654"
                    className="text-white/70 hover:text-white hover:underline underline-offset-4 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D1B766] rounded-sm"
                    aria-label="Call VerdiSol Agro on +263 777 226 654"
                  >
                    +263 777 226 654
                  </a>
                  <a
                    href="tel:+263781939896"
                    className="text-white/70 hover:text-white hover:underline underline-offset-4 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D1B766] rounded-sm"
                    aria-label="Call VerdiSol Agro on +263 781 939 896"
                  >
                    +263 781 939 896
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#D1B766] flex-shrink-0" />
                <a
                  href="mailto:verdisolagro@gmail.com"
                  className="text-white/70 text-sm hover:text-white hover:underline underline-offset-4 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D1B766] rounded-sm"
                  aria-label="Compose an email to VerdiSol Agro"
                >
                  verdisolagro@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/50 text-xs text-center sm:text-left">
            &copy; {currentYear} VerdiSol Agro (Pvt) Ltd. All rights reserved.
          </p>
          <p className="text-white/40 text-xs">
            Cultivating Growth. Sustaining Earth.
          </p>
        </div>
      </div>
    </footer>
  );
}
