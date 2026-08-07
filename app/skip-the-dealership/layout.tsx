import type { Metadata } from "next";
import { generateMetadata as generateMetadataHelper } from "@/lib/metadataHelper";

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataHelper({
    title: "Skip The Dealership | Buy Cars Online in Canada - GrCars",
    description: "Buy your next car online without dealership pressure. Browse, finance, and get delivery across Canada with GrCars . Fast, simple, and transparent."
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
