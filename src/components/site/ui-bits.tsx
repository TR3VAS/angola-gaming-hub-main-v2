import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import type { TournamentStatus } from "@/lib/mock-data";

export function SectionTitle({
  title,
  subtitle,
  action,
  eyebrow,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  eyebrow?: string;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow ? (
          <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
            <span className="size-1.5 rounded-full bg-gold animate-pulse" />
            {eyebrow}
          </div>
        ) : (
          <div className="mb-2 h-1 w-12 rounded-full bg-gradient-to-r from-primary to-gold" />
        )}
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">{subtitle}</p>
        ) : null}
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
    <header className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-card/60 via-background to-background">
      <div className="pointer-events-none absolute inset-0 nex-dot-grid opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        {eyebrow ? (
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            <span className="size-1.5 rounded-full bg-primary animate-pulse" />
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-3xl text-sm text-muted-foreground sm:text-base">{description}</p>
        ) : null}
        {children ? <div className="mt-6">{children}</div> : null}
      </div>
    </header>
  );
}

export function StatusPill({ status }: { status: TournamentStatus }) {
  const map: Record<
    TournamentStatus,
    { label: string; dot: string; bg: string; text: string; border: string }
  > = {
    LIVE: {
      label: "Ao Vivo",
      dot: "bg-primary animate-ping",
      bg: "bg-primary/15",
      text: "text-primary",
      border: "border-primary/40",
    },
    OPEN: {
      label: "Inscrições Abertas",
      dot: "bg-emerald-400",
      bg: "bg-emerald-500/10",
      text: "text-emerald-400",
      border: "border-emerald-500/30",
    },
    UPCOMING: {
      label: "Em Breve",
      dot: "bg-amber-400",
      bg: "bg-amber-500/10",
      text: "text-amber-400",
      border: "border-amber-500/30",
    },
    FINISHED: {
      label: "Finalizado",
      dot: "bg-zinc-500",
      bg: "bg-zinc-500/10",
      text: "text-zinc-400",
      border: "border-zinc-700/50",
    },
  };

  const item = map[status] || map.FINISHED;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider backdrop-blur-md",
        item.bg,
        item.text,
        item.border,
      )}
    >
      <span className="relative flex size-2">
        <span className={cn("absolute inline-flex size-full rounded-full opacity-75", item.dot)} />
        <span className={cn("relative inline-flex size-2 rounded-full", item.dot.split(" ")[0])} />
      </span>
      {item.label}
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
        "cursor-pointer rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200",
        active
          ? "border-primary/80 bg-primary/20 text-foreground shadow-[0_0_15px_rgba(239,68,68,0.25)]"
          : "border-white/10 bg-white/[0.03] text-muted-foreground hover:border-white/20 hover:bg-white/[0.06] hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

export function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="nex-glass-card flex flex-col items-center justify-center px-6 py-16 text-center">
      <p className="text-lg font-bold text-foreground">{title}</p>
      {description ? (
        <p className="mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}

export function DemoNotice({ className }: { className?: string }) {
  return (
    <div
      className={cn("inline-flex items-center gap-2 text-xs text-muted-foreground/60", className)}
    >
      <span className="size-1 rounded-full bg-gold/70" />
      <span>Ambiente oficial Angola Gamers · Dados em Kz (Kwanza)</span>
    </div>
  );
}

export function StatBox({
  label,
  value,
  change,
}: {
  label: string;
  value: ReactNode;
  change?: string;
}) {
  return (
    <div className="nex-glass-card relative overflow-hidden p-4">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <div className="mt-2 flex items-baseline justify-between gap-2">
        <p className="text-2xl font-bold tracking-tight text-foreground">{value}</p>
        {change ? (
          <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-bold text-emerald-400">
            {change}
          </span>
        ) : null}
      </div>
    </div>
  );
}

export function RankMedal({ rank }: { rank: number }) {
  const styles: Record<number, string> = {
    1: "border border-gold/40 bg-gradient-to-tr from-amber-600 via-gold to-yellow-200 text-slate-950 font-black shadow-[0_0_12px_rgba(234,179,8,0.4)]",
    2: "border border-zinc-300/40 bg-gradient-to-tr from-zinc-500 via-zinc-300 to-white text-slate-950 font-black shadow-[0_0_12px_rgba(255,255,255,0.2)]",
    3: "border border-amber-700/40 bg-gradient-to-tr from-orange-800 via-amber-700 to-amber-500 text-white font-black shadow-[0_0_12px_rgba(217,119,6,0.3)]",
  };

  const defaultStyle = "border border-white/10 bg-white/[0.05] text-muted-foreground font-semibold";

  return (
    <span
      className={cn(
        "inline-flex size-7 items-center justify-center rounded-lg text-xs",
        styles[rank] || defaultStyle,
      )}
    >
      #{rank}
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
    primary:
      "bg-gradient-to-r from-primary via-red-600 to-primary text-white shadow-[0_0_20px_rgba(239,68,68,0.35)] hover:shadow-[0_0_25px_rgba(239,68,68,0.5)] border border-red-500/30",
    ghost:
      "border border-white/10 bg-white/[0.04] text-foreground hover:bg-white/[0.08] hover:border-white/20 backdrop-blur-md",
    gold: "bg-gradient-to-r from-amber-500 to-gold text-slate-950 font-extrabold shadow-[0_0_20px_rgba(234,179,8,0.35)] hover:shadow-[0_0_25px_rgba(234,179,8,0.5)]",
  }[variant];

  return (
    <Link
      to={to}
      params={params as never}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]",
        styles,
      )}
    >
      {children}
    </Link>
  );
}
