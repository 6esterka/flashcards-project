import { motion, type MotionProps } from "framer-motion";
import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import React, { useState } from "react";
import { Ripple } from "./Ripple";

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onDrag"> &
  MotionProps & {
    variant?: "primary" | "secondary" | "accent";
    size?: "sm" | "md" | "lg";
  };

const buttonStyles = {
  base: "relative inline-flex items-center justify-center rounded-2xl font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 overflow-hidden",
  variants: {
    primary: "bg-[#556cd6] text-white hover:shadow-[0_0_12px_#6c79e6] focus:ring-[#6c79e6]",
    secondary: "bg-[#f4a261] text-black hover:shadow-[0_0_12px_#f5b07a] focus:ring-[#f5b07a]",
    accent: "bg-[#e76f51] text-white hover:shadow-[0_0_12px_#f07a63] focus:ring-[#f07a63]",
  },
  sizes: {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
  },
  disabled: "bg-gray-400 text-gray-100 cursor-not-allowed hover:shadow-none focus:ring-0",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  disabled = false,
  ...props
}: Props & { disabled?: boolean }) {
  const [ripples, setRipples] = useState<{ x: number; y: number; size: number; id: number }[]>([]);
  const idRef = React.useRef(0);

  const createRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const diameter = Math.max(rect.width, rect.height) * 1.6;
    const id = ++idRef.current;
    setRipples((prev) => [...prev, { x, y, size: diameter, id }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 450);
  };

  return (
    <motion.button
      className={clsx(
        buttonStyles.base,
        disabled ? buttonStyles.disabled : buttonStyles.variants[variant],
        buttonStyles.sizes[size],
        className
      )}
      whileTap={disabled ? {} : { scale: 0.95 }}
      whileHover={disabled ? {} : { y: -2 }}
      transition={{ type: "spring", stiffness: 550, damping: 18 }}
      disabled={disabled}
      onClick={(e) => {
        createRipple(e);
        props.onClick?.(e);
      }}
      {...props}
    >
      {children}
      <Ripple ripples={ripples} variant={variant} />
    </motion.button>
  );
}