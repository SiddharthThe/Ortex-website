import { Reveal } from "./primitives";

const platforms = [
  { name: "ChatGPT", status: "supported" },
  { name: "Claude", status: "supported" },
  { name: "Gemini", status: "planned" },
];

export function Platforms() {
  return (
    <section className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h2 className="text-2xl font-medium tracking-[-0.02em] md:text-3xl">Sits between the interfaces you use.</h2>
          <p className="mono-label max-w-xs text-subtle">Works through the web interfaces. No official partnership or API access implied.</p>
        </Reveal>
        <Reveal delay={0.1} className="mt-12 grid border-y border-border md:grid-cols-[1fr_auto_1fr_auto_1fr]">
          {platforms.map((p, i) => (
            <div key={p.name} className="contents">
              <div tabIndex={0} className="group relative px-2 py-8 outline-none md:px-8">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-medium tracking-tight text-muted-foreground transition-colors group-hover:text-foreground group-focus-visible:text-foreground">{p.name}</span>
                  <span className="mono-label">{p.status}</span>
                </div>
                <div className="mt-4 font-mono text-xs text-subtle transition-colors group-hover:text-signal group-focus-visible:text-signal">
                  Capture → Normalize → Transfer
                </div>
              </div>
              {i < platforms.length - 1 && (
                <div className="hidden items-center md:flex" aria-hidden>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-signal">· ORTEX ·</span>
                </div>
              )}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
