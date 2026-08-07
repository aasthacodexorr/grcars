import { ReactNode } from "react";

export interface Card {
  title: string;
  subtitle: string;
  bgColor: string;
  textColor: string;
  buttonBg: string;
  buttonText: string;
  buttonLabel: string;
  to: string;
  image?: string;
  customVisual?: ReactNode;
}

export interface NextRideCardProps extends Card {
  alt?: string;
}