
"use client";

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

      <button
        type="button"
        onClick={() => window.chekkitSettings?.toggleChat?.()}
        className="fixed bottom-6 cursor-pointer left-6 z-[9999] rounded-full border-0 bg-[#2563eb] px-7 py-3 text-base font-semibold text-white shadow-[0_2px_6px_rgba(37,99,235,0.4)] transition hover:bg-blue-700"
      >
        Text Us
      </button>
    </>
  );
}
