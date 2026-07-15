import { useState } from "react";

export interface Toast {
  msg: string;
  ok: boolean;
}

export function useToast() {
  const [toast, setToast] = useState<Toast | null>(null);
  
  function show(msg: string, ok = true) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 2600);
  }
  
  return { toast, show };
}
