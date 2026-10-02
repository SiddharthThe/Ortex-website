import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

type Id = "chatgpt" | "claude" | "gemini";
const nodes: Record<Id, { label: string; x: number; y: number; path: string }> = {
  chatgpt: { label: "CHATGPT", x: 90, y: 200, path: "M150 200 C 290 200, 340 200, 440 200" },
  claude: { label: "CLAUDE", x: 910, y: 100, path: "M850 100 C 720 100, 660 190, 560 196" },
  gemini: { label: "GEMINI", x: 910, y: 300, path: "M850 300 C 720 300, 660 210, 560 204" },
};
const routes: [Id, Id][] = [["chatgpt", "claude"], ["claude", "gemini"], ["gemini", "chatgpt"], ["chatgpt", "gemini"]];
const fragments = ["user requirements", "conversation", "code", "decisions", "context"];
const LEG = 1.6;

export function ContextNetwork() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [hover, setHover] = useState<Id | "ortex" | null>(null);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setStep((s) => s + 1), LEG * 2 * 1000 + 900);
    return () => clearInterval(t);
  }, [reduce]);

  const [from, to] = routes[step % routes.length];
  const frag = fragments[step % fragments.length];
  const isLit = (id: Id) => hover === id || hover === "ortex" || id === from || id === to;

  return (
    <div className="relative w-full" role="img" aria-label="Context moving from one LLM interface, through Ortex, into another">
      <svg viewBox="0 0 1000 400" className="h-auto w-full overflow-visible">
        <defs>
          <radialGradient id="core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--signal)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--signal)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {(Object.keys(nodes) as Id[]).map((id) => (
          <g key={id}>
            <path d={nodes[id].path} fill="none" stroke="var(--border-strong)" strokeWidth="1" />
            <motion.path
              d={nodes[id].path}
              fill="none"
              stroke="var(--signal)"
              strokeWidth="1"
              className="dash-flow"
              animate={{ opacity: isLit(id) ? (hover === id ? 1 : 0.6) : 0 }}
              transition={{ duration: 0.5 }}
            />
          </g>
        ))}

        {/* Ortex core */}
        <g onMouseEnter={() => setHover("ortex")} onMouseLeave={() => setHover(null)} className="cursor-default">
          <circle cx="500" cy="200" r="110" fill="url(#core)" />
          <rect x="440" y="150" width="120" height="100" rx="6" fill="var(--surface)" stroke="var(--border-strong)" />
          {[0, 1, 2].map((i) => (
            <motion.line
              key={i}
              x1="456" x2="544" y1={186 + i * 14} y2={186 + i * 14}
              stroke="var(--signal)" strokeWidth="1"
              animate={{ opacity: hover === "ortex" ? 0.9 : [0.15, 0.5, 0.15] }}
              transition={hover === "ortex" ? { duration: 0.3 } : { duration: 2.4, repeat: Infinity, delay: i * 0.4 }}
            />
          ))}
          <text x="500" y="172" textAnchor="middle" className="fill-foreground font-mono text-[11px] tracking-[0.22em]">ORTEX</text>
          <text x="500" y="238" textAnchor="middle" className="fill-subtle font-mono text-[9px]">local context</text>
        </g>

        {/* Platforms */}
        {(Object.keys(nodes) as Id[]).map((id) => {
          const n = nodes[id];
          const lit = isLit(id);
          return (
            <g key={id} onMouseEnter={() => setHover(id)} onMouseLeave={() => setHover(null)} className="cursor-default">
              <rect x={n.x - 60} y={n.y - 18} width="120" height="36" rx="5" fill="var(--background)" stroke={lit ? "var(--signal)" : "var(--border-strong)"} style={{ transition: "stroke .4s" }} />
              <circle cx={n.x - 44} cy={n.y} r="2.5" fill={lit ? "var(--signal)" : "var(--subtle)"} />
              <text x={n.x + 6} y={n.y + 4} textAnchor="middle" className="fill-foreground font-mono text-[11px] tracking-[0.16em]">{n.label}</text>
            </g>
          );
        })}

        {/* Packet */}
        {!reduce && (
          <g key={step}>
            <Packet path={nodes[from].path} label={frag} begin={0} reverse={false} />
            <Packet path={nodes[to].path} label={frag} begin={LEG + 0.3} reverse />
          </g>
        )}
      </svg>
    </div>
  );
}

function Packet({ path, label, begin, reverse }: { path: string; label: string; begin: number; reverse: boolean }) {
  const w = label.length * 6.2 + 18;
  return (
    <g opacity="0">
      <set attributeName="opacity" to="1" begin={`${begin}s`} />
      <set attributeName="opacity" to="0" begin={`${begin + LEG}s`} />
      <animateMotion dur={`${LEG}s`} begin={`${begin}s`} fill="freeze" path={path} keyPoints={reverse ? "0;1" : "0;1"} keyTimes="0;1" calcMode="spline" keySplines="0.45 0 0.25 1" {...(reverse ? { keyPoints: "1;0" } : {})} />
      <circle r="3.5" fill="var(--signal)" />
      <rect x={-w / 2} y="-30" width={w} height="18" rx="3" fill="var(--background)" stroke="var(--signal)" strokeOpacity="0.5" />
      <text y="-18" textAnchor="middle" className="fill-foreground font-mono text-[10px]">{label}</text>
    </g>
  );
}
