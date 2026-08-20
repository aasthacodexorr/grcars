/* =========================
Vehicle Detail Page (VDP)
Server component that fetches a single vehicle
from Typesense by document ID
========================= */

import type { Metadata } from "next";

// Layout
import { Header, Footer } from "@/components/layout";

// Inventory components
import { ImageGallery } from "@/components/inventory";
import VDPWishlistButton from "@/components/inventory/VDPWishlistButton";
// Config, assets & services
import { getConstants } from "@/constants";
import { getVehicleById } from "@/lib/inventoryUrls";
import { stripHtml, parseImageUrls } from "@/utils/formatters";
import { getAppConfig, getSafeDealershipConfig } from "@/lib/appConfig";
import { generateMetadata as generateMetadataHelper } from "@/lib/metadataHelper";
import { headers } from "next/headers";
import AboutVehicle from "@/components/inventory/AboutVehicle";
import { VehicleHeaderAndCTA } from "@/components/inventory/VehicleInfo";
import VehicleDetailsTabsNav from "@/components/inventory/VehicleDetailsTabsNav";
import ViewAllFeaturesButton from "@/components/inventory/ViewAllFeaturesButton";

// Force dynamic rendering — vehicle data changes frequently
export const dynamic = "force-dynamic";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
    try {
        const { slug } = await params;
        const vehicleParam = slug?.[0] || "";
        const firstDash = vehicleParam.indexOf("-");

        if (firstDash === -1) {
            throw new Error("Invalid vehicle param");
        }

        const appConfig = await getAppConfig();
        const id = vehicleParam.substring(0, firstDash);
        const vehicle = await getVehicleById(id, appConfig);

        if (!vehicle) {
            throw new Error("Vehicle not found");
        }

        const titleTemplate = appConfig.site.vdp_page_title_template;
        const descriptionTemplate = appConfig.site.vdp_page_description_template;

        return generateMetadataHelper({
            title: titleTemplate,
            description: descriptionTemplate,
            additionalReplacements: {
                year: String(vehicle.year),
                make: vehicle.make,
                model: vehicle.model,
                trim: vehicle.trim || "",
                dynamic_price_placeholder: "$" + (vehicle.selling_price ? vehicle.selling_price.toLocaleString() : "0"),
            },
        });
    } catch (error) {
        // Fallback to default VDP metadata from config
        const appConfig = await getAppConfig();
        return generateMetadataHelper({
            title: appConfig.site.vdp_page_title_template,
            description: appConfig.site.vdp_page_description_template,
        });
    }
}
const showSidebar = true;

/* Page Component */
export default async function VehicleDetailsPage({
    vehicleParam,
}: {
    vehicleParam: string;
}) {
    const firstDash = vehicleParam.indexOf("-");
    if (firstDash === -1) return null;

    const appConfig = await getAppConfig();
    const safeD = getSafeDealershipConfig(appConfig.dealership);
    const { SITE_CONFIG, DEFAULT_PLACEHOLDER_IMAGE } = getConstants(appConfig);

    const id = vehicleParam.substring(0, firstDash);

    // Use the shared utility to fetch vehicle by ID
    const vehicle = await getVehicleById(id, appConfig);
    if (!vehicle) return null;

    const description = vehicle?.vehicle_description?.replace(/_{10,}/g, "<hr />");

    const titleText = vehicle.title
        ? stripHtml(vehicle.title)
        : `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim}`;

    const images = vehicle.image_urls
        ? parseImageUrls(vehicle.image_urls, SITE_CONFIG.urls.assetBaseUrl)
        : [DEFAULT_PLACEHOLDER_IMAGE || `${SITE_CONFIG.urls.assetBaseUrl}/image/default-placeholder.jpg`];

    const isSold = vehicle.status?.toLowerCase() !== "instock";

    let host = "www.grcars.ca";
    try {
        const headersList = await headers();
        const headerHost = headersList.get("host");
        if (headerHost) {
            host = headerHost;
        }
    } catch (e) { }

    const protocol = host.includes("localhost") || host.includes("127.0.0.1") ? "http" : "https";
    const baseUrl = `${protocol}://${host}`;
    const vehicleUrl = `${baseUrl}/inventory/${vehicleParam}`;

    const carSchema = {
        "@context": "https://schema.org",
        "@type": appConfig.schema_org?.vdp_entity_type || "Car",
        "name": titleText,
        "image": images,
        "description": vehicle.vehicle_description ? stripHtml(vehicle.vehicle_description) : titleText,
        "brand": {
            "@type": "Brand",
            "name": vehicle.make,
        },
        "model": vehicle.model,
        "vehicleModelDate": vehicle.year,
        "color": vehicle.exterior_color || undefined,
        "mileageFromOdometer": vehicle.odometer ? {
            "@type": "QuantitativeValue",
            "value": Number(vehicle.odometer),
            "unitCode": "KMT",
        } : undefined,
        "offers": {
            "@type": "Offer",
            "price": vehicle.selling_price || vehicle.price || "0",
            "priceCurrency": appConfig.schema_org?.currencies_accepted || "CAD",
            "availability": isSold ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
            "itemCondition": "https://schema.org/UsedCondition",
            "url": vehicleUrl,
            "seller": {
                "@type": appConfig.schema_org?.entity_type || "AutoDealer",
                "name": safeD.dealership_name,
                "telephone": safeD.sales_number_1 || safeD.toll_free_number_1 || "",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": safeD.full_address_1,
                    "addressLocality": safeD.city_1,
                    "addressRegion": safeD.province_1,
                    "postalCode": safeD.postal_code_1,
                    "addressCountry": safeD.country_1,
                },
            },
        },
    };

    return (
        <main className="min-h-screen bg-background flex flex-col items-center">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(carSchema) }}
            />
            {/* Header spanning 100% viewport, inside contents are usually centered natively */}
            <div className="w-full bg-hero-bg">
                <Header/>
            </div>

            <section className="w-full bg-background mt-10">
                <div className="w-full pt-[2px] flex-1 mx-auto">

                    {/* CONTAINER WRAPPER */}
                    <div className="max-w-[1440px] xl:max-w-[1600px] mx-auto px-5 md:px-8 lg:px-10 2xl:px-0 w-full">

                        {/* WISHLIST BUTTON (Positioned top-right above Gallery & Sidebar) */}
                        <div id="vdp-top-wishlist" className="flex justify-end w-full mb-4 xl:max-w-[1480px] lg:max-w-[1200px]">
                            <VDPWishlistButton vehicle={vehicle} />
                        </div>

                        {/* SECTION ROW: Controls the boundaries of the sticky sidebar */}
                        <div className="flex flex-col gap-8 lg:flex-row items-stretch relative w-full">

                            {/* Left column: gallery + specs + description */}
                            <div className={`flex flex-col gap-8 items-start flex-1 w-full ${showSidebar ? "lg:flex-1" : "mx-auto"}`}>
                                {/* Image gallery */}
                                <ImageGallery images={images} title={titleText} isSold={isSold} />

                                {/* vehicle header on mobile */}
                                <div className={`flex justify-center w-full lg:hidden -mt-4`}>
                                    <div className="w-full">
                                        <div className="border border-gray-200 rounded-xl bg-white overflow-hidden">
                                            <VehicleHeaderAndCTA vehicle={vehicle} />
                                        </div>
                                    </div>
                                </div>

                                {/* Tab header */}
                                <div className="sticky top-4 z-50 w-full mb-12 bg-white">
                                    <VehicleDetailsTabsNav />
                                </div>

                                {/* Specs grid & Extended Coverage */}
                                <div className="w-full max-w-[925px] mb-10 lg:mb-0">
                                    <AboutVehicle vehicle={vehicle} />
                                    <ViewAllFeaturesButton
                                        standardJson={vehicle.standard}
                                        techSpecsJson={vehicle.technical_specification}
                                        optionalJson={vehicle.optional}
                                    />

                                    {vehicle.vehicle_description && (
                                        <div
                                            id="vehicle-description-section"
                                            className="bg-card border-none rounded-xl p-0 mt-20 scroll-mt-44 flex-wrap"
                                        >
                                            <h2 className="text-[22px] text-center font-semibold text-black mb-[15px]">
                                                Vehicle Description
                                            </h2>
                                            <div
                                                className="prose prose-sm md:prose-base dark:prose-invert max-w-none text-foreground/80 leading-relaxed"
                                                dangerouslySetInnerHTML={{ __html: description }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Right column: sticky sidebar (desktop) */}
                            {showSidebar && (
                                <div className="hidden lg:block lg:w-[450px] xl:w-[450px] 2xl:w-[520px]">
                                    <div className="sticky top-6 h-fit space-y-3">
                                        {/* CTA CARD */}
                                        <div className="max-w-[400px] shadow-xl rounded-xl bg-white overflow-hidden">
                                            <VehicleHeaderAndCTA vehicle={vehicle} />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <div className="w-full mb-18 md:mb-0 lg:mt-10">
                <div className="max-w-[1440px] xl:max-w-[1600px] 2xl:max-w-full  mx-auto w-full">
                    <Footer />
                </div>
            </div>
        </main>
    );
}
