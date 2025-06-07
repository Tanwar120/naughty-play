import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface GradientButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export const GradientButton = ({
  children,
  className,
  onClick,
  variant = "default",
  size = "default",
  disabled = false,
  type = "button",
  ...props
}: GradientButtonProps) => {
  const baseClasses = "rounded-full font-medium transition-all duration-300";
  
  const variantClasses = {
    default: "gradient-button",
    outline: "border border-purple-secondary bg-transparent hover:bg-purple-secondary/10",
  };
  
  const sizeClasses = {
    sm: "px-4 py-1.5 text-sm",
    default: "px-6 py-2",
    lg: "px-8 py-3 text-lg",
  };

  return (
    <motion.button
      type={type}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};
