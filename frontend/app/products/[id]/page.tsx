"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { StarIcon, ShoppingCartIcon, ArrowLeftIcon } from "@/components/ui/Icons";
import type { Product } from "@/lib/types";

function renderStars(rating: number) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          className={star <= Math.round(rating) ? "text-amber-400" : "text-slate-200"}
        />
      ))}
    </div>
  );
}

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load product");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-24">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="aspect-square animate-pulse rounded-xl bg-slate-200" />
            <div className="space-y-4">
              <div className="h-8 w-3/4 animate-pulse rounded-lg bg-slate-200" />
              <div className="h-4 w-1/4 animate-pulse rounded-lg bg-slate-200" />
              <div className="h-4 w-1/3 animate-pulse rounded-lg bg-slate-200" />
              <div className="h-6 w-1/5 animate-pulse rounded-lg bg-slate-200" />
              <div className="h-20 w-full animate-pulse rounded-lg bg-slate-200" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white pt-24">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-slate-900">Product not found</h1>
          <p className="mt-2 text-slate-500">{error}</p>
          <Link href="/products" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800">
            <ArrowLeftIcon size={16} />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link href="/products" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900">
          <ArrowLeftIcon size={16} />
          Back to Products
        </Link>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
              <img
                src={product.images[selectedImage] || product.thumbnail}
                alt={product.title}
                className="h-full w-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                      i === selectedImage ? "border-slate-900" : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-5">
            <div>
              <span className="mb-2 inline-block rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium capitalize text-slate-600">
                {product.category.replace("-", " ")}
              </span>
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                {product.title}
              </h1>
              {product.brand && (
                <p className="mt-1 text-sm text-slate-500">by {product.brand}</p>
              )}
            </div>

            <div className="flex items-center gap-4">
              {renderStars(product.rating)}
              <span className="text-sm text-slate-500">({product.rating.toFixed(1)})</span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-slate-900">
                ${product.price.toFixed(2)}
              </span>
              {product.discountPercentage > 0 && (
                <>
                  <span className="text-lg text-slate-400 line-through">
                    ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                  </span>
                  <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-sm font-semibold text-emerald-600">
                    -{Math.round(product.discountPercentage)}%
                  </span>
                </>
              )}
            </div>

            <p className="text-sm leading-relaxed text-slate-600">
              {product.description}
            </p>

            <div className="flex flex-wrap gap-6 border-y border-slate-100 py-4 text-sm">
              <div>
                <span className="font-medium text-slate-900">Availability:</span>{" "}
                <span className={product.stock > 0 ? "text-emerald-600" : "text-red-500"}>
                  {product.availabilityStatus}
                </span>
              </div>
              <div>
                <span className="font-medium text-slate-900">Stock:</span>{" "}
                <span className="text-slate-600">{product.stock} units</span>
              </div>
              {product.sku && (
                <div>
                  <span className="font-medium text-slate-900">SKU:</span>{" "}
                  <span className="text-slate-600">{product.sku}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-slate-500">
              {product.shippingInformation && (
                <div className="flex items-center gap-1.5 rounded-lg bg-slate-50 px-3 py-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13" />
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                  {product.shippingInformation}
                </div>
              )}
              {product.warrantyInformation && (
                <div className="flex items-center gap-1.5 rounded-lg bg-slate-50 px-3 py-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                  {product.warrantyInformation}
                </div>
              )}
              {product.returnPolicy && (
                <div className="flex items-center gap-1.5 rounded-lg bg-slate-50 px-3 py-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="1 4 1 10 7 10" />
                    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                  </svg>
                  {product.returnPolicy}
                </div>
              )}
            </div>

            <button className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-slate-800 hover:shadow-md active:scale-[0.98]">
              <ShoppingCartIcon size={18} />
              Add to Cart
            </button>

            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span key={tag} className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {product.reviews && product.reviews.length > 0 && (
          <div className="mt-12 border-t border-slate-100 pt-8">
            <h2 className="mb-6 text-xl font-bold text-slate-900">
              Customer Reviews ({product.reviews.length})
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {product.reviews.map((review, i) => (
                <div key={i} className="rounded-xl border border-slate-200 bg-white p-5">
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-800">
                      {review.reviewerName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{review.reviewerName}</p>
                      <p className="text-xs text-slate-400">{new Date(review.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="mb-2">{renderStars(review.rating)}</div>
                  <p className="text-sm text-slate-600">&ldquo;{review.comment}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
