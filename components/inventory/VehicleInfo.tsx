// components/VehicleInfo.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { getConstants } from "@/constants";
import { useAppConfig } from "@/app/providers";
import { createPortal } from "react-dom";
import { ChevronRight, ArrowDownCircle, MessageSquareMore } from "lucide-react";
import VDPWishlistButton from "@/components/inventory/VDPWishlistButton";
import { buildUrlWithQueryParams, useIframeUrl } from "@/utils/urlHelpers";
import { PriceDrop } from "../common";

export const VehicleHeaderAndCTA = ({
  vehicle,
  topWishlistId = "vdp-top-wishlist-desktop",
}: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<boolean>(false);
  const [showSticky, setShowSticky] = useState(false);
  const [showCardWishlist, setShowCardWishlist] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const inlineContainerRef = useRef<HTMLDivElement>(null);
  const savingsAmount =
    Number(vehicle?.price || 0) - Number(vehicle?.special_price || 0);

  const toggleTooltip = () => {
    setActiveTooltip((current) => !current);
  };

  // 1. Detect when inline CTAs are scrolled out of view for Sticky Mobile Bar
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowSticky(!entry.isIntersecting);
      },
      { root: null, threshold: 0 }
    );

    if (inlineContainerRef.current) {
      observer.observe(inlineContainerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 1b. Detect when the page-level wishlist heart (top of page, above the
  // gallery) is scrolled out of view / hidden under the header. Only then do
  // we show the alternative save button on this card.
  useEffect(() => {
    const topWishlistEl = document.getElementById(topWishlistId);
    if (!topWishlistEl) return;

    const headerEl = document.querySelector("header");
    const headerHeight = headerEl?.getBoundingClientRect().height ?? 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowCardWishlist(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
        rootMargin: `-${headerHeight}px 0px 0px 0px`,
      }
    );

    observer.observe(topWishlistEl);

    return () => observer.disconnect();
  }, [topWishlistId]);

  // 2. Tooltip outside click handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setActiveTooltip(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);


    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Format Odometer
  const formattedOdometer = vehicle?.odometer
    ? `${Number(vehicle?.odometer).toLocaleString("en-US")} KM`
    : "96,773 KM";

  // Subtitle Details Line
  const subtitleDetails = [
    vehicle?.trim || "2.0t Premium Sedan 4D",
    formattedOdometer,
  ]
    .filter(Boolean)
    .join(" · ");

  // Prices calculation
  const currentPrice = vehicle?.selling_price || vehicle?.price || 0;

  const originalPrice =
    vehicle?.original_price ||
    (vehicle?.selling_price ? vehicle?.price : 0);

  const hasPriceDrop = originalPrice && originalPrice > currentPrice;

  const isSold =
    vehicle.status && vehicle.status.toLowerCase() !== "instock";

  const inventoryId = vehicle?.id || vehicle?.inventory_id;
  const [financeUrl, setFinanceUrl] = useState(() =>
    buildUrlWithQueryParams("/vehicle-financing", inventoryId ? { inventory_id: inventoryId } : undefined)
  );

  useEffect(() => {
    setFinanceUrl(
      buildUrlWithQueryParams("/vehicle-financing", inventoryId ? { inventory_id: inventoryId } : undefined)
    );
  }, [inventoryId]);

  const handleFinanceClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const targetUrl = buildUrlWithQueryParams(
      "/vehicle-financing",
      inventoryId ? { inventory_id: inventoryId } : undefined
    );
    window.location.href = targetUrl;
  };

  return (
    <>
      {/* Primary Card Container (Observed for sticky bar) */}
      <div
        ref={inlineContainerRef}
        className="w-full bg-white rounded-3xl font-sans text-start relative pt-5 lg:pt-3"
      >
        {/* Vehicle Title */}
        <h1 className="text-2xl sm:text-[26px] px-6 font-extrabold text-[#0d2238] tracking-tight leading-tight">
          {vehicle?.year || "2016"} {vehicle?.make || "INFINITI"}{" "}
          {vehicle?.model || "Q50"}
        </h1>

        {/* Vehicle Subtitle Details */}
        <p className="text-base font-normal text-slate-500 mb-4 px-6">
          {subtitleDetails}
        </p>

        {/* Pricing & Tooltip Section */}
        {!isSold ? (
          <div className="my-2">
            <div
              id="vehicle-price-panel"
              className="relative bg-[#f1f8f5] rounded-xl px-4 lg:px-2 py-4 mx-6 mb-3"
            >
              {!isSold && hasPriceDrop && (
                <div className="mb-1 mt-1 w-fit rounded-full bg-[#00a650] px-2 py-1 text-[11px] font-medium leading-3 text-white">
                  Price drop
                </div>
              )}

              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
                    <div className="flex flex-wrap items-baseline gap-x-1 gap-y-1">
                      <PriceDrop
                        price={vehicle?.price}
                        specialPrice={vehicle?.special_price}
                        className="text-[28px] font-extrabold leading-none text-price-black"
                      />
                    </div>

                    {hasPriceDrop && savingsAmount > 0 && (
                      <div className="w-fit shrink-0 rounded-full bg-[#00a650]/10 px-2 py-1.5 text-[12px] font-semibold leading-none text-green-500">
                        Save ${savingsAmount.toLocaleString("en-CA")}
                      </div>
                    )}
                  </div>

                  <div className="mt-1 text-xs font-medium text-gray-500 flex items-center gap-1">
                    + HST &amp; licensing <p data-price-tooltip className="relative inline-flex items-center group">
                      <button
                        type="button"
                        onClick={toggleTooltip}
                        aria-label="Price information"
                        className="flex items-center justify-center mb-1 cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-500 cursor-pointer"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>

                      <span
                        className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 normal-case font-normal tracking-normal w-[240px] max-w-[calc(100vw-32px)] bg-black px-3 py-2 text-xs text-white shadow-lg z-[100] rounded-md transition-opacity duration-200 ${
                          activeTooltip
                            ? "opacity-100 visible"
                            : "opacity-0 invisible"
                        } group-hover:opacity-100 group-hover:visible`}
                      >
                        Listed price does not include taxes and licensing fees.
                        <span className="absolute left-1/2 -translate-x-1/2 bottom-[-6px] h-3 w-3 rotate-45 bg-black" />
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* Buttons Action Group */}
        <div className="hidden lg:block space-y-2.5 px-6 mb-5 text-center">
          {/* Button 1: Get pre-qualified */}
          <a href={financeUrl} onClick={handleFinanceClick} className="block w-full">
            <button className="w-full capitalize cursor-pointer bg-[#00874a] hover:bg-green-800 text-white font-bold py-4 rounded-full transition-colors text-base shadow-sm">
              Get pre-qualified
            </button>
          </a>

          <p>Get terms personalized to you!</p>

          {/* Button 2: Request Information */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full cursor-pointer bg-white hover:bg-brand-green text-brand-green hover:text-white border-2 border-brand-green font-bold py-4 rounded-full transition-colors text-base"
          >
            Request Information
          </button>
        </div>

        {showCardWishlist && (
          <div className="flex justify-center bg-gray-200">
            <VDPWishlistButton vehicle={vehicle} showLabel />
          </div>
        )}
      </div>

      {/* Dynamic Sticky Mobile Action Bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 px-4 py-3 shadow-2xl lg:hidden flex gap-3 transition-transform duration-300 ease-in-out ${showSticky ? "translate-y-0" : "translate-y-full"
          }`}
      >
        <a href={financeUrl} onClick={handleFinanceClick} className="flex-1">
          <button className="w-full capitalize cursor-pointer bg-[#00874a] hover:bg-green-800 text-white font-bold py-3 rounded-full text-sm shadow-md">
            Get pre-qualified
          </button>
        </a>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex-1 w-full cursor-pointer bg-white hover:bg-brand-green text-brand-green hover:text-white border-2 border-brand-green font-bold py-3 rounded-full text-sm"
        >
          Request Info
        </button>
      </div>
{/* 
      <button
        type="button"
        onClick={() => window.chekkitSettings?.toggleChat?.()}
        className="fixed bottom-6 cursor-pointer right-6 z-[9999] rounded-full border-0 bg-[#2563eb] p-3 flex justify-center items-center text-base font-semibold text-white shadow-[0_2px_6px_rgba(37,99,235,0.4)] transition hover:bg-blue-700"
      >
        <MessageSquareMore className="inline-block h-8 w-8" />
      </button> */}

      {/* Modal component */}
      <MessageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        vehicle={vehicle}
      />
    </>
  );
};

// 3. MessageModal Overlay
export const MessageModal = ({ isOpen, onClose, vehicle }: any) => {
  const appConfig = useAppConfig();
  const SITE_CONFIG = getConstants(appConfig).SITE_CONFIG;
  const inventoryId = vehicle?.id || vehicle?.inventory_id;
  const iframeSrc = useIframeUrl(
    SITE_CONFIG?.urls.vehiclePageContactUsBaseUrl,
    inventoryId ? { inventory_id: inventoryId } : undefined
  );

  const [mounted, setMounted] = useState(false);
  const [iframeHeight, setIframeHeight] = useState(640);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const html = document.documentElement;

    const originalHtmlOverflow = html.style.overflow;
    const originalScrollbarGutter = html.style.scrollbarGutter;

    html.style.overflow = "hidden";
    html.style.scrollbarGutter = "stable";

    return () => {
      html.style.overflow = originalHtmlOverflow;
      html.style.scrollbarGutter = originalScrollbarGutter;
    };
  }, [isOpen]);

  // Listen for iframe height
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Only accept messages from the iframe source
      if (event.origin !== "https://gediroute.zopsoftware.com") {
        return;
      }

      const data = event.data;

      if (
        data &&
        typeof data === "object" &&
        data.type === "css" &&
        data.element_id === "contact_us" &&
        typeof data.value === "number"
      ) {
        setIframeHeight(Math.ceil(data.value));
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/50 z-[9999] overflow-y-auto p-4 sm:p-6 flex min-h-full items-center justify-center">
      <div className="bg-white rounded-2xl w-full max-w-[520px] relative p-6 lg:p-8 flex flex-col my-auto shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors z-10"
          type="button"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-[24px] font-bold text-gray-900 mb-5 text-center">
          Request Information
        </h2>

        <div className="w-full overflow-hidden">
          <iframe
            id="contact_us"
            key={iframeSrc}
            src={iframeSrc}
            className="w-full rounded-2xl border-0 block transition-[height] duration-300 ease-out"
            title="Contact Us"
            allow="payment"
            scrolling="no"
            style={{
              height: `${iframeHeight}px`,
            }}
          />
        </div>
      </div>
    </div>,
    document.body
  );
};
