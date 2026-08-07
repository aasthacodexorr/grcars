// constants.ts
import type { Category } from "./types";
import { getInventoryUrlByRange, getInventoryUrlByRefinement } from "@/lib/inventoryUrls";
import { AppConfig } from "@/lib/appConfig";
import suv from '@/assets/cars/suv.webp'
import sedan from '@/assets/cars/sedan.webp'
import truck from '@/assets/cars/truck.webp'
import evs from '@/assets/cars/electric.webp'
import hybrid from '@/assets/cars/hybrid.webp'
import coupe from '@/assets/cars/coupe.webp'
import hatchback from '@/assets/cars/hatchback.webp'

export const getCategories = (appConfig: AppConfig): (Category & { image: string })[] => [
  {
    id:1,
    label: "SUVs",
    image: suv?.src,
    href: getInventoryUrlByRefinement("body_type", ["Suvs", "Sport Utility Vehicle", "SUV-Crossover"], appConfig),
  },
  {
    id:2,
    label: "Sedans",
    image: sedan?.src,
    href: getInventoryUrlByRefinement("body_type", ["Sedan", "Sedan 4 Dr."], appConfig),
  },
  {
    id:3,
    label: "Trucks",
    image: truck?.src,
    href: getInventoryUrlByRefinement("body_type", ["Truck", "Pickup"], appConfig),
  },
  {
    id:4,
    label: "EVs",
    image:  evs?.src,
    href: getInventoryUrlByRefinement("body_type", ["Commercial EV"], appConfig),
  },
  {
    id:5,
    label: "Hybrids",
    image:  hybrid?.src,
    href: getInventoryUrlByRefinement("fuel_type", ["hybrid"], appConfig),
  },
  {
    id:6,
    label: "Coupes",
    image:  coupe?.src,
    href: getInventoryUrlByRefinement("body_type", ["Coupe"], appConfig),
  },
  {
    id:7,
    label: "Hatchbacks",
    image:  hatchback?.src,
    href: getInventoryUrlByRefinement("body_type", ["Hatchback"], appConfig),
  },
  {
    id:8,
    label: "SUVs",
    image: suv?.src,
    href: getInventoryUrlByRefinement("body_type", ["Suvs", "Sport Utility Vehicle", "SUV-Crossover"], appConfig),
  },
  {
    id:13,
    label: "Sedans",
    image: sedan?.src,
    href: getInventoryUrlByRefinement("body_type", ["Sedan", "Sedan 4 Dr."], appConfig),
  },
  {
    id:9,
    label: "Trucks",
    image: truck?.src,
    href: getInventoryUrlByRefinement("body_type", ["Truck", "Pickup"], appConfig),
  },
  {
    id:10,
    label: "EVs",
    image:  evs?.src,
    href: getInventoryUrlByRefinement("body_type", ["Commercial EV"], appConfig),
  },
  {
    id:11,
    label: "Hybrids",
    image:  hybrid?.src,
    href: getInventoryUrlByRefinement("fuel_type", ["hybrid"], appConfig),
  },
  {
    id:12,
    label: "Coupes",
    image:  coupe?.src,
    href: getInventoryUrlByRefinement("body_type", ["Coupe"], appConfig),
  },
];