"use client";

import { usePathname } from "next/navigation";
import { isVehicleDetailSlug } from "@/lib/inventoryUrls";

export function MainContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const inventorySegments = pathname?.startsWith("/inventory/")
    ? pathname.slice("/inventory/".length).split("/").filter(Boolean)
    : [];
  const isVehicleDetail = isVehicleDetailSlug(inventorySegments);
  const topMargin = pathname === "/certified" || isVehicleDetail ? "" : "mt-10";

  return (
    <div className={`flex-1 flex flex-col min-h-screen ${topMargin} lg:mt-0`}>
      {children}
    </div>
  );
}
