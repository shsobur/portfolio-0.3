import { useEffect, useRef } from "react";
import gsap from "gsap";

const CustomCursor = () => {
  const dotRef = useRef(null);
  const outlineRef = useRef(null);

  useEffect(() => {
    // 1. Hide the cursor only on Desktop (touch devices don't have cursors)
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) return;

    // 2. Setup GSAP quickTo (The secret for lag-free movement)
    const xDot = gsap.quickTo(dotRef.current, "x", {
      duration: 0.1,
      ease: "power3",
    });
    const yDot = gsap.quickTo(dotRef.current, "y", {
      duration: 0.1,
      ease: "power3",
    });

    const xOutline = gsap.quickTo(outlineRef.current, "x", {
      duration: 0.4,
      ease: "power3",
    });
    const yOutline = gsap.quickTo(outlineRef.current, "y", {
      duration: 0.4,
      ease: "power3",
    });

    const handleMouseMove = (e) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xOutline(e.clientX);
      yOutline(e.clientY);
    };

    // 3. Hover Effects (Scale up when touching buttons/links)
    const handleMouseEnter = () => {
      gsap.to(outlineRef.current, {
        scale: 1.5,
        backgroundColor: "rgba(124, 58, 237, 0.1)",
        duration: 0.3,
      });
      gsap.to(dotRef.current, { scale: 0.5, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      gsap.to(outlineRef.current, {
        scale: 1,
        backgroundColor: "transparent",
        duration: 0.3,
      });
      gsap.to(dotRef.current, { scale: 1, duration: 0.3 });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Attach hover effect to all buttons, links, and video cards
    const interactiveElements = document.querySelectorAll("button, a, .group");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Small Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-purple-600 rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{ transform: "translate(-50%, -50%)" }}
      />
      {/* Larger Outer Circle */}
      <div
        ref={outlineRef}
        className="fixed top-0 left-0 w-10 h-10 border-2 border-purple-500/50 rounded-full pointer-events-none z-[9998] hidden md:block"
        style={{ transform: "translate(-50%, -50%)" }}
      />
    </>
  );
};

export default CustomCursor;