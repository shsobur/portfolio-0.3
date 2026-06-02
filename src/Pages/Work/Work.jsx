import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FiX, FiPlay } from "react-icons/fi";

const videos = [
  {
    id: "1197603891",
    title: "Kyungdong University",
    description: "A dynamic campus promotional video with smooth transitions.",
    thumbnail:
      "https://res.cloudinary.com/dmfsmcy2y/image/upload/v1780419930/th-1_dv3lyy.webp",
  },
  {
    id: "1197603893",
    title: "Premium Dada Ghee",
    description: "High‑end product commercial focused on rich visuals.",
    thumbnail:
      "https://res.cloudinary.com/dmfsmcy2y/image/upload/v1780419943/th-2_jnhpfm.webp",
  },
  {
    id: "1197615488",
    title: "Listen",
    description: "A stylised music‑driven edit built around rhythm.",
    thumbnail:
      "https://res.cloudinary.com/dmfsmcy2y/image/upload/v1780419980/th-3_azxj3n.webp",
  },
  {
    id: "1197603892",
    title: "1 Lac Price",
    description: "E‑commerce promo with kinetic typography transitions.",
    thumbnail:
      "https://res.cloudinary.com/dmfsmcy2y/image/upload/v1780419990/th-4_u9i3hz.webp",
  },
  {
    id: "1197615489",
    title: "Serenez By Danube",
    description: "Real‑estate showcase with cinematic aerials and grading.",
    thumbnail:
      "https://res.cloudinary.com/dmfsmcy2y/image/upload/v1780420009/th-5_tfzys7.webp",
  },
  {
    id: "1197615487",
    title: "Taylor Swift Voice Over",
    description: "Narrative‑driven edit highlighting storytelling visuals.",
    thumbnail:
      "https://res.cloudinary.com/dmfsmcy2y/image/upload/v1780420019/th-6_tgz1sq.webp",
  },
];

const Work = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const prefersReducedMotion = useReducedMotion();

  const closeModal = useCallback(() => setSelectedVideo(null), []);

  useEffect(() => {
    document.body.style.overflow = selectedVideo ? "hidden" : "";
  }, [selectedVideo]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] },
    },
  };

  return (
    <section className="relative min-h-screen px-6 md:px-12 lg:px-20 py-24 overflow-hidden bg-gray-50/30">
      <div className="max-w-7xl mx-auto">
        {/* SECTION HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-purple-600">
            Portfolio
          </p>
          <h2 className="font-black text-5xl md:text-8xl tracking-tighter text-gray-900 mt-3">
            MY{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              WORK.
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mt-4">
            High-quality edits focused on engagement and storytelling.
          </p>
        </motion.div>

        {/* VIDEO GRID */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {videos.map((video) => (
            <motion.div
              key={video.id}
              variants={itemVariants}
              whileHover={prefersReducedMotion ? {} : { y: -8 }}
              onClick={() => setSelectedVideo(video)}
              className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-purple-900/30 transition-colors duration-500 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-purple-600 shadow-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <FiPlay size={22} className="ml-1" />
                  </div>
                </div>
              </div>

              {/* Text Area - High Visibility */}
              <div className="p-5 md:p-6 bg-white">
                <h3 className="font-extrabold text-gray-900 text-lg leading-tight group-hover:text-purple-600 transition-colors">
                  {video.title}
                </h3>
                <p className="text-gray-500 text-sm mt-2 line-clamp-2 leading-relaxed font-medium">
                  {video.description}
                </p>
                <div className="mt-4 flex items-center gap-2 text-purple-600 font-bold text-[10px] uppercase tracking-widest">
                  <span>Watch Video</span>
                  <div className="h-px w-8 bg-purple-200 group-hover:w-12 transition-all duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* MODAL - Simplified for performance */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-gray-900/90 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl rounded-xl bg-white overflow-hidden shadow-2xl"
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-50 p-2 bg-black/50 text-white rounded-full hover:bg-black transition-colors"
              >
                <FiX size={20} />
              </button>

              <div className="aspect-video w-full bg-black">
                <iframe
                  src={`https://player.vimeo.com/video/${selectedVideo.id}?autoplay=1`}
                  className="w-full h-full"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              </div>

              <div className="p-6 border-t border-gray-100">
                <h3 className="text-2xl font-black text-gray-900">
                  {selectedVideo.title}
                </h3>
                <p className="text-gray-500 mt-1">
                  {selectedVideo.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Work;