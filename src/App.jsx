import { useEffect } from "react";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Navbar from "./Components/Navbar/Navbar";
import Background from "./Components/Background/Background";
import Contact from "./Pages/Contact/Contact";

const App = () => {
  useEffect(() => {
    // Enable native smooth scrolling
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
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