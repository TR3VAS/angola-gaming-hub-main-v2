import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Search,
  ChevronDown,
  Users,
  TrendingUp,
  TrendingDown,
  Flame,
  Trophy,
  Zap,
  Star,
  ArrowRight,
} from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { games, players, tournaments, formatKz, type Game } from "@/lib/mock-data";

export const Route = createFileRoute("/games/")({
  component: GamesIndex,
  head: () => ({
    meta: [
      { title: "Jogos & Modalidades Oficiais — Angola Gamers" },
      {
        name: "description",
        content:
          "Explora todos os jogos competitivos com suporte oficial em Angola: Fortnite, EA Sports FC, Free Fire, Call of Duty, Valorant e PUBG. Rankings, torneios e premiações em Kz.",
      },
    ],
  }),
});

// ─── Game cover visuals per slug ─────────────────────────────────────────────
const GAME_COVERS: Record<string, { gradient: string; label: string }> = {
  fortnite: {
    gradient: "from-sky-500 via-blue-600 to-indigo-900",
    label: "FORTNITE",
  },
  "ea-sports-fc": {
    gradient: "from-emerald-400 via-green-600 to-emerald-900",
    label: "EA SPORTS FC",
  },
  "free-fire": {
    gradient: "from-orange-500 via-red-600 to-rose-900",
    label: "FREE FIRE",
  },
  "call-of-duty": {
    gradient: "from-amber-400 via-yellow-600 to-amber-900",
    label: "CALL OF DUTY",
  },
  valorant: {
    gradient: "from-rose-400 via-red-600 to-red-900",
    label: "VALORANT",
  },
  pubg: {
    gradient: "from-slate-400 via-sky-700 to-slate-900",
    label: "PUBG",
  },
};

// ─── Live ticker data ─────────────────────────────────────────────────────────
const LIVE_COUNTS = [
  { name: "Fortnite", count: "612", trend: "+12.0%", up: true },
  { name: "Free Fire", count: "540", trend: "+8.4%", up: true },
  { name: "EA Sports FC", count: "388", trend: "-3.1%", up: false },
  { name: "Call of Duty", count: "275", trend: "+14.0%", up: true },
  { name: "Valorant", count: "164", trend: "+22.0%", up: true },
  { name: "PUBG", count: "121", trend: "-2.0%", up: false },
];

type SortKey = "POPULARIDADE" | "NOME" | "JOGADORES" | "TORNEIOS";
const SORT_OPTIONS: SortKey[] = ["POPULARIDADE", "NOME", "JOGADORES", "TORNEIOS"];

const GENRE_FILTERS = ["TODOS", "Battle Royale", "FPS", "Desporto", "Mobile"];

const NEW_GAMES = new Set<string>(["valorant"]);
const FEATURED_GAMES = new Set<string>(["fortnite"]);

function sortGames(list: Game[], key: SortKey): Game[] {
  switch (key) {
    case "NOME":
      return [...list].sort((a, b) => a.name.localeCompare(b.name));
    case "JOGADORES":
      return [...list].sort((a, b) => b.players - a.players);
    case "TORNEIOS":
      return [...list].sort((a, b) => b.tournaments - a.tournaments);
    default:
      return [...list].sort(
        (a, b) =>
          b.players * 2 + b.tournaments * 10 - (a.players * 2 + a.tournaments * 10),
      );
  }
}

// ─── Individual cover card component ─────────────────────────────────────────
function GameCoverCard({ game, rank }: { game: Game; rank: number }) {
  const cover = GAME_COVERS[game.slug] ?? {
    gradient: "from-slate-700 to-slate-900",
    label: game.name.toUpperCase(),
  };
  const activeTournaments = tournaments.filter(
    (t) => t.game === game.slug && t.status !== "FINISHED",
  );
  const isNew = NEW_GAMES.has(game.slug);
  const isFeatured = FEATURED_GAMES.has(game.slug);

  return (
    <Link
      to="/games/$slug"
      params={{ slug: game.slug }}
      className="group relative flex flex-col cursor-pointer outline-none"
    >
      {/* Cover */}
      <div className="relative overflow-hidden rounded-xl aspect-[3/4] bg-slate-900 ring-1 ring-white/10 transition-all duration-300 group-hover:ring-2 group-hover:ring-gold/60 group-hover:shadow-[0_0_24px_rgba(234,179,8,0.22)] group-focus-visible:ring-2 group-focus-visible:ring-gold/60">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${cover.gradient} opacity-90 transition-opacity duration-300 group-hover:opacity-100`}
        />

        {/* Game name label */}
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <span
            className="text-center font-black text-white drop-shadow-lg leading-tight tracking-tight"
            style={{
              fontSize: "clamp(0.875rem, 2.5vw, 1.5rem)",
              textShadow: "0 2px 16px rgba(0,0,0,0.7)",
            }}
          >
            {cover.label}
          </span>
        </div>

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />

        {/* Top-right badges */}
        <div className="absolute top-2 right-2 flex flex-col items-end gap-1">
          {isNew && (
            <span className="rounded-sm bg-red-600 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-widest text-white shadow">
              NOVO!
            </span>
          )}
          {isFeatured && (
            <span className="flex items-center gap-1 rounded-sm bg-gold px-1.5 py-0.5 text-[9px] font-black uppercase tracking-widest text-slate-950 shadow">
              <Flame className="size-2.5" />
              TOP
            </span>
          )}
        </div>

        {/* Rank badge */}
        <div className="absolute top-2 left-2">
          <span className="flex size-6 items-center justify-center rounded-full bg-black/60 text-[10px] font-black text-white backdrop-blur-sm">
            {rank}
          </span>
        </div>

        {/* Live tournament strip */}
        {activeTournaments.length > 0 && (
          <div className="absolute bottom-2 left-2 right-2">
            <div className="flex items-center gap-1.5 rounded-lg bg-black/70 px-2 py-1 backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-primary animate-pulse" />
              <span className="truncate text-[9px] font-bold uppercase tracking-wider text-primary">
                {activeTournaments.length} ativo(s)
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Info below cover */}
      <div className="mt-3 px-0.5">
        <h3 className="truncate text-sm font-bold text-white transition-colors group-hover:text-gold">
          {game.name}
        </h3>
        <p className="mt-0.5 text-[11px] text-muted-foreground">{game.genre}</p>

        <div className="mt-2 flex items-center gap-3">
          <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <Users className="size-3" />
            <span className="font-semibold text-white">{game.players}</span> atletas
          </span>
          <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <Trophy className="size-3" />
            <span className="font-semibold text-white">{game.tournaments}</span>
          </span>
        </div>

        {activeTournaments.length > 0 && activeTournaments[0] && (
          <div className="mt-1.5 flex items-center gap-1">
            <Zap className="size-3 text-gold" />
            <span className="text-[10px] font-bold text-gold">
              {formatKz(activeTournaments[0].prize)} em disputa
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}

// ─── Page component ───────────────────────────────────────────────────────────
function GamesIndex() {
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("TODOS");
  const [sortKey, setSortKey] = useState<SortKey>("POPULARIDADE");
  const [showSortMenu, setShowSortMenu] = useState(false);

  const filteredGames = useMemo(() => {
    const bySearch = games.filter((g) => {
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        g.name.toLowerCase().includes(q) ||
        g.genre.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q)
      );
    });

    const byGenre = bySearch.filter((g) => {
      if (selectedGenre === "TODOS") return true;
      if (selectedGenre === "Mobile") return g.genre.toLowerCase().includes("mobile");
      if (selectedGenre === "FPS")
        return (
          g.genre.toLowerCase().includes("fps") &&
          !g.genre.toLowerCase().includes("mobile")
        );
      if (selectedGenre === "Battle Royale")
        return (
          g.genre.toLowerCase().includes("battle royale") &&
          !g.genre.toLowerCase().includes("mobile")
        );
      return g.genre.toLowerCase().includes(selectedGenre.toLowerCase());
    });

    return sortGames(byGenre, sortKey);
  }, [search, selectedGenre, sortKey]);

  const featured = filteredGames.filter((g) => FEATURED_GAMES.has(g.slug));
  const rest = filteredGames.filter((g) => !FEATURED_GAMES.has(g.slug));

  return (
    <Layout>
      {/* ── Live player count ticker ── */}
      <div className="border-b border-white/[0.07] bg-[#0a0c14]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-2.5 sm:px-6">
          <div className="flex shrink-0 items-center gap-2 mr-5">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-muted-foreground whitespace-nowrap">
              Jogadores Últimos 30 Dias
            </span>
          </div>
          <div className="flex items-center gap-6">
            {LIVE_COUNTS.map((entry) => (
              <div key={entry.name} className="flex shrink-0 items-center gap-2">
                <span className="text-[11px] font-bold text-white whitespace-nowrap">
                  {entry.name}
                </span>
                <span className="text-sm font-black text-white">{entry.count}</span>
                <span
                  className={`flex items-center gap-0.5 text-[10px] font-bold ${entry.up ? "text-emerald-400" : "text-red-400"}`}
                >
                  {entry.up ? (
                    <TrendingUp className="size-3" />
                  ) : (
                    <TrendingDown className="size-3" />
                  )}
                  {entry.trend}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Filter & search bar ── */}
      <div className="sticky top-16 z-40 border-b border-white/[0.07] bg-[#07090e]/95 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-3 py-3">
            <div className="flex items-baseline gap-2 mr-2 shrink-0">
              <h1 className="text-sm font-black uppercase tracking-widest text-white">
                TODOS OS JOGOS
              </h1>
              <span className="text-xs text-muted-foreground">({filteredGames.length})</span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 flex-1">
              {GENRE_FILTERS.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                    selectedGenre === genre
                      ? "bg-white text-slate-950"
                      : "border border-white/10 bg-white/[0.03] text-muted-foreground hover:border-white/25 hover:text-white"
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Pesquisar jogo..."
                  className="w-44 rounded-lg border border-white/10 bg-white/[0.04] py-1.5 pl-8 pr-3 text-[11px] text-foreground placeholder:text-muted-foreground/60 outline-none transition focus:border-gold/50 focus:bg-white/[0.07] sm:w-52"
                />
              </div>

              <div className="relative">
                <button
                  onClick={() => setShowSortMenu((v) => !v)}
                  className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-bold text-muted-foreground transition hover:border-white/20 hover:text-white cursor-pointer whitespace-nowrap"
                >
                  Ordenar por {sortKey.charAt(0) + sortKey.slice(1).toLowerCase()}
                  <ChevronDown
                    className={`size-3 transition-transform ${showSortMenu ? "rotate-180" : ""}`}
                  />
                </button>
                {showSortMenu && (
                  <div className="absolute right-0 top-full mt-1 z-50 w-48 rounded-xl border border-white/10 bg-[#0f1120] shadow-xl overflow-hidden">
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setSortKey(opt);
                          setShowSortMenu(false);
                        }}
                        className={`w-full px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider transition cursor-pointer ${
                          sortKey === opt
                            ? "bg-gold/10 text-gold"
                            : "text-muted-foreground hover:bg-white/[0.04] hover:text-white"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Games section ── */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        {filteredGames.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Search className="size-12 text-muted-foreground/30 mb-4" />
            <p className="text-base font-bold text-white">Nenhum jogo encontrado</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Tenta ajustar o termo de pesquisa ou selecionar outro género.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedGenre("TODOS");
              }}
              className="mt-4 rounded-lg border border-white/10 px-4 py-2 text-xs font-bold text-muted-foreground transition hover:border-gold/30 hover:text-gold cursor-pointer"
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <>
            {/* Featured hero card */}
            {featured.map((game) => {
              const cover = GAME_COVERS[game.slug] ?? {
                gradient: "from-slate-700 to-slate-900",
                label: game.name.toUpperCase(),
              };
              const activeTournaments = tournaments.filter(
                (t) => t.game === game.slug && t.status !== "FINISHED",
              );
              const topPlayer = players.filter((p) => p.game === game.slug)[0];

              return (
                <Link
                  key={game.slug}
                  to="/games/$slug"
                  params={{ slug: game.slug }}
                  className="group relative mb-8 flex min-h-[200px] overflow-hidden rounded-2xl ring-1 ring-white/10 transition-all duration-300 hover:ring-2 hover:ring-gold/50 hover:shadow-[0_0_40px_rgba(234,179,8,0.15)] cursor-pointer outline-none sm:min-h-[240px]"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${cover.gradient} opacity-80`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

                  <div className="relative z-10 flex flex-col justify-between p-6 sm:p-8 md:p-10 w-full md:w-3/5">
                    <div>
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span className="flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-gold">
                          <Flame className="size-3.5 animate-pulse" />
                          Jogo em Destaque
                        </span>
                        <span className="rounded-full bg-primary/20 border border-primary/40 px-2.5 py-0.5 text-[10px] font-bold uppercase text-primary">
                          Oficial
                        </span>
                      </div>
                      <h2 className="text-3xl font-black text-white drop-shadow-lg sm:text-4xl lg:text-5xl">
                        {cover.label}
                      </h2>
                      <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/70">
                        {game.description}
                      </p>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Users className="size-4 text-gold" />
                        <div>
                          <p className="text-[10px] uppercase text-white/60">Atletas</p>
                          <p className="text-sm font-black text-white">{game.players}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy className="size-4 text-gold" />
                        <div>
                          <p className="text-[10px] uppercase text-white/60">Torneios</p>
                          <p className="text-sm font-black text-white">{game.tournaments}</p>
                        </div>
                      </div>
                      {topPlayer && (
                        <div className="flex items-center gap-2">
                          <Star className="size-4 text-gold" />
                          <div>
                            <p className="text-[10px] uppercase text-white/60">Top 1</p>
                            <p className="text-sm font-black text-white">{topPlayer.username}</p>
                          </div>
                        </div>
                      )}
                      {activeTournaments.length > 0 && activeTournaments[0] && (
                        <div className="flex items-center gap-1.5 rounded-lg border border-primary/20 bg-primary/10 px-3 py-1.5">
                          <span className="size-1.5 rounded-full bg-primary animate-ping" />
                          <span className="text-[10px] font-black uppercase text-primary">
                            {activeTournaments.length} ativo(s) &bull;{" "}
                            {formatKz(activeTournaments[0].prize)}
                          </span>
                        </div>
                      )}
                      <span className="ml-auto flex items-center gap-1.5 rounded-xl bg-gold px-4 py-2 text-xs font-black text-slate-950 transition group-hover:bg-yellow-400">
                        Ver Divisão <ArrowRight className="size-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}

            {/* Grid of remaining games */}
            {rest.length > 0 && (
              <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {rest.map((game, i) => (
                  <GameCoverCard
                    key={game.slug}
                    game={game}
                    rank={i + 1 + featured.length}
                  />
                ))}
              </div>
            )}

            {/* If featured is filtered out, show all in grid */}
            {featured.length === 0 && filteredGames.length > 0 && (
              <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {filteredGames.map((game, i) => (
                  <GameCoverCard key={game.slug} game={game} rank={i + 1} />
                ))}
              </div>
            )}
          </>
        )}
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-white/[0.07] bg-[#090b12] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-8 sm:p-10 md:flex-row md:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-primary">
                Comunidade Competitiva
              </span>
              <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl">
                O teu jogo favorito ainda não tem liga oficial?
              </h2>
              <p className="mt-2 max-w-xl text-xs leading-relaxed text-muted-foreground sm:text-sm">
                A Angola Gamers expande as suas modalidades com base na adesão e propostas da
                comunidade. Junta a tua equipa no Discord e participa nas enquetes de novos títulos.
              </p>
            </div>
            <a
              href="https://discord.gg"
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-gold/30 bg-gradient-to-r from-amber-500 to-gold px-6 py-3 text-xs font-black uppercase tracking-wider text-slate-950 shadow-[0_0_20px_rgba(234,179,8,0.25)] transition hover:scale-105"
            >
              Propor Nova Modalidade <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
