import { cn } from "@/lib/cn";

export function Surface({
  as: Tag = "div",
  className,
  grain = true,
  children,
  ...props
}: {
  as?: React.ElementType;
  className?: string;
  grain?: boolean;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <Tag
      className={cn("surface", grain && "surface-grain", "p-6 md:p-8", className)}
      {...props}
    >
      {children}
    </Tag>
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
  as: Tag = "span",
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}) {
  return <Tag className={cn("eyebrow", className)}>{children}</Tag>;
}
