"use client";

import { GetInTouch } from "@/components/common";
import { Footer, Header } from "@/components/layout";
import { getConstants } from "@/constants";
import { useAppConfig } from "@/app/providers";
import { useEffect, useState } from "react";

const MIN_HEIGHT = 540;
const FALLBACK_HEIGHT = 900;


const VehicleForm = () => {
    const appConfig = useAppConfig();
    const { SITE_CONFIG } = getConstants(appConfig);

    const [iframeHeight, setIframeHeight] = useState(FALLBACK_HEIGHT);

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            const data = event.data;

            if (
                data &&
                typeof data === "object" &&
                data.element_id === "finance_form" &&
                data.type === "css" &&
                typeof data.value === "number" &&
                Number.isFinite(data.value)
            ) {
                const newHeight = Math.max(
                    MIN_HEIGHT,
                    Math.ceil(data.value)
                );

                setIframeHeight(newHeight);
            }
        };

        window.addEventListener("message", handleMessage);

        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, []);

    return (
        <>
            <Header />

            <main className="lg:mt-24 mt-44 mb-10">
                <section className="container mx-auto">
                    <div className="w-full overflow-hidden">
                        <iframe
                            id="service_appointment"
                            src={SITE_CONFIG.urls.completeCredit}
                            title="Book A Service Appointment"
                            scrolling="no"
                            className="w-full border-0 block transition-[height] duration-300 ease-out"
                            style={{
                                minHeight: `${MIN_HEIGHT}px`,
                                height: `${iframeHeight}px`,
                            }}
                        />
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
};

export default VehicleForm;