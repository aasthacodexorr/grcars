"use client";

import { Footer, Header } from "@/components/layout";
import { getConstants } from "@/constants";
import { useAppConfig } from "@/app/providers";

const VehicleForm = () => {
    const appConfig = useAppConfig();
    const { SITE_CONFIG } = getConstants(appConfig);

    return (
        <>
            
            <main className="lg:mt-24 mt-56 mb-10">
                <section className="container mx-auto">
                    <div className="w-full overflow-hidden">
                        <iframe
                            id="service_appointment"
                            src={SITE_CONFIG.urls.equifax}
                            title="Book A Service Appointment"
                            className="w-full border-0"
                            style={{
                                height: `1000px`,
                            }}
                        />
                    </div>
                </section>
            </main>

            
        </>
    );
};

export default VehicleForm;