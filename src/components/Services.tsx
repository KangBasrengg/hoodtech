"use client";

import { motion } from "framer-motion";

export default function Services() {
  const services = [
    {
      id: "webDevelopment",
      name: "webDevelopment()",
      desc: "Custom web applications using modern stacks like React, Next.js, and Vue.",
      status: "running",
    },
    {
      id: "backendAPI",
      name: "backendAPI()",
      desc: "Robust, scalable backend architectures with Node.js, Go, or Python.",
      status: "running",
    },
    {
      id: "mobileApp",
      name: "mobileApp()",
      desc: "Cross-platform mobile applications using React Native or Flutter.",
      status: "idle",
    },
    {
      id: "devOpsCloud",
      name: "devOpsCloud()",
      desc: "Cloud infrastructure setup, CI/CD pipelines, and server management.",
      status: "running",
    },
    {
      id: "uiUxDesign",
      name: "uiUxDesign()",
      desc: "User-centric interface design and prototyping via Figma.",
      status: "idle",
    },
    {
      id: "maintenance",
      name: "maintenance()",
      desc: "Ongoing support, bug fixes, and feature enhancements for your apps.",
      status: "running",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="services" className="py-24 px-6 bg-bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="text-brand font-medium block mb-2">$ cat services.json</span>
          <h2 className="text-3xl md:text-4xl font-bold text-fg-primary">What we build</h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              className="border border-border-subtle bg-bg-primary rounded-lg p-6 hover:border-brand/50 transition-colors group"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-brand font-bold text-lg group-hover:text-brand-dark transition-colors">
                  {service.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${service.status === 'running' ? 'bg-brand animate-pulse' : 'bg-fg-muted'}`} />
                  <span className="text-xs text-fg-muted uppercase">{service.status}</span>
                </div>
              </div>
              <p className="text-fg-muted text-sm leading-relaxed">
                {service.desc}
              </p>
              <div className="mt-6 text-xs text-border-subtle select-none">
                {"{"} ... {"}"}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
