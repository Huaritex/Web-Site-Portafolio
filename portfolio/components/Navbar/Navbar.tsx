"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.from(nav, {
      y: -80,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      ease: "power3.out",
    });

    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-8 md:px-16 py-5 transition-all duration-500 ${
        scrolled
          ? "bg-[rgba(5,5,8,0.9)] backdrop-blur-xl border-b border-[rgba(0,255,136,0.08)]"
          : ""
      }`}
    >
      {/* Logo */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="flex items-center gap-2 group"
        aria-label="Go to top"
      >
        <span className="text-[var(--color-accent)] font-mono text-lg font-bold glow-green">
          {"<"}
        </span>
        <span className="font-bold text-lg tracking-tight">Huaritex</span>
        <span className="text-[var(--color-accent)] font-mono text-lg font-bold glow-green">
          {"/>"}
        </span>
      </button>

      {/* Links */}
      <ul className="hidden md:flex items-center gap-8">
        {navLinks.map((link, i) => (
          <li key={i}>
            <button
              onClick={() => handleNav(link.href)}
              className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors duration-300 font-mono tracking-wide"
            >
              <span className="text-[var(--color-accent)] opacity-60 mr-1 text-xs">
                0{i + 1}.
              </span>
              {link.label}
            </button>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={() => handleNav("#contact")}
        className="hidden md:flex items-center gap-2 px-5 py-2 border border-[var(--color-accent)] text-[var(--color-accent)] text-sm font-mono rounded-sm hover:bg-[var(--color-accent)] hover:text-black transition-all duration-300"
      >
        Hire Me
      </button>
    </nav>
  );
}
