import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Flame, Trophy, Users, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import logo3D from "@/assets/logo-3d.jpg";
import logoImg from "@/assets/logo.png";
import { Layout } from "@/components/site/Layout";
import { DemoNotice, LinkButton, SectionTitle, StatusPill } from "@/components/site/ui-bits";
import { formatDate, formatKz, games, news, players, stats, tournaments } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Angola Gamers — A Comunidade Gamer de Angola" },
      {
        name: "description",
        content:
          "A Angola Gamers é a plataforma da comunidade gamer e esports de Angola. Descubra torneios, rankings, jogadores, equipas, notícias e eventos.",
      },
      { property: "og:title", content: "Angola Gamers — A Comunidade Gamer de Angola" },
      {
        property: "og:description",
        content: "Torneios, rankings, jogadores, equipas, notícias e eventos do gaming angolano.",
      },
    ],
  }),
});

function Home() {
  const [logoMode, setLogoMode] = useState<"original" | "render3d">("original");
  const featured = tournaments.filter((t) => t.status !== "FINISHED").slice(0, 4);
  const topPlayers = [...players].sort((a, b) => b.points - a.points).slice(0, 5);
  const latest = news.slice(0, 3);

  return (
    <Layout>
      <section className="relative overflow-hidden border-b border-border">
        <img
          src={heroImg}
          alt="Arena de esports com iluminação vermelha"
          width={1920}
          height={1080}
          className="absolute inset-0 size-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
                Level Up Angola
              </p>
              <h1 className="ag-heading max-w-2xl text-4xl leading-[1.05] sm:text-6xl lg:text-7xl">
                <span className="ag-gradient-text">The home of Angolan gaming</span>
              </h1>
              <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
                A comunidade gamer e esports de Angola. Torneios, rankings e eventos do gaming nacional.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/tournaments"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-transform hover:scale-[1.02]"
                >
                  Explorar torneios <ArrowRight className="size-4" />
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-surface/70 px-6 py-3 text-sm font-bold uppercase tracking-wider backdrop-blur transition-colors hover:border-gold/60 hover:text-gold"
                >
                  Juntar-me à comunidade
                </Link>
              </div>

              <dl className="mt-12 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  [`+${stats.players.toLocaleString("pt-AO")}`, "Jogadores"],
                  [`+${stats.tournaments}`, "Torneios"],
                  [`+${stats.teams}`, "Equipas"],
                  [`+${stats.games}`, "Jogos"],
                ].map(([value, label]) => (
                  <div key={label} className="ag-card bg-card/70 px-4 py-4 backdrop-blur">
                    <dt className="ag-heading text-2xl text-gold">{value}</dt>
                    <dd className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">{label}</dd>
                  </div>
                ))}
              </dl>
              <DemoNotice className="mt-4" />
            </div>

            <div className="relative hidden items-center justify-center lg:col-span-5 lg:flex">
              <div className="ag-logo-3d-float relative flex flex-col items-center">
                <div className="ag-logo-glow absolute -inset-4 rounded-3xl bg-gradient-to-tr from-gold/30 via-primary/20 to-gold/40 blur-2xl opacity-75" />
                <div className="relative flex flex-col items-center overflow-hidden rounded-3xl border border-gold/40 bg-gradient-to-b from-card/90 via-surface/95 to-background p-5 shadow-2xl backdrop-blur-xl">
                  {logoMode === "original" ? (
                    <div className="relative flex size-72 items-center justify-center p-4 sm:size-80 lg:size-96">
                      <div className="ag-aura-pulse pointer-events-none absolute size-52 rounded-full bg-gold/10 blur-3xl" />
                      <img
                        src={logoImg}
                        alt="Logótipo Oficial Angola Gamers"
                        className="ag-logo-extrude-3d ag-logo-neon-pulse relative max-h-full max-w-full object-contain transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  ) : (
                    <img
                      src={logo3D}
                      alt="Emblema 3D Angola Gamers"
                      width={480}
                      height={480}
                      className="size-72 rounded-2xl object-cover shadow-2xl sm:size-80 lg:size-96 transition-transform duration-500 hover:scale-[1.02]"
                    />
                  )}

                  <div className="mt-3 flex w-full items-center justify-between border-t border-border/80 px-2 pt-3">
                    <div className="flex items-center gap-1 rounded-full border border-border/80 bg-surface-2/60 p-0.5 text-[10px]">
                      <button
                        type="button"
                        onClick={() => setLogoMode("original")}
                        className={`rounded-full px-2.5 py-1 font-bold transition-colors ${
                          logoMode === "original"
                            ? "bg-gold text-gold-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        Logo Original 3D
                      </button>
                      <button
                        type="button"
                        onClick={() => setLogoMode("render3d")}
                        className={`flex items-center gap-1 rounded-full px-2.5 py-1 font-bold transition-colors ${
                          logoMode === "render3d"
                            ? "bg-gold text-gold-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Sparkles className="size-3" /> Render 3D
                      </button>
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-widest text-gold">
                      Level Up Angola
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionTitle
          title="Jogos em destaque"
          subtitle="Os títulos que movem a cena competitiva angolana."
          action={<LinkButton to="/games" variant="ghost">Ver todos</LinkButton>}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((g) => (
            <Link
              key={g.slug}
              to="/games/$slug"
              params={{ slug: g.slug }}
              className={`ag-card ag-card-hover group relative overflow-hidden p-6 ${g.featured ? "sm:col-span-2 lg:col-span-2" : ""}`}
            >
              <div className={`pointer-events-none absolute inset-0 bg-gradient-to-tr ${g.accent} to-transparent opacity-70`} />
              <div className="relative">
                <div className="flex items-start justify-between">
                  <span className="flex size-12 items-center justify-center rounded-lg border border-border bg-background/70 text-sm font-black">
                    {g.short}
                  </span>
                  {g.featured ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-gold px-2.5 py-0.5 text-[10px] font-black uppercase text-gold-foreground">
                      <Flame className="size-3" /> Destaque
                    </span>
                  ) : null}
                </div>
                <h3 className="ag-heading mt-5 text-xl">{g.name}</h3>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{g.genre}</p>
                {g.featured ? <p className="mt-3 max-w-md text-sm text-muted-foreground">{g.description}</p> : null}
                <div className="mt-5 flex items-center gap-5 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="size-3.5" /> {g.players} jogadores
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Trophy className="size-3.5" /> {g.tournaments} torneios
                  </span>
                </div>
                <span className="mt-5 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-primary">
                  Entrar no jogo <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <SectionTitle
            title="Torneios em destaque"
            subtitle="Competições a decorrer e inscrições abertas."
            action={<LinkButton to="/tournaments">Ver todos os torneios</LinkButton>}
          />
          <div className="grid gap-4 md:grid-cols-2">
            {featured.map((t) => (
              <Link
                key={t.id}
                to="/tournaments/$id"
                params={{ id: t.id }}
                className="ag-card ag-card-hover flex flex-col gap-4 p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-primary">
                      {games.find((g) => g.slug === t.game)?.name}
                    </p>
                    <h3 className="ag-heading mt-1 text-lg">{t.name}</h3>
                  </div>
                  <StatusPill status={t.status} />
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                  <div>
                    <p className="text-[11px] uppercase text-muted-foreground">Data</p>
                    <p className="font-semibold">{new Date(t.date).toLocaleDateString("pt-AO")}</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase text-muted-foreground">Hora</p>
                    <p className="font-semibold">{t.time}</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase text-muted-foreground">Prize pool</p>
                    <p className="font-semibold text-gold">{formatKz(t.prize)}</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase text-muted-foreground">Inscritos</p>
                    <p className="font-semibold">
                      {t.registered}/{t.slots}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <SectionTitle title="Top jogadores" subtitle="Ranking nacional combinado da temporada." action={<LinkButton to="/rankings" variant="ghost">Rankings</LinkButton>} />
          <div className="ag-card divide-y divide-border overflow-hidden">
            {topPlayers.map((p, i) => (
              <Link
                key={p.username}
                to="/players/$username"
                params={{ username: p.username }}
                className="flex items-center gap-4 px-4 py-3 transition-colors hover:bg-surface-2"
              >
                <span
                  className={`ag-heading w-6 text-center text-sm ${i === 0 ? "text-gold" : i < 3 ? "text-primary" : "text-muted-foreground"}`}
                >
                  {i + 1}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-bold">{p.username}</p>
                  <p className="text-xs text-muted-foreground">
                    {p.team ?? "Sem equipa"} · {games.find((g) => g.slug === p.game)?.name}
                  </p>
                </div>
                <span className="ag-heading text-sm text-gold">{p.points.toLocaleString("pt-AO")}</span>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <SectionTitle title="Últimas notícias" action={<LinkButton to="/news" variant="ghost">Todas</LinkButton>} />
          <div className="grid gap-4">
            {latest.map((n) => (
              <Link
                key={n.slug}
                to="/news/$slug"
                params={{ slug: n.slug }}
                className="ag-card ag-card-hover p-5"
              >
                <p className="text-[11px] font-bold uppercase tracking-widest text-primary">{n.category}</p>
                <h3 className="ag-heading mt-2 text-base leading-snug">{n.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{n.excerpt}</p>
                <p className="mt-3 text-xs text-muted-foreground">
                  {n.author} · {formatDate(n.date)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-gradient-to-br from-surface via-background to-background">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-16 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="ag-heading text-2xl sm:text-3xl">Angola Gamers Awards 2026</h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Celebrando os melhores talentos da comunidade gamer angolana. A votação está aberta a todos os membros
              registados.
            </p>
          </div>
          <LinkButton to="/awards" variant="gold">
            Votar agora
          </LinkButton>
        </div>
      </section>
    </Layout>
  );
}
