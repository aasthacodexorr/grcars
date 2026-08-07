"use client";

import React, { useRef, useState, useEffect } from "react";
import CategoryPill from "./CategoryPill";
import { getCategories } from "./constants";
import { useAppConfig } from "@/app/providers";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";

const CategoryPills = () => {
  const appConfig = useAppConfig();
  const categories = getCategories(appConfig);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll position to update arrow disabled/active states
  const checkScrollBounds = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 5);
      // Allow a small offset margin (5px) for browser rounding errors
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkScrollBounds();
      container.addEventListener("scroll", checkScrollBounds);
      window.addEventListener("resize", checkScrollBounds);
    }
    return () => {
      if (container) container.removeEventListener("scroll", checkScrollBounds);
      window.removeEventListener("resize", checkScrollBounds);
    };
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      // Scroll by the full visible container width
      const containerWidth = scrollContainerRef.current.clientWidth;
      const scrollAmount = direction === "left" ? -containerWidth : containerWidth;

      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full bg-white py-10 px-6 md:px-12 mt-2">
      <div className="max-w-[1280px] mx-auto">
        {/* Header & Controls */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[28px] font-bold text-[#0F2942]">
            Popular vehicle styles
          </h2>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleScroll("left")}
              disabled={!canScrollLeft}
              className={`p-2.5 rounded-full border transition-all ${
                canScrollLeft
                  ? "border-gray-400 text-gray-800 hover:border-gray-900 cursor-pointer"
                  : "border-gray-200 text-gray-300 cursor-not-allowed opacity-50"
              }`}
              aria-label="Scroll Left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              disabled={!canScrollRight}
              className={`p-2.5 rounded-full border transition-all ${
                canScrollRight
                  ? "border-gray-400 text-gray-800 hover:border-gray-900 cursor-pointer"
                  : "border-gray-200 text-gray-300 cursor-not-allowed opacity-50"
              }`}
              aria-label="Scroll Right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Cards Grid */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-8 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory py-2 scroll-smooth"
        >
          {categories.map(({ id, label, image, href }) => (
            <div key={id} className="snap-start flex-shrink-0">
              <CategoryPill label={label} image={image} href={href} />
            </div>
          ))}

          {/* End of list: Shop All Link */}
          <div className="snap-start flex-shrink-0 flex items-center justify-center pl-4 pr-8">
            <Link
              href="/cars"
              className="flex items-center gap-2 text-[#0F2942] font-semibold text-lg hover:underline whitespace-nowrap"
            >
              Shop All
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryPills;