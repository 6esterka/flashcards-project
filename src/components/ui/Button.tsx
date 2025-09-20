import { motion, type MotionProps } from "framer-motion";
import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onDrag"> &
  MotionProps & {
    variant?: "primary" | "secondary" | "accent";
    size?: "sm" | "md" | "lg";
  };

const base =
  "inline-flex items-center justify-center rounded-2xl font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2";

const variants = {
  primary: "bg-[#4F67B1] text-white hover:bg-[#3F5494] focus:ring-[#3F5494]", // Next / Previous
  secondary: "bg-[#FFD7B9] text-black hover:bg-[#FFCCAA] focus:ring-[#FFCCAA]", // general highlights
  accent: "bg-[#B44B28] text-white hover:bg-[#923822] focus:ring-[#923822]",   // Learned / completed
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
  return (
    <motion.button
      {...props}
      className={clsx(base, variants[variant], sizes[size], className)}
      whileHover={{
        scale: 1.05,
        y: -2,
        boxShadow: "0px 6px 12px rgba(0,0,0,0.15)",
      }}
      whileTap={{ scale: 0.95, y: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    />
  );
}