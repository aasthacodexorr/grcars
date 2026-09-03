import Link from "next/link";
import Image from "next/image";
import type { CategoryPillProps } from "./types";
import carImg from "@/assets/cars/car-white-suv 1.png";

interface ExtendedCategoryPillProps extends CategoryPillProps {
  image?: string;
}

const CategoryPill = ({ label, image, href }: ExtendedCategoryPillProps) => {
  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center p-2 w-full transition-transform hover:-translate-y-1 group shrink-0"
    >
      <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors mb-2 text-center truncate w-full">
        {label}
      </span>
      {image && (
        <div className="relative w-full max-w-[110px] h-12 sm:h-16 flex items-center justify-center">
          <Image
            src={image || carImg?.src}
            alt={label}
            width={128}
            height={64}
            className="object-contain drop-shadow-md w-full h-full"
          />
        </div>
      )}
    </Link>
  );
};

export default CategoryPill;