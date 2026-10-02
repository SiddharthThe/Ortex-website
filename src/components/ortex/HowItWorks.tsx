import { motion } from "motion/react";
import type { ReactNode } from "react";
import { Reveal, SectionHead, ease } from "./primitives";

function CaptureViz() {
  return (
    <div className="space-y-1.5 font-mono text-[11px]">
      {["<div data-message-author='user'>", "<div data-message-author='assistant'>", "<div data-message-author='assistant'>"].map((l, i) => (
        <motion.div key={i} initial={{ opacity: 0.25 }} whileInView={{ opacity: [0.25, 1, 0.6] }} viewport={{ once: false }} transition={{ delay: i * 0.5, duration: 1.4 }} className="flex items-center gap-2 text-muted-foreground">
          <span className="text-signal">+</span><span className="truncate">{l}</span>
        </motion.div>
      ))}
      <div className="pt-2 text-subtle">// MutationObserver: 3 nodes added</div>
    </div>
  );
}

function NormalizeViz() {
  return (
    <pre className="font-mono text-[11px] leading-relaxed text-muted-foreground">
{`{
  `}<span className="text-signal">role</span>{`: "assistant",
  `}<span className="text-signal">source</span>{`: "chatgpt",
  `}<span className="text-signal">content</span>{`: "Use a queue…",
  `}<span className="text-signal">ts</span>{`: 1727889120
}`}
    </pre>
  );
}

function ProcessViz() {
  return (
    <div className="font-mono text-[11px]">
      <div className="flex justify-between text-muted-foreground"><span>tokens</span><span>~ 18.4k → 6.1k</span></div>
      <div className="mt-3 h-1.5 w-full rounded-sm bg-muted">
        <motion.div className="h-full rounded-sm bg-signal" initial={{ width: "100%" }} whileInView={{ width: "33%" }} viewport={{ once: false, margin: "-60px" }} transition={{ duration: 1.6, ease, delay: 0.3 }} />
      </div>
      <div className="mt-4 space-y-1 text-subtle">
        <div>✓ keep: requirements, decisions</div>
        <div>✓ keep: latest code block</div>
        <div className="line-through">· drop: repeated explanations</div>
      </div>
    </div>
  );
}

function TransferViz() {
  return (
    <div className="font-mono text-[11px]">
      <div className="flex items-center justify-between text-muted-foreground">
        <span className="rounded border border-border-strong px-2 py-1">tab:chatgpt</span>
        <span className="relative mx-3 h-px flex-1 bg-border-strong">
          <span className="packet-x absolute -top-[3px] h-[7px] w-[7px] -translate-x-1/2 rounded-full bg-signal" />
        </span>
        <span className="rounded border border-signal/50 px-2 py-1 text-foreground">tab:claude</span>
      </div>
      <div className="mt-4 text-subtle">// injected into composer · awaiting send</div>
    </div>
  );
}

const stages: { n: string; title: string; body: string; viz: ReactNode }[] = [
  { n: "01", title: "Capture", body: "Observe the conversation as it changes.", viz: <CaptureViz /> },
  { n: "02", title: "Normalize", body: "Convert platform-specific messages into a common context model.", viz: <NormalizeViz /> },
  { n: "03", title: "Process", body: "Estimate context size and optionally reduce or summarize it.", viz: <ProcessViz /> },
  { n: "04", title: "Transfer", body: "Route the prepared context into the destination interface.", viz: <TransferViz /> },
];

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-14 border-t border-border py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead index="02" label="How it works" title={<>Four stages.<br /><span className="text-subtle">All in the browser.</span></>} />
        <div className="mt-20 grid border-l border-t border-border sm:grid-cols-2">
          {stages.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06} className="flex flex-col border-b border-r border-border p-6 md:p-10">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs text-signal">{s.n}</span>
                <h3 className="text-xl font-medium tracking-tight">{s.title}</h3>
              </div>
              <p className="mt-3 max-w-sm text-sm text-muted-foreground">{s.body}</p>
              <div className="mt-10 min-h-[120px] rounded-md border border-border bg-background p-4">{s.viz}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
