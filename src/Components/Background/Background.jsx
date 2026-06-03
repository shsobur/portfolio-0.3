import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const DESKTOP_BLOBS = [
  {
    wrapperClass: "absolute top-20 left-20 w-[500px] h-[500px]",
    bg: "radial-gradient(circle at 40% 40%, rgba(139,92,246,0.55) 0%, rgba(167,139,250,0.25) 55%, transparent 80%)",
    factor: 0.04, // Subtle movement
  },
  {
    wrapperClass: "absolute bottom-24 right-16 w-[480px] h-[480px]",
    bg: "radial-gradient(circle at 60% 60%, rgba(236,72,153,0.50) 0%, rgba(251,113,133,0.20) 55%, transparent 80%)",
    factor: 0.04,
  },
  {
    wrapperClass: "absolute top-1/3 right-20 w-[420px] h-[420px]",
    bg: "radial-gradient(circle at 50% 50%, rgba(251,146,60,0.45) 0%, rgba(252,211,77,0.20) 55%, transparent 80%)",
    factor: 0.03,
  },
  {
    wrapperClass: "absolute bottom-0 left-1/4 w-[380px] h-[380px]",
    bg: "radial-gradient(circle at 50% 50%, rgba(56,189,248,0.40) 0%, rgba(99,102,241,0.18) 55%, transparent 80%)",
    factor: 0.05,
  },
  {
    wrapperClass: "absolute w-[320px] h-[320px]",
    wrapperStyle: { top: "calc(50% - 160px)", left: "calc(50% - 160px)" },
    bg: "radial-gradient(circle at 50% 50%, rgba(168,85,247,0.25) 0%, rgba(236,72,153,0.12) 60%, transparent 80%)",
    factor: 0.05,
  },
];

const MOBILE_BLOBS = [
  {
    wrapperClass: "absolute top-10 left-10 w-[200px] h-[200px]",
    bg: "radial-gradient(circle at 40% 40%, rgba(139,92,246,0.55) 0%, rgba(167,139,250,0.25) 55%, transparent 80%)",
  },
  {
    wrapperClass: "absolute top-1/2 right-12 w-[180px] h-[180px]",
    bg: "radial-gradient(circle at 60% 60%, rgba(236,72,153,0.50) 0%, rgba(251,113,133,0.20) 55%, transparent 80%)",
  },
  {
    wrapperClass: "absolute bottom-0 left-1/4 w-[160px] h-[160px]",
    bg: "radial-gradient(circle at 50% 50%, rgba(251,146,60,0.45) 0%, rgba(252,211,77,0.20) 55%, transparent 80%)",
  },
];

const Background = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const blobRefs = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const updateMode = () => {
      setIsMobile(window.matchMedia("(max-width: 639px)").matches);
    };
    updateMode();
    window.addEventListener("resize", updateMode);

    // GSAP Setup
    let ctx = gsap.context(() => {
      // 1. Ambient Movement (Floating slowly on their own)
      blobRefs.current.forEach((blob) => {
        if (!blob) return;
        gsap.to(blob, {
          x: "random(-25, 25)",
          y: "random(-25, 25)",
          duration: "random(3, 5)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // 2. Mouse Interaction (Desktop Only)
      if (!isMobile) {
        const moveBlobs = (e) => {
          const { clientX, clientY } = e;
          const xPos = clientX - window.innerWidth / 2;
          const yPos = clientY - window.innerHeight / 2;

          blobRefs.current.forEach((blob, i) => {
            if (!blob) return;
            const factor = DESKTOP_BLOBS[i]?.factor || 0.03;
            gsap.to(blob, {
              x: xPos * factor,
              y: yPos * factor,
              duration: 1.2,
              ease: "power2.out",
              overwrite: "auto",
            });
          });
        };

        window.addEventListener("mousemove", moveBlobs);
        return () => window.removeEventListener("mousemove", moveBlobs);
      }
    }, containerRef);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", updateMode);
    };
  }, [isMobile]);

  const blobs = isMobile ? MOBILE_BLOBS : DESKTOP_BLOBS;

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full"
      style={{
        background:
          "linear-gradient(135deg, #dde8ff 0%, #ede0ff 35%, #ffe0f0 65%, #fff3dc 100%)",
      }}
    >
      {/* Background layer (fixed) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {blobs.map((blob, i) => (
          <div
            key={i}
            ref={(el) => (blobRefs.current[i] = el)}
            className={blob.wrapperClass}
            style={{ ...blob.wrapperStyle, willChange: "transform" }}
          >
            <div
              className="w-full h-full rounded-full"
              style={{ background: blob.bg }}
            />
          </div>
        ))}
        {/* Original light overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(255,255,255,0.07)" }}
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
};

export default Background;