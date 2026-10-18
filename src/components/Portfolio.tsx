"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useLanguage, DictionaryKey } from "@/context/LanguageContext";

interface ProjectItem {
  title: string;
  desc: string;
  problem: string;
  solution: string;
  impact: string;
  tags: string[];
  github: string;
  demo?: string;
}

const projects: ProjectItem[] = [
  {
    title: "konsultan-ai.com",
    desc: "Platform SaaS AI Legal-Tech unggulan untuk otomatisasi dokumen hukum dan konsultasi instan berbasis OpenAI API, terintegrasi Midtrans Payment Gateway dan Supabase.",
    problem: "Konsultasi hukum konvensional berbiaya mahal dan lambat, serta kebutuhan integrasi sistem pembayaran langganan dan pembuatan dokumen hukum yang aman.",
    solution: "Mengintegrasikan OpenAI API dengan RAG khusus KUHP Indonesia, sistem checkout otomatis Midtrans Payment Gateway, serta arsitektur cloud Supabase.",
    impact: "Mempercepat draf dokumen hukum 5x lebih cepat, memproses transaksi langganan otomatis, dan memangkas biaya konsultasi awal hingga 80%.",
    tags: ["Next.js", "OpenAI", "Midtrans", "Supabase"],
    github: "https://github.com/KangBasrengg/KonsultanAI",
    demo: "https://konsultan-ai.com",
  },
  {
    title: "CP-ReactGo",
    desc: "Website company profile modern berkonsep Liquid Glass UI (iOS style) yang ringan dan responsif berbasis React 19 dan TypeScript.",
    problem: "Banyak website profil perusahaan memiliki tampilan kaku, generik, dan lambat saat memuat komponen antarmuka yang interaktif.",
    solution: "Merancang arsitektur Vite + TypeScript dengan micro-animation halus dan estetika Liquid Glass untuk pengalaman visual yang memukau.",
    impact: "Mencapai performa sub-detik (Lighthouse 99+) serta memberikan impresi modern dan kredibel untuk branding korporat.",
    tags: ["React", "TypeScript", "Vite", "Tailwind"],
    github: "https://github.com/KangBasrengg/CP-ReactGo",
  },
  {
    title: "CodeMRI",
    desc: "Tools Repository Analyzer — analisis mendalam terhadap arsitektur, dependensi, dan kesehatan codebase Anda secara visual.",
    problem: "Developer sering kesulitan memahami arsitektur legacy code atau codebase baru yang sangat besar.",
    solution: "Membuat parser pintar yang memetakan file dependency dan merendernya dalam grafik interaktif 2D/3D.",
    impact: "Mengurangi waktu onboarding developer baru pada codebase raksasa hingga 40%.",
    tags: ["Next.js", "TypeScript", "D3.js", "AI"],
    github: "https://github.com/KangBasrengg/MRI-Code",
    demo: "https://codemri.vercel.app/",
  },
  {
    title: "FinTrack",
    desc: "Web app pencatatan keuangan pribadi — tracking income & outcome harian dengan dashboard analitik yang intuitif.",
    problem: "Aplikasi keuangan yang ada terlalu kompleks, membuat user malas mencatat pengeluaran harian.",
    solution: "Merancang UI minimalis dengan input kilat (quick-entry) dan visualisasi data yang mudah dipahami sekilas.",
    impact: "Meningkatkan retensi pengguna harian sebesar 65% berkat UX yang ringan dan cepat.",
    tags: ["React", "Vite", "Node.js", "MongoDB"],
    github: "https://github.com/KangBasrengg/FinTrack",
    demo: "https://fintrack-tau-mocha.vercel.app/",
  },
  {
    title: "KasirPOS.exe",
    desc: "Aplikasi Point of Sale minimarket multi-komputer kasir dengan arsitektur LAN client-server dan sinkronisasi data real-time.",
    problem: "Antrian kasir panjang saat jam sibuk dan minimnya sistem POS yang bisa sinkronisasi multi-PC tanpa koneksi internet luar.",
    solution: "Membangun sistem client-server lokal menggunakan FastAPI server dan aplikasi desktop client (.exe) yang otomatis tersinkron via LAN.",
    impact: "Memungkinkan operasional multi-kasir simultan bebas biaya langganan cloud dan kebal terhadap gangguan koneksi internet.",
    tags: ["Python", "FastAPI", "SQLite", "Desktop"],
    github: "https://github.com/KangBasrengg/KasirPOS.exe",
  },
  {
    title: "TokoKas (KasirSantri)",
    desc: "Sistem POS terpadu One Backend, Two Frontends (React web admin + Flutter mobile kasir) untuk pengelolaan toko modern.",
    problem: "Pemilik toko kesulitan menyinkronkan stok barang gudang dengan kasir penjualan secara real-time dan transparan.",
    solution: "Mengembangkan backend terpusat Node.js/PostgreSQL dengan dashboard web analitik dan aplikasi kasir mobile praktis.",
    impact: "Memangkas selisih stok fisik hingga 90% dan mempermudah pemantauan omzet penjualan kapan saja.",
    tags: ["React", "Node.js", "PostgreSQL", "Flutter"],
    github: "https://github.com/KangBasrengg/KasirSantriAPK",
    demo: "https://kasir-santri-apk.vercel.app/",
  },
  {
    title: "Smart Time Management",
    desc: "Aplikasi produktivitas & smart scheduler iOS native dengan calendar multi-view, task prioritas, dan deteksi konflik jadwal otomatis.",
    problem: "Jadwal harian, to-do list, dan janji temu klien sering terpisah di banyak aplikasi hingga memicu jadwal bentrok.",
    solution: "Membangun aplikasi native iOS berbasis SwiftUI dengan fitur smart insight untuk mendeteksi konflik waktu dan integrasi meeting klien.",
    impact: "Meningkatkan efisiensi manajemen agenda harian dan mengeliminasi risiko pertemuan tumpang tindih.",
    tags: ["SwiftUI", "iOS", "Productivity"],
    github: "https://github.com/KangBasrengg/SmartTimeManagement.ipa",
  },
  {
    title: "AI House Design Generator",
    desc: "Web app untuk membuat layout denah rumah secara 2D menggunakan AI — generate desain rumah impian Anda dalam hitungan detik.",
    problem: "Menyewa arsitek untuk sekadar melihat rancangan awal denah rumah terlalu mahal bagi banyak orang.",
    solution: "Mengintegrasikan model AI generatif yang mampu mengubah prompt teks menjadi sketsa denah 2D yang presisi.",
    impact: "Ribuan denah berhasil di-generate per bulan, membantu calon pemilik rumah memvisualisasikan ide mereka secara instan.",
    tags: ["Next.js", "AI", "Canvas", "Tailwind"],
    github: "https://github.com/KangBasrengg/AI-House-Design-Generator",
    demo: "https://ai-house-design-generator.vercel.app/",
  },
];

const AUTO_INTERVAL = 6000; // 6 seconds per card

export default function Portfolio() {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback(
    (index: number, dir: number) => {
      setDirection(dir);
      setCurrent(index);
    },
    []
  );

  const next = useCallback(() => {
    goTo((current + 1) % projects.length, 1);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + projects.length) % projects.length, -1);
  }, [current, goTo]);

  // Auto-advance loop
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, AUTO_INTERVAL);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.95,
    }),
  };

  const project = projects[current];

  return (
    <section id="work" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <span className="text-brand font-medium block mb-2">
            $ git clone hoodtech/portfolio.git
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-fg-primary">
            {t("portfolio_heading")}
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Card Slider */}
          <div className="overflow-hidden rounded-lg">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.25 },
                  scale: { duration: 0.25 },
                }}
                className="border border-border-subtle bg-bg-secondary rounded-lg overflow-hidden"
              >
                {/* Browser Mockup Header */}
                <div className="h-10 bg-bg-primary border-b border-border-subtle flex items-center px-4 gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <div className="mx-auto text-xs text-fg-muted bg-bg-secondary px-4 py-1 rounded-md truncate max-w-[240px]">
                    {project.title}
                  </div>
                  <div className="w-10" />
                </div>

                {/* Card Body */}
                <div className="p-8 md:p-10">
                  <div className="flex flex-col md:flex-row md:items-start gap-8">
                    {/* Left: Project Info */}
                    <div className="flex-1">
                      <h3 className="text-2xl md:text-3xl font-bold text-fg-primary mb-4">
                        {project.title}
                      </h3>
                      <p className="text-fg-muted leading-relaxed mb-6">
                        {t(`proj_${current + 1}_desc` as DictionaryKey)}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-bg-primary border border-border-subtle p-3 rounded-md">
                          <div className="text-xs text-brand font-mono mb-1">{"<Problem />"}</div>
                          <div className="text-sm text-fg-muted leading-relaxed">{t(`proj_${current + 1}_prob` as DictionaryKey)}</div>
                        </div>
                        <div className="bg-bg-primary border border-border-subtle p-3 rounded-md">
                          <div className="text-xs text-brand font-mono mb-1">{"<Solution />"}</div>
                          <div className="text-sm text-fg-muted leading-relaxed">{t(`proj_${current + 1}_sol` as DictionaryKey)}</div>
                        </div>
                        <div className="bg-bg-primary border border-border-subtle p-3 rounded-md md:col-span-2">
                          <div className="text-xs text-brand font-mono mb-1">{"<Impact />"}</div>
                          <div className="text-sm text-fg-primary leading-relaxed">{t(`proj_${current + 1}_imp` as DictionaryKey)}</div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs text-brand bg-brand/10 px-3 py-1.5 rounded-md font-mono"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <Link
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-11 items-center justify-center gap-2 bg-brand text-bg-primary px-6 font-bold rounded-md hover:bg-brand-dark transition-colors text-sm"
                        >
                          <FaGithub size={17} />
                          {t("portfolio_view_repo")}
                        </Link>

                        {project.demo && (
                          <Link
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-11 items-center justify-center gap-2 border border-border-subtle bg-bg-primary text-fg-primary px-5 font-medium rounded-md hover:border-brand/50 hover:text-brand transition-colors text-sm"
                          >
                            <ExternalLink size={15} />
                            {t("portfolio_live_demo")}
                          </Link>
                        )}
                      </div>
                    </div>

                    {/* Right: Terminal Preview */}
                    <div className="hidden md:flex flex-col w-64 lg:w-72 shrink-0 border border-border-subtle bg-bg-primary rounded-lg overflow-hidden h-full">
                      <div className="h-8 bg-bg-primary border-b border-border-subtle flex items-center px-3 shrink-0">
                        <div className="text-[10px] text-fg-muted">
                          preview.sh
                        </div>
                      </div>
                      <div className="p-4 text-xs font-mono text-fg-muted flex flex-col gap-1.5 flex-1 bg-bg-primary/50">
                        <div>
                          <span className="text-brand">$</span> git clone{" "}
                          <span className="text-fg-primary break-all">
                            {project.github.replace("https://github.com/", "")}.git
                          </span>
                        </div>
                        <div className="mt-2">
                          <span className="text-brand">✔</span> Repository:{" "}
                          <span className="text-brand">Public</span>
                        </div>
                        <div>
                          <span className="text-brand">✔</span> Branch:{" "}
                          <span className="text-fg-primary">main</span>
                        </div>
                        <div>
                          <span className="text-brand">✔</span> Status:{" "}
                          <span className="text-fg-primary">
                            {project.demo ? "Deployed" : "Source Code"}
                          </span>
                        </div>
                        <div className="mt-2 pt-2 border-t border-border-subtle/50">
                          <span className="text-yellow-500">ℹ</span> Stack:{" "}
                          <span className="text-fg-primary">{project.tags.slice(0, 2).join(", ")}</span>
                        </div>
                        <div className="mt-2">
                          <span className="text-brand">$</span> git log -1 --format="%s"
                        </div>
                        <div className="truncate text-fg-primary">
                          <span className="text-brand">✔</span> latest release
                        </div>
                        <div className="mt-auto pt-4 text-brand flex items-center gap-2">
                          hoodtech@dev:~$ <span className="w-1.5 h-3 bg-brand animate-pulse" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            {/* Prev / Next / Pause Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 border border-border-subtle bg-bg-secondary rounded-md flex items-center justify-center text-fg-muted hover:text-brand hover:border-brand/50 transition-colors"
                aria-label="Previous project"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => setIsPaused(!isPaused)}
                className={`w-10 h-10 border border-border-subtle rounded-md flex items-center justify-center transition-colors ${
                  isPaused 
                    ? "bg-brand/10 text-brand border-brand/50" 
                    : "bg-bg-secondary text-fg-muted hover:text-brand hover:border-brand/50"
                }`}
                aria-label={isPaused ? "Play" : "Pause"}
              >
                {isPaused ? <Play size={16} className="ml-0.5" /> : <Pause size={16} />}
              </button>
              <button
                onClick={next}
                className="w-10 h-10 border border-border-subtle bg-bg-secondary rounded-md flex items-center justify-center text-fg-muted hover:text-brand hover:border-brand/50 transition-colors"
                aria-label="Next project"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Counter */}
            <div className="text-sm font-mono text-fg-muted">
              <span className="text-brand">{String(current + 1).padStart(2, "0")}</span>
              <span className="mx-1">/</span>
              <span>{String(projects.length).padStart(2, "0")}</span>
            </div>

            {/* Dots Indicator */}
            <div className="flex items-center gap-2">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i, i > current ? 1 : -1)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-8 bg-brand"
                      : "w-3 bg-border-subtle hover:bg-fg-muted"
                  }`}
                  aria-label={`Go to project ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 h-px bg-border-subtle overflow-hidden rounded-full">
            {!isPaused ? (
              <motion.div
                key={current} // resets animation when current changes
                className="h-full bg-brand/50"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: AUTO_INTERVAL / 1000, ease: "linear" }}
              />
            ) : (
              <div className="h-full bg-brand/20 w-full" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
