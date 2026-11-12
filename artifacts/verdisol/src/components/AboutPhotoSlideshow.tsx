import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import dronePhoto from "@assets/image_search/precision-agriculture-drone.jpg";
import surveyingPhoto from "@assets/image_search/field-surveying-equipment.jpg";
import cropPhoto from "@assets/image_search/african-farmer-crop-inspection.jpg";
import farmlandPhoto from "@assets/image_search/aerial-farmland-planning.jpg";
import soilPhoto from "@assets/image_search/soil-seeds-agricultural-science.jpg";

interface PhotoSlide {
  src: string;
  title: string;
  alt: string;
  fit?: "cover" | "contain";
}

const defaultSlides: PhotoSlide[] = [
  {
    src: dronePhoto,
    title: "Drone Technology",
    alt: "Agricultural drones and a field technician beside cultivated farmland",
  },
  {
    src: surveyingPhoto,
    title: "Field Surveying",
    alt: "Precision total-station equipment used for land surveying",
  },
  {
    src: cropPhoto,
    title: "Crop Assessment",
    alt: "An African farmer inspecting plants in a field",
  },
  {
    src: farmlandPhoto,
    title: "Land Planning & GIS",
    alt: "Aerial view of agricultural fields showing different land-use zones",
  },
  {
    src: soilPhoto,
    title: "Agricultural Science",
    alt: "Hands examining soil and seeds for agricultural cultivation",
  },
];

export default function AboutPhotoSlideshow({
  slides = defaultSlides,
  className = "relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#123d2c] shadow-2xl",
  label = "Precision agriculture expertise photos",
}: {
  slides?: PhotoSlide[];
  className?: string;
  label?: string;
} = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.25 });
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(!reduceMotion);
  const [isHovered, setIsHovered] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);

  useEffect(() => {
    if (!isInView || !isPlaying || isHovered || hasFocus) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) {
        setActiveIndex((index) => (index + 1) % slides.length);
      }
    }, 5000);
    return () => window.clearInterval(timer);
  }, [isInView, isPlaying, isHovered, hasFocus, slides.length]);

  function selectSlide(index: number) {
    setActiveIndex((index + slides.length) % slides.length);
    setIsPlaying(false);
  }

  const buttonClass =
    "flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-[#1F5D3A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

  return (
    <div
      ref={ref}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setHasFocus(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHasFocus(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          selectSlide(activeIndex + (event.key === "ArrowLeft" ? -1 : 1));
        }
      }}
    >
      {slides.map((slide, index) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={index === activeIndex ? slide.alt : ""}
          aria-hidden={index !== activeIndex}
          className={`absolute inset-0 h-full w-full ${slide.fit === "contain" ? "object-contain" : "object-cover"} ${
            reduceMotion ? "" : "transition-opacity duration-700"
          } ${index === activeIndex ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/15" />
      <p
        aria-live={isPlaying ? "off" : "polite"}
        aria-atomic="true"
        className="absolute left-4 top-4 max-w-[65%] rounded-full border border-white/20 bg-[#123d2c]/85 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm"
      >
        {slides[activeIndex].title}
        <span className="sr-only">, photo {activeIndex + 1} of {slides.length}</span>
      </p>
      <button
        type="button"
        className={`${buttonClass} absolute left-3 top-1/2 -translate-y-1/2`}
        onClick={() => selectSlide(activeIndex - 1)}
        aria-label="Previous expertise photo"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        className={`${buttonClass} absolute right-3 top-1/2 -translate-y-1/2`}
        onClick={() => selectSlide(activeIndex + 1)}
        aria-label="Next expertise photo"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
      <div className="absolute bottom-3 right-3 flex items-center gap-1">
        {slides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            onClick={() => selectSlide(index)}
            aria-label={`Show ${slide.title} photo`}
            aria-current={index === activeIndex ? "true" : undefined}
            className="flex h-8 w-5 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            <span className={`h-2 rounded-full transition-all ${index === activeIndex ? "w-4 bg-[#8CC63F]" : "w-2 bg-white/70"}`} />
          </button>
        ))}
        <button
          type="button"
          className={`${buttonClass} ml-1`}
          aria-label={isPlaying ? "Pause photo slideshow" : "Play photo slideshow"}
          onClick={() => {
            setHasFocus(false);
            setIsHovered(false);
            setIsPlaying((playing) => !playing);
          }}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
