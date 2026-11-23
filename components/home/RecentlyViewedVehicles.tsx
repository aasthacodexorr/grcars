"use client";

import React from "react";
import {
  useRecentlyViewed,
  getVehicleInventoryId,
  HOMEPAGE_MAX_RECENTLY_VIEWED,
} from "@/lib/recentlyViewed";
import { HitCard } from "@/components/inventory";

export default function RecentlyViewedVehicles() {
  const { recentlyViewed, isHydrated } = useRecentlyViewed();

  // Display only when client hydration is complete and at least one valid vehicle exists
  if (!isHydrated || recentlyViewed.length === 0) {
    return null;
  }

  // Display a maximum of 4 vehicles on the homepage, latest viewed appears first
  const displayedVehicles = recentlyViewed.slice(0, HOMEPAGE_MAX_RECENTLY_VIEWED);

  return (
    <section className="w-full bg-white py-6 md:pt-5 px-3 md:px-12 overflow-hidden">
      <div className="max-w-[1280px] mx-auto">
        {/* Section Heading */}
        <div className="flex items-center justify-between mb-6 px-3 lg:px-0">
          <h2 className="text-[20px] md:text-[28px] font-bold text-[#0F2942]">
            Recently Viewed
          </h2>
        </div>

        {/* Vehicle Cards - Horizontal scroll on responsive, grid on desktop */}
        <div className="flex items-stretch gap-4 overflow-x-auto snap-x snap-mandatory pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-3 lg:px-0 lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible lg:pb-0">
          {displayedVehicles.map((vehicle, index) => {
            const vehicleId = getVehicleInventoryId(vehicle) || `vehicle-${index}`;
            return (
              <div
                key={vehicleId}
                className="flex-none w-[280px] sm:w-[320px] lg:w-auto snap-start flex flex-col self-stretch"
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
