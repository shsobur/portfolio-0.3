import { useEffect, useRef } from "react";
import gsap from "gsap";

// ─── Blob config ──────────────────────────────────────────────────
// No filter blur in the config – we rely on the radial gradient's
// own soft edges (transparent at 80%) for a lightweight blur effect.
const BLOBS = [
  {
    wrapperClass: "absolute -top-20 -left-20 w-[500px] h-[500px]",
    bg: "radial-gradient(circle at 40% 40%, rgba(139,92,246,0.55) 0%, rgba(167,139,250,0.25) 55%, transparent 80%)",
  },
  {
    wrapperClass: "absolute -bottom-24 -right-16 w-[480px] h-[480px]",
    bg: "radial-gradient(circle at 60% 60%, rgba(236,72,153,0.50) 0%, rgba(251,113,133,0.20) 55%, transparent 80%)",
  },
  {
    wrapperClass: "absolute top-1/3 -right-20 w-[420px] h-[420px]",
    bg: "radial-gradient(circle at 50% 50%, rgba(251,146,60,0.45) 0%, rgba(252,211,77,0.20) 55%, transparent 80%)",
  },
  {
    wrapperClass: "absolute bottom-0 left-1/4 w-[380px] h-[380px]",
    bg: "radial-gradient(circle at 50% 50%, rgba(56,189,248,0.40) 0%, rgba(99,102,241,0.18) 55%, transparent 80%)",
  },
  {
    wrapperClass: "absolute w-[320px] h-[320px]",
    wrapperStyle: { top: "calc(50% - 160px)", left: "calc(50% - 160px)" },
    bg: "radial-gradient(circle at 50% 50%, rgba(168,85,247,0.25) 0%, rgba(236,72,153,0.12) 60%, transparent 80%)",
  },
];

const Background = ({ children }) => {
  const mouseRefs = useRef([]); // outer wrapper – mouse parallax only
  const floatRefs = useRef([]); // inner div – float animation only

  useEffect(() => {
    // ── Float animation (inner blobs) – unchanged structure ──────
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

    // ── Mouse parallax with gsap.quickTo() ───────────────────────
    // quickTo functions are created ONCE – they update the same tween
    // without any allocation overhead each frame.
    const quickX = mouseRefs.current.map((el) =>
      el ? gsap.quickTo(el, "x", { duration: 2.5, ease: "power2.out" }) : null,
    );
    const quickY = mouseRefs.current.map((el) =>
      el ? gsap.quickTo(el, "y", { duration: 2.5, ease: "power2.out" }) : null,
    );

    let rafId = null;
    let mx = 0;
    let my = 0;

    const onMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const cx = (mx / window.innerWidth - 0.5) * 2;
        const cy = (my / window.innerHeight - 0.5) * 2;

        quickX.forEach((fn, i) => {
          if (fn) fn(cx * (i + 1) * 10);
        });
        quickY.forEach((fn, i) => {
          if (fn) fn(cy * (i + 1) * 10);
        });

        rafId = null;
      });
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
      // Kill all active float tweens
      gsap.killTweensOf(floatRefs.current);
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
              // GPU promotion with translate3d instead of will-change
              // to avoid over‑promotion on memory‑constrained devices.
              transform: "translate3d(0, 0, 0)",
              contain: "layout style paint", // hint to browser
              ...blob.wrapperStyle,
            }}
          >
            <div
              ref={(el) => (floatRefs.current[i] = el)}
              className="w-full h-full rounded-full"
              style={{
                background: blob.bg,
                // ⚠️ No filter blur! The radial gradient itself fades
                // to transparent for a soft edge without extra paint cost.
                transform: "translate3d(0, 0, 0)",
                contain: "layout style paint",
              }}
            />
          </div>
        ))}

        {/* Subtle white glass sheen (static, cheap) */}
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
