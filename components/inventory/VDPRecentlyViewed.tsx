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
      <div className="max-w-[1440px] xl:max-w-[1600px] mx-auto px-12 lg:px-20">
        {/* Section Heading & Carousel Controls */}
        <div className="flex items-center justify-between mb-6">
          <h2
            id="vdp-recently-viewed-heading"
            className="text-[22px] md:text-[28px] font-bold text-[#0F2942]"
          >
            Recently Viewed
          </h2>

          {otherVehicles.length > 1 && (
            <div className="flex items-center gap-2">
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
          className="flex items-stretch gap-4 md:gap-5 overflow-x-auto overflow-y-hidden overscroll-x-contain snap-x snap-mandatory scroll-smooth pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden -mx-4 px-4 md:-mx-8 md:px-8 lg:mx-0 lg:px-0"
        >
          {otherVehicles.map((vehicle, index) => {
            const vehicleId = getVehicleInventoryId(vehicle) || `vdp-recent-${index}`;
            return (
              <div
                key={vehicleId}
                data-vdp-card
                className="flex-none w-[280px] sm:w-[310px] lg:w-[330px] snap-start flex flex-col self-stretch"
              >
                <HitCard hit={vehicle} showRecentlyViewed={false} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
