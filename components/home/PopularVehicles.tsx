"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import carImg from "@/assets/cars/car-white-suv 1.png"


interface ModelCard {
  make: string;
  model: string;
  image: string;
  href: string;
}

const MODELS: ModelCard[] = [
  {
    make: "Rivian",
    model: "R1S/R1T",
    image: "/images/models/rivian.png",
    href: "/inventory?make=Rivian",
  },
  {
    make: "Tesla",
    model: "Model 3",
    image: "/images/models/tesla-model-3.png",
    href: "/inventory?make=Tesla&model=Model+3",
  },
  {
    make: "Chevrolet",
    model: "Equinox",
    image: "/images/models/chevrolet-equinox.png",
    href: "/inventory?make=Chevrolet&model=Equinox",
  },
  {
    make: "Nissan",
    model: "Rogue",
    image: "/images/models/nissan-rogue.png",
    href: "/inventory?make=Nissan&model=Rogue",
  },
  {
    make: "Ford",
    model: "Escape",
    image: "/images/models/ford-escape.png",
    href: "/inventory?make=Ford&model=Escape",
  },
  {
    make: "Ford",
    model: "Explorer",
    image: "/images/models/ford-explorer.png",
    href: "/inventory?make=Ford&model=Explorer",
  },
   {
    make: "Ford",
    model: "Escape",
    image: "/images/models/ford-escape.png",
    href: "/inventory?make=Ford&model=Escape",
  },
  {
    make: "Ford",
    model: "Explorer",
    image: "/images/models/ford-explorer.png",
    href: "/inventory?make=Ford&model=Explorer",
  },
   {
    make: "Ford",
    model: "Escape",
    image: "/images/models/ford-escape.png",
    href: "/inventory?make=Ford&model=Escape",
  },
  {
    make: "Ford",
    model: "Explorer",
    image: "/images/models/ford-explorer.png",
    href: "/inventory?make=Ford&model=Explorer",
  },
   {
    make: "Ford",
    model: "Escape",
    image: "/images/models/ford-escape.png",
    href: "/inventory?make=Ford&model=Escape",
  },
  {
    make: "Ford",
    model: "Explorer",
    image: "/images/models/ford-explorer.png",
    href: "/inventory?make=Ford&model=Explorer",
  },
];

const PopularModels = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -260 : 260;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
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
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleScroll("left")}
              className="p-2.5 rounded-full cursor-pointer border border-gray-300 text-gray-400 hover:text-gray-700 hover:border-gray-500 transition-all"
              aria-label="Scroll Left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="p-2.5 rounded-full cursor-pointer border border-gray-400 text-gray-800 hover:border-gray-900 transition-all"
              aria-label="Scroll Right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable Grid */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory py-2"
        >
          {MODELS.map((item, index) => (
            <Link
              key={`${item.make}-${item.model}-${index}`}
              href={item.href}
              className="bg-[#F5F7FA] rounded-2xl p-5 flex flex-col justify-between w-[210px] min-w-[210px] h-[240px] snap-start shrink-0 hover:shadow-md transition-shadow group"
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
                  src={carImg?.src}
                  alt={`${item.make} ${item.model}`}
                  width={200}
                  height={120}
                  className="object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularModels;