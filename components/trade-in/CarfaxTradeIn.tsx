"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";

interface CarfaxTradeInProps {
  dealerToken?: string;
  className?: string;
}

export default function CarfaxTradeIn({
  dealerToken = "6e815089-b095-4c90-899f-af19e3390145",
  className = "",
}: CarfaxTradeInProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      <Script
        src="https://cdn-tradein.carfax.ca/js/cfctradein.js"
        strategy="afterInteractive"
      />
      <carfax-trade-in-token dealer-token={dealerToken} />
      <carfax-trade-in-card id="tradeInWidget" ti-style="white-filled" />
    </div>
  );
}
