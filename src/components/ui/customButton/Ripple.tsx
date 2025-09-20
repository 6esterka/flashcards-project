import React, { useState, useRef } from "react";

type RippleProps = {
  readonly variant: "primary" | "secondary" | "accent";
};

export function Ripple({ variant }: RippleProps) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number; size: number }[]>([]);
  const idRef = useRef(0);

  const getColor = (v: string) => {
    if (v === "primary") return "rgba(85,108,214,0.28)";   // #556cd6
    if (v === "secondary") return "rgba(244,162,97,0.28)"; // #f4a261
    return "rgba(231,111,81,0.28)";                          // #e76f51
  };

  const createRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const diameter = Math.max(rect.width, rect.height) * 1.6;
    const id = ++idRef.current;

    setRipples((prev) => [...prev, { x, y, id, size: diameter }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 450); // faster ripple
  };

  return (
    <span className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute rounded-full animate-ripple"
          style={{
            top: r.y,
            left: r.x,
            transform: "translate(-50%, -50%)",
            width: `${r.size}px`,
            height: `${r.size}px`,
            backgroundColor: getColor(variant),
            opacity: 0.28,
          }}
        />
      ))}
    </span>
  );
}