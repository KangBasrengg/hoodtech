import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import About from "@/components/About";
import Services from "@/components/Services";
import TechStack from "@/components/TechStack";
import Process from "@/components/Process";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import InteractiveTerminal from "@/components/InteractiveTerminal";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-primary selection:bg-brand/30 selection:text-brand">
      <Navbar />
      <Hero />
      <StatsBar />
      <About />
      <Services />
      <TechStack />
      <Process />
      <Portfolio />
      <Testimonials />
      <CTA />
      <Footer />
      <InteractiveTerminal />
    </main>
  );
}
