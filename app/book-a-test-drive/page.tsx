 
"use client"

import { GetInTouch } from '@/components/common';
import { Footer, Header } from '@/components/layout';
import { getConstants } from '@/constants';
import { useAppConfig } from '@/app/providers';
import { useEffect, useState } from 'react';

const VehicleForm = () => {
  const appConfig = useAppConfig();
  const { SITE_CONFIG } = getConstants(appConfig);

  const [iframeHeight, setIframeHeight] = useState(1650);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://gediroute.zopsoftware.com') return;

      const { data } = event;

      if (
        data?.element_id === 'service_appointment' &&
        data?.type === 'css' &&
        data?.value
      ) {
        const height = Number(data.value);

        if (!Number.isNaN(height) && height > 0) {
          setIframeHeight(height);
        }
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <>
      <Header />

      <main className='lg:mt-36 mt-56 mb-10'>
        <section className="container mx-auto">
          <h1 className="text-3xl font-bold">Book Test Drive</h1>
 
          <div className="w-full overflow-hidden">
            <iframe
              id="service_appointment"
              src={SITE_CONFIG.urls.bookTestDrive}
              title="Book A Service Appointment"
              className="w-full border-0"
              style={{ height: `${iframeHeight}px` }}
            />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default VehicleForm;
 