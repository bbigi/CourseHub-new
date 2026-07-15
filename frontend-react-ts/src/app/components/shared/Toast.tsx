import { CheckCircle2, AlertCircle } from "lucide-react";
import type { Toast } from "../../hooks/useToast";

export function AppToast({ toast }: { toast: Toast | null }) {
  if (!toast) return null;
  
  return (
    <div
      className="fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold shadow-lg"
      style={{
        background: toast.ok ? "rgba(16,185,129,0.18)" : "rgba(224,61,90,0.18)",
        color: toast.ok ? "#10b981" : "#e03d5a",
        border: `1px solid ${toast.ok ? "rgba(16,185,129,0.35)" : "rgba(224,61,90,0.35)"}`,
        backdropFilter: "blur(12px)",
      }}
    >
      {toast.ok ? <CheckCircle2 size={13} /> : <AlertCircle size={13} />}
      {toast.msg}
    </div>
  );
}
