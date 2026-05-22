"use client";

import Link from "next/link";
import { FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon } from "./ui/Icons";

const footerLinks = {
  Products: [
    { label: "All Products", href: "/products" },
    { label: "Featured", href: "/featured" },
  ],
  Company: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
    { label: "Blog", href: "#" },
  ],
  Support: [
    { label: "Help Center", href: "#" },
    { label: "Contact Us", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

const socialLinks = [
  { icon: FacebookIcon, href: "#", label: "Facebook" },
  { icon: TwitterIcon, href: "#", label: "Twitter" },
  { icon: InstagramIcon, href: "#", label: "Instagram" },
  { icon: LinkedinIcon, href: "#", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-sm font-bold text-white">
                S
              </div>
              <span className="text-lg font-semibold tracking-tight text-slate-900">
                Storefront
              </span>
            </Link>
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-slate-500">
              Your trusted marketplace for premium products. We connect
              businesses with high-quality inventory, competitive pricing, and
              seamless ordering experiences.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-all hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 text-sm font-semibold text-slate-900">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 transition-colors hover:text-slate-900"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-100 py-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-slate-400">
              &copy; {new Date().getFullYear()} Storefront. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-slate-400 transition-colors hover:text-slate-900">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-slate-400 transition-colors hover:text-slate-900">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-slate-400 transition-colors hover:text-slate-900">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
