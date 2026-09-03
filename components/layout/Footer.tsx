"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import zlogo from "@/assets/brand/zlogo.png";
import { useAppConfig } from "@/app/providers";
import { fallbackValue, defaultAppConfig } from "@/lib/appConfig";
import logo from "@/assets/brand/logo_white.png";
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

  const googleMapsUrl = "https://www.google.com/maps/place/Gedi+Route+Cars/@43.7055262,-79.6938153,4367m/data=!3m1!1e3!4m6!3m5!1s0x882b3f18084db7a7:0x703d924801f6b7fa!8m2!3d43.7016063!4d-79.702997!16s%2Fg%2F11kr86czzy?entry=ttu&g_ep=EgoyMDI2MDgyMy4wIKXMDSoASAFQAw%3D%3D";

  // Define an interface for the section objects
  interface FooterSection {
    title: string;
    links: { label: string; href: string; forceReload?: boolean }[];
    hasUnderline?: boolean;
    hasDirectionButton?: boolean;
  }

  interface FooterColumn {
    sections: FooterSection[];
  }

  // Structured columns array for dynamic mapping with explicit type annotation
  const footerColumns: FooterColumn[] = [
    {
      sections: [
        {
          title: "QUICK LINKS",
          links: [
            { label: "INVENTORY", href: "/inventory" },
            { label: "SELL / TRADE", href: "/trade-in-my-car" },
            { label: "APPLY FOR FINANCING", href: "/finance" },
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
          hasUnderline: true,
          links: [
            { label: "316 ORENDA RD,", href: googleMapsUrl },
            { label: "BRAMPTON ON,", href: googleMapsUrl },
            { label: "L6T 1G1", href: googleMapsUrl },
          ],
          hasDirectionButton: true,
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
      <div className="max-w-[1550px] mx-auto bg-[#101827] text-white px-8 pt-8 pb-6 sm:px-12 lg:px-28 ">

        {/* Main Grid: Logo + Nav Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12 mb-1">

          {/* Logo Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <div className="rounded-full -mt-4 flex items-center justify-center -ml-4">
                <img src={logo?.src} alt="Logo" />
              </div>
            </Link>
          </div>

          {/* Dynamic Columns */}
          {footerColumns.map((col, colIdx) => (
            <div key={colIdx} className="space-y-8">
              {col.sections.map((sec, secIdx) => (
                <div key={secIdx}>
                  <div className="mb-3">
                    <h3 className="text-xl font-bold text-white tracking-wide inline-block">
                      {sec.title}
                    </h3>
                    {sec.hasUnderline && (
                      <div className="w-12 h-[2px] bg-blue-500 mt-1" />
                    )}
                  </div>
                  <ul className="space-y-3 text-[15px] font-sans">
                    {sec.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <a
                          href={link.href}
                          onClick={(e) => ("forceReload" in link && link.forceReload) && handleInventoryClick(e, link.href)}
                          className="hover:text-white transition-colors flex items-center"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>

                  {/* Get Direction Button */}
                  {sec.hasDirectionButton && (
                    <div className="mt-5 hidden lg:block">
                      <a
                        href={googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-[#0080ff] hover:bg-blue-600 text-white font-medium px-6 py-2.5 rounded-full text-sm transition-colors"
                      >
                        Get Direction
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Links Bar & Social Media Icons */}
        <div className="flex flex-col md:flex-row md:items-end justify-end gap-4 pb-6 border-b border-gray-800/80 text-sm font-semibold">

          {/* Social Icons */}
          <div className="flex items-center lg:justify-end mt-3 lg:mt-0 gap-5 text-gray-200">
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
        <div className="pt-6 space-y-3 text-[15px] text-white">
          <div className="flex flex-wrap items-center gap-x-1 gap-y-0.5 text-sm text-white">
            <p>Copyright © {new Date().getFullYear()} Gedi Route Cars Inc. All Rights Reserved.</p>
            <div className="flex items-center gap-1">
              <span>Powered by</span>
              <a href="https://www.zopdealer.com/" target="_blank" rel="noopener noreferrer">
                <Image src={zlogo} alt="Zop Dealer" width={18} height={18} className="w-auto h-3.5 object-contain" />
              </a>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-2 text-white font-medium text-sm">
            <Link href="/privacy-policy" className="hover:underline hover:text-white">Privacy Policy</Link>
            <span className="text-gray-600">|</span>
            <Link href="/terms-conditions/" className="hover:underline hover:text-white">Terms & Conditions</Link>
            <span className="text-gray-600">|</span>
            <Link target="_blank" href="/sitemap" className="hover:underline hover:text-white">Site Map</Link>
            <span className="text-gray-600">|</span>
            <Link target="_blank" href="/lowest-price-guaranteed" className="hover:underline hover:text-white">Lowest Price Guaranteed</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;