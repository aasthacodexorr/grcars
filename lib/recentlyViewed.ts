"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import type { AppConfig } from "@/lib/appConfig";
import { useAppConfig } from "@/app/providers";

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
 * Determines whether a vehicle is considered sold.
 * Vehicles with `status !== "instock"` (case-insensitive) or `is_sold === true` are treated as sold.
 */
export function isSoldVehicle(vehicle: unknown): boolean {
  if (!vehicle || typeof vehicle !== "object") return false;
  const v = vehicle as Record<string, unknown>;
  if (v.is_sold === true || v.isSold === true) return true;
  if (v.status != null) {
    const status = String(v.status).trim().toLowerCase();
    if (status && status !== "instock") {
      return true;
    }
  }
  return false;
}

/**
 * Validates that an item from localStorage represents a complete, renderable vehicle object.
 * Excludes sold inventory.
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
  // Never treat sold vehicles as valid recently viewed items
  if (isSoldVehicle(v)) {
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
    if (initialItems.length > 0) {
      document.documentElement.classList.add("is-returning-visitor");
    }
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
      if (validVehicles.length > 0) {
        document.documentElement.classList.add("is-returning-visitor");
      } else {
        document.documentElement.classList.remove("is-returning-visitor");
      }
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
 * 1. Ensure the vehicle is not sold.
 * 2. Retrieve existing recently viewed array from localStorage.
 * 3. Identify the current vehicle using its unique inventory ID.
 * 4. Remove any existing entry for that vehicle.
 * 5. Add the complete current vehicle object at the beginning.
 * 6. Keep all unique visited vehicles (up to MAX_RECENTLY_VIEWED).
 * 7. Save the updated array back to localStorage.
 */
export function addRecentlyViewed(vehicleOrId: RecentlyViewedVehicle | string | number) {
  if (!vehicleOrId) return;

  const currentId = getVehicleInventoryId(vehicleOrId);
  if (!currentId) return;

  // Never add or retain sold inventory
  if (isSoldVehicle(vehicleOrId)) {
    const currentVehicles = getRecentlyViewed();
    const next = currentVehicles.filter(
      (item) => getVehicleInventoryId(item) !== currentId
    );
    if (next.length !== currentVehicles.length) {
      saveVehicles(next);
    }
    return;
  }

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
    if (!existing || isSoldVehicle(existing)) {
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

export function removeRecentlyViewed(inventoryId: string | number) {
  const currentId = getVehicleInventoryId(inventoryId);
  if (!currentId) return;
  const currentVehicles = getRecentlyViewed();
  const next = currentVehicles.filter(
    (item) => getVehicleInventoryId(item) !== currentId
  );
  if (next.length !== currentVehicles.length) {
    saveVehicles(next);
  }
}

export function clearRecentlyViewed() {
  viewedBeforeVisitSet.clear();
  if (typeof document !== "undefined") {
    document.documentElement.classList.remove("is-returning-visitor");
  }
  saveVehicles([]);
}

export function useRecentlyViewed(appConfigOverride?: AppConfig) {
  let contextConfig: AppConfig | undefined;
  try {
    contextConfig = useAppConfig();
  } catch {
    // Graceful fallback if called outside provider
  }
  const appConfig = appConfigOverride ?? contextConfig;

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

  const [inventoryVehicles, setInventoryVehicles] = useState<{
    key: string;
    vehicles: RecentlyViewedVehicle[];
  }>({ key: "", vehicles: [] });

  const host = appConfig?.site?.typesense_host;
  const port = Number(appConfig?.site?.typesense_port) || 443;
  const protocol = appConfig?.site?.typesense_protocol || "https";
  const collection = appConfig?.site?.collection;
  const searchKey = appConfig?.site?.inventory_search_only_key;
  const inventoryKey = JSON.stringify([
    serializedItems,
    host,
    port,
    protocol,
    collection,
    searchKey,
  ]);

  // Only expose vehicles after resolving their IDs to current inventory documents.
  const recentlyViewed = useMemo(
    () =>
      inventoryVehicles.key === inventoryKey
        ? inventoryVehicles.vehicles
        : [],
    [inventoryVehicles, inventoryKey]
  );

  useEffect(() => {
    if (!isHydrated) return;

    const storedVehicles = parseVehicles(serializedItems);
    if (!storedVehicles.length) {
      setInventoryVehicles({ key: inventoryKey, vehicles: [] });
      return;
    }

    // Without inventory access, cached vehicle details must not be displayed.
    if (!host || !collection || !searchKey) return;

    const ids = Array.from(
      new Set(
        storedVehicles.flatMap((vehicle) => {
          const id = vehicle.id;
          const inventoryId = vehicle.inventory_id;
          return [id, inventoryId]
            .filter((value): value is string | number =>
              typeof value === "string" || typeof value === "number"
            )
            .map((value) => String(value).trim())
            .filter(Boolean);
        })
      )
    );
    if (ids.length === 0) {
      setInventoryVehicles({ key: inventoryKey, vehicles: [] });
      return;
    }

    let isCancelled = false;

    async function fetchCurrentVehicles() {
      try {
        const filter = `id:=[${ids.map((id) => `\`${id.replace(/`/g, "'")}\``).join(",")}]`;
        const searchUrl = `${protocol}://${host}:${port}/collections/${collection}/documents/search?q=*&filter_by=${encodeURIComponent(filter)}&per_page=${ids.length}`;

        const res = await fetch(searchUrl, {
          headers: {
            "X-TYPESENSE-API-KEY": searchKey,
          },
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`Inventory lookup failed with status ${res.status}`);
        }
        const data = (await res.json()) as {
          hits?: Array<{ document?: Record<string, unknown> }>;
        };
        if (isCancelled) return;

        const vehiclesById = new Map<string, RecentlyViewedVehicle>();
        for (const hit of data.hits ?? []) {
          const document = hit.document;
          if (!document) continue;
          for (const value of [document.id, document.inventory_id]) {
            if (value != null) {
              vehiclesById.set(String(value).trim(), document);
            }
          }
        }

        const currentVehicles = storedVehicles.flatMap((storedVehicle) => {
          const storedIds = [storedVehicle.inventory_id, storedVehicle.id]
            .filter((value): value is string | number =>
              typeof value === "string" || typeof value === "number"
            )
            .map((value) => String(value).trim())
            .filter(Boolean);
          const liveVehicle = storedIds
            .map((id) => vehiclesById.get(id))
            .find((vehicle) => vehicle !== undefined);
          return liveVehicle && isValidVehicle(liveVehicle) ? [liveVehicle] : [];
        });

        if (isCancelled) return;
        setInventoryVehicles({ key: inventoryKey, vehicles: currentVehicles });
        saveVehicles(currentVehicles);
      } catch (error) {
        console.error("Failed to refresh recently viewed vehicles from inventory:", error);
      }
    }

    fetchCurrentVehicles();

    return () => {
      isCancelled = true;
    };
  }, [
    isHydrated,
    serializedItems,
    inventoryKey,
    host,
    port,
    protocol,
    collection,
    searchKey,
  ]);

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
    recentlyViewedVehicles: recentlyViewed,
    recentlyViewedIds: recentlyViewed.map(getVehicleInventoryId),
    hasRecentlyViewed: recentlyViewed.length > 0,
    hasBeenViewed,
    wasViewedBeforeCurrentVisit,
    addRecentlyViewed,
    removeRecentlyViewed,
    clearRecentlyViewed,
    isHydrated,
  };
}
