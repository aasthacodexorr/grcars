"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import nissan from "@/assets/cars/nissan-car.webp";
import tesla from "@/assets/cars/tesla.webp";
import camry from "@/assets/cars/toyota-camry.webp";
import jeep from "@/assets/cars/jeep-grand-cherokee.webp";
import hondaCivic from "@/assets/cars/honda-civic.webp";
import nissanAltima from "@/assets/cars/nissan-altima.webp";
import ford from "@/assets/cars/ford-f150.webp";
import hondaAccord from "@/assets/cars/honda-accord.webp";
import { getInventoryUrlByModel } from "@/lib/inventoryUrls";

interface ModelCard {
  make: string;
  model: string;
  image: string;
  href: string;
}

const MODELS: ModelCard[] = [
  { make: "Tesla", model: "Model 3", image: tesla?.src, href: getInventoryUrlByModel("Tesla", "Model 3") },
  { make: "Nissan", model: "Rogue", image: nissan?.src, href: getInventoryUrlByModel("Nissan", "Rogue") },
  { make: "Toyota", model: "Camry", image: camry?.src, href: getInventoryUrlByModel("Toyota", "Camry") },
  { make: "Honda", model: "Civic", image: hondaCivic?.src, href: getInventoryUrlByModel("Honda", "Civic") },
  { make: "Nissan", model: "Altima", image: nissanAltima?.src, href: getInventoryUrlByModel("Nissan", "Altima") },
  { make: "Jeep", model: "Grand Cherokee", image: jeep?.src, href: getInventoryUrlByModel("Jeep", "Grand Cherokee") },
  { make: "Ford", model: "F-150 SuperCrew", image: ford?.src, href: getInventoryUrlByModel("Ford", "F-150 SuperCrew") },
  { make: "Honda", model: "Accord", image: hondaAccord?.src, href: getInventoryUrlByModel("Honda", "Accord") },
];

// Number of cards shown per "page" on mobile — drives the dot pagination
const MOBILE_CARDS_PER_PAGE = 2;

const PopularModels = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  // Show ALL models on both mobile and desktop now
  const displayedModels = MODELS;

  // Mobile pages: groups of MOBILE_CARDS_PER_PAGE cars
  const totalMobilePages = Math.ceil(
    displayedModels.length / MOBILE_CARDS_PER_PAGE
  );

  // Checks boundaries to toggle active/disabled states on arrows & updates active dot
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

  // Scrolls to a given mobile "page" (group of 3 cars)
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
          className="flex items-stretch gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory py-2 scroll-smooth"
        >
          {displayedModels.map((item, index) => (
            <Link
              key={`${item.make}-${item.model}-${index}`}
              href={item.href}
              className="bg-[#F5F7FA] rounded-2xl p-4 md:p-5 flex flex-col justify-between
                         w-[calc((100%-1rem)/2)] min-w-[calc((100%-1rem)/2)]
                         md:w-[230px] md:min-w-[210px]
                         h-[200px] md:h-[240px]
                         snap-start shrink-0 hover:shadow-md transition-shadow group"
            >
              {/* Text Header */}
              <div>
                <p className="text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {item.make}
                </p>
                <h3 className="text-sm md:text-base font-bold text-[#0F2942] group-hover:text-blue-600 transition-colors mt-0.5">
                  {item.model}
                </h3>
              </div>

              {/* Vehicle Image */}
              <div className="relative w-full flex items-center justify-center mt-auto">
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
        </div>

        {/* Mobile Pagination Dots: one dot per group of 3 cars */}
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

export default PopularModels;
