import { useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";
import { ScrollTextMarquee } from "@/components/ui/scroll-text-marquee";
import { initSmoothScroll, destroySmoothScroll } from "@/lib/gsap-setup";

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    initSmoothScroll();
    return () => destroySmoothScroll();
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <motion.div
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-transparent via-accent to-transparent"
        style={{ scaleX }}
      />

      <Navbar />

      <main className="relative">
        <Hero />

        <ScrollTextMarquee
          text="SQL - Python - Machine Learning - Data Analysis - Reporting - Visualization"
          className="py-5"
          speed={0.8}
          direction="left"
        />

        <Projects />

        <ScrollTextMarquee
          text="ETL - Scikit-learn - Pandas - Tableau - Statistical Modeling - R"
          className="py-5"
          speed={0.6}
          direction="right"
        />

        <About />
        <Skills />
        <Experience />
        <Contact />
      </main>
    </div>
  );
}

export default App;
