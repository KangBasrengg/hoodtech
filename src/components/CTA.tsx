"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";

type FormState = "idle" | "sending" | "success" | "error";

export default function CTA() {
  const { t } = useLanguage();
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    project: "",
    budget: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Gagal mengirim pesan.");
      }

      setFormState("success");
      setForm({ name: "", email: "", project: "", budget: "", message: "" });

      // Reset after 6 seconds
      setTimeout(() => setFormState("idle"), 6000);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Terjadi kesalahan.");
      setFormState("error");
      setTimeout(() => setFormState("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-bg-secondary">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <span className="text-brand font-medium block mb-2">
            $ npm run contact
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-fg-primary">
            {t("cta_heading")}
          </h2>
          <p className="text-fg-muted mt-3 max-w-xl">
            {t("cta_desc")}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* ── Contact Form (3/5) ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3 border border-border-subtle bg-bg-primary rounded-lg overflow-hidden shadow-2xl"
          >
            {/* Terminal Header */}
            <div className="h-10 bg-bg-primary border-b border-border-subtle flex items-center px-4 gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <div className="mx-auto text-xs text-fg-muted">
                contact-form.sh
              </div>
              <div className="w-10" />
            </div>

            {/* Form Body */}
            <div className="p-6 md:p-8">
              <AnimatePresence mode="wait">
                {formState === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <CheckCircle className="w-16 h-16 text-brand mb-4" />
                    <h3 className="text-xl font-bold text-fg-primary mb-2">
                      {t("cta_success_heading")}
                    </h3>
                    <p className="text-fg-muted text-sm font-mono">
                      <span className="text-brand">✔</span> {t("cta_success_1")}
                      <br />
                      <span className="text-brand">✔</span> {t("cta_success_2")}
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    ref={formRef}
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-5"
                  >
                    {/* Name + Email Row */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-fg-muted font-mono">
                          <span className="text-brand">$</span> name
                          <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder={t("cta_placeholder_name")}
                          className="bg-bg-secondary border border-border-subtle rounded-md h-11 px-4 text-fg-primary text-sm font-mono focus:outline-none focus:border-brand transition-colors placeholder:text-fg-muted/40"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-fg-muted font-mono">
                          <span className="text-brand">$</span> email
                          <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="you@company.com"
                          className="bg-bg-secondary border border-border-subtle rounded-md h-11 px-4 text-fg-primary text-sm font-mono focus:outline-none focus:border-brand transition-colors placeholder:text-fg-muted/40"
                        />
                      </div>
                    </div>

                    {/* Project Type + Budget Row */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-fg-muted font-mono">
                          <span className="text-brand">$</span> project_type
                        </label>
                        <select
                          name="project"
                          value={form.project}
                          onChange={handleChange}
                          className="bg-bg-secondary border border-border-subtle rounded-md h-11 px-4 text-fg-primary text-sm font-mono focus:outline-none focus:border-brand transition-colors appearance-none cursor-pointer"
                        >
                          <option value="">{t("cta_select_default")}</option>
                          <option value="Web Application">Web Application</option>
                          <option value="Mobile Application">Mobile Application</option>
                          <option value="Backend / API">Backend / API</option>
                          <option value="Full-Stack SaaS">Full-Stack SaaS</option>
                          <option value="UI/UX Design">UI/UX Design</option>
                          <option value="Maintenance">Maintenance</option>
                          <option value="Lainnya">Lainnya</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-fg-muted font-mono">
                          <span className="text-brand">$</span> budget_range
                        </label>
                        <select
                          name="budget"
                          value={form.budget}
                          onChange={handleChange}
                          className="bg-bg-secondary border border-border-subtle rounded-md h-11 px-4 text-fg-primary text-sm font-mono focus:outline-none focus:border-brand transition-colors appearance-none cursor-pointer"
                        >
                          <option value="">{t("cta_select_default")}</option>
                          <option value={t("budget_1")}>{t("budget_1")}</option>
                          <option value={t("budget_2")}>{t("budget_2")}</option>
                          <option value={t("budget_3")}>{t("budget_3")}</option>
                          <option value={t("budget_4")}>{t("budget_4")}</option>
                          <option value={t("budget_5")}>{t("budget_5")}</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-fg-muted font-mono">
                        <span className="text-brand">$</span> message
                        <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder={t("cta_placeholder_msg")}
                        className="bg-bg-secondary border border-border-subtle rounded-md p-4 text-fg-primary text-sm font-mono focus:outline-none focus:border-brand transition-colors resize-none placeholder:text-fg-muted/40"
                      />
                    </div>

                    {/* Error Message */}
                    <AnimatePresence>
                      {formState === "error" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex items-center gap-2 text-red-400 text-sm font-mono bg-red-500/10 border border-red-500/20 rounded-md px-4 py-3"
                        >
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          {errorMsg}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={formState === "sending"}
                      className="h-12 bg-brand text-bg-primary font-bold rounded-md flex items-center justify-center gap-2 hover:bg-brand-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                    >
                      {formState === "sending" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          {t("cta_btn_sending")}
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          send_message()
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ── Info Sidebar (2/5) ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Response Time */}
            <div className="border border-border-subtle bg-bg-primary rounded-lg p-6">
              <div className="text-xs text-fg-muted font-mono mb-3">
                // response_time.config
              </div>
              <div className="text-3xl font-bold text-brand mb-1">{"< 24h"}</div>
              <div className="text-fg-muted text-sm">
                {t("cta_response_desc")}
              </div>
            </div>

            {/* Contact Details */}
            <div className="border border-border-subtle bg-bg-primary rounded-lg p-6 font-mono text-sm">
              <div className="text-xs text-fg-muted mb-4">
                // contact_info.json
              </div>
              <div className="flex flex-col gap-3">
                <div>
                  <span className="text-fg-muted">location:</span>
                  <br />
                  <span className="text-fg-primary ml-4">
                    &quot;{t("cta_location_city")}&quot;
                  </span>
                </div>
                <div>
                  <span className="text-fg-muted">availability:</span>
                  <br />
                  <span className="text-brand ml-4">
                    &quot;Mon - Sat, 09:00 - 21:00 WIB&quot;
                  </span>
                </div>
                <div>
                  <span className="text-fg-muted">channels:</span>
                  <br />
                  <div className="text-fg-primary ml-4 flex items-center gap-3 mt-2">
                    [
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        // Email di-encode base64 agar tidak mudah terscan oleh bot scraper
                        window.location.href = `mailto:${atob("bXVoYW1tYWRudXJpbDE1NUBnbWFpbC5jb20=")}`;
                      }}
                      className="hover:text-brand transition-colors"
                      title="Email"
                    >
                      <FaEnvelope className="w-5 h-5 inline-block" />
                    </a>
                    ,
                    <a
                      href="https://shorturl.at/TeegY"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#25D366] transition-colors"
                      title="WhatsApp"
                    >
                      <FaWhatsapp className="w-5 h-5 inline-block" />
                    </a>
                    ]
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Checklist */}
            <div className="border border-border-subtle bg-bg-primary rounded-lg p-6 font-mono text-sm">
              <div className="text-xs text-fg-muted mb-4">
                // what_to_expect.md
              </div>
              <ul className="flex flex-col gap-2">
                {[
                  t("cta_checklist_1"),
                  t("cta_checklist_2"),
                  t("cta_checklist_3"),
                  t("cta_checklist_4"),
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-fg-primary">
                    <span className="text-brand">✔</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
