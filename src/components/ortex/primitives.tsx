import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

export const ease = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHead({ index, label, title, children }: { index: string; label: string; title: ReactNode; children?: ReactNode }) {
  return (
    <Reveal className="max-w-2xl">
      <div className="eyebrow flex items-center gap-3">
        <span className="text-signal">{index}</span>
        <span className="h-px w-8 bg-border-strong" />
        {label}
      </div>
      <h2 className="mt-6 text-3xl font-medium tracking-[-0.03em] text-foreground md:text-5xl md:leading-[1.05]">{title}</h2>
      {children && <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">{children}</p>}
    </Reveal>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className={`transition-transform duration-300 group-hover:translate-x-0.5 ${className}`}>
      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
        <circle cx="9" cy="9" r="7.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="9" cy="9" r="2.2" className="fill-signal" />
      </svg>
      <span className="font-mono text-[13px] font-medium tracking-[0.22em]">ORTEX</span>
    </span>
  );
}

export const GITHUB_URL = "https://github.com";
