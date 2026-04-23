import { cn } from "@/lib/utils";

interface AuthCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function AuthCard({ title, description, children, footer, className }: AuthCardProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="space-y-2">
        <h2 className="text-2xl font-extrabold tracking-tight">{title}</h2>
        {description ? (
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        ) : null}
      </div>
      <div className="space-y-4">{children}</div>
      {footer ? <div className="text-sm text-muted-foreground">{footer}</div> : null}
    </div>
  );
}
