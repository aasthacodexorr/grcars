
import { Search } from "lucide-react";
import HomeBgImg from "@/assets/cars/HomebgImg.png";

const Hero = () => {
  return (
    <section 
      className="relative w-full min-h-[550px] lg:min-h-[650px] bg-cover bg-center bg-no-repeat flex flex-col justify-between px-6 md:px-12 py-8 lg:py-12"
      style={{ backgroundImage: `url(${HomeBgImg?.src})` }}
    >
      {/* Dark overlay gradient to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-l from-white/30 via-transparent to-slate/80 pointer-events-none" />

      {/* Main Hero Content Container */}
      <div className="relative z-10 max-w-[1280px] w-full mt-44 mx-auto flex flex-col justify-between h-full min-h-[480px]">
        
        {/* Top Text & Search Section */}
        <div className="max-w-xl space-y-6 pt-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight uppercase">
            Right Car. <br />
            Right Price.
          </h1>

          {/* Search Input Bar */}
          <div className="relative flex items-center w-full max-w-lg bg-white rounded-lg shadow-lg px-4 py-3">
            <Search className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
            <input
              type="text"
              placeholder="Search make, model, or keyword"
              className="w-full bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none text-base md:text-lg"
            />
          </div>
        </div>

        {/* Bottom CTA Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4  pt-12">
          
          {/* Card 1: Financing */}
          <div className="bg-grey-900/75 backdrop-blur-md text-white p-6 rounded-lg flex items-center justify-between shadow-xl border border-white/10">
            <div>
              <h3 className="text-lg md:text-xl font-bold">Financing made simple</h3>
              <p className="text-xs md:text-sm text-gray-300 mt-1">
                No credit impact, view real payments while shopping
              </p>
            </div>
            <button className="ml-4 cursor-pointer shrink-0 bg-white text-blue-900 hover:bg-gray-100 font-semibold px-4 py-2.5 rounded-lg text-xs md:text-sm transition-all shadow-md">
              Get Pre-Qualified
            </button>
          </div>

          {/* Card 2: Sell or Trade */}
          <div className="bg-grey-900/75 backdrop-blur-md text-white p-6 rounded-lg flex items-center justify-between shadow-xl border border-white/10">
            <div>
              <h3 className="text-lg md:text-xl font-bold">Sell or trade your car</h3>
              <p className="text-xs md:text-sm text-gray-300 mt-1">
                Get a real offer in under 2 minutes
              </p>
            </div>
            <button className="ml-4 cursor-pointer shrink-0 bg-white text-blue-900 hover:bg-gray-100 font-semibold px-4 py-2.5 rounded-lg text-xs md:text-sm transition-all shadow-md">
              Get Your Offer
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
