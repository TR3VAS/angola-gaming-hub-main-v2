import { useState, useEffect, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Flame,
  Trophy,
  Users,
  Sparkles,
  Zap,
  Activity,
  TrendingUp,
  Gamepad2,
  Radio,
  CheckCircle2,
  Shield,
  Layers,
  ChevronRight,
} from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import logo3D from "@/assets/logo-3d.jpg";
import logoImg from "@/assets/logo.png";
import { Layout } from "@/components/site/Layout";
import {
  DemoNotice,
  LinkButton,
  RankMedal,
  SectionTitle,
  StatusPill,
} from "@/components/site/ui-bits";
import { formatDate, formatKz, games, news, players, stats, tournaments } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Angola Gamers — A Plataforma Oficial de Esports de Angola" },
      {
        name: "description",
        content:
          "A infraestrutura digital líder para a comunidade gamer e competições de esports em Angola. Torneios, rankings em tempo real, premiações em Kz e equipas nacionais.",
      },
      { property: "og:title", content: "Angola Gamers — Level Up Angola" },
      {
        property: "og:description",
        content: "Torneios, rankings em tempo real, jogadores, equipas e premiações em Kz.",
      },
    ],
  }),
});

// Mock trend data for monthly prize pool (Fintech style visualization)
const prizeTrends = [
  { month: "Jan", prize: 1800000, height: 35 },
  { month: "Fev", prize: 2200000, height: 45 },
  { month: "Mar", prize: 2750000, height: 55 },
  { month: "Abr", prize: 3400000, height: 70 },
  { month: "Mai", prize: 4100000, height: 85 },
  { month: "Jun", prize: 4850000, height: 100 },
];

function Home() {
  const [mounted, setMounted] = useState(false);
  const [activeGameSlug, setActiveGameSlug] = useState("fortnite");
  const [logoMode, setLogoMode] = useState<"original" | "render3d">("original");

  useEffect(() => {
    setMounted(true);
  }, []);

  const featured = tournaments.filter((t) => t.status !== "FINISHED").slice(0, 4);
  const topPlayers = useMemo(
    () => [...players].sort((a, b) => b.points - a.points).slice(0, 5),
    [],
  );
  const latest = news.slice(0, 3);
  const selectedGame = games.find((g) => g.slug === activeGameSlug) ?? games[0];

  // Tournaments filtered by selected active game in the Hero Cockpit
  const gameTournaments = tournaments.filter((t) => t.game === activeGameSlug);
  const activeCockpitTournament = gameTournaments[0] || tournaments[0];

  return (
    <Layout>
      {/* ======================================================== */}
      {/* 1. HERO SECTION: AI GAMING INTELLIGENCE COCKPIT (NexUX) */}
      {/* ======================================================== */}
      <section className="relative overflow-hidden border-b border-white/[0.08] bg-[#07090e]">
        {/* Subtle background ambient glow and dot grid */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-gradient-to-tr from-gold/10 via-primary/15 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute inset-0 nex-dot-grid opacity-25" />

        {/* Ambient Arena Texture overlay */}
        <img
          src={heroImg}
          alt="Arena esports Angola"
          width={1920}
          height={1080}
          className="pointer-events-none absolute inset-0 size-full object-cover opacity-15 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07090e]/60 via-[#07090e]/90 to-[#07090e]" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            {/* Left Column: Value Proposition & CTAs */}
            <div className="lg:col-span-6 xl:col-span-7">
              {/* Pulsing Intelligence Pill */}
              <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1.5 text-xs font-semibold text-gold backdrop-blur-xl">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-gold opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-gold" />
                </span>
                <span className="uppercase tracking-[0.2em] text-[11px] font-bold">
                  Plataforma Oficial de Esports · Angola
                </span>
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-6xl xl:text-7xl">
                O futuro do gaming competitivo em{" "}
                <span className="bg-gradient-to-r from-white via-gold to-yellow-400 bg-clip-text text-transparent">
                  Angola.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                A infraestrutura digital de alta performance para jogadores, equipas e criadores.
                Descobre torneios em tempo real com premiações em Kz, rankings nacionais auditados e
                estatísticas de topo.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <Link
                  to="/tournaments"
                  className="inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-gradient-to-r from-primary via-red-600 to-primary px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_25px_rgba(239,68,68,0.4)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(239,68,68,0.6)]"
                >
                  Explorar Torneios <ArrowRight className="size-4" />
                </Link>

                <Link
                  to="/rankings"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-xl transition-all duration-200 hover:border-gold/40 hover:bg-white/[0.08] hover:text-gold"
                >
                  <Trophy className="size-4 text-gold" /> Rankings ao Vivo
                </Link>
              </div>

              {/* Micro-metrics Ticker (Fintech Style) */}
              <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  {
                    label: "Jogadores",
                    val: `+${stats.players.toLocaleString("pt-AO")}`,
                    change: "+18% este mês",
                  },
                  { label: "Torneios", val: `+${stats.tournaments}`, change: "Ativos" },
                  { label: "Equipas", val: `+${stats.teams}`, change: "Verificadas" },
                  { label: "Jogos Oficiais", val: `+${stats.games}`, change: "Competitivos" },
                ].map((s) => (
                  <div key={s.label} className="nex-glass-card p-3.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      {s.label}
                    </p>
                    <p className="mt-1 text-xl font-black text-white">{s.val}</p>
                    <p className="mt-1 text-[10px] font-semibold text-emerald-400">{s.change}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-2">
                <DemoNotice />
              </div>
            </div>

            {/* Right Column: Interactive Fintech / Gaming Cockpit */}
            <div className="lg:col-span-6 xl:col-span-5">
              <div className="relative mx-auto max-w-lg">
                {/* Ambient glow behind cockpit */}
                <div className="pointer-events-none absolute -inset-2 rounded-3xl bg-gradient-to-tr from-gold/20 via-primary/20 to-transparent blur-2xl opacity-60" />

                {/* The Cockpit Main Glass Container */}
                <div className="relative rounded-3xl border border-white/10 bg-[#0d1019]/90 p-5 shadow-2xl backdrop-blur-2xl">
                  {/* Cockpit Top Bar */}
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-8 items-center justify-center rounded-lg bg-gold/15 text-gold border border-gold/30">
                        <Activity className="size-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wide text-white">
                          Radar de Torneios & Premiações
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          Atualizado a cada 10s · Luanda Time
                        </p>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase text-emerald-400">
                      <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live Feed
                    </span>
                  </div>

                  {/* Game Selector Tabs (Fintech Asset Switcher Style) */}
                  <div className="mt-4 flex items-center gap-1 overflow-x-auto rounded-xl bg-white/[0.03] p-1 border border-white/[0.06]">
                    {games.map((g) => (
                      <button
                        key={g.slug}
                        onClick={() => setActiveGameSlug(g.slug)}
                        className={`flex-1 rounded-lg px-2.5 py-1.5 text-center text-[11px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                          activeGameSlug === g.slug
                            ? "bg-gradient-to-r from-gold/20 to-yellow-500/20 text-gold border border-gold/40 shadow-sm"
                            : "text-muted-foreground hover:text-white"
                        }`}
                      >
                        {g.short}
                      </button>
                    ))}
                  </div>

                  {/* Cockpit Stat Card 1: Prize Pool Trend (Financial Style) */}
                  <div className="mt-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                          Total Prize Pool Distribuído (Kz)
                        </p>
                        <div className="mt-1 flex items-baseline gap-2">
                          <span className="text-2xl font-black tracking-tight text-white">
                            Kz 4.850.000
                          </span>
                          <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-400">
                            <TrendingUp className="size-3" /> +32.4%
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 rounded-lg border border-gold/30 bg-gold/10 px-2 py-1 text-[10px] font-bold text-gold">
                        <Trophy className="size-3" /> {selectedGame.tournaments} Torneios
                      </div>
                    </div>

                    {/* Mini Sparkline Bar Chart (Fintech Style) */}
                    <div className="mt-4 flex items-end justify-between gap-2 pt-2 border-t border-white/[0.06]">
                      {prizeTrends.map((pt, i) => (
                        <div key={pt.month} className="flex flex-1 flex-col items-center gap-1.5">
                          <div className="relative w-full rounded-md bg-white/[0.05] h-14 overflow-hidden flex items-end">
                            <div
                              style={{ height: `${pt.height}%` }}
                              className={`w-full rounded-md transition-all duration-500 ${
                                i === prizeTrends.length - 1
                                  ? "bg-gradient-to-t from-primary to-gold shadow-[0_0_10px_rgba(234,179,8,0.5)]"
                                  : "bg-white/20 hover:bg-white/30"
                              }`}
                            />
                          </div>
                          <span className="text-[9px] font-bold uppercase text-muted-foreground">
                            {pt.month}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cockpit Live Tournament Item */}
                  <div className="mt-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 transition-all hover:border-gold/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="flex size-7 items-center justify-center rounded-lg bg-primary/20 text-xs font-bold text-primary">
                          {selectedGame.short}
                        </span>
                        <div>
                          <p className="text-xs font-bold text-white line-clamp-1">
                            {activeCockpitTournament.name}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {activeCockpitTournament.time} ·{" "}
                            {new Date(activeCockpitTournament.date).toLocaleDateString("pt-AO")}
                          </p>
                        </div>
                      </div>
                      <StatusPill status={activeCockpitTournament.status} />
                    </div>

                    <div className="mt-3 flex items-center justify-between border-t border-white/[0.06] pt-3 text-xs">
                      <div>
                        <span className="text-[10px] text-muted-foreground uppercase">
                          Premiação
                        </span>
                        <p className="font-bold text-gold">
                          {formatKz(activeCockpitTournament.prize)}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-muted-foreground uppercase">
                          Inscrições
                        </span>
                        <p className="font-bold text-white">
                          {activeCockpitTournament.registered}/{activeCockpitTournament.slots} vagas
                        </p>
                      </div>
                      <Link
                        to="/tournaments/$id"
                        params={{ id: activeCockpitTournament.id }}
                        className="inline-flex items-center gap-1 rounded-lg bg-white/10 px-3 py-1.5 text-[11px] font-bold uppercase text-white hover:bg-gold hover:text-slate-950 transition-colors"
                      >
                        Ver Detalhes
                      </Link>
                    </div>
                  </div>

                  {/* Cockpit MVP Spotlight & 3D Logo Switcher Footer */}
                  <div className="mt-4 flex items-center justify-between border-t border-white/[0.08] pt-3">
                    <div className="flex items-center gap-2">
                      <div className="flex size-7 items-center justify-center rounded-full bg-gradient-to-tr from-gold to-amber-600 text-slate-950 font-black text-xs">
                        #1
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-white">
                          {topPlayers[0]?.username ?? "NinjaKz"}
                        </p>
                        <p className="text-[9px] text-gold uppercase tracking-wider">
                          MVP da Temporada
                        </p>
                      </div>
                    </div>

                    {/* 3D Visualizer Toggle */}
                    <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 text-[10px]">
                      <button
                        onClick={() => setLogoMode("original")}
                        className={`rounded-full px-2 py-0.5 font-bold transition-colors cursor-pointer ${
                          logoMode === "original"
                            ? "bg-gold text-slate-950"
                            : "text-muted-foreground hover:text-white"
                        }`}
                      >
                        Logo
                      </button>
                      <button
                        onClick={() => setLogoMode("render3d")}
                        className={`rounded-full px-2 py-0.5 font-bold transition-colors cursor-pointer ${
                          logoMode === "render3d"
                            ? "bg-gold text-slate-950"
                            : "text-muted-foreground hover:text-white"
                        }`}
                      >
                        3D
                      </button>
                    </div>
                  </div>

                  {/* Expandable Preview of 3D render when toggled */}
                  {logoMode === "render3d" ? (
                    <div className="mt-3 overflow-hidden rounded-2xl border border-gold/30 bg-black/40 p-2 text-center animate-in fade-in duration-300">
                      <img
                        src={logo3D}
                        alt="Emblema 3D Angola Gamers"
                        className="mx-auto size-44 rounded-xl object-cover shadow-2xl"
                      />
                      <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-gold">
                        Emblema Oficial 3D · Angola Gamers
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. BENTO GRID: TORNEIOS, LEADERBOARD & JOGOS OFICIAIS    */}
      {/* ======================================================== */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        {/* Section Header */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              <span className="size-1.5 rounded-full bg-primary animate-ping" />
              Competições Oficiais
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Torneios em Destaque & Ligas
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Inscrições abertas e chaves ao vivo com premiações garantidas em Kwanza (Kz).
            </p>
          </div>

          <Link
            to="/tournaments"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition-all hover:border-gold/40 hover:bg-white/[0.08]"
          >
            Ver Todos os Torneios <ArrowRight className="size-4 text-gold" />
          </Link>
        </div>

        {/* Bento Grid Architecture */}
        <div className="grid gap-5 lg:grid-cols-12">
          {/* Bento Item 1: Featured Large Tournament (Spans 8 cols) */}
          <div className="lg:col-span-8">
            <div className="grid gap-4 md:grid-cols-2">
              {featured.map((t) => {
                const gameObj = games.find((g) => g.slug === t.game);
                const progress = Math.min(100, Math.round((t.registered / t.slots) * 100));

                return (
                  <Link
                    key={t.id}
                    to="/tournaments/$id"
                    params={{ id: t.id }}
                    className="nex-glass-card group flex flex-col justify-between p-6"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <span className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gold">
                          {gameObj?.name ?? t.game}
                        </span>
                        <StatusPill status={t.status} />
                      </div>

                      <h3 className="mt-4 text-lg font-bold text-white transition-colors group-hover:text-gold">
                        {t.name}
                      </h3>

                      <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-xs">
                        <div>
                          <p className="text-[10px] uppercase text-muted-foreground">Data & Hora</p>
                          <p className="font-semibold text-white">
                            {new Date(t.date).toLocaleDateString("pt-AO")} · {t.time}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase text-muted-foreground">Prize Pool</p>
                          <p className="font-black text-gold">{formatKz(t.prize)}</p>
                        </div>
                      </div>

                      {/* Capacity Bar */}
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-1.5">
                          <span>Vagas preenchidas</span>
                          <span className="font-bold text-white">
                            {t.registered}/{t.slots} ({progress}%)
                          </span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                          <div
                            style={{ width: `${progress}%` }}
                            className="h-full rounded-full bg-gradient-to-r from-primary to-gold transition-all duration-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4 text-xs">
                      <span className="font-bold text-primary group-hover:text-white transition-colors">
                        Inscrever equipa / jogador
                      </span>
                      <ChevronRight className="size-4 text-gold transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Bento Item 2: Fintech-grade Top Players Leaderboard (Spans 4 cols) */}
          <div className="lg:col-span-4">
            <div className="nex-glass-card h-full p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                  <div className="flex items-center gap-2">
                    <Trophy className="size-4 text-gold" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                      Ranking Nacional (Elo)
                    </h3>
                  </div>
                  <Link to="/rankings" className="text-[11px] font-bold text-gold hover:underline">
                    Ver Tudo
                  </Link>
                </div>

                {/* Player List */}
                <div className="mt-4 divide-y divide-white/[0.06]">
                  {topPlayers.map((p, i) => (
                    <Link
                      key={p.username}
                      to="/players/$username"
                      params={{ username: p.username }}
                      className="flex items-center gap-3 py-3 transition-colors hover:bg-white/[0.03] px-2 rounded-xl"
                    >
                      <RankMedal rank={i + 1} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-white truncate">{p.username}</p>
                        <p className="text-[10px] text-muted-foreground truncate">
                          {p.team ?? "Agente Livre"} · {p.province ?? "Luanda"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-black text-gold">
                          {p.points.toLocaleString("pt-AO")} pts
                        </p>
                        <p className="text-[9px] text-emerald-400 font-semibold">
                          {p.winRate ?? 92}% Win
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-white/[0.08] bg-white/[0.02] p-3 text-center">
                <p className="text-[11px] text-muted-foreground">
                  Queres pontuar nos rankings oficiais de Angola?
                </p>
                <Link
                  to="/register"
                  className="mt-2 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-primary hover:text-gold transition-colors"
                >
                  Registrar Perfil Competitivo <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. JOGOS SUPORTADOS (GRID COM CARDS HOLOGRÁFICOS)        */}
      {/* ======================================================== */}
      <section className="relative border-y border-white/[0.08] bg-[#090b12] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle
            eyebrow="Títulos Oficiais"
            title="Jogos Suportados na Plataforma"
            subtitle="Categorias com suporte oficial para torneios, ligas e rankings em Angola."
            action={
              <LinkButton to="/games" variant="ghost">
                Todos os Jogos
              </LinkButton>
            }
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {games.map((g) => (
              <Link
                key={g.slug}
                to="/games/$slug"
                params={{ slug: g.slug }}
                className={`nex-glass-card group relative overflow-hidden p-6 ${
                  g.featured ? "sm:col-span-2 lg:col-span-2" : ""
                }`}
              >
                {/* Accent ambient glow */}
                <div
                  className={`pointer-events-none absolute -right-10 -top-10 size-48 rounded-full bg-gradient-to-br ${g.accent} to-transparent opacity-20 blur-2xl transition-opacity group-hover:opacity-40`}
                />

                <div className="relative">
                  <div className="flex items-start justify-between">
                    <span className="flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-sm font-black text-white group-hover:border-gold/50 transition-colors">
                      {g.short}
                    </span>
                    {g.featured ? (
                      <span className="inline-flex items-center gap-1 rounded-full border border-gold/40 bg-gold/10 px-3 py-0.5 text-[10px] font-black uppercase text-gold">
                        <Flame className="size-3 text-gold" /> Principal Destaque
                      </span>
                    ) : null}
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-white transition-colors group-hover:text-gold">
                    {g.name}
                  </h3>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                    {g.genre}
                  </p>

                  {g.featured ? (
                    <p className="mt-3 max-w-md text-xs leading-relaxed text-muted-foreground">
                      {g.description}
                    </p>
                  ) : null}

                  <div className="mt-6 flex items-center gap-5 text-xs text-muted-foreground border-t border-white/[0.06] pt-4">
                    <span className="inline-flex items-center gap-1.5 font-medium">
                      <Users className="size-3.5 text-gold" /> {g.players} jogadores
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-medium">
                      <Trophy className="size-3.5 text-primary" /> {g.tournaments} torneios
                    </span>
                  </div>

                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-primary group-hover:text-white transition-colors">
                    Aceder à Divisão{" "}
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. RADAR DE NOTÍCIAS & AWARDS EM BENTO GRID              */}
      {/* ======================================================== */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* News Section (8 cols) */}
          <div className="lg:col-span-8">
            <SectionTitle
              eyebrow="Notícias & Anúncios"
              title="Radar Gamer de Angola"
              subtitle="As novidades, transferências e novidades do esports nacional."
              action={
                <LinkButton to="/news" variant="ghost">
                  Ver Todas
                </LinkButton>
              }
            />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {latest.map((n) => (
                <Link
                  key={n.slug}
                  to="/news/$slug"
                  params={{ slug: n.slug }}
                  className="nex-glass-card group flex flex-col justify-between p-5"
                >
                  <div>
                    <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-primary">
                      {n.category}
                    </span>
                    <h3 className="mt-3 text-sm font-bold text-white transition-colors group-hover:text-gold line-clamp-2">
                      {n.title}
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                      {n.excerpt}
                    </p>
                  </div>

                  <div className="mt-4 border-t border-white/[0.06] pt-3 text-[10px] text-muted-foreground flex items-center justify-between">
                    <span>{n.author}</span>
                    <span>{formatDate(n.date)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Awards Spotlight Banner (4 cols) */}
          <div className="lg:col-span-4">
            <div className="nex-glass-card relative overflow-hidden p-6 sm:p-8 h-full flex flex-col justify-between border-gold/30">
              <div className="pointer-events-none absolute -right-10 -bottom-10 size-48 rounded-full bg-gold/15 blur-3xl" />

              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-gold">
                  <Sparkles className="size-3" /> Votação Oficial
                </div>

                <h3 className="mt-4 text-2xl font-black tracking-tight text-white">
                  Angola Gamers Awards 2026
                </h3>

                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  Vota nos melhores jogadores, equipas, streamers e momentos competitivos que
                  marcaram o ano no gaming angolano.
                </p>

                <div className="mt-6 space-y-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Categorias Ativas:</span>
                    <span className="font-bold text-white">12 categorias</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Votos Registados:</span>
                    <span className="font-bold text-gold">+15.400 votos</span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  to="/awards"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-gold px-5 py-3 text-xs font-black uppercase tracking-wider text-slate-950 shadow-[0_0_20px_rgba(234,179,8,0.35)] transition-all hover:scale-[1.02]"
                >
                  <Trophy className="size-4" /> Entrar e Votar Agora
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. CALL TO ACTION: JUNTAR-SE À COMUNIDADE (FINTECH GLASS) */}
      {/* ======================================================== */}
      <section className="relative border-t border-white/[0.08] bg-gradient-to-b from-[#0a0d16] to-[#07090e] py-16 sm:py-20">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="nex-glass-card relative overflow-hidden rounded-3xl p-8 sm:p-12 border-primary/30">
            <div className="pointer-events-none absolute right-0 top-0 size-96 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute left-0 bottom-0 size-96 rounded-full bg-gold/10 blur-3xl" />

            <div className="relative max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-gold">
                Level Up Angola
              </span>

              <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl">
                Pronto para competir no mais alto nível?
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Cria a tua conta hoje, conecta a tua gamer tag, junta-te a uma equipa ou inscreve-te
                nos próximos torneios com premiações garantidas em Kz.
              </p>

              <div className="mt-8 flex flex-wrap gap-3.5">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-gradient-to-r from-primary to-red-600 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_25px_rgba(239,68,68,0.4)] transition-all hover:scale-[1.02]"
                >
                  Criar Perfil Gratuito <ArrowRight className="size-4" />
                </Link>

                <Link
                  to="/tournaments"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-white/[0.08]"
                >
                  Ver Calendário de Torneios
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
