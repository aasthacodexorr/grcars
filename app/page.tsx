/* =========================
   Home Page
   Root page of the GrCars website.
   Composes all homepage sections in order:
   Hero → CategoryPills → RecentlyViewedVehicles →
   BudgetCards → PopularVehicles → PreQualify →
   Reviews → FaqSection
========================= */

"use client";

// Layout components
import { Header, Footer } from "@/components/layout";

// Home-specific sections
import {
  Hero,
  CategoryPills,
  RecentlyViewedVehicles,
  PreQualify,
  NextRide,
  Reviews,
  GrCarsDifference,
  PopularVehicles,
  FaqSection,
  GoogleReviewsWidget,
  BudgetCards,
} from "@/components/home";

// Shared/reusable sections
import { GetInTouch } from "@/components/common";

/*  Page Component */
const HomePage = () => {
  return (
    <main className="min-h-screen bg-background overflow-hidden pt-[118px] lg:pt-0">
      {/* Hero section has a blue background */}
      <div className="bg-hero-bg ">
        <Hero />
      </div>

      {/* Homepage sections */}
      <RecentlyViewedVehicles />
      <CategoryPills />
      {/* <NextRide /> */}
      <BudgetCards/>
      <PopularVehicles/>
      <PreQualify/>
      <Reviews/>
      <FaqSection/>
      
      {/* <GoogleReviewsWidget/> */}
    </main>
  );
};

export default HomePage;
