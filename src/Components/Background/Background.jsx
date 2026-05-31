import { useEffect, useState } from "react";

const DESKTOP_BLOBS = [
  {
    wrapperClass: "absolute top-20 left-20 w-[500px] h-[500px] blob-float-1",
    bg: "radial-gradient(circle at 40% 40%, rgba(139,92,246,0.55) 0%, rgba(167,139,250,0.25) 55%, transparent 80%)",
  },
  {
    wrapperClass:
      "absolute bottom-24 right-16 w-[480px] h-[480px] blob-float-2",
    bg: "radial-gradient(circle at 60% 60%, rgba(236,72,153,0.50) 0%, rgba(251,113,133,0.20) 55%, transparent 80%)",
  },
  {
    wrapperClass: "absolute top-1/3 right-20 w-[420px] h-[420px] blob-float-3",
    bg: "radial-gradient(circle at 50% 50%, rgba(251,146,60,0.45) 0%, rgba(252,211,77,0.20) 55%, transparent 80%)",
  },
  {
    wrapperClass: "absolute bottom-0 left-1/4 w-[380px] h-[380px] blob-float-4",
    bg: "radial-gradient(circle at 50% 50%, rgba(56,189,248,0.40) 0%, rgba(99,102,241,0.18) 55%, transparent 80%)",
  },
  {
    wrapperClass: "absolute w-[320px] h-[320px] blob-float-5",
    wrapperStyle: { top: "calc(50% - 160px)", left: "calc(50% - 160px)" },
    bg: "radial-gradient(circle at 50% 50%, rgba(168,85,247,0.25) 0%, rgba(236,72,153,0.12) 60%, transparent 80%)",
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

  useEffect(() => {
    const updateMode = () => {
      // Consistent 640px breakpoint as your senior said
      const mobile = window.matchMedia("(max-width: 639px)").matches;
      setIsMobile(mobile);
    };

    updateMode();
    window.addEventListener("resize", updateMode);
    return () => window.removeEventListener("resize", updateMode);
  }, []);

  const blobs = isMobile ? MOBILE_BLOBS : DESKTOP_BLOBS;

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #dde8ff 0%, #ede0ff 35%, #ffe0f0 65%, #fff3dc 100%)",
      }}
    >
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {blobs.map((blob, i) => (
          <div key={i} className={blob.wrapperClass} style={blob.wrapperStyle}>
            <div
              className="w-full h-full rounded-full"
              style={{ background: blob.bg }}
            />
          </div>
        ))}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(255,255,255,0.07)" }}
        />
      </div>

      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
};

export default Background;