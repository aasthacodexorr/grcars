"use client";

import { Footer, Header } from "@/components/layout";
import { getConstants } from "@/constants";
import { useAppConfig } from "@/app/providers";
import { useEffect, useState } from "react";

const VehicleForm = () => {
    const appConfig = useAppConfig();
    const { SITE_CONFIG } = getConstants(appConfig);

    const [iframeHeight, setIframeHeight] = useState(4000);

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            // Optional: validate the sender
            // if (event.origin !== "https://your-form-domain.com") return;

            if (
                event.data?.element_id === "finance_form" &&
                event.data?.type === "css"
            ) {
                const height = Number(event.data.value);

                if (height > 0) {
                    setIframeHeight(height);
                }
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

            <main className="lg:mt-24 mt-56 mb-10">
                <section className="container mx-auto">
                    <h1 className="text-bold text-3xl lg:mt-10">
                        Credit Application 
                    </h1>

                    <div className="w-full overflow-hidden">
                        <iframe
                            id="service_appointment"
                            src={SITE_CONFIG.urls.rCreditApplication}
                            title="Book A Service Appointment"
                            className="w-full border-0"
                            style={{
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