"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import zlogo from "@/assets/brand/zlogo.png";
import { useAppConfig } from "@/app/providers";
import { fallbackValue, defaultAppConfig } from "@/lib/appConfig";
import logo from "@/assets/pages/grcarslogofooter.png";
import facebook from "@/assets/social/fb.png";
import instagram from "@/assets/social/insta-1.png";


const Footer = () => {
  const appConfig = useAppConfig();
  const defaultD = defaultAppConfig.dealership;
  const d = appConfig.dealership;
  const pathname = usePathname();

  const safeD = {
    dealership_name: fallbackValue(d.dealership_name, defaultD.dealership_name),
    dealership_logo: fallbackValue(d.dealership_logo, defaultD.dealership_logo),
    social_media_facebook: fallbackValue(d.social_media_facebook, defaultD.social_media_facebook),
    social_media_instagram: fallbackValue(d.social_media_instagram, defaultD.social_media_instagram),
    social_media_linkedin: fallbackValue(d.social_media_linkedin, defaultD.social_media_linkedin),
    social_media_x: fallbackValue(d.social_media_x, defaultD.social_media_x),
  };

  const handleInventoryClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname.startsWith("/inventory") && href.startsWith("/inventory")) {
      e.preventDefault();
      window.location.href = href;
    }
  };

  // Structured columns array for dynamic mapping
  const footerColumns = [
    {
      sections: [
        {
          title: "QUICK LINKS",
          links: [
            { label: "INVENTORY", href: "/inventory" },
            { label: "SELL / TRADE", href: "/trade-in-my-car" },
            { label: "APPLY FOR FINANCING", href: "/financing" },
            { label: "TIRE & RIMS", href: "https://www.grwheels.ca/" },
            { label: "PAYMENT CALCULATOR", href: "/payment-calculator" },
            { label: "ABOUT US", href: "/about-us" },
            { label: "BLOG", href: "/blog" },
            { label: "CONTACT", href: "/contact-us" },
          ],
        },
      ],
    },

    {
      sections: [
        {
          title: "SHOP NOW",
          links: [
            { label: "AUDI", href: "/inventory/audi" },
            { label: "BMW", href: "/inventory/bmw" },
            { label: "CADILLAC", href: "/inventory/cadillac" },
            { label: "CHEVROLET", href: "/inventory/chevrolet" },
            { label: "CHRYSLER", href: "/inventory/chrysler" },
            { label: "DODGE", href: "/inventory/dodge" },
            { label: "FORD", href: "/inventory/ford" },
            { label: "GMC", href: "/inventory/gmc" },
          ],
        },
      ],
    },

    {
      sections: [
        {
          title: "CONTACT INFO",
          links: [
            {
              label: "316 ORENDA RD,",
              href: "https://www.google.com/maps/search/?api=1&query=316+Orenda+Rd+Brampton+ON+L6T+1G1",
            },
            {
              label: "BRAMPTON, ON,",
              href: "https://www.google.com/maps/search/?api=1&query=316+Orenda+Rd+Brampton+ON+L6T+1G1",
            },
            {
              label: "L6T 1G1",
              href: "https://www.google.com/maps/search/?api=1&query=316+Orenda+Rd+Brampton+ON+L6T+1G1",
            },
          ],
        },
      ],
    },

    {
      sections: [
        {
          title: "CALL US",
          links: [
            {
              label: "Sales: (905) 247-8040",
              href: "tel:+19052478040",
            },
          ],
        },

      ],
    },
  ];

  return (
    <footer className="w-full font-sans">
      <div className="max-w-[1550px] mx-auto bg-[#101827] text-white rounded-[32px] p-8 sm:p-12 lg:px-28 py-16">

        {/* Main Grid: Logo + Nav Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12 mb-1">

          {/* Logo Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              {(
                <div className=" rounded-full -mt-4 flex items-center justify-center shadow-md">
                  <img src={logo?.src} />
                </div>
              )}
            </Link>
          </div>

          {/* Dynamic Columns */}
          {footerColumns.map((col, colIdx) => (
            <div key={colIdx} className="space-y-8">
              {col.sections.map((sec, secIdx) => (
                <div key={secIdx}>
                  <h3 className="text-xl font-bold text-white mb-3 tracking-wide">{sec.title}</h3>
                  <ul className="space-y-2.5 text-[13px]">
                    {sec.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <Link
                          href={link.href}
                          onClick={(e) => ("forceReload" in link && link.forceReload) && handleInventoryClick(e, link.href)}
                          className="hover:text-white transition-colors flex items-center"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Links Bar & Social Media Icons */}
        <div className="flex flex-col md:flex-row md:items-end justify-end  gap-4 pb-6 border-b border-gray-800/80 text-sm font-semibold">

          {/* Social Icons */}
          <div className="flex items-center justify-end  gap-5 text-gray-200">
            <a href={safeD.social_media_facebook || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Facebook">
              <Image
                src={facebook}
                alt="Facebook"
                width={23}
                height={23}
                style={{
                  width: "auto",
                  height: "auto",
                  maxWidth: "100%",
                }}
              />
            </a>
            <a href={safeD.social_media_instagram || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Instagram">
              <Image
                src={instagram}
                alt="Instagram"
                width={23}
                height={23}
                style={{
                  width: "auto",
                  height: "auto",
                  maxWidth: "100%",
                }}
              />
            </a>
          </div>
        </div>

        {/* Copyright and Legal Terms */}
        <div className="pt-6 space-y-3 text-[12px] text-gray-400">
          <div className="flex flex-col items-start justify-between gap-1">
            <p>Copyright © {new Date().getFullYear()} {safeD.dealership_name}, LLC. All Rights Reserved.</p>
            <div className="flex gap-1">
              <span>Powered by</span>
              <a href="https://www.zopdealer.com/" target="_blank" rel="noopener noreferrer">
                <Image src={zlogo} alt="Zop Dealer" width={18} height={18} className="w-auto h-3.5 object-contain brightness-200" />
              </a>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-2 text-gray-300 font-medium">
            <Link href="/privacy-policy" className="hover:underline hover:text-white">Privacy Policy</Link>
            <span className="text-gray-600">|</span>
            <Link href="/terms-conditions/" className="hover:underline hover:text-white">Terms & Conditions</Link>
            <span className="text-gray-600">|</span>
            <Link target="_blank" href="/sitemap" className="hover:underline hover:text-white">Site Map</Link>

          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;