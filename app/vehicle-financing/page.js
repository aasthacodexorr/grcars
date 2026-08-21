"use client";

import { Suspense, useEffect, useState } from "react";

import { getConstants } from "@/constants";
import { useAppConfig } from "@/app/providers";
import { Footer, Header } from "@/components/layout";

const MIN_HEIGHT = 500;
const FALLBACK_HEIGHT = 791;

const FinanceContent = () => {
  const appConfig = useAppConfig();
  const { SITE_CONFIG } = getConstants(appConfig);

  const [iframeHeight, setIframeHeight] = useState(FALLBACK_HEIGHT);

  useEffect(() => {
    const handleMessage = (event) => {
      // Only accept messages from the iframe source
      if (event.origin !== "https://gediroute.zopsoftware.com") {
        return;
      }

      const data = event.data;

      if (
        data &&
        typeof data === "object" &&
        data.type === "css" &&
        data.element_id === "finance_form" &&
        typeof data.value === "number"
      ) {
        setIframeHeight(Math.max(MIN_HEIGHT, Math.ceil(data.value)));
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <>
      <Header />

      <main className="bg-background my-18 mx-5 xl:mx-36 overflow-hidden lg:mt-32 mt-36">
        <section className="flex-1 w-full">
          <div className="mx-auto max-w-[1400px]">
            <iframe
              id="finance_form"
              src={SITE_CONFIG?.urls.financeBaseUrl}
              className="w-full border-0 rounded-2xl block"
              title="Express Checkout - Finance"
              allow="payment"
              scrolling="no"
              style={{
                height: `${iframeHeight}px`,
                minHeight: `${MIN_HEIGHT}px`,
              }}
            />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default function FinancePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-lg">
          Loading...
        </div>
      }
    >
      <FinanceContent />
    </Suspense>
  );
}