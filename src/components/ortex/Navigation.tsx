import { useState } from "react";
import { Arrow, GITHUB_URL, Logo } from "./primitives";

const links = [
  { href: "#product", label: "Product" },
  { href: "#how", label: "How it works" },
  { href: "#architecture", label: "Architecture" },
  { href: "https://github.com/SiddharthThe/Ortex", label: "Github" },
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6" aria-label="Main">
        <a href="#top" className="text-foreground" aria-label="Ortex home"><Logo /></a>
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="text-[13px] text-muted-foreground transition-colors hover:text-foreground">{l.label}</a>
            </li>
          ))}
        </ul>
        <div className="hidden items-center gap-2 md:flex">
          <a href={GITHUB_URL} className="px-3 text-[13px] text-muted-foreground hover:text-foreground">View on GitHub</a>
          <a href="#get" className="btn-primary group !h-8 !px-3 !text-[13px]">Get Ortex <Arrow /></a>
        </div>
        <button
          className="flex h-9 w-9 items-center justify-center rounded-md border border-border md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden stroke="currentColor" strokeWidth="1.3">
            {open ? <path d="M3 3l8 8M11 3l-8 8" /> : <path d="M1 4h12M1 10h12" />}
          </svg>
        </button>
      </nav>
      {open && (
        <div className="border-t border-border px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.href} onClick={() => setOpen(false)} className="block py-2 text-sm text-muted-foreground hover:text-foreground">{l.label}</a>
              </li>
            ))}
          </ul>
          <a href="#get" onClick={() => setOpen(false)} className="btn-primary group mt-3 w-full justify-center">Get Ortex <Arrow /></a>
        </div>
      )}
    </header>
  );
}
