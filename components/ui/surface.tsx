import { cn } from "@/lib/cn";

export function Surface({
  className,
  grain = true,
  children,
  ...props
}: {
  className?: string;
  grain?: boolean;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("surface", grain && "surface-grain", "p-6 md:p-8", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function Hairline({ vertical = false, className }: { vertical?: boolean; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "block bg-[color:var(--edge)]",
        vertical ? "w-px self-stretch" : "h-px w-full",
        className,
      )}
    />
  );
}

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <span className={cn("eyebrow", className)}>{children}</span>;
}
