"use client";

import InventoryView from "@/components/inventory/InventoryView";
import type { LocationPageConfig } from "@/lib/locationPages";
import LocationSEOContent from "./LocationSEOContent";

export interface LocationInventoryProps {
  city: string;
  heading: string;
  locationData: LocationPageConfig;
  hasLocationVehicles?: boolean;
}

export default function LocationInventory({
  city,
  heading,
  locationData,
  hasLocationVehicles,
}: LocationInventoryProps) {
  return (
    <InventoryView
      isLocationPage={true}
      locationCity={city}
      locationHeading={heading}
      locationIntro={locationData.introText}
      locationSeoData={locationData}
      hasLocationVehicles={hasLocationVehicles}
      bottomSlot={<LocationSEOContent data={locationData} />}
    />
  );
}
