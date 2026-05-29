import { useState } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const items = ["Home", "About", "Work", "Contact"];

  return (
    <nav className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100]">
      <div className="flex items-center gap-1 p-1.5 bg-white/40 backdrop-blur-2xl border border-white/40 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
        {items.map((item) => (
          <button
            key={item}
            onClick={() => setActive(item)}
            className="relative px-6 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-500 overflow-hidden"
          >
            {active === item && (
              <motion.div
                layoutId="nav-bg"
                className="absolute inset-0 bg-white shadow-sm rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span
              className={`relative z-10 ${active === item ? "text-black" : "text-slate-500"}`}
            >
              {item === "Home"
                ? "1.0x"
                : item === "About"
                  ? "2.0x"
                  : item === "Work"
                    ? "3.0x"
                    : "0.5x"}
              <span className="ml-1 opacity-50 uppercase text-[10px]">
                {item}
              </span>
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;