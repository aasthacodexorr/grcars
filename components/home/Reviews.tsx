"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, Star } from "lucide-react";

type Review = {
  name: string;
  location: string;
  date: string;
  text: string;
};

const reviews: Review[] = [
  {
    name: "Caryle K.",
    location: "from CT",
    date: "Jan. 2026",
    text: "We traded in our car with GrCars for a fair price and received a gorgeous vehicle exactly as advertised.",
  },
  {
    name: "Megan A.",
    location: "from WA",
    date: "Jan. 2026",
    text: "The online quote was the exact amount on the check I received from GrCars, no haggling or negotiating needed.",
  },
  {
    name: "Gary G.",
    location: "from SC",
    date: "Jan. 2026",
    text: "GrCars gave me a fair price for my Nissan and picked it up the very same day.",
  },
  {
    name: "Alex B.",
    location: "from ON",
    date: "Feb. 2026",
    text: "Amazing experience dealing with Sam and his team. I highly recommend them for any vehicle purchase.",
  },
];

const Reviews = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const [slidesToShow, setSlidesToShow] = useState(3);

  // Triple array buffer for smooth infinite scroll loops
  const duplicatedReviews = [...reviews, ...reviews, ...reviews];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setSlidesToShow(1);
      else if (window.innerWidth < 1024) setSlidesToShow(2);
      else setSlidesToShow(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getScrollAmount = () => {
    if (!scrollRef.current) return 0;
    const firstChild = scrollRef.current.querySelector("[data-slide]");
    return firstChild ? firstChild.clientWidth : scrollRef.current.clientWidth / slidesToShow;
  };

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current || isScrolling.current) return;

    const container = scrollRef.current;
    const scrollAmount = getScrollAmount();

    isScrolling.current = true;

    const targetScrollLeft =
      dir === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: targetScrollLeft,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = getScrollAmount();
    const singleSetWidth = scrollAmount * reviews.length;

    // Center scroll position on mount
    container.scrollLeft = singleSetWidth;

    const handleScrollEnd = () => {
      if (!container) return;
      const currentScrollAmount = getScrollAmount();
      const currentSetWidth = currentScrollAmount * reviews.length;

      if (container.scrollLeft >= currentSetWidth * 2 - 10) {
        container.style.scrollBehavior = "auto";
        container.scrollLeft = container.scrollLeft - currentSetWidth;
        container.style.scrollBehavior = "smooth";
      } else if (container.scrollLeft <= currentScrollAmount) {
        container.style.scrollBehavior = "auto";
        container.scrollLeft = container.scrollLeft + currentSetWidth;
        container.style.scrollBehavior = "smooth";
      }

      isScrolling.current = false;
    };

    container.addEventListener("scrollend", handleScrollEnd);
    return () => container.removeEventListener("scrollend", handleScrollEnd);
  }, [slidesToShow]);

  return (
    <section className="w-full bg-[#f8f9fa] py-12 mt-4 lg:py-16">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        {/* Title Section */}
        <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#0e1726] tracking-tight leading-tight">
          What our customers are saying
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-gray-600 max-w-2xl leading-relaxed">
          We’ve purchased more than 3 million cars from customers and received a lot of great feedback. See what’s behind our 4.8 star average rating.
        </p>

        {/* Rating Summary + Controls Row */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 self-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 shrink-0 fill-[#ffb800] text-[#ffb800]" />
                ))}
              </div>

              <span className="text-xl sm:text-2xl font-extrabold text-[#0e1726] leading-none translate-y-[1px]">
                4.8 stars
              </span>
            </div>

            {/* View All Link */}
            <a
              href="https://www.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm font-semibold text-[#0088FF] hover:underline flex items-center gap-1 translate-y-[5px]"
            >
              See All Reviews
              <ExternalLink className="h-3.5 w-3.5 shrink-0" />
            </a>
          </div>

          {/* Top-Right Control Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              aria-label="Previous review"
              className="h-9 w-9 cursor-pointer rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none"
            >
              <ArrowLeft className="h-4 w-4 shrink-0" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Next review"
              className="h-9 w-9 cursor-pointer rounded-full border border-gray-700 bg-[#0e1726] flex items-center justify-center text-white hover:bg-black transition-colors focus:outline-none"
            >
              <ArrowRight className="h-4 w-4 shrink-0" />
            </button>
          </div>
        </div>

        {/* Carousel Window */}
        <div className="mt-6 overflow-hidden">
          <div
            ref={scrollRef}
            className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden w-full snap-x snap-mandatory"
          >
            <div className="flex w-full gap-3 py-2">
              {duplicatedReviews.map((r, index) => (
                <div
                  key={`${r.name}-${index}`}
                  data-slide
                  className={`snap-center shrink-0  ${slidesToShow === 1
                      ? "w-full"
                      : slidesToShow === 2
                        ? "w-1/2"
                        : "w-1/3"
                    }`}
                >
                  <article className="rounded-xl bg-white p-6 shadow-xs border border-gray-100 flex flex-col h-full min-h-[220px] justify-between">
                    <div>
                      {/* Rating Stars */}
                      <div className="flex gap-1 mb-8">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className="h-4.2 w-4.2 fill-[#ffb800] text-[#ffb800]"
                          />
                        ))}
                      </div>

                      {/* Review Paragraph */}
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal">
                        {r.text}
                      </p>

                      {/* Read More Link */}
                      <button className="mt-2 text-xs font-semibold text-[#0088FF] hover:underline focus:outline-none block">
                        Read More
                      </button>
                    </div>

                    {/* Footer Author & Date Details */}
                    <div className="mt-6 pt-2">
                      <div className="text-xs font-bold text-gray-900">
                        {r.name}{" "}
                        <span className="font-normal text-gray-500">
                          {r.location}
                        </span>
                      </div>
                      <div className="text-[11px] text-gray-400 mt-0.5">
                        {r.date}
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;