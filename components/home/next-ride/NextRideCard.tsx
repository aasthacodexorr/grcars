// NextRideCard.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import type { NextRideCardProps } from "./types";
import carImg from "@/assets/cars/car-white-suv 1.png";

interface FeatureCardProps extends Omit<NextRideCardProps, "image"> {
  bgColor: string;
  textColor: string;
  buttonBg: string;
  buttonText: string;
  buttonLabel: string;
  image?: string;
  customVisual?: React.ReactNode;
}

const NextRideCard = ({
  title,
  subtitle,
  to,
  bgColor,
  textColor,
  buttonBg,
  buttonText,
  buttonLabel,
  image,
  customVisual,
}: FeatureCardProps) => {
  return (
    <div
className={`rounded-3xl p-6 flex flex-col justify-between w-full md:w-[300px] md:min-w-[300px] md:max-w-[300px] h-[400px] md:snap-start shrink-0 ${bgColor} ${textColor} transition-transform duration-200 hover:-translate-y-1`}    >
      {/* Top Header Section */}
      <div>
        <h3 className="text-2xl font-bold leading-tight mb-2">{title}</h3>
        <p className="text-sm opacity-80 line-clamp-3 leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Center Visual/Graphic Section */}
      <div className="relative my-auto flex items-center justify-center min-h-[180px] w-full">
        {customVisual ? (
          customVisual
        ) : (
          image && (
            <div className="relative w-full h-[180px] flex items-center justify-center">
              <Image
                src={carImg?.src}
                alt={title}
                width={300}
                height={200}
                className="object-contain drop-shadow-xl"
              />
            </div>
          )
        )}
      </div>

      {/* Bottom CTA Button */}
      <Link
        href={to}
        className={`w-full py-3.5 px-4 rounded-full text-center text-sm font-semibold transition-all shadow-sm ${buttonBg} ${buttonText}`}
      >
        {buttonLabel}
      </Link>
    </div>
  );
};

export default NextRideCard;