"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SOCIAL_LINKS = [
  { label: "GitHub", url: "https://github.com/Huaritex", icon: "gh" },
  { label: "Email", url: "mailto:huaritex@gmail.com", icon: "em" },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<string[]>([]);
  const [phase, setPhase] = useState(0);

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

      gsap.from(terminalRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: terminalRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const PROMPTS = [
    "Enter your name:",
    "Enter your email:",
    "Your message:",
    "Sending...",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newLines = [...lines, `> ${input}`];

    if (phase < 3) {
      setLines(newLines);
      setInput("");
      setPhase(phase + 1);

      if (phase === 2) {
        setTimeout(() => {
          setLines((l) => [
            ...l,
            "",
            "✓ Message received.",
            "I'll get back to you soon.",
            "",
            "$ _",
          ]);
          setPhase(4);
        }, 800);
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-20 md:py-32 px-6 md:px-16 max-w-7xl mx-auto"
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, var(--color-accent), transparent)",
          opacity: 0.12,
        }}
      />

      <div className="grid md:grid-cols-2 gap-16 items-start">
        {/* Left */}
        <div ref={titleRef}>
          <p className="text-xs font-mono text-[var(--color-accent)] tracking-[0.4em] uppercase mb-4">
            // 04. contact
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Let's Build{" "}
            <span className="gradient-text">Something</span>
            <br />
            Together
          </h2>
          <p className="text-[var(--color-text-muted)] leading-relaxed mb-10">
            I'm open to interesting collaborations, security research,
            freelance work, and ambitious creative projects.
          </p>

          {/* Contact links */}
          <div className="space-y-4">
            <a
              href="mailto:huaritex@gmail.com"
              className="flex items-center gap-4 group"
            >
              <div className="w-10 h-10 border border-[var(--color-border)] rounded-sm flex items-center justify-center group-hover:border-[var(--color-accent)] group-hover:bg-[var(--color-accent-dim)] transition-all duration-300">
                <span className="text-xs font-mono text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors">
                  @
                </span>
              </div>
              <span className="font-mono text-sm text-[var(--color-text-muted)] group-hover:text-white transition-colors">
                huaritex@gmail.com
              </span>
            </a>

            <a
              href="https://github.com/Huaritex"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 group"
            >
              <div className="w-10 h-10 border border-[var(--color-border)] rounded-sm flex items-center justify-center group-hover:border-[var(--color-accent)] group-hover:bg-[var(--color-accent-dim)] transition-all duration-300">
                <span className="text-xs font-mono text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors">
                  gh
                </span>
              </div>
              <span className="font-mono text-sm text-[var(--color-text-muted)] group-hover:text-white transition-colors">
                github.com/Huaritex
              </span>
            </a>
          </div>
        </div>

        {/* Right: Interactive terminal */}
        <div ref={terminalRef} className="terminal-window">
          {/* Header */}
          <div className="flex items-center gap-2 px-5 py-3 border-b border-[rgba(0,255,136,0.1)]">
            <span className="terminal-dot bg-red-400" />
            <span className="terminal-dot bg-yellow-400" />
            <span className="terminal-dot bg-green-400" />
            <span className="ml-4 text-xs font-mono text-[var(--color-text-muted)]">
              contact.sh
            </span>
          </div>

          {/* Body */}
          <div className="p-5 min-h-[280px] font-mono text-sm">
            <div className="text-[var(--color-accent)] mb-4 text-xs">
              $ ./send-message.sh
            </div>

            {/* Previous lines */}
            {lines.map((line, i) => (
              <div
                key={i}
                className={`mb-1 ${
                  line.startsWith(">")
                    ? "text-white"
                    : line.startsWith("✓")
                    ? "text-[var(--color-accent)]"
                    : "text-[var(--color-text-muted)]"
                }`}
              >
                {line}
              </div>
            ))}

            {/* Current prompt */}
            {phase < 3 && (
              <div className="mt-2">
                <div className="text-[var(--color-text-muted)] mb-1">
                  {PROMPTS[phase]}
                </div>
                <form onSubmit={handleSubmit} className="flex items-center gap-1">
                  <span className="text-[var(--color-accent)]">$</span>
                  <input
                    type={phase === 1 ? "email" : "text"}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-transparent text-white outline-none ml-2 placeholder:text-[var(--color-text-muted)] font-mono text-sm"
                    placeholder="_"
                    autoFocus
                    required
                  />
                  <button type="submit" className="hidden">Send</button>
                </form>
              </div>
            )}

            {phase >= 4 && lines.length > 0 && (
              <button
                onClick={() => {
                  setLines([]);
                  setPhase(0);
                  setInput("");
                }}
                className="mt-4 text-xs font-mono text-[var(--color-accent)] hover:underline"
              >
                [restart]
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
