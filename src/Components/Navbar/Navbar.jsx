import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const navItems = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Work", id: "work" },
  { name: "Contact", id: "contact" },
  { name: "Developer", id: "developer" },
];

const Navbar = () => {
  const [active, setActive] = useState("home");

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-fit">
      {/* ── Container: no backdrop-blur → cheap static frosted look ── */}
      <div
        className="flex items-center gap-1 px-2 py-2 rounded-full border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
        style={{
          // Slightly more opaque white gives the glass feeling without blur
          background: "rgba(255, 255, 255, 0.55)",
        }}
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="relative px-3.5 py-2.5 sm:px-6 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300"
          >
            {active === item.id && (
              <motion.div
                layoutId="nav-pill"
                className="absolute inset-0 bg-white/80 shadow-sm rounded-full"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <span
              className={`relative z-10 transition-colors duration-500 ${
                active === item.id
                  ? "text-sky-600"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {item.name}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;