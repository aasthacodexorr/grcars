"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import FaqAccordion from "../common/FaqAccordion";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    question: "Why should I choose Gedi Route Cars to buy used cars in Toronto?",
    answer:
      "At Gedi Route Cars, we pride ourselves on offering high-quality pre-owned vehicles that are fully inspected and competitively priced while delivering exceptional customer service. Our transparent buying process, flexible financing options, and quick approvals make purchasing your next car simple and stress-free.",
  },
  {
    question: "What types of vehicles do you sell?",
    answer:
      "We offer a wide range of pre-owned vehicles including sedans, SUVs, trucks, and luxury vehicles from top reliable manufacturers.",
  },
  {
    question: "Are your vehicles inspected and certified?",
    answer:
      "Yes, every vehicle in our inventory undergoes a rigorous safety and mechanical inspection to ensure high performance and safety standards.",
  },
  {
    question: "What is the down payment required?",
    answer:
      "Down payment requirements vary based on financing approval and credit profile. We offer zero-down payment options for qualified buyers.",
  },
  {
    question: "How long does the approval process take?",
    answer:
      "Our financing pre-qualification process is quick and often provides instant terms with no impact on your credit score.",
  },
  {
    question: "Can I purchase a vehicle online or remotely?",
    answer:
      "Yes, you can browse, get pre-qualified, complete financing paperwork, and organize vehicle delivery 100% online.",
  },
  {
    question: "Do you ship or deliver vehicles outside the local area?",
    answer:
      "We offer delivery services across Ontario and can arrange shipping options depending on your location.",
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
          <p className="text-sm mt-2 sm:text-base text-gray-900 max-w-xl leading-relaxed">
            Have questions about selling or trading your car? We’ve got you covered.
          </p>
        </div>

        {/* Right Column: Accordion List */}
        <div className="lg:col-span-7 divide-y divide-gray-200 border-b border-gray-200">
          <FaqAccordion faqs={FAQ_DATA} />
        </div>
      </div>
    </section>
  );
};

export default FaqSection;