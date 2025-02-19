import { AlertTriangle, CheckCircleIcon } from "lucide-react"
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "lib/utils";

const bannerVariants = cva(
  "border text-center p-4 text-sm flex items-center w-full",
  {
    variants: {
      variant: {
        warning: "bg-yellow-200/80 border-yellow-30 text-primary dark:bg-yellow-500/80 dark:border-yellow-400 dark:text-primary",
        success: "bg-emerald-700 border-emerald-800 text-secondary dark:bg-emerald-600 dark:border-emerald-700 dark:text-secondary",
      }
    },
    defaultVariants: {
      variant: "warning",
    }
  }
);

const iconMap = {
  warning: AlertTriangle,
  success: CheckCircleIcon,
};

export const Banner = ({
  label,
  variant,
}) => {
  const Icon = iconMap[variant || "warning"];

  return (
    <div className={cn(bannerVariants({ variant }))}>
      <Icon className="h-4 w-4 mr-2" />
      {label}
    </div>
  );
};