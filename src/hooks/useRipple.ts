import { useState, useRef, type MouseEvent } from "react";

export type RippleItem = { x: number; y: number; size: number; id: number };

export function useRipple() {
  const [ripples, setRipples] = useState<RippleItem[]>([]);
  const idRef = useRef(0);

  const createRipple = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const diameter = Math.max(rect.width, rect.height) * 1.5;
    const id = ++idRef.current;

    setRipples((prev) => [...prev, { x, y, size: diameter, id }]);
    setTimeout(
      () => setRipples((prev) => prev.filter((r) => r.id !== id)),
      450,
    );
  };

  return { ripples, createRipple };
}
