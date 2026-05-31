import { motion, useReducedMotion } from "framer-motion";
import { FiArrowRight, FiArrowDown } from "react-icons/fi";
import { useState, useEffect } from "react";

// Custom hook — single source of truth for mobile check
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isMobile;
};

// Entrance animation factory
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay },
});

// Static (no animation) props for mobile
const staticProps = {
  initial: false,
  animate: false,
};

const Home = () => {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();

  // Kill all Framer Motion animation on mobile OR reduced motion preference
  const noAnimate = isMobile || prefersReducedMotion;

  // Helper: returns fadeUp props on desktop, static props on mobile
  const anim = (delay) => (noAnimate ? staticProps : fadeUp(delay));

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 py-24 md:py-0">
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* ── LEFT COLUMN ── */}
        <div className="flex flex-col gap-6 z-20">
          {/* Badge */}
          <motion.div {...anim(0.05)} className="w-fit">
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: "rgba(255,255,255,0.55)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.80)",
                boxShadow: "0 2px 16px rgba(124,58,237,0.10)",
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  background: "linear-gradient(135deg,#7c3aed,#ec4899)",
                }}
              />
              <span
                className="text-[11px] font-semibold uppercase tracking-widest"
                style={{ color: "#6d28d9" }}
              >
                Available for projects
              </span>
            </div>
          </motion.div>

          {/* Heading block */}
          <div className="flex flex-col gap-1">
            <motion.p
              {...anim(0.1)}
              className="text-xs font-semibold uppercase tracking-[0.2em]"
              style={{
                background: "linear-gradient(135deg,#4f46e5,#ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Video Editor & Motion Artist
            </motion.p>
            <motion.h1
              {...anim(0.15)}
              className="font-black leading-[0.88] tracking-[-3px] text-gray-900"
              style={{ fontSize: "clamp(72px,12vw,120px)" }}
            >
              KAWSHIK
              <span
                style={{
                  background: "linear-gradient(135deg,#7c3aed,#ec4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                .
              </span>
            </motion.h1>
          </div>

          {/* Description */}
          <motion.p
            {...anim(0.2)}
            className="text-[15px] leading-relaxed text-gray-500 max-w-sm"
          >
            I transform raw clips into{" "}
            <strong className="font-semibold text-gray-800">
              stunning cinematic masterpieces
            </strong>
            . High‑retention videos that hook, engage, and convert.
          </motion.p>

          {/* CTA Button */}
          <motion.div {...anim(0.25)}>
            <motion.button
              // Hover/tap only on desktop — pointless and janky on mobile
              whileHover={noAnimate ? undefined : { scale: 1.04, y: -2 }}
              whileTap={noAnimate ? undefined : { scale: 0.96 }}
              className="group flex items-center gap-3 px-9 py-4 rounded-2xl text-white text-sm font-bold uppercase tracking-wider"
              style={{
                background: "linear-gradient(135deg,#7c3aed 0%,#ec4899 100%)",
                boxShadow: "0 8px 32px rgba(124,58,237,0.40)",
              }}
            >
              Contact Now
              <FiArrowRight className="text-base transition-transform group-hover:translate-x-1.5" />
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div {...anim(0.3)} className="flex items-center gap-6 pt-2">
            <div>
              <p className="text-2xl font-black text-gray-900 leading-none">
                500+
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mt-1">
                Projects Done
              </p>
            </div>
            <div
              className="w-px h-9 rounded-full"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, #d1d5db, transparent)",
              }}
            />
            <div>
              <p className="text-2xl font-black text-gray-900 leading-none">
                4.9★
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mt-1">
                Client Rated
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN – Image Card ── */}
        <motion.div
          // On mobile: no entrance animation, just renders static
          initial={noAnimate ? false : { opacity: 0, scale: 0.88, rotate: -4 }}
          animate={noAnimate ? false : { opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center lg:justify-end relative"
        >
          {/* Static glow behind card */}
          <div
            className="absolute inset-0 rounded-[2.5rem]"
            style={{
              background:
                "radial-gradient(ellipse at 60% 50%, rgba(139,92,246,0.22) 0%, rgba(236,72,153,0.12) 50%, transparent 75%)",
              transform: "scale(1.3)",
            }}
          />

          {/* card-bob CSS class — animation: none kicks in below 640px via CSS */}
          <div className={`${noAnimate ? "" : "card-bob"} relative`}>
            {/* Floating orbs — CSS animated, stripped on mobile via CSS media query */}
            <div
              className={`${noAnimate ? "" : "orb-float-1"} absolute -top-6 -right-4 w-14 h-14 rounded-full`}
              style={{
                background:
                  "radial-gradient(circle, rgba(139,92,246,0.65), rgba(167,139,250,0.25))",
                // willChange only set on desktop where animation runs
                ...(noAnimate ? {} : { willChange: "transform" }),
              }}
            />
            <div
              className={`${noAnimate ? "" : "orb-float-2"} absolute -bottom-4 left-6 w-12 h-12 rounded-full`}
              style={{
                background:
                  "radial-gradient(circle, rgba(251,146,60,0.65), rgba(252,211,77,0.25))",
                ...(noAnimate ? {} : { willChange: "transform" }),
              }}
            />
            <div
              className={`${noAnimate ? "" : "orb-float-3"} absolute top-1/2 right-8 w-9 h-9 rounded-full`}
              style={{
                background:
                  "radial-gradient(circle, rgba(236,72,153,0.7), transparent)",
                ...(noAnimate ? {} : { willChange: "transform" }),
              }}
            />

            {/* Glass card */}
            <div
              className="relative p-4 rounded-[2.5rem]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.45) 100%)",
                border: "2px solid rgba(255,255,255,0.78)",
                boxShadow:
                  "0 32px 80px rgba(124,58,237,0.18), 0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.90)",
              }}
            >
              <div className="w-[320px] sm:w-[350px] sm:h-[450px] rounded-[1.8rem] overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dmfsmcy2y/image/upload/v1780217982/image_f3utso.webp"
                  alt="Kawshik"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top"
                  width={350}
                  height={450}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator — CSS pulse, stripped on mobile via CSS */}
      <div
        className={`${noAnimate ? "" : "scroll-pulse"} absolute bottom-8 left-8 flex flex-col items-center gap-2`}
      >
        <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-gray-400 [writing-mode:vertical-lr]">
          Scroll
        </p>
        <FiArrowDown className="text-gray-400 text-sm" />
      </div>
    </section>
  );
};

export default Home;