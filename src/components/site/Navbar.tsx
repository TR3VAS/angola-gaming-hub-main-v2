import { useMemo, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Menu,
  Search,
  X,
  LogOut,
  LayoutDashboard,
  User as UserIcon,
  Shield,
  Sparkles,
} from "lucide-react";
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

type Result = {
  group: string;
  label: string;
  sub: string;
  to: string;
  params?: Record<string, string>;
};

function search(term: string): Result[] {
  const q = term.trim().toLowerCase();
  if (q.length < 2) return [];
  const res: Result[] = [];
  players
    .filter((p) => p.username.toLowerCase().includes(q) || p.name.toLowerCase().includes(q))
    .slice(0, 4)
    .forEach((p) =>
      res.push({
        group: "Jogadores",
        label: p.username,
        sub: p.name,
        to: "/players/$username",
        params: { username: p.username },
      }),
    );
  teams
    .filter((t) => t.name.toLowerCase().includes(q))
    .slice(0, 3)
    .forEach((t) =>
      res.push({
        group: "Equipas",
        label: t.name,
        sub: t.city,
        to: "/teams/$id",
        params: { id: t.id },
      }),
    );
  tournaments
    .filter((t) => t.name.toLowerCase().includes(q))
    .slice(0, 3)
    .forEach((t) =>
      res.push({
        group: "Torneios",
        label: t.name,
        sub: t.status,
        to: "/tournaments/$id",
        params: { id: t.id },
      }),
    );
  news
    .filter((n) => n.title.toLowerCase().includes(q))
    .slice(0, 3)
    .forEach((n) =>
      res.push({
        group: "Notícias",
        label: n.title,
        sub: n.category,
        to: "/news/$slug",
        params: { slug: n.slug },
      }),
    );
  events
    .filter((e) => e.title.toLowerCase().includes(q))
    .slice(0, 2)
    .forEach((e) => res.push({ group: "Eventos", label: e.title, sub: e.city, to: "/events" }));
  creators
    .filter((c) => c.username.toLowerCase().includes(q) || c.name.toLowerCase().includes(q))
    .slice(0, 3)
    .forEach((c) =>
      res.push({
        group: "Criadores",
        label: c.username,
        sub: c.platform,
        to: "/creators/$id",
        params: { id: c.id },
      }),
    );
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
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#07090e]/85 backdrop-blur-2xl transition-all">
      <div className="mx-auto flex h-20 max-w-7xl items-center gap-4 px-4 sm:px-6">
        {/* Brand & Logo */}
        <Link to="/" className="group flex shrink-0 items-center gap-3">
          <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <div className="ag-aura-pulse pointer-events-none absolute size-14 rounded-full bg-gold/15 blur-xl" />
            <img
              src={logoImg}
              alt="Angola Gamers"
              className="ag-logo-neon-pulse relative h-12 w-auto object-contain sm:h-14"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-base font-extrabold tracking-tight text-white sm:text-lg">
                ANGOLA<span className="text-gold">GAMERS</span>
              </span>
              <span className="hidden rounded-full border border-gold/40 bg-gold/10 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-widest text-gold md:inline-block">
                HUB
              </span>
            </div>
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
              Level Up Angola
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden flex-1 items-center justify-center gap-1 xl:flex">
          {menu.map((m) => (
            <Link
              key={m.to}
              to={m.to}
              className="rounded-lg px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-all duration-200 hover:bg-white/[0.04] hover:text-white [&.active]:bg-primary/10 [&.active]:text-primary [&.active]:border [&.active]:border-primary/20"
            >
              {m.label}
            </Link>
          ))}
        </nav>

        {/* Search & Actions */}
        <div className="ml-auto flex items-center gap-2.5">
          {/* Quick Search Button (Fintech Style) */}
          <button
            aria-label="Pesquisar"
            onClick={() => setSearchOpen((v) => !v)}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium text-muted-foreground transition-all duration-200 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
          >
            <Search className="size-3.5 text-gold" />
            <span className="hidden sm:inline">Pesquisar...</span>
            <kbd className="hidden rounded border border-white/10 bg-white/[0.05] px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground lg:inline-block">
              ⌘K
            </kbd>
          </button>

          {user ? (
            <div className="hidden items-center gap-2 sm:flex">
              <Link
                to="/profile"
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-gold/40"
              >
                <span className="flex size-5 items-center justify-center rounded-full bg-gradient-to-tr from-primary to-gold text-[10px] font-black text-slate-950">
                  {(profile?.username ?? "AG").slice(0, 2).toUpperCase()}
                </span>
                <span>{profile?.username ?? "perfil"}</span>
              </Link>
              <Link
                to="/dashboard"
                className="rounded-xl border border-white/10 bg-white/[0.03] p-2 text-muted-foreground transition-colors hover:border-white/20 hover:text-white"
                aria-label="Dashboard"
              >
                <LayoutDashboard className="size-4" />
              </Link>
              {isAdmin ? (
                <Link
                  to="/admin"
                  className="inline-flex items-center gap-1 rounded-xl border border-gold/40 bg-gold/10 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gold shadow-[0_0_12px_rgba(234,179,8,0.2)]"
                >
                  <Shield className="size-3" /> Admin
                </Link>
              ) : null}
              <button
                onClick={async () => {
                  await signOut();
                  navigate({ to: "/" });
                }}
                aria-label="Sair"
                className="rounded-xl border border-white/10 bg-white/[0.03] p-2 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <LogOut className="size-4" />
              </button>
            </div>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Link
                to="/login"
                className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground transition-all duration-200 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
              >
                Entrar
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center gap-1.5 rounded-xl border border-primary/30 bg-gradient-to-r from-primary via-red-600 to-primary px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(239,68,68,0.35)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(239,68,68,0.5)]"
              >
                <Sparkles className="size-3.5 text-gold" />
                Criar conta
              </Link>
            </div>
          )}

          {/* Mobile menu hamburger */}
          <button
            className="rounded-xl border border-white/10 bg-white/[0.03] p-2 text-muted-foreground transition-colors hover:border-white/20 hover:text-white xl:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* Global Interactive Search Modal Drawer */}
      {searchOpen ? (
        <div className="border-t border-white/10 bg-[#0a0d16]/95 backdrop-blur-2xl shadow-2xl transition-all">
          <div className="mx-auto max-w-3xl px-4 py-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                autoFocus
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Pesquisar por jogadores, equipas, torneios, notícias ou eventos..."
                className="w-full rounded-2xl border border-white/15 bg-white/[0.04] py-3.5 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-gold/60 focus:bg-white/[0.07] focus:ring-1 focus:ring-gold/40"
              />
            </div>
            {term.trim().length >= 2 ? (
              <div className="mt-3 max-h-80 overflow-y-auto rounded-2xl border border-white/10 bg-[#0d101b] p-2 shadow-2xl">
                {results.length === 0 ? (
                  <p className="px-4 py-6 text-center text-sm text-muted-foreground">
                    Nenhum resultado encontrado para "{term}".
                  </p>
                ) : (
                  Object.entries(grouped).map(([group, items]) => (
                    <div key={group} className="mb-2 last:mb-0">
                      <p className="px-3 pt-2 text-[10px] font-black uppercase tracking-[0.2em] text-gold">
                        {group}
                      </p>
                      <div className="mt-1 space-y-0.5">
                        {items.map((r, i) => (
                          <button
                            key={group + i}
                            onClick={() => {
                              setSearchOpen(false);
                              setTerm("");
                              navigate({ to: r.to, params: r.params as never });
                            }}
                            className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition-colors hover:bg-white/[0.06]"
                          >
                            <span className="font-semibold text-foreground">{r.label}</span>
                            <span className="text-xs text-muted-foreground">{r.sub}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      {/* Mobile Drawer Menu */}
      {open ? (
        <div className="border-t border-white/10 bg-[#07090e]/95 backdrop-blur-2xl xl:hidden">
          <nav className="mx-auto grid max-w-7xl gap-1 px-4 py-4">
            {menu.map((m) => (
              <Link
                key={m.to}
                to={m.to}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider text-muted-foreground transition-colors hover:bg-white/[0.05] hover:text-white"
              >
                {m.label}
              </Link>
            ))}
            <div className="mt-4 grid gap-2 border-t border-white/10 pt-4">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 rounded-xl bg-white/[0.04] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-foreground"
                  >
                    <LayoutDashboard className="size-4 text-gold" /> Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 rounded-xl bg-white/[0.04] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-foreground"
                  >
                    <UserIcon className="size-4 text-primary" /> Perfil
                  </Link>
                  {isAdmin ? (
                    <Link
                      to="/admin"
                      onClick={() => setOpen(false)}
                      className="rounded-xl border border-gold/30 bg-gold/10 px-4 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-gold"
                    >
                      Painel Administrativo
                    </Link>
                  ) : null}
                  <button
                    onClick={async () => {
                      setOpen(false);
                      await signOut();
                      navigate({ to: "/" });
                    }}
                    className="rounded-xl bg-primary/10 px-4 py-2.5 text-left text-xs font-bold uppercase tracking-wider text-primary"
                  >
                    Sair da Conta
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-foreground"
                  >
                    Entrar
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setOpen(false)}
                    className="rounded-xl bg-gradient-to-r from-primary to-red-600 px-4 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-white shadow-lg"
                  >
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
