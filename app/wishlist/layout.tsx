import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Wishlist | GrCars",
  description: "View your saved wishlist of vehicles from GrCars",
};

export default function WishlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
