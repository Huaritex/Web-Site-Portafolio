"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TOOLS = [
  "Python", "TypeScript", "JavaScript", "Bash", "Linux", "Docker", "AWS",
  "Metasploit", "Burp Suite", "Wireshark", "Nmap", "TensorFlow", "OSINT"
];

const STATS = [
  { value: "30+", label: "Repositories" },
  { value: "2+",  label: "Years Active"  },
  { value: "6+",  label: "Live Projects" },
];

const SPECIALTIES = [
  "Security Research",
  "AI / ML",
  "Full-Stack Dev",
  "OSINT",
];

export default function About() {
  const sectionRef  = useRef<HTMLElement>(null);
  const imageRef    = useRef<HTMLDivElement>(null);
  const linesRef    = useRef<(HTMLElement | null)[]>([]);
  const toolsRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        x: -60,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 75%",
          end: "top 20%",
          toggleActions: "play reverse play reverse",
        },
      });

      const validLines = linesRef.current.filter(Boolean) as HTMLElement[];
      if (validLines.length) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "top 20%",
            toggleActions: "play reverse play reverse",
          },
        });

        tl.from(validLines, {
          x: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.09,
          ease: "power3.out",
        });
      }

      gsap.from(toolsRef.current, {
        opacity: 0,
        y: 24,
        duration: 0.8,
        scrollTrigger: {
          trigger: toolsRef.current,
          start: "top 88%",
          end: "top 20%",
          toggleActions: "play reverse play reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const line = (i: number) => (el: HTMLElement | null) => {
    linesRef.current[i] = el;
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 px-6 md:px-16 max-w-7xl mx-auto overflow-x-clip"
    >
      {/* Ambient background blob */}
      <div
        className="absolute top-24 -left-32 w-[500px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,255,136,0.04) 0%, transparent 65%)" }}
        aria-hidden="true"
      />

      <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-center">

        {/* ── Left: Image & Status ─────────────────────── */}
        <div ref={imageRef} className="relative flex flex-col items-center">
          <div className="relative w-full max-w-sm">

            {/* Decorative outer rings */}
            <div
              className="absolute border border-[rgba(0,255,136,0.06)] rounded-sm pointer-events-none"
              style={{ inset: "-14px" }}
              aria-hidden="true"
            />
            <div
              className="absolute border border-[rgba(0,255,136,0.03)] rounded-sm pointer-events-none"
              style={{ inset: "-28px" }}
              aria-hidden="true"
            />

            {/* Photo */}
            <div className="relative aspect-square rounded-sm overflow-hidden">
              <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,255,136,0.10) 0%, transparent 50%, rgba(96,165,250,0.06) 100%)",
                }}
              />

              <img
                src="https://avatars.githubusercontent.com/u/159574524?v=4"
                alt="Huaritex"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />

              {/* Scanline texture */}
              <div
                className="absolute inset-0 z-20 pointer-events-none"
                style={{
                  background:
                    "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.07) 3px,rgba(0,0,0,0.07) 4px)",
                }}
                aria-hidden="true"
              />

              {/* Corner brackets */}
              <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[var(--color-accent)] z-30 pointer-events-none" />
              <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[var(--color-accent)] z-30 pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[var(--color-accent)] z-30 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[var(--color-accent)] z-30 pointer-events-none" />

              {/* Frame border */}
              <div className="absolute inset-0 border border-[rgba(0,255,136,0.22)] z-40 pointer-events-none" />
            </div>

            {/* Path badge — top left */}
            <div
              className="absolute terminal-window px-3 py-2"
              style={{ top: "-16px", left: "-8px" }}
            >
              <span className="font-mono text-[11px] text-[var(--color-text-muted)]">
                <span className="text-[var(--color-accent)]">~/</span>huaritex
              </span>
            </div>
          </div>

          {/* Terminal status card — placed below the image cleanly */}
          <div className="mt-12 terminal-window px-5 py-4 w-full max-w-sm shadow-lg relative z-10">
            <div className="flex items-center gap-2 mb-3 border-b border-[rgba(0,255,136,0.1)] pb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 text-[10px] font-mono text-[var(--color-text-muted)] opacity-50">status.sh</span>
            </div>
            <div className="font-mono text-xs space-y-2.5">
              <div className="flex items-start gap-4">
                <span className="text-[var(--color-accent)] opacity-70 shrink-0 w-12">role</span>
                <span className="text-[var(--color-text-muted)]">cybersec + ml</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-[var(--color-accent)] opacity-70 shrink-0 w-12">loc</span>
                <span className="text-[var(--color-text-muted)]">Bolivia</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[var(--color-accent)] opacity-70 shrink-0 w-12">status</span>
                <span className="flex items-center gap-2 text-green-400">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
                  available
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Text ──────────────────────────────── */}
        <div>
          <p
            ref={line(0)}
            className="text-xs font-mono text-[var(--color-accent)] tracking-[0.4em] uppercase mb-7"
          >
            // 01. about me
          </p>

          <h2
            ref={line(1)}
            className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight"
          >
            Cybersecurity{" "}
            <span className="gradient-text">Enthusiast</span>
            <br />& Builder
          </h2>

          <div ref={line(2)} className="space-y-6 text-[var(--color-text-muted)] leading-relaxed text-base mb-10">
            <p>
              I'm a developer obsessed with the intersection of{" "}
              <span className="text-white font-medium">cybersecurity</span> and{" "}
              <span className="text-[var(--color-accent)]">artificial intelligence</span>.
              I build systems that protect, analyze, and evolve.
            </p>
            <p>
              Currently deep in{" "}
              <span className="text-white font-medium">malware analysis</span> and{" "}
              <span className="text-white font-medium">AI-applied security</span> — always
              seeking collaborations on ambitious, creative projects.
            </p>
            <p>
              My toolkit spans from low-level exploitation to high-level ML models — I live at both ends of the stack.
            </p>
          </div>

          {/* Stats grid */}
          <div
            ref={line(3)}
            className="about-stats-grid grid grid-cols-3 mb-8"
          >
            {STATS.map((stat, i) => (
              <div key={i} className="about-stat py-5 text-center">
                <div className="text-2xl md:text-3xl font-bold font-mono gradient-text mb-1 tabular-nums">
                  {stat.value}
                </div>
                <div className="text-[10px] font-mono text-[var(--color-text-muted)] tracking-[0.2em] uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Specialty badges */}
          <div ref={line(4)} className="flex flex-wrap gap-2">
            {SPECIALTIES.map((label, i) => (
              <span
                key={i}
                className="group flex items-center gap-2 px-3 py-1.5 text-xs border border-[var(--color-border)] text-[var(--color-text-muted)] rounded-sm font-mono hover:border-[rgba(0,255,136,0.35)] hover:text-[var(--color-accent)] transition-all duration-300 cursor-default"
              >
                <span className="text-[var(--color-accent)] opacity-40 group-hover:opacity-100 transition-opacity">
                  &gt;_
                </span>
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tech Marquee ─────────────────────────────── */}
      <div ref={toolsRef} className="mt-24">
        {/* Top divider */}
        <div
          className="h-px mb-6"
          style={{ background: "linear-gradient(90deg,transparent,rgba(0,255,136,0.25),transparent)" }}
          aria-hidden="true"
        />

        {/* Single Row — scrolls left */}
        <div className="relative overflow-hidden py-3">
          <div
            className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(90deg,var(--color-bg),transparent)" }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(270deg,var(--color-bg),transparent)" }}
          />
          <div className="marquee-track">
            {[...TOOLS, ...TOOLS, ...TOOLS, ...TOOLS].map((tool, i) => (
              <span
                key={i}
                className="flex items-center gap-4 px-8 text-sm font-mono text-[var(--color-text-muted)] whitespace-nowrap"
              >
                <span className="text-[var(--color-accent)] opacity-40 select-none">//</span>
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom divider */}
        <div
          className="h-px mt-6"
          style={{ background: "linear-gradient(90deg,transparent,rgba(0,255,136,0.25),transparent)" }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
