

 
"use client"

import { GetInTouch } from '@/components/common';
import { Footer, Header } from '@/components/layout';
import { getConstants } from '@/constants';
import { useAppConfig } from '@/app/providers';
import { useEffect, useState } from 'react';

const VehicleForm = () => {
  const appConfig = useAppConfig();
  const { SITE_CONFIG } = getConstants(appConfig);

  const [iframeHeight, setIframeHeight] = useState(1450);

  return (
    <>
      <Header />

      <main className='lg:mt-24 mt-56 mb-10'>
        <section className="container mx-auto">
          <div className="w-full overflow-hidden">
            <iframe
              id="service_appointment"
              src={SITE_CONFIG.urls.internalTrade}
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
 