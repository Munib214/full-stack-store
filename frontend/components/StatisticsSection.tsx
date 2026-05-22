"use client";

import { useEffect, useRef, useState } from "react";
import {
  PackageIcon,
  CategoriesIcon,
  UsersIcon,
  OrderIcon,
  DollarIcon,
} from "./ui/Icons";
import { StatCardSkeleton } from "./ui/Skeleton";

interface StatItem {
  label: string;
  value: number;
  prefix: string;
  suffix: string;
  icon: typeof PackageIcon;
  color: string;
  bgColor: string;
}

const stats: StatItem[] = [
  { label: "Total Products", value: 194, prefix: "", suffix: "", icon: PackageIcon, color: "text-slate-900", bgColor: "bg-slate-100" },
  { label: "Categories", value: 30, prefix: "", suffix: "+", icon: CategoriesIcon, color: "text-emerald-600", bgColor: "bg-emerald-50" },
  { label: "Active Users", value: 208, prefix: "", suffix: "+", icon: UsersIcon, color: "text-slate-900", bgColor: "bg-slate-100" },
  { label: "Orders", value: 547, prefix: "", suffix: "+", icon: OrderIcon, color: "text-slate-600", bgColor: "bg-slate-100" },
  { label: "Revenue", value: 128500, prefix: "$", suffix: "+", icon: DollarIcon, color: "text-emerald-600", bgColor: "bg-emerald-50" },
];

function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 1500,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !counted.current) {
            counted.current = true;
            const start = performance.now();
            const step = (now: number) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setCount(Math.floor(eased * value));
              if (progress < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function StatisticsSection() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Platform Statistics
          </h2>
          <p className="mt-3 text-lg text-slate-600">
            Real-time metrics from our product catalog
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {loading
            ? Array.from({ length: 5 }).map((_, i) => <StatCardSkeleton key={i} />)
            : stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="scroll-animate group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="mb-4 flex items-center gap-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.bgColor} ${stat.color}`}
                      >
                        <Icon size={22} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-500">
                          {stat.label}
                        </p>
                        <p className={`text-2xl font-bold ${stat.color}`}>
                          <AnimatedCounter
                            value={stat.value}
                            prefix={stat.prefix}
                            suffix={stat.suffix}
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </section>
  );
}
