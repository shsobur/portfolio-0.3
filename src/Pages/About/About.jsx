import { motion } from "framer-motion";
import { SiCanva } from "react-icons/si";
import { FiCpu, FiLayout, FiScissors, FiLayers } from "react-icons/fi";
import { TbBrandAdobePhotoshop, TbBrandAdobePremier } from "react-icons/tb";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay },
});

const About = () => {
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
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 py-24">
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* LEFT: CONTENT SIDE */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <motion.p
              {...fadeUp(0.1)}
              className="text-xs font-bold uppercase tracking-[0.3em] text-purple-600"
            >
              The Creator
            </motion.p>
            <motion.h2
              {...fadeUp(0.15)}
              className="font-black leading-tight tracking-tighter text-gray-900"
              style={{ fontSize: "clamp(48px, 8vw, 80px)" }}
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
            {...fadeUp(0.2)}
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
              My work is about more than just cutting clips; it's about{" "}
              <strong className="text-gray-900">storytelling</strong>. From
              smooth transitions and precise music synchronization to
              captivating subtitles and high-end visual effects, I ensure every
              frame serves a purpose.
            </p>
            <p>
              I focus on creativity, attention to detail, and delivering content
              that helps creators and brands stand out in a crowded digital
              world.
            </p>
          </motion.div>

          {/* Role Badge – no backdrop blur */}
          <motion.div
            {...fadeUp(0.3)}
            className="flex items-center gap-4 p-4 rounded-2xl w-fit"
            style={{
              // Replace backdrop‑filter with a semi‑opaque gradient
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.45) 100%)",
              border: "1px solid rgba(255, 255, 255, 0.7)",
              boxShadow: "0 8px 24px rgba(124,58,237,0.08)",
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

        {/* RIGHT: SKILLS / BENTO GRID */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-4 h-fit">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              {...fadeUp(0.1 + index * 0.05)}
              whileHover={{ y: -5, scale: 1.02 }}
              className="p-6 rounded-[2rem] flex flex-col gap-4 justify-between"
              style={{
                // No backdrop‑filter – soft gradient + border looks almost identical
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.35) 100%)",
                border: "2px solid rgba(255, 255, 255, 0.78)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
              }}
            >
              <div className="text-3xl">{skill.icon}</div>
              <p className="text-[12px] font-black uppercase tracking-wider text-gray-800">
                {skill.name}
              </p>
            </motion.div>
          ))}

          {/* Philosophy box – keep small blur because it's static, or replace with gradient */}
          <motion.div
            {...fadeUp(0.4)}
            className="col-span-2 p-8 rounded-[2rem] bg-slate-900 text-white flex flex-col gap-2 overflow-hidden relative group"
          >
            <p className="text-xs font-bold opacity-60 uppercase tracking-widest">
              Philosophy
            </p>
            <p className="font-heading text-2xl">
              "Creativity is the result of precision and passion."
            </p>
            {/* Static gradient glow instead of blur (cheaper) */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-purple-500/20 group-hover:bg-pink-500/30 transition-colors rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;