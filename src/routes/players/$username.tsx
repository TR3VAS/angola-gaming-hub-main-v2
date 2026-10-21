import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Trophy,
  Users,
  Shield,
  ExternalLink,
  ChevronRight,
  Flame,
  Zap,
  Target,
  Clock,
  Crosshair,
  Award,
  Globe,
  Share2,
  CheckCircle2,
  Calendar,
  Gamepad2,
  TrendingUp,
} from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { players, formatKz, type Player } from "@/lib/mock-data";
import { RankMedal } from "@/components/site/ui-bits";

export const Route = createFileRoute("/players/$username")({
  component: PlayerProfileComponent,
  head: ({ params }) => {
    const player = players.find(
      (p) => p.username.toLowerCase() === decodeURIComponent(params.username).toLowerCase(),
    );
    const title = player
      ? `${player.username} - Estatísticas Fortnite & Perfil | Angola Gamers Tracker`
      : "Perfil de Jogador — Angola Gamers";
    return {
      meta: [
        { title },
        {
          name: "description",
          content: player
            ? `Estatísticas completas de ${player.username} no Fortnite: vitórias, K/D, TRN Rating, histórico de partidas e classificação nacional.`
            : "Perfil de atleta esports na Angola Gamers.",
        },
      ],
    };
  },
});

type ModeTab = "overall" | "solo" | "duos" | "squads" | "ranked";

function PlayerProfileComponent() {
  const { username } = Route.useParams();
  const decodedUsername = decodeURIComponent(username);

  const player = useMemo(() => {
    return players.find((p) => p.username.toLowerCase() === decodedUsername.toLowerCase());
  }, [decodedUsername]);

  const [activeTab, setActiveTab] = useState<"overview" | "matches" | "events">("overview");
  const [selectedMode, setSelectedMode] = useState<ModeTab>("overall");
  const [copied, setCopied] = useState(false);

  const stats = player?.fortniteStats;

  // Selected mode stats
  const currentModeStats = useMemo(() => {
    if (!stats) return null;
    if (selectedMode === "overall") {
      return {
        matches: stats.overall.matches,
        wins: stats.overall.wins,
        winRate: stats.overall.winRate,
        kills: stats.overall.kills,
        kd: stats.overall.kd,
        top3_5_10: Math.round(stats.overall.matches * 0.22),
        top6_12_25: Math.round(stats.overall.matches * 0.41),
        avgTime: "14m 20s",
        trnRating: stats.overall.trnRating,
        score: stats.overall.score,
      };
    }
    return stats.modes[selectedMode];
  }, [stats, selectedMode]);

  if (!player) {
    return (
      <Layout>
        <div className="mx-auto max-w-4xl px-4 py-24 text-center">
          <div className="nex-glass-card p-12">
            <h1 className="text-3xl font-black text-white">Jogador Não Encontrado</h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Não encontramos nenhum jogador registado com o username "{decodedUsername}".
            </p>
            <div className="mt-6">
              <Link
                to="/games/$slug"
                params={{ slug: "fortnite" }}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white"
              >
                <ArrowLeft className="size-4" /> Voltar ao Hub de Fortnite
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const isFortnite = player.game === "fortnite";

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Layout>
      {/* ── Fortnite Tracker Banner Header ── */}
      <section className="relative overflow-hidden border-b border-white/[0.08] bg-[#0c0d18] pt-8 pb-10">
        {/* Ambient backdrop gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#181135] via-[#0e1022] to-[#0a0c16] opacity-90" />
        <div className="pointer-events-none absolute inset-0 nex-dot-grid opacity-20" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          {/* Breadcrumb nav */}
          <div className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
            <Link to="/games" className="hover:text-white transition">
              Jogos
            </Link>
            <span>/</span>
            <Link
              to="/games/$slug"
              params={{ slug: player.game }}
              className="capitalize hover:text-white transition text-gold font-semibold"
            >
              {player.game}
            </Link>
            <span>/</span>
            <span className="text-white font-bold">{player.username}</span>
          </div>

          {/* Profile Header Grid */}
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* Left: Avatar, Username, GamerTag, Team, Platform */}
            <div className="flex items-center gap-5">
              {/* Avatar with Glow and Rank Badge */}
              <div className="relative shrink-0">
                <div className="size-20 sm:size-24 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 p-0.5 shadow-[0_0_25px_rgba(147,51,234,0.35)]">
                  <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-[#121424] font-black text-2xl sm:text-3xl text-white">
                    {player.username.slice(0, 2).toUpperCase()}
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2">
                  <span className="flex size-7 items-center justify-center rounded-full bg-gold text-xs font-black text-slate-950 shadow-lg ring-2 ring-[#0c0d18]">
                    #{player.rank}
                  </span>
                </div>
              </div>

              {/* Identity Details */}
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {player.username}
                  </h1>
                  <span className="rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-neutral-300">
                    {player.platform ?? "PC"}
                  </span>
                  <span className="flex items-center gap-1 rounded-md bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                    <CheckCircle2 className="size-3" /> Verificado
                  </span>
                </div>

                <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span>
                    Nome: <strong className="text-white">{player.name}</strong>
                  </span>
                  <span>&bull;</span>
                  <span className="font-mono text-neutral-400">{player.gamerTag}</span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1 text-neutral-300">
                    <Globe className="size-3 text-gold" /> {player.province}, Angola
                  </span>
                </div>

                {player.team && (
                  <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg border border-gold/30 bg-gold/10 px-2.5 py-1 text-xs font-bold text-gold">
                    <Shield className="size-3.5" />
                    <span>{player.team}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Quick Action & Headline Performance */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-bold text-white transition hover:bg-white/10 hover:border-white/20 cursor-pointer"
              >
                <Share2 className="size-3.5" />
                <span>{copied ? "Link Copiado!" : "Partilhar Perfil"}</span>
              </button>

              <div className="rounded-xl border border-gold/30 bg-gradient-to-r from-amber-500/10 to-gold/10 px-4 py-2 text-right">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold block">
                  Prize Money Total
                </span>
                <span className="text-base font-black text-white">{formatKz(player.prize)}</span>
              </div>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="mt-8 flex items-center gap-2 border-b border-white/[0.06] pb-1">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
                activeTab === "overview"
                  ? "border-gold text-gold"
                  : "border-transparent text-muted-foreground hover:text-white"
              }`}
            >
              Overview (Visão Geral)
            </button>
            <button
              onClick={() => setActiveTab("matches")}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
                activeTab === "matches"
                  ? "border-gold text-gold"
                  : "border-transparent text-muted-foreground hover:text-white"
              }`}
            >
              Partidas Recentes ({stats?.recentMatches.length ?? 0})
            </button>
            <button
              onClick={() => setActiveTab("events")}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
                activeTab === "events"
                  ? "border-gold text-gold"
                  : "border-transparent text-muted-foreground hover:text-white"
              }`}
            >
              Eventos & Torneios ({player.tournaments})
            </button>
          </div>
        </div>
      </section>

      {/* ── Main Tracker Dashboard Content ── */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Top Cards: TRN Rating, Wins, K/D, Win %, PR */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {/* TRN Rating Card */}
              <div className="nex-glass-card relative overflow-hidden p-5 border-gold/30 shadow-[0_0_20px_rgba(234,179,8,0.1)]">
                <div className="flex items-center justify-between text-muted-foreground mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gold">
                    TRN Score
                  </span>
                  <Zap className="size-4 text-gold" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white">
                  {stats?.overall.trnRating.toLocaleString("pt-AO") ?? 2450}
                </div>
                <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                  <TrendingUp className="size-3" />
                  <span>Top 1.2% Nacional</span>
                </div>
              </div>

              {/* Wins Card */}
              <div className="nex-glass-card p-5">
                <div className="flex items-center justify-between text-muted-foreground mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider">Vitórias</span>
                  <Trophy className="size-4 text-emerald-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white">
                  {stats?.overall.wins ?? player.wins}
                </div>
                <div className="mt-1 text-[11px] text-muted-foreground">
                  {stats?.overall.winRate ?? 18.5}% Taxa de Vitória
                </div>
              </div>

              {/* K/D Ratio Card */}
              <div className="nex-glass-card p-5">
                <div className="flex items-center justify-between text-muted-foreground mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider">K/D Ratio</span>
                  <Target className="size-4 text-red-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white">
                  {stats?.overall.kd ?? 3.42}
                </div>
                <div className="mt-1 text-[11px] text-muted-foreground">
                  {stats?.overall.kills.toLocaleString("pt-AO") ?? 3840} Eliminações
                </div>
              </div>

              {/* Power Ranking Card */}
              <div className="nex-glass-card p-5">
                <div className="flex items-center justify-between text-muted-foreground mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider">
                    Power Ranking
                  </span>
                  <Flame className="size-4 text-amber-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white">
                  #{player.powerRanking ?? player.rank}
                </div>
                <div className="mt-1 text-[11px] text-muted-foreground">
                  {player.points.toLocaleString("pt-AO")} Pontos Elo
                </div>
              </div>

              {/* Matches Played */}
              <div className="nex-glass-card p-5">
                <div className="flex items-center justify-between text-muted-foreground mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider">Partidas</span>
                  <Clock className="size-4 text-sky-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white">
                  {stats?.overall.matches.toLocaleString("pt-AO") ?? 1420}
                </div>
                <div className="mt-1 text-[11px] text-muted-foreground">
                  Tempo: {stats?.overall.timePlayed ?? "180h"}
                </div>
              </div>
            </div>

            {/* Mode Selectors Tabs like Fortnite Tracker */}
            <div className="nex-glass-card p-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
                <div>
                  <h2 className="text-lg font-black text-white">Modos de Jogo & Matchmaking</h2>
                  <p className="text-xs text-muted-foreground">
                    Desempenho detalhado por lista de matchmaking (Solo, Duos, Squads e Ranked).
                  </p>
                </div>

                {/* Playlist selector buttons */}
                <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-white/10 bg-black/40 p-1">
                  {(["overall", "solo", "duos", "squads", "ranked"] as ModeTab[]).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setSelectedMode(mode)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        selectedMode === mode
                          ? "bg-gold text-slate-950 shadow-md"
                          : "text-muted-foreground hover:text-white"
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mode Breakdown Detailed Grid */}
              {currentModeStats && (
                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 text-center">
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                    <span className="text-[10px] font-bold uppercase text-muted-foreground">
                      Vitórias
                    </span>
                    <p className="mt-1 text-2xl font-black text-emerald-400">
                      {currentModeStats.wins}
                    </p>
                    <span className="text-[10px] text-muted-foreground">1º Lugar</span>
                  </div>

                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                    <span className="text-[10px] font-bold uppercase text-muted-foreground">
                      Win %
                    </span>
                    <p className="mt-1 text-2xl font-black text-white">
                      {currentModeStats.winRate}%
                    </p>
                    <span className="text-[10px] text-muted-foreground">Taxa de Vitória</span>
                  </div>

                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                    <span className="text-[10px] font-bold uppercase text-muted-foreground">
                      Eliminações
                    </span>
                    <p className="mt-1 text-2xl font-black text-white">
                      {currentModeStats.kills.toLocaleString("pt-AO")}
                    </p>
                    <span className="text-[10px] text-muted-foreground">Total Kills</span>
                  </div>

                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                    <span className="text-[10px] font-bold uppercase text-muted-foreground">
                      K/D Ratio
                    </span>
                    <p className="mt-1 text-2xl font-black text-gold">{currentModeStats.kd}</p>
                    <span className="text-[10px] text-muted-foreground">Kills por Morte</span>
                  </div>

                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                    <span className="text-[10px] font-bold uppercase text-muted-foreground">
                      Top Placements
                    </span>
                    <p className="mt-1 text-2xl font-black text-white">
                      {currentModeStats.top3_5_10}
                    </p>
                    <span className="text-[10px] text-muted-foreground">Top 3 / 5 / 10</span>
                  </div>

                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                    <span className="text-[10px] font-bold uppercase text-muted-foreground">
                      Partidas
                    </span>
                    <p className="mt-1 text-2xl font-black text-white">
                      {currentModeStats.matches}
                    </p>
                    <span className="text-[10px] text-muted-foreground">
                      Duração ~ {currentModeStats.avgTime}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Split Section: Recent Match Feed + Competitive Achievements */}
            <div className="grid gap-6 lg:grid-cols-12">
              {/* Left Column: Recent Match Feed (8 cols) */}
              <div className="lg:col-span-8 nex-glass-card p-6">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Gamepad2 className="size-4 text-primary" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                      Histórico Recente de Partidas
                    </h3>
                  </div>
                  <span className="text-[11px] text-muted-foreground">Matchmaking Oficial</span>
                </div>

                <div className="divide-y divide-white/[0.06]">
                  {stats?.recentMatches.map((m) => (
                    <div
                      key={m.id}
                      className="flex flex-wrap items-center justify-between gap-4 py-3.5 px-2 rounded-xl transition hover:bg-white/[0.02]"
                    >
                      {/* Left: Placement and Playlist */}
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex size-10 shrink-0 items-center justify-center rounded-xl font-black text-sm ${
                            m.placement === 1
                              ? "bg-gold text-slate-950 shadow-[0_0_15px_rgba(234,179,8,0.4)]"
                              : m.placement <= 3
                                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                : "bg-white/10 text-neutral-300"
                          }`}
                        >
                          #{m.placement}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">{m.playlist}</p>
                          <p className="text-[10px] text-muted-foreground">{m.date}</p>
                        </div>
                      </div>

                      {/* Middle: Stats */}
                      <div className="flex items-center gap-6 text-xs">
                        <div>
                          <span className="text-[10px] uppercase text-muted-foreground block">
                            Kills
                          </span>
                          <span className="font-bold text-white">{m.kills}</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase text-muted-foreground block">
                            Sobrevivência
                          </span>
                          <span className="font-semibold text-neutral-300">{m.timeAlive}</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase text-muted-foreground block">
                            Score
                          </span>
                          <span className="font-bold text-gold">+{m.score}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Bio, Badges, Team and Circuit Standing (4 cols) */}
              <div className="lg:col-span-4 space-y-6">
                {/* Player Badges */}
                <div className="nex-glass-card p-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
                    Insígnias & Conquistas
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {player.badges.map((b) => (
                      <span
                        key={b}
                        className="rounded-lg border border-gold/30 bg-gold/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-gold"
                      >
                        {b}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 border-t border-white/[0.08] pt-4">
                    <p className="text-xs leading-relaxed text-neutral-300">{player.bio}</p>
                  </div>
                </div>

                {/* Team Card */}
                {player.team && (
                  <div className="nex-glass-card p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold uppercase text-muted-foreground">
                        Organização / Equipa
                      </span>
                      <Shield className="size-4 text-gold" />
                    </div>
                    <p className="text-lg font-black text-white">{player.team}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Contrato ativo na divisão angolana de Fortnite.
                    </p>
                    <Link
                      to="/teams"
                      className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-gold hover:underline"
                    >
                      Ver Roster da Equipa <ChevronRight className="size-3.5" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── Matches Tab ── */}
        {activeTab === "matches" && (
          <div className="nex-glass-card p-6">
            <h2 className="text-lg font-black text-white mb-2">Relatório Completo de Partidas</h2>
            <p className="text-xs text-muted-foreground mb-6">
              Dados extraídos diretamente do circuito de matchmaking competitivo da Angola Gamers.
            </p>

            <div className="divide-y divide-white/[0.08]">
              {stats?.recentMatches.map((m) => (
                <div
                  key={m.id}
                  className="flex flex-wrap items-center justify-between gap-4 py-4 px-3 rounded-xl transition hover:bg-white/[0.02]"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex size-12 shrink-0 items-center justify-center rounded-xl font-black text-base ${
                        m.placement === 1
                          ? "bg-gold text-slate-950 shadow-md"
                          : m.placement <= 3
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-white/10 text-neutral-300"
                      }`}
                    >
                      #{m.placement}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{m.playlist}</p>
                      <p className="text-xs text-muted-foreground">{m.date}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6 text-center text-xs">
                    <div>
                      <span className="text-[10px] uppercase text-muted-foreground block">
                        Eliminações
                      </span>
                      <span className="font-bold text-white text-sm">{m.kills}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-muted-foreground block">
                        Tempo Vivo
                      </span>
                      <span className="font-semibold text-neutral-300 text-sm">{m.timeAlive}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-muted-foreground block">
                        Pontos TRN
                      </span>
                      <span className="font-black text-gold text-sm">+{m.score}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Events Tab ── */}
        {activeTab === "events" && (
          <div className="nex-glass-card p-6">
            <h2 className="text-lg font-black text-white mb-2">
              Participações em Torneios Oficiais
            </h2>
            <p className="text-xs text-muted-foreground mb-6">
              Histórico de cash cups, qualificadores e finais presenciais no circuito nacional.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="rounded bg-gold/10 px-2 py-0.5 text-[10px] font-bold text-gold border border-gold/30">
                    1º Lugar &bull; Campeão
                  </span>
                  <span className="text-xs text-muted-foreground">Março 2026</span>
                </div>
                <h3 className="text-base font-bold text-white">Angola Fortnite Cup Season 1</h3>
                <p className="mt-2 text-xs text-muted-foreground">
                  Premiação conquistada:{" "}
                  <strong className="text-gold">{formatKz(player.prize * 0.6)}</strong>
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                    Top 3 Finalista
                  </span>
                  <span className="text-xs text-muted-foreground">Fevereiro 2026</span>
                </div>
                <h3 className="text-base font-bold text-white">Luanda Battle Royale Masters</h3>
                <p className="mt-2 text-xs text-muted-foreground">
                  Premiação conquistada:{" "}
                  <strong className="text-gold">{formatKz(player.prize * 0.4)}</strong>
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
}
