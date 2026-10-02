import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";

const layers = [
  { name: "LLM interfaces", detail: "chatgpt.com · claude.ai · gemini.google.com", note: "Where the conversation already lives." },
  { name: "Content script", detail: "MutationObserver → adapter.parse()", note: "Observes the DOM as messages stream in." },
  { name: "Service worker", detail: "chrome.runtime.onMessage", note: "Coordinates tabs, state and transfers." },
  { name: "Local context", detail: "IndexedDB · chrome.storage", note: "Normalized conversation state, in the browser." },
  { name: "Destination", detail: "adapter.inject(context)", note: "Prepared context lands in the next model." },
];

export function SystemDepth() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(layers.length - 1, Math.floor(v * layers.length))));
  const fill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative h-[320vh] border-t border-border" aria-label="Moving deeper into the system">
      <div className="sticky top-0 flex h-screen items-center">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 md:grid-cols-[1fr_1.3fr] md:gap-20">
          <div>
            <p className="eyebrow">Beneath the surface</p>
            <h2 className="mt-6 text-3xl font-medium tracking-[-0.03em] md:text-5xl md:leading-[1.05]">
              One packet,<br /><span className="text-subtle">five layers deep.</span>
            </h2>
            <div className="mt-10 h-24">
              <motion.p key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="max-w-sm text-muted-foreground">
                <span className="mono-label text-signal">0{active + 1} / 05</span>
                <br />
                {layers[active].note}
              </motion.p>
            </div>
          </div>
          <div className="relative pl-8">
            <div className="absolute bottom-3 left-[5px] top-3 w-px bg-border-strong" aria-hidden>
              <motion.div className="w-px bg-signal" style={{ height: fill }} />
            </div>
            <ol className="space-y-3">
              {layers.map((l, i) => {
                const on = i <= active;
                const current = i === active;
                return (
                  <li key={l.name} className="relative">
                    <span className={`absolute -left-8 top-1/2 h-[11px] w-[11px] -translate-y-1/2 rounded-full border transition-colors duration-500 ${on ? "border-signal bg-signal" : "border-border-strong bg-background"}`} />
                    <div className={`panel flex items-center justify-between px-5 py-4 transition-all duration-500 ${current ? "!border-signal/60" : ""} ${on ? "opacity-100" : "opacity-35"}`}>
                      <span className="text-sm font-medium md:text-base">{l.name}</span>
                      <span className="mono-label hidden text-right sm:block">{l.detail}</span>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
