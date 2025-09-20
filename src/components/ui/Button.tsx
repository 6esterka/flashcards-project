import { motion, type MotionProps } from "framer-motion";
import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import React, { useRef, useState } from "react";

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onDrag"> &
  MotionProps & {
    variant?: "primary" | "secondary" | "accent";
    size?: "sm" | "md" | "lg";
  };

const base =
  "relative overflow-hidden inline-flex items-center justify-center rounded-2xl font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2";

const variants = {
  primary:
    "bg-[#556cd6] text-white hover:shadow-[0_0_12px_#6c79e6] focus:ring-[#6c79e6]",
  secondary:
    "bg-[#f4a261] text-black hover:shadow-[0_0_12px_#f5b07a] focus:ring-[#f5b07a]",
  accent:
    "bg-[#e76f51] text-white hover:shadow-[0_0_12px_#f07a63] focus:ring-[#f07a63]",
};

const sizes = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: Props) {
  const [ripples, setRipples] = useState<
    { x: number; y: number; id: number; size: number }[]
  >([]);
  const idRef = useRef(0);

  const getRippleColor = (variant: string) => {
    if (variant === "primary") return "rgba(85,108,214,0.28)"; // #556cd6
    if (variant === "secondary") return "rgba(244,162,97,0.28)"; // #f4a261
    return "rgba(231,111,81,0.28)"; // #e76f51
  };

  const createRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const isMouse = e.clientX !== 0 && typeof e.clientX === "number";

    const x = isMouse ? e.clientX - rect.left : rect.width / 2;
    const y = isMouse ? e.clientY - rect.top : rect.height / 2;

    const diameter = Math.max(rect.width, rect.height) * 1.6;
    const id = ++idRef.current;

    setRipples((prev) => [...prev, { x, y, id, size: diameter }]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 650);
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 550, damping: 18 }}
      onClick={(e) => {
        createRipple(e);
        props.onClick?.(e);
      }}
      className={clsx(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {props.children}

      {/* Ripple Layer */}
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
              backgroundColor: getRippleColor(variant),
              opacity: 0.28,
            }}
          />
        ))}
      </span>
    </motion.button>
  );
}
