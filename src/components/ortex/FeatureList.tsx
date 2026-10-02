import { motion } from "motion/react";
import { SectionHead } from "./primitives";

const features = [
  ["Cross-platform context", "One context model shared across ChatGPT, Claude and Gemini."],
  ["Incremental conversation capture", "Only new messages are processed as the conversation grows."],
  ["Local context processing", "Estimation and reduction run client-side."],
  ["Platform adapters", "Isolated parsers per interface, so a UI change stays contained."],
  ["Cross-tab orchestration", "The service worker routes context between open tabs."],
  ["Token-aware transfer", "See approximate size before sending, trim when it's too large."],
];

export function FeatureList() {
  return (
    <section className="border-t border-border py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead index="04" label="Capabilities" title="What it does." />
        <ol className="mt-16 border-t border-border">
          {features.map(([t, d], i) => (
            <motion.li
              key={t}
              initial={{ opacity: 0.28 }}
              whileInView={{ opacity: 1 }}
              viewport={{ margin: "-38% 0px -38% 0px" }}
              transition={{ duration: 0.45 }}
              className="grid gap-2 border-b border-border py-8 md:grid-cols-[120px_1fr_1fr] md:items-baseline md:py-10"
            >
              <span className="font-mono text-sm text-signal">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-2xl font-medium tracking-[-0.02em] md:text-4xl">{t}</h3>
              <p className="text-muted-foreground md:pl-8">{d}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
