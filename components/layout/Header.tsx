"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Menu, Repeat, Wallet, X } from "lucide-react";
import Image from "next/image";

import facebook from "@/assets/social/fb.png";
import instagram from "@/assets/social/insta-1.png";

import GrCarsLogo from "@/components/common/GrCarsLogo";
import { getConstants, NAV_ITEMS } from "@/constants";
import { useAppConfig } from "@/app/providers";
import { useWishlist } from "@/context/WishlistContext";
import { useDrawer } from "@/context/DrawerContext";
import { isVehicleDetailSlug } from "@/lib/inventoryUrls";
const googleMapsUrl = "https://www.google.com/maps/place/Gedi+Route+Cars/@43.7055262,-79.6938153,4367m/data=!3m1!1e3!4m6!3m5!1s0x882b3f18084db7a7:0x703d924801f6b7fa!8m2!3d43.7016063!4d-79.702997!16s%2Fg%2F11kr86czzy?entry=ttu&g_ep=EgoyMDI2MDgyMy4wIKXMDSoASAFQAw%3D%3D";

/* Component */
const Header = () => {
  const appConfig = useAppConfig();
  const { SITE_CONFIG, PHONE_NUMBER, PHONE_HREF } = getConstants(appConfig);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { wishlist, isHydrated } = useWishlist();
  const { openWishlistDrawer } = useDrawer();
  const wishlistCount = isHydrated ? wishlist?.length : 0;


  const inventorySlug = pathname?.startsWith("/inventory/")
    ? pathname.replace(/^\/inventory\/?/, "").split("/").filter(Boolean)
    : [];
  const hasVehicleId = isVehicleDetailSlug(inventorySlug);

  // Relative only if vehicle ID exists; fixed for all other paths (including sub-routes like /inventory/search)
  const positionClass = hasVehicleId ? "relative" : "fixed top-0";

  // Close mobile menu whenever the route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll while mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Desktop Header */}
      <header className={`hidden lg:block ${positionClass} z-50 w-full shadow-[0_2px_10px_rgba(0,0,0,0.05)] px-8 bg-white`}>
        <div className="mx-auto flex max-w-[1600px] items-center justify-between py-[18px]">

          {/* Logo */}
          <div className="[&_img]:w-full [&_img]:object-[initial] [&_img]:h-auto [&_img]:max-w-[165px]">
            <Link href="/" aria-label="GrCars home">
              <GrCarsLogo />
            </Link>
          </div>

          {/* Primary Navigation */}
          <nav className="flex-[0.6] flex justify-start items-center gap-0">
            {NAV_ITEMS.map((item, index) => {
              const isActive =
                pathname === item.to || pathname?.startsWith(item.to + "/");

              const isLast = index === NAV_ITEMS.length - 1;
              const isExternal = item.to.startsWith("http");

              const Icon = "icon" in item ? item.icon : null;

              return (
                <a
                  key={item.label}
                  href={item.to}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  onClick={(e) => {
                    if (item.to === "/inventory") {
                      e.preventDefault();
                      window.location.href = "/inventory";
                    }
                  }}
                  className={`relative flex items-center gap-2 text-[16px] font-medium transition-colors whitespace-nowrap capitalize tracking-[0px] mt-2 py-[6px] px-5 leading-normal font-[Lato,sans-serif]
        ${!isLast
                      ? "after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-[22px] after:w-[2px] after:bg-[rgba(181,180,180,0.35)]"
                      : ""
                    }
        ${isActive
                      ? "text-brand-green"
                      : "text-black hover:text-brand-green"
                    }
      `}
                >
                  {Icon && <Icon size={18} strokeWidth={2.5} />}
                  <span className="font-semibold tracking-wide">{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Call-Us Button */}
          <div className="flex-[0.2] flex justify-end pr-5 items-center gap-4">
            <button
              onClick={openWishlistDrawer}
              className={`text-[18px] cursor-pointer flex items-center gap-[5px] text-black hover:opacity-80 transition-opacity relative`}
              aria-label="Wishlist"
            >
              <svg className="w-[26px] h-[26px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>Favourites</span>
              {isHydrated && (
                <span className="text-black text-[18px] flex items-center justify-center">
                  ({wishlistCount})
                </span>
              )}
            </button>

          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className={`lg:hidden ${positionClass} left-0 w-full z-50 bg-neutral-offWhite shadow-none`}>

        {/* Top bar: logo + social icons */}
        <div className="flex items-center justify-between pl-[12px] pr-[29px] py-[20px] w-full ">
          <Link href="/" aria-label="GrCars home" className="[&_img]:max-w-[200px] [&_img]:h-auto">
            <GrCarsLogo />
          </Link>

          <div className="flex items-center w-full justify-end gap-3">
            {/* Favorites Icon */}
            <button
              onClick={openWishlistDrawer}
              className="flex flex-col items-center justify-center gap-1 relative"
              aria-label="Wishlist"
            >
              <svg className="w-[24px] h-[24px]" fill="none" viewBox="0 0 24 24" stroke="black">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>

            {/* Menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex flex-col items-center justify-center gap-1 mx-[7%] max-[537px]:mx-[6%] max-[397px]:mx-[4%]"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <Menu className="h-[24px] w-[24px] text-black fill-black" />
            </button>
          </div>
        </div>

        {/* Mobile horizontal navigation tabs */}
        <div className="w-full overflow-x-auto scrollbar-hide border-t border-gray-100 border-b border-gray-100 px-3">
          <nav className="flex w-max min-w-full items-center">
            {NAV_ITEMS.map((item) => {
              const isActive =
                pathname === item.to || pathname?.startsWith(item.to + "/");

              const isExternal = item.to.startsWith("http");

              return (
                <Link
                  key={item.label}
                  href={item.to}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  onClick={(e) => {
                    if (item.to === "/inventory") {
                      e.preventDefault();
                      window.location.href = "/inventory";
                    }
                  }}
                  className={`flex h-[48px] shrink-0 items-center justify-center px-5 text-[15px] font-semibold whitespace-nowrap transition-colors ${isActive
                    ? "text-brand-green"
                    : "text-black"
                    }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Slide-down nav drawer */}
        {/* Full-screen mobile menu drawer */}
        <div
          className={`fixed inset-0 z-[100] bg-white transition-transform duration-300 ease-in-out overflow-y-auto ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          {/* Top Bar with Close Button */}
          <div className="flex justify-end px-6 pt-6">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex h-9 w-9 items-center justify-center text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Welcome Header Section (Pushed down with spacing) */}
          <div className="px-6 pt-2 pb-4">
            <h2 className="text-[24px] font-bold text-gray-900 tracking-tight">
              Welcome to GRCars
            </h2>
            <p className="text-[14px] text-gray-500 mt-0.5">
              Personalize your experience
            </p>
          </div>

          {/* Drawer Content */}
          <div className="px-6 pb-10 flex flex-col gap-6">
            {/* Finance Section */}
            <div className="flex flex-col gap-2">
              <h3 className="text-[18px] font-bold text-gray-900">
                Finance with GRCars
              </h3>
              <div className="rounded-2xl border border-gray-200 p-4 bg-white shadow-sm flex flex-col gap-3">
                <p className="text-[15px] leading-relaxed text-gray-600">
                  Get pre-qualified and shop with real terms. <span className="font-bold text-gray-900">No hit to your credit.</span>
                </p>
                <Link
                  href="/finance"
                  className="w-full py-2.5 bg-gray-50 hover:bg-gray-100 text-blue-600 font-semibold text-[14px] rounded-xl text-center transition-colors"
                >
                  Get Pre-qualified
                </Link>
              </div>
            </div>

            {/* Sell / Trade Offer Section */}
            <div className="flex flex-col gap-2">
              <h3 className="text-[18px] font-bold text-gray-900">
                Sell/Trade Offer
              </h3>
              <div className="rounded-2xl border border-gray-200 p-4 bg-white shadow-sm flex flex-col gap-3">
                <p className="text-[15px] leading-relaxed text-gray-600">
                  Get a real offer in less than 2 minutes — sell, trade or track your value.
                </p>
                <Link
                  href="/trade-in-my-car"
                  className="w-full py-2.5 bg-gray-50 hover:bg-gray-100 text-blue-600 font-semibold text-[14px] rounded-xl text-center transition-colors"
                >
                  Get Your Offer
                </Link>
              </div>
            </div>
            <Link href="/contact-us" className="flex flex-col gap-2">
              <h3 className="text-[18px] font-bold text-gray-900">
                Contact Us
              </h3>

            </Link>
            <Link href="/about-us" className="flex flex-col gap-2">
              <h3 className="text-[18px] font-bold text-gray-900">
                About Us
              </h3>

            </Link>
            <Link href="/blogs" className="flex flex-col gap-2">
              <h3 className="text-[18px] font-bold text-gray-900">
                Our Blogs
              </h3>

            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;