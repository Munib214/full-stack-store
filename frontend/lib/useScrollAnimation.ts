"use client";

import { useEffect, useRef } from "react";

export function useScrollAnimation() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    const observer = observerRef.current;
    const els = document.querySelectorAll(".scroll-animate");
    els.forEach((el) => observer.observe(el));

    const mutationObserver = new MutationObserver(() => {
      document.querySelectorAll(".scroll-animate:not(.observed)").forEach((el) => {
        el.classList.add("observed");
        observer.observe(el);
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}
