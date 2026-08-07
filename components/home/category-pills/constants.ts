// constants.ts
import type { Category } from "./types";
import { getInventoryUrlByRange, getInventoryUrlByRefinement } from "@/lib/inventoryUrls";
import { AppConfig } from "@/lib/appConfig";

export const getCategories = (appConfig: AppConfig): (Category & { image: string })[] => [
  {
    id:1,
    label: "SUVs",
    image: "/images/vehicles/suv.png",
    href: getInventoryUrlByRefinement("body_type", ["Suvs", "Sport Utility Vehicle", "SUV-Crossover"], appConfig),
  },
  {
    id:2,
    label: "Sedans",
    image: "/images/vehicles/sedan.png",
    href: getInventoryUrlByRefinement("body_type", ["Sedan", "Sedan 4 Dr."], appConfig),
  },
  {
    id:3,
    label: "Trucks",
    image: "/images/vehicles/truck.png",
    href: getInventoryUrlByRefinement("body_type", ["Truck", "Pickup"], appConfig),
  },
  {
    id:4,
    label: "EVs",
    image: "/images/vehicles/ev.png",
    href: getInventoryUrlByRefinement("body_type", ["Commercial EV"], appConfig),
  },
  {
    id:5,
    label: "Hybrids",
    image: "/images/vehicles/hybrid.png",
    href: getInventoryUrlByRefinement("fuel_type", ["hybrid"], appConfig),
  },
  {
    id:6,
    label: "Coupes",
    image: "/images/vehicles/coupe.png",
    href: getInventoryUrlByRefinement("body_type", ["Coupe"], appConfig),
  },
  {
    id:7,
    label: "Hatchbacks",
    image: "/images/vehicles/hatchback.png",
    href: getInventoryUrlByRefinement("body_type", ["Hatchback"], appConfig),
  },
  {
    id:8,
    label: "Sedans",
    image: "/images/vehicles/sedan.png",
    href: getInventoryUrlByRefinement("body_type", ["Sedan", "Sedan 4 Dr."], appConfig),
  },
  {
    id:9,
    label: "Trucks",
    image: "/images/vehicles/truck.png",
    href: getInventoryUrlByRefinement("body_type", ["Truck", "Pickup"], appConfig),
  },
  {
    id:10,
    label: "EVs",
    image: "/images/vehicles/ev.png",
    href: getInventoryUrlByRefinement("body_type", ["Commercial EV"], appConfig),
  },
  {
    id:11,
    label: "Hybrids",
    image: "/images/vehicles/hybrid.png",
    href: getInventoryUrlByRefinement("fuel_type", ["hybrid"], appConfig),
  },
  {
    id:12,
    label: "Coupes",
    image: "/images/vehicles/coupe.png",
    href: getInventoryUrlByRefinement("body_type", ["Coupe"], appConfig),
  },
  {
    id:13,
    label: "Hatchbacks",
    image: "/images/vehicles/hatchback.png",
    href: getInventoryUrlByRefinement("body_type", ["Hatchback"], appConfig),
  },
];