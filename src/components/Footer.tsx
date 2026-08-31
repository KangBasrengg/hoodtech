"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { scrollToSection } from "@/lib/scroll";

export default function Footer() {
  const { t } = useLanguage();

  const handleSitemapClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    scrollToSection(targetId, 80);
  };

  return (
    <footer className="bg-bg-primary pt-20 pb-10 px-6 border-t border-border-subtle">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-2">
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 text-brand font-bold mb-4 group"
          >
            <Image src="/logo.webp" alt="Hoodtech Logo" width={32} height={32} className="object-contain transition-transform group-hover:scale-110" />
            <span className="text-lg">hoodtech@dev:~$</span>
          </Link>
          <p className="text-fg-muted max-w-sm">
            {t("footer_desc")}
          </p>
        </div>

        <div>
          <h4 className="text-fg-primary font-bold mb-4 font-mono">./sitemap</h4>
          <ul className="flex flex-col gap-2 text-fg-muted text-sm font-mono">
            <li>
              <a href="#about" onClick={(e) => handleSitemapClick(e, "about")} className="hover:text-brand transition-colors cursor-pointer">
                ├── about.md
              </a>
            </li>
            <li>
              <a href="#services" onClick={(e) => handleSitemapClick(e, "services")} className="hover:text-brand transition-colors cursor-pointer">
                ├── services.json
              </a>
            </li>
            <li>
              <a href="#stack" onClick={(e) => handleSitemapClick(e, "stack")} className="hover:text-brand transition-colors cursor-pointer">
                ├── package.json
              </a>
            </li>
            <li>
              <a href="#work" onClick={(e) => handleSitemapClick(e, "work")} className="hover:text-brand transition-colors cursor-pointer">
                └── portfolio.git
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-fg-primary font-bold mb-4 font-mono">./contact</h4>
          <ul className="flex flex-col gap-2 text-fg-muted text-sm font-mono">
            <li>
              <a href="mailto:admin@hoodtech.my.id" className="hover:text-brand transition-colors">
                ├── admin@hoodtech.my.id
              </a>
            </li>
            <li>
              <span className="text-border-subtle">├──</span> Kab. Semarang, ID
            </li>
            <li>
              <a href="https://www.linkedin.com/in/muhammad-nuril-huda-maulani-9b2102342/" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors">
                ├── linkedin
              </a>
            </li>
            <li>
              <a href="https://github.com/KangBasrengg/" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors">
                └── github
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-border-subtle text-center text-fg-muted font-mono text-sm">
        <span className="text-brand">/*</span>
        <span className="mx-2">© 2026 Hoodtech. All rights reserved.</span>
        <span className="text-brand">*/</span>
      </div>
    </footer>
  );
}
