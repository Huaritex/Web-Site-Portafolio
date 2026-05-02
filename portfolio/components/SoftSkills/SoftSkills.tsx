"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const SOFT_SKILLS = [
  { name: "Problem Solving",    level: 92, symbol: "◈", color: "#00ff88", desc: "Systems-first approach" },
  { name: "Adaptability",       level: 93, symbol: "⟳", color: "#60a5fa", desc: "Thrives in ambiguity"   },
  { name: "Critical Thinking",  level: 90, symbol: "⊕", color: "#a78bfa", desc: "Root cause analysis"   },
  { name: "Communication",      level: 88, symbol: "◉", color: "#fb923c", desc: "Clear & concise"       },
  { name: "Creativity",         level: 85, symbol: "✦", color: "#f43f5e", desc: "Novel solutions"       },
  { name: "Teamwork",           level: 87, symbol: "⌘", color: "#22d3ee", desc: "Collaborative mindset" },
  { name: "Leadership",         level: 80, symbol: "△", color: "#00ff88", desc: "Lead by example"       },
  { name: "Attention to Detail",level: 91, symbol: "⊞", color: "#60a5fa", desc: "Zero tolerance for bugs"},
];

const RADIUS = 38;
const CIRC = 2 * Math.PI * RADIUS;

interface SkillCardProps {
  skill: (typeof SOFT_SKILLS)[0];
  index: number;
}

function SkillCard({ skill, index }: SkillCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-60px" });

  useEffect(() => {
    if (!circleRef.current || !numRef.current) return;

    const delay = index * 0.07;
    const target = CIRC * (1 - skill.level / 100);

    if (isInView) {
      gsap.fromTo(
        circleRef.current,
        { strokeDashoffset: CIRC },
        { strokeDashoffset: target, duration: 1.6, delay, ease: "power3.out" }
      );
      gsap.fromTo(
        numRef.current,
        { textContent: 0 },
        {
          textContent: skill.level,
          duration: 1.4,
          delay,
          snap: { textContent: 1 },
          ease: "power2.out",
        }
      );
    } else {
      gsap.to(circleRef.current, {
        strokeDashoffset: CIRC,
        duration: 0.6,
        ease: "power2.in",
      });
      gsap.to(numRef.current, {
        textContent: 0,
        duration: 0.5,
        snap: { textContent: 1 },
        ease: "power2.in",
      });
    }
  }, [isInView, skill.level, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.88 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 50, scale: 0.88 }
      }
      transition={{ duration: 0.65, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col items-center gap-3 p-6 terminal-window group cursor-default overflow-hidden"
    >
      {/* Hex pattern bg */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill='${encodeURIComponent(skill.color)}' fill-opacity='1'%3E%3Cpolygon points='14 0 28 8 28 24 14 32 0 24 0 8'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "28px 49px",
        }}
        aria-hidden="true"
      />

      {/* Glow pulse */}
      <div
        className="absolute top-4 inset-x-0 mx-auto w-16 h-16 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"
        style={{ background: skill.color }}
        aria-hidden="true"
      />

      {/* SVG ring */}
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg
          width="96"
          height="96"
          className="rotate-[-90deg] absolute inset-0"
          aria-hidden="true"
        >
          <circle
            cx="48" cy="48" r={RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="4"
          />
          <circle
            ref={circleRef}
            cx="48" cy="48" r={RADIUS}
            fill="none"
            stroke={skill.color}
            strokeWidth="4"
            strokeLinecap="round"
            style={{
              strokeDasharray: CIRC,
              strokeDashoffset: CIRC,
              filter: `drop-shadow(0 0 8px ${skill.color}88)`,
              transition: "none",
            }}
          />
        </svg>

        {/* Center */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <span
            className="text-lg leading-none mb-0.5 group-hover:scale-110 transition-transform duration-300"
            style={{ color: skill.color }}
            aria-hidden="true"
          >
            {skill.symbol}
          </span>
          <span
            ref={numRef}
            className="text-xs font-mono font-bold tabular-nums leading-none"
            style={{ color: skill.color }}
          >
            0
          </span>
          <span
            className="text-[8px] font-mono opacity-50 leading-none"
            style={{ color: skill.color }}
          >
            %
          </span>
        </div>
      </div>

      {/* Name */}
      <p className="text-center text-sm font-mono text-[var(--color-text-muted)] group-hover:text-white transition-colors duration-300 leading-tight">
        {skill.name}
      </p>

      {/* Desc */}
      <p className="text-center text-[10px] font-mono opacity-0 group-hover:opacity-60 transition-opacity duration-300 text-[var(--color-text-muted)] -mt-1">
        {skill.desc}
      </p>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
        style={{ background: `linear-gradient(90deg, ${skill.color}, transparent)` }}
        aria-hidden="true"
      />
    </motion.div>
  );
}

export default function SoftSkills() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!titleRef.current) return;

      const split = new SplitText(titleRef.current, { type: "words,chars" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play reverse play reverse",
        },
      });

      if (labelRef.current) {
        tl.fromTo(
          labelRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
        );
      }

      tl.fromTo(
        split.chars,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.03, ease: "power4.out" },
        "<0.2"
      );

      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "<0.3"
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="soft-skills"
      className="relative py-32 px-6 md:px-16 max-w-7xl mx-auto overflow-x-clip"
    >
      {/* Top separator */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(0,255,136,0.2), transparent)",
        }}
        aria-hidden="true"
      />

      {/* Ambient glow */}
      <div
        className="absolute top-24 right-0 w-[400px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(96,165,250,0.04) 0%, transparent 65%)" }}
        aria-hidden="true"
      />

      {/* Title block */}
      <div className="mb-16 overflow-hidden">
        <p
          ref={labelRef}
          className="text-xs font-mono text-[var(--color-accent)] tracking-[0.4em] uppercase mb-5 opacity-0"
        >
          // 03. human protocols
        </p>

        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold text-white overflow-hidden"
        >
           Soft Skills{" "}
          <span className="gradient-text">Skills</span>
        </h2>

        <p
          ref={subtitleRef}
          className="mt-4 text-[var(--color-text-muted)] font-mono text-sm max-w-md opacity-0"
        >
          Beyond the terminal — the human layer of the stack.
        </p>
      </div>

      {/* 4-column grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
        {SOFT_SKILLS.map((skill, i) => (
          <SkillCard key={i} skill={skill} index={i} />
        ))}
      </div>

      {/* Animated bottom line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.3, ease: "easeOut", delay: 0.4 }}
        viewport={{ once: false, margin: "-80px" }}
        className="mt-20 h-px origin-left"
        style={{
          background: "linear-gradient(90deg, var(--color-accent), rgba(96,165,250,0.5), transparent)",
        }}
        aria-hidden="true"
      />

      {/* Footer note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        viewport={{ once: false, margin: "-80px" }}
        className="mt-6 text-center font-mono text-xs text-[var(--color-text-muted)]"
      >
        <span className="text-[var(--color-accent)]">$</span> soft_skills --display --human-readable
      </motion.p>
    </section>
  );
}
