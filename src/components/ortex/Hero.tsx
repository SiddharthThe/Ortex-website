import { motion } from "motion/react";
import { Arrow, ease, fadeUp, stagger } from "./primitives";
import { ContextNetwork } from "./ContextNetwork";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-36 md:pt-44">
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />
      <motion.div variants={stagger} initial="hidden" animate="show" className="relative mx-auto max-w-6xl px-6">
        <motion.p variants={fadeUp} className="eyebrow">Context orchestration for the AI workflow</motion.p>
        <h1 className="mt-7 text-[clamp(2.75rem,7.5vw,6.25rem)] font-medium leading-[0.95] tracking-[-0.045em]">
          <motion.span variants={fadeUp} className="block">Move context,</motion.span>
          <motion.span variants={fadeUp} className="block text-subtle">
            not copy<span className="text-signal">-</span>paste.
          </motion.span>
        </h1>
        <motion.p variants={fadeUp} className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Ortex keeps conversations connected across the LLMs you already use. Capture context from one interface, shape it locally, and continue somewhere else.
        </motion.p>
        <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-3">
          <a href="#get" className="btn-primary group">Get Ortex <Arrow /></a>
          <a href="#how" className="btn-ghost">See how it works</a>
        </motion.div>
      </motion.div>
      <motion.div
        id="product"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.6, ease }}
        className="relative mx-auto mt-20 max-w-6xl px-6 pb-24 md:mt-24"
      >
        <div className="mb-4 flex justify-between mono-label">
          <span>source</span><span className="hidden sm:inline">orchestration layer</span><span>destination</span>
        </div>
        <ContextNetwork />
      </motion.div>
    </section>
  );
}
