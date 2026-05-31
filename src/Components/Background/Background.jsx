import { useEffect, useRef } from "react";
import gsap from "gsap";

// ─── Blob config (split out for clarity) ────────────────────────────────────
const BLOBS = [
  {
    // Blob 1 — deep violet (top-left)
    wrapperClass: "absolute -top-20 -left-20 w-[500px] h-[500px]",
    bg: "radial-gradient(circle at 40% 40%, rgba(139,92,246,0.60) 0%, rgba(167,139,250,0.30) 55%, transparent 80%)",
    blur: "40px", // was 72px — reduced for GPU budget
  },
  {
    // Blob 2 — hot pink (bottom-right)
    wrapperClass: "absolute -bottom-24 -right-16 w-[480px] h-[480px]",
    bg: "radial-gradient(circle at 60% 60%, rgba(236,72,153,0.55) 0%, rgba(251,113,133,0.25) 55%, transparent 80%)",
    blur: "40px", // was 72px
  },
  {
    // Blob 3 — amber/orange (mid-right)
    wrapperClass: "absolute top-1/3 -right-20 w-[420px] h-[420px]",
    bg: "radial-gradient(circle at 50% 50%, rgba(251,146,60,0.50) 0%, rgba(252,211,77,0.25) 55%, transparent 80%)",
    blur: "45px", // was 80px
  },
  {
    // Blob 4 — electric cyan/indigo (bottom-left)
    wrapperClass: "absolute bottom-0 left-1/4 w-[380px] h-[380px]",
    bg: "radial-gradient(circle at 50% 50%, rgba(56,189,248,0.45) 0%, rgba(99,102,241,0.20) 55%, transparent 80%)",
    blur: "40px", // was 72px
  },
  {
    // Blob 5 — accent purple/pink (center)
    // NOTE: uses wrapperStyle instead of translate classes so GSAP doesn't conflict
    wrapperClass: "absolute w-[320px] h-[320px]",
    wrapperStyle: { top: "calc(50% - 160px)", left: "calc(50% - 160px)" },
    bg: "radial-gradient(circle at 50% 50%, rgba(168,85,247,0.30) 0%, rgba(236,72,153,0.15) 60%, transparent 80%)",
    blur: "45px", // was 80px
  },
];

const Background = ({ children }) => {
  // TWO-WRAPPER APPROACH:
  // mouseRefs = outer div → only mouse parallax moves this
  // floatRefs = inner div → only float animation moves this
  // They never share the same GSAP target, so no conflicts, no drift
  const mouseRefs = useRef([]);
  const floatRefs = useRef([]);

  useEffect(() => {
    // ── Float animation on inner blob divs ──────────────────────────────────
    floatRefs.current.forEach((blob, i) => {
      if (!blob) return;
      gsap.to(blob, {
        x: `random(-80, 80)`,
        y: `random(-80, 80)`,
        scale: `random(0.90, 1.15)`,
        duration: gsap.utils.random(14, 26),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 1.5,
      });
    });

    // ── RAF-throttled mouse parallax on outer wrapper divs ──────────────────
    // Key fixes vs original:
    //   1. RAF throttle — schedules at most 1 update per frame (was: every pixel)
    //   2. Absolute x/y — no cumulative += drift
    //   3. passive: true — browser can scroll-optimize without waiting for JS
    let rafId = null;
    let mx = 0;
    let my = 0;

    const onMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (rafId) return; // already scheduled this frame, skip
      rafId = requestAnimationFrame(() => {
        const cx = (mx / window.innerWidth - 0.5) * 2;
        const cy = (my / window.innerHeight - 0.5) * 2;
        mouseRefs.current.forEach((el, i) => {
          if (!el) return;
          const depth = (i + 1) * 10;
          gsap.to(el, {
            x: cx * depth, // absolute — not += (no more drift)
            y: cy * depth,
            duration: 2.5,
            ease: "power2.out",
            overwrite: "auto",
          });
        });
        rafId = null;
      });
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
      gsap.killTweensOf(floatRefs.current);
      gsap.killTweensOf(mouseRefs.current);
    };
  }, []);

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #dde8ff 0%, #ede0ff 35%, #ffe0f0 65%, #fff3dc 100%)",
      }}
    >
      {/* ─── BLOB LAYER ─── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {BLOBS.map((blob, i) => (
          <div
            key={i}
            ref={(el) => (mouseRefs.current[i] = el)}
            className={blob.wrapperClass}
            style={{
              willChange: "transform", // pre-promote to GPU layer
              ...blob.wrapperStyle,
            }}
          >
            <div
              ref={(el) => (floatRefs.current[i] = el)}
              className="w-full h-full rounded-full"
              style={{
                background: blob.bg,
                filter: `blur(${blob.blur})`,
                willChange: "transform", // pre-promote to GPU layer
              }}
            />
          </div>
        ))}

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