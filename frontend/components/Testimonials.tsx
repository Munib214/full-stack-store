"use client";

import { useState, useEffect } from "react";
import { StarIcon, QuoteIcon } from "./ui/Icons";
import { TestimonialCardSkeleton } from "./ui/Skeleton";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  text: string;
  rating: number;
}

const fallbackTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "TechCorp",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    text: "The product catalog is incredibly comprehensive. We found exactly what we needed with competitive pricing and excellent quality.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "E-commerce Director",
    company: "ShopGlobal",
    avatar: "https://i.pravatar.cc/150?u=michael",
    text: "Outstanding selection and seamless ordering process. The real-time inventory updates have transformed our supply chain.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Procurement Lead",
    company: "Innovate Inc",
    avatar: "https://i.pravatar.cc/150?u=emily",
    text: "Reliable platform with consistent quality across all products. Their customer service team is remarkably responsive.",
    rating: 4,
  },
  {
    id: 4,
    name: "David Kim",
    role: "Operations Manager",
    company: "Prime Retail",
    avatar: "https://i.pravatar.cc/150?u=david",
    text: "We've been using this platform for over a year now. The variety, pricing, and delivery speed are unmatched.",
    rating: 5,
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Business Owner",
    company: "Thompson & Co",
    avatar: "https://i.pravatar.cc/150?u=lisa",
    text: "As a small business owner, I appreciate the flexibility and support. The platform makes bulk purchasing effortless.",
    rating: 5,
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Supply Chain Analyst",
    company: "LogiPro",
    avatar: "https://i.pravatar.cc/150?u=james",
    text: "Excellent data integration and reporting features. The detailed product specifications help us make informed decisions.",
    rating: 4,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          className={star <= rating ? "text-amber-400" : "text-slate-200"}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("https://dummyjson.com/users?limit=6");
        const data = await res.json();
        const users = data.users;
        const mapped: Testimonial[] = users.map(
          (user: { id: number; firstName: string; lastName: string; company: { title: string; name: string }; image: string }, i: number) => ({
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
            role: user.company?.title || "Customer",
            company: user.company?.name || "Business",
            avatar: user.image,
            text: fallbackTestimonials[i]?.text || "Great experience using this platform. Highly recommended for all business needs.",
            rating: fallbackTestimonials[i]?.rating || 5,
          })
        );
        setTestimonials(mapped);
      } catch {
        setTestimonials(fallbackTestimonials);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <section id="testimonials" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            What Our Clients Say
          </h2>
          <p className="mt-3 text-lg text-slate-600">
            Trusted by businesses worldwide
          </p>
        </div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <TestimonialCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, index) => (
              <div
                key={t.id}
                className="scroll-animate group relative rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <QuoteIcon className="absolute right-4 top-4 text-slate-900" size={40} />
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-slate-200">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-500">
                      {t.role} at {t.company}
                    </p>
                  </div>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-slate-600">
                  &ldquo;{t.text}&rdquo;
                </p>
                <StarRating rating={t.rating} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
