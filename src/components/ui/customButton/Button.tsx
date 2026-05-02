import { motion, type MotionProps } from "framer-motion";
import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import { Ripple } from "@/components/ui/customButton/Ripple";
import { useRipple } from "@/hooks/useRipple";

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onDrag"> &
  MotionProps & {
    variant?: "primary" | "secondary" | "accent" | "goBack";
    size?: "sm" | "md" | "lg";
  };

const buttonStyles = {
  base: "relative inline-flex items-center justify-center rounded-2xl font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 overflow-hidden",
  variants: {
    primary:
      "bg-primary text-white hover:shadow-[0_0_12px_#6c79e6] focus:ring-primary",
    secondary:
      "bg-secondary text-black hover:shadow-[0_0_12px_#f5b07a] focus:ring-secondary",
    accent:
      "bg-accent text-white hover:shadow-[0_0_12px_#f07a63] focus:ring-accent",
    goBack:
      "bg-bg-surface border-2 border-primary text-primary hover:bg-primary hover:text-white hover:shadow-[0_0_15px_rgba(85,108,214,0.3)] focus:ring-primary/50",
  },
  sizes: {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
  },
  disabled:
    "bg-border text-text-muted cursor-not-allowed hover:shadow-none focus:ring-0",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  disabled = false,
  ...props
}: Props & { disabled?: boolean }) {
  const { ripples, createRipple } = useRipple();

  return (
    <motion.button
      className={clsx(
        buttonStyles.base,
        disabled ? buttonStyles.disabled : buttonStyles.variants[variant],
        buttonStyles.sizes[size],
        className,
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
