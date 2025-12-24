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
                    "inline-flex items-center justify-center rounded-full font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-purple/50 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",
                    {
                        "bg-brand-purple text-white hover:bg-purple-600 shadow-lg shadow-brand-purple/20 hover:shadow-brand-purple/40 border-none": variant === "primary",
                        "bg-bg-secondary text-text-primary hover:bg-black/5 dark:hover:bg-white/5 shadow-xl border border-border-subtle": variant === "secondary",
                        "border border-border-subtle text-text-primary hover:border-brand-purple hover:bg-brand-purple/5": variant === "outline",
                        "text-text-secondary hover:text-text-primary hover:bg-black/5 dark:hover:bg-white/5": variant === "ghost",

                        "px-5 py-2 text-xs uppercase tracking-widest": size === "sm",
                        "px-8 py-3.5 text-sm": size === "md",
                        "px-12 py-5 text-base": size === "lg",
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
