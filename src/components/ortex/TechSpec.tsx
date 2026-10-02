import { Reveal } from "./primitives";

const spec = [
  ["Runtime", "Chromium / Manifest V3"],
  ["Framework", "Plasmo"],
  ["UI", "React + TypeScript"],
  ["Observation", "MutationObserver"],
  ["Messaging", "Chrome Runtime API"],
  ["State", "Chrome Storage + IndexedDB"],
  ["Processing", "Client-side context processing"],
  ["Models (optional)", "Transformers.js"],
];

export function TechSpec() {
  return (
    <section className="border-t border-border py-28 md:py-40">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <p className="eyebrow">Specification</p>
          <h2 className="mt-6 text-3xl font-medium tracking-[-0.03em] md:text-4xl">For developers.</h2>
          <p className="mt-5 max-w-sm text-muted-foreground">Open source. Read the adapters, extend the context engine, or add a platform.</p>
        </Reveal>
        <Reveal delay={0.1}>
          <dl className="border-t border-border">
            {spec.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[140px_1fr] gap-4 border-b border-border py-4 md:grid-cols-[200px_1fr]">
                <dt className="eyebrow self-center">{k}</dt>
                <dd className="font-mono text-sm text-foreground">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
