"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const overlay = overlayRef.current;
    const bar = barRef.current;
    const num = numRef.current;
    const text = textRef.current;
    if (!overlay || !bar || !num || !text) return;

    const tl = gsap.timeline();

    // Count up 0 → 100
    tl.to(num, {
      textContent: 100,
      snap: { textContent: 1 },
      duration: 1.8,
      ease: "power2.inOut",
    });

    // Bar fill
    tl.to(
      bar,
      {
        scaleX: 1,
        duration: 1.8,
        ease: "power2.inOut",
      },
      "<"
    );

    // Wait a moment, then slide out
    tl.to(
      [text, bar.parentElement],
      { opacity: 0, duration: 0.4, ease: "power2.in" },
      "+=0.2"
    );

    tl.to(
      overlay,
      {
        yPercent: -100,
        duration: 0.9,
        ease: "power4.inOut",
      },
      "-=0.1"
    );

    tl.call(() => setVisible(false));

    return () => { tl.kill(); };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
      style={{ background: "var(--color-bg)" }}
    >
      {/* Glowing center */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,255,136,0.08) 0%, transparent 70%)",
        }}
      />

      <div ref={textRef} className="relative z-10 text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="text-[var(--color-accent)] font-mono text-2xl font-bold">{"<"}</span>
          <span className="font-bold text-2xl tracking-tight">Huaritex</span>
          <span className="text-[var(--color-accent)] font-mono text-2xl font-bold">{"/>"}</span>
        </div>

        {/* Counter */}
        <span
          ref={numRef}
          className="text-7xl font-bold font-mono text-[var(--color-accent)] tabular-nums glow-green"
        >
          0
        </span>
        <span className="text-2xl font-mono text-[var(--color-text-muted)] ml-1">%</span>

        {/* Progress bar */}
        <div className="mt-8 w-48 mx-auto h-px bg-[rgba(255,255,255,0.06)] overflow-hidden relative">
          <div
            ref={barRef}
            className="absolute inset-0 origin-left"
            style={{
              background: "linear-gradient(90deg, var(--color-accent), #60a5fa)",
              transform: "scaleX(0)",
            }}
          />
        </div>

        <p className="mt-4 text-xs font-mono text-[var(--color-text-muted)] tracking-widest uppercase">
          Initializing...
        </p>
      </div>
    </div>
  );
}
