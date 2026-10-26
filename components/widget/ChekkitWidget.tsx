
"use client";

import { MessageSquareMore, } from "lucide-react";
import Script from "next/script";

declare global {
  interface Window {
    chekkitSettings?: {
      app_id: string;
      toggleChat?: () => void;
    };
  }
}

const APP_ID =
  "ce51409273f7e3eded72fb6b8bd0d41enIDDPPVwsmJ3pMCPOkkj4vInHITQUw6RTEJ8W82Xiqo=";

export default function ChekkitWidget() {
  return (
    <>
      <Script
        id="chekkit-settings"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.chekkitSettings = {
              app_id: "${APP_ID}"
            };
          `,
        }}
      />

      <Script
        id="chekkit-webchat"
        src="https://webchat.chekkit.io/v1/webchat.js"
        strategy="afterInteractive"
      />

      
    </>
  );
}
