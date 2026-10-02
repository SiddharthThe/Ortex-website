import { motion } from "motion/react";
import { Reveal, SectionHead, ease } from "./primitives";

const manual = [
  { t: "ChatGPT", k: "node" },
  { t: "work", k: "step" },
  { t: "Claude", k: "node" },
  { t: "copy", k: "friction" },
  { t: "paste", k: "friction" },
  { t: "rewrite context", k: "friction" },
  { t: "continue", k: "step" },
];

export function ProblemFlow() {
  return (
    <section className="border-t border-border py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead index="01" label="Continuity" title={<>Every model<br /><span className="text-subtle">starts from zero.</span></>}>
          Switching models shouldn't mean rebuilding the conversation. Today, moving between AI interfaces means losing the requirements, code and decisions you already worked out.
        </SectionHead>

        <div className="mt-20 grid gap-6 md:grid-cols-2">
          <Reveal className="panel p-6 md:p-8">
            <div className="flex items-center justify-between mono-label"><span>today</span><span>7 steps · manual</span></div>
            <ol className="mt-8 space-y-0">
              {manual.map((s, i) => (
                <motion.li
                  key={s.t}
                  initial={{ opacity: 0, x: -6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease }}
                  className="flex items-center gap-4"
                >
                  <span className="flex w-3 flex-col items-center">
                    <span className={`h-1.5 w-1.5 rounded-full ${s.k === "friction" ? "bg-destructive/70" : s.k === "node" ? "bg-foreground" : "bg-subtle"}`} />
                    {i < manual.length - 1 && <span className="h-6 w-px bg-border-strong" />}
                  </span>
                  <span className={`-mt-6 font-mono text-sm ${s.k === "node" ? "text-foreground" : s.k === "friction" ? "text-muted-foreground line-through decoration-destructive/50" : "text-subtle"}`}>{s.t}</span>
                </motion.li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.15} className="panel flex flex-col p-6 md:p-8">
            <div className="flex items-center justify-between mono-label"><span>with ortex</span><span className="text-signal">1 transfer</span></div>
            <div className="flex flex-1 flex-col items-center justify-center gap-0 py-10">
              {["ChatGPT", "ORTEX", "Claude"].map((t, i) => (
                <div key={t} className="flex flex-col items-center">
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.25, duration: 0.6, ease }}
                    className={`rounded-md border px-6 py-3 font-mono text-sm ${i === 1 ? "border-signal/60 tracking-[0.22em] text-signal" : "border-border-strong"}`}
                  >
                    {t}
                  </motion.div>
                  {i < 2 && (
                    <svg width="2" height="44" className="overflow-visible" aria-hidden>
                      <line x1="1" y1="0" x2="1" y2="44" stroke="var(--signal)" strokeWidth="1" className="dash-flow" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">The conversation carries over. You keep working.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
