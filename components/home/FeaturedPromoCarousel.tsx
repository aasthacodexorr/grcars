"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface CarouselSlide {
  id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonHref: string;
  image: string;
  brandOverlay?: string;
}

const SLIDES: CarouselSlide[] = [
  {
    id: "value-tracker",
    title: "Track your car's real-time value",
    subtitle: "Stay updated on market trends and know what your car is worth.",
    buttonText: "See Your Value",
    buttonHref: "/value-tracker",
    image: "/images/promo/value-tracker-bg.jpg",
    brandOverlay: "/images/promo/value-tracker-logo.png",
  },
  {
    id: "shaq-promo",
    title: "Save time with Gedi Route, just like Shaq did",
    subtitle:
      "Get pre-qualified instantly to shop 100% online with personalized terms. No hit to your credit.",
    buttonText: "Get Your Terms",
    buttonHref: "/finance",
    image: "/images/promo/shaq-promo.jpg",
  },
  {
    id: "easy-trade",
    title: "Sell or trade-in in under 2 minutes",
    subtitle: "Get a firm real offer online with free pickup right from your driveway.",
    buttonText: "Get Your Offer",
    buttonHref: "/trade-in",
    image: "/images/promo/trade-in-bg.jpg",
  },
];

const FeaturedPromoCarousel = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  // Default active index to 1 (the Shaq middle promo card)
  const [activeIndex, setActiveIndex] = useState(1);

  // Center the active slide on initial mount
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const targetCard = container.children[1] as HTMLElement;

      if (targetCard) {
        const scrollLeft =
          targetCard.offsetLeft -
          container.offsetWidth / 2 +
          targetCard.offsetWidth / 2;

        container.scrollTo({
          left: scrollLeft,
          behavior: "instant" as ScrollBehavior,
        });
      }
    }
  }, []);

  // Update active index on scroll
  const handleScrollEvent = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const containerCenter = container.scrollLeft + container.offsetWidth / 2;

    Array.from(container.children).forEach((child, index) => {
      const card = child as HTMLElement;
      const cardStart = card.offsetLeft;
      const cardEnd = cardStart + card.offsetWidth;

      if (containerCenter >= cardStart && containerCenter <= cardEnd) {
        if (activeIndex !== index) {
          setActiveIndex(index);
        }
      }
    });
  };

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const nextIndex =
        direction === "left"
          ? Math.max(0, activeIndex - 1)
          : Math.min(SLIDES.length - 1, activeIndex + 1);

      const targetCard = scrollContainerRef.current.children[nextIndex] as HTMLElement;
      if (targetCard) {
        const scrollLeft =
          targetCard.offsetLeft -
          scrollContainerRef.current.offsetWidth / 2 +
          targetCard.offsetWidth / 2;

        scrollContainerRef.current.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });
        setActiveIndex(nextIndex);
      }
    }
  };

  return (
    <section className="w-full bg-white py-10 overflow-hidden relative">
      <div className="w-full relative group">
        {/* Navigation Button - Left */}
        <button
          onClick={() => handleScroll("left")}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 bg-white text-gray-800 p-3.5 rounded-full shadow-lg hover:bg-gray-100 transition-all focus:outline-none border border-gray-100"
          aria-label="Previous Slide"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Navigation Button - Right */}
        <button
          onClick={() => handleScroll("right")}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 bg-white text-gray-800 p-3.5 rounded-full shadow-lg hover:bg-gray-100 transition-all focus:outline-none border border-gray-100"
          aria-label="Next Slide"
        >
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Scrollable Slides Wrapper */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScrollEvent}
          className="flex gap-4 sm:gap-6 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory py-2 px-[7.5vw] md:px-[12vw] lg:px-[15vw]"
        >
          {SLIDES.map((slide, index) => {
            const isInactive = index !== activeIndex;

            return (
              <div
                key={slide.id}
                className="relative w-[75vw] max-w-[850px] h-[380px] sm:h-[440px] lg:h-[480px] rounded-3xl overflow-hidden shrink-0 snap-center shadow-md bg-slate-900 transition-all duration-300"
              >
                {/* Background Image */}
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={slide.id === "shaq-promo"}
                  className="object-cover object-center"
                />

                {/* Bottom Dark Gradient Fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent pointer-events-none" />

                {/* Top Optional Logo Overlay */}
                {slide.brandOverlay && (
                  <div className="absolute top-6 left-6 z-20 w-36 h-10 relative">
                    <Image
                      src={slide.brandOverlay}
                      alt="Brand Logo"
                      fill
                      className="object-contain object-left"
                    />
                  </div>
                )}

                {/* Text & Button Overlays */}
                <div className="absolute bottom-8 left-6 sm:left-10 right-6 sm:right-10 z-20 max-w-2xl text-white space-y-4">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-snug">
                    {slide.title}
                  </h2>
                  <p className="text-xs sm:text-sm md:text-base text-gray-200 opacity-90 max-w-xl leading-relaxed">
                    {slide.subtitle}
                  </p>
                  <div className="pt-2">
                    <Link
                      href={slide.buttonHref}
                      className="inline-block bg-transparent hover:bg-white/10 text-white border-2 border-white rounded-full px-6 py-2.5 sm:py-3 text-sm font-semibold transition-all duration-200"
                    >
                      {slide.buttonText}
                    </Link>
                  </div>
                </div>

                {/* White Opacity Overlay for Inactive Cards */}
                <div
                  className={`absolute inset-0 z-30 bg-white/70 backdrop-blur-[2px] transition-opacity duration-300 pointer-events-none ${
                    isInactive ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPromoCarousel;