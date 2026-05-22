"use client";

import { useState } from "react";
import { MailIcon, SendIcon, CheckCircleIcon } from "./ui/Icons";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 inline-flex rounded-xl bg-slate-100 p-3">
            <MailIcon className="text-slate-900" size={24} />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Stay in the Loop
          </h2>
          <p className="mt-3 text-lg text-slate-600">
            Subscribe to receive product updates, exclusive offers, and industry
            insights delivered to your inbox.
          </p>

          {subscribed ? (
            <div className="mt-8 animate-fade-in rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-4">
              <div className="flex items-center justify-center gap-2 text-emerald-700">
                <CheckCircleIcon size={20} />
                <span className="font-medium">Thank you for subscribing!</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-md gap-3">
              <div className="relative flex-1">
                <MailIcon
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  size={16}
                />
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 shadow-sm transition-all focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-slate-800 hover:shadow-md active:scale-[0.98]"
              >
                Subscribe
                <SendIcon size={15} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
