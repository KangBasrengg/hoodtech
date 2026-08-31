"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "id" | "en";

// Daftar translasi untuk bagian-bagian konten utama
export const dictionary = {
  id: {
    // Navbar
    nav_about: "tentang",
    nav_services: "layanan",
    nav_stack: "teknologi",
    nav_work: "karya",
    nav_contact: "kontak",

    // Hero
    hero_title_1: "Kami menulis kode.",
    hero_title_2: "Kami merilis produk.",
    hero_title_3: "Kami membesarkan startup.",
    
    // CTA / Contact
    cta_heading: "Mulai proyek bersama kami",
    cta_desc: "Isi form di bawah ini untuk memulai diskusi. Tim kami akan merespons dalam waktu kurang dari 24 jam.",
    cta_success_heading: "Pesan terkirim!",
    cta_success_1: "Pesan berhasil dikirim.",
    cta_success_2: "Kami akan membalas dalam 24 jam.",
    cta_placeholder_name: "Nama Anda",
    cta_placeholder_msg: "Saya adalah UMKM yang ingin membuat sistem kasir dengan budget ...",
    cta_btn_sending: "Mengirim...",
    cta_location_city: "Kota Semarang, ID",
    cta_checklist_1: "Konsultasi awal gratis",
    cta_checklist_2: "Proposal & estimasi harga",
    cta_checklist_3: "Timeline yang transparan",
    cta_checklist_4: "NDA jika diperlukan",
    cta_select_default: "-- pilih --",
    cta_response_desc: "Rata-rata waktu respons kami untuk pesan masuk baru.",
    budget_1: "< Rp 5 juta",
    budget_2: "Rp 5 - 15 juta",
    budget_3: "Rp 15 - 50 juta",
    budget_4: "Rp 50 - 100 juta",
    budget_5: "> Rp 100 juta",
    // About
    about_heading: "Tentang Hoodtech",
    about_desc: "Kami adalah tim (gabungan Muhammad Nuril dan Bahrul Ilmi) yang sangat berdedikasi terhadap teknologi. Hoodtech didirikan dengan visi untuk membantu berbagai skala bisnis—mulai dari UMKM, startup, hingga enterprise—dalam membangun ekosistem digital yang scalable, modern, dan andal.",
    about_check_1: "Kode yang bersih, terstruktur, dan mudah dipelihara (Clean Code).",
    about_check_2: "Fokus pada performa, keamanan, dan skalabilitas.",
    about_check_3: "Desain antarmuka (UI/UX) yang intuitif dan berpusat pada pengguna.",
    about_check_4: "Kolaborasi yang transparan dan komunikasi yang responsif.",
    about_founders_heading: "siapa dibalik Hoodtech?",

    // Services
    services_heading: "Apa yang kami bangun",
    serv_web_desc: "Aplikasi web kustom menggunakan tech stack modern seperti React, Next.js, dan Vue.",
    serv_backend_desc: "Arsitektur backend yang tangguh dan scalable dengan Node.js, Go, atau Python.",
    serv_mobile_desc: "Aplikasi mobile lintas platform (iOS & Android) menggunakan React Native atau Flutter.",
    serv_devops_desc: "Konfigurasi infrastruktur cloud, pipeline CI/CD, dan manajemen server.",
    serv_uiux_desc: "Desain antarmuka berorientasi pengguna dan pengujian prototipe via Figma.",
    serv_maint_desc: "Dukungan berkelanjutan, pembenahan bug, dan peningkatan fitur aplikasi Anda.",

    // Process
    process_heading: "Alur kerja kami",

    // Testimonials
    testi_heading: "Kata mereka",
    testi_1_desc: "Proses development sangat cepat dan rapi. Tim Hoodtech benar-benar paham cara scaling aplikasi di cloud.",
    testi_2_desc: "Komunikasi sangat responsif. Hasil UI/UX sesuai dengan yang kita harapkan, clean dan modern.",
    testi_3_desc: "Kualitas kode sangat bagus. Sangat mudah bagi tim internal kami untuk maintain aplikasi setelah serah terima.",

    // Portfolio
    portfolio_heading: "Proyek terbaru",
    portfolio_live_demo: "Lihat Live Demo",
    proj_1_desc: "Platform SaaS AI Legal-Tech untuk otomatisasi dokumen hukum dan konsultasi instan berbasis kecerdasan buatan.",
    proj_1_prob: "Proses konsultasi hukum tradisional memakan waktu lama dan biaya mahal, sehingga sulit dijangkau oleh UMKM dan masyarakat umum.",
    proj_1_sol: "Membangun sistem AI Legal Assistant dengan RAG (Retrieval-Augmented Generation) khusus hukum Indonesia.",
    proj_1_imp: "Mempercepat draf dokumen 5x lebih cepat dan menurunkan biaya konsultasi awal hingga 80%.",
    proj_2_desc: "Tools Repository Analyzer — analisis mendalam terhadap arsitektur, dependensi, dan kesehatan codebase Anda secara visual.",
    proj_2_prob: "Developer sering kesulitan memahami arsitektur legacy code atau codebase baru yang sangat besar.",
    proj_2_sol: "Membuat parser pintar yang memetakan file dependency dan merendernya dalam grafik interaktif 2D/3D.",
    proj_2_imp: "Mengurangi waktu onboarding developer baru pada codebase raksasa hingga 40%.",
    proj_3_desc: "Web app pencatatan keuangan pribadi — tracking income & outcome harian dengan dashboard analitik yang intuitif.",
    proj_3_prob: "Aplikasi keuangan yang ada terlalu kompleks, membuat user malas mencatat pengeluaran harian.",
    proj_3_sol: "Merancang UI minimalis dengan input kilat (quick-entry) dan visualisasi data yang mudah dipahami sekilas.",
    proj_3_imp: "Meningkatkan retensi pengguna harian sebesar 65% berkat UX yang ringan dan cepat.",
    proj_4_desc: "Web app untuk membuat layout denah rumah secara 2D menggunakan AI — generate desain rumah impian Anda dalam hitungan detik.",
    proj_4_prob: "Menyewa arsitek untuk sekadar melihat rancangan awal denah rumah terlalu mahal bagi banyak orang.",
    proj_4_sol: "Mengintegrasikan model AI generatif yang mampu mengubah prompt teks menjadi sketsa denah 2D yang presisi.",
    proj_4_imp: "Ribuan denah berhasil di-generate per bulan, membantu calon pemilik rumah memvisualisasikan ide mereka secara instan.",

    // Footer
    footer_desc: "Kami menulis kode. Kami merilis produk. Kami menskalakan startup. Digital agency yang berbasis di Semarang, Indonesia dengan spesialisasi pada aplikasi web dan mobile yang scalable.",
  },
  en: {
    // Navbar
    nav_about: "about",
    nav_services: "services",
    nav_stack: "stack",
    nav_work: "work",
    nav_contact: "contact",

    // Hero
    hero_title_1: "We write code.",
    hero_title_2: "We ship products.",
    hero_title_3: "We scale startups.",

    // CTA / Contact
    cta_heading: "Start a project with us",
    cta_desc: "Fill out the form below to start a discussion. Our team will respond in less than 24 hours.",
    cta_success_heading: "Message sent!",
    cta_success_1: "Message sent successfully.",
    cta_success_2: "We will reply within 24 hours.",
    cta_placeholder_name: "Your Name",
    cta_placeholder_msg: "I am an SMB looking to build a POS system with a budget of...",
    cta_btn_sending: "Sending...",
    cta_location_city: "Semarang City, ID",
    cta_checklist_1: "Free initial consultation",
    cta_checklist_2: "Proposal & cost estimation",
    cta_checklist_3: "Transparent timeline",
    cta_checklist_4: "NDA if required",
    cta_select_default: "-- select --",
    cta_response_desc: "Our average response time for new incoming messages.",
    budget_1: "< $500",
    budget_2: "$500 - $1,000",
    budget_3: "$1,000 - $3,500",
    budget_4: "$3,500 - $7,000",
    budget_5: "> $7,000",
    // About
    about_heading: "About Hoodtech",
    about_desc: "We are a highly dedicated technology team (Muhammad Nuril and Bahrul Ilmi). Hoodtech was founded with a vision to help businesses of all sizes—from SMBs, startups, to enterprises—build a scalable, modern, and reliable digital ecosystem.",
    about_check_1: "Clean, structured, and maintainable code (Clean Code).",
    about_check_2: "Focus on performance, security, and scalability.",
    about_check_3: "Intuitive and user-centric interface (UI/UX) design.",
    about_check_4: "Transparent collaboration and responsive communication.",
    about_founders_heading: "who is behind Hoodtech?",

    // Services
    services_heading: "What we build",
    serv_web_desc: "Custom web applications using modern stacks like React, Next.js, and Vue.",
    serv_backend_desc: "Robust, scalable backend architectures with Node.js, Go, or Python.",
    serv_mobile_desc: "Cross-platform mobile applications using React Native or Flutter.",
    serv_devops_desc: "Cloud infrastructure setup, CI/CD pipelines, and server management.",
    serv_uiux_desc: "User-centric interface design and prototyping via Figma.",
    serv_maint_desc: "Ongoing support, bug fixes, and feature enhancements for your apps.",

    // Process
    process_heading: "Our workflow",

    // Testimonials
    testi_heading: "What they say",
    testi_1_desc: "Development process was very fast and neat. The Hoodtech team truly understands how to scale applications in the cloud.",
    testi_2_desc: "Highly responsive communication. The UI/UX results matched our expectations perfectly, clean and modern.",
    testi_3_desc: "Excellent code quality. It is very easy for our internal team to maintain the application after handover.",

    // Portfolio
    portfolio_heading: "Latest projects",
    portfolio_live_demo: "View Live Demo",
    proj_1_desc: "AI Legal-Tech SaaS platform for legal document automation and instant AI-based consultation.",
    proj_1_prob: "Traditional legal consultation is time-consuming and expensive, making it hard to reach for SMBs and the public.",
    proj_1_sol: "Built an AI Legal Assistant system with RAG (Retrieval-Augmented Generation) specifically for Indonesian law.",
    proj_1_imp: "Accelerates document drafting 5x faster and reduces initial consultation costs by up to 80%.",
    proj_2_desc: "Repository Analyzer Tool — visual deep analysis of your architecture, dependencies, and codebase health.",
    proj_2_prob: "Developers often struggle to understand legacy architecture or massive new codebases.",
    proj_2_sol: "Created a smart parser that maps file dependencies and renders them in an interactive 2D/3D graph.",
    proj_2_imp: "Reduces new developer onboarding time on giant codebases by up to 40%.",
    proj_3_desc: "Personal finance tracking web app — daily income & outcome tracking with an intuitive analytics dashboard.",
    proj_3_prob: "Existing financial apps are too complex, making users lazy to log daily expenses.",
    proj_3_sol: "Designed a minimalist UI with quick-entry input and easily digestible data visualization.",
    proj_3_imp: "Increased daily user retention by 65% thanks to lightweight and fast UX.",
    proj_4_desc: "Web app to create 2D house floor plan layouts using AI — generate your dream house design in seconds.",
    proj_4_prob: "Hiring an architect just to see an initial floor plan draft is too expensive for many people.",
    proj_4_sol: "Integrated a generative AI model capable of turning text prompts into precise 2D floor plan sketches.",
    proj_4_imp: "Thousands of floor plans generated per month, helping future homeowners visualize their ideas instantly.",

    // Footer
    footer_desc: "We write code. We ship products. We scale startups. Digital agency based in Semarang, Indonesia specializing in scalable web and mobile applications.",
  }
};

export type DictionaryKey = keyof typeof dictionary["id"];

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (key: DictionaryKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>("id");

  const toggleLang = () => {
    setLang((prev) => (prev === "id" ? "en" : "id"));
  };

  const t = (key: DictionaryKey) => {
    return dictionary[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
