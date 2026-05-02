export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] py-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-[var(--color-accent)] font-mono font-bold">{"<"}</span>
          <span className="font-bold text-sm">Huaritex</span>
          <span className="text-[var(--color-accent)] font-mono font-bold">{"/>"}</span>
        </div>

        <p className="text-xs font-mono text-[var(--color-text-muted)]">
          Built with Next.js + GSAP. Secured with passion.
        </p>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/Huaritex"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
          >
            GitHub ↗
          </a>
          <a
            href="mailto:huaritex@gmail.com"
            className="text-xs font-mono text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
          >
            Email ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
