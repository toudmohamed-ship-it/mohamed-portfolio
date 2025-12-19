import { ButtonHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { Loader2 } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", isLoading, children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={twMerge(clsx(
                    "inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
                    {
                        "bg-brand-purple text-white hover:bg-purple-700 shadow-lg shadow-purple-500/20": variant === "primary",
                        "bg-navy-900 text-white hover:bg-navy-800 shadow-lg shadow-navy-900/10": variant === "secondary",
                        "border-2 border-navy-200 text-navy-700 hover:border-brand-purple hover:text-brand-purple": variant === "outline",
                        "text-navy-600 hover:text-brand-purple hover:bg-purple-50": variant === "ghost",

                        "px-4 py-2 text-sm": size === "sm",
                        "px-6 py-3 text-base": size === "md",
                        "px-8 py-4 text-lg": size === "lg",
                    },
                    className
                ))}
                disabled={isLoading}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";

export default Button;
