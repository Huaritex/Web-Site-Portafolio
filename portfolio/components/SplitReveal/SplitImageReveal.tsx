"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STRIPS = 6;

export default function SplitImageReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const stripsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const container = containerRef.current;
      if (!section || !container) return;

      // Pin the section while animating
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=250%",
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const p = self.progress;

          // Phase 1 (0 → 0.5): strips slide in from alternating directions
          if (p <= 0.5) {
            const phase = p / 0.5;
            stripsRef.current.forEach((strip, i) => {
              const even = i % 2 === 0;
              const yOffset = (1 - phase) * (even ? -120 : 120);
              const scale = 0.85 + phase * 0.15;
              gsap.set(strip, {
                y: `${yOffset}%`,
                scale,
                opacity: phase,
              });
            });
            // Text hidden in phase 1
            if (textRef.current) {
              gsap.set(textRef.current, { opacity: 0, y: 40 });
            }
          }

          // Phase 2 (0.5 → 1): image fades to slight scale, text reveals
          if (p > 0.5) {
            const phase = (p - 0.5) / 0.5;
            stripsRef.current.forEach((strip) => {
              gsap.set(strip, { y: "0%", scale: 1, opacity: 1 });
            });
            // Dim and scale image slightly
            gsap.set(container, { scale: 1 + phase * 0.04, opacity: 1 - phase * 0.3 });
            if (textRef.current) {
              gsap.set(textRef.current, {
                opacity: phase,
                y: (1 - phase) * 40,
              });
            }
          } else {
            if (container) gsap.set(container, { scale: 1, opacity: 1 });
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-[var(--color-bg)]"
      id="split-reveal"
    >
      {/* Split image container */}
      <div
        ref={containerRef}
        className="absolute inset-0 flex"
        style={{ willChange: "transform, opacity" }}
      >
        {Array.from({ length: STRIPS }).map((_, i) => {
          const widthPct = 100 / STRIPS;
          return (
            <div
              key={i}
              ref={(el) => {
                if (el) stripsRef.current[i] = el;
              }}
              className="relative overflow-hidden"
              style={{
                width: `${widthPct}%`,
                height: "100%",
                opacity: 0,
                transform: `translateY(${i % 2 === 0 ? "-120%" : "120%"})`,
              }}
            >
              {/* Each strip shows the same image with offset background position */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1600&q=80')`,
                  backgroundSize: `${STRIPS * 100}% 100%`,
                  backgroundPosition: `${(i / (STRIPS - 1)) * 100}% center`,
                  backgroundRepeat: "no-repeat",
                }}
              />
              {/* Dark overlay per strip */}
              <div
                className="absolute inset-0"
                style={{
                  background: `rgba(5,5,8,${0.1 + (i % 2) * 0.15})`,
                }}
              />
              {/* Strip border lines */}
              {i > 0 && (
                <div
                  className="absolute left-0 top-0 bottom-0 w-px"
                  style={{ background: "rgba(0,255,136,0.15)" }}
                />
              )}
            </div>
          );
        })}

        {/* Global overlay gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,5,8,0.3) 0%, transparent 30%, transparent 70%, rgba(5,5,8,0.6) 100%)",
          }}
        />
      </div>

      {/* Overlaid text (appears in phase 2) */}
      <div
        ref={textRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-10 opacity-0"
        style={{ willChange: "opacity, transform" }}
      >
        <div className="text-center px-6">
          <p className="text-xs font-mono text-[var(--color-accent)] tracking-[0.4em] uppercase mb-4">
            // 01. About
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            Securing the{" "}
            <span className="gradient-text">Digital World</span>
          </h2>
          <p className="text-[var(--color-text-muted)] max-w-md mx-auto text-lg">
            Where code meets security — building intelligent systems that protect and evolve.
          </p>
        </div>
      </div>

      {/* Top label */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
        <p className="text-[10px] font-mono text-[var(--color-text-muted)] tracking-[0.5em] uppercase opacity-50">
          scroll to reveal
        </p>
      </div>
    </section>
  );
}
