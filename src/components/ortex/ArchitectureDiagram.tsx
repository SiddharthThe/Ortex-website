import { motion } from "motion/react";
import { SectionHead } from "./primitives";

const layers = [
  { name: "LLM Interfaces", tag: "DOM", ctx: "page" },
  { name: "Content Scripts", tag: "MutationObserver", ctx: "page" },
  { name: "Platform Adapters", tag: "parse / inject", ctx: "page" },
  { name: "Service Worker", tag: "Manifest V3 · Runtime Messaging", ctx: "extension" },
  { name: "Context Engine", tag: "Token Estimation · Local Processing", ctx: "extension" },
  { name: "Local Storage", tag: "IndexedDB", ctx: "extension" },
  { name: "Destination Adapter", tag: "inject()", ctx: "page" },
];

export function ArchitectureDiagram() {
  return (
    <section id="architecture" className="scroll-mt-14 border-t border-border py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead index="03" label="Architecture" title={<>Built as an<br /><span className="text-subtle">orchestration layer.</span></>}>
          An event-driven Chromium extension. Page-context scripts observe and inject; the extension context holds state and does the processing.
        </SectionHead>

        <div className="mt-20 grid gap-10 md:grid-cols-[180px_1fr]">
          <div className="hidden space-y-4 md:block">
            <p className="eyebrow">Legend</p>
            <div className="flex items-center gap-2 mono-label"><span className="h-2 w-2 rounded-sm border border-border-strong" />page context</div>
            <div className="flex items-center gap-2 mono-label"><span className="h-2 w-2 rounded-sm bg-signal" />extension context</div>
            <p className="pt-4 mono-label leading-relaxed text-subtle">fig. 1 — data path from source interface to destination interface.</p>
          </div>
          <ol className="relative">
            {layers.map((l, i) => (
              <li key={l.name}>
                <motion.div
                  initial={{ opacity: 0.3 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ margin: "-35% 0px -35% 0px" }}
                  transition={{ duration: 0.5 }}
                  className="group grid grid-cols-[36px_1fr] items-center gap-4 md:grid-cols-[48px_1fr_auto]"
                >
                  <span className="font-mono text-xs text-subtle">L{i}</span>
                  <div className={`flex items-center gap-3 rounded-md border px-4 py-3.5 ${l.ctx === "extension" ? "border-signal/40 bg-signal-dim/40" : "border-border-strong bg-surface"}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${l.ctx === "extension" ? "bg-signal" : "bg-subtle"}`} />
                    <span className="text-sm font-medium md:text-base">{l.name}</span>
                    <span className="mono-label ml-auto md:hidden">{l.tag.split(" · ")[0]}</span>
                  </div>
                  <span className="mono-label hidden w-64 md:block">{l.tag}</span>
                </motion.div>
                {i < layers.length - 1 && (
                  <div className="grid grid-cols-[36px_1fr] md:grid-cols-[48px_1fr_auto]">
                    <span />
                    <svg height="22" width="100%" className="overflow-visible" aria-hidden>
                      <line x1="24" y1="0" x2="24" y2="22" stroke="var(--signal)" strokeOpacity="0.6" className="dash-flow" />
                    </svg>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
