'use client';

import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { safeParseVehicleJson } from '@/utils/vehicleSpecs';

interface Props {
  standardJson: string;
  techSpecsJson: string;
  optionalJson: string;
}

export default function ViewAllFeaturesButton({ standardJson, techSpecsJson, optionalJson }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeModalTab, setActiveModalTab] = useState<'features' | 'specs'>('features');
  
  // Ref for the scrollable content container
  const contentContainerRef = useRef<HTMLDivElement>(null);

  // Lock background scroll while the modal is open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Reset scroll position to top whenever activeModalTab changes
  useEffect(() => {
    if (contentContainerRef.current) {
      contentContainerRef.current.scrollTop = 0;
    }
  }, [activeModalTab]);

  const standard = safeParseVehicleJson(standardJson);
  const optional = safeParseVehicleJson(optionalJson);
  const specs = safeParseVehicleJson(techSpecsJson);

  // "Features" = Standard + Vehicle Options merged
  const features: Record<string, string[]> = { ...standard };
  Object.entries(optional).forEach(([key, items]) => {
    features[key] = features[key] ? [...features[key], ...items] : items;
  });

  const hasFeatures = Object.keys(features).length > 0;
  const hasSpecs = Object.keys(specs).length > 0;

  if (!hasFeatures && !hasSpecs) return null;

  const renderList = (data: Record<string, string[]>, emptyLabel: string) =>
    Object.keys(data).length > 0 ? (
      Object.entries(data).map(([subTitle, items]) => (
        <div key={subTitle} className="space-y-2">
          <h4 className="text-gray-800 font-semibold text-[14px]">{subTitle}</h4>
          <ul className="space-y-1.5 list-disc list-inside">
            {items.map((item, idx) => (
              <li key={idx} className="text-[13px] text-gray-600">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))
    ) : (
      <p className="text-[13px] text-gray-500">{emptyLabel}</p>
    );

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="mt-4 w-full cursor-pointer sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full border-2 border-[#0a2237] text-[#0a2237] font-semibold text-[15px] hover:bg-[#0d375e] hover:text-white transition-colors duration-200"
      >
        View All Features &amp; Specialities
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-[600px] max-h-[80vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with title and close button */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
              <h3 className="text-[18px] font-semibold text-gray-900">Features and specs</h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5 cursor-pointer" />
              </button>
            </div>

            {/* Tab buttons - pill style */}
            <div className="flex items-center justify-center gap-2 px-6 py-4 border-b border-gray-200">
              <button
                type="button"
                onClick={() => setActiveModalTab('features')}
                className={`px-8 py-2 cursor-pointer text-[14px] font-medium rounded-full transition-all duration-200 ${
                  activeModalTab === 'features'
                    ? 'bg-gray-200 text-gray-800'
                    : 'bg-white hover:bg-gray-100 text-gray-600 hover:text-gray-800'
                }`}
              >
                Features
              </button>
              <button
                type="button"
                onClick={() => setActiveModalTab('specs')}
                className={`px-8 py-2 cursor-pointer text-[14px] font-medium rounded-full transition-all duration-200 ${
                  activeModalTab === 'specs'
                    ? 'bg-gray-200 text-gray-800'
                    : 'bg-white text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                Specs
              </button>
            </div>

            {/* Content area with ref added */}
            <div ref={contentContainerRef} className="px-6 py-5 overflow-y-auto space-y-5">
              {activeModalTab === 'features'
                ? renderList(features, 'No features listed for this vehicle.')
                : renderList(specs, 'No specifications listed for this vehicle.')}
            </div>
          </div>
        </div>
      )}
    </>
  );
}