"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: "01",
    name: "Deep Learning Cybersecurity",
    description:
      "ML-powered threat detection system using deep learning models to identify and classify cybersecurity threats in real-time network traffic.",
    tags: ["Python", "TensorFlow", "Jupyter", "Cybersecurity"],
    url: "https://github.com/Huaritex/Deep-Learning-Cybersecurity-Threat-Detection",
    color: "#00ff88",
    featured: true,
  },
  {
    id: "02",
    name: "URLytics",
    description:
      "Advanced URL analysis and phishing detection tool leveraging OSINT techniques and ML algorithms to evaluate URL safety and malicious intent.",
    tags: ["Python", "ML", "OSINT", "Security"],
    url: "https://github.com/Huaritex/URLytics",
    color: "#60a5fa",
    featured: true,
  },
  {
    id: "03",
    name: "Desktop App CEAF",
    description:
      "TypeScript-based desktop application for cybersecurity event analysis and forensics, with real-time monitoring capabilities.",
    tags: ["TypeScript", "Electron", "Forensics"],
    url: "https://github.com/Huaritex/Desktop_app.exe-CEAF",
    color: "#a78bfa",
    featured: true,
  },
  {
    id: "04",
    name: "Space Biology Engine",
    description:
      "Knowledge engine for space biology research — builds semantic graphs connecting biological concepts and spatial data.",
    tags: ["JavaScript", "Graph DB", "Knowledge Graph"],
    url: "https://github.com/Huaritex/Build_a_Space_Biology_Knowledge_Engine",
    color: "#fb923c",
    featured: false,
  },
  {
    id: "05",
    name: "DeepCam Fake Detector",
    description:
      "AI-powered deepfake detection system for video content, using computer vision and deep learning to identify manipulated media.",
    tags: ["Python", "CV", "Deep Learning", "AI"],
    url: "https://github.com/Huaritex/deep-cam-fake",
    color: "#f43f5e",
    featured: false,
  },
  {
    id: "06",
    name: "Triage Santa Cruz",
    description:
      "Medical triage management system built with TypeScript for emergency departments, streamlining patient prioritization workflows.",
    tags: ["TypeScript", "Healthcare", "Web App"],
    url: "https://github.com/Huaritex/triage-santa-cruz",
    color: "#22d3ee",
    featured: false,
  },
];

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = (x / rect.width) * 100;
    const cy = (y / rect.height) * 100;

    glow.style.setProperty("--cx", `${cx}%`);
    glow.style.setProperty("--cy", `${cy}%`);

    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 7;
    const rotateX = -((y - rect.height / 2) / (rect.height / 2)) * 5;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.25,
      ease: "power2.out",
      transformPerspective: 900,
    });
  };

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      scale: 1.025,
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(arrowRef.current, {
      x: 4,
      y: -4,
      opacity: 1,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.45,
      ease: "power3.out",
    });
    gsap.to(arrowRef.current, {
      x: 0,
      y: 0,
      opacity: 0.5,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleClick = () => {
    window.open(project.url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="project-card rounded-sm border border-[var(--color-border)] p-6 md:p-8 cursor-pointer"
      style={{ transformStyle: "preserve-3d" }}
      role="link"
      tabIndex={0}
      aria-label={`Open ${project.name} repository`}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
    >
      {/* Glow overlay */}
      <div
        ref={glowRef}
        className="project-card-glow"
        style={{
          background: `radial-gradient(400px circle at var(--cx, 50%) var(--cy, 50%), ${project.color}18, transparent 60%)`,
        }}
      />

      <div className="project-card-content">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <span
            className="text-3xl font-bold font-mono opacity-20"
            style={{ color: project.color }}
          >
            {project.id}
          </span>
          <span
            ref={arrowRef}
            className="text-lg font-mono opacity-50 inline-block"
            style={{ color: project.color }}
            aria-hidden="true"
          >
            ↗
          </span>
        </div>

        {/* Name */}
        <h3 className="text-xl font-bold text-white mb-3 leading-snug">
          {project.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="text-[10px] px-2 py-1 font-mono border border-[var(--color-border)] text-[var(--color-text-muted)] rounded-sm"
              style={{ borderColor: `${project.color}22` }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Featured badge */}
        {project.featured && (
          <div className="mt-4 flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: project.color }}
            />
            <span
              className="text-[10px] font-mono tracking-widest uppercase"
              style={{ color: project.color }}
            >
              Pinned
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

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

      const cards = cardsContainerRef.current?.querySelectorAll(".project-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: "top 80%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-32 px-6 md:px-16 max-w-7xl mx-auto"
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, var(--color-accent), transparent)",
          opacity: 0.15,
        }}
      />

      <div ref={titleRef} className="mb-16">
        <p className="text-xs font-mono text-[var(--color-accent)] tracking-[0.4em] uppercase mb-3">
          // 03. selected work
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          Featured{" "}
          <span className="gradient-text">Projects</span>
        </h2>
      </div>

      <div
        ref={cardsContainerRef}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
      >
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <a
          href="https://github.com/Huaritex"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-mono text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors duration-300 border-b border-transparent hover:border-[var(--color-accent)] pb-0.5"
        >
          View all 30+ repositories on GitHub ↗
        </a>
      </div>
    </section>
  );
}
