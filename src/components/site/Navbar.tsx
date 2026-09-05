import { useMemo, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Search, X, LogOut, LayoutDashboard, User as UserIcon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { creators, events, news, players, teams, tournaments } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import logoImg from "@/assets/logo.png";

const menu = [
  { label: "Início", to: "/" },
  { label: "Jogos", to: "/games" },
  { label: "Torneios", to: "/tournaments" },
  { label: "Rankings", to: "/rankings" },
  { label: "Jogadores", to: "/players" },
  { label: "Equipas", to: "/teams" },
  { label: "Notícias", to: "/news" },
  { label: "Eventos", to: "/events" },
  { label: "Criadores", to: "/creators" },
  { label: "Awards", to: "/awards" },
];

type Result = { group: string; label: string; sub: string; to: string; params?: Record<string, string> };

function search(term: string): Result[] {
  const q = term.trim().toLowerCase();
  if (q.length < 2) return [];
  const res: Result[] = [];
  players
    .filter((p) => p.username.toLowerCase().includes(q) || p.name.toLowerCase().includes(q))
    .slice(0, 4)
    .forEach((p) => res.push({ group: "Jogadores", label: p.username, sub: p.name, to: "/players/$username", params: { username: p.username } }));
  teams
    .filter((t) => t.name.toLowerCase().includes(q))
    .slice(0, 3)
    .forEach((t) => res.push({ group: "Equipas", label: t.name, sub: t.city, to: "/teams/$id", params: { id: t.id } }));
  tournaments
    .filter((t) => t.name.toLowerCase().includes(q))
    .slice(0, 3)
    .forEach((t) => res.push({ group: "Torneios", label: t.name, sub: t.status, to: "/tournaments/$id", params: { id: t.id } }));
  news
    .filter((n) => n.title.toLowerCase().includes(q))
    .slice(0, 3)
    .forEach((n) => res.push({ group: "Notícias", label: n.title, sub: n.category, to: "/news/$slug", params: { slug: n.slug } }));
  events
    .filter((e) => e.title.toLowerCase().includes(q))
    .slice(0, 2)
    .forEach((e) => res.push({ group: "Eventos", label: e.title, sub: e.city, to: "/events" }));
  creators
    .filter((c) => c.username.toLowerCase().includes(q) || c.name.toLowerCase().includes(q))
    .slice(0, 3)
    .forEach((c) => res.push({ group: "Criadores", label: c.username, sub: c.platform, to: "/creators/$id", params: { id: c.id } }));
  return res;
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [term, setTerm] = useState("");
  const { user, profile, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const results = useMemo(() => search(term), [term]);

  const grouped = results.reduce<Record<string, Result[]>>((acc, r) => {
    (acc[r.group] ||= []).push(r);
    return acc;
  }, {});

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-lg">
      <div className="mx-auto flex h-24 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link to="/" className="group flex shrink-0 items-center gap-3.5">
          <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            {/* Animated very soft ambient halo behind the logo */}
            <div className="ag-aura-pulse pointer-events-none absolute size-20 rounded-full bg-gold/10 blur-2xl" />
            <img
              src={logoImg}
              alt="Angola Gamers"
              className="ag-logo-neon-pulse relative h-[72px] sm:h-[84px] w-auto object-contain"
            />
          </div>
          <span className="ag-heading hidden text-lg leading-tight sm:block">
            ANGOLA
            <span className="block text-[12px] tracking-[0.35em] text-gold font-bold">GAMERS</span>
          </span>
        </Link>

        <nav className="hidden flex-1 items-center gap-1 xl:flex">
          {menu.map((m) => (
            <Link
              key={m.to}
              to={m.to}
              className="rounded px-2.5 py-2 text-[13px] font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground [&.active]:text-primary"
            >
              {m.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button
            aria-label="Pesquisar"
            onClick={() => setSearchOpen((v) => !v)}
            className="rounded-md border border-border bg-surface p-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Search className="size-4" />
          </button>

          {user ? (
            <div className="hidden items-center gap-2 sm:flex">
              <Link
                to="/profile"
                className="flex items-center gap-2 rounded-md border border-border bg-surface px-2.5 py-1.5 text-xs font-semibold hover:border-primary/60"
              >
                <span className="flex size-6 items-center justify-center rounded-full bg-primary/20 text-[10px] font-bold text-primary">
                  {(profile?.username ?? "AG").slice(0, 2).toUpperCase()}
                </span>
                {profile?.username ?? "perfil"}
              </Link>
              <Link
                to="/dashboard"
                className="rounded-md p-2 text-muted-foreground hover:text-foreground"
                aria-label="Dashboard"
              >
                <LayoutDashboard className="size-4" />
              </Link>
              {isAdmin ? (
                <Link
                  to="/admin"
                  className="rounded-md border border-gold/50 px-2.5 py-1.5 text-[11px] font-bold uppercase text-gold"
                >
                  Admin
                </Link>
              ) : null}
              <button
                onClick={async () => {
                  await signOut();
                  navigate({ to: "/" });
                }}
                aria-label="Sair"
                className="rounded-md p-2 text-muted-foreground hover:text-primary"
              >
                <LogOut className="size-4" />
              </button>
            </div>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Link
                to="/login"
                className="rounded-md px-3 py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground"
              >
                Entrar
              </Link>
              <Link
                to="/register"
                className="rounded-md bg-primary px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Criar conta
              </Link>
            </div>
          )}

          <button
            className="rounded-md border border-border bg-surface p-2 xl:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {searchOpen ? (
        <div className="border-t border-border bg-surface">
          <div className="mx-auto max-w-3xl px-4 py-4">
            <input
              autoFocus
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Pesquisar jogadores, equipas, torneios, notícias..."
              className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
            />
            {term.trim().length >= 2 ? (
              <div className="mt-3 max-h-80 overflow-y-auto rounded-md border border-border bg-card">
                {results.length === 0 ? (
                  <p className="px-4 py-6 text-center text-sm text-muted-foreground">Nenhum resultado encontrado.</p>
                ) : (
                  Object.entries(grouped).map(([group, items]) => (
                    <div key={group} className="border-b border-border last:border-0">
                      <p className="px-4 pt-3 text-[11px] font-bold uppercase tracking-widest text-primary">{group}</p>
                      {items.map((r, i) => (
                        <button
                          key={group + i}
                          onClick={() => {
                            setSearchOpen(false);
                            setTerm("");
                            navigate({ to: r.to, params: r.params as never });
                          }}
                          className="block w-full px-4 py-2.5 text-left hover:bg-surface-2"
                        >
                          <span className="text-sm font-semibold">{r.label}</span>
                          <span className="ml-2 text-xs text-muted-foreground">{r.sub}</span>
                        </button>
                      ))}
                    </div>
                  ))
                )}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      {open ? (
        <div className="border-t border-border bg-surface xl:hidden">
          <nav className="mx-auto grid max-w-7xl gap-1 px-4 py-4">
            {menu.map((m) => (
              <Link
                key={m.to}
                to={m.to}
                onClick={() => setOpen(false)}
                className="rounded px-3 py-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground hover:bg-surface-2 hover:text-foreground"
              >
                {m.label}
              </Link>
            ))}
            <div className="mt-3 grid gap-2 border-t border-border pt-3">
              {user ? (
                <>
                  <Link to="/dashboard" onClick={() => setOpen(false)} className="rounded bg-surface-2 px-3 py-2 text-sm font-semibold">
                    <LayoutDashboard className="mr-2 inline size-4" /> Dashboard
                  </Link>
                  <Link to="/profile" onClick={() => setOpen(false)} className="rounded bg-surface-2 px-3 py-2 text-sm font-semibold">
                    <UserIcon className="mr-2 inline size-4" /> Perfil
                  </Link>
                  {isAdmin ? (
                    <Link to="/admin" onClick={() => setOpen(false)} className="rounded bg-surface-2 px-3 py-2 text-sm font-semibold text-gold">
                      Admin
                    </Link>
                  ) : null}
                  <button
                    onClick={async () => {
                      setOpen(false);
                      await signOut();
                      navigate({ to: "/" });
                    }}
                    className="rounded bg-surface-2 px-3 py-2 text-left text-sm font-semibold text-primary"
                  >
                    Sair
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setOpen(false)} className="rounded border border-border px-3 py-2 text-center text-sm font-bold uppercase">
                    Entrar
                  </Link>
                  <Link to="/register" onClick={() => setOpen(false)} className="rounded bg-primary px-3 py-2 text-center text-sm font-bold uppercase text-primary-foreground">
                    Criar conta
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

export const navClass = cn;
