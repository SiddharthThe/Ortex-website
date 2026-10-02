import { motion } from "motion/react";
import { Arrow, SectionHead, ease } from "./primitives";

const source = [
  { r: "you", t: "Rate limiter for the API — 100 req/min per key." },
  { r: "gpt", t: "Token bucket in Redis. Keys expire after 60s." },
  { r: "you", t: "Decided: sliding window instead. Keep Redis." },
];

function Msg({ r, t, delay }: { r: string; t: string; delay: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay, duration: 0.5, ease }} className="space-y-1">
      <p className="mono-label">{r}</p>
      <p className="text-sm leading-relaxed text-foreground/90">{t}</p>
    </motion.div>
  );
}

export function WorkflowDemo() {
  return (
    <section className="border-t border-border py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead index="05" label="Workflow" title={<>Same work.<br /><span className="text-subtle">Different model.</span></>} />
        <div className="mt-16 grid gap-4 lg:grid-cols-[1fr_220px_1fr]">
          <div className="panel p-5">
            <div className="flex justify-between border-b border-border pb-3 mono-label"><span>chatgpt.com</span><span>source</span></div>
            <div className="mt-5 space-y-5">{source.map((m, i) => <Msg key={i} {...m} delay={i * 0.25} />)}</div>
          </div>

          <div className="flex flex-col items-center justify-center gap-3 py-4">
            <div className="relative hidden h-px w-full bg-border-strong lg:block">
              {[0, 0.8, 1.6].map((d) => <span key={d} className="packet-x absolute -top-[3px] h-[7px] w-[7px] -translate-x-1/2 rounded-full bg-signal" style={{ animationDelay: `${d}s` }} />)}
            </div>
            <div className="w-full rounded-md border border-signal/50 bg-background p-4 font-mono text-[11px] text-muted-foreground">
              <p className="tracking-[0.2em] text-signal">ORTEX</p>
              <p className="mt-3">captured · 3 msgs</p>
              <p>normalized · ok</p>
              <p>tokens · ~420</p>
              <p className="text-foreground">→ claude.ai</p>
            </div>
          </div>

          <div className="panel p-5">
            <div className="flex justify-between border-b border-border pb-3 mono-label"><span>claude.ai</span><span className="text-signal">destination</span></div>
            <div className="mt-5 space-y-5">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1, duration: 0.6 }} className="rounded-md border border-dashed border-border-strong p-3 font-mono text-[11px] text-muted-foreground">
                context: rate limiter · 100 req/min/key · Redis · decision: sliding window
              </motion.div>
              <Msg r="you" t="Write the middleware." delay={1.4} />
              <Msg r="claude" t="Sliding window with a Redis sorted set, per key…" delay={1.8} />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <a href="#get" className="btn-ghost group">Try the workflow <Arrow /></a>
        </div>
      </div>
    </section>
  );
}
