"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckSquare, Terminal, X, ChevronRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import nurilImg from "./img/MuhammadNurilHuda.jpg";

export default function About() {
  const { t } = useLanguage();
  const [showNurilCV, setShowNurilCV] = useState(false);

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
                <span className="text-fg-primary">2025</span>

                <span className="text-fg-muted">Location:</span>
                <span className="text-fg-primary">Semarang, Indonesia</span>

                <span className="text-fg-muted">Team_Size:</span>
                <span className="text-fg-primary">3 developers</span>

                <span className="text-fg-muted">Focus_Areas:</span>
                <span className="text-brand">["Web Apps", "Mobile", "SaaS"]</span>

                <span className="text-fg-muted">Founders:</span>
                <span className="text-brand">["Muh. Nuril", "Bahrul Ilmi"]</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Founders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-20 pt-12 border-t border-border-subtle"
        >
          <div className="flex justify-center mb-10">
            <h3 className="text-xl md:text-2xl font-bold text-fg-primary flex items-center gap-3 font-mono text-center">
              <span className="text-brand animate-pulse">_</span> {t("about_founders_heading")}
            </h3>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24">
            
            <div className="flex items-center gap-5 group cursor-pointer" onClick={() => setShowNurilCV(true)}>
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden bg-bg-secondary border border-border-subtle shrink-0 relative glitch-hover">
                <Image src={nurilImg} alt="Muh. Nuril" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300" unoptimized />
              </div>
              <div className="flex flex-col">
                <div className="text-fg-primary font-bold flex items-center gap-2 text-lg md:text-xl">
                  Muh. Nuril
                  <Terminal className="w-4 h-4 text-brand opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-sm text-brand font-mono mb-3">Co-Founder</div>
                <a href="https://drive.google.com/file/d/1ApQRGquhV1BmvHWOmX7H6jRsMN5_OLZy/view?usp=drive_link" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-2 px-3 py-1.5 bg-bg-secondary border border-border-subtle hover:border-brand text-fg-primary text-xs transition-colors rounded group font-mono w-fit">
                  <span className="text-brand">$</span> ./dl_cv.sh <span className="opacity-0 group-hover:opacity-100 transition-opacity">↓</span>
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-5 group cursor-pointer">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden bg-bg-secondary border border-border-subtle shrink-0 relative glitch-hover">
                {/* Note: User please place ilmi.jpg in public folder */}
                <Image src="/ilmi.jpg" alt="Bahrul Ilmi" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300" unoptimized />
              </div>
              <div className="flex flex-col">
                <div className="text-fg-primary font-bold flex items-center gap-2 text-lg md:text-xl">
                  Bahrul Ilmi
                  <Terminal className="w-4 h-4 text-brand opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-sm text-brand font-mono mb-3">Co-Founder</div>
                <a href="#" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-2 px-3 py-1.5 bg-bg-secondary border border-border-subtle hover:border-brand text-fg-primary text-xs transition-colors rounded group font-mono w-fit">
                  <span className="text-brand">$</span> ./dl_cv.sh <span className="opacity-0 group-hover:opacity-100 transition-opacity">↓</span>
                </a>
              </div>
            </div>

          </div>
        </motion.div>
      </div>

      {/* CV Modal */}
      <AnimatePresence>
        {showNurilCV && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowNurilCV(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl max-h-[90vh] bg-bg-primary border border-border-subtle rounded-xl overflow-hidden shadow-2xl flex flex-col font-mono relative"
            >
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-bg-secondary border-b border-border-subtle shrink-0">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:bg-red-400" onClick={() => setShowNurilCV(false)} />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="text-xs text-fg-muted font-mono flex items-center gap-2">
                  <Terminal className="w-3 h-3" />
                  nuril@hoodtech: ~/cv
                </div>
                <button onClick={() => setShowNurilCV(false)} className="text-fg-muted hover:text-white transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Terminal Content */}
              <div className="p-4 md:p-6 lg:p-8 overflow-y-auto text-sm text-fg-primary leading-relaxed scrollbar-thin scrollbar-thumb-border-subtle scrollbar-track-transparent">
                <div className="mb-6 flex items-center gap-2 text-brand">
                  <ChevronRight className="w-4 h-4" />
                  <span className="typing-animation">cat resume.md</span>
                </div>

                {/* Header */}
                <div className="border-b border-border-subtle pb-6 mb-8">
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">MUHAMMAD NURIL HUDA MAULANI</h1>
                  <h2 className="text-brand text-lg md:text-xl">Fullstack & Creative Web Developer</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                  {/* Left Column - Contact, Skills, Certs, Edu */}
                  <div className="space-y-8 md:col-span-1">
                    {/* Contact */}
                    <div>
                      <h3 className="text-brand font-bold mb-4 border-b border-border-subtle pb-1 inline-block pr-4 uppercase tracking-wider">## Contact</h3>
                      <ul className="space-y-3 text-fg-muted break-all text-xs md:text-sm">
                        <li className="flex flex-col"><span className="text-fg-primary">tel:</span> +62 81227285146</li>
                        <li className="flex flex-col"><span className="text-fg-primary">web:</span> hoodtech.my.id</li>
                        <li className="flex flex-col"><span className="text-fg-primary">email:</span> muhammadnuril155@gmail.com</li>
                        <li className="flex flex-col"><span className="text-fg-primary">github:</span> github.com/KangBasrengg</li>
                        <li className="flex flex-col"><span className="text-fg-primary">addr:</span> Jl. bukit seruni I/81b Semarang</li>
                      </ul>
                    </div>

                    {/* Skills */}
                    <div>
                      <h3 className="text-brand font-bold mb-4 border-b border-border-subtle pb-1 inline-block pr-4 uppercase tracking-wider">## Skills</h3>
                      <ul className="space-y-4 text-fg-muted text-xs md:text-sm">
                        <li><span className="text-fg-primary block mb-1">Tech Stack:</span> Next.js, React, TypeScript, Node.js, Tailwind CSS.</li>
                        <li><span className="text-fg-primary block mb-1">Backend & DB:</span> Supabase, PostgreSQL, REST APIs.</li>
                        <li><span className="text-fg-primary block mb-1">Tools & DevOps:</span> Git/GitHub, cPanel, Vercel/VPS.</li>
                        <li><span className="text-fg-primary block mb-1">Design:</span> UI/UX Design, Figma, Brand Identity.</li>
                        <li><span className="text-fg-primary block mb-1">Integrations:</span> Midtrans, OpenAI API.</li>
                      </ul>
                    </div>

                    {/* Education */}
                    <div>
                      <h3 className="text-brand font-bold mb-4 border-b border-border-subtle pb-1 inline-block pr-4 uppercase tracking-wider">## Education</h3>
                      <ul className="space-y-2 text-fg-muted list-disc list-inside text-xs md:text-sm">
                        <li>Stekom University</li>
                        <li>SMKN 7 Semarang</li>
                        <li>MTs PB Roudlotul Mubtadiin</li>
                        <li>SDN Sendangmulyo 03</li>
                      </ul>
                    </div>

                    {/* Certifications */}
                    <div>
                      <h3 className="text-brand font-bold mb-4 border-b border-border-subtle pb-1 inline-block pr-4 uppercase tracking-wider">## Certs</h3>
                      <ul className="space-y-2 text-fg-muted list-disc list-inside text-xs md:text-sm mb-4">
                        <li>Undip's Professor Talk (2025)</li>
                        <li>Shibori Business Skills (2026)</li>
                      </ul>
                      <a
                        href="https://drive.google.com/drive/folders/1GR0rTLaLSRF6mNIu6EH_zDuDuTmQmkER?usp=drive_link"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-2 bg-bg-secondary border border-border-subtle hover:border-brand hover:text-brand text-fg-primary text-xs transition-all duration-300 rounded group w-full justify-between cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-brand font-bold">$</span>
                          ./view_certificates.sh
                        </span>
                        <ExternalLink className="w-3 h-3 text-fg-muted group-hover:text-brand transition-colors" />
                      </a>
                    </div>
                  </div>

                  {/* Right Column - Profile, Experience */}
                  <div className="space-y-8 md:col-span-2">
                    {/* Profile */}
                    <div>
                      <h3 className="text-brand font-bold mb-4 border-b border-border-subtle pb-1 inline-block pr-4 uppercase tracking-wider">## Profile</h3>
                      <p className="text-fg-muted text-sm leading-relaxed text-justify">
                        A creative FullStack Web Developer with a strong foundation in UI/UX design. Proven experience in architecting, building, and deploying production-ready web applications from the ground up, including an AI SaaS platform and an interactive enterprise website. Passionate about creating visually stunning, highly performant, and user-centric digital experiences using modern technologies like Next.js, TypeScript, and Supabase.
                      </p>
                    </div>

                    {/* Experience */}
                    <div>
                      <h3 className="text-brand font-bold mb-4 border-b border-border-subtle pb-1 inline-block pr-4 uppercase tracking-wider">## Experience</h3>
                      <div className="space-y-8">
                        <div>
                          <div className="text-fg-primary font-bold text-base">Founder & Full-Stack Developer</div>
                          <div className="text-brand text-xs mb-3 mt-1">KonsultanAI (Konsultan-ai.com) | 2025 - Present</div>
                          <ul className="list-disc list-outside ml-4 space-y-2 text-fg-muted text-sm text-justify">
                            <li>Architected and developed a full-scale AI consultancy SaaS platform from concept to live production.</li>
                            <li>Integrated the Midtrans payment gateway to handle real-time subscription processing and AI token/quota logic.</li>
                            <li>Designed a scalable database architecture and authentication system using Supabase and PostgreSQL.</li>
                            <li>Managed end-to-end server deployment, database migrations, and production environment configurations on cPanel.</li>
                          </ul>
                        </div>

                        <div>
                          <div className="text-fg-primary font-bold text-base">Freelance UI/UX & Graphic Designer</div>
                          <div className="text-brand text-xs mb-3 mt-1">Independent (Hoodtech.my.id) | 2025 - Present</div>
                          <ul className="list-disc list-outside ml-4 space-y-2 text-fg-muted text-sm text-justify">
                            <li>Designed intuitive user interfaces (UI) and developed cohesive brand systems, including logos and visual guidelines.</li>
                            <li>Created engaging digital marketing assets and social media content to increase client brand awareness and audience engagement.</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Co-Founder Terminal Block */}
                    <div className="mt-10 md:mt-auto relative border border-border-subtle rounded bg-bg-secondary p-4 md:p-6 font-mono overflow-hidden group">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
                      <div className="absolute right-0 bottom-0 text-brand/5 -rotate-12 translate-x-4 translate-y-4 pointer-events-none transition-transform group-hover:scale-110">
                        <Terminal className="w-32 h-32" />
                      </div>
                      <div className="text-fg-muted text-xs mb-3">{'/* SYSTEM IDENTITY VERIFICATION */'}</div>
                      <div className="text-green-500 text-sm mb-1">{'>'} user.getRole()</div>
                      <div className="text-brand font-bold text-2xl md:text-3xl lg:text-4xl tracking-widest mb-4">
                        "CO-FOUNDER"
                      </div>
                      <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs md:text-sm text-fg-muted border-t border-border-subtle/50 pt-4 relative z-10">
                        <div className="flex flex-col"><span className="text-fg-primary text-[10px] uppercase tracking-wider mb-0.5">Access_Level</span> ROOT_ADMIN</div>
                        <div className="flex flex-col"><span className="text-fg-primary text-[10px] uppercase tracking-wider mb-0.5">Status</span> <span className="text-green-500">ONLINE_ACTIVE</span></div>
                        <div className="flex flex-col"><span className="text-fg-primary text-[10px] uppercase tracking-wider mb-0.5">Department</span> ENG & DESIGN</div>
                        <div className="flex flex-col"><span className="text-fg-primary text-[10px] uppercase tracking-wider mb-0.5">Sys_ID</span> HT-001_NRL</div>
                      </div>
                    </div>

                    <div className="pt-6 flex items-center">
                      <span className="text-brand text-sm mr-1">{'>'}</span>
                      <span className="text-brand animate-pulse text-xl">█</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
