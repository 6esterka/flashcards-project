import { motion, type MotionProps } from "framer-motion";
import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import { Ripple } from "@/components/ui/customButton/Ripple";
import { useRipple } from "@/hooks/useRipple";

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onDrag"> &
  MotionProps & {
    variant?: "primary" | "secondary" | "accent"|"goBack";
    size?: "sm" | "md" | "lg";
  };

const buttonStyles = {
  base: "relative inline-flex items-center justify-center rounded-2xl font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 overflow-hidden",
  variants: {
    primary: "bg-[#556cd6] text-white hover:shadow-[0_0_12px_#6c79e6] focus:ring-[#6c79e6]",
    secondary: "bg-[#f4a261] text-black hover:shadow-[0_0_12px_#f5b07a] focus:ring-[#f5b07a]",
    accent: "bg-[#e76f51] text-white hover:shadow-[0_0_12px_#f07a63] focus:ring-[#f07a63]",
    goBack:"bg-white border-2 border-[#556cd6] text-[#556cd6] hover:bg-[#556cd6] hover:text-white hover:shadow-[0_0_15px_rgba(85,108,214,0.3)] focus:ring-[#556cd6]/50"
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
  const { ripples, createRipple } = useRipple();

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