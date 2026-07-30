import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hoodtech.my.id"),
  title: {
    default: "Hoodtech - We write code. We ship products.",
    template: "%s | Hoodtech"
  },
  description: "Digital agency and software house berbasis di Semarang. Spesialis pembuatan website, aplikasi mobile, SaaS, dan sistem AI untuk bisnis.",
  keywords: ["software house semarang", "jasa pembuatan website", "jasa aplikasi mobile", "IT consultant", "Hoodtech", "Muhammad Nuril", "Bahrul Ilmi"],
  authors: [{ name: "Hoodtech Team" }],
  creator: "Hoodtech",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://hoodtech.my.id",
    title: "Hoodtech - Premium Software Agency",
    description: "Membangun ekosistem digital yang scalable, modern, dan andal untuk startup dan enterprise.",
    siteName: "Hoodtech",
    images: [{
      url: "/icon.png",
      width: 800,
      height: 800,
      alt: "Hoodtech Logo"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hoodtech - Premium Software Agency",
    description: "Membangun ekosistem digital yang scalable, modern, dan andal.",
    images: ["/icon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${jetbrainsMono.variable} font-mono antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
