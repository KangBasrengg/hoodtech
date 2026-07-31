"use client";

import { motion } from "framer-motion";
import { CheckSquare } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import nurilImg from "./img/MuhammadNurilHuda.jpg";

export default function About() {
  const { t } = useLanguage();
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="text-brand font-medium block mb-2">$ cat about.md</span>
          <h2 className="text-3xl md:text-4xl font-bold text-fg-primary">{t("about_heading")}</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6 text-fg-muted leading-relaxed"
          >
            <p>
              {t("about_desc")}
            </p>
            <div className="flex flex-col gap-3 mt-4 mb-10">
              {[
                t("about_check_1"),
                t("about_check_2"),
                t("about_check_3"),
                t("about_check_4")
              ].map((value, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckSquare className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                  <span>{value}</span>
                </div>
              ))}
            </div>

            {/* Founders */}
            <div className="grid grid-cols-2 gap-6 mt-4 pt-8 border-t border-border-subtle">
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-bg-secondary border border-border-subtle shrink-0 relative glitch-hover">
                  <Image src={nurilImg} alt="Muh. Nuril" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300" unoptimized />
                </div>
                <div>
                  <div className="text-fg-primary font-bold">Muh. Nuril</div>
                  <div className="text-xs text-brand font-mono">Co-Founder</div>
                </div>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-bg-secondary border border-border-subtle shrink-0 relative glitch-hover">
                  {/* Note: User please place ilmi.jpg in public folder */}
                  <Image src="/ilmi.jpg" alt="Bahrul Ilmi" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300" unoptimized />
                </div>
                <div>
                  <div className="text-fg-primary font-bold">Bahrul Ilmi</div>
                  <div className="text-xs text-brand font-mono">Co-Founder</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column (Metadata) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="border border-border-subtle bg-bg-secondary rounded-lg p-6 font-mono text-sm shadow-xl"
          >
            <div className="flex flex-col gap-4">
              <div className="border-b border-border-subtle pb-4 mb-2">
                <span className="text-brand">---</span><br />
                <span className="text-fg-primary">title:</span> "about.md"<br />
                <span className="text-fg-primary">type:</span> "metadata"<br />
                <span className="text-brand">---</span>
              </div>

              <div className="grid grid-cols-[120px_1fr] gap-2">
                <span className="text-fg-muted">Company:</span>
                <span className="text-fg-primary">Hoodtech</span>

                <span className="text-fg-muted">Founded:</span>
                <span className="text-fg-primary">2020</span>

                <span className="text-fg-muted">Location:</span>
                <span className="text-fg-primary">Semarang, Indonesia</span>

                <span className="text-fg-muted">Team_Size:</span>
                <span className="text-fg-primary">8 developers</span>

                <span className="text-fg-muted">Focus_Areas:</span>
                <span className="text-brand">["Web Apps", "Mobile", "SaaS"]</span>

                <span className="text-fg-muted">Founders:</span>
                <span className="text-brand">["Muh. Nuril", "Bahrul Ilmi"]</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
