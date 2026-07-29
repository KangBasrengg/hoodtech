"use client";

import { motion } from "framer-motion";

export default function Process() {
  const steps = [
    { commit: "a1b2c3d", message: "init: project discovery & requirements gathering" },
    { commit: "e4f5g6h", message: "feat: wireframing and UI/UX design" },
    { commit: "i7j8k9l", message: "feat: frontend and backend development" },
    { commit: "m0n1o2p", message: "test: QA, testing, and bug fixing" },
    { commit: "q3r4s5t", message: "deploy: production release" },
    { commit: "u6v7w8x", message: "chore: maintenance and support" },
  ];

  return (
    <section className="py-24 px-6 bg-bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <span className="text-brand font-medium block mb-2">$ git log --oneline --graph</span>
          <h2 className="text-3xl md:text-4xl font-bold text-fg-primary">Alur kerja kami</h2>
        </div>

        <div className="relative pl-4 md:pl-0">
          {/* Vertical Line */}
          <div className="absolute left-[11px] md:left-[11px] top-4 bottom-4 w-px bg-border-subtle" />

          <div className="flex flex-col gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.commit}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex items-center gap-6"
              >
                {/* Node */}
                <div className="relative z-10 w-6 h-6 rounded-full bg-bg-primary border-2 border-brand flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-brand" />
                </div>

                {/* Content */}
                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 font-mono text-sm">
                  <span className="text-yellow-500">{step.commit}</span>
                  <span className="text-fg-primary">{step.message}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
