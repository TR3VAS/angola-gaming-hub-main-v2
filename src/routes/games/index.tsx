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
  ArrowRight,
} from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { games, tournaments, formatKz, type Game } from "@/lib/mock-data";

export const Route = createFileRoute("/games/")({
  component: GamesIndex,
  head: () => ({
    meta: [
      { title: "Jogos & Modalidades Oficiais — Angola Gamers" },
      {
        name: "description",
        content:
          "Explora os 4 jogos competitivos com suporte oficial em Angola: Fortnite, Free Fire, FIFA (EA Sports FC) e Valorant. Rankings, estatísticas e torneios.",
      },
    ],
  }),
});

// Live ticker stats for the 4 official games
const LIVE_COUNTS = [
  { name: "Fortnite", count: "612", trend: "+12.0%", up: true },
  { name: "Free Fire", count: "540", trend: "+8.4%", up: true },
  { name: "EA Sports FC / FIFA", count: "388", trend: "-3.1%", up: false },
  { name: "Valorant", count: "480", trend: "+22.0%", up: true },
];

type SortKey = "POPULARIDADE" | "NOME" | "JOGADORES" | "TORNEIOS";
const SORT_OPTIONS: SortKey[] = ["POPULARIDADE", "NOME", "JOGADORES", "TORNEIOS"];

const GENRE_FILTERS = ["TODOS", "Battle Royale", "Desporto", "FPS"];

function sortGames(list: Game[], key: SortKey): Game[] {
  switch (key) {
    case "NOME":
      return [...list].sort((a, b) => a.name.localeCompare(b.name));
    case "JOGADORES":
      return [...list].sort((a, b) => b.players - a.players);
    case "TORNEIOS":
      return [...list].sort((a, b) => b.tournaments - a.tournaments);
    default:
      // Keep original order from screenshot if default popularity
      return list;
  }
}

// ─── Individual Tracker-style Game Cover Card ────────────────────────────────
function GameCoverCard({ game }: { game: Game }) {
  const [imgError, setImgError] = useState(false);
  const activeTournaments = tournaments.filter(
    (t) => t.game === game.slug && t.status !== "FINISHED",
  );

  return (
    <Link
      to="/games/$slug"
      params={{ slug: game.slug }}
      className="group relative flex flex-col cursor-pointer outline-none select-none"
    >
      {/* Cover Image Container */}
      <div
        className={`relative overflow-hidden rounded-xl aspect-[3/4] bg-[#121520] transition-all duration-200 group-hover:-translate-y-1 group-focus-visible:ring-2 group-focus-visible:ring-gold ${
          game.isNew
            ? "ring-1 ring-red-500/70 shadow-[0_0_15px_rgba(239,68,68,0.25)] group-hover:ring-red-400 group-hover:shadow-[0_0_24px_rgba(239,68,68,0.45)]"
            : "ring-1 ring-white/10 group-hover:ring-1 group-hover:ring-white/40 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.8)]"
        }`}
      >
        {game.coverUrl && !imgError ? (
          <img
            src={game.coverUrl}
            alt={game.name}
            onError={() => setImgError(true)}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center p-3 text-center bg-gradient-to-br ${game.accent} to-slate-950`}
          >
            <span className="font-black text-white text-base tracking-tight leading-tight uppercase">
              {game.name}
            </span>
            <span className="mt-1 text-[10px] text-muted-foreground uppercase">{game.genre}</span>
          </div>
        )}

        {/* Top-right "NEW!" Badge */}
        {game.isNew && (
          <div className="absolute top-2 right-2 z-10">
            <span className="rounded-[4px] bg-[#e11d48] px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-white shadow-md">
              NEW!
            </span>
          </div>
        )}

        {/* Active tournament indicator */}
        {activeTournaments.length > 0 && (
          <div className="absolute bottom-2 left-2 right-2 z-10">
            <div className="flex items-center gap-1.5 rounded-md bg-black/80 px-2 py-0.5 backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-primary animate-pulse" />
              <span className="truncate text-[9px] font-bold uppercase text-primary">
                {activeTournaments.length} torneio(s)
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Game Name below Card */}
      <div className="mt-2.5 px-0.5">
        <h3 className="truncate text-sm font-semibold text-white/95 transition-colors group-hover:text-white">
          {game.name}
        </h3>
        <p className="mt-0.5 truncate text-[11px] text-neutral-400">{game.genre}</p>
      </div>
    </Link>
  );
}

// ─── Main Games Index Component ──────────────────────────────────────────────
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
      return g.genre.toLowerCase().includes(selectedGenre.toLowerCase());
    });

    return sortGames(byGenre, sortKey);
  }, [search, selectedGenre, sortKey]);

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

      {/* ── Header Bar: ALL GAMES & Sort by Popularity ── */}
      <div className="border-b border-white/[0.07] bg-[#07090e]">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Title & Dropdown like screenshot */}
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-black uppercase tracking-wide text-white sm:text-3xl">
                ALL GAMES
              </h1>

              {/* Sort by dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowSortMenu((v) => !v)}
                  className="flex items-center gap-1 text-sm font-semibold text-neutral-300 hover:text-white transition cursor-pointer"
                >
                  <span>
                    Sort by{" "}
                    {sortKey === "POPULARIDADE"
                      ? "Popularity"
                      : sortKey.charAt(0) + sortKey.slice(1).toLowerCase()}
                  </span>
                  <ChevronDown
                    className={`size-3.5 transition-transform ${showSortMenu ? "rotate-180" : ""}`}
                  />
                </button>

                {showSortMenu && (
                  <div className="absolute left-0 top-full mt-2 z-50 w-44 rounded-xl border border-white/10 bg-[#0f1120] shadow-2xl overflow-hidden py-1">
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setSortKey(opt);
                          setShowSortMenu(false);
                        }}
                        className={`w-full px-4 py-2 text-left text-xs font-semibold transition cursor-pointer ${
                          sortKey === opt
                            ? "bg-gold/10 text-gold"
                            : "text-neutral-300 hover:bg-white/[0.05] hover:text-white"
                        }`}
                      >
                        {opt === "POPULARIDADE" ? "Popularity" : opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Filter buttons & Search */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex flex-wrap items-center gap-1">
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

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Pesquisar jogo..."
                  className="w-40 rounded-lg border border-white/10 bg-white/[0.04] py-1.5 pl-8 pr-3 text-[11px] text-foreground placeholder:text-muted-foreground/60 outline-none transition focus:border-gold/50 focus:bg-white/[0.07] sm:w-48"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Games Grid ── */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
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
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 max-w-5xl mx-auto">
            {filteredGames.map((game) => (
              <GameCoverCard key={game.slug} game={game} />
            ))}
          </div>
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
