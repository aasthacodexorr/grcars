'use client';

import { useEffect, useRef, useState } from 'react';

const TABS = [
  { id: 'details', label: 'Vehicle Details', target: 'vehicle-details-section' },
  { id: 'pricing', label: 'Price Details', target: 'vehicle-pricing-section' },
  { id: 'features', label: 'Features', target: 'vehicle-features-section' },
  { id: 'protection', label: 'Protection', target: 'vehicle-protection-section' },
  { id: 'description', label: 'Vehicle Description', target: 'vehicle-description-section' },
] as const;

interface VehicleDetailsTabsNavProps {
  isSold?: boolean;
  hasFeatures?: boolean;
  hasDescription?: boolean;
}

export default function VehicleDetailsTabsNav({
  isSold = false,
  hasFeatures = true,
  hasDescription = true,
}: VehicleDetailsTabsNavProps) {
  const tabs = TABS.filter((t) => {
    if (t.id === 'pricing' && isSold) return false;
    if (t.id === 'features' && !hasFeatures) return false;
    if (t.id === 'description' && !hasDescription) return false;
    return true;
  });
  const [activeTab, setActiveTab] = useState<string>('details');
  const [showTabs, setShowTabs] = useState(true);
  const [headerHeight, setHeaderHeight] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);

  // Track the real fixed header height so the nav sticks right below it
  useEffect(() => {
    const header = document.querySelector('header');
    if (!header) return;

    const update = () => setHeaderHeight(header.getBoundingClientRect().height);
    update();

    const ro = new ResizeObserver(update);
    ro.observe(header);
    window.addEventListener('resize', update);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowTabs(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  // Robust scroll-position listener to update active tab accurately
  useEffect(() => {
    const handleScroll = () => {
      const navHeight = navRef.current?.getBoundingClientRect().height || 60;
      const threshold = headerHeight + navHeight + 80;

      let currentActive = tabs[0]?.id || 'details';
      for (const tab of tabs) {
        const el = document.getElementById(tab.target);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= threshold) {
            currentActive = tab.id;
          }
        }
      }

      // Fallback for when scrolled past the very last section or near bottom of page
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100
      ) {
        currentActive = tabs[tabs.length - 1]?.id || currentActive;
      }

      setActiveTab(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [tabs, headerHeight]);

  const handleTabClick = (tabId: string, targetId: string) => {
    setActiveTab(tabId);

    const el = document.getElementById(targetId);
    const navEl = navRef.current;
    if (!el || !navEl) return;

    const isMobile = window.innerWidth < 768;
    const extraGap = isMobile ? 70 : 10;

    const navHeight = navEl.getBoundingClientRect().height;
    const offset = headerHeight + navHeight + extraGap;

    el.style.scrollMarginTop = `${offset}px`;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (!showTabs) return null;

  return (
    <div
      ref={navRef}
      style={{ top: headerHeight }}
      className="w-full bg-white shadow-lg border-b border-gray-200 rounded-full sticky z-50"
    >
      <div className="w-full flex items-center justify-start py-3 px-3">
        <div className="inline-flex items-center gap-1 bg-white rounded-full p-1.5 overflow-x-auto max-w-full">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabClick(tab.id, tab.target)}
              className={`px-4 lg:px-8 py-3 text-[16px] font-semibold rounded-full cursor-pointer transition-all duration-200 whitespace-nowrap ${
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
