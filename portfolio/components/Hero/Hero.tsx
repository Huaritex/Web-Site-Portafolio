"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const ROLES = ["Cybersecurity", "AI/ML", "Full-Stack"];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const roleIndexRef = useRef(0);
  const roleTxtRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 2.8 });

      // Badge
      tl.from(badgeRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      });

      // Headline
      if (headlineRef.current) {
        const split = new SplitText(headlineRef.current, { type: "chars,words" });
        tl.from(
          split.chars,
          {
            y: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.025,
            ease: "power4.out",
          },
          "-=0.3"
        );
      }

      // Sub
      tl.from(subRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      }, "-=0.3");

      // CTA
      tl.from(ctaRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      }, "-=0.3");

      // Glow parallax
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          if (glowRef.current) {
            gsap.set(glowRef.current, { y: self.progress * 80 });
          }
        },
      });
    }, sectionRef);

    // Role rotator
    let interval: ReturnType<typeof setInterval>;
    const rotateRole = () => {
      const el = roleTxtRef.current;
      if (!el) return;
      gsap.to(el, {
        y: -20,
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          roleIndexRef.current = (roleIndexRef.current + 1) % ROLES.length;
          el.textContent = ROLES[roleIndexRef.current];
          gsap.fromTo(el, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 });
        },
      });
    };
    interval = setInterval(rotateRole, 2500);

    return () => {
      ctx.revert();
      clearInterval(interval);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grid-bg"
      id="hero"
    >
      {/* Ambient glow */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,255,136,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Floating orbs */}
      <div
        className="absolute top-[15%] left-[8%] w-40 h-40 rounded-full opacity-20 float-animate"
        style={{
          background: "radial-gradient(circle, rgba(0,255,136,0.3), transparent)",
          animationDelay: "0s",
        }}
      />
      <div
        className="absolute bottom-[20%] right-[6%] w-28 h-28 rounded-full opacity-15 float-animate"
        style={{
          background: "radial-gradient(circle, rgba(96,165,250,0.4), transparent)",
          animationDelay: "-2s",
          animationDuration: "8s",
        }}
      />
      <div
        className="absolute top-[60%] left-[5%] w-20 h-20 rounded-full opacity-10 float-animate"
        style={{
          background: "radial-gradient(circle, rgba(167,139,250,0.5), transparent)",
          animationDelay: "-4s",
          animationDuration: "10s",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <div ref={badgeRef} className="flex items-center justify-center gap-2 mb-8">
          <div className="flex gap-1.5 items-center">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] opacity-60 animate-pulse" style={{ animationDelay: "0.2s" }} />
          </div>
          <span className="text-xs font-mono text-[var(--color-accent)] tracking-widest uppercase">
            Available for opportunities
          </span>
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight mb-16 overflow-hidden"
        >
          <span className="block">Building the</span>
          <span className="block gradient-text">Future of</span>
          <span className="block text-white">Security</span>
        </h1>

        {/* Rotating role */}
        <p
          ref={subRef}
          className="mt-10 text-lg md:text-xl text-[var(--color-text-muted)] font-mono"
        >
          {"//"}{" "}
          <span
            ref={roleTxtRef}
            className="text-[var(--color-accent)] inline-block"
          >
            {ROLES[0]}
          </span>{" "}
          Developer
        </p>

        {/* CTA */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-20"
        >
          <button
            onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
            className="group relative px-8 py-4 bg-[var(--color-accent)] text-black font-semibold text-sm tracking-wide overflow-hidden rounded-sm"
          >
            <span className="relative z-10">View Projects</span>
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
          </button>
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 border border-[rgba(255,255,255,0.1)] text-[var(--color-text-muted)] font-mono text-sm tracking-wide hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-300 rounded-sm"
          >
            Get in touch →
          </button>
        </div>

        {/* Stats */}
        <div className="mt-20 flex items-center justify-center gap-12 md:gap-20">
          {[
            { num: "30+", label: "Projects" },
            { num: "2+", label: "Years Coding" },
            { num: "∞", label: "Curiosity" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[var(--color-accent)] glow-green">
                {stat.num}
              </div>
              <div className="text-xs text-[var(--color-text-muted)] mt-1 font-mono tracking-widest uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-[10px] font-mono tracking-widest text-[var(--color-text-muted)] uppercase">
          scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-[var(--color-accent)] to-transparent" />
      </div>
    </section>
  );
}
