'use client';

import Image from "next/image";
import type { Card } from "./types";
import carImg from "@/assets/cars/car-white-suv 1.png"
export const CARDS: Card[] = [
  {
    title: "Cars under $20K",
    subtitle: "Great rides with quality you can count on — at a price you'll love.",
    bgColor: "bg-[#9BD0FF]",
    textColor: "text-[#0F2942]",
    buttonBg: "bg-[#0066CC] hover:bg-[#0052A3]",
    buttonText: "text-white",
    buttonLabel: "Explore Budget Options",
    to: "/inventory?price=0-20000",
    customVisual: (
      <div className="flex flex-col items-center">
        <span className="text-4xl md:text-5xl font-extrabold text-[#0066CC] tracking-tight mb-2">
          $18,590
        </span>
        <Image
          src={carImg?.src}
          alt="Budget Car"
          width={208}
          height={120}
          className="w-52 h-auto object-contain drop-shadow-lg"
        />
      </div>
    ),
  },
  {
    title: "Discover Great Deals!",
    subtitle: "Cars priced $1,500 or more below the Kelley Black Book® Typical Listing Price.",
    bgColor: "bg-[#EAEAEA]",
    textColor: "text-[#0F2942]",
    buttonBg: "bg-[#0066CC] hover:bg-[#0052A3]",
    buttonText: "text-white",
    buttonLabel: "Find Your Deal",
    to: "/inventory?deals=true",
    image: "/images/cards/deal-car-tag.png",
  },
  {
    title: "Need it fast?",
    subtitle: "Based on your location, we've got availability as soon as today!",
    bgColor: "bg-[#0B3968]",
    textColor: "text-white",
    buttonBg: "bg-white hover:bg-gray-100",
    buttonText: "text-[#0066CC]",
    buttonLabel: "Shop by Delivery Date",
    to: "/inventory?fast_delivery=true",
    image: "/images/cards/calendar-truck.png",
  },
  {
    title: "Go the distance",
    subtitle: "We offer a wide variety of vehicles with 40 MPG/MPGe or greater.",
    bgColor: "bg-[#181818]",
    textColor: "text-white",
    buttonBg: "bg-white hover:bg-gray-100",
    buttonText: "text-[#0066CC]",
    buttonLabel: "Shop Fuel Efficient",
    to: "/inventory?efficiency=40mpg",
    image: "/images/cards/fuel-efficient-card.png",
  },
];

export const CONTAINER_CLASS = "max-w-[1400px] mx-auto mb-10";
export const GRID_CLASS = "flex flex-col md:flex-row justify-center gap-6";