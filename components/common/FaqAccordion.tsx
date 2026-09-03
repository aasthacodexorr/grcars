'use client';

import { Plus } from 'lucide-react';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface FAQItem {
  q?: string;
  question?: string;
  a?: string;
  answer?: string;
}

export default function FaqAccordion({ faqs = [] }: { faqs?: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleToggle = (index: number) => {
    const isOpening = openIndex !== index;
    setOpenIndex(isOpening ? index : null);

    if (isOpening) {
      // Delay scroll until after accordion finish opening & height calculation completes
      setTimeout(() => {
        const targetButton = buttonRefs.current[index];
        if (targetButton) {
          targetButton.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }, 150);
    }
  };

  return (
    <div className="space-y-2">
      {faqs?.map((faq, index) => {
        const isOpen = openIndex === index;
        const questionText = faq.q || faq.question;
        const answerText = faq.a || faq.answer;

        return (
          <motion.div
            key={index}
            layout
            className="border-b px-4 border-slate-200 rounded-lg overflow-hidden bg-white"
          >
            <button
              ref={(el) => {
                buttonRefs.current[index] = el;
              }}
              onClick={() => handleToggle(index)}
              /* Added scroll-mt-[200px] (or adjust to match header height) to prevent hiding under header */
              className="w-full lg:px-6 py-7 cursor-pointer flex items-center justify-between text-left scroll-mt-[200px]"
            >
              <span className="flex-1 text-xl font-lg">{questionText}</span>

              {/* Icon completely hidden when open */}
              <AnimatePresence>
                {!isOpen && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                    className="inline-flex items-center justify-center p-1 rounded-full bg-primary-greenLight text-white"
                  >
                    <Plus size={18} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Smooth height animation container */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                  className="overflow-hidden"
                >
                  <div className="lg:px-6 pb-6 text-lg leading-relaxed text-[#475569]">
                    {answerText}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}