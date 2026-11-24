"use client";

import type VDPWishlistButton from "@/components/inventory/VDPWishlistButton";
import { useRecentlyViewed, isSoldVehicle } from "@/lib/recentlyViewed";
import RecentlyViewedIndicator from "./RecentlyViewedIndicator";

type Vehicle = Parameters<typeof VDPWishlistButton>[0]["vehicle"];

interface VDPHeaderActionsProps {
  inventoryId: string | number;
  vehicle: Vehicle;
}

export default function VDPHeaderActions({
  inventoryId,
  vehicle,
}: VDPHeaderActionsProps) {
  const { wasViewedBeforeCurrentVisit } = useRecentlyViewed();
  const isSold = isSoldVehicle(vehicle);
  const showRecentlyViewed = !isSold && wasViewedBeforeCurrentVisit(inventoryId);

  return (
    showRecentlyViewed ? (
      <div className="absolute top-4 left-4 z-20">
        <RecentlyViewedIndicator inventoryId={inventoryId} />
      </div>
    ) : null
  );
}