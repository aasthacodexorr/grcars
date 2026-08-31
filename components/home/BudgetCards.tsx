"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import budgetAffordImg from "@/assets/cars/budget-affordable-cars.png";
import budgetGreatImg from "@/assets/cars/budget-affordable-cars.png";
import fordMustangImg from "@/assets/cars/ford-mustang-mache.png";
import nisanLeafImg from "@/assets/cars/nissan-leaf.png";
import toyotaImg from "@/assets/cars/toyota-rav4.png";
import carImg from "@/assets/cars/mitsubishi-outlander.png";

const DIGIT_HEIGHT = 52;
const TARGET_DIGITS = [2, 0, 0, 0, 0]; // Represents $20,000

export default function BudgetCards() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Declarative Slot Machine Reel State
  const [reels, setReels] = useState(() =>
    TARGET_DIGITS.map(() => ({
      items: Array.from({ length: 40 }, (_, i) => i % 10),
      offset: 0,
      transition: "none",
    }))
  );

  // Slot-Machine Animation Loop using React State
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let isCancelled = false;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const spinReels = () => {
      if (isCancelled) return;

      TARGET_DIGITS.forEach((finalDigit, i) => {
        const startDigit = Math.floor(Math.random() * 10);
        const stripItems = Array.from({ length: 40 }, (_, idx) => (startDigit + idx) % 10);
        const cycles = 2 + Math.floor(Math.random() * 2);
        const steps = cycles * 10 + ((finalDigit - startDigit + 10) % 10);
        const targetOffset = steps * DIGIT_HEIGHT;
        const duration = 1500 + i * 320;
        const delay = i * 80;

        // Reset position instantly before starting the animation frame
        setTimeout(() => {
          if (isCancelled) return;
          setReels((prev) => {
            const next = [...prev];
            next[i] = { items: stripItems, offset: 0, transition: "none" };
            return next;
          });

          // Animate using requestAnimationFrame
          setTimeout(() => {
            if (isCancelled) return;
            const startTime = performance.now();

            const animateFrame = (now: number) => {
              if (isCancelled) return;
              const elapsed = now - startTime;
              const progress = Math.min(1, elapsed / duration);
              const currentOffset = targetOffset * easeOutCubic(progress);

              setReels((prev) => {
                const next = [...prev];
                next[i] = {
                  ...next[i],
                  offset: currentOffset,
                  transition: "none",
                };
                return next;
              });

              if (progress < 1) {
                requestAnimationFrame(animateFrame);
              }
            };

            requestAnimationFrame(animateFrame);
          }, 20);
        }, delay);
      });

      // Repeat loop after all reels settle + delay
      timeoutId = setTimeout(spinReels, 4500);
    };

    spinReels();

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, []);

  // Active Dot Scroll Listener
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleScroll = () => {
      const cards = Array.from(slider.querySelectorAll<HTMLElement>(".card-item"));
      const mid = slider.scrollLeft + slider.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;

      cards.forEach((card, i) => {
        const center = card.offsetLeft + card.offsetWidth / 2;
        const d = Math.abs(center - mid);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setActiveIndex(best);
    };

    slider.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      slider.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const scrollToCard = (index: number) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const cards = slider.querySelectorAll<HTMLElement>(".card-item");
    if (cards[index]) {
      cards[index].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  };

  return (
    <div className="w-full flex flex-col items-center py-5 font-sans overflow-x-hidden">
      {/* 1. FIXED HEADING SECTION (Stationary on scroll) */}
      <div className="w-full max-w-[1280px] px-8 md:px-0 mx-auto">
        <h2 className="text-[20px] mb-4 md:text-[28px] font-bold text-[#0F2942]">
          Explore cars you’ll love
        </h2>
      </div>

      {/* 2. HORIZONTALLY SCROLLABLE CARDS CONTAINER */}
      <div
        ref={sliderRef}
        className="w-full max-w-[100vw] overflow-x-auto px-8 md:px-0 overflow-y-hidden snap-x snap-mandatory pt-3 pb-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex flex-row gap-5 items-stretch justify-start max-w-[1280px] mx-auto min-w-[min(100%,max-content)]">
          {/* Card 1: Cars under $20K */}
          <article className="card-item snap-center w-[300px] flex-none h-[350px] rounded-[18px] p-4.5 flex flex-col bg-[#a8d4fc]">
            <h2 className="text-[#003366] text-[22px] font-extrabold leading-[1.2] tracking-[-0.02em]">
              Cars under $20K
            </h2>
            <p className="mt-1.5 text-[#4a6278] text-[13px] font-normal leading-[1.4] max-w-[28ch]">
              Great rides with quality you can count on — at a price you’ll love.
            </p>

            <div className="relative h-[140px] my-2 overflow-visible" aria-hidden="true">
              {/* Declarative JSX Reel Counter */}
              <div className="absolute left-1/2 top-[2px] -translate-x-1/2 z-[1] flex items-start text-[#0062bd] text-[52px] font-extrabold tracking-[-0.045em] leading-none tabular-nums select-none pointer-events-none">
                <span className="block h-[52px] leading-[52px]">$</span>

                {/* Digit 1 */}
                <div className="relative w-[0.62em] h-[52px] overflow-hidden">
                  <div
                    className="flex flex-col will-change-transform"
                    style={{ transform: `translateY(-${reels[0].offset}px)` }}
                  >
                    {reels[0].items.map((num, idx) => (
                      <span key={idx} className="block h-[52px] leading-[52px] text-center">
                        {num}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Digit 2 */}
                <div className="relative w-[0.62em] h-[52px] overflow-hidden">
                  <div
                    className="flex flex-col will-change-transform"
                    style={{ transform: `translateY(-${reels[1].offset}px)` }}
                  >
                    {reels[1].items.map((num, idx) => (
                      <span key={idx} className="block h-[52px] leading-[52px] text-center">
                        {num}
                      </span>
                    ))}
                  </div>
                </div>

                <span className="block h-[52px] leading-[52px]">,</span>

                {/* Digit 3 */}
                <div className="relative w-[0.62em] h-[52px] overflow-hidden">
                  <div
                    className="flex flex-col will-change-transform"
                    style={{ transform: `translateY(-${reels[2].offset}px)` }}
                  >
                    {reels[2].items.map((num, idx) => (
                      <span key={idx} className="block h-[52px] leading-[52px] text-center">
                        {num}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Digit 4 */}
                <div className="relative w-[0.62em] h-[52px] overflow-hidden">
                  <div
                    className="flex flex-col will-change-transform"
                    style={{ transform: `translateY(-${reels[3].offset}px)` }}
                  >
                    {reels[3].items.map((num, idx) => (
                      <span key={idx} className="block h-[52px] leading-[52px] text-center">
                        {num}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Digit 5 */}
                <div className="relative w-[0.62em] h-[52px] overflow-hidden">
                  <div
                    className="flex flex-col will-change-transform"
                    style={{ transform: `translateY(-${reels[4].offset}px)` }}
                  >
                    {reels[4].items.map((num, idx) => (
                      <span key={idx} className="block h-[52px] leading-[52px] text-center">
                        {num}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <Image
                src={budgetAffordImg?.src}
                alt="Affordable car"
                width={255}
                height={120}
                className="absolute left-1/2 -bottom-[18px] -translate-x-1/2 z-[2] w-[255px] max-w-full h-auto block drop-shadow-[0_12px_8px_rgba(0,50,100,0.28)]"
              />
            </div>

            <a
              href="/inventory"
              className="mt-auto block w-full rounded-full bg-[#0062bd] hover:bg-[#0052a0] text-white text-[14px] font-bold leading-none py-3 px-3.5 text-center no-underline transition-colors"
            >
              Explore Budget Options
            </a>
          </article>

          {/* Card 2: Discover Great Deals */}
          <article className="card-item snap-center w-[300px] flex-none h-[350px] rounded-[18px] p-4.5 flex flex-col bg-[#c5d4e0]">
            <h2 className="text-[#003366] text-[21px] font-extrabold leading-[1.2] tracking-[-0.02em] text-left">
              Discover Great Deals!
            </h2>
            <p className="mt-1.5 text-[#5a6b7c] text-[12.5px] font-normal leading-[1.4] text-left">
              Cars priced $1,500 or more below the<br />
              Black Book® Typical Listing Price.
            </p>

            <div className="relative h-[140px] my-2 overflow-visible" aria-hidden="true">
              <Image
                src={budgetGreatImg?.src}
                alt="Great deal car"
                width={268}
                height={120}
                className="absolute left-[44%] -bottom-[4px] -translate-x-1/2 z-[1] w-[268px] max-w-full h-auto block drop-shadow-[0_12px_8px_rgba(0,30,60,0.35)]"
              />

              {/* Tag Swing Animation */}
              <div
                className="absolute right-[58px] top-[15px] z-[3] w-[74px] h-[92px] origin-top pointer-events-none"
                style={{ animation: "leafWind 3.1s ease-in-out infinite" }}
              >
                <svg viewBox="0 0 56 70" xmlns="http://www.w3.org/2000/svg" className="w-full h-full block overflow-visible drop-shadow-[1px_4px_5px_rgba(0,40,90,0.28)]">
                  <ellipse cx="28" cy="11" rx="5.5" ry="10" fill="none" stroke="#1a66b8" strokeWidth="1.6" />
                  <g transform="translate(6,18)">
                    <path fill="#0c5aa3" d="M36 6 L42 12 L42 52 L36 48 Z M4 48 L36 48 L42 52 L10 52 Z" />
                    <path fill="#2b86e0" d="M8 0 L32 0 L38 6 L38 48 Q38 52 34 52 L8 52 Q4 52 4 48 L4 6 Z" />
                    <circle cx="21" cy="8" r="3.4" fill="#c5d4e0" />
                    <circle cx="21" cy="8" r="2" fill="none" stroke="#1a66b8" strokeWidth="1.3" />
                    <path fill="#fff" d="M21 18c2 0 2.4 1.7 4 2.2 1.6.5 3.1-.7 4.1.5 1 1.2.2 2.8.9 4.1.7 1.3 2.5 1.8 2.5 3.7s-1.8 2.4-2.5 3.7c-.7 1.3.1 2.9-.9 4.1-1 1.2-2.5 0-4.1.5-1.6.5-2 2.2-4 2.2s-2.4-1.7-4-2.2c-1.6-.5-3.1.7-4.1-.5-1-1.2-.2-2.8-.9-4.1-.7-1.3-2.5-1.8-2.5-3.7s1.8-2.4 2.5-3.7c.7-1.3-.1-2.9.9-4.1 1-1.2 2.5 0 4.1-.5 1.6-.5 2-2.2 4-2.2z" />
                    <text x="21" y="35" textAnchor="middle" fontFamily="sans-serif" fontSize="14" fontWeight="800" fill="#0b3d7a">$</text>
                  </g>
                </svg>
              </div>
            </div>

            <a
              href="/inventory"
              className="mt-auto block w-full rounded-full bg-[#0062bd] hover:bg-[#0052a0] text-white text-[14px] font-bold leading-none py-3 px-3.5 text-center no-underline transition-colors"
            >
              Find Your Deal
            </a>
          </article>

          {/* Card 3: Need it fast? */}
          <article className="card-item snap-center w-[300px] flex-none h-[350px] rounded-[18px] p-4.5 flex flex-col bg-[#0b2e53] overflow-hidden">
            <h2 className="relative z-[2] text-white text-[22px] font-extrabold leading-[1.2] tracking-[-0.02em]">
              Need it fast?
            </h2>
            <p className="relative z-[2] mt-1.5 text-white text-[13px] font-normal leading-[1.4]">
              Based on your location, we’ve got availability as soon as today!
            </p>

            <div className="relative h-[158px] mt-3 -mx-2 overflow-visible [perspective:600px]" aria-hidden="true">
              <div className="relative w-full h-full pt-3.5 bg-transparent">
                <div
                  className="relative z-[1] w-[108%] -ml-[2%] h-[calc(100%-4px)] grid grid-cols-5 gap-[7px] origin-[center_60%]"
                  style={{ transform: "rotate(-7deg) scale(1.08)" }}
                >
                  {/* Column 1 */}
                  <div className="relative flex flex-col gap-[10px] z-[5]">
                    <div className="text-center text-[13px] font-semibold text-[#d7e6f5]">Tu</div>
                    <div className="cal-cell relative aspect-square rounded-lg border border-[rgba(160,195,225,0.28)] bg-[rgba(12,40,70,0.55)] text-[rgba(210,228,245,0.75)] text-[13px] font-semibold grid place-items-center z-[1] after:content-[''] after:absolute after:left-[10%] after:right-[10%] after:-bottom-[10px] after:h-[14px] after:rounded-full after:bg-[rgba(0,0,0,0.55)] after:blur-[6px] after:-z-[1]">1</div>
                    <div className="cal-cell relative aspect-square rounded-lg border border-[rgba(160,195,225,0.28)] bg-[rgba(12,40,70,0.55)] text-[rgba(210,228,245,0.75)] text-[13px] font-semibold grid place-items-center z-[1] after:content-[''] after:absolute after:left-[10%] after:right-[10%] after:-bottom-[10px] after:h-[14px] after:rounded-full after:bg-[rgba(0,0,0,0.55)] after:blur-[6px] after:-z-[1]">8</div>
                  </div>
                  {/* Column 2 */}
                  <div className="relative flex flex-col gap-[10px] z-[4]">
                    <div className="text-center text-[13px] font-semibold text-[#d7e6f5]">W</div>
                    <div className="cal-cell relative aspect-square rounded-lg border border-[rgba(160,195,225,0.28)] bg-[rgba(12,40,70,0.55)] text-[rgba(210,228,245,0.75)] text-[13px] font-semibold grid place-items-center z-[1] after:content-[''] after:absolute after:left-[10%] after:right-[10%] after:-bottom-[10px] after:h-[14px] after:rounded-full after:bg-[rgba(0,0,0,0.55)] after:blur-[6px] after:-z-[1]">2</div>
                    <div className="cal-cell relative aspect-square rounded-lg border border-[rgba(160,195,225,0.28)] bg-[rgba(12,40,70,0.55)] text-[rgba(210,228,245,0.75)] text-[13px] font-semibold grid place-items-center z-[1] after:content-[''] after:absolute after:left-[10%] after:right-[10%] after:-bottom-[10px] after:h-[14px] after:rounded-full after:bg-[rgba(0,0,0,0.55)] after:blur-[6px] after:-z-[1]">9</div>
                  </div>
                  {/* Column 3 */}
                  <div className="relative flex flex-col gap-[10px] z-[3]">
                    <div className="text-center text-[13px] font-semibold text-[#d7e6f5]">Th</div>
                    <div className="cal-cell relative aspect-square rounded-lg border border-[rgba(160,195,225,0.28)] bg-[rgba(12,40,70,0.55)] text-[rgba(210,228,245,0.75)] text-[13px] font-semibold grid place-items-center z-[1] after:content-[''] after:absolute after:left-[10%] after:right-[10%] after:-bottom-[10px] after:h-[14px] after:rounded-full after:bg-[rgba(0,0,0,0.55)] after:blur-[6px] after:-z-[1]">3</div>
                    <div className="cal-cell relative aspect-square rounded-lg border border-[rgba(160,195,225,0.28)] bg-[rgba(12,40,70,0.55)] text-[rgba(210,228,245,0.75)] text-[13px] font-semibold grid place-items-center z-[1] after:content-[''] after:absolute after:left-[10%] after:right-[10%] after:-bottom-[10px] after:h-[14px] after:rounded-full after:bg-[rgba(0,0,0,0.55)] after:blur-[6px] after:-z-[1]">10</div>
                  </div>
                  {/* Column 4 (Truck Target) */}
                  <div className="relative flex flex-col gap-[10px] z-[2]">
                    <div className="text-center text-[13px] font-semibold text-[#d7e6f5]">F</div>
                    <div className="relative aspect-square rounded-lg bg-[#0071ce] border border-[#0071ce] text-transparent text-[13px] font-semibold grid place-items-center shadow-[0_8px_16px_rgba(0,80,160,0.45)] overflow-visible after:content-[''] after:absolute after:left-[10%] after:right-[10%] after:-bottom-[10px] after:h-[14px] after:rounded-full after:bg-[rgba(0,40,90,0.65)] after:blur-[7px] after:-z-[1]">
                      <div
                        className="absolute inset-0 grid place-items-center will-change-transform"
                        style={{ animation: "truckPass 3.2s ease-in-out infinite" }}
                      >
                        <svg viewBox="0 0 40 22" xmlns="http://www.w3.org/2000/svg" fill="none" className="w-[78%] h-auto block overflow-visible">
                          <g stroke="#fff" strokeWidth="1.7" strokeLinecap="round">
                            <path d="M2 7h6M1 11h8M2 15h6" />
                          </g>
                          <g fill="#fff">
                            <path d="M12 5.5h12.5v9.5H12V5.5z" />
                            <path d="M24.5 8h5.2l3.3 3.2v3.8h-8.5V8z" />
                            <circle cx="16.2" cy="17.2" r="2.1" />
                            <circle cx="29.5" cy="17.2" r="2.1" />
                          </g>
                          <g fill="#0071ce">
                            <rect x="26.2" y="9.2" width="4.2" height="2.6" rx="0.4" />
                            <circle cx="16.2" cy="17.2" r="0.85" />
                            <circle cx="29.5" cy="17.2" r="0.85" />
                          </g>
                        </svg>
                      </div>
                    </div>
                    <div className="cal-cell relative aspect-square rounded-lg border border-[rgba(160,195,225,0.28)] bg-[rgba(12,40,70,0.55)] text-[rgba(210,228,245,0.75)] text-[13px] font-semibold grid place-items-center z-[1] after:content-[''] after:absolute after:left-[10%] after:right-[10%] after:-bottom-[10px] after:h-[14px] after:rounded-full after:bg-[rgba(0,0,0,0.55)] after:blur-[6px] after:-z-[1]">11</div>
                  </div>
                  {/* Column 5 */}
                  <div className="relative flex flex-col gap-[10px] z-[1]">
                    <div className="text-center text-[13px] font-semibold text-[#d7e6f5]">Sa</div>
                    <div className="cal-cell relative aspect-square rounded-lg border border-[rgba(160,195,225,0.28)] bg-[rgba(12,40,70,0.55)] text-[rgba(210,228,245,0.75)] text-[13px] font-semibold grid place-items-center z-[1] after:content-[''] after:absolute after:left-[10%] after:right-[10%] after:-bottom-[10px] after:h-[14px] after:rounded-full after:bg-[rgba(0,0,0,0.55)] after:blur-[6px] after:-z-[1]">5</div>
                    <div className="cal-cell relative aspect-square rounded-lg border border-[rgba(160,195,225,0.28)] bg-[rgba(12,40,70,0.55)] text-[rgba(210,228,245,0.75)] text-[13px] font-semibold grid place-items-center z-[1] after:content-[''] after:absolute after:left-[10%] after:right-[10%] after:-bottom-[10px] after:h-[14px] after:rounded-full after:bg-[rgba(0,0,0,0.55)] after:blur-[6px] after:-z-[1]">12</div>
                  </div>
                </div>
              </div>
            </div>

            <a
              href="/inventory"
              className="mt-auto block w-full rounded-full bg-white hover:bg-[#f0f6fc] text-[#0071ce] hover:text-[#005fae] text-[14px] font-bold leading-none py-3 px-3.5 text-center no-underline transition-colors"
            >
              Shop by Delivery Date
            </a>
          </article>

          {/* Card 4: Go the distance */}
          <article className="card-item snap-center w-[300px] flex-none h-[350px] rounded-[18px] p-4.5 flex flex-col bg-[#121212] overflow-hidden">
            <h2 className="text-white text-[22px] font-extrabold leading-[1.2] tracking-[-0.02em]">
              Go the distance
            </h2>
            <p className="mt-1.5 text-[rgba(255,255,255,0.92)] text-[13px] font-normal leading-[1.4]">
              We offer a wide variety of vehicles with a fuel economy of 5.5 L/100 km or better
            </p>

            <div className="relative h-[180px] mt-1 mb-1.5 overflow-visible" aria-hidden="true">
              <div className="relative w-full h-full flex items-end justify-center">
                <div className="relative w-[221px] h-[140px] mb-[18px]">
                  {/* Nissan Layer */}
                  <div
                    className="absolute top-[52px] left-0 rounded-md shadow-[0_6px_14px_rgba(0,0,0,0.3)] origin-center w-[107px] z-[1] pointer-events-none"
                    style={{ animation: "fuelNissan 9s linear infinite" }}
                  >
                    <Image src={nisanLeafImg?.src} alt="" width={107} height={60} className="w-full h-auto rounded-md block" />
                  </div>

                  {/* Mitsubishi Layer */}
                  <div
                    className="absolute top-[52px] left-0 rounded-md shadow-[0_6px_14px_rgba(0,0,0,0.3)] origin-center w-[135px] z-[2] pointer-events-none"
                    style={{ animation: "fuelMitsubishi 9s linear infinite" }}
                  >
                    <Image src={carImg?.src} alt="" width={135} height={70} className="w-full h-auto rounded-md block" />
                  </div>

                  {/* Ford Layer */}
                  <div
                    className="absolute top-[52px] left-0 rounded-md shadow-[0_6px_14px_rgba(0,0,0,0.3)] origin-center w-[158px] z-[3] pointer-events-none"
                    style={{ animation: "fuelFord 9s linear infinite" }}
                  >
                    <Image src={fordMustangImg?.src} alt="" width={158} height={80} className="w-full h-auto rounded-md block" />
                  </div>

                  {/* Front Card */}
                  <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[221px] h-[73px] z-[5] rounded-md bg-white shadow-[0_8px_16px_rgba(0,0,0,0.35)] flex items-center overflow-visible pl-[10px]">
                    <div className="relative z-[3] flex-none max-w-[48%]">
                      <div className="text-[14px] font-semibold text-[#0b1c2e] leading-[1.2]">Toyota RAV4<br />Hybrid</div>
                      <div className="mt-[2px] text-[11px] font-semibold text-[#5b6b7a]">$25,090</div>
                    </div>

                    <div className="relative z-[2] flex-1 h-full flex items-end justify-end overflow-visible">
                      <div className="absolute !right-[58px] !top-[-12px] w-[34px] h-[34px] rounded-full bg-[#b6f08a] grid place-items-center z-[1] shadow-[0_2px_6px_rgba(0,0,0,0.2)]">
                        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="w-[24px] h-[24px] block">
                          <path fill="#1a7a32" d="M38 8c-8 1.5-16 6-21 13-4 5.5-6 12-6.5 18.5 6.2-.8 12.2-3.2 17-7.5C34 26 38.5 18.5 40 10c0-.7-.5-1.8-2-2z" />
                          <path fill="#156b2c" d="M16.5 22c3.5 3 6 7 7.2 11.5-2.2 1-4.6 1.5-7 1.5-5.2 0-9.2-3.3-9.2-8 0-2 .8-3.8 2.2-5.2 1.8 1.2 4.3 1.8 6.8.2z" />
                          <path stroke="#0f5c24" strokeWidth="2.2" strokeLinecap="round" fill="none" d="M28 14c-2.5 6-7 11.5-13 15" />
                        </svg>
                      </div>
                      <Image
                        src={toyotaImg?.src}
                        alt="Toyota RAV4 Hybrid"
                        width={140}
                        height={95}
                        className="absolute right-[-42px] bottom-[-17px] z-[2] h-[95px] w-auto block drop-shadow-[0_10px_8px_rgba(0,0,0,0.28)]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <a
              href="/inventory"
              className="mt-auto block w-full rounded-full bg-white hover:bg-[#f0f6fc] text-[#0062bd] text-[14px] font-bold leading-none py-3 px-3.5 text-center no-underline transition-colors"
            >
              Shop Fuel Efficient
            </a>
          </article>
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="flex min-[900px]:hidden justify-center items-center gap-2 mt-10 pb-1">
        {[0, 1, 2, 3].map((i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => scrollToCard(i)}
            className={`w-2 h-2 rounded-full border-0 p-0 transition-all cursor-pointer ${
              activeIndex === i ? "bg-[#0062bd] scale-100" : "bg-[rgba(0,44,95,0.22)]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}