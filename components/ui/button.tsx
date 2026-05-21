import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "@/lib/cn";

const button = cva(
  [
    "group/btn relative inline-flex items-center justify-center gap-2 select-none",
    "font-mono uppercase tracking-widest text-xs",
    "transition-[transform,background-color,color,box-shadow] duration-300 ease-[var(--ease-out-quint)]",
    "focus-visible:outline-1 focus-visible:outline-offset-3 focus-visible:outline-[color:var(--accent)]",
    "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none",
    "active:scale-[0.985]",
  ],
  {
    variants: {
      variant: {
        primary: [
          "px-6 py-3 rounded-none text-[color:var(--color-ink)]",
          "bg-[color:var(--accent)] hover:bg-[color:var(--color-flux-glow)]",
          "shadow-[0_8px_32px_-12px_var(--accent)]",
        ],
        ghost: [
          "px-6 py-3 rounded-none text-[color:var(--fg)]",
          "border border-[color:var(--edge)] hover:border-[color:var(--fg-soft)]",
          "hover:text-[color:var(--accent)]",
        ],
        bare: [
          "px-3 py-1.5 rounded-none text-[color:var(--fg-soft)]",
          "hover:text-[color:var(--fg)]",
        ],
        pill: [
          "px-5 py-2 rounded-[var(--radius-pill)] text-[color:var(--fg)]",
          "border border-[color:var(--edge)] hover:border-[color:var(--accent)]",
          "hover:text-[color:var(--accent)]",
        ],
      },
      size: {
        sm: "text-[0.65rem] px-4 py-2",
        md: "",
        lg: "text-[0.8rem] px-8 py-4",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof button>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => (
    <button ref={ref} className={cn(button({ variant, size }), className)} {...props}>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  ),
);
Button.displayName = "Button";
