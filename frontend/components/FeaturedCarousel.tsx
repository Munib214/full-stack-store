"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from "./ui/Icons";
import { CarouselSkeleton } from "./ui/Skeleton";
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
    </div>
  );
}

export default function FeaturedCarousel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=20&sortBy=rating&order=desc");
        const data = await res.json();
        setProducts(data.products);
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(products.length - 1, 1));
  }, [products.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  }, [products.length]);

  useEffect(() => {
    if (products.length === 0) return;
    intervalRef.current = setInterval(goNext, 4000);
    return () => clearInterval(intervalRef.current);
  }, [goNext, products.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    clearInterval(intervalRef.current);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext(); else goPrev();
    }
    intervalRef.current = setInterval(goNext, 4000);
  };

  const visibleCount = (() => {
    if (typeof window === "undefined") return 4;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    if (window.innerWidth < 1280) return 3;
    return 4;
  })();

  const maxIndex = Math.max(products.length - visibleCount, 0);

  return (
    <section id="featured" className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Featured Products
            </h2>
            <p className="mt-2 text-lg text-slate-600">
              Top-rated products picked for you
            </p>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <button
              onClick={goPrev}
              disabled={currentIndex === 0}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:bg-slate-50 hover:shadow disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeftIcon size={18} />
            </button>
            <button
              onClick={goNext}
              disabled={currentIndex >= maxIndex}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:bg-slate-50 hover:shadow disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRightIcon size={18} />
            </button>
          </div>
        </div>

        {loading ? (
          <CarouselSkeleton />
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-slate-200 bg-white py-12">
            <p className="text-sm text-slate-500">No featured products available</p>
          </div>
        ) : (
          <div
            ref={containerRef}
            className="overflow-hidden rounded-xl"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex gap-5 transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * (100 / visibleCount + 1.5)}%)` }}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className="min-w-0 shrink-0"
                  style={{ flex: `0 0 calc(${100 / visibleCount}% - ${(5 * (visibleCount - 1)) / visibleCount}px)` }}
                >
                  <Link href={`/products/${product.id}`} className="group block rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                    <div className="relative mb-3 aspect-[4/3] overflow-hidden rounded-lg bg-slate-100">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <h3 className="mb-1 text-sm font-semibold text-slate-900 line-clamp-1">
                      {product.title}
                    </h3>
                    <span className="mb-2 inline-block rounded bg-slate-100 px-2 py-0.5 text-xs font-medium capitalize text-slate-600">
                      {product.category.replace("-", " ")}
                    </span>
                    <div className="mb-2">{renderStars(product.rating)}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-slate-900">
                        {formatPrice(product.price)}
                      </span>
                      <span className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-slate-800 hover:shadow active:scale-[0.97]">
                        View
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-center gap-1.5">
          {products.slice(0, maxIndex + 1).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === currentIndex ? "w-6 bg-slate-900" : "w-2 bg-slate-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
