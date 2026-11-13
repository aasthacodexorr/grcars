"use client";

import React from "react";
import { useRecentlyViewed, getVehicleInventoryId } from "@/lib/recentlyViewed";
import { HitCard } from "@/components/inventory";

export default function RecentlyViewedVehicles() {
  const { recentlyViewed, isHydrated } = useRecentlyViewed();

  // Display only when client hydration is complete and at least one valid vehicle exists
  if (!isHydrated || recentlyViewed.length === 0) {
    return null;
  }

  // Display a maximum of 4 vehicles, latest viewed appears first
  const displayedVehicles = recentlyViewed.slice(0, 4);

  return (
    <section className="w-full bg-white py-6 md:py- px-3 md:px-12 overflow-hidden">
      <div className="max-w-[1280px] mx-auto">
        {/* Section Heading */}
        <div className="flex items-center justify-between  px-3 lg:px-0">
          <h2 className="text-[20px] md:text-[28px] font-bold text-[#0F2942]">
            Recently Viewed
          </h2>
        </div>

        {/* Vehicle Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 px-3 lg:px-0">
          {displayedVehicles.map((vehicle, index) => {
            const vehicleId = getVehicleInventoryId(vehicle) || `vehicle-${index}`;
            return (
              <div key={vehicleId} className="flex flex-col h-full">
                <HitCard hit={vehicle} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
