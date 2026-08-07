// NextRide.tsx (Main Section Container)
"use client";

import React, { useRef } from "react";
import NextRideCard from "./NextRideCard";
import { CARDS } from "./constants";
import { ChevronLeft, ChevronRight } from "lucide-react";

const NextRide = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full bg-white py-12 px-6 md:px-12">
      <div className="max-w-[1280px] mx-auto">
        {/* Header & Controls */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F2942]">
            Explore cars you’ll love
          </h2>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleScroll("left")}
              className="p-2.5 cursor-pointer rounded-full border border-gray-300 text-gray-400 hover:text-gray-700 hover:border-gray-500 transition-all"
              aria-label="Scroll Left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="p-2.5 cursor-pointer rounded-full border border-gray-400 text-gray-800 hover:border-gray-900 transition-all"
              aria-label="Scroll Right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Grid */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory"
        >
          {CARDS.map((card) => (
            <NextRideCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NextRide;