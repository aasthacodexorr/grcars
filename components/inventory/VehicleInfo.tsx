// components/VehicleInfo.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { getConstants } from "@/constants";
import { useAppConfig } from "@/app/providers";
import { createPortal } from "react-dom";
import { ChevronRight, ArrowDownCircle } from 'lucide-react';
import VDPWishlistButton from "@/components/inventory/VDPWishlistButton";


export const VehicleHeaderAndCTA = ({ vehicle,topWishlistId = "vdp-top-wishlist-desktop", }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const [showCardWishlist, setShowCardWishlist] = useState(false);

  const tooltipRef = useRef<HTMLDivElement>(null);
  const inlineContainerRef = useRef<HTMLDivElement>(null);

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
        setShowTooltip(false);
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
    vehicle?.original_price || (vehicle?.selling_price ? vehicle?.price : 0);
  const hasPriceDrop = originalPrice && originalPrice > currentPrice;

  const isSold = vehicle.status && vehicle.status.toLowerCase() !== "instock";


  return (
    <>
      {/* Primary Card Container (Observed for sticky bar) */}
      <div
        ref={inlineContainerRef}
        className="w-full bg-white rounded-3xl font-sans text-start relative pt-5 lg:pt-0"
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
  <div className="flex flex-col gap-2 mb-3 px-6 pb-5">
    {Number(currentPrice) > 0 ? (
      <>
        

        {/* Finance Price */}
        <div className="flex items-center justify-between w-full">
          <span className="text-lg font-semibold text-[#0d2238]">
            Finance Price
          </span>

          <span className="text-lg font-semibold text-[#0d2238]">
            ${Number(currentPrice).toLocaleString("en-US")}
          </span>
        </div>

        {/* Cash Price */}
        <div className="flex items-center justify-between w-full">
          <span className="text-lg font-semibold text-[#0d2238]">
            Cash Price
          </span>

          <span className="text-lg font-semibold text-[#0d2238]">
            ${(Number(currentPrice) + 2000).toLocaleString("en-US")}
          </span>
        </div>
      </>
    ) : (
      /* Call for Price */
      <div className="flex items-center justify-center gap-2 py-1">
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>

        <span className="text-lg font-semibold text-[#0d2238]">
          Call for price
        </span>
      </div>
    )}
  </div>
) : null}


        {/* Buttons Action Group */}
        <div className="hidden lg:block space-y-2.5 px-6 mb-5 text-center">
          {/* Button 1: Get Pre-Approved */}
          <a href="/vehicle-financing/" className="block w-full">
            <button className="w-full cursor-pointer bg-[#00874a] hover:bg-green-800 text-white font-bold py-4 rounded-full transition-colors text-base shadow-sm">
              Get Pre-Approved
            </button>
          </a>

          <p>Get terms personalized to you!</p>

          {/* Button 2: Request Information */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full cursor-pointer  bg-white hover:bg-brand-green text-brand-green hover:text-white border-2 border-brand-green font-bold py-4 rounded-full transition-colors text-base"
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
        <a href="/vehicle-financing/" className="flex-1">
          <button className="w-full cursor-pointer bg-[#00874a] hover:bg-green-800 text-white font-bold py-3 rounded-full text-sm shadow-md">
            Get Pre-Approved
          </button>
        </a>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex-1 w-full cursor-pointer bg-white hover:bg-brand-green text-brand-green hover:text-white border-2 border-brand-green font-bold py-3 rounded-full text-sm"
        >
          Request Info
        </button>
      </div>

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

  const [mounted, setMounted] = useState(false);
  const [iframeHeight, setIframeHeight] = useState(870);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const body = document.body;
    const html = document.documentElement;

    const originalBodyOverflow = body.style.overflow;
    const originalBodyTouchAction = body.style.touchAction;
    const originalHtmlOverflow = html.style.overflow;

    body.style.overflow = "hidden";
    body.style.touchAction = "none";
    html.style.overflow = "hidden";

    return () => {
      body.style.overflow = originalBodyOverflow;
      body.style.touchAction = originalBodyTouchAction;
      html.style.overflow = originalHtmlOverflow;
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
            src={`${SITE_CONFIG?.urls.vehiclePageContactUsBaseUrl}?inventory_id=${inventoryId}`}
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