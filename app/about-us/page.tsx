"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Header, Footer } from "@/components/layout";
import { getConstants } from "@/constants";
import { useAppConfig } from "@/app/providers";

// Import your custom section graphics/illustrations here
import aboutHeroBg from "@/assets/pages/abt.png"; // Hero background
import whoWeAreImg from "@/assets/pages/who-we-are.png"; // Dome image with red SUV & white Mercedes
import ourVehiclesImg from "@/assets/pages/welcome-and-financing-block.png"; // Banner + grey BMW SUV
import ourCustomersImg from "@/assets/pages/our-customer-1.png"; // Dome image with customer handshake & grey SUV

/* Animation Variants */
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

const About = () => {
  const appConfig = useAppConfig();
  const { SITE_CONFIG } = getConstants(appConfig);
  const dealershipName = SITE_CONFIG?.dealership?.name || "Gedi Route Cars";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans text-neutral-900 overflow-x-hidden">
      <Header />

      <main className="flex-1 w-full pt-16 md:pt-20">

        {/* =========================================
            1. HERO SECTION WITH IMAGE OVERLAY
           ========================================= */}
        <section className="relative w-full h-[220px] sm:h-[280px] md:h-[340px] flex items-center overflow-hidden bg-black/70">
          {/* Background Image with Dark Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src={aboutHeroBg}
              alt={`${dealershipName} Showroom`}
              fill
              className="object-cover object-center opacity-40"
              priority
            />
          </div>

          {/* Banner Content */}
          <div className="relative z-10 max-w-[1240px] text-white px-6 md:px-12 lg:px-52">
            <h1 className="text-3xl sm:text-4xl md:text-5xl tracking-tight">
              About {dealershipName}
            </h1>
            <p className="mt-3 text-sm sm:text-base md:text-lg font-light text-neutral-200 max-w-2xl mx-auto">
              A fast and convenient way to research and find a vehicle that is right for you.
            </p>
          </div>
        </section>

        {/* =========================================
            2. WHO WE ARE SECTION
           ========================================= */}
        <section className="py-16 md:py-10 px-6 md:px-0 max-w-[1240px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Left Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              className="space-y-4 mt-6 lg:mt-28"
            >
              <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-black">
                Who We Are
              </h2>
              <p className="text-black leading-relaxed text-sm sm:text-base max-w-xl">
                At {dealershipName}, we have only one standard when it comes to the quality of our cars—the highest. That means you can purchase with supreme confidence when shopping our inventory for the right car for you.
              </p>
            </motion.div>

            {/* Right Graphic */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeIn}
              className="flex justify-center lg:justify-end items-center"
            >
              <div className="relative w-full max-w-[650px] h-auto lg:h-[680px] flex items-center justify-center">
                <Image
                  src={whoWeAreImg}
                  alt={`About ${dealershipName} quality selection`}
                  className="w-full max-w-full h-auto lg:min-w-[700px] lg:min-h-[700px] object-contain"
                  priority
                />
              </div>
            </motion.div>

          </div>
        </section>

        {/* =========================================
            3. OUR VEHICLES SECTION
           ========================================= */}
        <section className="py-12 md:py-0 px-6 md:px-1 max-w-[1300px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-28">

            {/* Left Graphic */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeIn}
              className="flex justify-center lg:justify-start order-2 lg:order-1 items-center"
            >
              <div className="relative w-full max-w-[650px] h-auto lg:h-[680px] flex items-center justify-center lg:justify-start">
                <Image
                  src={ourVehiclesImg}
                  alt={`${dealershipName} Certified Cars, Competitive Prices, Financing Available banner with car`}
                  className="w-full max-w-full h-auto lg:min-w-[700px] lg:min-h-[700px] object-contain"
                  width={1000}
                  height={650}
                  priority
                />
              </div>
            </motion.div>

            {/* Right Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              className="space-y-4 order-1 lg:order-2 mt-6 lg:mt-28 max-w-xl"
            >
              <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-black">
                Our Vehicles
              </h2>
              <p className="text-black leading-relaxed text-sm sm:text-base max-w-xl">
                Our vehicles are hand-selected for top quality and then each vehicle is sent to the reconditioning centers for inspection before being delivered to the dealership. Once on the lot, our no-haggle pricing model and belief in transparency provide a pressure-free sales environment for every customer.
              </p>
            </motion.div>

          </div>
        </section>

        {/* =========================================
            4. OUR CUSTOMERS SECTION
           ========================================= */}
        <section className="py-16 md:py-28 px-6 md:px-1 max-w-[1300px] mx-auto lg:mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

            {/* Left Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              className="space-y-4 lg:mt-12 max-w-xl"
            >
              <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-black">
                Our Customers
              </h2>
              <p className="text-black leading-relaxed text-sm sm:text-base max-w-xl">
                We put integrity and transparency at the heart of every interaction with you, whether that interaction is online, on the phone, or in person. We are committed to bringing clarity to each decision you make so you can feel confident about buying the car you love — and enjoy the ride while you do it.
              </p>
            </motion.div>

            {/* Right Graphic */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeIn}
              className="flex justify-center lg:justify-end items-center"
            >
              <div className="relative w-full max-w-[650px] h-auto lg:h-[500px] flex items-center justify-center lg:justify-end">
                <Image
                  src={ourCustomersImg}
                  alt="Customer handshake with vehicle background"
                  className="w-full max-w-full h-auto lg:min-w-[750px] lg:min-h-[700px] object-contain"
                  width={1000}
                  height={650}
                  priority
                />
              </div>
            </motion.div>

          </div>
        </section>

      </main>

      {/* Footer Wrapper */}
      <Footer />
    </div>
  );
};

export default About;