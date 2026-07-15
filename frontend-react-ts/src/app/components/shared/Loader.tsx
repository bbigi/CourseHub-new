export function Loader({ text = "Memuat..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      <div
        className="w-10 h-10 rounded-full border-2 animate-spin"
        style={{ borderColor: "rgba(79,142,247,0.2)", borderTopColor: "#4f8ef7" }}
      />
      <span 
        className="text-xs" 
        style={{ color: "#6b82a8", fontFamily: "'JetBrains Mono',monospace" }}
      >
        {text}
      </span>
    </div>
  );
}
