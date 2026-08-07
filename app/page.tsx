/* =========================
   Home Page
   Root page of the GrCars website.
   Composes all homepage sections in order:
   Hero → CategoryPills → PreQualify → NextRide →
   FeaturedVehicles → Reviews → GrCarsDifference →
   GetInTouch → Footer
========================= */

"use client";

// Layout components
import { Header, Footer } from "@/components/layout";

// Home-specific sections
import {
  Hero,
  CategoryPills,
  PreQualify,
  NextRide,
  Reviews,
  GrCarsDifference,
  PopularVehicles,
  FaqSection,
  GoogleReviewsWidget,
} from "@/components/home";

// Shared/reusable sections
import { GetInTouch } from "@/components/common";

/*  Page Component */
const HomePage = () => {
  return (
    <main className="min-h-screen bg-background overflow-hidden">
      {/* Hero section has a blue background */}
      <div className="bg-hero-bg ">
        <Header />
        <Hero />
      </div>

      {/* Homepage sections */}
      <CategoryPills />
      <NextRide />
      <PopularVehicles/>
      <PreQualify/>
      <Reviews/>
      <FaqSection/>
      <Footer />
      <GoogleReviewsWidget/>
    </main>
  );
};

export default HomePage;
