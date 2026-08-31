"use client";

import { motion } from "framer-motion";
import { useLanguage, DictionaryKey } from "@/context/LanguageContext";

export default function Services() {
  const { t } = useLanguage();

  const services: Array<{ id: string; name: string; descKey: DictionaryKey; status: "running" | "idle" }> = [
    {
      id: "webDevelopment",
      name: "webDevelopment()",
      descKey: "serv_web_desc",
      status: "running",
    },
    {
      id: "backendAPI",
      name: "backendAPI()",
      descKey: "serv_backend_desc",
      status: "running",
    },
    {
      id: "mobileApp",
      name: "mobileApp()",
      descKey: "serv_mobile_desc",
      status: "idle",
    },
    {
      id: "devOpsCloud",
      name: "devOpsCloud()",
      descKey: "serv_devops_desc",
      status: "running",
    },
    {
      id: "uiUxDesign",
      name: "uiUxDesign()",
      descKey: "serv_uiux_desc",
      status: "idle",
    },
    {
      id: "maintenance",
      name: "maintenance()",
      descKey: "serv_maint_desc",
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
          <h2 className="text-3xl md:text-4xl font-bold text-fg-primary">{t("services_heading")}</h2>
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
                {t(service.descKey)}
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
