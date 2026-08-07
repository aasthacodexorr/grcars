"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import zlogo from "@/assets/brand/zlogo.png";
import { useAppConfig } from "@/app/providers";
import { fallbackValue, defaultAppConfig } from "@/lib/appConfig";

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
    if (pathname === "/inventory" && href.startsWith("/inventory")) {
      e.preventDefault();
      window.location.href = href;
    }
  };

  // Structured columns array for dynamic mapping
  const footerColumns = [
    {
      sections: [
        {
          title: "Financing",
          links: [{ label: "Learn More", href: "/financing" }],
        },
        {
          title: "Sell/Trade",
          links: [
            { label: "Get an Offer", href: "/trade-in-my-car" },
            { label: `${safeD.dealership_name} Value Tracker`, href: "/value-tracker" },
          ],
        },
      ],
    },
    {
      sections: [
        {
          title: "How it works",
          links: [
            { label: `Buying From ${safeD.dealership_name}`, href: "/inventory", forceReload: true },
            { label: "Selling or Trading In", href: "/trade-in-my-car" },
            { label: "Our Protection Plans", href: "/protection-plans" },
            { label: `Repairs with ${safeD.dealership_name}`, href: "/repairs" },
            { label: "Certified Cars", href: "/inventory?certified=true", forceReload: true },
            { label: `${safeD.dealership_name} Insurance`, href: "/insurance" },
            { label: "Guide to Buying a Used EV", href: "/ev-guide" },
          ],
        },
      ],
    },
    {
      sections: [
        {
          title: `About ${safeD.dealership_name}`,
          links: [
            { label: "About Us", href: "/about-us" },
            { label: "Car Vending Machines", href: "/vending-machine" },
            { label: "Customer Reviews", href: "/reviews" },
            { label: "Careers", href: "/careers" },
          ],
        },
      ],
    },
    {
      sections: [
        {
          title: "Support",
          links: [
            {
              label: "Support and Contact",
              href: "/contact-us",
              icon: (
                <svg className="w-4 h-4 mr-1.5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
            },
            {
              label: "Chat With Us",
              href: "#chat",
              icon: (
                <svg className="w-4 h-4 mr-1.5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              ),
            },
          ],
        },
        {
          title: "Other",
          links: [
            { label: `partnerships@${safeD.dealership_name.toLowerCase().replace(/\s+/g, "")}.com`, href: "mailto:partnerships@dealership.com" },
            { label: `media@${safeD.dealership_name.toLowerCase().replace(/\s+/g, "")}.com`, href: "mailto:media@dealership.com" },
            { label: `realestate@${safeD.dealership_name.toLowerCase().replace(/\s+/g, "")}.com`, href: "mailto:realestate@dealership.com" },
          ],
        },
      ],
    },
  ];

  return (
    <footer className="w-full bg-white py-8 px-4 sm:px-6 lg:px-12 font-sans">
      <div className="max-w-[1400px] mx-auto bg-[#101827] text-white rounded-[32px] p-8 sm:p-12 lg:px-28 py-16">
        
        {/* Main Grid: Logo + Nav Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12 mb-16">
          
          {/* Logo Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              {safeD.dealership_logo ? (
                <div className="w-12 h-12 bg-[#00A3E0] rounded-full flex items-center justify-center p-2 shadow-md">
                  <Image
                    src={safeD.dealership_logo}
                    alt={safeD.dealership_name}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 bg-[#0d82df] rounded-full flex items-center justify-center shadow-md">
                  <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24">
                    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.04 3H5.81l1.04-3zM19 17H5v-4h14v4z" />
                    <circle cx="7.5" cy="15" r="1.5" />
                    <circle cx="16.5" cy="15" r="1.5" />
                  </svg>
                </div>
              )}
            </Link>
          </div>

          {/* Dynamic Columns */}
          {footerColumns.map((col, colIdx) => (
            <div key={colIdx} className="space-y-8">
              {col.sections.map((sec, secIdx) => (
                <div key={secIdx}>
                  <h3 className="text-[15px] font-bold text-white mb-3 tracking-wide">{sec.title}</h3>
                  <ul className="space-y-2.5 text-[13px]">
                    {sec.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <Link
                          href={link.href}
                          onClick={(e) => ("forceReload" in link && link.forceReload) && handleInventoryClick(e, link.href)}
                          className="hover:text-white transition-colors flex items-center"
                        >
                          {("icon" in link && link.icon) && link.icon}
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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-800/80 text-sm font-semibold">
          <div className="flex flex-wrap items-center gap-x-2 text-gray-200">
            <Link href="/inventory" onClick={(e) => handleInventoryClick(e, "/inventory")} className="hover:text-white">
              Search Cars
            </Link>
            <span className="text-gray-500 font-normal">|</span>
            <Link href="/sitemap" className="hover:text-white">
              Sitemap
            </Link>
            <span className="text-gray-500 font-normal">|</span>
            <Link href="/investors" className="hover:text-white">
              Investors
            </Link>
            <span className="text-gray-500 font-normal">|</span>
            <Link href="/patents" className="hover:text-white">
              Patents
            </Link>
            <span className="text-gray-500 font-normal">|</span>
            <Link href="/press" className="hover:text-white">
              Press
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-5 text-gray-200">
            <a href={safeD.social_media_facebook || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Facebook">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href={safeD.social_media_linkedin || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="LinkedIn">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.239-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href={safeD.social_media_instagram || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Instagram">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href={safeD.social_media_x || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="X">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
          </div>
        </div>

        {/* Copyright and Legal Terms */}
        <div className="pt-6 space-y-3 text-[12px] text-gray-400">
          <div className="flex items-center justify-between">
            <p>Copyright © {new Date().getFullYear()} {safeD.dealership_name}, LLC. All Rights Reserved.</p>
            <div className="flex items-center gap-1.5 text-gray-500">
              <span>Powered by</span>
              <a href="https://www.zopdealer.com/" target="_blank" rel="noopener noreferrer">
                <Image src={zlogo} alt="Zop Dealer" width={18} height={18} className="w-auto h-3.5 object-contain brightness-200" />
              </a>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-2 text-gray-300 font-medium">
            <Link href="/user-agreement" className="hover:underline hover:text-white">User Agreement</Link>
            <span className="text-gray-600">|</span>
            <Link href="/privacy-policy" className="hover:underline hover:text-white">Financial and Other Privacy Notices</Link>
            <span className="text-gray-600">|</span>
            <Link href="/consumer-privacy" className="hover:underline hover:text-white">Consumer Privacy Notice</Link>
            <span className="text-gray-600">|</span>
            <Link href="/do-not-sell" className="hover:underline hover:text-white">Do Not Sell or Share My Personal Information</Link>
            <span className="text-gray-600">|</span>
            <Link href="/code-of-conduct" className="hover:underline hover:text-white">Code of Conduct</Link>
            <span className="text-gray-600">|</span>
            <Link href="/responsible-disclosure" className="hover:underline hover:text-white">Responsible Disclosure</Link>
            <span className="text-gray-600">|</span>
            <Link href="/accessibility" className="hover:underline hover:text-white">Accessibility</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;