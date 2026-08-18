'use client';

import React, { useState } from 'react';
import { safeParseVehicleJson } from '@/utils/vehicleSpecs';

interface AccordionProps {
  standardJson: string; // From vehicle.standard
  techSpecsJson: string; // From vehicle.technical_specification
  optionalJson: string; // From vehicle.optional
}

export default function VehicleSpecificationsAccordion({
  standardJson,
  techSpecsJson,
  optionalJson
}: AccordionProps) {
  
  const parsedStandard = safeParseVehicleJson(standardJson);
  const parsedTechSpecs = safeParseVehicleJson(techSpecsJson);
  const parsedOptional = safeParseVehicleJson(optionalJson);

  const categoriesData = {
    standard: { label: "Standard", data: parsedStandard },
    techSpecs: { label: "Technical Specifications", data: parsedTechSpecs },
    optional: { label: "Vehicle Options", data: parsedOptional },
    custom: { label: "Custom Features", data: {} }
  };

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    standard: false, 
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="w-full max-w-[800px] font-sans space-y-2 select-none">
      {Object.entries(categoriesData).map(([key, config]) => {
        const subCategories = config.data;
        const hasContent = Object.keys(subCategories).length > 0;

        // CONDITIONAL RENDER: If this entire main specification group has no features, skip it completely!
        if (!hasContent) return null;

        const isOpen = !!openSections[key];

        return (
          <div key={key} className="border border-gray-200 rounded overflow-hidden shadow-sm">
            <button
              onClick={() => toggleSection(key)}
              className="w-full cursor-pointer text-white font-semibold text-[14px] px-4 py-3 flex items-center justify-between bg-brand-green"
            >
              <span className="tracking-wide">{config.label}</span>
              <div className="flex items-center justify-center w-5 h-5">
                {isOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white stroke-[3.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white stroke-[3.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                )}
              </div>
            </button>

            {isOpen && (
              <div className="bg-white px-5 py-4">
                <div className="space-y-5">
                  {Object.entries(subCategories).map(([subTitle, itemsList]) => (
                    <div key={subTitle} className="space-y-2.5">
                      <h4 className="text-gray-900 font-bold text-[13px] tracking-tight border-b border-gray-100 pb-1">
                        {subTitle}
                      </h4>

                      <div className="space-y-2">
                        {itemsList?.map((feature, idx) => (
                          <div 
                            key={idx} 
                            className="flex items-center justify-between text-[12px] font-medium text-gray-700 hover:bg-gray-50/60 py-0.5 px-1 rounded transition-colors"
                          >
                            <span>{feature}</span>
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="w-4 h-4 stroke-[2.5] flex-shrink-0 ml-4 text-brand-green"
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}