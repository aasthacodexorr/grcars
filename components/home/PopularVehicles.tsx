"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import rivian from "@/assets/cars/rivian.webp";
import tesla from "@/assets/cars/tesla.webp";
import equinox from "@/assets/cars/equinox.webp";
import rogue from "@/assets/cars/rogue.webp";
import escape from "@/assets/cars/escape.webp";
import explorer from "@/assets/cars/explorer.webp";
import { getInventoryUrlByModel } from "@/lib/inventoryUrls";

interface ModelCard {
  make: string;
  model: string;
  image: string;
  href: string;
}

const MODELS: ModelCard[] = [
  { make: "Tesla", model: "Model 3", image: tesla?.src, href: getInventoryUrlByModel("Tesla", "Model 3") },
  { make: "Nissan", model: "Rogue", image: rivian?.src, href: getInventoryUrlByModel("Nissan", "Rogue") },
  { make: "Toyota", model: "Camry", image: equinox?.src, href: getInventoryUrlByModel("Toyota", "Camry") },
  { make: "Honda", model: "Civic", image: escape?.src, href: getInventoryUrlByModel("Honda", "Civic") },
  { make: "Nissan", model: "Altima", image: rivian?.src, href: getInventoryUrlByModel("Nissan", "Altima") },
  { make: "Jeep", model: "Grand Cherokee", image: rogue?.src, href: getInventoryUrlByModel("Jeep", "Grand Cherokee") },
  { make: "Ford", model: "F-150 SuperCrew", image: escape?.src, href: getInventoryUrlByModel("Ford", "F-150 SuperCrew") },
  { make: "Honda", model: "Accord", image: explorer?.src, href: getInventoryUrlByModel("Honda", "Accord") },
];

const PopularModels = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  // Detect mobile screen (< 768px matching Tailwind's md breakpoint)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Display max 6 models on mobile, all models on desktop
  const displayedModels = isMobile ? MODELS.slice(0, 6) : MODELS;

  // Total dots (rendered models + Shop All card)
  const totalItems = displayedModels.length + 1;

  // Checks boundaries to toggle active/disabled states on arrows & updates active dot
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
    <section className="w-full bg-white py-10 px-6 md:px-12">
      <div className="max-w-[1280px] mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F2942]">
            Shop popular models
          </h2>
          {/* Arrow Controls: Hidden on mobile, visible on desktop */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleScroll("left")}
              disabled={!canScrollLeft}
              className={`p-2.5 rounded-full transition-all ${
                canScrollLeft
                  ? "border border-gray-400 text-gray-800 hover:border-gray-900 cursor-pointer"
                  : "border border-gray-200 text-gray-300 cursor-not-allowed opacity-50"
              }`}
              aria-label="Scroll Left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              disabled={!canScrollRight}
              className={`p-2.5 rounded-full transition-all ${
                canScrollRight
                  ? "border border-gray-400 text-gray-800 hover:border-gray-900 cursor-pointer"
                  : "border border-gray-200 text-gray-300 cursor-not-allowed opacity-50"
              }`}
              aria-label="Scroll Right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable Grid */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory py-2 scroll-smooth"
        >
          {displayedModels.map((item, index) => (
            <Link
              key={`${item.make}-${item.model}-${index}`}
              href={item.href}
              className="bg-[#F5F7FA] rounded-2xl p-5 flex flex-col justify-between w-[230px] min-w-[210px] h-[240px] snap-start shrink-0 hover:shadow-md transition-shadow group"
            >
              {/* Text Header */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {item.make}
                </p>
                <h3 className="text-base font-bold text-[#0F2942] group-hover:text-blue-600 transition-colors mt-0.5">
                  {item.model}
                </h3>
              </div>

              {/* Vehicle Image */}
              <div className="relative w-full h-32 flex items-center justify-center mt-auto">
                <Image
                  src={item?.image}
                  alt={`${item.make} ${item.model}`}
                  width={200}
                  height={120}
                  className="object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>
          ))}

          {/* End of list: Shop All Link */}
          <div className="snap-start flex-shrink-0 flex items-center justify-center pl-4 pr-8 h-[240px]">
            <Link
              href="/inventory"
              className="flex items-center gap-2 text-[#0F2942] font-semibold text-lg hover:underline whitespace-nowrap"
            >
              Shop All
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Mobile Pagination Dots: Visible on mobile, hidden on desktop */}
        <div className="flex md:hidden items-center justify-center gap-2 mt-6">
          {Array.from({ length: 6 }).map((_, index) => (
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

export default PopularModels;