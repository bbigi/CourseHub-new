export function Badge({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span
      className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
      style={{ background: `${color}18`, color, fontFamily: "'JetBrains Mono', monospace" }}
    >
      {children}
    </span>
  );
}
