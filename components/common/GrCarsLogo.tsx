/* =========================
   GrCarsLogo Component (Common)
   Renders the GrCars brand logo image.
   Used in the Header (desktop + mobile)
   and anywhere else the logo is needed.
   The image is served from /public/GrCars-logo.png.
========================= */

import Image from "next/image";
import { useAppConfig } from "@/app/providers";
import { fallbackValue, defaultAppConfig } from "@/lib/appConfig";
import logo from "@/assets/brand/logo_white.png"

const GrCarsLogo = () => {
  const appConfig = useAppConfig();
  const defaultD = defaultAppConfig.dealership;

  const safeD = {
    dealership_logo: fallbackValue(appConfig.dealership.dealership_logo, defaultD.dealership_logo),
    dealership_name: fallbackValue(appConfig.dealership.dealership_name, defaultD.dealership_name),
  };

  return (
    <>
      {logo ? 
        <div className="lg:col-span-2">
              <div className="flex items-center justify-center ml-4 bg-black">
                <img src={logo?.src} alt="Logo" width={"240"} />
              </div>
          </div>: 
        <p className="text-2xl font-bold uppercase"> Gedi Route </p>
      }
    </>
  );
};

export default GrCarsLogo;
