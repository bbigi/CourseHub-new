type BtnVariant = "primary" | "success" | "danger" | "warning" | "ghost";

export function ActionBtn({
  children,
  variant = "primary",
  icon: Icon,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  variant?: BtnVariant;
  icon?: React.ElementType;
  onClick?: () => void;
  className?: string;
}) {
  const styles: Record<BtnVariant, { bg: string; color: string }> = {
    primary: { bg: "linear-gradient(135deg,#2FA66A,#3BBF7A)", color: "#fff" },
    success: { bg: "linear-gradient(135deg,#2FA66A,#3BBF7A)", color: "#fff" },
    danger: { bg: "linear-gradient(135deg,#E15B64,#be123c)", color: "#fff" },
    warning: { bg: "linear-gradient(135deg,#F2B84B,#d97706)", color: "#fff" },
    ghost: { bg: "rgba(47,166,106,0.10)", color: "#2FA66A" },
  };
  const s = styles[variant];
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90 ${className}`}
      style={{ background: s.bg, color: s.color, fontFamily: "'Plus Jakarta Sans',sans-serif" }}
    >
      {Icon && <Icon size={15} />}
      {children}
    </button>
  );
}

export function CapsuleBtn({
  children,
  color,
  bg,
  onClick,
}: {
  children: React.ReactNode;
  color: string;
  bg: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="text-[10px] font-semibold px-2.5 py-1 rounded-full transition-all hover:opacity-80"
      style={{ background: bg, color }}
    >
      {children}
    </button>
  );
}

export function IconBtn({
  icon: Icon,
  color,
  onClick,
  title,
}: {
  icon: React.ElementType;
  color: string;
  onClick?: () => void;
  title?: string;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="p-1.5 rounded-lg hover:bg-[#F3F0E8] transition-all"
      style={{ color }}
    >
      <Icon size={14} />
    </button>
  );
}