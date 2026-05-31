import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Navbar from "./Components/Navbar/Navbar";
import Background from "./Components/Background/Background";
import Contact from "./Pages/Contact/Contact";

const App = () => {
  useEffect(() => {
    // ── Conditionally skip Lenis on low‑end devices / accessibility ──
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isLowEnd = navigator.hardwareConcurrency <= 4;

    if (prefersReducedMotion || isLowEnd) {
      // Use native scrolling — lighter on weak hardware
      return; // no cleanup needed
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <Background>
      <Navbar />
      <div id="home">
        <Home />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </Background>
  );
};

export default App;