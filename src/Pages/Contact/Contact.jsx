import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSend,
  FiInstagram,
  FiFacebook,
  FiCheckCircle,
  FiX,
  FiLoader,
  FiAlertCircle,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { QRCodeSVG } from "qrcode.react";
import emailjs from "@emailjs/browser";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
});

const Contact = () => {
  const form = useRef();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false); // Custom error state
  const [isSending, setIsSending] = useState(false); // Loading state
  const [showQR, setShowQR] = useState(false);

  const whatsappNumber = "+8801991677898";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true); // Start loading

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
      .catch((error) => {
        console.log("FAILED...", error.text);
        setIsSending(false);
        setIsError(true);
        setTimeout(() => setIsError(false), 5000);
      });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* LEFT SIDE: Information & Socials */}
        <div className="lg:col-span-5 flex flex-col gap-10">
          <div className="flex font-heading flex-col gap-4 text-center lg:text-left">
            <motion.p
              {...fadeUp(0.1)}
              className="text-xs font-bold uppercase tracking-[0.4em] text-purple-600"
            >
              Get In Touch
            </motion.p>
            <motion.h2
              {...fadeUp(0.2)}
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
            {...fadeUp(0.3)}
            className="flex flex-col gap-8 items-center lg:items-start"
          >
            <p className="text-gray-500 text-lg max-w-sm leading-relaxed text-center lg:text-left">
              Have a vision? I have the tools. Send me a message or reach out
              via social media.
            </p>
            <div className="flex gap-4">
              {[
                { icon: <FiFacebook />, link: "#" },
                { icon: <FiInstagram />, link: "#" },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.link}
                  target="_blank"
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl bg-white/40 border border-white/80 text-purple-600 backdrop-blur-xl shadow-sm"
                >
                  {social.icon}
                </motion.a>
              ))}
              <motion.button
                onClick={() => setShowQR(true)}
                whileHover={{ y: -5, scale: 1.1 }}
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] backdrop-blur-xl shadow-sm"
              >
                <FaWhatsapp />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* RIGHT SIDE: The Glass Form */}
        <motion.div
          {...fadeUp(0.4)}
          className="lg:col-span-7 relative p-8 md:p-10 rounded-[1.5rem]"
          style={{
            background: "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(32px)",
            border: "2px solid rgba(255, 255, 255, 0.8)",
            boxShadow: "0 32px 80px rgba(124, 58, 237, 0.12)",
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
                  className="w-full px-3 py-2 rounded-lg bg-white/60 border border-white focus:border-purple-400 outline-none transition-all text-sm disabled:opacity-50"
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
                  className="w-full px-3 py-2 rounded-lg bg-white/60 border border-white focus:border-purple-400 outline-none transition-all text-sm disabled:opacity-50"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-3">
                Your Message
              </label>
              <textarea
                name="message"
                rows="5"
                placeholder="How can I help you stand out?"
                required
                disabled={isSending}
                className="w-full px-3 py-2 rounded-lg bg-white/60 border border-white focus:border-purple-400 outline-none transition-all text-sm resize-none disabled:opacity-50"
              ></textarea>
            </div>

            <motion.button
              whileHover={!isSending ? { scale: 1.02 } : {}}
              whileTap={!isSending ? { scale: 0.98 } : {}}
              type="submit"
              disabled={isSending}
              className={`flex items-center justify-center gap-3 py-5 rounded-2xl text-white font-bold uppercase tracking-widest text-xs transition-all ${isSending ? "opacity-70 cursor-not-allowed" : ""}`}
              style={{
                background: "linear-gradient(135deg, #7c3aed, #ec4899)",
                boxShadow: "0 10px 30px rgba(124, 58, 237, 0.4)",
              }}
            >
              {isSending ? (
                <>
                  Sending <FiLoader className="animate-spin text-lg" />
                </>
              ) : (
                <>
                  Send Proposal <FiSend />
                </>
              )}
            </motion.button>
          </form>

          {/* SUCCESS OVERLAY */}
          <AnimatePresence>
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-[1.5rem] bg-white/95 backdrop-blur-md text-center p-10"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <FiCheckCircle className="text-4xl text-green-500" />
                </div>
                <h3 className="text-3xl font-black text-gray-900 leading-tight">
                  MESSAGE SENT!
                </h3>
                <p className="text-gray-500 mt-3 max-w-xs mx-auto">
                  Thanks for reaching out, Kawshik. I'll get back to you
                  shortly.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-8 text-xs font-bold uppercase tracking-widest text-purple-600 underline"
                >
                  Send another
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CUSTOM ERROR OVERLAY */}
          <AnimatePresence>
            {isError && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute inset-x-0 -bottom-20 z-30 flex items-center justify-center"
              >
                <div className="bg-red-500 text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3">
                  <FiAlertCircle size={20} />
                  <span className="text-xs font-bold tracking-wider uppercase">
                    Something went wrong. Try again later.
                  </span>
                  <button onClick={() => setIsError(false)}>
                    <FiX />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* WHATSAPP MODAL remains the same... */}
      <AnimatePresence>
        {showQR && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowQR(false)}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm w-full bg-white p-10 rounded-[3rem] shadow-2xl text-center cursor-default"
            >
              <button
                onClick={() => setShowQR(false)}
                className="absolute top-6 right-6 text-gray-300 hover:text-black transition-colors"
              >
                <FiX size={24} />
              </button>
              <div className="flex flex-col items-center gap-6">
                <div className="p-4 bg-gray-50 rounded-[2rem] border-4 border-gray-100 shadow-inner">
                  <QRCodeSVG
                    value={whatsappLink}
                    size={220}
                    level={"H"}
                    includeMargin={true}
                    fgColor="#000000"
                    bgColor="transparent"
                  />
                </div>
                <div>
                  <h4 className="text-2xl font-black text-gray-900 tracking-tight">
                    SCAN FOR WHATSAPP
                  </h4>
                  <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                    Scan this digital code to start a chat with me instantly.
                  </p>
                </div>
                <a
                  href={whatsappLink}
                  target="_blank"
                  className="text-xs font-bold uppercase tracking-widest text-green-500 bg-green-50 px-6 py-3 rounded-full hover:bg-green-100 transition-colors"
                >
                  Or click here to chat
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;