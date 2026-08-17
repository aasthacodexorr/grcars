"use client";

import { useState } from "react";
import { ChevronDown, Check, X, CarFront, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import { Car, Banknote, Calendar, CreditCard } from 'lucide-react';
// Layout
import { Header, Footer } from "@/components/layout";

// Assets
import sell from "@/assets/cars/sell-image1.jpg";
import happyfam from "@/assets/pages/HappyFamily.webp";
import { useAppConfig } from "../providers";
import { getConstants } from "@/constants";
import Link from "next/link";



/* Data Structures */
const steps = [
  {
    icon: Car,
    title: 'Describe Your Vehicle',
    description: "Share essential details about your car, and we'll present you with an immediate, firm offer.",
  },
  {
    icon: Banknote,
    title: 'Submit Your Documents',
    description: 'Provide proof of ownership and any other necessary documents.',
    isActive: true,
  },
  {
    icon: Calendar,
    title: 'Schedule a Drop-Off',
    description: 'Bring your car to our facility at a time that suits you.',
  },
   
];

const comparisonData = [
  {
    title: "Other Dealerships",
    highlight: false,
    items: [
      { text: "Payments may take up to 20 days.", negative: true },
      { text: "Expect haggling.", negative: true },
      { text: "Lengthy inspection processes.", negative: true },
      { text: "Requires extensive preparation.", negative: true },
      { text: "Potential delays.", negative: true },
    ],
  },
  {
    title: "Gedi Route Cars",
    highlight: true,
    items: [
      { text: "Immediate payment.", negative: false },
      { text: "No haggling—our offers are firm.", negative: false },
      { text: "We can purchase your car today.", negative: false },
      { text: "No need to clean your car.", negative: false },
    ],
  },
  {
    title: "Private Buyers",
    highlight: false,
    items: [
      { text: "Uncertain payment methods.", negative: true },
      { text: "Negotiations are common.", negative: true },
      { text: "Risk of low-blows.", negative: true },
      { text: "Must do vehicle preparation.", negative: true },
      { text: "Possible waiting periods.", negative: true },
    ],
  },
];

const faqs = [
  {
    q: "How is my vehicle’s trade-in price determined?",
    a: "The estimated trade-in value for your vehicle is based on several key factors, including the vehicle’s make, model, year, mileage, overall condition, and current market demand. Our team conducts a transparent appraisal of the trade in cars, using current market trends to ensure you receive a fair deal.",
  },
  {
    q: "What documentation do I need to bring when I trade in my car?",
    a: "You’ll typically need your vehicle registration, proof of ownership, valid identification, and any available service or maintenance records. If the vehicle is financed, you may also need your loan or lien information.",
  },
  {
    q: "What happens to the trade-in vehicle once I hand it over?",
    a: "Once you hand over your vehicle, we complete the necessary paperwork and ownership transfer process. Depending on its condition and market demand, the vehicle may be prepared for resale, reconditioned, or handled through our wholesale network.",
  },
  {
    q: "Do you charge any appraisal fee, or is the trade-in valuation free?",
    a: "Our trade-in appraisal and valuation are free. There is no obligation to accept the offer, so you can review the estimated value before deciding whether to proceed with the trade-in.",
  },
  {
    q: "Will my trade-in appraisal affect my credit score?",
    a: "No. A standard vehicle trade-in appraisal does not affect your credit score because it does not require a credit check. A credit inquiry may only be required separately if you apply for vehicle financing.",
  },
  {
    q: "Can I bring multiple vehicles for appraisal or trade-in?",
    a: "Yes, you can bring multiple vehicles for appraisal or trade-in. Each vehicle will be evaluated individually based on its condition, mileage, specifications, and current market value.",
  },
  {
    q: "Are trade-ins worth it for cars?",
    a: "Trade-ins can be a convenient way to sell your current vehicle while purchasing another one. They can save you the time and effort involved in finding a private buyer and handling the selling process yourself.",
  },
  {
    q: "Is it better to trade in or sell privately?",
    a: "Both options have advantages. Selling privately may result in a higher selling price, but it can take more time and effort. Trading in your vehicle is generally more convenient and allows you to handle the sale and purchase of another vehicle in one transaction.",
  },
  {
    q: "Can I trade my car for another car?",
    a: "Yes. You can trade in your current vehicle toward the purchase of another vehicle. The approved trade-in value can be applied toward your next vehicle, helping reduce the amount you need to pay or finance.",
  },
  {
    q: "What is my trade-in worth?",
    a: "Your trade-in value depends on factors such as the vehicle’s make, model, year, mileage, condition, features, accident history, and current market demand. The best way to determine its value is through a professional appraisal based on current market conditions.",
  },
  {
    q: "Is trading in my used car a good way to get a fair resell value of my car?",
    a: "Trading in your used car can be a convenient way to receive a competitive market-based value without dealing with private-sale listings, negotiations, and buyer appointments. Our appraisal considers your vehicle’s condition and current market demand to determine a fair trade-in offer.",
  },
];

const TradeIn = () => {
  const appConfig = useAppConfig();
  const { SITE_CONFIG } = getConstants(appConfig);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleFaq = (idx:any) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };


  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      <Header />

      {/* 1. Hero Section */}
      <section className="relative bg-black text-white min-h-[500px] flex items-center lg:mt-10 px-6 lg:px-20 py-16 overflow-hidden mt-24">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src={sell}
            alt="Hero vehicle background"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight uppercase leading-tight text-white mb-4">
              Sell Your Car The <br /> Smart Way
            </h1>
            <p className="text-sm md:text-base text-white font-bold max-w-2xl leading-relaxed">
              Want to know what your trade-in is worth? Our trade-in value estimator helps you get the best deal in Ontario. We make it easy to drive off in your next vehicle.
            </p>
          </div>

          <div className="justify-self-center lg:justify-start w-full max-w-[320px]">
            <div className="bg-white text-slate-900 rounded-lg p-8 shadow-2xl min-h-80 text-center border border-gray-100">
              <div className="flex justify-center mb-4">
                <div className="flex items-center">
                  {["C", "A", "R", "F", "A", "X"].map((letter, index) => (
                    <span
                      key={index}
                      className="bg-black text-white font-extrabold text-[15px] leading-none w-[20px] h-[20px] flex items-center justify-center mr-[2px]"
                    >
                      {letter}
                    </span>
                  ))}

                  <span className="text-red-900 text-[20px] font-bold ml-[2px] leading-none">
                    🍁
                  </span>
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-6 text-slate-800 leading-snug">
                Find out what your trade-in is worth.
              </h3>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-[#1877F2] hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-full text-base transition-colors shadow"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CARFAX / Trade-in Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl overflow-hidden z-10 min-h-[500px] flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 z-20 text-gray-500 hover:text-gray-800 p-1 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Iframe or Embedded Form Container */}
              <div className="w-full h-full flex-1">
                <iframe
                  src={SITE_CONFIG?.urls?.tradeFormByVin}
                  title="Trade-in Estimator Widget"
                  className="w-full h-full min-h-[500px] border-none"
                  allow="geolocation"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Sub-Hero Announcement Bar */}
      <section className="bg-black text-white text-center py-12 px-4 lg:px-72">
        <p className="text-base md:text-4xl tracking-wide">
          Firm trade-in offer in minutes and cash in your pocket—no haggling, no waiting.
        </p>
      </section>

      {/* 3. How to Trade In Section */}
      <section className="max-w-7xl mx-auto px-3 py-28 bg-white font-sans">
      {/* Title */}
      <div className="mb-10 text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
          How to Trade In a Car?
        </h2>
        <p className="text-base my-1 text-gray-500">Trade in or sell your vehicle to GrCars in just a few easy steps.</p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {steps.map((step, idx) => {
          const IconComponent = step.icon;
          return (
            <Link 
              href={"/inventory"}
              key={idx}
              className="flex items-start gap-4 group cursor-pointer"
            >
              {/* Left Icon Container */}
              <div className="shrink-0 text-blue-600 transition-transform duration-200 group-hover:scale-105">
                <IconComponent className="w-9 h-9 stroke-[1.5]" />
              </div>

              {/* Text Content */}
              <div>
                <h3 className="text-base md:text-xl font-bold text-slate-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-xs md:text-base text-gray-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>

      {/* 4. Why Choose Us / Comparison Section */}
      <section className="bg-[#F0F4FA] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center text-slate-900 mb-12">
            Why Choose Gedi Route Cars for Used Car Trade-In?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {comparisonData.map((col, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-xl p-8 shadow-sm flex flex-col`}
              >
                <Link href={"/inventory"} className="text-center hover:text-brand-green cursor-pointer text-lg lg:text-2xl text-slate-900 mb-8 border-b border-gray-100 pb-4">
                  {col.title}
                </Link>
                <ul className="space-y-4 text-xs md:text-sm text-gray-600 flex-1">
                  {col.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-3">
                      {item.negative ? (
                        <span className="bg-red-800 text-white rounded-full p-1 mt-0.5 flex-shrink-0">
                          <X className="w-3.5 h-3.5 stroke-[3] " />
                        </span>
                      ) : (
                        <span className="bg-green-500 text-white rounded-full p-1 mt-0.5 flex-shrink-0">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                      )}
                      <span className="text-black text-lg">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Benefits with Image Section */}
      {/* <section className="max-w-6xl mx-auto px-6 lg:px-0 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-0 items-center">
          <div className="px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
              Trade-In Your Car and Save
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl text-slate-900 mb-1">
                  Save Money
                </h3>
                <p className="text-base text-black leading-relaxed">
                  Apply your current vehicle's trade-in value toward your next purchase, reducing the applicable sales tax.
                </p>
              </div>
              <div>
                <h3 className="text-2xl text-slate-900 mb-1">
                  Save Time
                </h3>
                <p className="text-base text-black leading-relaxed">
                  We'll deliver your new car while collecting your old one—all in a single appointment.
                </p>
              </div>
              <div>
                <h3 className="text-2xl text-slate-900 mb-1">
                  Save Stress
                </h3>
                <p className="text-base text-black leading-relaxed">
                  Explore our extensive selection of high-quality cars.
                </p>
              </div>
            </div>
          </div>

          <div className="relative h-[320px] md:h-[380px] w-full rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={saveImg}
              alt="Trade in car save time"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section> */}

      {/* 6. FAQ Accordion Section */}
      <section className="bg-white py-16 px-6 md:py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left Column: Heading, Subtitle & CTA */}
        <div className="lg:col-span-5 flex flex-col items-start justify-start py-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] tracking-tight mb-4">
            Frequently asked questions
          </h2>
          <p className="text-slate-600 text-base md:text-lg mb-8 max-w-md leading-relaxed">
            Have questions about selling or trading your car? We’ve got you covered.
          </p>
         
        </div>

        {/* Right Column: Accordion List */}
        <div className="lg:col-span-7">
          <div className="">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;

              return (
                <div key={idx} className="border-b border-slate-200">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full cursor-pointer flex items-center justify-between py-6 text-left group transition-colors duration-200"
                  >
                    <span className="text-base md:text-lg font-bold text-[#0F172A] pr-4">
                      {faq.q}
                    </span>
                    <div className="flex-shrink-0 text-slate-900">
                      {isOpen ? (
                        <Minus className="w-5 h-5 stroke-[2]" />
                      ) : (
                        <Plus className="w-5 h-5 stroke-[2]" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 text-sm md:text-base text-slate-600 leading-relaxed pr-6">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>


    <section className="max-w-[1300px] mx-auto py-12">
      <div className="bg-[#0b3b60] rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Content Side */}
        <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-center items-start text-white">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
            Trade in and save on your purchase
          </h2>
          
          <p className="text-sm sm:text-base text-gray-200 mb-8 max-w-md font-light leading-relaxed">
            Save more when you trade in the car you have for the car you want. It's easy and all online.
          </p>

          <Link
            href="/get-started"
            className="inline-block px-7 py-3 rounded-full border border-white text-white font-medium hover:bg-white hover:text-[#0b3b60] transition-colors duration-200 text-sm"
          >
            Get Started
          </Link>
        </div>

        {/* Right Image Side */}
        <div className="relative min-h-[300px] md:min-h-full">
          <img
            src={happyfam?.src}
            alt="Family gathered at dining table with laptop"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </section>

      <Footer />
    </div>
  );
};

export default TradeIn;