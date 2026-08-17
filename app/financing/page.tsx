"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Layout
import { Header, Footer } from "@/components/layout";
import finImg from "@/assets/cars/finImg1.jpg";

// Config
import { getConstants } from "@/constants";
import { useAppConfig } from "@/app/providers";
import { Reviews } from "@/components/home";
import FaqAccordion from "@/components/common/FaqAccordion";

/* Constants */
const MIN_HEIGHT = 540;
const FALLBACK_HEIGHT = 900;

const faqs = [
  {
    q: "How can I apply for used car financing in Brampton with Gedi Route Cars?",
    a: "You can apply directly through our online finance form or visit our indoor showroom in Brampton. Once you share a few basic details, our team reviews your information and connects you with the right lender. We handle all communication with the banks and lenders on your behalf, so getting approved is simple and quick.",
  },
  {
    q: "Can I get approved for financing if I have bad credit or no credit?",
    a: "Yes. We specialize in helping customers across all credit backgrounds. Whether your credit is perfect, rebuilding, or you’re a first-time buyer with no credit history, our finance experts work with multiple lenders to secure a solution that fits your situation. Approval rates are high, and most applicants receive a quick response.",
  },
  {
    q: "What documents do I need for a car finance application?",
    a: "To start your financing process, you’ll typically need a valid driver’s license, proof of income, and proof of address. Our finance department may request additional documents depending on the lender’s requirements, but we’ll guide you through each step to make the process easy.",
  },
  {
    q: "How long does it take to get financing approval?",
    a: "In most cases, approvals are completed the same day. Since we work with a large network of lenders, we can match your application quickly and help you finalize your purchase without unnecessary waiting.",
  },
  {
    q: "Do you offer car loans only for used vehicles?",
    a: "Our main focus is used vehicles, but we also have new models available, including options from Honda, Hyundai, and Volkswagen. You can finance both used and new vehicles through the same application process.",
  },
  {
    q: "Is there a minimum credit score required to apply for financing?",
    a: "No specific credit score is required. Our goal is to help every customer find a suitable plan. Because we partner with many leading lenders, we can often arrange approvals even for those with low or limited credit scores.",
  },
  {
    q: "Can I trade in my old vehicle when applying for financing?",
    a: "Yes. We accept trade-ins to help you lower the cost of your next car. Our appraisal team provides a fair market value for your vehicle, and you can apply the amount toward your new purchase or financing plan.",
  },
  {
    q: "What types of vehicles can I finance through Gedi Route Cars?",
    a: "You can finance all types of vehicles in our inventory, including sedans, SUVs, trucks, vans, hatchbacks, and coupes. With over 300 vehicles to choose from, we’ll help you find the one that suits your lifestyle and budget.",
  },
  {
    q: "Do you provide used car financing outside Brampton?",
    a: "Yes. We serve customers across Ontario, including Mississauga, Toronto, Etobicoke, Milton, Caledon, Oakville, Bolton, Guelph, Kitchener, Burlington, and Waterloo. You can start your application online, and our finance team will assist you remotely.",
  },
  {
    q: "Why should I choose Gedi Route Cars for used car financing in Brampton?",
    a: "We are an OMVIC-licensed and UCDA-member dealership, committed to honest service and customer satisfaction. With access to top lenders, personalized financing options, and a large indoor showroom, we make it easy to buy your next vehicle with confidence.",
  },
];

/* Page Component */
const Finance = () => {
  const appConfig = useAppConfig();
  const { SITE_CONFIG } = getConstants(appConfig);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState<number>(FALLBACK_HEIGHT);

  // Listen for height updates from the embedded financing form
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const data = event.data;
      if (
        data &&
        typeof data === "object" &&
        data.type === "css" &&
        data.element_id === "financing_form" &&
        typeof data.value === "number"
      ) {
        setHeight(Math.max(MIN_HEIGHT, Math.ceil(data.value) + 24));
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="py-6 md:py-10 pb-16 mt-44 lg:mt-24">
        <div className="mx-auto max-w-[1100px] px-4 md:px-6">
          <h1 className="text-3xl font-bold text-center">Used Car Financing</h1>
          <div className="overflow-hidden">
            <iframe
              ref={iframeRef}
              id="financing_form"
              src={`${SITE_CONFIG.urls.financeRenderApiUrl}?`}
              name="iframe_a"
              title="GrCars financing application"
              scrolling="no"
              className="w-full block transition-[height] duration-300 ease-out border-0"
              style={{
                minHeight: MIN_HEIGHT,
                height: `${height}px`,
              }}
            />
          </div>
        </div>
        {/* Welcome Banner Section */}
        <div className="relative overflow-hidden text-white">
          {/* Background Image */}
          <div className=" inset-0 z-0 min-h-[70vh]">
            <Image
              src={finImg}
              alt="Gedi Route Dealership"
              fill
              priority
              className="object-cover h-full"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Content */}
          <div className="absolute top-9 w-full z-10 flex flex-col items-center px-6 py-20 text-center mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Welcome to Gedi Route
            </h2>

            <p className="text-sm md:text-base leading-relaxed text-white max-w-3xl">
              Gedi Route is an OMVIC licensed dealer and a proud member of the
              Used Car Dealers Association (UCDA) so you can buy your next
              vehicle with confidence. At Gedi Route we proudly sell used
              cars to customers from Brampton, Ontario including Toronto,
              Mississauga, Etobicoke, Milton, Caledon, Oakville, Bolton,
              Guelph, Kitchener, Burlington, Waterloo and surrounding areas.
            </p>
          </div>
        </div>
        <Reviews />

       <div className="mx-auto max-w-[1100px] px-4 md:px-6 py-20 flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold max-w-5xl  text-center mb-5 ">
          Frequently Asked Questions About Used Car Financing in Brampton
        </h1>
         <FaqAccordion faqs={faqs} />
       </div>
      </section>

      <Footer />
    </div>
  );
};

export default Finance;