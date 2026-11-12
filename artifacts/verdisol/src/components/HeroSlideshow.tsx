import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import originalFarmland from "@assets/Golden_Hour_Sustainable_Farmland_Banner_1794305560425.png";
import greenFields from "@assets/image_search/hero-green-fields.jpg";
import aerialFarmland from "@assets/image_search/hero-aerial-farmland.jpg";
import vineyardSunrise from "@assets/image_search/hero-vineyard-sunrise.jpg";
import wheatSunset from "@assets/image_search/hero-wheat-sunset.jpg";

const slides = [
  { image: originalFarmland, label: "Golden-hour farmland" },
  { image: greenFields, label: "Lush green agricultural fields" },
  { image: vineyardSunrise, label: "Sunrise over productive vineyards" },
  { image: aerialFarmland, label: "Aerial view of cultivated fields" },
  { image: wheatSunset, label: "Golden wheat at sunset" },
];

export default function HeroSlideshow() {
  const container = useRef<HTMLDivElement>(null);
  const inView = useInView(container, { amount: 0.15 });
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  // An explicit Play choice can override the default reduced-motion pause.
  const [playbackChoice, setPlaybackChoice] = useState<boolean | null>(null);
  const [hoveringControls, setHoveringControls] = useState(false);
  const [focusingControls, setFocusingControls] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const playing = playbackChoice ?? !reducedMotion;

  useEffect(() => {
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    if (!playing || !inView || !pageVisible || hoveringControls || focusingControls) return;
    const timer = window.setTimeout(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 6000);
    return () => window.clearTimeout(timer);
  }, [active, playing, inView, pageVisible, hoveringControls, focusingControls]);

  const move = (direction: number) => {
    setActive((current) => (current + direction + slides.length) % slides.length);
  };

  return (
    <div
      ref={container}
      className="absolute inset-0"
      role="region"
      aria-roledescription="carousel"
      aria-label="Farming photo slideshow"
    >
      {slides.map((slide, index) => (
        <img
          key={slide.image}
          src={slide.image}
          alt=""
          aria-hidden="true"
          decoding="async"
          fetchPriority={index === 0 ? "high" : "low"}
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000 motion-reduce:transition-none ${
            active === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div
        className="absolute bottom-6 right-4 sm:right-6 z-20 flex items-center gap-1 rounded-full border border-white/25 bg-[#092c20]/80 px-2 py-1.5 text-white shadow-lg backdrop-blur-sm"
        onMouseEnter={() => setHoveringControls(true)}
        onMouseLeave={() => setHoveringControls(false)}
        onFocusCapture={() => setFocusingControls(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setFocusingControls(false);
          }
        }}
      >
        <button
          type="button"
          onClick={() => move(-1)}
          aria-label="Previous banner photo"
          className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </button>
        {slides.map((slide, index) => (
          <button
            key={slide.label}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Show photo ${index + 1} of ${slides.length}: ${slide.label}`}
            aria-pressed={index === active}
            className="flex h-9 w-6 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            <span
              aria-hidden="true"
              className={`h-2 rounded-full transition-all motion-reduce:transition-none ${
                index === active ? "w-4 bg-[#A5D951]" : "w-2 bg-white/65"
              }`}
            />
          </button>
        ))}
        <button
          type="button"
          onClick={() => move(1)}
          aria-label="Next banner photo"
          className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => setPlaybackChoice(!playing)}
          aria-label={playing ? "Pause banner slideshow" : "Play banner slideshow"}
          className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        >
          {playing ? (
            <Pause className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Play className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
}
