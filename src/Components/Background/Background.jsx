import { useEffect, useRef } from "react";
import gsap from "gsap";

const Background = ({ children }) => {
  const rootRef = useRef(null);
  const blobsRef = useRef([]);

  useEffect(() => {
    // Organic GSAP floating for each blob
    blobsRef.current.forEach((blob, i) => {
      if (!blob) return;
      gsap.to(blob, {
        x: `random(-120, 120)`,
        y: `random(-120, 120)`,
        scale: `random(0.85, 1.2)`,
        duration: gsap.utils.random(12, 22),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 1.2,
      });
    });

    // Parallax on mouse move
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const cx = (e.clientX / innerWidth - 0.5) * 2;
      const cy = (e.clientY / innerHeight - 0.5) * 2;
      blobsRef.current.forEach((blob, i) => {
        if (!blob) return;
        const depth = (i + 1) * 18;
        gsap.to(blob, {
          x: `+=${cx * depth * 0.3}`,
          y: `+=${cy * depth * 0.3}`,
          duration: 2.5,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative min-h-screen w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #dde8ff 0%, #ede0ff 35%, #ffe0f0 65%, #fff3dc 100%)",
      }}
    >
      {/* ─── BLOB LAYER ─── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Blob 1 — deep violet */}
        <div
          ref={(el) => (blobsRef.current[0] = el)}
          className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 40% 40%, rgba(139,92,246,0.60) 0%, rgba(167,139,250,0.30) 55%, transparent 80%)",
            filter: "blur(72px)",
          }}
        />
        {/* Blob 2 — hot pink */}
        <div
          ref={(el) => (blobsRef.current[1] = el)}
          className="absolute -bottom-24 -right-16 w-[480px] h-[480px] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 60% 60%, rgba(236,72,153,0.55) 0%, rgba(251,113,133,0.25) 55%, transparent 80%)",
            filter: "blur(72px)",
          }}
        />
        {/* Blob 3 — amber/orange */}
        <div
          ref={(el) => (blobsRef.current[2] = el)}
          className="absolute top-1/3 -right-20 w-[420px] h-[420px] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(251,146,60,0.50) 0%, rgba(252,211,77,0.25) 55%, transparent 80%)",
            filter: "blur(80px)",
          }}
        />
        {/* Blob 4 — electric cyan/indigo */}
        <div
          ref={(el) => (blobsRef.current[3] = el)}
          className="absolute bottom-0 left-1/4 w-[380px] h-[380px] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(56,189,248,0.45) 0%, rgba(99,102,241,0.20) 55%, transparent 80%)",
            filter: "blur(72px)",
          }}
        />
        {/* Blob 5 — accent purple/pink center */}
        <div
          ref={(el) => (blobsRef.current[4] = el)}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(168,85,247,0.30) 0%, rgba(236,72,153,0.15) 60%, transparent 80%)",
            filter: "blur(80px)",
          }}
        />

        {/* Very subtle white glass sheen */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(255,255,255,0.07)" }}
        />
      </div>

      {/* ─── CONTENT ─── */}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
};

export default Background;