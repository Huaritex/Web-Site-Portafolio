import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import SmoothScroll from "@/components/SmoothScroll/SmoothScroll";
import SplitImageReveal from "@/components/SplitReveal/SplitImageReveal";
import About from "@/components/About/About";
import Skills from "@/components/Skills/Skills";
import Projects from "@/components/Projects/Projects";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";
import Preloader from "@/components/Preloader/Preloader";
import ScrollProgress from "@/components/ScrollProgress/ScrollProgress";

export default function Home() {
  return (
    <>
      {/* Preloader */}
      <Preloader />

      {/* Global effects */}
      <SmoothScroll />
      <ScrollProgress />
      <div className="noise-overlay" aria-hidden="true" />
      <div className="scan-line" aria-hidden="true" />
      {/* Layout */}
      <Navbar />
      <main>
        <Hero />
        <SplitImageReveal />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
