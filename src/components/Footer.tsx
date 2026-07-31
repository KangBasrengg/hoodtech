"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-bg-primary pt-20 pb-10 px-6 border-t border-border-subtle">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-2">
          <Link href="/" className="flex items-center gap-2 text-brand font-bold mb-4">
            <Image src="/logo.webp" alt="Hoodtech Logo" width={32} height={32} className="object-contain" />
            <span className="text-lg">hoodtech@dev:~$</span>
          </Link>
          <p className="text-fg-muted max-w-sm">
            {t("footer_desc")}
          </p>
        </div>

        <div>
          <h4 className="text-fg-primary font-bold mb-4 font-mono">./sitemap</h4>
          <ul className="flex flex-col gap-2 text-fg-muted text-sm font-mono">
            <li><Link href="#about" className="hover:text-brand transition-colors">├── about.md</Link></li>
            <li><Link href="#services" className="hover:text-brand transition-colors">├── services.json</Link></li>
            <li><Link href="#stack" className="hover:text-brand transition-colors">├── package.json</Link></li>
            <li><Link href="#work" className="hover:text-brand transition-colors">└── portfolio.git</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-fg-primary font-bold mb-4 font-mono">./contact</h4>
          <ul className="flex flex-col gap-2 text-fg-muted text-sm font-mono">
            <li><a href="mailto:admin@hoodtech.my.id" className="hover:text-brand transition-colors">├── admin@hoodtech.my.id</a></li>
            <li><span className="text-border-subtle">├──</span> Kab. Semarang, ID</li>
            <li><a href="https://www.linkedin.com/in/muhammad-nuril-huda-maulani-9b2102342/" className="hover:text-brand transition-colors">├── linkedin</a></li>
            <li><a href="https://github.com/KangBasrengg/" className="hover:text-brand transition-colors">└── github</a></li>
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
