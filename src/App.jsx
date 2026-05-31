import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Navbar from "./Components/Navbar/Navbar";
import Background from "./Components/Background/Background";
import Contact from "./Pages/Contact/Contact";

const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // FIX: store rafId so we can cancel it on unmount
    // Original bug: requestAnimationFrame(raf) ran forever even after lenis.destroy()
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId); // stop the loop first
      lenis.destroy(); // then clean up lenis
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