"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const { lang, toggleLang, t } = useLanguage();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border-subtle bg-bg-primary/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-brand font-bold">
          <Image src="/logo.webp" alt="Hoodtech Logo" width={28} height={28} className="object-contain" />
          <span>hoodtech@dev:~$</span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-fg-muted">
          {["about", "services", "stack", "work", "contact"].map((item) => (
            <Link
              key={item}
              href={`#${item}`}
              className="hover:text-brand transition-colors duration-200"
            >
              /{t(`nav_${item}` as any)}
            </Link>
          ))}
        </div>

        {/* CTA & Lang Toggle */}
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleLang}
            className="text-xs font-bold text-fg-muted hover:text-brand transition-colors"
          >
            [ {lang.toUpperCase()} ]
          </button>
          <Link
            href="#contact"
            className="hidden md:inline-flex h-9 items-center justify-center bg-bg-secondary border border-brand/30 text-brand px-4 text-sm font-medium transition-colors hover:bg-brand/10"
          >
            {"> npm run contact"}
          </Link>
        </div>
      </div>
    </nav>
  );
}
