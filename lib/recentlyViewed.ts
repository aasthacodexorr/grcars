"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

export const RECENTLY_VIEWED_STORAGE_KEY = "grcars_recently_viewed";
export const HOMEPAGE_MAX_RECENTLY_VIEWED = 4;
export const MAX_RECENTLY_VIEWED = 100;

export type RecentlyViewedVehicle = Record<string, unknown>;
export type RecentlyViewedItem = RecentlyViewedVehicle;

const EMPTY_SNAPSHOT = "[]";
let snapshot = EMPTY_SNAPSHOT;
const listeners = new Set<() => void>();
const viewedBeforeVisitSet = new Set<string>();

const emptySubscribe = () => () => {};

/**
 * Extracts a normalized unique inventory ID from a vehicle object or ID primitive.
 */
export function getVehicleInventoryId(vehicle: unknown): string {
  if (!vehicle) return "";
  if (typeof vehicle === "string" || typeof vehicle === "number") {
    return String(vehicle).trim();
  }
  if (typeof vehicle === "object") {
    const v = vehicle as Record<string, unknown>;
    const id = v.inventory_id ?? v.id;
    return id != null ? String(id).trim() : "";
  }
  return "";
}

/**
 * Validates that an item from localStorage represents a complete, renderable vehicle object.
 */
export function isValidVehicle(item: unknown): item is RecentlyViewedVehicle {
  if (!item || typeof item !== "object" || Array.isArray(item)) {
    return false;
  }
  const v = item as Record<string, unknown>;
  const id = getVehicleInventoryId(v);
  if (!id) {
    return false;
  }
  // Must contain minimal vehicle information to render in HitCard
  return Boolean(v.make || v.model || v.title || v.year);
}

function parseVehicles(value: string | null): RecentlyViewedVehicle[] {
  if (!value) return [];
  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter(isValidVehicle).slice(0, MAX_RECENTLY_VIEWED);
  } catch (error) {
    console.error("Failed to parse recently viewed vehicles:", error);
    return [];
  }
}

function readSnapshot(): string {
  if (typeof window === "undefined") {
    return EMPTY_SNAPSHOT;
  }

  try {
    return window.localStorage.getItem(RECENTLY_VIEWED_STORAGE_KEY) ?? EMPTY_SNAPSHOT;
  } catch (error) {
    console.error("Failed to read recently viewed vehicles:", error);
    return snapshot;
  }
}

// Prepopulate viewedBeforeVisitSet on client initialization so we know which
// vehicles were already viewed before this page view.
if (typeof window !== "undefined") {
  try {
    const initialRaw = window.localStorage.getItem(RECENTLY_VIEWED_STORAGE_KEY);
    const initialItems = parseVehicles(initialRaw);
    for (const item of initialItems) {
      const id = getVehicleInventoryId(item);
      if (id) viewedBeforeVisitSet.add(id);
    }
  } catch {
    // Ignore errors during initial storage check
  }
}

function notifySubscribers() {
  for (const listener of listeners) {
    try {
      listener();
    } catch (err) {
      console.error("Error in recently viewed listener:", err);
    }
  }
}

function handleStorageChange(event: StorageEvent) {
  if (event.key !== RECENTLY_VIEWED_STORAGE_KEY && event.key !== null) {
    return;
  }

  snapshot = event.newValue ?? EMPTY_SNAPSHOT;
  notifySubscribers();
}

function handleLocalChange() {
  snapshot = readSnapshot();
  notifySubscribers();
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  if (listeners.size === 1 && typeof window !== "undefined") {
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("grcars_recently_viewed_updated", handleLocalChange);
    window.addEventListener("popstate", handleLocalChange);
    window.addEventListener("pageshow", handleLocalChange);
    window.addEventListener("focus", handleLocalChange);
  }

  return () => {
    listeners.delete(listener);

    if (listeners.size === 0 && typeof window !== "undefined") {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("grcars_recently_viewed_updated", handleLocalChange);
      window.removeEventListener("popstate", handleLocalChange);
      window.removeEventListener("pageshow", handleLocalChange);
      window.removeEventListener("focus", handleLocalChange);
    }
  };
}

function getSnapshot(): string {
  const currentSnapshot = readSnapshot();

  if (currentSnapshot !== snapshot) {
    snapshot = currentSnapshot;
  }

  return snapshot;
}

function getServerSnapshot(): string {
  return EMPTY_SNAPSHOT;
}

function saveVehicles(vehicles: RecentlyViewedVehicle[]) {
  const validVehicles = vehicles.filter(isValidVehicle).slice(0, MAX_RECENTLY_VIEWED);
  const nextSnapshot = JSON.stringify(validVehicles);
  snapshot = nextSnapshot;

  try {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(RECENTLY_VIEWED_STORAGE_KEY, nextSnapshot);
      try {
        window.dispatchEvent(new Event("grcars_recently_viewed_updated"));
      } catch {
        // Fallback for non-standard event environments
      }
    }
  } catch (error) {
    console.error("Failed to save recently viewed vehicles:", error);
  }

  notifySubscribers();
}

export function getRecentlyViewed(): RecentlyViewedVehicle[] {
  return parseVehicles(readSnapshot());
}

/**
 * Adds a complete vehicle inventory object to recently viewed storage:
 * 1. Retrieve existing recently viewed array from localStorage.
 * 2. Identify the current vehicle using its unique inventory ID.
 * 3. Remove any existing entry for that vehicle.
 * 4. Add the complete current vehicle object at the beginning.
 * 5. Keep all unique visited vehicles (up to MAX_RECENTLY_VIEWED).
 * 6. Save the updated array back to localStorage.
 */
export function addRecentlyViewed(vehicleOrId: RecentlyViewedVehicle | string | number) {
  if (!vehicleOrId) return;

  const currentId = getVehicleInventoryId(vehicleOrId);
  if (!currentId) return;

  const currentVehicles = getRecentlyViewed();

  let vehicleToSave: RecentlyViewedVehicle;
  if (typeof vehicleOrId === "object") {
    vehicleToSave = {
      ...vehicleOrId,
      inventory_id: vehicleOrId.inventory_id ?? vehicleOrId.id ?? currentId,
      id: vehicleOrId.id ?? vehicleOrId.inventory_id ?? currentId,
    };
  } else {
    // If only an ID was passed, find if full vehicle already exists
    const existing = currentVehicles.find((v) => getVehicleInventoryId(v) === currentId);
    if (!existing) {
      return;
    }
    vehicleToSave = existing;
  }

  // If vehicle was already in the list prior to this call, remember for visit badge
  if (currentVehicles.some((item) => getVehicleInventoryId(item) === currentId)) {
    viewedBeforeVisitSet.add(currentId);
  }

  // Filter out any existing entry for that vehicle
  const next = currentVehicles.filter(
    (item) => getVehicleInventoryId(item) !== currentId
  );

  // Add the complete current vehicle object at the beginning
  next.unshift(vehicleToSave);

  // Keep all visited vehicles up to MAX_RECENTLY_VIEWED and save
  saveVehicles(next.slice(0, MAX_RECENTLY_VIEWED));
}

export function clearRecentlyViewed() {
  viewedBeforeVisitSet.clear();
  saveVehicles([]);
}

export function useRecentlyViewed() {
  const serializedItems = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const isHydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const recentlyViewed = useMemo(
    () => parseVehicles(serializedItems),
    [serializedItems]
  );

  const hasBeenViewed = useCallback(
    (inventoryId: string | number) => {
      const normalizedId = String(inventoryId).trim();
      return (
        normalizedId !== "" &&
        recentlyViewed.some(
          (item) => getVehicleInventoryId(item) === normalizedId
        )
      );
    },
    [recentlyViewed]
  );

  const wasViewedBeforeCurrentVisit = useCallback(
    (inventoryId: string | number) => {
      const normalizedId = String(inventoryId).trim();
      return normalizedId !== "" && viewedBeforeVisitSet.has(normalizedId);
    },
    []
  );

  return {
    recentlyViewed,
    recentlyViewedIds: recentlyViewed.map(getVehicleInventoryId),
    hasRecentlyViewed: recentlyViewed.length > 0,
    hasBeenViewed,
    wasViewedBeforeCurrentVisit,
    addRecentlyViewed,
    clearRecentlyViewed,
    isHydrated,
  };
}
