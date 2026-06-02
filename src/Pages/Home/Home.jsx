import { motion, useReducedMotion } from "framer-motion";
import { FiArrowRight, FiArrowDown } from "react-icons/fi";

const Home = () => {
  const prefersReducedMotion = useReducedMotion();

  // 1. Main Container Variant (Orchestration)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Items pop in one by one
        delayChildren: 0.2,
      },
    },
  };

  // 2. Individual Item Variant
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1], // Smooth "Apple-style" easing
      },
    },
  };

  // 3. Floating Animation for the Image Card & Orbs
  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 py-24 md:py-0 overflow-hidden">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
      >
        {/* ── LEFT COLUMN ── */}
        <div className="flex flex-col gap-6 z-20">
          {/* Badge */}
          <motion.div variants={itemVariants} className="w-fit">
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: "rgba(255,255,255,0.6)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.8)",
                boxShadow: "0 4px 15px rgba(124,58,237,0.05)",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-purple-700">
                Available for projects
              </span>
            </div>
          </motion.div>

          {/* Heading block */}
          <div className="flex flex-col gap-1">
            <motion.p
              variants={itemVariants}
              className="text-xs font-bold uppercase tracking-[0.3em] bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent"
            >
              Video Editor & Motion Artist
            </motion.p>
            <motion.h1
              variants={itemVariants}
              className="font-black leading-[0.88] tracking-[-0.04em] text-gray-900"
              style={{ fontSize: "clamp(60px, 12vw, 110px)" }}
            >
              KAWSHIK
              <span className="bg-gradient-to-br from-purple-600 to-pink-500 bg-clip-text text-transparent">
                .
              </span>
            </motion.h1>
          </div>

          <motion.p
            variants={itemVariants}
            className="text-[16px] leading-relaxed text-gray-500 max-w-sm"
          >
            I transform raw clips into{" "}
            <strong className="font-bold text-gray-800">
              high-retention cinematic masterpieces
            </strong>
            . Hook your audience from the first second.
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={itemVariants}>
            <motion.button
              whileHover={prefersReducedMotion ? {} : { scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center gap-3 px-10 py-5 rounded-2xl text-white text-xs font-black uppercase tracking-widest transition-all"
              style={{
                background: "linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)",
                boxShadow: "0 15px 35px rgba(124,58,237,0.3)",
              }}
            >
              Contact Now
              <FiArrowRight className="text-lg transition-transform group-hover:translate-x-1.5" />
            </motion.button>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-8 pt-4"
          >
            <div>
              <p className="text-3xl font-black text-gray-900 leading-none">
                500+
              </p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-2">
                Projects Done
              </p>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div>
              <p className="text-3xl font-black text-gray-900 leading-none">
                4.9★
              </p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-2">
                Client Rated
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN: Animated Image Card ── */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center lg:justify-end relative"
        >
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 blur-[100px] rounded-full scale-125" />

          {/* Floating Container */}
          <motion.div
            variants={prefersReducedMotion ? {} : floatingVariants}
            initial="initial"
            animate="animate"
            className="relative"
          >
            {/* Optimized Orbs */}
            <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full bg-purple-500/20 blur-xl animate-pulse" />
            <div className="absolute -bottom-8 -left-8 w-20 h-20 rounded-full bg-pink-500/20 blur-xl animate-pulse" />

            {/* Glass Card */}
            <div
              className="relative p-4 rounded-[3rem]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.4) 100%)",
                border: "2px solid rgba(255,255,255,0.8)",
                boxShadow: "0 40px 100px rgba(124,58,237,0.1)",
                willChange: "transform", // Helps mobile GPU
              }}
            >
              <div className="w-[300px] sm:w-[360px] h-[400px] sm:h-[480px] rounded-[2.2rem] overflow-hidden bg-gray-100">
                <img
                  src="https://res.cloudinary.com/dmfsmcy2y/image/upload/v1780217982/image_f3utso.webp"
                  alt="Kawshik"
                  loading="eager" // Landing page image should be eager
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Optimized Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-10 hidden md:flex flex-col items-center gap-3"
      >
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 [writing-mode:vertical-lr]">
          Scroll
        </p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <FiArrowDown className="text-gray-400 text-lg" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Home;