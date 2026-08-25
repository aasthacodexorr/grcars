"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronRight, Wallet, Repeat } from "lucide-react";
import HeroDesktop from "@/assets/cars/HomebgImg.png";
import HeroMobile from "@/assets/cars/hero-mobile.jpg";
import Link from "next/link";

const src = (img: any) => (typeof img === "string" ? img : img?.src);

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Redirects to /inventory with the query parameter
    router.push(`/inventory?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <section className="relative w-full min-h-[420px] md:min-h-[550px] lg:min-h-[600px] flex flex-col justify-between px-6 pt-10 pb-7 md:px-12 md:py-8 lg:py-10 overflow-hidden">
      {/* Background image layer */}
      <picture className="absolute inset-0 z-0 block w-full h-full">
        <source media="(min-width: 1024px)" srcSet={src(HeroDesktop)} />
        <source media="(min-width: 768px)" srcSet={src(HeroMobile)} />
        <img
          src={src(HeroMobile)}
          alt="Neighborhood background"
          className="h-full w-full object-cover object-start"
          fetchPriority="high"
        />
      </picture>

      {/* Dark overlay gradients for contrast */}
      <div className="absolute inset-0 hidden md:block bg-gradient-to-l from-black/10 via-transparent to-slate-900/50 pointer-events-none z-[1]" />
      <div className="absolute inset-x-0 top-0 h-28 md:hidden bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none z-[1]" />

      {/* Main Hero Content Container */}
      <div className="relative z-10 max-w-[1280px] w-full mt-4 md:mt-16 lg:mt-24 mx-auto flex flex-col justify-between h-full min-h-[450px] md:min-h-[480px]">
        {/* Top Text & Search Section */}
        <div className="max-w-xl space-y-3 md:space-y-6 pt-2 md:pt-6">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight uppercase drop-shadow-md">
            Right Car. <br />
            Right Price.
          </h1>

          {/* Search Form */}
          <form
            onSubmit={handleSearch}
            className="relative flex items-center w-full max-w-lg bg-white rounded-lg shadow-xl pl-4 pr-1.5 py-1.5 md:px-4 md:py-3"
          >
            <button type="submit" aria-label="Search" className="shrink-0">
              <Search className="w-4 h-4 md:w-5 md:h-5 text-gray-400 mr-2 md:mr-3" />
            </button>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Make, model, or keyword"
              className="w-full bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none text-sm md:text-lg"
            />
            <button
              type="submit"
              className="md:hidden ml-2 shrink-0 bg-brand-green hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded-md text-sm transition-colors"
            >
              Go
            </button>
          </form>
        </div>

        {/* Desktop CTA cards */}
        <div className="hidden md:grid grid-cols-2 gap-4 mt-auto pt-8">
          <div className="bg-grey-900/80 backdrop-blur-md text-white p-6 rounded-lg flex items-center justify-between shadow-xl border border-white/10">
            <div>
              <h3 className="text-lg md:text-xl font-bold">Financing made simple</h3>
              <p className="text-xs md:text-sm text-gray-300 mt-1">
                No credit impact, view real payments while shopping
              </p>
            </div>
            <Link
              href={"/financing"}
              className="ml-4 cursor-pointer shrink-0 bg-white text-blue-900 hover:bg-gray-100 font-semibold px-4 py-2.5 rounded-full text-xs md:text-sm transition-all shadow-md"
            >
              Get Pre-Qualified
            </Link>
          </div>

          <div className="bg-grey-900/80 backdrop-blur-md text-white p-6 rounded-lg flex items-center justify-between shadow-xl border border-white/10">
            <div>
              <h3 className="text-lg md:text-xl font-bold">Sell or trade your car</h3>
              <p className="text-xs md:text-sm text-gray-300 mt-1">
                Get a real offer in under 2 minutes
              </p>
            </div>
            <Link
              href={"/trade-in-my-car"}
              className="ml-4 cursor-pointer shrink-0 bg-white text-blue-900 hover:bg-gray-100 font-semibold px-4 py-2.5 rounded-full text-xs md:text-sm transition-all shadow-md"
            >
              Get Your Offer
            </Link>
          </div>
        </div>

        {/* Mobile CTA rows */}
        <div className="md:hidden ">
          <div className="bg-grey-900/80 backdrop-blur-md text-white rounded-2xl p-2 border border-white/10">

            {/* Row 1 */}
            <Link href={"/financing"} className="w-full flex items-center justify-between p-3.5 hover:bg-white/5 transition-colors rounded-t-full">
              <div className="flex items-center gap-3">
                <Wallet className="w-5 h-5" />
                <span className="font-semibold text-base">Financing made easy</span>
              </div>
              <ChevronRight className="w-5 h-5 text-white/80" />
            </Link>

            <hr className="mx-4 border-2 border-t border-white/20 " />

            {/* Row 2 */}
            <Link href={"/trade-in-my-car"} className="w-full flex items-center justify-between p-3.5 hover:bg-white/5 transition-colors rounded-full">
              <div className="flex items-center gap-3">
                <Repeat className="w-5 h-5" />
                <span className="font-semibold text-base">Sell or trade your car</span>
              </div>
              <ChevronRight className="w-5 h-5 text-white/80" />
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;