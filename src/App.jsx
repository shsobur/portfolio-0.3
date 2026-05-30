import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Navbar from "./Components/Navbar/Navbar";
import Background from "./Components/Background/Background";
import Contact from "./Pages/Contact/Contact";

const App = () => {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <Background>
      <Navbar />
      {/* Add IDs here so we can scroll to them */}
      <div id="home">
        <Home />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="contact">
        <Contact></Contact>
      </div>
      {/* <div id="work"><Work /></div> */}
    </Background>
  );
};

export default App;
