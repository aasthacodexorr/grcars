"use client";

import Script from "next/script";

/**
 * Meta Pixel Component
 * Integrates Facebook/Meta Pixel tracking for the website
 * 
 * 
 * This component:
 * - Loads the Meta Pixel script asynchronously
 * - Initializes the pixel with the provided ID
 * - Tracks PageView events automatically
 * - Includes noscript fallback for users without JavaScript
 */
export function MetaPixel() {
  return (
    <>
      {/* Meta Pixel Script */}
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '2104624033797215');
            fbq('track', 'PageView');
          `,
        }}
      />
      
      {/* Noscript fallback */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=2104624033797215&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>
    </>
  );
}
