// components/VehicleInfo.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { getConstants } from "@/constants";
import { useAppConfig } from "@/app/providers";
import { createPortal } from "react-dom";
import { ChevronRight, ArrowDownCircle } from 'lucide-react';


export const VehicleHeaderAndCTA = ({ vehicle }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showSticky, setShowSticky] = useState(false);

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
    ? `${Number(vehicle?.odometer).toLocaleString("en-US")} miles`
    : "96,773 miles";

  // Subtitle Details Line
  const subtitleDetails = [
    vehicle?.trim || "2.0t Premium Sedan 4D",
    formattedOdometer,
  ]
    .filter(Boolean)
    .join(" · ");

  // Prices calculation
  const currentPrice = vehicle?.selling_price || vehicle?.price || 15590;
  const originalPrice =
    vehicle?.original_price || (vehicle?.selling_price ? vehicle?.price : 15990);
  const hasPriceDrop = originalPrice && originalPrice > currentPrice;

  return (
    <>
      {/* Primary Card Container (Observed for sticky bar) */}
      <div
        ref={inlineContainerRef}
        className="w-full bg-white rounded-3xl p-6 font-sans text-center relative"
      >
        {/* Vehicle Title */}
        <h1 className="text-2xl sm:text-[26px] font-extrabold text-[#0d2238] tracking-tight leading-tight mb-1">
          {vehicle?.year || "2016"} {vehicle?.make || "INFINITI"}{" "}
          {vehicle?.model || "Q50"}
        </h1>

        {/* Vehicle Subtitle Details */}
        <p className="text-xs sm:text-sm font-normal text-slate-500 mb-4">
          {subtitleDetails}
        </p>

        {/* Pricing & Tooltip Section */}
        <div className="flex items-center justify-center gap-1.5 mb-3">
          <ArrowDownCircle className="w-5 h-5 text-[#00874e] fill-[#00874e] stroke-white shrink-0" />

          <span className="text-3xl font-extrabold text-[#0d2238]">
            ${Number(currentPrice).toLocaleString("en-US")}
          </span>

          {hasPriceDrop && (
            <span className="text-sm text-slate-500 font-normal ml-1">
              was{" "}
              <span className="line-through">
                ${Number(originalPrice).toLocaleString("en-US")}
              </span>
            </span>
          )}

          {/* Info Tooltip */}
          <div
            ref={tooltipRef}
            className="relative inline-flex items-center group ml-1"
          >
            <button
              type="button"
              onClick={() => setShowTooltip(!showTooltip)}
              className="flex items-center focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 100-2 1 1 0 000 2zm1 8a1 1 0 10-2 0 1 1 0 002 0zm-1-6a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <div
              className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-[220px] bg-black text-white text-xs px-3 py-2 rounded-md shadow-lg z-50 transition-all duration-200 ${showTooltip
                  ? "opacity-100 visible"
                  : "opacity-0 invisible"
                } md:group-hover:opacity-100 md:group-hover:visible`}
            >
              Listed price does not include taxes and licensing fees.
              <div className="absolute left-1/2 -translate-x-1/2 bottom-[-6px] w-2.5 h-2.5 bg-black rotate-45" />
            </div>
          </div>
        </div>

        {/* Upgrades Banner */}
        <button
          type="button"
          className="w-full bg-[#eef7fc] hover:bg-[#e2f0fc] text-[#0d2238] text-xs font-semibold py-2.5 px-3 rounded-md flex items-center justify-between transition-colors mb-5"
        >
          <span>
            {vehicle?.upgrades_text ||
              "Includes: $2,365 in factory upgrades"}
          </span>
          <ChevronRight className="w-4 h-4 text-slate-600" />
        </button>

        {/* Buttons Action Group */}
        <div className="space-y-2.5">
          {/* Button 1: Get Pre-Approved */}
          <a href="/vehicle-financing/" className="block w-full">
            <button className="w-full cursor-pointer   bg-brand-green hover:bg-primary-greenLight text-white font-bold py-3.5 rounded-full transition-colors text-base shadow-sm">
              Get Pre-Approved
            </button>
          </a>

          {/* Button 2: Request Information */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full cursor-pointer bg-white hover:bg-brand-green text-brand-green hover:text-white border-2 border-brand-green font-bold py-3 rounded-full transition-colors text-base"
          >
            Request Information
          </button>
        </div>
      </div>

      {/* Dynamic Sticky Mobile Action Bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 px-4 py-3 shadow-2xl lg:hidden flex gap-3 transition-transform duration-300 ease-in-out ${showSticky ? "translate-y-0" : "translate-y-full"
          }`}
      >
        <a href="/vehicle-financing/" className="flex-1">
          <button className="w-full bg-[#00874e] text-white font-bold py-3 rounded-full text-sm shadow-md">
            Get Pre-Approved
          </button>
        </a>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex-1 bg-white border-2 border-[#00874e] text-[#00874e] font-bold py-3 rounded-full text-sm"
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
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/50 z-[9999] overflow-y-auto p-4 sm:p-6 flex min-h-full items-center justify-center">
      <div className="bg-white rounded-2xl w-full max-w-[520px] relative p-6 lg:p-8 flex flex-col my-auto shadow-xl">

        <button
          onClick={onClose}
          className="absolute right-5 top-5 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors z-10"
          type="button"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-[24px] font-bold text-gray-900 mb-5">Got a question</h2>
        <div className="w-full">
          <iframe
            src={`${SITE_CONFIG?.urls.vehiclePageContactUsBaseUrl}?inventory_id=${inventoryId}`}
            className="w-full rounded-2xl h-[600px] border-0"
            title="Contact Us"
            allow="payment"
          />
        </div>
      </div>
    </div>,
    document.body
  );
};