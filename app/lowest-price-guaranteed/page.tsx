import React from 'react';
import Link from 'next/link';
import { Footer, Header } from '@/components/layout';
import aboutHeroBg from "@/assets/pages/abt.png";
import Image from 'next/image';

export default function LowestPriceGuarantee() {
    const criteriaList = [
        'The lower-priced vehicle must be listed online and currently available for purchase.',
        'It should be situated within a maximum 50KM radius of Brampton, Ontario.',
        'All specifications of the lower-priced vehicle, including Year, Make, Model, Trim, Package, and Features, must either match or surpass those of our vehicle.',
        'The interior color, features, and materials of the lower-priced vehicle must match with our vehicle.',
        'The exterior paint color of the lower-priced vehicle must match with our vehicle.',
        'The mileage of the lower-priced vehicle cannot surpass that of our vehicle.',
        'The engine size, transmission type, and number of gears of the lower-priced vehicle must match ours.',
        'The powertrain setup of the lower-priced vehicle should match with ours.',
        'The vehicle history status of the lower-priced vehicle must not be of lesser quality than ours.',
        'The lower-priced vehicle must be listed for sale by a registered Ontario dealership.',
        'It must be listed for sale as Certified without any additional cost.',
        'The CarFax report of the lower-priced vehicle must be free from reported claims, accidents, police reports, or other damages.',
        'The financing terms, including interest rate and length, must be similar or better than ours.',
        'The selling dealership of the lower-priced vehicle must possess a physical store where the vehicle can be examined and test-driven before purchase.',
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans text-neutral-900 overflow-x-hidden">
            {/* Header */}
            <Header />

            <main className="flex-1 w-full pt-36 md:pt-20">
                {/* Hero Section */}
                <section className="relative w-full h-[220px] sm:h-[280px] md:h-[220px] flex items-center overflow-hidden bg-black/70">
                    {/* Background Image with Dark Overlay */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src={aboutHeroBg}
                            alt="Showroom"
                            fill
                            className="object-cover object-center opacity-40"
                            priority
                        />
                    </div>

                    {/* Banner Content - Aligned with About page */}
                    <div className="relative z-10 w-full max-w-[1240px] mx-auto px-6 md:px-0 text-white">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl tracking-tight">
                            Lowest Price Guaranteed on Used Cars
                        </h1>
                    </div>
                </section>

                {/* Content Section - Aligned with About page */}
                <section className="py-16 md:py-12 px-6 md:px-0 max-w-[1240px] mx-auto text-black">
                    <div className="space-y-6 text-sm sm:text-base leading-relaxed">
                        <p>
                            At GR Cars, where your satisfaction is our priority. We understand that finding the perfect vehicle at the right price is crucial, which is why we offer the lowest prices in GTA.
                        </p>
                        <p>
                            Our commitment to providing you with competitive pricing begins with a thorough analysis of the market. We constantly monitor online listings, dealer websites, newspaper ads, and third-party sources to ensure our prices are among the best. If you happen to find a lower price elsewhere, please let us know and we will do our best to match it. Subject to the following criteria:
                        </p>

                        <ul className="space-y-2 list-disc pl-5 marker:text-zinc-800">
                            {criteriaList.map((item, index) => (
                                <li key={index} className="pl-1">
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <p className="pt-4 text-black">
                            Kindly be aware that GR Car’s Lowest Price Guarantee is contingent upon the dealer’s discretion in evaluating the suitability of the vehicle for price matching. The outlined guidelines serve as the criteria used to assess the compatibility of other vehicles for this purpose.
                        </p>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}