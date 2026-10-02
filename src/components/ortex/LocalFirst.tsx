import { Reveal } from "./primitives";

export function LocalFirst() {
  return (
    <section className="border-t border-border py-28 md:py-40">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 md:grid-cols-2">
        <Reveal>
          <p className="eyebrow">Local-first</p>
          <h2 className="mt-6 text-3xl font-medium tracking-[-0.03em] md:text-5xl md:leading-[1.05]">
            Your context stays<br /><span className="text-subtle">in your browser.</span>
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
            Ortex is designed around local-first processing. Conversation state can be maintained in browser storage without requiring a project-owned cloud backend.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="rounded-lg border border-border-strong">
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <span className="h-2 w-2 rounded-full bg-muted" /><span className="h-2 w-2 rounded-full bg-muted" /><span className="h-2 w-2 rounded-full bg-muted" />
              <span className="ml-3 mono-label">chromium · your machine</span>
            </div>
            <div className="grid grid-cols-2 gap-3 p-5">
              <div className="rounded-md border border-border p-4"><p className="mono-label">tab</p><p className="mt-1 text-sm">chatgpt.com</p></div>
              <div className="rounded-md border border-border p-4"><p className="mono-label">tab</p><p className="mt-1 text-sm">claude.ai</p></div>
              <div className="col-span-2 rounded-md border border-signal/40 p-4">
                <div className="flex justify-between"><p className="mono-label text-signal">ortex · service worker</p><p className="mono-label">IndexedDB</p></div>
                <div className="mt-3 grid grid-cols-6 gap-1">
                  {Array.from({ length: 18 }).map((_, i) => <span key={i} className={`h-2 rounded-sm ${i % 5 === 0 ? "bg-signal/70" : "bg-muted"}`} />)}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-dashed border-border px-5 py-3 mono-label">
              <span>project-owned cloud backend</span><span className="text-subtle">not required</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
