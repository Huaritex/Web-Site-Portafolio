"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const navLinks = [
  { label: "About",    href: "#about"    },
  { label: "Skills",   href: "#skills"   },
  { label: "Projects", href: "#projects" },
  { label: "Contact",  href: "#contact"  },
];

export default function Navbar() {
  const navRef   = useRef<HTMLElement>(null);
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.from(nav, { y: -80, opacity: 0, duration: 1, delay: 0.5, ease: "power3.out" });

    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-5 md:px-16 py-5 transition-all duration-500 ${
          scrolled
            ? "bg-[rgba(5,5,8,0.92)] backdrop-blur-xl border-b border-[rgba(0,255,136,0.08)]"
            : ""
        }`}
      >
        {/* Logo */}
        <button
          onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="flex items-center gap-2 group"
          aria-label="Go to top"
        >
          <span className="text-[var(--color-accent)] font-mono text-lg font-bold glow-green">{"<"}</span>
          <span className="font-bold text-lg tracking-tight">Huaritex</span>
          <span className="text-[var(--color-accent)] font-mono text-lg font-bold glow-green">{"/>"}</span>
        </button>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <li key={i}>
              <button
                onClick={() => handleNav(link.href)}
                className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors duration-300 font-mono tracking-wide"
              >
                <span className="text-[var(--color-accent)] opacity-60 mr-1 text-xs">0{i + 1}.</span>
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <button
          onClick={() => handleNav("#contact")}
          className="hidden md:flex items-center gap-2 px-5 py-2 border border-[var(--color-accent)] text-[var(--color-accent)] text-sm font-mono rounded-sm hover:bg-[var(--color-accent)] hover:text-black transition-all duration-300"
        >
          Hire Me
        </button>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden relative w-9 h-9 flex flex-col items-center justify-center gap-[5px] z-[1002]"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span
            className={`block w-6 h-px bg-[var(--color-accent)] transition-all duration-300 origin-center ${
              menuOpen ? "rotate-45 translate-y-[5px]" : ""
            }`}
          />
          <span
            className={`block h-px bg-[var(--color-accent)] transition-all duration-300 ${
              menuOpen ? "w-0 opacity-0" : "w-6 opacity-100"
            }`}
          />
          <span
            className={`block w-6 h-px bg-[var(--color-accent)] transition-all duration-300 origin-center ${
              menuOpen ? "-rotate-45 -translate-y-[5px]" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile Full-Screen Menu */}
      <div
        className={`fixed inset-0 z-[1001] flex flex-col items-center justify-center md:hidden transition-opacity duration-400 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(5,5,8,0.97)", backdropFilter: "blur(24px)" }}
      >
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" aria-hidden="true" />

        {/* Accent lines */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg,transparent,rgba(0,255,136,0.3),transparent)" }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg,transparent,rgba(0,255,136,0.15),transparent)" }}
          aria-hidden="true"
        />

        <nav
          className={`relative z-10 flex flex-col items-center gap-8 transition-all duration-500 ${
            menuOpen ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0"
          }`}
        >
          {navLinks.map((link, i) => (
            <button
              key={i}
              onClick={() => handleNav(link.href)}
              className="group flex items-center gap-3 text-2xl font-bold text-[var(--color-text-muted)] hover:text-white transition-colors duration-300"
            >
              <span className="text-xs font-mono text-[var(--color-accent)] opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                0{i + 1}.
              </span>
              {link.label}
            </button>
          ))}

          <button
            onClick={() => handleNav("#contact")}
            className="mt-4 px-10 py-3.5 border border-[var(--color-accent)] text-[var(--color-accent)] text-sm font-mono rounded-sm hover:bg-[var(--color-accent)] hover:text-black transition-all duration-300"
          >
            Hire Me
          </button>
        </nav>
      </div>
    </>
  );
}
