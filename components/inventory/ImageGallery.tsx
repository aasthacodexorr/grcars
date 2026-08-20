/* =========================
   ImageGallery Component (Inventory / VDP)
   Full-featured image gallery for the Vehicle Detail Page.
========================= */

"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Grid } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import LightGallery from "lightgallery/react";
import type { LightGallery as LightGalleryInstance } from "lightgallery/lightgallery";

// Core and standard plugin CSS
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-fullscreen.css";
import "lightgallery/css/lg-autoplay.css";
import "lightgallery/css/lg-share.css";
import "lightgallery/css/lg-rotate.css";

// Core and plugin modules
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgHash from "lightgallery/plugins/hash";
import lgFullscreen from "lightgallery/plugins/fullscreen";
import lgAutoplay from "lightgallery/plugins/autoplay";
import lgShare from "lightgallery/plugins/share";

type ImageGalleryProps = {
  images: string[];
  title: string;
  isSold?: boolean;
};

export const ImageGallery = ({ images, title, isSold = false }: ImageGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const lightboxRef = useRef<LightGalleryInstance | null>(null);
  const thumbsContainerRef = useRef<HTMLDivElement | null>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Smooth scroll active thumbnail into view horizontally
  useEffect(() => {
    const container = thumbsContainerRef.current;
    if (!container) return;

    const activeThumb = thumbRefs.current[activeIndex];
    if (activeThumb) {
      const scrollLeft =
        activeThumb.offsetLeft - container.offsetWidth / 2 + activeThumb.offsetWidth / 2;
      container.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  }, [activeIndex]);

  const goTo = (index: number) => {
    if (images.length === 0) return;

    if (index < 0) {
      setDirection(-1);
      setActiveIndex(images.length - 1);
    } else if (index >= images.length) {
      setDirection(1);
      setActiveIndex(0);
    } else {
      setDirection(index > activeIndex ? 1 : -1);
      setActiveIndex(index);
    }
  };

  if (!images || images.length === 0) return null;

  const dynamicEl = images.map((img) => ({
    src: img,
    thumb: img,
    alt: title,
  }));

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  // Calculate percentage for bottom progress bar line
  const progressPercent = ((activeIndex + 1) / images.length) * 100;

  return (
    <div className="flex flex-col gap-4 w-full max-w-5xl mx-auto select-none">
      {/* LightGallery Instance */}
      <LightGallery
        onInit={(detail) => {
          lightboxRef.current = detail.instance;
        }}
        dynamic={true}
        dynamicEl={dynamicEl}
        plugins={[lgThumbnail, lgZoom, lgHash, lgFullscreen, lgAutoplay, lgShare]}
        hash={true}
        galleryId="vdp-gallery"
        speed={400}
        download={false}
        share={true}
        autoplay={true}
        fullScreen={true}
        zoom={true}
        toggleThumb={false}
        actualSize={false}
        slideShowAutoplay={false}
        elementClassNames="hidden"
        additionalShareOptions={[
          {
            selector: ".lg-share-whatsapp",

            dropdownHTML: `
      <li class="lg-share-item lg-share-whatsapp-item">
        <a
          class="lg-share-whatsapp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="lg-share-whatsapp-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.57-.01-.198 0-.52.075-.792.372-.273.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982 1-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.437-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.002 5.45-4.437 9.884-9.887 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.304-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.478-8.413"/>
            </svg>
          </span>
          <span>WhatsApp</span>
        </a>
      </li>
    `,

            generateLink: () => {
              const url = encodeURIComponent(window.location.href);
              const text = encodeURIComponent(`Check out this ${title}`);

              return `https://wa.me/?text=${text}%20${url}`;
            },
          },
        ]}
      />

      {/* Main Showcase Image Display */}
      {/* Changed aspect-ratio and added a white background to prevent letterboxing gaps */}
      <div
        onClick={() => lightboxRef.current?.openGallery(activeIndex)}
        className="relative w-full aspect-[4/3] md:aspect-[12/8] bg-white rounded-3xl overflow-hidden shadow-sm cursor-zoom-in border border-gray-100"
      >
        {isSold && (
          <div className="absolute top-4 right-4 z-20 bg-red-600 text-white text-xs md:text-sm font-bold px-4 py-2 rounded-md shadow-lg uppercase">
            Sold
          </div>
        )}

        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 260, damping: 28 },
              opacity: { duration: 0.25, ease: "easeInOut" },
            }}
            className="absolute inset-0 w-full h-full"
          >
            {/* FIX: Changed object-cover to object-contain */}
            <Image
              src={images[activeIndex]}
              alt={`${title} - Image ${activeIndex + 1}`}
              fill
              priority
              className={`${isSold ? "grayscale opacity-90" : ""}`}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Horizontal Thumbnails Row with Overlaid Controls */}
      {images.length > 1 && (
        <div className="relative w-full">
          {/* Scroll Navigation Buttons */}
          <button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-md backdrop-blur-sm transition-all"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5] cursor-pointer" />
          </button>

          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-md backdrop-blur-sm transition-all"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5] cursor-pointer" />
          </button>

          {/* Horizontal Scrollable Thumbnail Strip */}
          <div
            ref={thumbsContainerRef}
            className="grid grid-flow-col auto-cols-[calc((100%-24px)/3)] sm:auto-cols-[calc((100%-36px)/4)] gap-3 overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden rounded-2xl"
          >
            {images.map((img, idx) => (
              <button
                key={idx}
                ref={(el) => {
                  thumbRefs.current[idx] = el;
                }}
                type="button"
                onClick={() => goTo(idx)}
                className={`relative aspect-[4/3] cursor-pointer rounded-2xl overflow-hidden border-2 transition-all duration-200 ${
                  idx === activeIndex
                    ? "border-blue-600 ring-2 ring-blue-600/20 opacity-100"
                    : "border-transparent opacity-80 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          {/* Photos Count Overlay Badge */}
          <button
            type="button"
            onClick={() => lightboxRef.current?.openGallery(activeIndex)}
            className="absolute bottom-3 right-3 z-10 flex items-center gap-2 bg-black/60 hover:bg-black/80 text-white text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-lg backdrop-blur-md transition-all cursor-pointer"
          >
            <Grid className="w-4 h-4" />
            <span>{images.length} photos</span>
          </button>

          {/* Scroll / Gallery Progress Track */}
          <div className="w-full bg-gray-200 h-1 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-slate-500 h-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};