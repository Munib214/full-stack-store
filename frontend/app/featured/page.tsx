import type { Metadata } from "next";
import FeaturedCarousel from "@/components/FeaturedCarousel";

export const metadata: Metadata = {
  title: "Featured Products — Storefront",
  description: "Discover our top-rated and featured products curated just for you.",
};

export default function FeaturedPage() {
  return <FeaturedCarousel />;
}
