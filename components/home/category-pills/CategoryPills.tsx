"use client";

import React, { useRef, useState, useEffect } from "react";
import CategoryPill from "./CategoryPill";
import { getCategories } from "./constants";
import { useAppConfig } from "@/app/providers";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

// Number of pills shown per "page" on mobile — drives the dot pagination
const MOBILE_PILLS_PER_PAGE = 3;

const CategoryPills = () => {
  const appConfig = useAppConfig();
  const allCategories = getCategories(appConfig) || [];
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  // Show ALL categories on both mobile and desktop now
  const displayedCategories = allCategories;

  // Mobile pages: groups of MOBILE_PILLS_PER_PAGE pills, plus one final page for "Shop All"
  const totalMobilePages =
    Math.ceil(displayedCategories.length / MOBILE_PILLS_PER_PAGE);

  // Check scroll position to update arrow disabled states & active dot indicator
  const checkScrollBounds = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);

      // Each mobile "page" is exactly one container width wide
      const pageIndex = clientWidth > 0 ? Math.round(scrollLeft / clientWidth) : 0;
      setActiveIndex(Math.min(Math.max(pageIndex, 0), totalMobilePages - 1));
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalMobilePages]);

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

  // Scrolls to a given mobile "page" (group of 3 pills, or the Shop All page)
  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      scrollContainerRef.current.scrollTo({
        left: clientWidth * index,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full bg-white py-10 px-8 md:px-12 mt-2">
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
            <div
              key={id}
              className="snap-start shrink-0 flex items-center justify-center
                         w-[calc((100%-4rem)/3)] min-w-[calc((100%-4rem)/3)]
                         md:w-auto md:min-w-0"
            >
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

        {/* Mobile Pagination Dots: one dot per group of 3 pills, plus one for Shop All */}
        <div className="flex md:hidden items-center justify-center gap-2 mt-6">
          {Array.from({ length: totalMobilePages }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              aria-label={`Go to page ${index + 1}`}
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
