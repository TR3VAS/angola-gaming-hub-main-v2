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

  // Filtered Data for this specific game
  const gameTournaments = tournaments.filter((t) => t.game === game.slug);
  const activeTournaments = gameTournaments.filter((t) => t.status !== "FINISHED");
  const gameTeams = teams.filter((t) => t.games.includes(game.slug));
  const gameNews = news.filter(
    (n) => n.title.toLowerCase().includes(game.name.toLowerCase()) || n.category === "Competitivo",
  );

  const topPlayer = gamePlayers[0];
  const totalPrizeDisbursed = gameTournaments.reduce((acc, t) => acc + t.prize, 0);

  return (
    <Layout>
      {/* ======================================================== */}
      {/* 1. BREADCRUMB & HERO BANNER DA DIVISÃO                  */}
      {/* ======================================================== */}
      <section className="relative overflow-hidden border-b border-white/[0.08] bg-[#07090e] py-12 sm:py-16">
        {/* Accent Glow */}
        <div
          className={`pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-gradient-to-tr ${game.accent} to-transparent opacity-25 blur-3xl`}
        />
        <div className="pointer-events-none absolute inset-0 nex-dot-grid opacity-20" />

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

          <div className="grid items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex size-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-xl font-black text-white shadow-xl">
                  {game.short}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
                      {game.name} Angola
                    </h1>
                    {game.featured ? (
                      <span className="inline-flex items-center gap-1 rounded-full border border-gold/40 bg-gold/10 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-gold">
                        <Flame className="size-3" /> Tier 1
                      </span>
                    ) : null}
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mt-0.5">
                    Divisão Oficial · {game.genre}
                  </p>
                </div>
              </div>

              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {game.description} Todos os confrontos contam para a tabela nacional unificada da
                temporada 2026.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#tournaments-section"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-red-600 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg hover:scale-[1.02] transition-all"
                >
                  Ver Torneios Ativos <ArrowRight className="size-4" />
                </a>

                <a
                  href="#rankings-section"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white hover:border-gold/40 hover:bg-white/[0.08] transition-all"
                >
                  <Trophy className="size-4 text-gold" /> Tabela de Ranking
                </a>
              </div>
            </div>

            {/* Division KPI Overview Card */}
            <div className="lg:col-span-4">
              <div className="nex-glass-card p-6 border-white/10">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gold mb-4 flex items-center gap-1.5">
                  <Sparkles className="size-3.5" /> Estatísticas da Modalidade
                </p>

                <div className="space-y-3.5 text-xs">
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
                    <span className="text-muted-foreground">Jogadores Ativos</span>
                    <span className="font-bold text-white">{game.players} atletas</span>
                  </div>

                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
                    <span className="text-muted-foreground">Torneios Oficiais</span>
                    <span className="font-bold text-white">{game.tournaments} campeonatos</span>
                  </div>

                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
                    <span className="text-muted-foreground">Premiação Acumulada</span>
                    <span className="font-black text-gold">{formatKz(totalPrizeDisbursed)}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Líder Atual (#1)</span>
                    <span className="font-bold text-emerald-400">
                      {topPlayer ? `${topPlayer.username} (${topPlayer.points} pts)` : "Em disputa"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. TORNEIOS & COMPETIÇÕES DESTE JOGO                     */}
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
              Participa nos cash cups semanais e eventos classificatórios com chaves oficiais.
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
                          {new Date(t.date).toLocaleDateString("pt-AO")} · {t.time}
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
      {/* 3. TABELA OFICIAL DE RANKINGS DO JOGO (FINTECH ELO)     */}
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
      {/* 4. EQUIPAS DA MODALIDADE & NOTÍCIAS                      */}
      {/* ======================================================== */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
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
                          {team.city} · {team.titles} Título(s)
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
