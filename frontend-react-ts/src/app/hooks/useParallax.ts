import { useEffect } from "react";

export function useParallax(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    let ticking = false;
    
    function update() {
      const vh = window.innerHeight;
      items.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -300 || rect.top > vh + 300) return;
        const speed = parseFloat(el.dataset.speed ?? "0");
        const xSpeed = parseFloat(el.dataset.x ?? "0");
        const rotateSpeed = parseFloat(el.dataset.rotate ?? "0");
        const mid = rect.top + rect.height / 2 - vh / 2;
        el.style.setProperty(
          "transform",
          `translate3d(${(mid * xSpeed).toFixed(2)}px, ${(mid * speed).toFixed(2)}px, 0) rotate(${(mid * rotateSpeed).toFixed(3)}deg)`,
          "important"
        );
      });
      ticking = false;
    }
    
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }
    
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, [active]);
}
