import { useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  FiSend,
  FiInstagram,
  FiFacebook,
  FiCheckCircle,
  FiX,
  FiLoader,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { QRCodeSVG } from "qrcode.react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const prefersReducedMotion = useReducedMotion();

  // Optimized variants for a professional slide-up effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1], // Smooth premium easing
      },
    },
  };

  const whatsappNumber = "+8801991677898";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);
    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_USER_ID,
      )
      .then(() => {
        setIsSuccess(true);
        setIsSending(false);
        setTimeout(() => setIsSuccess(false), 5000);
        e.target.reset();
      })
      .catch(() => {
        setIsSending(false);
        setIsSuccess(false);
        setTimeout(() => setIsSuccess(false), 5000);
      });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }} // Triggers when 15% of section is visible
        variants={containerVariants}
        className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center"
      >
        {/* LEFT SIDE: Heading & Socials */}
        <div className="lg:col-span-5 flex flex-col gap-10">
          <div className="flex font-heading flex-col gap-4 text-center lg:text-left">
            <motion.p
              variants={itemVariants}
              className="text-xs font-bold uppercase tracking-[0.4em] text-purple-600"
            >
              Get In Touch
            </motion.p>
            <motion.h2
              variants={itemVariants}
              className="font-black leading-[0.9] tracking-tighter text-gray-900"
              style={{ fontSize: "clamp(55px, 10vw, 95px)" }}
            >
              LET'S START <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #ec4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                A PROJECT.
              </span>
            </motion.h2>
          </div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-8 items-center lg:items-start"
          >
            <p className="text-gray-500 text-lg max-w-sm leading-relaxed text-center lg:text-left">
              Have a vision? I have the tools. Send me a message or reach out
              via social media.
            </p>

            {/* Social Icons with subtle hover */}
            <div className="flex gap-4">
              {[
                {
                  icon: <FiFacebook />,
                  link: "https://www.facebook.com/koushik.sujan.7#",
                },
                {
                  icon: <FiInstagram />,
                  link: "https://www.instagram.com/koushik_sujan",
                },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.link}
                  target="_blank"
                  whileHover={
                    prefersReducedMotion ? {} : { y: -5, scale: 1.05 }
                  }
                  whileTap={{ scale: 0.95 }}
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl bg-white border border-gray-100 text-purple-600 shadow-sm"
                  style={{ willChange: "transform" }}
                >
                  {social.icon}
                </motion.a>
              ))}
              <motion.button
                onClick={() => setShowQR(true)}
                whileHover={prefersReducedMotion ? {} : { y: -5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366]"
                style={{ willChange: "transform" }}
              >
                <FaWhatsapp />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* RIGHT SIDE: Optimized Form */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-7 relative p-8 md:p-10 rounded-[2rem] bg-white/40 backdrop-blur-md"
          style={{
            border: "2px solid rgba(255,255,255,0.8)",
            boxShadow: "0 32px 80px rgba(124,58,237,0.06)",
            willChange: "transform, opacity",
          }}
        >
          <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              <div className="flex flex-col gap-2.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-3">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                  disabled={isSending}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-100 focus:border-purple-400 outline-none transition-all text-sm disabled:opacity-50"
                />
              </div>
              <div className="flex flex-col gap-2.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-3">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  disabled={isSending}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-100 focus:border-purple-400 outline-none transition-all text-sm disabled:opacity-50"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-3">
                Your Message
              </label>
              <textarea
                name="message"
                rows="4"
                placeholder="How can I help you stand out?"
                required
                disabled={isSending}
                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-100 focus:border-purple-400 outline-none transition-all text-sm resize-none disabled:opacity-50"
              />
            </div>

            <motion.button
              whileHover={
                prefersReducedMotion || isSending ? {} : { scale: 1.01 }
              }
              whileTap={
                prefersReducedMotion || isSending ? {} : { scale: 0.98 }
              }
              type="submit"
              disabled={isSending}
              className="flex items-center justify-center gap-3 py-4 rounded-xl text-white font-bold uppercase tracking-widest text-xs transition-all"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #ec4899)",
                boxShadow: "0 10px 25px rgba(124,58,237,0.25)",
              }}
            >
              {isSending ? (
                <FiLoader className="animate-spin text-lg" />
              ) : (
                <>
                  <span>Send Proposal</span>
                  <FiSend />
                </>
              )}
            </motion.button>
          </form>

          {/* Success Overlay with smooth fade */}
          <AnimatePresence>
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-[2rem] bg-white/80 text-center p-10"
              >
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6"
                >
                  <FiCheckCircle className="text-4xl text-green-500" />
                </motion.div>
                <h3 className="text-2xl font-black text-gray-900">
                  MESSAGE SENT!
                </h3>
                <p className="text-gray-500 mt-2">
                  I'll get back to you shortly.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-6 text-xs font-bold uppercase text-purple-600 underline"
                >
                  Dismiss
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* WHATSAPP MODAL */}
      <AnimatePresence>
        {showQR && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowQR(false)}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm w-full bg-white p-8 rounded-[2.5rem] shadow-2xl text-center"
            >
              {/* QR Code */}
              <div className="p-4 bg-gray-50 rounded-[2rem] border-4 border-gray-100 shadow-inner mb-6">
                <QRCodeSVG
                  value={whatsappLink}
                  size={200}
                  level="H"
                  includeMargin
                  className="mx-auto"
                />
              </div>

              <h4 className="text-xl font-bold text-gray-900">Scan to Chat</h4>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                Scan this QR code or click below to start a chat instantly.
              </p>

              {/* Clickable WhatsApp redirect button */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl text-white font-bold uppercase tracking-widest text-xs transition-all hover:opacity-90"
                style={{
                  background: "linear-gradient(135deg, #25D366, #128C7E)",
                  boxShadow: "0 8px 20px rgba(37, 211, 102, 0.3)",
                }}
              >
                <FaWhatsapp />
                <span>Open WhatsApp</span>
              </a>

              {/* Close button */}
              <button
                onClick={() => setShowQR(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-200 transition-colors"
              >
                <FiX size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;