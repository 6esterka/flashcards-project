import { motion, type MotionProps } from "framer-motion";
import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import { Ripple } from "./Ripple";

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onDrag"> &
  MotionProps & {
    variant?: "primary" | "secondary" | "accent";
    size?: "sm" | "md" | "lg";
  };

const buttonStyles = {
  base: "relative inline-flex items-center justify-center rounded-2xl font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 overflow-hidden",
  variants: {
    primary:
      "bg-[#556cd6] text-white hover:shadow-[0_0_12px_#6c79e6] focus:ring-[#6c79e6]",
    secondary:
      "bg-[#f4a261] text-black hover:shadow-[0_0_12px_#f5b07a] focus:ring-[#f5b07a]",
    accent:
      "bg-[#e76f51] text-white hover:shadow-[0_0_12px_#f07a63] focus:ring-[#f07a63]",
  },
  sizes: {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
  },
  disabled:
    "bg-gray-400 text-gray-100 cursor-not-allowed hover:shadow-none focus:ring-0",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  disabled = false,
  ...props
}: Props) {
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
      onClick={(e) => {
        props.onClick?.(e);
      }}
      disabled={disabled}
      {...props}
    >
      {children}
      {!disabled && <Ripple variant={variant} />}
    </motion.button>
  );
}
