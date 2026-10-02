import { Arrow, GITHUB_URL, Logo, Reveal } from "./primitives";

export function FinalCTA() {
  return (
    <section id="get" className="scroll-mt-14 border-t border-border py-32 md:py-48">
      <Reveal className="mx-auto max-w-6xl px-6">
        <h2 className="text-[clamp(2.5rem,6.5vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.045em]">
          Your workflow<br /><span className="text-subtle">shouldn't forget.</span>
        </h2>
        <p className="mt-6 text-lg text-muted-foreground">Keep your context moving.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href={GITHUB_URL} className="btn-primary group">Get Ortex <Arrow /></a>
          <a href={GITHUB_URL} className="btn-ghost">View GitHub</a>
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-14 md:flex-row md:justify-between">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">Cross-platform context orchestration for LLM workflows.</p>
          <p className="mt-6 mono-label text-subtle">Built as an open-source engineering project.</p>
        </div>
        <ul className="flex gap-8 text-sm text-muted-foreground">
          <li><a href={GITHUB_URL} className="hover:text-foreground">GitHub</a></li>
          <li><a href={GITHUB_URL} className="hover:text-foreground">Documentation</a></li>
          <li><a href="#architecture" className="hover:text-foreground">Architecture</a></li>
        </ul>
      </div>
    </footer>
  );
}
