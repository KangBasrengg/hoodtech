"use client";

import { motion } from "framer-motion";

export default function Testimonials() {
  const feedbacks = [
    {
      client: "Budi S.",
      role: "CEO, TechStartup ID",
      content: "Proses development sangat cepat dan rapi. Tim Hoodtech benar-benar paham cara scaling aplikasi di cloud.",
    },
    {
      client: "Rina M.",
      role: "Founder, Retail AI",
      content: "Komunikasi sangat responsif. Hasil UI/UX sesuai dengan yang kita harapkan, clean dan modern.",
    },
    {
      client: "Andi K.",
      role: "CTO, FinTech Solusi",
      content: "Kualitas kode sangat bagus. Sangat mudah bagi tim internal kami untuk maintain aplikasi setelah serah terima.",
    }
  ];

  return (
    <section className="py-24 px-6 border-t border-border-subtle bg-bg-primary">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="text-brand font-medium block mb-2">// client-feedback.log</span>
          <h2 className="text-3xl md:text-4xl font-bold text-fg-primary">Kata mereka</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {feedbacks.map((fb, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="border border-border-subtle bg-bg-secondary p-6 rounded-lg relative"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-brand/50 rounded-t-lg" />
              <div className="text-fg-muted font-mono text-sm mb-4">
                <span className="text-brand">/*</span>
                <br />
                &nbsp;* {fb.content}
                <br />
                <span className="text-brand">&nbsp;*/</span>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-bg-primary border border-border-subtle flex items-center justify-center font-bold text-brand">
                  {fb.client.charAt(0)}
                </div>
                <div>
                  <div className="text-fg-primary font-bold text-sm">{fb.client}</div>
                  <div className="text-fg-muted text-xs">{fb.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
