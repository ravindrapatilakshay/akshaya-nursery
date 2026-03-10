"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/catalog", label: "Catalog" },
  { href: "/order", label: "Order" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = pathname === "/";
  const navBg =
    scrolled || !isHome
      ? "bg-white/97 shadow-md"
      : "bg-transparent";
  const textColor =
    scrolled || !isHome ? "text-green-dark" : "text-white";
  const linkColor =
    scrolled || !isHome ? "text-gray-700 hover:text-whatsapp" : "text-white/90 hover:text-whatsapp";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
    >
      <div className="w-full px-6 py-4 flex items-center justify-between">
        <Link href="/" className={`text-[1.8rem] font-bold ${textColor} flex items-center gap-1.5 transition-colors`}>
          <span>🌿</span> Akshaya Farms
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-medium transition-colors ${
                pathname === link.href
                  ? "text-whatsapp font-semibold"
                  : linkColor
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-0.5 transition-all ${
              scrolled || !isHome ? "bg-green-dark" : "bg-white"
            } ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
          />
          <span
            className={`w-6 h-0.5 transition-all ${
              scrolled || !isHome ? "bg-green-dark" : "bg-white"
            } ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`w-6 h-0.5 transition-all ${
              scrolled || !isHome ? "bg-green-dark" : "bg-white"
            } ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-[70%] max-w-[280px] bg-white shadow-xl transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } pt-20 px-8 flex flex-col gap-6`}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className={`text-lg font-medium ${
              pathname === link.href
                ? "text-whatsapp font-semibold"
                : "text-gray-700 hover:text-whatsapp"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/30 z-[-1]"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </nav>
  );
}
