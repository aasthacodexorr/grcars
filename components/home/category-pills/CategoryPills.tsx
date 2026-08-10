"use client";

import React, { useRef, useState, useEffect } from "react";
import CategoryPill from "./CategoryPill";
import { getCategories } from "./constants";
import { useAppConfig } from "@/app/providers";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const CategoryPills = () => {
  const appConfig = useAppConfig();
  const allCategories = getCategories(appConfig) || [];
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  // Detect mobile screen (sm breakpoint < 768px)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Display max 6 on mobile, all on desktop
  const displayedCategories = isMobile
    ? allCategories.slice(0, 6)
    : allCategories;

  // Total dots (rendered categories + Shop All card)
  const totalItems = displayedCategories.length + 1;

  // Check scroll position to update arrow disabled states & active dot indicator
  const checkScrollBounds = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);

      // Calculate active dot index based on scroll position
      const scrollPercentage = scrollLeft / (scrollWidth - clientWidth || 1);
      const calculatedIndex = Math.round(scrollPercentage * (totalItems - 1));
      setActiveIndex(Math.min(calculatedIndex, totalItems - 1));
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
  }, [totalItems]);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.clientWidth;
      const scrollAmount = direction === "left" ? -containerWidth : containerWidth;

      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth } = scrollContainerRef.current;
      const maxScrollLeft = scrollWidth - clientWidth;
      const targetScrollLeft = (maxScrollLeft / (totalItems - 1)) * index;

      scrollContainerRef.current.scrollTo({
        left: targetScrollLeft,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full bg-white py-10 px-6 md:px-12 mt-2">
      <div className="max-w-[1280px] mx-auto">
        {/* Header & Controls */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[20px] md:text-[28px] font-bold text-[#0F2942]">
            Popular vehicle styles
          </h2>
          {/* Arrow navigation: Hidden on mobile, visible on desktop */}
          <div className="hidden md:flex items-center gap-3">
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
          {displayedCategories.map(({ id, label, image, href }) => (
            <div key={id} className="snap-start flex-shrink-0">
              <CategoryPill label={label} image={image} href={href} />
            </div>
          ))}

          {/* End of list: Shop All Link */}
          <div className="snap-start flex-shrink-0 flex items-center justify-center pl-4 pr-8">
            <Link
              href="/inventory"
              className="flex items-center gap-2 text-[#0F2942] font-semibold text-lg hover:underline whitespace-nowrap"
            >
              Shop All
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Mobile Pagination Dots */}
        <div className="flex md:hidden items-center justify-center gap-2 mt-6">
          {Array.from({ length: totalItems }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              aria-label={`Go to item ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ease-in-out ${
                activeIndex === index
                  ? "w-2 bg-brand-green"
                  : "w-2 bg-gray-200 hover:bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryPills;