import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import type { TournamentStatus } from "@/lib/mock-data";

export function SectionTitle({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <div className="mb-2 h-1 w-14 bg-primary" />
        <h2 className="ag-heading text-2xl sm:text-3xl">{title}</h2>
        {subtitle ? <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <header className="ag-grid-bg border-b border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        {eyebrow ? (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">{eyebrow}</p>
        ) : null}
        <h1 className="ag-heading text-3xl sm:text-5xl">{title}</h1>
        {description ? (
          <p className="mt-4 max-w-3xl text-sm text-muted-foreground sm:text-base">{description}</p>
        ) : null}
        {children ? <div className="mt-6">{children}</div> : null}
      </div>
    </header>
  );
}

export function StatusPill({ status }: { status: TournamentStatus }) {
  const map: Record<TournamentStatus, string> = {
    LIVE: "bg-primary/15 text-primary border-primary/40",
    OPEN: "bg-live/15 text-live border-live/40",
    UPCOMING: "bg-surface-2 text-muted-foreground border-border",
    FINISHED: "bg-muted text-muted-foreground border-border",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider",
        map[status],
      )}
    >
      {status === "LIVE" ? <span className="size-1.5 animate-pulse rounded-full bg-primary" /> : null}
      {status}
    </span>
  );
}

export function Chip({
  active,
  children,
  onClick,
}: {
  active?: boolean;
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors",
        active
          ? "border-primary bg-primary/15 text-primary"
          : "border-border bg-surface text-muted-foreground hover:border-primary/50 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

export function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="ag-card flex flex-col items-center justify-center px-6 py-16 text-center">
      <p className="ag-heading text-lg">{title}</p>
      {description ? <p className="mt-2 max-w-md text-sm text-muted-foreground">{description}</p> : null}
    </div>
  );
}

export function DemoNotice({ className }: { className?: string }) {
  return (
    <p className={cn("text-xs text-muted-foreground/70", className)}>
      Nota interna: conteúdo apresentado com dados de demonstração.
    </p>
  );
}

export function StatBox({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="ag-card px-4 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="ag-heading mt-1 text-xl">{value}</p>
    </div>
  );
}

export function RankMedal({ rank }: { rank: number }) {
  const style =
    rank === 1
      ? "bg-gold text-gold-foreground"
      : rank === 2
        ? "bg-foreground/85 text-background"
        : rank === 3
          ? "bg-primary text-primary-foreground"
          : "bg-surface-2 text-muted-foreground";
  return (
    <span className={cn("inline-flex size-7 items-center justify-center rounded-md text-xs font-bold", style)}>
      {rank}
    </span>
  );
}

export function LinkButton({
  to,
  params,
  children,
  variant = "primary",
}: {
  to: string;
  params?: Record<string, string>;
  children: ReactNode;
  variant?: "primary" | "ghost" | "gold";
}) {
  const styles = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    ghost: "border border-border bg-surface text-foreground hover:border-primary/60",
    gold: "bg-gold text-gold-foreground hover:bg-gold/90",
  }[variant];
  return (
    <Link
      to={to}
      params={params as never}
      className={cn(
        "inline-flex items-center justify-center rounded-md px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors",
        styles,
      )}
    >
      {children}
    </Link>
  );
}
