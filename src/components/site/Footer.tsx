import { Link } from "@tanstack/react-router";
import logoImg from "@/assets/logo.png";

const columns = [
  {
    title: "Plataforma",
    links: [
      { label: "Torneios", to: "/tournaments" },
      { label: "Rankings", to: "/rankings" },
      { label: "Comunidade", to: "/community" },
      { label: "Awards", to: "/awards" },
    ],
  },
  {
    title: "Explorar",
    links: [
      { label: "Jogos", to: "/games" },
      { label: "Jogadores", to: "/players" },
      { label: "Equipas", to: "/teams" },
      { label: "Clips", to: "/clips" },
    ],
  },
  {
    title: "Institucional",
    links: [
      { label: "Sobre nós", to: "/community" },
      { label: "Contacto", to: "/community" },
      { label: "Termos", to: "/community" },
      { label: "Privacidade", to: "/community" },
    ],
  },
];

const socials = ["Discord", "Instagram", "TikTok", "YouTube", "Facebook", "X"];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={logoImg}
              alt="Angola Gamers Logo"
              className="h-12 w-auto object-contain [filter:drop-shadow(0_3px_6px_rgba(234,179,8,0.25))]"
            />
            <div>
              <p className="ag-heading text-base leading-none">Angola Gamers</p>
              <p className="text-[10px] font-bold tracking-[0.35em] text-gold">LEVEL UP ANGOLA</p>
            </div>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            O hub da comunidade gamer e esports de Angola: torneios, rankings, equipas, notícias e eventos num só lugar.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {socials.map((s) => (
              <span
                key={s}
                className="rounded border border-border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
        {columns.map((c) => (
          <div key={c.title}>
            <p className="ag-heading mb-4 text-xs tracking-[0.2em] text-primary">{c.title}</p>
            <ul className="space-y-2.5">
              {c.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:px-6">
          <p>© {new Date().getFullYear()} Angola Gamers. Todos os direitos reservados.</p>
          <p>Plataforma em desenvolvimento — conteúdo de demonstração.</p>
        </div>
      </div>
    </footer>
  );
}
