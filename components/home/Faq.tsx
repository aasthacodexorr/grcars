"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import FaqAccordion from "../common/FaqAccordion";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs = [
  {
    question: "Why should I choose Gedi Route Cars to buy used cars in Toronto?",
    answer:
      "At Gedi Route Cars, we pride ourselves on offering high-quality pre-owned vehicles that are fully inspected and competitively priced while delivering exceptional customer service. Our transparent buying process, flexible financing options, and quick approvals make purchasing your next car simple and stress-free.",
  },
  {
    question: "What types of vehicles do you sell?",
    answer:
      "From sedans and spacious family SUVs to powerful pickup trucks, We offer an extensive selection of quality pre-owned vehicles to suit every lifestyle. Our inventory features leading brands such as Toyota, Lexus, Honda, BMW, Ford, Jeep, Hyundai, Chevrolet, and Mercedes-Benz, among others.",
  },
  {
    question: "Are your vehicles inspected and certified?",
    answer:
      "Yes. Every vehicle at Gedi Route Cars goes through a comprehensive 210-point inspection performed by certified technicians. This ensures that each vehicle meets our strict standards for safety and performance before reaching our lot.",
  },
  {
    question: "What is the down payment required?",
    answer:
      "The required down payment depends on the vehicle price, your credit profile, and financing terms. Our finance team works with multiple lenders to help you find the most affordable option possible. However, you can confirm the exact price for the specific model you choose during financing.",
  },
  {
    question: "How long does the approval process take?",
    answer:
      "Our financing approval process is designed to be quick and hassle-free. Most customers receive approval within minutes, and many are able to drive away the same day once documentation is complete.",
  },
  {
    question: "Can I purchase a vehicle online or remotely?",
    answer:
      "Yes. You can browse our entire inventory, get pre-qualified for financing, and start your purchase online. Our team can also assist you virtually throughout the buying process to make your experience smooth and convenient.",
  },
  {
    question: "Do you ship or deliver vehicles outside the local area?",
    answer:
      "Delivery within the Brampton may be available upon request. For customers located outside, please contact our sales team directly to discuss possible delivery arrangements.",
  },
  {
    question: "How do I book a test drive?",
    answer:
      "You can book a test drive by contacting our team through our website’s contact form or by calling our dealership directly. Simply share the vehicle you are interested in and your preferred time, and we will confirm your appointment promptly.",
  },
  {
    question: "Can I get a loan with bad credit?",
    answer:
      "Absolutely. We specialize in helping customers with all credit types, no matter their situation. Whether you have good credit or bad, we have access to multiple lenders. Our finance experts will work to secure the best possible rates and terms for your situation.",
  },
  {
    question: "Can I bring my own mechanic to inspect the car before purchase?",
    answer:
      "Customers are welcome to request an independent inspection prior to purchase. Please coordinate with our team in advance so we can schedule a convenient time for your mechanic to view the vehicle.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Left Column: Heading & Subtitle */}
        <div className="lg:col-span-5 space-y-4= lg:sticky lg:top-24">
          <h2 className="text-3xl sm:text-2xl lg:text-[40px] font-semibold text-[#0e1726] tracking-tight leading-[1.15]">
            Frequently Asked Questions
          </h2>
          <p className="text-base mt-2 sm:text-base text-gray-900 max-w-xl leading-relaxed">
            Have questions about selling or trading your car? We’ve got you covered.
          </p>
        </div>

        {/* Right Column: Accordion List */}
        <div className="lg:col-span-7 divide-y divide-gray-200 border-b border-gray-200">
          <FaqAccordion faqs={faqs} />
        </div>
      </div>
    </section>
  );
};

export default FaqSection;