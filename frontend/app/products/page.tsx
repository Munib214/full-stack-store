import type { Metadata } from "next";
import ProductListing from "@/components/ProductListing";

export const metadata: Metadata = {
  title: "Products — Storefront",
  description: "Browse our complete catalog of products with real-time search and filtering.",
};

export default function ProductsPage() {
  return <ProductListing />;
}
