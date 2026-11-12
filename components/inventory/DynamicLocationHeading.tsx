"use client";

import { useInstantSearch } from "react-instantsearch";
import { buildDynamicHeading } from "@/lib/inventoryRouting";
import { LocationResultsCount } from "./InventoryView";

export interface DynamicLocationHeadingProps {
  city?: string;
  province?: string;
}

export default function DynamicLocationHeading({
  city,
  province,
}: DynamicLocationHeadingProps) {
  const { indexUiState } = useInstantSearch();
  const refinementList = indexUiState?.refinementList || {};

  const headingText = buildDynamicHeading({
    refinements: refinementList,
    city,
    province,
  });

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
      <div className="flex items-baseline gap-2 flex-wrap">
        <h1 className="font-bold text-gray-900 tracking-tight text-xl sm:text-2xl md:text-3xl">
          {headingText}
        </h1>
        <span className="font-normal text-gray-500">
          <LocationResultsCount />
        </span>
      </div>
    </div>
  );
}
