import * as React from "react"
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils"

// Variantes de color (como en CuiCui)
const badgeColorVariants = {
  default: "bg-primary text-primary-foreground",
  neutral: "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",
  green: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  red: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  orange: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  yellow: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  purple: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  pink: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
  cyan: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
  success: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  warning: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  error: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  info: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
};

// Tamaños del badge (como en CuiCui)
const badgeSizeVariants = {
  xs: "h-5 px-1.5 text-[10px]",
  sm: "h-6 px-2 text-xs",
  md: "h-7 px-3 text-sm",
  lg: "h-8 px-4 text-sm",
  icon: "size-8",
  "icon-sm": "size-6",
  "icon-lg": "size-10",
};

// Bordes redondeados (como en CuiCui)
const badgeRoundedVariants = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1 font-medium whitespace-nowrap transition-colors [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      color: badgeColorVariants,
      size: badgeSizeVariants,
      rounded: badgeRoundedVariants,
      border: {
        true: "border",
        false: "",
      },
      outline: {
        true: "bg-transparent border-current",
        false: "",
      },
    },
    defaultVariants: {
      color: "default",
      size: "md",
      rounded: "md",
      border: false,
      outline: false,
    },
  }
)

const Badge = React.forwardRef(({ 
  className, 
  variant, 
  color,
  size,
  rounded,
  border,
  outline,
  asChild = false, 
  ...props 
}, ref) => {
  // Soporte para la prop 'variant' antigua para compatibilidad
  const getColorFromVariant = () => {
    if (color) return color;
    switch (variant) {
      case 'default': return 'default';
      case 'secondary': return 'neutral';
      case 'destructive': return 'red';
      case 'outline': return 'neutral';
      default: return 'default';
    }
  };

  const Comp = asChild ? React.Fragment : "span";

  return (
    <Comp>
      <span
        ref={ref}
        className={cn(
          badgeVariants({ 
            color: getColorFromVariant(),
            size,
            rounded,
            border,
            outline: outline || variant === 'outline',
          }),
          className
        )}
        {...props}
      />
    </Comp>
  );
});

Badge.displayName = "Badge";

export { Badge, badgeVariants, badgeColorVariants, badgeSizeVariants, badgeRoundedVariants };