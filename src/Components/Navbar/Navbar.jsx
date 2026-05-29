import { useState } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const navItems = ["Home", "About", "Work", "Contact", "Developer"];

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-fit">
      <div className="flex items-center gap-1 px-2 py-2 bg-white/20 backdrop-blur-2xl border border-white/30 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => setActive(item)}
            className="relative px-3.5 py-2.5 sm:px-6 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300"
          >
            {active === item && (
              <motion.div
                layoutId="nav-pill"
                className="absolute inset-0 bg-white/80 shadow-sm rounded-full"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <span
              className={`relative z-10 transition-colors duration-500 ${
                active === item
                  ? "text-sky-600"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {item}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
