"use client";
import { Suspense } from "react";

// Config
import { getConstants } from "@/constants";
import { useAppConfig } from "@/app/providers";
import { Footer, Header } from "@/components/layout";

/*  Inner component (needs useSearchParams) */
const FinanceContent = () => {
  const appConfig = useAppConfig();
  const { SITE_CONFIG } = getConstants(appConfig);

  return (
    <>
    <Header/>
    <main className="bg-background  my-18 mx-5 xl:mx-36 overflow-hidden lg:mt-32">
      <section className="flex-1 w-full">
        <div className="mx-auto max-w-[1400px">
          <iframe
            src={`${SITE_CONFIG?.urls.financeBaseUrl}`}
            className="w-full border-0 rounded-2xl min-h-screen"
            title="Express Checkout - Finance"
            allow="payment"
          />
        </div>
      </section>
    </main>
    <Footer/>
    </>
  );
};

/*  Page export: wrapped in Suspense */
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
