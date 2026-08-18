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
import logo from "@/assets/pages/grcarslogo.png"

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
        <img src={logo?.src}/> : 
        <p className="text-2xl font-bold uppercase"> Gedi Route </p>
      }
    </>
  );
};

export default GrCarsLogo;
