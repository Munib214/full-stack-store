"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ShoppingCartIcon, StarIcon } from "./ui/Icons";
import { ProductCardSkeleton } from "./ui/Skeleton";
import type { Product } from "@/lib/types";

function formatPrice(price: number) {
  return `$${price.toFixed(2)}`;
}

function renderStars(rating: number) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          className={star <= Math.round(rating) ? "text-amber-400" : "text-slate-200"}
        />
      ))}
      <span className="ml-1.5 text-xs font-medium text-slate-500">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <Link href={`/products/${product.id}`} className="group flex flex-col rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      <div className="relative aspect-square overflow-hidden rounded-t-xl bg-slate-100">
        {!imgLoaded && !imgError && (
          <div className="absolute inset-0 animate-pulse bg-slate-200" />
        )}
        {imgError ? (
          <div className="flex h-full items-center justify-center text-slate-400">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </div>
        ) : (
          <img
            src={product.thumbnail}
            alt={product.title}
            onLoad={() => setImgLoaded(true)}
            onError={() => { setImgLoaded(true); setImgError(true); }}
            className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
              imgLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
        {product.discountPercentage > 10 && (
          <span className="absolute left-2 top-2 rounded-md bg-slate-900 px-2 py-0.5 text-xs font-semibold text-white">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-slate-900 line-clamp-1">
            {product.title}
          </h3>
          <span className="shrink-0 rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 capitalize">
            {product.category.replace("-", " ")}
          </span>
        </div>
        <p className="line-clamp-2 text-xs leading-relaxed text-slate-500">
          {product.description}
        </p>
        {renderStars(product.rating)}
        <div className="mt-auto flex items-center justify-between pt-2">
          <div>
            <span className="text-lg font-bold text-slate-900">
              {formatPrice(product.price)}
            </span>
            {product.discountPercentage > 5 && (
              <span className="ml-2 text-xs text-slate-400 line-through">
                {formatPrice(
                  +(product.price / (1 - product.discountPercentage / 100)).toFixed(2)
                )}
              </span>
            )}
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-slate-800 hover:shadow active:scale-[0.97]">
            <ShoppingCartIcon size={14} />
            Add
          </span>
        </div>
      </div>
    </Link>
  );
}

function ProductListingInner({ initialSearch = "" }: { initialSearch?: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search] = useState(initialSearch);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=100");
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setProducts(data.products);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filteredProducts = useMemo(() => {
    if (!search) return products;
    const q = search.toLowerCase();
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q)
    );
  }, [products, search]);

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Our Products
          </h2>
          <p className="mt-3 text-lg text-slate-600">
            Browse our complete catalog of {products.length} products
          </p>
        </div>

        <div className="mt-8">
          {loading ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="flex flex-col items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 py-16">
              <div className="rounded-full bg-red-50 p-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" x2="12" y1="8" y2="12" />
                  <line x1="12" x2="12.01" y1="16" y2="16" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Failed to load products</h3>
              <p className="text-sm text-slate-500">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
              >
                Try Again
              </button>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 py-16">
              <div className="rounded-full bg-slate-100 p-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900">No products found</h3>
              <p className="text-sm text-slate-500">No products match your search</p>
            </div>
          ) : (
            <>
              <p className="mb-4 text-sm text-slate-500">
                Showing {filteredProducts.length} of {products.length} products
              </p>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="scroll-animate"
                    style={{ transitionDelay: `${(index % 8) * 60}ms` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default function ProductListing() {
  return (
    <Suspense fallback={
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-8 max-w-7xl mx-auto">
        {Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}
      </div>
    }>
      <ProductListingInnerWrapper />
    </Suspense>
  );
}

function ProductListingInnerWrapper() {
  const searchParams = useSearchParams();
  const urlSearch = searchParams.get("search") || "";
  return <ProductListingInner key={urlSearch || "__all"} initialSearch={urlSearch} />;
}
