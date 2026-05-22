"use client";

import { useEffect, useRef } from "react";
import { ArrowRightIcon, CheckCircleIcon } from "./ui/Icons";

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.classList.add("animate-fade-in-up");
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative overflow-hidden bg-white pt-24 opacity-0"
    >
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 sm:pb-20 lg:px-8 lg:pb-28 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-8">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-800">
              <span className="flex h-2 w-2 rounded-full bg-slate-900" />
              Premium Product Dashboard
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Discover Premium{" "}
              <span className="text-slate-900">Products</span>{" "}
              for Your Business
            </h1>

            <p className="max-w-lg text-lg leading-relaxed text-slate-600">
              Browse through our curated collection of high-quality products.
              Real-time inventory, competitive pricing, and seamless ordering
              experience all in one place.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#products"
                className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-slate-800 hover:shadow-md active:scale-[0.98]"
              >
                Browse Products
                <ArrowRightIcon size={16} />
              </a>
              <a
                href="#featured"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:shadow-md active:scale-[0.98]"
              >
                View Featured
              </a>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {["Free Shipping", "24/7 Support", "Secure Payments"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircleIcon className="text-slate-900" size={16} />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="relative grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-4">
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="mb-2 aspect-[4/3] rounded-lg bg-slate-100">
                    <img
                      src="https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png"
                      alt="Product"
                      className="h-full w-full rounded-lg object-cover"
                    />
                  </div>
                  <p className="text-sm font-medium text-slate-800">Mascara</p>
                  <p className="text-sm font-semibold text-slate-900">$9.99</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="mb-2 aspect-[4/3] rounded-lg bg-slate-100">
                    <img
                      src="https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/thumbnail.png"
                      alt="Product"
                      className="h-full w-full rounded-lg object-cover"
                    />
                  </div>
                  <p className="text-sm font-medium text-slate-800">Eyeshadow</p>
                  <p className="text-sm font-semibold text-slate-900">$19.99</p>
                </div>
              </div>
              <div className="mt-8 flex flex-col gap-4">
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="mb-2 aspect-[4/3] rounded-lg bg-slate-100">
                    <img
                      src="https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/thumbnail.png"
                      alt="Product"
                      className="h-full w-full rounded-lg object-cover"
                    />
                  </div>
                  <p className="text-sm font-medium text-slate-800">CK One</p>
                  <p className="text-sm font-semibold text-slate-900">$49.99</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="mb-2 aspect-[4/3] rounded-lg bg-slate-100">
                    <img
                      src="https://cdn.dummyjson.com/products/images/smartphones/iPhone%206/thumbnail.png"
                      alt="Product"
                      className="h-full w-full rounded-lg object-cover"
                    />
                  </div>
                  <p className="text-sm font-medium text-slate-800">iPhone 6</p>
                  <p className="text-sm font-semibold text-slate-900">$349.99</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-1 left-0 right-0 h-px bg-slate-100" />
    </section>
  );
}
