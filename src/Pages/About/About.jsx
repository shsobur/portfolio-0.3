import { motion, useReducedMotion } from "framer-motion";
import { SiCanva } from "react-icons/si";
import { FiCpu, FiLayout, FiScissors, FiLayers } from "react-icons/fi";
import { TbBrandAdobePhotoshop, TbBrandAdobePremier } from "react-icons/tb";

const About = () => {
  const prefersReducedMotion = useReducedMotion();

  // 1. Optimized Variants for a "Smooth Pop" effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 }, // Start lower
    visible: {
      opacity: 1,
      y: 0, // Slide up to position
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1], // Premium "out-back" feel
      },
    },
  };

  const skills = [
    {
      name: "Adobe Premiere Pro",
      icon: <TbBrandAdobePremier className="text-blue-500" />,
    },
    {
      name: "Photoshop",
      icon: <TbBrandAdobePhotoshop className="text-blue-400" />,
    },
    { name: "CapCut", icon: <FiScissors className="text-red-500" /> },
    { name: "Canva", icon: <SiCanva className="text-cyan-400" /> },
    { name: "Music Sync", icon: <FiLayers className="text-purple-500" /> },
    { name: "Visual Effects", icon: <FiCpu className="text-pink-500" /> },
  ];

  return (
    <section className="bg-transparent relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 py-24 overflow-hidden">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16"
      >
        {/* LEFT CONTENT */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <motion.p
              variants={itemVariants}
              className="text-xs font-bold uppercase tracking-[0.3em] text-purple-600"
            >
              The Creator
            </motion.p>
            <motion.h2
              variants={itemVariants}
              className="font-heading font-black uppercase leading-tight tracking-tighter text-gray-900"
              style={{ fontSize: "clamp(50px, 11vw, 95px)" }}
            >
              BEYOND THE{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #ec4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                TIMELINE.
              </span>
            </motion.h2>
          </div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-6 text-[16px] leading-relaxed text-gray-600 max-w-2xl"
          >
            <p>
              Hi, I'm <strong className="text-gray-900">Koushik Sujan</strong>,
              a Junior Video Editor at{" "}
              <span className="text-purple-600 font-semibold">
                GrowB Digital Marketing
              </span>
              . I specialize in creating engaging and visually appealing videos
              for YouTube and social media.
            </p>
            <p>
              My work includes video cutting, smooth transitions, subtitles,
              music synchronization, and visual effects to make content more
              engaging. I work with tools like
              <strong className="text-gray-800">
                {" "}
                CapCut, Adobe Premiere Pro, Photoshop, and Canva{" "}
              </strong>
              to produce high-quality videos.
            </p>
            <p>
              I focus on creativity, attention to detail, and delivering content
              that helps creators and brands stand out.
            </p>
          </motion.div>

          {/* Role Badge */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4 p-4 rounded-2xl w-fit"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.5) 100%)",
              border: "1px solid rgba(255,255,255,0.8)",
              boxShadow: "0 8px 24px rgba(124,58,237,0.08)",
              willChange: "transform, opacity",
            }}
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white text-xl">
              <FiLayout />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Currently at
              </p>
              <p className="font-bold text-gray-900">GrowB Digital Marketing</p>
            </div>
          </motion.div>
        </div>

        {/* RIGHT SKILLS GRID */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-4 h-fit">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={
                prefersReducedMotion
                  ? {}
                  : {
                      y: -8,
                      transition: { duration: 0.3, ease: "easeOut" },
                    }
              }
              className="p-6 rounded-[2rem] flex flex-col gap-4 justify-between"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.4) 100%)",
                border: "2px solid rgba(255,255,255,0.8)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.03)",
                willChange: "transform",
              }}
            >
              <div className="text-3xl">{skill.icon}</div>
              <p className="text-[12px] font-black uppercase tracking-wider text-gray-800">
                {skill.name}
              </p>
            </motion.div>
          ))}

          {/* Philosophy box */}
          <motion.div
            variants={itemVariants}
            className="col-span-2 p-8 rounded-[2rem] bg-slate-900 text-white flex flex-col gap-2 overflow-hidden relative group"
          >
            <p className="text-xs font-bold opacity-60 uppercase tracking-widest">
              Philosophy
            </p>
            <p className="font-heading text-2xl relative z-10">
              "Creativity is the result of precision and passion."
            </p>
            {/* Animated Glow - Very optimized */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-500/30 rounded-full blur-3xl"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;