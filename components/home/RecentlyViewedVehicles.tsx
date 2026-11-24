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

export default function RecentlyViewedVehicles() {
  const appConfig = useAppConfig();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const { recentlyViewed, isHydrated } = useRecentlyViewed(appConfig);

  // Exclude any sold inventory from recently viewed cards
  const activeVehicles = useMemo(() => {
    if (!recentlyViewed || recentlyViewed.length === 0) return [];
    return recentlyViewed.filter((item) => !isSoldVehicle(item));
  }, [recentlyViewed]);

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
  }, [checkScrollState, activeVehicles]);

  const scroll = (direction: "left" | "right") => {
    const carousel = carouselRef.current;
    const firstCard = carousel?.querySelector<HTMLElement>("[data-card]");
    if (!carousel || !firstCard) return;

    const gap = 20;
    const scrollAmount = firstCard.offsetWidth + gap;

    carousel.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Display only when client hydration is complete and at least one valid unsold vehicle exists
  if (!isHydrated || activeVehicles.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-white pt-9 pb-0 px-3 md:px-12 overflow-hidden">
      <div className="max-w-[1280px] mx-auto">
        {/* Section Heading & Prev / Next Controls */}
        <div className="flex items-center justify-between mb-6 px-3 lg:px-0">
          <h2 className="text-[20px] md:text-[28px] font-bold text-[#0F2942]">
            Recently viewed
          </h2>

          {activeVehicles.length > 1 && (
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

        {/* Vehicle Cards - All cards in horizontal scroll carousel with Prev & Next controls */}
        <div
          ref={carouselRef}
          aria-label="Recently viewed vehicles carousel"
          className="flex items-stretch gap-4 md:gap-5 overflow-x-auto overflow-y-hidden overscroll-x-contain snap-x snap-mandatory scroll-smooth pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-3 lg:px-0"
        >
          {activeVehicles.map((vehicle, index) => {
            const vehicleId = getVehicleInventoryId(vehicle) || `vehicle-${index}`;
            return (
              <div
                key={vehicleId}
                data-card
                className="flex-none w-[calc(100vw-48px)] max-w-[330px] sm:w-[350px] lg:w-[calc((100%_-_2.5rem)/3)] lg:max-w-none snap-start flex flex-col self-stretch"
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
