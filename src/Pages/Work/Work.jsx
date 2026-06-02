import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FiX, FiPlay } from "react-icons/fi";

// ============== DATA (replace dummy titles/descriptions later) ==============
const videos = [
  {
    id: "1197603891",
    title: "Kyungdong University",
    description:
      "A dynamic campus promotional video with smooth transitions and upbeat pacing.",
    thumbnail:
      "https://res.cloudinary.com/dmfsmcy2y/image/upload/v1780419930/th-1_dv3lyy.webp",
  },
  {
    id: "1197603893",
    title: "Premium Dada Ghee",
    description:
      "High‑end product commercial focused on rich visuals and appetite appeal.",
    thumbnail:
      "https://res.cloudinary.com/dmfsmcy2y/image/upload/v1780419943/th-2_jnhpfm.webp",
  },
  {
    id: "1197615488",
    title: "Listen",
    description:
      "A stylised music‑driven edit built around rhythm and precision cuts.",
    thumbnail:
      "https://res.cloudinary.com/dmfsmcy2y/image/upload/v1780419980/th-3_azxj3n.webp",
  },
  {
    id: "1197603892",
    title: "1 Lac Price",
    description:
      "E‑commerce promo with kinetic typography and seamless scene transitions.",
    thumbnail:
      "https://res.cloudinary.com/dmfsmcy2y/image/upload/v1780419990/th-4_u9i3hz.webp",
  },
  {
    id: "1197615489",
    title: "Serenez By Danube",
    description:
      "Real‑estate showcase combining cinematic aerials with elegant color grading.",
    thumbnail:
      "https://res.cloudinary.com/dmfsmcy2y/image/upload/v1780420009/th-5_tfzys7.webp",
  },
  {
    id: "1197615487",
    title: "Taylor Swift Voice Over",
    description:
      "Narrative‑driven edit highlighting storytelling through voice and visuals.",
    thumbnail:
      "https://res.cloudinary.com/dmfsmcy2y/image/upload/v1780420019/th-6_tgz1sq.webp",
  },
];

// ============== COMPONENT ==============
const Work = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const prefersReducedMotion = useReducedMotion();
  const lowEnd =
    typeof navigator !== "undefined" && navigator.hardwareConcurrency <= 4;
  const disableAnimations = prefersReducedMotion || lowEnd;

  const openModal = (video) => setSelectedVideo(video);
  const closeModal = useCallback(() => setSelectedVideo(null), []);

  // Close with Escape key, lock body scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };
    if (selectedVideo) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedVideo, closeModal]);

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: { duration: 0.2 },
    },
  };

  return (
    <section className="relative min-h-screen px-6 md:px-12 lg:px-20 py-24">
      <div className="max-w-7xl mx-auto">
        {/* -------- SECTION HEADING -------- */}
        <motion.div
          initial={disableAnimations ? false : { opacity: 0, y: 20 }}
          whileInView={disableAnimations ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-purple-600">
            Portfolio
          </p>
          <h2 className="font-black text-4xl md:text-6xl lg:text-7xl tracking-tighter text-gray-900 mt-2">
            MY{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #7c3aed, #ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              WORK.
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto mt-4">
            Click any thumbnail to watch the full video with Vimeo’s quality
            player.
          </p>
        </motion.div>

        {/* -------- VIDEO GRID (3-2-1) -------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <motion.button
              key={video.id}
              onClick={() => openModal(video)}
              initial={disableAnimations ? false : { opacity: 0, y: 30 }}
              whileInView={disableAnimations ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={disableAnimations ? {} : { scale: 1.03 }}
              whileTap={disableAnimations ? {} : { scale: 0.98 }}
              className="group relative rounded-2xl overflow-hidden bg-white/60 border border-white/80 shadow-lg hover:shadow-xl transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label={`Play ${video.title}`}
            >
              {/* Thumbnail – 16:9 aspect ratio */}
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Play overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <FiPlay className="text-purple-600 text-xl md:text-2xl ml-1" />
                </div>
              </div>

              {/* Card info */}
              <div className="p-4 text-left">
                <h3 className="font-bold text-gray-900 truncate">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-500 truncate">
                  {video.description}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* -------- VIDEO MODAL (UPGRADED DESIGN) -------- */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            key="modal-backdrop"
            variants={backdropVariants}
            initial={disableAnimations ? false : "hidden"}
            animate="visible"
            exit="exit"
            onClick={closeModal}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            aria-modal="true"
            role="dialog"
          >
            <motion.div
              key="modal-content"
              variants={modalVariants}
              initial={disableAnimations ? false : "hidden"}
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl rounded-[2rem] overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.5) 100%)",
                border: "2px solid rgba(255,255,255,0.8)",
                boxShadow:
                  "0 32px 80px rgba(124,58,237,0.15), 0 0 0 1px rgba(255,255,255,0.2) inset",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
            >
              {/* Close button – more premium */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full flex items-center justify-center text-gray-700 hover:text-gray-900 transition-colors"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.4) 100%)",
                  border: "1px solid rgba(255,255,255,0.8)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                }}
                aria-label="Close video"
              >
                <FiX size={20} />
              </button>

              {/* Vimeo iframe – only mounted when modal open */}
              <div className="aspect-video w-full">
                <iframe
                  src={`https://player.vimeo.com/video/${selectedVideo.id}?autoplay=1&muted=1&controls=1&title=0&byline=0&portrait=0&dnt=true&app_id=58479`}
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  allowFullScreen
                  className="w-full h-full"
                  title={selectedVideo.title}
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>

              {/* Modal info bar – now with a subtle gradient background */}
              <div
                className="p-4 md:p-6 border-t border-white/50"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.6) 100%)",
                }}
              >
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                  {selectedVideo.title}
                </h3>
                <p className="text-gray-600 mt-1">
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