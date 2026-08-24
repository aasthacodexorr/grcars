import React from "react";

export interface CarfaxTokenAttributes extends React.HTMLAttributes<HTMLElement> {
  "dealer-token"?: string;
}

export interface CarfaxCardAttributes extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  "ti-style"?: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "carfax-trade-in-token": React.DetailedHTMLProps<CarfaxTokenAttributes, HTMLElement>;
      "carfax-trade-in-card": React.DetailedHTMLProps<CarfaxCardAttributes, HTMLElement>;
    }
  }
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "carfax-trade-in-token": React.DetailedHTMLProps<CarfaxTokenAttributes, HTMLElement>;
      "carfax-trade-in-card": React.DetailedHTMLProps<CarfaxCardAttributes, HTMLElement>;
    }
  }
}
