"use client";

import { useWishlist } from "@/context/WishlistContext";
import { WishlistItem } from "@/context/WishlistContext";
import { useState } from "react";

interface VDPWishlistButtonProps {
  vehicle: Record<string, any>;
  showLabel?: boolean; // true = show "Save"/"Saved" text (used on the card instance)
}

export default function VDPWishlistButton({ vehicle, showLabel = false }: VDPWishlistButtonProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist, isHydrated } = useWishlist();
  const [showToast, setShowToast] = useState(false);

  if (!isHydrated) return null;

  const inWishlist = isInWishlist(vehicle.id);

  const handleClick = () => {
    if (inWishlist) {
      removeFromWishlist(vehicle.id);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } else {
      const imageUrl = vehicle.image_urls ? vehicle.image_urls.split("|")[0] : "";
      const wishlistItem: WishlistItem = {
        inventory_id: vehicle.id,
        title: vehicle.title,
        price: vehicle.selling_price,
        odometer: vehicle.odometer || 0,
        image_url: imageUrl,
        year: vehicle.year,
        make: vehicle.make,
        model: vehicle.model,
        trim: vehicle.trim || "",
        stock_no: vehicle.stock_no || "",
        drivetrain: vehicle.drivetrain || "",
        status: vehicle.status || "instock",
      };
      addToWishlist(wishlistItem);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={`flex items-center gap-2 px-4 cursor-pointer py-3 rounded-lg font-semibold transition-all duration-300 ${
          showLabel ? "text-[#0d2238] hover:text-[#06c]" : ""
        }`}
        aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        <svg
          className={`transition-colors duration-300 ${showLabel ? "w-5 h-5" : "w-6 h-6"}`}
          fill={inWishlist ? "#06c" : "none"}
          stroke={inWishlist ? "#06c" : "currentColor"}
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        {showLabel && (
          <span className="text-base ">{inWishlist ? "Saved" : "Save"}</span>
        )}
      </button>
    </>
  );
}