import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Globe, ShieldCheck, Zap } from "lucide-react";
import logoImg from "@/assets/logo.png";

const columns = [
  {
    title: "Plataforma",
    links: [
      { label: "Torneios & Ligas", to: "/tournaments" },
      { label: "Rankings ao Vivo", to: "/rankings" },
      { label: "Hub da Comunidade", to: "/community" },
      { label: "Angola Gamers Awards", to: "/awards" },
    ],
  },
  {
    title: "Ecossistema",
    links: [
      { label: "Jogos Competitivos", to: "/games" },
      { label: "Base de Jogadores", to: "/players" },
      { label: "Equipas & Guilds", to: "/teams" },
      { label: "Clips da Semana", to: "/clips" },
    ],
  },
  {
    title: "Institucional",
    links: [
      { label: "Sobre o Projeto", to: "/community" },
      { label: "Regras de Torneios", to: "/tournaments" },
      { label: "Termos & Condições", to: "/community" },
      { label: "Política de Privacidade", to: "/community" },
    ],
  },
];

const socials = [
  { name: "Discord", href: "https://discord.gg" },
  { name: "Instagram", href: "https://instagram.com" },
  { name: "TikTok", href: "https://tiktok.com" },
  { name: "YouTube", href: "https://youtube.com" },
  { name: "X / Twitter", href: "https://x.com" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#06080d] text-foreground">
      {/* Subtle background ambient light */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 size-96 rounded-full bg-gold/5 blur-3xl" />

      {/* Main Grid */}
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div>
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center">
              <div className="ag-aura-pulse pointer-events-none absolute size-12 rounded-full bg-gold/15 blur-lg" />
              <img
                src={logoImg}
                alt="Angola Gamers Logo"
                className="h-11 w-auto object-contain [filter:drop-shadow(0_2px_8px_rgba(234,179,8,0.2))]"
              />
            </div>
            <div>
              <p className="text-base font-extrabold tracking-tight text-white">
                ANGOLA<span className="text-gold">GAMERS</span>
              </p>
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gold">
                LEVEL UP ANGOLA
              </p>
            </div>
          </div>

          <p className="mt-4 max-w-xs text-xs leading-relaxed text-muted-foreground">
            A infraestrutura digital de referência para o gaming e esports em Angola. Torneios em
            tempo real, premiações em Kwanza (Kz) e rankings nacionais.
          </p>

          {/* Real-time System Status Pill (Fintech / AI style) */}
          <div className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-[11px] font-medium text-emerald-400">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            <span>Cluster Luanda: 18ms · 100% Operacional</span>
          </div>

          {/* Socials */}
          <div className="mt-6 flex flex-wrap gap-2">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium text-muted-foreground transition-all duration-200 hover:border-gold/40 hover:bg-white/[0.07] hover:text-white"
              >
                <span>{s.name}</span>
                <ArrowUpRight className="size-3 text-muted-foreground/60" />
              </a>
            ))}
          </div>
        </div>

        {columns.map((c) => (
          <div key={c.title}>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-gold">
              {c.title}
            </p>
            <ul className="space-y-3">
              {c.links.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-xs text-muted-foreground transition-colors hover:text-white hover:underline hover:underline-offset-4"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-6 text-xs text-muted-foreground sm:px-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-3.5 text-gold" />
            <p>© {new Date().getFullYear()} Angola Gamers. Todos os direitos reservados.</p>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1">
              <Globe className="size-3 text-muted-foreground" /> Angola (AO) · Kz
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Zap className="size-3 text-primary" /> Powered by TanStack & Supabase
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
