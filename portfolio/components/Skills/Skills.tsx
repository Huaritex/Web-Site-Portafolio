"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SKILL_CATEGORIES = [
  {
    title: "Languages",
    icon: "{ }",
    skills: [
      { name: "Python", level: 88 },
      { name: "TypeScript", level: 82 },
      { name: "JavaScript", level: 80 },
      { name: "C#", level: 65 },
      { name: "C++", level: 55 },
      { name: "Bash", level: 75 },
    ],
  },
  {
    title: "Security",
    icon: "🛡",
    skills: [
      { name: "Metasploit", level: 70 },
      { name: "Burp Suite", level: 72 },
      { name: "Wireshark", level: 78 },
      { name: "Nmap / Shodan", level: 80 },
      { name: "SQLMap", level: 68 },
      { name: "Volatility", level: 60 },
    ],
  },
  {
    title: "Infrastructure",
    icon: "⚡",
    skills: [
      { name: "Linux", level: 85 },
      { name: "Docker", level: 70 },
      { name: "AWS", level: 60 },
      { name: "Git", level: 82 },
      { name: "CI/CD", level: 58 },
      { name: "OSINT Tools", level: 75 },
    ],
  },
];

function SkillBar({ name, level }: { name: string; level: number }) {
  const barRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!barRef.current || !fillRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: barRef.current,
          start: "top 85%",
          once: true,
        },
      });

      tl.to(fillRef.current, {
        scaleX: level / 100,
        duration: 1.2,
        ease: "power3.out",
      });

      tl.to(
        numRef.current,
        {
          textContent: level,
          duration: 1.0,
          snap: { textContent: 1 },
          ease: "power2.out",
        },
        "<"
      );
    });

    return () => ctx.revert();
  }, [level]);

  return (
    <div ref={barRef} className="group">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-[var(--color-text-muted)] font-mono group-hover:text-white transition-colors duration-300">
          {name}
        </span>
        <span
          ref={numRef}
          className="text-xs font-mono text-[var(--color-accent)] tabular-nums"
        >
          0
        </span>
      </div>
      <div className="skill-bar rounded-full">
        <div
          ref={fillRef}
          className="skill-fill rounded-full"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          once: true,
        },
      });

      cardsRef.current.forEach((card, i) => {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.7,
          delay: i * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            once: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-32 px-6 md:px-16 max-w-7xl mx-auto"
    >
      {/* Section title */}
      <div ref={titleRef} className="mb-16">
        <p className="text-xs font-mono text-[var(--color-accent)] tracking-[0.4em] uppercase mb-5">
          // 02. cyber arsenal
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          Skills &{" "}
          <span className="gradient-text">Technologies</span>
        </h2>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {SKILL_CATEGORIES.map((cat, i) => (
          <div
            key={i}
            ref={(el) => { if (el) cardsRef.current[i] = el; }}
            className="terminal-window p-6"
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-8 pb-5 border-b border-[rgba(0,255,136,0.08)]">
              <span className="text-lg">{cat.icon}</span>
              <h3 className="font-mono text-sm tracking-widest uppercase text-[var(--color-accent)]">
                {cat.title}
              </h3>
            </div>

            {/* Skills */}
            <div className="space-y-6">
              {cat.skills.map((skill, j) => (
                <SkillBar key={j} {...skill} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom accent */}
      <div className="mt-20 text-center">
        <p className="font-mono text-sm text-[var(--color-text-muted)]">
          <span className="text-[var(--color-accent)]">$</span> always --learning
        </p>
      </div>
    </section>
  );
}
