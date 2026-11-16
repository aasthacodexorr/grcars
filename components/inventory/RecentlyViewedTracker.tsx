"use client";

import { useEffect, useRef } from "react";
import { useRecentlyViewed, getVehicleInventoryId } from "@/lib/recentlyViewed";

interface RecentlyViewedTrackerProps {
  vehicle?: Record<string, any> | null;
  inventoryId?: string | number;
}

export default function RecentlyViewedTracker({
  vehicle,
  inventoryId,
}: RecentlyViewedTrackerProps) {
  const { addRecentlyViewed } = useRecentlyViewed();
  const lastTrackedKey = useRef<string | null>(null);

  useEffect(() => {
    const target = vehicle ?? (inventoryId ? { id: inventoryId } : null);
    if (!target) return;

    const currentId = getVehicleInventoryId(vehicle) || (inventoryId ? String(inventoryId).trim() : "");
    if (!currentId || lastTrackedKey.current === currentId) {
      return;
    }

    lastTrackedKey.current = currentId;
    if (vehicle) {
      addRecentlyViewed(vehicle);
    }
  }, [addRecentlyViewed, vehicle, inventoryId]);

  return null;
}
