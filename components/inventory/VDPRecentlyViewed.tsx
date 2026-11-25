"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAppConfig } from "@/app/providers";
import {
  useRecentlyViewed,
  getVehicleInventoryId,
  isSoldVehicle,
} from "@/lib/recentlyViewed";
import { HitCard } from "@/components/inventory";

interface VDPRecentlyViewedProps {
  currentVehicleId: string | number;
}

export default function VDPRecentlyViewed({
  currentVehicleId,
}: VDPRecentlyViewedProps) {
  const appConfig = useAppConfig();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const { recentlyViewed, isHydrated } = useRecentlyViewed(appConfig);

  const otherVehicles = useMemo(() => {
    if (!recentlyViewed || recentlyViewed.length === 0) return [];
    const normalizedCurrentId = String(currentVehicleId).trim();

    return recentlyViewed.filter((item) => {
      if (isSoldVehicle(item)) return false;
      const id = getVehicleInventoryId(item);
      return id !== "" && id !== normalizedCurrentId;
    });
  }, [recentlyViewed, currentVehicleId]);

  const checkScrollState = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    checkScrollState();
    el.addEventListener("scroll", checkScrollState, { passive: true });
    window.addEventListener("resize", checkScrollState);
    return () => {
      el.removeEventListener("scroll", checkScrollState);
      window.removeEventListener("resize", checkScrollState);
    };
  }, [checkScrollState, otherVehicles]);

  const scroll = (direction: "left" | "right") => {
    const carousel = carouselRef.current;
    const firstCard = carousel?.querySelector<HTMLElement>("[data-vdp-card]");
    if (!carousel || !firstCard) return;

    const gap = 20;
    const scrollAmount = firstCard.offsetWidth + gap;

    carousel.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (!isHydrated || otherVehicles.length === 0) {
    return null;
  }

  return (
    <section
      className="w-full bg-white mb-10 overflow-hidden"
      aria-labelledby="vdp-recently-viewed-heading"
    >
      <div className="max-w-[1440px] xl:max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Heading & Carousel Controls */}
        <div className="mb-6 flex flex-col items-center lg:flex-row lg:justify-between mt-7 sm:mt-18  ">
          <h2
            id="vdp-recently-viewed-heading"
            className="text-center text-[30px] font-semibold text-black"
          > 
            Recently Viewed
          </h2>

          {otherVehicles.length > 1 && (
            <div
              className={`mt-4 hidden items-center justify-center gap-2 lg:flex lg:mt-0 ${otherVehicles.length <= 3 ? "lg:hidden" : ""
                }`}
            >
              <button
                type="button"
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                aria-label="Previous recently viewed vehicles"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 shadow-xs transition-all hover:bg-gray-100 hover:border-gray-400 active:scale-95 disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                aria-label="Next recently viewed vehicles"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 shadow-xs transition-all hover:bg-gray-100 hover:border-gray-400 active:scale-95 disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Horizontal Carousel */}
        <div
          ref={carouselRef}
          aria-label="Recently viewed vehicles carousel"
          className="flex items-stretch gap-4 md:gap-5 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden mx-0 px-0"        >
          {otherVehicles.map((vehicle, index) => {
            const vehicleId = getVehicleInventoryId(vehicle) || `vdp-recent-${index}`;
            return (
              <div
                key={vehicleId}
                data-vdp-card
                className="flex-none w-[min(100%,330px)] sm:w-[350px] lg:w-[calc((100%_-_2.5rem)/3)] lg:max-w-none snap-start flex flex-col self-stretch"              >
                <HitCard hit={vehicle} showRecentlyViewed={false} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
