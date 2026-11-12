import InventoryView from "@/components/inventory/InventoryView";
import VehicleDetailsPage from "../_components/VehicleDetailsPage";
import { isVehicleDetailSlug } from "@/lib/inventoryUrls";
import { isLocationSlug, extractLocationCityKey } from "@/lib/inventoryRouting";
import LocationPage from "@/components/location/LocationPage";

export const dynamic = "force-dynamic";

// Supports shareable inventory filter paths, location-based inventory pages,
// and one-segment vehicle detail URLs.
export default async function InventoryCatchAllPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  if (isVehicleDetailSlug(slug)) {
    const vehiclePage = await VehicleDetailsPage({ vehicleParam: slug[0] });
    if (vehiclePage) return vehiclePage;
  }

  // Check if any slug segment represents a location page
  const locationSegment = slug.find(isLocationSlug);
  const cityKey = locationSegment ? extractLocationCityKey(locationSegment) : null;

  if (cityKey) {
    return <LocationPage cityKey={cityKey} locationSlug={`used-car-${cityKey}`} />;
  }

  return <InventoryView />;
}
