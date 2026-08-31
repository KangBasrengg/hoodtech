"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLanguage, DictionaryKey } from "@/context/LanguageContext";
import { scrollToSection } from "@/lib/scroll";

const NAV_ITEMS = ["about", "services", "stack", "work", "contact"] as const;

export default function Navbar() {
  const { lang, toggleLang, t } = useLanguage();
  const [activeSection, setActiveSection] = useState<string>("about");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: "-20% 0px -50% 0px",
      threshold: 0,
    });

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    scrollToSection(targetId, 80);
    setActiveSection(targetId);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border-subtle bg-bg-primary/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2 text-brand font-bold group"
        >
          <Image src="/logo.webp" alt="Hoodtech Logo" width={28} height={28} className="object-contain transition-transform group-hover:scale-110" />
          <span className="font-mono">hoodtech@dev:~$</span>
        </Link>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-1 bg-bg-secondary/60 p-1.5 rounded-full border border-border-subtle/80">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item;
            const navKey = `nav_${item}` as DictionaryKey;
            return (
              <a
                key={item}
                href={`#${item}`}
                onClick={(e) => handleNavClick(e, item)}
                className={`relative px-4 py-1.5 text-xs font-mono rounded-full transition-colors duration-200 ${
                  isActive ? "text-brand font-bold" : "text-fg-muted hover:text-fg-primary"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavHighlight"
                    className="absolute inset-0 bg-brand/10 border border-brand/40 rounded-full shadow-[0_0_12px_rgba(0,255,102,0.2)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1">
                  <span>{isActive ? ">" : "/"}</span>
                  <span>{t(navKey)}</span>
                </span>
              </a>
            );
          })}
        </div>

        {/* CTA & Lang Toggle */}
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleLang}
            className="text-xs font-bold text-fg-muted hover:text-brand transition-colors px-2 py-1 rounded bg-bg-secondary border border-border-subtle font-mono"
            aria-label="Toggle language"
          >
            [ {lang.toUpperCase()} ]
          </button>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "contact")}
            className="hidden md:inline-flex h-9 items-center justify-center bg-bg-secondary border border-brand/40 text-brand px-4 text-xs font-mono font-medium rounded transition-all hover:bg-brand/10 hover:border-brand shadow-[0_0_10px_rgba(0,255,102,0.1)]"
          >
            {"> npm run contact"}
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-fg-muted hover:text-brand p-2"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-border-subtle bg-bg-primary/95 backdrop-blur-lg px-6 py-4 flex flex-col gap-3 font-mono text-sm"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item;
              const navKey = `nav_${item}` as DictionaryKey;
              return (
                <a
                  key={item}
                  href={`#${item}`}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`py-2 px-3 rounded-md transition-colors flex items-center justify-between ${
                    isActive ? "bg-brand/10 text-brand font-bold border border-brand/30" : "text-fg-muted hover:text-fg-primary"
                  }`}
                >
                  <span>
                    {isActive ? "> " : "/"}
                    {t(navKey)}
                  </span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />}
                </a>
              );
            })}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "contact")}
              className="mt-2 h-10 flex items-center justify-center bg-brand text-bg-primary font-bold rounded text-xs"
            >
              {"> npm run contact"}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
