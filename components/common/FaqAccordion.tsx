'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';

export interface FAQItem {
  q?: string;
  question?: string;
  a?: string;
  answer?: string;
}

export default function FaqAccordion({ faqs }: { faqs: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    // If the clicked FAQ is already open, do nothing
    if (openIndex === index) return;

    // Otherwise, open the clicked FAQ
    setOpenIndex(index);
  };

  return (
    <div>
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        const questionText = faq.q || faq.question;
        const answerText = faq.a || faq.answer;

        return (
          <div
            key={index}
            className="border-b border-slate-200 rounded-lg overflow-hidden transition-all duration-300 "
          >
            <button
              onClick={() => handleToggle(index)}
              className="w-full px-6 py-7 cursor-pointer flex items-center justify-between text-left"
            >
              <span className="flex-1 text-xl font-lg ">
                {questionText}
              </span>

              {/* Show + only when FAQ is closed */}
              {!isOpen && (
                <span className=" inline-flex items-center justify-center p-1 rounded-full bg-primary-greenLight text-white">
                  <Plus size={18}/>
                </span>
              )}
            </button>

            {/* Smooth Height Container */}
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-in-out  ${
                isOpen
                  ? 'grid-rows-[1fr]'
                  : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-6 pb-4 text-base leading-relaxed text-[#475569]">
                  {answerText}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}