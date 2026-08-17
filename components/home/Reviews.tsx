"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, Star } from "lucide-react";

interface Review {
  name: string;
  location?: string;
  date: string;
  text: string;
}

const reviews: Review[] = [
  {
    name: "Dimple Sharma",
    date: "08/11/2023",
    text: "Had a very good experience with gedi routes. I got approval within 15 minutes. Thank you"
  },
  {
    name: "Navdeep Singh",
    date: "08/10/2023",
    text: "Best experience, got approval right away. Must visit"
  },
  {
    name: "Satpreet Rattu",
    date: "08/24/2025",
    text: "Must visit for wheels and tires, thanks to MANMOL"
  },
  {
    name: "raman preet",
    date: "08/23/2025",
    text: "im here today for delivery of my first car,had great experience with Mandeep bhai,very smooth and transparent process here at Gedi route cars"
  },
  {
    name: "Harshdeep singh Harraich",
    date: "08/23/2025",
    text: "Best experience for wheels . Thanks to MANMOL"
  },
  {
    name: "TARUNBIR SINGH",
    date: "08/22/2025",
    text: "amazing rims collection at gedi route wheels. nice experience"
  },
  {
    name: "tanishq choudhary",
    date: "08/22/2025",
    text: "Super happy with gedi route cars\nHighly recommend"
  },
  {
    name: "Gurpargat Singh",
    date: "08/22/2025",
    text: "Gursewak brother helped us with amazing service great deal"
  },
  {
    name: "Hs S",
    date: "08/22/2025",
    text: "Great service by Gursewak brother, beautiful deal and amazing customer service and experience"
  },
  {
    name: "Nanak Sidhu",
    date: "08/22/2025",
    text: "Very good experience with gedi route wheels\nPlease visit gedi route wheels for amazing deals ⛳️"
  },
  {
    name: "kuldeep mangat",
    date: "08/22/2025",
    text: "great experience with arsh and gedi route card"
  },
  {
    name: "JAGMEET SINGH DHILLON",
    date: "08/22/2025",
    text: "I just bought a new car form and the experience was so nice"
  },
  {
    name: "Nigel Lindsay",
    date: "08/22/2025",
    text: "Nice collection of Rims\nMust visit for good service"
  }
];

const Reviews = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [activeIndex, setActiveIndex] = useState(0);

  // Triple array buffer for smooth infinite scroll loops
  const duplicatedReviews = [...reviews, ...reviews, ...reviews];
  const totalOriginalItems = reviews.length;

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

  const updateActiveIndex = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollAmount = getScrollAmount();
    if (scrollAmount <= 0) return;

    // Calculate current slide based on scroll offset modulo total original reviews
    const currentSlide = Math.round(container.scrollLeft / scrollAmount);
    const normalizedIndex = ((currentSlide % totalOriginalItems) + totalOriginalItems) % totalOriginalItems;
    setActiveIndex(normalizedIndex);
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

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollAmount = getScrollAmount();
    const singleSetWidth = scrollAmount * reviews.length;

    // Scroll to the target item in the middle buffered set
    container.scrollTo({
      left: singleSetWidth + index * scrollAmount,
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
    updateActiveIndex();

    const handleScroll = () => {
      updateActiveIndex();
    };

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
      updateActiveIndex();
    };

    container.addEventListener("scroll", handleScroll);
    container.addEventListener("scrollend", handleScrollEnd);
    return () => {
      container.removeEventListener("scroll", handleScroll);
      container.removeEventListener("scrollend", handleScrollEnd);
    };
  }, [slidesToShow]);

  return (
    <section className="w-full bg-[#f8f9fa] py-12 mt-4 lg:mt-0 lg:py-16">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        {/* Title Section */}
        <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#0e1726] tracking-tight leading-tight">
          What our customers are saying
        </h2>
        <p className="mt-2 text-base max-w-2xl leading-relaxed">
          We’ve purchased more than 3 million cars from customers and received a lot of great feedback. See what’s behind our 4.8 star average rating.
        </p>

        {/* Rating Summary + Controls Row */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex flex-col md:flex-row items-center gap-2">
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
            {/* <a
              href="https://www.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm font-semibold text-[#0088FF] hover:underline flex items-center gap-1 translate-y-[20px]  lg:translate-y-[5px]"
            >
              See All Reviews
              <ExternalLink className="h-3.5 w-3.5 shrink-0" />
            </a> */}
          </div>

          {/* Arrow Controls: Hidden on mobile, visible on desktop */}
          <div className="hidden md:flex items-center gap-2">
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
                  className={`snap-center shrink-0 ${
                    slidesToShow === 1
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
                      <p className="text-base text-gray-700 leading-relaxed font-normal">
                        {r.text}
                      </p>

                      {/* Read More Link */}
                      <button className="mt-2 text-base font-semibold text-[#0088FF] hover:underline focus:outline-none block">
                        Read More
                      </button>
                    </div>

                    {/* Footer Author & Date Details */}
                    <div className="mt-6 pt-2">
                      <div className="text-base font-bold text-gray-900">
                        {r.name}{" "}
                        <span className="font-normal text-gray-500">
                          {r.location}
                        </span>
                      </div>
                      <div className="text-base text-gray-400 mt-0.5">
                        {r.date}
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Pagination Dots: Visible on mobile, hidden on desktop */}
        <div className="flex md:hidden items-center justify-center gap-2 mt-6">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              aria-label={`Go to review ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ease-in-out ${
                activeIndex === index
                  ? "w-2 bg-brand-green"
                  : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;