import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Trophy,
  Users,
  Calendar,
  Clock,
  Flame,
  Shield,
  Filter,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Award,
  Zap,
  Search,
  Crosshair,
  Swords,
  Crown,
} from "lucide-react";
import { Layout } from "@/components/site/Layout";
import {
  games,
  players,
  tournaments,
  teams,
  news,
  formatKz,
  formatDate,
  provinces,
  type Player,
  type Team,
  type Tournament,
} from "@/lib/mock-data";
import { RankMedal, StatusPill } from "@/components/site/ui-bits";

export const Route = createFileRoute("/games/$slug")({
  component: GameSlugComponent,
  head: ({ params }) => {
    const game = games.find((g) => g.slug === params.slug);
    const title = game ? `${game.name} Angola — Hub Oficial & Rankings` : "Jogo — Angola Gamers";
    return {
      meta: [
        { title },
        {
          name: "description",
          content: game
            ? `Hub oficial de ${game.name} em Angola. Rankings nacionais, cash cups, torneios ativos, equipas e premiações em Kz.`
            : "Hub oficial de gaming e esports em Angola.",
        },
      ],
    };
  },
});

function GameSlugComponent() {
  const { slug } = Route.useParams();
  const game = games.find((g) => g.slug === slug);

  // Search in Fortnite / Game Hub
  const [query, setQuery] = useState("");

  // Ranking filters
  const [selectedFormat, setSelectedFormat] = useState<"TODOS" | "SOLO" | "DUOS" | "SQUADS">(
    "TODOS",
  );
  const [selectedProvince, setSelectedProvince] = useState<string>("TODAS");

  // Players of this game
  const gamePlayers = useMemo(() => {
    if (!game) return [];
    let list = players.filter((p) => p.game === game.slug);

    if (selectedProvince !== "TODAS") {
      list = list.filter((p) => p.province === selectedProvince);
    }

    return list.sort((a, b) => b.points - a.points);
  }, [game, selectedProvince]);

  // Filtered Data for this specific game
  const gameTournaments = useMemo(() => {
    if (!game) return [];
    return tournaments.filter((t) => t.game === game.slug);
  }, [game]);

  const activeTournaments = useMemo(() => {
    return gameTournaments.filter((t) => t.status !== "FINISHED");
  }, [gameTournaments]);

  const gameTeams = useMemo(() => {
    if (!game) return [];
    return teams.filter((t) => t.games.includes(game.slug));
  }, [game]);

  const gameNews = useMemo(() => {
    if (!game) return [];
    return news.filter(
      (n) =>
        n.title.toLowerCase().includes(game.name.toLowerCase()) || n.category === "Competitivo",
    );
  }, [game]);

  // Search Results for Fortnite / Game Hub (Players, Teams, Tournaments)
  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q || !game) return { players: [], teams: [], tournaments: [] };

    const matchedPlayers = players
      .filter(
        (p) =>
          p.game === game.slug &&
          (p.username.toLowerCase().includes(q) ||
            p.name.toLowerCase().includes(q) ||
            p.gamerTag.toLowerCase().includes(q)),
      )
      .slice(0, 4);

    const matchedTeams = gameTeams
      .filter((t) => t.name.toLowerCase().includes(q) || t.tag.toLowerCase().includes(q))
      .slice(0, 3);

    const matchedTournaments = gameTournaments
      .filter((t) => t.name.toLowerCase().includes(q))
      .slice(0, 3);

    return {
      players: matchedPlayers,
      teams: matchedTeams,
      tournaments: matchedTournaments,
    };
  }, [query, game, gameTeams, gameTournaments]);

  // 2. Season Solo Win: player with highest kills / solo wins
  const topSoloKillsPlayer = useMemo(() => {
    return [...gamePlayers].sort((a, b) => b.wins - a.wins)[0] || gamePlayers[0];
  }, [gamePlayers]);

  // 3. Ranked Battle Royale: team with most points / titles in tournaments
  const topTournamentTeam = useMemo(() => {
    return [...gameTeams].sort((a, b) => b.titles - a.titles)[0] || gameTeams[0];
  }, [gameTeams]);

  // If game is not found
  if (!game) {
    return (
      <Layout>
        <div className="mx-auto max-w-4xl px-4 py-24 text-center">
          <div className="nex-glass-card p-12">
            <h1 className="text-3xl font-black text-white">Modalidade Não Encontrada</h1>
            <p className="mt-3 text-sm text-muted-foreground">
              A modalidade "{slug}" não foi encontrada no nosso catálogo oficial.
            </p>
            <div className="mt-6">
              <Link
                to="/games"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white"
              >
                <ArrowLeft className="size-4" /> Voltar ao Catálogo de Jogos
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const totalPrizeDisbursed = gameTournaments.reduce((acc, t) => acc + t.prize, 0);

  const hasSearchResults =
    query.trim().length > 0 &&
    (searchResults.players.length > 0 ||
      searchResults.teams.length > 0 ||
      searchResults.tournaments.length > 0);

  // Top statistics specific to the prompt for Fortnite / Games:
  // 1. Power Ranked: player with highest points
  const topPowerRankedPlayer = gamePlayers[0];

  const isFortnite = game.slug === "fortnite";

  return (
    <Layout>
      {/* ======================================================== */}
      {/* 1. FORTNITE TRACKER STYLE HERO BANNER (Image 2 Inspired) */}
      {/* ======================================================== */}
      <section className="relative overflow-hidden border-b border-white/[0.08] bg-[#070814] pt-8 pb-16">
        {/* Dynamic purple/blue cosmic gradient for Fortnite, custom accent for others */}
        <div
          className={`pointer-events-none absolute inset-0 ${
            isFortnite
              ? "bg-gradient-to-b from-[#170e3a] via-[#0d1029] to-[#070814]"
              : "bg-gradient-to-b from-[#131627] via-[#0d101d] to-[#070814]"
          }`}
        />
        <div className="pointer-events-none absolute inset-0 nex-dot-grid opacity-25" />

        {/* Top subtle ambient light */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[650px] rounded-full bg-gradient-to-tr from-purple-600/25 via-blue-500/20 to-transparent blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-white transition-colors">
              Início
            </Link>
            <span>/</span>
            <Link to="/games" className="hover:text-white transition-colors">
              Jogos
            </Link>
            <span>/</span>
            <span className="font-bold text-gold">{game.name}</span>
          </div>

          {/* Center Search Header (Tracker.gg Style) */}
          <div className="mx-auto max-w-3xl text-center py-6 sm:py-10">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-purple-300">
              <Sparkles className="size-3 text-gold" />
              <span>
                {isFortnite ? "Angola Fortnite Tracker & Radar" : `${game.name} Tracker Hub`}
              </span>
            </div>

            <h1 className="text-3xl font-black uppercase tracking-tight text-white drop-shadow-md sm:text-5xl lg:text-6xl">
              {isFortnite
                ? "FIND YOUR FORTNITE STATS"
                : `FIND YOUR ${game.name.toUpperCase()} STATS`}
            </h1>

            <p className="mt-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Comunidade Gamer de Angola &bull; Dados Verificados
            </p>

            {/* Multifunctional Search Bar */}
            <div className="relative mt-8 max-w-2xl mx-auto">
              <div className="relative flex items-center">
                <Search className="absolute left-4 size-5 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={
                    isFortnite
                      ? "Pesquisar por Jogador, Equipa ou Campeonato de Fortnite..."
                      : `Pesquisar jogadores, equipas ou torneios de ${game.name}...`
                  }
                  className="w-full rounded-2xl border border-white/20 bg-white/[0.07] py-4 pl-12 pr-12 text-sm text-white placeholder:text-muted-foreground/70 outline-none backdrop-blur-xl shadow-2xl transition focus:border-gold focus:bg-white/[0.1] focus:ring-2 focus:ring-gold/30"
                />
                <button
                  type="button"
                  className="absolute right-3.5 flex size-8 items-center justify-center rounded-xl bg-gold/20 text-gold hover:bg-gold hover:text-slate-950 transition"
                  aria-label="Buscar"
                >
                  <ArrowRight className="size-4" />
                </button>
              </div>

              {/* Real-time Search Dropdown (Players, Teams, Tournaments) */}
              {query.trim().length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-2 z-50 rounded-2xl border border-white/10 bg-[#0d1020]/95 p-3 text-left shadow-2xl backdrop-blur-2xl max-h-96 overflow-y-auto">
                  {!hasSearchResults ? (
                    <div className="py-6 text-center text-xs text-muted-foreground">
                      Nenhum jogador, equipa ou torneio encontrado para "{query}".
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {/* Players */}
                      {searchResults.players.length > 0 && (
                        <div>
                          <p className="px-3 py-1 text-[10px] font-black uppercase tracking-widest text-gold">
                            Jogadores ({searchResults.players.length})
                          </p>
                          <div className="space-y-0.5">
                            {searchResults.players.map((p) => (
                              <Link
                                key={p.username}
                                to="/players/$username"
                                params={{ username: p.username }}
                                className="flex items-center justify-between rounded-xl px-3 py-2 text-xs transition hover:bg-white/[0.06]"
                              >
                                <div>
                                  <span className="font-bold text-white">{p.username}</span>
                                  <span className="ml-2 font-mono text-[10px] text-muted-foreground">
                                    {p.gamerTag}
                                  </span>
                                </div>
                                <span className="font-bold text-gold">
                                  {p.points.toLocaleString("pt-AO")} pts
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Teams */}
                      {searchResults.teams.length > 0 && (
                        <div className="border-t border-white/[0.06] pt-2">
                          <p className="px-3 py-1 text-[10px] font-black uppercase tracking-widest text-primary">
                            Equipas ({searchResults.teams.length})
                          </p>
                          <div className="space-y-0.5">
                            {searchResults.teams.map((t) => (
                              <Link
                                key={t.id}
                                to="/teams/$id"
                                params={{ id: t.id }}
                                className="flex items-center justify-between rounded-xl px-3 py-2 text-xs transition hover:bg-white/[0.06]"
                              >
                                <span className="font-bold text-white">
                                  [{t.tag}] {t.name}
                                </span>
                                <span className="text-[10px] text-muted-foreground">
                                  {t.city} &bull; {t.titles} títulos
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tournaments */}
                      {searchResults.tournaments.length > 0 && (
                        <div className="border-t border-white/[0.06] pt-2">
                          <p className="px-3 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-400">
                            Campeonatos ({searchResults.tournaments.length})
                          </p>
                          <div className="space-y-0.5">
                            {searchResults.tournaments.map((t) => (
                              <Link
                                key={t.id}
                                to="/tournaments/$id"
                                params={{ id: t.id }}
                                className="flex items-center justify-between rounded-xl px-3 py-2 text-xs transition hover:bg-white/[0.06]"
                              >
                                <span className="font-bold text-white truncate pr-2">{t.name}</span>
                                <span className="font-bold text-gold whitespace-nowrap">
                                  {formatKz(t.prize)}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Sub-label under search */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-[11px] text-muted-foreground">
                <span>Pesquisa por Gamertag/ID, Nome ou Equipa</span>
                <span>&bull;</span>
                <span className="flex items-center gap-1 font-semibold text-white">
                  <Users className="size-3 text-gold" />
                  Rastreando +{game.players.toLocaleString("pt-AO")} Atletas em Angola
                </span>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* 2. THE THREE LEADERBOARDS #1 CARDS (As shown in Image 2)  */}
          {/* ======================================================== */}
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {/* Card 1: 2026 AG POWER RANK */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d1020]/90 shadow-2xl backdrop-blur-xl transition hover:border-gold/50">
              {/* Card Header Strip: Yellow/Gold */}
              <div className="flex items-center justify-between bg-gradient-to-r from-amber-500 via-gold to-yellow-400 px-4 py-2 text-slate-950 font-black">
                <span className="text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                  <Trophy className="size-3.5" /> 2026 AG POWER RANK
                </span>
                <a
                  href="#rankings-section"
                  className="text-[10px] uppercase tracking-widest hover:underline"
                >
                  Ver Todos
                </a>
              </div>

              {/* Card Body */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="relative flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-gold text-slate-950 font-black text-sm shadow-md">
                    <Crown className="size-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white hover:text-gold transition">
                      {topPowerRankedPlayer ? (
                        <Link
                          to="/players/$username"
                          params={{ username: topPowerRankedPlayer.username }}
                        >
                          {topPowerRankedPlayer.username}
                        </Link>
                      ) : (
                        "Em disputa"
                      )}
                    </h3>
                    <p className="text-xs font-bold text-gold">
                      PR {topPowerRankedPlayer?.points.toLocaleString("pt-AO")} pts
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {topPowerRankedPlayer?.team ?? "Agente Livre"} &bull;{" "}
                      {topPowerRankedPlayer?.province}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-3xl font-black text-white/20">#1</span>
                </div>
              </div>
            </div>

            {/* Card 2: SEASON SOLO WINS / KILLS */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d1020]/90 shadow-2xl backdrop-blur-xl transition hover:border-cyan-500/50">
              {/* Card Header Strip: Cyan/Blue */}
              <div className="flex items-center justify-between bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-500 px-4 py-2 text-slate-950 font-black">
                <span className="text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                  <Crosshair className="size-3.5" /> SEASON SOLO WINS & KILLS
                </span>
                <a
                  href="#rankings-section"
                  className="text-[10px] uppercase tracking-widest hover:underline"
                >
                  Ver Todos
                </a>
              </div>

              {/* Card Body */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="relative flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-slate-950 font-black text-sm shadow-md">
                    <Flame className="size-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white hover:text-cyan-400 transition">
                      {topSoloKillsPlayer ? (
                        <Link
                          to="/players/$username"
                          params={{ username: topSoloKillsPlayer.username }}
                        >
                          {topSoloKillsPlayer.username}
                        </Link>
                      ) : (
                        "Em disputa"
                      )}
                    </h3>
                    <p className="text-xs font-bold text-cyan-400">
                      W {topSoloKillsPlayer?.wins} &bull; Top 3: {topSoloKillsPlayer?.top3}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {topSoloKillsPlayer?.team ?? "Agente Livre"} &bull;{" "}
                      {topSoloKillsPlayer?.province}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-3xl font-black text-white/20">#1</span>
                </div>
              </div>
            </div>

            {/* Card 3: RANKED BATTLE ROYALE (TOP TEAM) */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d1020]/90 shadow-2xl backdrop-blur-xl transition hover:border-purple-500/50">
              {/* Card Header Strip: Purple */}
              <div className="flex items-center justify-between bg-gradient-to-r from-purple-600 via-fuchsia-500 to-indigo-600 px-4 py-2 text-white font-black">
                <span className="text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                  <Swords className="size-3.5" /> RANKED BATTLE ROYALE (TOP TEAM)
                </span>
                <a
                  href="#teams-section"
                  className="text-[10px] uppercase tracking-widest hover:underline"
                >
                  Ver Todos
                </a>
              </div>

              {/* Card Body */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="relative flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-indigo-700 text-white font-black text-sm shadow-md">
                    <Shield className="size-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white hover:text-purple-300 transition">
                      {topTournamentTeam ? (
                        <Link to="/teams/$id" params={{ id: topTournamentTeam.id }}>
                          [{topTournamentTeam.tag}] {topTournamentTeam.name}
                        </Link>
                      ) : (
                        "Em disputa"
                      )}
                    </h3>
                    <p className="text-xs font-bold text-purple-300">
                      {topTournamentTeam?.titles} Campeonatos Vencidos
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {topTournamentTeam?.city} &bull; Fundada em {topTournamentTeam?.founded}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-3xl font-black text-white/20">#1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. TORNEIOS & COMPETIÇÕES DESTE JOGO                     */}
      {/* ======================================================== */}
      <section id="tournaments-section" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              <span className="size-1.5 rounded-full bg-primary animate-ping" />
              Circuito Oficial
            </div>
            <h2 className="text-2xl font-black text-white sm:text-3xl">Torneios de {game.name}</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Participa nos cash cups semanais e eventos classificatórios com chaves oficiais em
              Angola.
            </p>
          </div>

          <Link
            to="/tournaments"
            className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-gold hover:underline"
          >
            Ver Todos os Torneios <ChevronRight className="size-3.5" />
          </Link>
        </div>

        {gameTournaments.length === 0 ? (
          <div className="nex-glass-card p-12 text-center">
            <p className="text-base font-bold text-white">Nenhum torneio ativo no momento</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Novas datas para {game.name} serão anunciadas em breve no nosso canal do Discord.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {gameTournaments.map((t) => {
              const progress = Math.min(100, Math.round((t.registered / t.slots) * 100));

              return (
                <div
                  key={t.id}
                  className="nex-glass-card group flex flex-col justify-between p-6 transition-all"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <StatusPill status={t.status} />
                      <span className="text-[10px] font-bold text-muted-foreground uppercase">
                        {t.format}
                      </span>
                    </div>

                    <h3 className="mt-4 text-base font-bold text-white transition-colors group-hover:text-gold">
                      {t.name}
                    </h3>

                    <div className="mt-4 space-y-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Calendar className="size-3" /> Data:
                        </span>
                        <span className="font-semibold text-white">
                          {new Date(t.date).toLocaleDateString("pt-AO")} &bull; {t.time}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Trophy className="size-3 text-gold" /> Prize Pool:
                        </span>
                        <span className="font-black text-gold">{formatKz(t.prize)}</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-1">
                        <span>Inscrições</span>
                        <span className="font-bold text-white">
                          {t.registered}/{t.slots} ({progress}%)
                        </span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                        <div
                          style={{ width: `${progress}%` }}
                          className="h-full rounded-full bg-gradient-to-r from-primary to-gold"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-white/[0.06] pt-4">
                    <Link
                      to="/tournaments/$id"
                      params={{ id: t.id }}
                      className="w-full inline-flex items-center justify-center gap-1 rounded-xl bg-white/[0.04] py-2 text-xs font-bold uppercase tracking-wider text-white border border-white/10 hover:border-gold/40 hover:bg-gold hover:text-slate-950 transition-all"
                    >
                      <span>Ver Chaves & Inscrever</span>
                      <ChevronRight className="size-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ======================================================== */}
      {/* 4. TABELA OFICIAL DE RANKINGS DO JOGO (FINTECH ELO)     */}
      {/* ======================================================== */}
      <section id="rankings-section" className="border-t border-white/[0.08] bg-[#090b12] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
                <Trophy className="size-3 text-gold" />
                Ranking Nacional 2026
              </div>
              <h2 className="text-2xl font-black text-white sm:text-3xl">
                Classificação Oficial: {game.name}
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Tabela auditada pela Angola Gamers com base nos pontos de colocação e vitórias.
              </p>
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Province Selector */}
              <div className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-muted-foreground">
                <Filter className="size-3.5" />
                <select
                  value={selectedProvince}
                  onChange={(e) => setSelectedProvince(e.target.value)}
                  className="bg-transparent text-xs text-white outline-none cursor-pointer"
                >
                  <option value="TODAS" className="bg-[#0d1019] text-white">
                    Todas as Províncias
                  </option>
                  {provinces.map((prov) => (
                    <option key={prov} value={prov} className="bg-[#0d1019] text-white">
                      {prov}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Ranking Table (Fintech Glass Style) */}
          <div className="nex-glass-card overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/[0.08] bg-white/[0.02] text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  <th className="py-4 pl-6 pr-3">Pos</th>
                  <th className="px-4 py-4">Jogador / Tag</th>
                  <th className="px-4 py-4">Equipa</th>
                  <th className="px-4 py-4">Província</th>
                  <th className="px-4 py-4 text-center">Vitórias</th>
                  <th className="px-4 py-4 text-center">Top 3</th>
                  <th className="px-4 py-4 text-center">Torneios</th>
                  <th className="px-4 py-4 text-right">Prize Money (Kz)</th>
                  <th className="py-4 pl-4 pr-6 text-right">Pontos Elo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {gamePlayers.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-8 text-center text-muted-foreground">
                      Nenhum jogador encontrado com os filtros selecionados.
                    </td>
                  </tr>
                ) : (
                  gamePlayers.map((p, i) => (
                    <tr key={p.username} className="transition-colors hover:bg-white/[0.03]">
                      {/* Rank Position */}
                      <td className="py-4 pl-6 pr-3 font-bold">
                        <RankMedal rank={i + 1} />
                      </td>

                      {/* Player Info */}
                      <td className="px-4 py-4">
                        <Link
                          to="/players/$username"
                          params={{ username: p.username }}
                          className="font-bold text-white hover:text-gold transition-colors block"
                        >
                          {p.username}
                        </Link>
                        <span className="text-[10px] text-muted-foreground font-mono">
                          {p.gamerTag}
                        </span>
                      </td>

                      {/* Team */}
                      <td className="px-4 py-4 text-muted-foreground">
                        {p.team ? (
                          <span className="inline-flex items-center gap-1 rounded-md bg-white/[0.04] px-2 py-0.5 text-[11px] font-semibold text-white">
                            <Shield className="size-3 text-gold" /> {p.team}
                          </span>
                        ) : (
                          <span className="text-[11px] italic text-muted-foreground/60">
                            Sem equipa
                          </span>
                        )}
                      </td>

                      {/* Province */}
                      <td className="px-4 py-4 text-muted-foreground">{p.province}</td>

                      {/* Wins */}
                      <td className="px-4 py-4 text-center font-bold text-emerald-400">{p.wins}</td>

                      {/* Top 3 */}
                      <td className="px-4 py-4 text-center font-bold text-white">{p.top3}</td>

                      {/* Tournaments */}
                      <td className="px-4 py-4 text-center text-muted-foreground">
                        {p.tournaments}
                      </td>

                      {/* Prize Money */}
                      <td className="px-4 py-4 text-right font-black text-gold">
                        {formatKz(p.prize)}
                      </td>

                      {/* Points */}
                      <td className="py-4 pl-4 pr-6 text-right">
                        <span className="rounded-lg bg-gold/10 px-2.5 py-1 text-xs font-black text-gold border border-gold/30">
                          {p.points.toLocaleString("pt-AO")} pts
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. EQUIPAS DA MODALIDADE & NOTÍCIAS                      */}
      {/* ======================================================== */}
      <section id="teams-section" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Teams Column */}
          <div className="lg:col-span-6">
            <h3 className="text-xl font-black text-white flex items-center gap-2 mb-6">
              <Shield className="size-5 text-gold" /> Equipas Federadas em {game.name}
            </h3>

            {gameTeams.length === 0 ? (
              <p className="text-xs text-muted-foreground">
                Ainda não existem organizações registadas nesta modalidade.
              </p>
            ) : (
              <div className="space-y-3">
                {gameTeams.map((team) => (
                  <Link
                    key={team.id}
                    to="/teams/$id"
                    params={{ id: team.id }}
                    className="nex-glass-card group flex items-center justify-between p-4 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-xl bg-white/[0.05] text-xs font-black text-white border border-white/10 group-hover:border-gold/50">
                        {team.tag}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-white group-hover:text-gold transition-colors">
                          {team.name}
                        </h4>
                        <p className="text-[10px] text-muted-foreground">
                          {team.city} &bull; {team.titles} Título(s) em Torneios
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="size-4 text-muted-foreground group-hover:text-white transition-colors" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Related News */}
          <div className="lg:col-span-6">
            <h3 className="text-xl font-black text-white flex items-center gap-2 mb-6">
              <Sparkles className="size-5 text-primary" /> Notícias & Comunidade
            </h3>

            <div className="space-y-3">
              {gameNews.slice(0, 3).map((n) => (
                <Link
                  key={n.slug}
                  to="/news/$slug"
                  params={{ slug: n.slug }}
                  className="nex-glass-card group block p-4 transition-all"
                >
                  <span className="text-[9px] font-black uppercase text-primary tracking-wider">
                    {n.category}
                  </span>
                  <h4 className="mt-1 text-sm font-bold text-white group-hover:text-gold transition-colors line-clamp-1">
                    {n.title}
                  </h4>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{n.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
