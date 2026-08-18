'use client';

import { useEffect, useState } from 'react';

const TABS = [
  {
    id: 'details',
    label: 'Vehicle Details',
    target: 'vehicle-details-section',
  },
  {
    id: 'description',
    label: 'Vehicle Description',
    target: 'vehicle-description-section',
  },
] as const;

const SCROLL_OFFSET = 300;

export default function VehicleDetailsTabsNav() {
  const [activeTab, setActiveTab] = useState<string>('details');
  const [showTabs, setShowTabs] = useState(true);

  useEffect(() => {
    const footer = document.querySelector('footer');

    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Footer is visible -> hide tabs
        setShowTabs(!entry.isIntersecting);
      },
      {
        threshold: 0,
      }
    );

    observer.observe(footer);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleTabClick = (tabId: string, targetId: string) => {
    setActiveTab(tabId);

    const el = document.getElementById(targetId);

    if (el) {
      const y =
        el.getBoundingClientRect().top +
        window.scrollY -
        SCROLL_OFFSET;

      window.scrollTo({
        top: y,
        behavior: 'smooth',
      });
    }
  };

  if (!showTabs) {
    return null;
  }

  return (
    <div className="w-full bg-white shadow-lg border-b border-gray-200 rounded-full">
      <div className="w-full flex items-center justify-start py-3 px-3">
        <div className="inline-flex items-center gap-1 bg-white rounded-full p-1.5">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabClick(tab.id, tab.target)}
              className={`px-8 py-3 text-[16px] font-semibold rounded-full cursor-pointer transition-all duration-200 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#eaf4ff] text-[#0d2238] shadow-sm'
                  : 'bg-transparent text-gray-700 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}