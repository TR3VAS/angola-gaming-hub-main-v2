/**
 * DADOS DE DEMONSTRAÇÃO — Angola Gamers
 * Estes dados são fictícios e servem apenas para demonstração.
 * A estrutura reflete as tabelas previstas no backend (Lovable Cloud),
 * pelo que a substituição por chamadas reais é directa.
 */

export const IS_DEMO_DATA = true;

export type GameSlug =
  "fortnite" | "ea-sports-fc" | "free-fire" | "call-of-duty" | "valorant" | "pubg";

export type Game = {
  slug: GameSlug;
  name: string;
  short: string;
  genre: string;
  players: number;
  tournaments: number;
  featured?: boolean;
  accent: string;
  description: string;
};

export const games: Game[] = [
  {
    slug: "fortnite",
    name: "Fortnite",
    short: "FN",
    genre: "Battle Royale",
    players: 612,
    tournaments: 24,
    featured: true,
    accent: "from-primary/40",
    description:
      "O jogo com maior cena competitiva em Angola. Cash cups semanais, ranking nacional e classificação para as finais Angola Gamers.",
  },
  {
    slug: "ea-sports-fc",
    name: "EA Sports FC",
    short: "FC",
    genre: "Desporto",
    players: 388,
    tournaments: 16,
    accent: "from-emerald-500/30",
    description:
      "A liga angolana de futebol virtual, com jogos 1v1 em consola e PC e uma final presencial em Luanda.",
  },
  {
    slug: "free-fire",
    name: "Free Fire",
    short: "FF",
    genre: "Battle Royale Mobile",
    players: 540,
    tournaments: 14,
    accent: "from-orange-500/30",
    description:
      "O mobile domina Angola. Squads de todas as províncias competem em ligas mensais totalmente jogadas em telemóvel.",
  },
  {
    slug: "call-of-duty",
    name: "Call of Duty",
    short: "COD",
    genre: "FPS",
    players: 275,
    tournaments: 9,
    accent: "from-amber-500/30",
    description: "Warzone e Multiplayer competitivo, com torneios 4v4 e séries eliminatórias.",
  },
  {
    slug: "valorant",
    name: "Valorant",
    short: "VAL",
    genre: "Tactical FPS",
    players: 164,
    tournaments: 6,
    accent: "from-rose-500/30",
    description: "Cena em crescimento, com equipas 5v5 a disputar a primeira temporada nacional.",
  },
  {
    slug: "pubg",
    name: "PUBG",
    short: "PUBG",
    genre: "Battle Royale",
    players: 121,
    tournaments: 4,
    accent: "from-sky-500/30",
    description: "Competições squad em PC e mobile com pontuação por colocação e eliminações.",
  },
];

export const provinces = [
  "Luanda",
  "Benguela",
  "Huíla",
  "Huambo",
  "Cabinda",
  "Namibe",
  "Malanje",
  "Uíge",
];

export type Player = {
  username: string;
  name: string;
  team: string | null;
  game: GameSlug;
  province: string;
  points: number;
  wins: number;
  top3: number;
  tournaments: number;
  prize: number;
  rank: number;
  gamerTag: string;
  bio: string;
  badges: string[];
  socials: { platform: string; handle: string }[];
  form: { month: string; points: number }[];
};

const months = ["Mar", "Abr", "Mai", "Jun", "Jul", "Ago"];

function makeForm(seed: number) {
  return months.map((month, i) => ({
    month,
    points: 120 + ((seed * (i + 3) * 37) % 420),
  }));
}

const rawPlayers: Array<
  [string, string, string | null, GameSlug, string, number, number, number, number, number]
> = [
  [
    "KwanzaSniper",
    "Edgar Nzinga",
    "Kalunga Esports",
    "fortnite",
    "Luanda",
    4820,
    12,
    27,
    31,
    2450000,
  ],
  [
    "ZeroLatency",
    "Márcio Bonga",
    "Kalunga Esports",
    "fortnite",
    "Luanda",
    4410,
    9,
    24,
    29,
    1980000,
  ],
  ["MutuGG", "Hélder Mutu", "Palanca Gaming", "fortnite", "Benguela", 4090, 8, 21, 27, 1720000],
  ["NgolaBuild", "Yuri Cassule", "Talatona Titans", "fortnite", "Luanda", 3760, 7, 19, 26, 1410000],
  [
    "FastCatumbela",
    "Ivan Chipita",
    "Palanca Gaming",
    "fortnite",
    "Benguela",
    3510,
    6,
    18,
    24,
    1180000,
  ],
  ["Rainha404", "Sofia Kiala", "Muxima Queens", "fortnite", "Luanda", 3320, 6, 16, 22, 980000],
  ["BitZulu", "Cláudio Zola", null, "fortnite", "Huíla", 2980, 4, 14, 20, 760000],
  ["Kimbo", "Nelson Kimbo", "Cuanza Crew", "fortnite", "Huambo", 2740, 4, 12, 19, 620000],
  ["TropaFC", "Adilson Neto", "Luanda Lions", "ea-sports-fc", "Luanda", 4310, 15, 22, 25, 1650000],
  [
    "GolodeOuro",
    "Bruno Sassa",
    "Luanda Lions",
    "ea-sports-fc",
    "Luanda",
    3980,
    13,
    20,
    24,
    1320000,
  ],
  ["FCKota", "Élio Domingos", "Namibe Sharks", "ea-sports-fc", "Namibe", 3450, 10, 17, 21, 940000],
  ["PenaltiKing", "Ruy Manuel", null, "ea-sports-fc", "Malanje", 2870, 8, 13, 18, 610000],
  ["FireBoss", "Kevin Lussati", "Cuanza Crew", "free-fire", "Huambo", 4520, 14, 25, 28, 1580000],
  [
    "ChamaBoy",
    "Alberto Pinto",
    "Palanca Gaming",
    "free-fire",
    "Benguela",
    4120,
    12,
    22,
    26,
    1290000,
  ],
  ["MissFF", "Nádia Bunga", "Muxima Queens", "free-fire", "Luanda", 3860, 11, 20, 25, 1050000],
  ["Kianda", "Osvaldo Neves", "Cabinda Raptors", "free-fire", "Cabinda", 3390, 9, 17, 22, 830000],
  [
    "ColdShot",
    "Denis Fortes",
    "Talatona Titans",
    "call-of-duty",
    "Luanda",
    4210,
    13,
    21,
    24,
    1470000,
  ],
  [
    "WarzoneAO",
    "Paulo Kanda",
    "Cabinda Raptors",
    "call-of-duty",
    "Cabinda",
    3740,
    10,
    18,
    22,
    1090000,
  ],
  ["SilentAim", "Job Miguel", "Namibe Sharks", "call-of-duty", "Namibe", 3210, 8, 15, 20, 720000],
  ["ViperAO", "Telma Sebastião", "Muxima Queens", "valorant", "Luanda", 3050, 7, 14, 18, 640000],
];

export const players: Player[] = rawPlayers
  .map(([username, name, team, game, province, points, wins, top3, tournaments, prize], i) => ({
    username,
    name,
    team,
    game,
    province,
    points,
    wins,
    top3,
    tournaments,
    prize,
    rank: 0,
    gamerTag: `ANG#${String(100124 + i * 37).padStart(6, "0")}`,
    bio: `Jogador competitivo de ${game.replace(/-/g, " ")} baseado em ${province}. Compete no circuito Angola Gamers desde 2024.`,
    badges:
      i === 0
        ? ["ANGOLA GAMERS CHAMPION", "TOURNAMENT WINNER", "PRO PLAYER"]
        : i < 3
          ? ["TOURNAMENT WINNER", "TOP PLAYER"]
          : i < 8
            ? ["TOP PLAYER", "RISING STAR"]
            : ["COMMUNITY LEGEND"],
    socials: [
      { platform: "Instagram", handle: `@${username.toLowerCase()}` },
      { platform: "Twitch", handle: `twitch.tv/${username.toLowerCase()}` },
    ],
    form: makeForm(i + 1),
  }))
  .map((p, _i, arr) => ({
    ...p,
    rank:
      arr
        .filter((o) => o.game === p.game)
        .sort((a, b) => b.points - a.points)
        .findIndex((o) => o.username === p.username) + 1,
  }));

export type Team = {
  id: string;
  name: string;
  tag: string;
  city: string;
  founded: number;
  games: GameSlug[];
  rank: number;
  titles: number;
  description: string;
};

export const teams: Team[] = [
  {
    id: "kalunga-esports",
    name: "Kalunga Esports",
    tag: "KLG",
    city: "Luanda",
    founded: 2022,
    games: ["fortnite", "call-of-duty"],
    rank: 1,
    titles: 9,
    description:
      "A organização mais titulada do circuito angolano, com raízes na cena Fortnite de Luanda.",
  },
  {
    id: "palanca-gaming",
    name: "Palanca Gaming",
    tag: "PLC",
    city: "Benguela",
    founded: 2023,
    games: ["fortnite", "free-fire"],
    rank: 2,
    titles: 6,
    description: "Projeto de Benguela focado em desenvolver talento jovem do litoral sul.",
  },
  {
    id: "luanda-lions",
    name: "Luanda Lions",
    tag: "LLN",
    city: "Luanda",
    founded: 2021,
    games: ["ea-sports-fc"],
    rank: 3,
    titles: 7,
    description: "Referência no futebol virtual angolano e campeões da liga FC 2025.",
  },
  {
    id: "talatona-titans",
    name: "Talatona Titans",
    tag: "TTN",
    city: "Luanda",
    founded: 2023,
    games: ["fortnite", "call-of-duty", "valorant"],
    rank: 4,
    titles: 4,
    description: "Estrutura multi-jogo com academia própria em Talatona.",
  },
  {
    id: "cuanza-crew",
    name: "Cuanza Crew",
    tag: "CZC",
    city: "Huambo",
    founded: 2024,
    games: ["free-fire", "fortnite"],
    rank: 5,
    titles: 3,
    description: "Squad do planalto central que dominou a liga mobile de 2025.",
  },
  {
    id: "muxima-queens",
    name: "Muxima Queens",
    tag: "MXQ",
    city: "Luanda",
    founded: 2024,
    games: ["fortnite", "free-fire", "valorant"],
    rank: 6,
    titles: 2,
    description: "Primeira organização angolana totalmente feminina de esports.",
  },
  {
    id: "cabinda-raptors",
    name: "Cabinda Raptors",
    tag: "CBR",
    city: "Cabinda",
    founded: 2023,
    games: ["call-of-duty", "free-fire"],
    rank: 7,
    titles: 2,
    description: "Equipa do norte com forte presença nos torneios de FPS.",
  },
  {
    id: "namibe-sharks",
    name: "Namibe Sharks",
    tag: "NMS",
    city: "Namibe",
    founded: 2025,
    games: ["ea-sports-fc", "call-of-duty"],
    rank: 8,
    titles: 1,
    description: "Projeto recente do Namibe em rápida ascensão no ranking nacional.",
  },
];

export type TournamentStatus = "LIVE" | "OPEN" | "UPCOMING" | "FINISHED";

export type Tournament = {
  id: string;
  name: string;
  game: GameSlug;
  date: string;
  time: string;
  prize: number;
  slots: number;
  registered: number;
  status: TournamentStatus;
  format: string;
  location: string;
  rules: string[];
};

export const tournaments: Tournament[] = [
  {
    id: "ag-fortnite-cup-12",
    name: "Angola Gamers Fortnite Cup #12",
    game: "fortnite",
    date: "2026-09-12",
    time: "19:00",
    prize: 850000,
    slots: 128,
    registered: 118,
    status: "LIVE",
    format: "Solo — 6 partidas, pontuação acumulada",
    location: "Online",
    rules: [
      "Conta com nickname registado na plataforma",
      "Servidor EU/ME conforme indicação",
      "Proibido teaming em modo solo",
      "Screenshots obrigatórias no fim de cada partida",
    ],
  },
  {
    id: "liga-fc-jornada-8",
    name: "Liga FC Angola — Jornada 8",
    game: "ea-sports-fc",
    date: "2026-09-14",
    time: "20:00",
    prize: 450000,
    slots: 32,
    registered: 32,
    status: "OPEN",
    format: "1v1 eliminatória directa",
    location: "Online",
    rules: [
      "Duração 6 minutos por parte",
      "Equipas de clubes permitidas",
      "Desconexão dá derrota após 2 ocorrências",
    ],
  },
  {
    id: "free-fire-nacional",
    name: "Free Fire Nacional — Fase de Grupos",
    game: "free-fire",
    date: "2026-09-18",
    time: "18:30",
    prize: 600000,
    slots: 48,
    registered: 41,
    status: "OPEN",
    format: "Squads 4v4 — 4 quedas",
    location: "Online",
    rules: ["Apenas dispositivos móveis", "Emuladores proibidos", "Check-in 30 minutos antes"],
  },
  {
    id: "cod-warzone-clash",
    name: "COD Warzone Angola Clash",
    game: "call-of-duty",
    date: "2026-09-21",
    time: "21:00",
    prize: 380000,
    slots: 64,
    registered: 22,
    status: "UPCOMING",
    format: "Trios — pontos por kills e colocação",
    location: "Online",
    rules: ["Crossplay activo", "Proibido stream sniping"],
  },
  {
    id: "valorant-open-ao",
    name: "Valorant Angola Open",
    game: "valorant",
    date: "2026-09-27",
    time: "17:00",
    prize: 300000,
    slots: 16,
    registered: 9,
    status: "UPCOMING",
    format: "5v5 — grupos + playoffs BO3",
    location: "Online",
    rules: ["Roster fixo de 5 + 1 suplente", "Servidor Joanesburgo"],
  },
  {
    id: "pubg-luanda-series",
    name: "PUBG Luanda Series",
    game: "pubg",
    date: "2026-10-02",
    time: "19:30",
    prize: 220000,
    slots: 32,
    registered: 14,
    status: "UPCOMING",
    format: "Squads — 5 quedas",
    location: "Online",
    rules: ["Sem emuladores em lobby PC"],
  },
  {
    id: "ag-fortnite-duos-open",
    name: "Fortnite Duos Open Angola",
    game: "fortnite",
    date: "2026-08-24",
    time: "19:00",
    prize: 500000,
    slots: 96,
    registered: 96,
    status: "FINISHED",
    format: "Duos — 5 partidas",
    location: "Online",
    rules: ["Duplas fixas"],
  },
  {
    id: "fc-lan-luanda",
    name: "FC LAN Luanda",
    game: "ea-sports-fc",
    date: "2026-08-16",
    time: "14:00",
    prize: 400000,
    slots: 24,
    registered: 24,
    status: "FINISHED",
    format: "Presencial — grupos + final",
    location: "Talatona, Luanda",
    rules: ["Presença obrigatória no recinto"],
  },
  {
    id: "free-fire-provincias",
    name: "Free Fire Copa das Províncias",
    game: "free-fire",
    date: "2026-08-09",
    time: "18:00",
    prize: 350000,
    slots: 40,
    registered: 40,
    status: "FINISHED",
    format: "Squads por província",
    location: "Online",
    rules: ["Um squad por província"],
  },
  {
    id: "cod-huambo-cup",
    name: "COD Huambo Cup",
    game: "call-of-duty",
    date: "2026-07-26",
    time: "20:00",
    prize: 180000,
    slots: 32,
    registered: 30,
    status: "FINISHED",
    format: "4v4 Search & Destroy",
    location: "Huambo",
    rules: ["Mapas do pool oficial"],
  },
];

export const bracket = [
  {
    round: "Quartos-de-final",
    matches: [
      { a: "KwanzaSniper", b: "Kimbo", scoreA: 3, scoreB: 1 },
      { a: "ZeroLatency", b: "BitZulu", scoreA: 3, scoreB: 2 },
      { a: "MutuGG", b: "Rainha404", scoreA: 2, scoreB: 3 },
      { a: "NgolaBuild", b: "FastCatumbela", scoreA: 3, scoreB: 0 },
    ],
  },
  {
    round: "Meias-finais",
    matches: [
      { a: "KwanzaSniper", b: "ZeroLatency", scoreA: 3, scoreB: 2 },
      { a: "Rainha404", b: "NgolaBuild", scoreA: 1, scoreB: 3 },
    ],
  },
  { round: "Final", matches: [{ a: "KwanzaSniper", b: "NgolaBuild", scoreA: 3, scoreB: 2 }] },
];

export type News = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: number;
  body: string[];
};

export const news: News[] = [
  {
    slug: "kalunga-esports-conquista-fortnite-cup",
    title: "Kalunga Esports conquista a Fortnite Cup #11 com reviravolta na última partida",
    excerpt:
      "KwanzaSniper somou 24 pontos na queda final e garantiu o título para a organização de Luanda.",
    category: "Fortnite",
    author: "Redação Angola Gamers",
    date: "2026-08-28",
    readTime: 4,
    body: [
      "A Fortnite Cup #11 terminou com uma das finais mais disputadas do circuito nacional. A três partidas do fim, a Kalunga Esports estava a 40 pontos da liderança.",
      "KwanzaSniper fechou a última queda com sete eliminações e uma Victory Royale que valeu 24 pontos, ultrapassando a Palanca Gaming por uma diferença de apenas seis pontos.",
      "Com este resultado, a organização soma o nono título desde 2022 e reforça a liderança no ranking nacional da Angola Gamers.",
      "A próxima etapa do circuito está marcada para setembro, com um prize pool alargado e 128 lugares disponíveis.",
    ],
  },
  {
    slug: "liga-fc-angola-2026-formato",
    title: "Liga FC Angola 2026 muda de formato e passa a ter play-offs presenciais",
    excerpt: "A competição de EA Sports FC ganha uma fase final disputada em Luanda com público.",
    category: "EA Sports FC",
    author: "Nuno Baptista",
    date: "2026-08-25",
    readTime: 3,
    body: [
      "A organização confirmou que a Liga FC Angola passa a ter uma fase regular online seguida de play-offs presenciais.",
      "Os oito melhores classificados garantem lugar na final four, que decorrerá num recinto em Luanda com transmissão em direto.",
      "A alteração responde ao crescimento do número de inscritos, que passou de 96 para mais de 200 jogadores em dois anos.",
    ],
  },
  {
    slug: "free-fire-mobile-cresce-nas-provincias",
    title: "Free Fire lidera crescimento do esports fora de Luanda",
    excerpt: "Huambo, Benguela e Cabinda concentram mais de metade dos novos registos mobile.",
    category: "Free Fire",
    author: "Sara Mendes",
    date: "2026-08-22",
    readTime: 5,
    body: [
      "O mobile continua a ser a porta de entrada para o gaming competitivo em Angola.",
      "Os dados de registo da plataforma mostram que a maioria dos novos jogadores de Free Fire vem de fora da capital.",
      "As ligas provinciais têm sido determinantes para este crescimento, ao reduzirem a barreira de entrada e permitirem competir apenas com telemóvel e dados móveis.",
    ],
  },
  {
    slug: "angola-gamers-awards-2026-abrem-votacao",
    title: "Angola Gamers Awards 2026 abrem votação da comunidade",
    excerpt: "Onze categorias vão ser decididas pelos votos dos membros registados na plataforma.",
    category: "Eventos",
    author: "Redação Angola Gamers",
    date: "2026-08-20",
    readTime: 2,
    body: [
      "A votação para os Angola Gamers Awards 2026 está aberta a todos os utilizadores registados.",
      "Cada membro pode votar uma única vez em cada categoria, num total de onze categorias.",
      "Os vencedores serão anunciados na gala de encerramento da temporada.",
    ],
  },
  {
    slug: "muxima-queens-primeira-organizacao-feminina",
    title: "Muxima Queens leva a primeira equipa feminina angolana a uma final internacional",
    excerpt: "A organização qualificou-se para a fase regional africana de Free Fire.",
    category: "Esports",
    author: "Sara Mendes",
    date: "2026-08-18",
    readTime: 4,
    body: [
      "A Muxima Queens tornou-se a primeira estrutura angolana feminina a garantir presença numa fase regional africana.",
      "A equipa terminou o apuramento em terceiro lugar, com duas Booyah nas últimas três quedas.",
      "A organização, fundada em 2024, tem hoje rosters em três jogos diferentes.",
    ],
  },
  {
    slug: "internet-e-esports-em-angola",
    title: "Latência, dados móveis e servidores: os desafios técnicos do esports angolano",
    excerpt:
      "Jogadores angolanos competem frequentemente em servidores europeus com 140 ms de ping.",
    category: "Tecnologia",
    author: "Nuno Baptista",
    date: "2026-08-15",
    readTime: 6,
    body: [
      "A ausência de servidores locais para a maioria dos títulos competitivos obriga os jogadores angolanos a ligarem-se a servidores europeus ou sul-africanos.",
      "Na prática, isso significa competir com latência entre 110 e 180 milissegundos.",
      "Organizações nacionais têm negociado bootcamps com ligação dedicada para reduzir a desvantagem nas fases finais.",
      "A criação de um ponto de troca de tráfego dedicado a gaming é uma das propostas em discussão no setor.",
    ],
  },
  {
    slug: "cod-warzone-regressa-ao-circuito",
    title: "Call of Duty Warzone regressa ao circuito nacional em setembro",
    excerpt: "O Angola Clash traz de volta o formato trios com prize pool de 380.000 Kz.",
    category: "Call of Duty",
    author: "Redação Angola Gamers",
    date: "2026-08-12",
    readTime: 3,
    body: [
      "Depois de uma pausa de quatro meses, o Warzone volta ao calendário competitivo angolano.",
      "O formato trios premia colocação e eliminações, com multiplicador nas duas últimas quedas.",
      "As inscrições abrem duas semanas antes do evento.",
    ],
  },
  {
    slug: "academia-talatona-titans",
    title: "Talatona Titans abre academia para jogadores dos 14 aos 18 anos",
    excerpt: "O programa inclui treino técnico, preparação mental e apoio escolar.",
    category: "Gaming Angola",
    author: "Sara Mendes",
    date: "2026-08-08",
    readTime: 4,
    body: [
      "A academia dos Talatona Titans arranca com vinte lugares e sessões três vezes por semana.",
      "O programa exige aproveitamento escolar mínimo para manter o lugar no roster.",
      "É a primeira iniciativa estruturada de formação de base no esports angolano.",
    ],
  },
  {
    slug: "guia-comecar-esports-angola",
    title: "Guia: como começar a competir em esports em Angola",
    excerpt:
      "Do registo na plataforma à primeira cash cup, um percurso realista para novos jogadores.",
    category: "Gaming Angola",
    author: "Redação Angola Gamers",
    date: "2026-08-05",
    readTime: 7,
    body: [
      "Começar a competir não exige equipamento topo de gama. O primeiro passo é registar-se e criar um perfil com gamer tag.",
      "Depois, escolha um jogo e inscreva-se em torneios abertos, que costumam ter mais lugares e menor nível de entrada.",
      "Registe os seus resultados: o ranking nacional é construído a partir da participação em eventos oficiais.",
      "Finalmente, procure equipa através da função Find a Team, onde jogadores publicam vagas por jogo e província.",
    ],
  },
  {
    slug: "lan-party-benguela-2026",
    title: "Benguela recebe a maior LAN party do ano com 300 lugares",
    excerpt: "O evento junta competições, cosplay e um torneio aberto de EA Sports FC.",
    category: "Eventos",
    author: "Nuno Baptista",
    date: "2026-08-02",
    readTime: 3,
    body: [
      "A LAN de Benguela terá três dias de atividades e competições em quatro jogos.",
      "Os bilhetes de participação incluem posto de jogo e acesso a todas as competições abertas.",
      "A organização espera receber jogadores de sete províncias.",
    ],
  },
  {
    slug: "streaming-angolano-cresce",
    title: "Streaming angolano cresce 60% e cria os primeiros criadores a tempo inteiro",
    excerpt: "Plataformas de vídeo curto impulsionaram audiências locais de gaming.",
    category: "Esports",
    author: "Sara Mendes",
    date: "2026-07-30",
    readTime: 5,
    body: [
      "O número de criadores angolanos de conteúdo gaming com audiência regular mais do que duplicou em dois anos.",
      "O formato curto tem sido o principal motor, com clips de jogadas a atingir audiências internacionais.",
      "Os primeiros contratos de patrocínio com marcas nacionais começaram já em 2025.",
    ],
  },
  {
    slug: "regras-anti-cheat-plataforma",
    title: "Angola Gamers reforça regras anti-cheat em todos os torneios oficiais",
    excerpt: "Novas exigências de gravação e verificação de contas entram em vigor esta temporada.",
    category: "Esports",
    author: "Redação Angola Gamers",
    date: "2026-07-26",
    readTime: 3,
    body: [
      "Todos os finalistas passam a ter de submeter gravação da sessão competitiva.",
      "Contas com histórico de banimento noutros circuitos ficam impedidas de participar.",
      "A medida procura proteger a credibilidade do ranking nacional.",
    ],
  },
  {
    slug: "fortnite-ranking-temporada-3",
    title: "Ranking Fortnite: como funcionam os pontos da Temporada 3",
    excerpt: "Colocação, eliminações e consistência pesam de forma diferente no total.",
    category: "Fortnite",
    author: "Nuno Baptista",
    date: "2026-07-22",
    readTime: 4,
    body: [
      "Cada torneio oficial atribui pontos segundo uma tabela pública de colocação.",
      "As eliminações valem pontos, mas com peso reduzido face à colocação final.",
      "Há ainda um bónus de consistência para quem participa em pelo menos seis eventos por temporada.",
    ],
  },
  {
    slug: "universidades-entram-no-esports",
    title: "Universidades angolanas criam as primeiras equipas oficiais de esports",
    excerpt: "Três instituições de Luanda e Huambo vão disputar uma liga universitária.",
    category: "Gaming Angola",
    author: "Sara Mendes",
    date: "2026-07-18",
    readTime: 4,
    body: [
      "A liga universitária arranca com seis equipas e jogos em EA Sports FC e Valorant.",
      "As instituições disponibilizam salas equipadas para treino nos campus.",
      "O objetivo é criar um percurso entre o gaming amador e as organizações profissionais.",
    ],
  },
  {
    slug: "prize-pool-nacional-recorde",
    title: "Prize pool do circuito nacional ultrapassa 4 milhões de kwanzas em 2026",
    excerpt: "O valor distribuído triplicou face à primeira temporada.",
    category: "Esports",
    author: "Redação Angola Gamers",
    date: "2026-07-14",
    readTime: 3,
    body: [
      "O crescimento resulta sobretudo da entrada de patrocinadores nacionais no circuito.",
      "Fortnite e Free Fire concentram a maior fatia do valor distribuído.",
      "A organização pretende alargar os prémios às competições femininas e universitárias.",
    ],
  },
];

export type EventItem = {
  id: string;
  title: string;
  type: "Torneio" | "LAN Party" | "Meetup" | "Universitário" | "Competição";
  date: string;
  time: string;
  city: string;
  venue: string;
  description: string;
};

export const events: EventItem[] = [
  {
    id: "lan-benguela",
    title: "Angola Gamers LAN Benguela",
    type: "LAN Party",
    date: "2026-09-19",
    time: "10:00",
    city: "Benguela",
    venue: "Pavilhão da Restinga",
    description: "Três dias de competições presenciais em quatro jogos, com 300 postos de jogo.",
  },
  {
    id: "meetup-luanda",
    title: "Meetup Gamers Luanda",
    type: "Meetup",
    date: "2026-09-10",
    time: "17:00",
    city: "Luanda",
    venue: "Espaço Talatona",
    description: "Encontro aberto da comunidade com painéis sobre carreira em esports.",
  },
  {
    id: "fortnite-cup-12-evt",
    title: "Fortnite Cup #12",
    type: "Torneio",
    date: "2026-09-12",
    time: "19:00",
    city: "Online",
    venue: "Online",
    description: "Décima segunda etapa do circuito nacional de Fortnite.",
  },
  {
    id: "liga-universitaria",
    title: "Liga Universitária — Jornada inaugural",
    type: "Universitário",
    date: "2026-09-24",
    time: "15:00",
    city: "Luanda",
    venue: "Campus Universitário",
    description: "Arranque da primeira liga universitária angolana de esports.",
  },
  {
    id: "free-fire-nacional-evt",
    title: "Free Fire Nacional — Fase de Grupos",
    type: "Torneio",
    date: "2026-09-18",
    time: "18:30",
    city: "Online",
    venue: "Online",
    description: "Fase de grupos da competição mobile mais participada do país.",
  },
  {
    id: "cosplay-huambo",
    title: "Huambo Game Day",
    type: "Competição",
    date: "2026-10-04",
    time: "11:00",
    city: "Huambo",
    venue: "Centro Cultural do Huambo",
    description: "Dia de gaming com competições abertas, cosplay e área retro.",
  },
  {
    id: "meetup-cabinda",
    title: "Meetup Cabinda Raptors",
    type: "Meetup",
    date: "2026-10-11",
    time: "16:00",
    city: "Cabinda",
    venue: "Sala Multiusos",
    description: "Sessão de recrutamento e treino aberto da organização de Cabinda.",
  },
  {
    id: "cod-clash-evt",
    title: "COD Angola Clash",
    type: "Torneio",
    date: "2026-09-21",
    time: "21:00",
    city: "Online",
    venue: "Online",
    description: "Regresso do Warzone competitivo ao calendário nacional.",
  },
  {
    id: "namibe-beach-gaming",
    title: "Namibe Beach Gaming",
    type: "LAN Party",
    date: "2026-10-18",
    time: "09:00",
    city: "Namibe",
    venue: "Marginal do Namibe",
    description: "LAN ao ar livre com torneios de EA Sports FC e Free Fire.",
  },
  {
    id: "gala-awards",
    title: "Gala Angola Gamers Awards 2026",
    type: "Competição",
    date: "2026-12-13",
    time: "19:00",
    city: "Luanda",
    venue: "Auditório Central",
    description: "Cerimónia de entrega dos prémios da temporada.",
  },
];

export type Creator = {
  id: string;
  name: string;
  username: string;
  platform: "Twitch" | "YouTube" | "TikTok" | "Kick";
  followers: number;
  gamesPlayed: GameSlug[];
  city: string;
  bio: string;
};

export const creators: Creator[] = [
  {
    id: "kandengue-plays",
    name: "Osvaldo Vunge",
    username: "KandenguePlays",
    platform: "Twitch",
    followers: 41200,
    gamesPlayed: ["fortnite", "call-of-duty"],
    city: "Luanda",
    bio: "Streams diárias de Fortnite competitivo e análise das cash cups nacionais.",
  },
  {
    id: "ff-nzinga",
    name: "Nzinga Mateus",
    username: "NzingaFF",
    platform: "TikTok",
    followers: 128000,
    gamesPlayed: ["free-fire"],
    city: "Luanda",
    bio: "Clips de Free Fire e desafios com a comunidade mobile angolana.",
  },
  {
    id: "kota-gamer",
    name: "Alfredo Sousa",
    username: "KotaGamer",
    platform: "YouTube",
    followers: 76500,
    gamesPlayed: ["ea-sports-fc"],
    city: "Benguela",
    bio: "Carreiras de FC, análise de equipas angolanas e vídeos de dicas.",
  },
  {
    id: "biazinha",
    name: "Beatriz Chilombo",
    username: "Biazinha",
    platform: "TikTok",
    followers: 93400,
    gamesPlayed: ["free-fire", "fortnite"],
    city: "Huambo",
    bio: "Conteúdo mobile e cobertura das ligas provinciais.",
  },
  {
    id: "sniper-cast",
    name: "Hélio Bento",
    username: "SniperCast",
    platform: "Twitch",
    followers: 22800,
    gamesPlayed: ["call-of-duty", "pubg"],
    city: "Cabinda",
    bio: "Casting de torneios FPS e análise táctica pós-jogo.",
  },
  {
    id: "valgirl-ao",
    name: "Ivone Kalunga",
    username: "ValGirlAO",
    platform: "Twitch",
    followers: 18600,
    gamesPlayed: ["valorant"],
    city: "Luanda",
    bio: "Ranked de Valorant e coaching gratuito para jogadores angolanos.",
  },
  {
    id: "zeca-highlights",
    name: "José Kiluanje",
    username: "ZecaHighlights",
    platform: "YouTube",
    followers: 54300,
    gamesPlayed: ["fortnite", "free-fire"],
    city: "Luanda",
    bio: "Melhores momentos semanais do esports angolano.",
  },
  {
    id: "tuga-ao",
    name: "Márcio Lopes",
    username: "TugaAO",
    platform: "Kick",
    followers: 15200,
    gamesPlayed: ["ea-sports-fc"],
    city: "Namibe",
    bio: "Maratonas de FC e torneios abertos para viewers.",
  },
  {
    id: "dj-pixel",
    name: "Paula Simão",
    username: "DJPixel",
    platform: "TikTok",
    followers: 67900,
    gamesPlayed: ["fortnite"],
    city: "Malanje",
    bio: "Gaming, música e cultura urbana angolana.",
  },
  {
    id: "mano-tech",
    name: "Eduardo Cardoso",
    username: "ManoTech",
    platform: "YouTube",
    followers: 38700,
    gamesPlayed: ["pubg", "call-of-duty"],
    city: "Uíge",
    bio: "Setups acessíveis, otimização de telemóveis e reviews para gamers angolanos.",
  },
];

export type Clip = {
  id: string;
  title: string;
  username: string;
  game: GameSlug | "outros";
  views: number;
  likes: number;
  duration: string;
};

export const clips: Clip[] = [
  {
    id: "clip-1",
    title: "1v4 clutch na final da Cup #11",
    username: "KwanzaSniper",
    game: "fortnite",
    views: 48200,
    likes: 3900,
    duration: "0:42",
  },
  {
    id: "clip-2",
    title: "Booyah com 14 kills em Cabinda",
    username: "FireBoss",
    game: "free-fire",
    views: 39100,
    likes: 3100,
    duration: "1:05",
  },
  {
    id: "clip-3",
    title: "Golo de fora da área na Liga FC",
    username: "TropaFC",
    game: "ea-sports-fc",
    views: 27400,
    likes: 2200,
    duration: "0:28",
  },
  {
    id: "clip-4",
    title: "Quad feed em Verdansk",
    username: "ColdShot",
    game: "call-of-duty",
    views: 21800,
    likes: 1800,
    duration: "0:36",
  },
  {
    id: "clip-5",
    title: "Ace com Jett no Valorant Open",
    username: "ViperAO",
    game: "valorant",
    views: 16300,
    likes: 1400,
    duration: "0:51",
  },
  {
    id: "clip-6",
    title: "Build battle insano em Luanda",
    username: "NgolaBuild",
    game: "fortnite",
    views: 33500,
    likes: 2700,
    duration: "0:39",
  },
  {
    id: "clip-7",
    title: "Última zona com 1 HP",
    username: "Kianda",
    game: "pubg",
    views: 12900,
    likes: 990,
    duration: "1:12",
  },
  {
    id: "clip-8",
    title: "Reação ao título da Kalunga",
    username: "KandenguePlays",
    game: "outros",
    views: 45700,
    likes: 4100,
    duration: "2:03",
  },
  {
    id: "clip-9",
    title: "Sniper no último círculo",
    username: "SilentAim",
    game: "call-of-duty",
    views: 18600,
    likes: 1500,
    duration: "0:33",
  },
  {
    id: "clip-10",
    title: "Remontada de 3 golos",
    username: "GolodeOuro",
    game: "ea-sports-fc",
    views: 24100,
    likes: 2000,
    duration: "1:24",
  },
];

export type Nominee = { id: string; name: string; detail: string; votes: number };
export type AwardCategory = { id: string; name: string; nominees: Nominee[] };

export const awardCategories: AwardCategory[] = [
  {
    id: "gamer-do-ano",
    name: "Gamer do Ano",
    nominees: [
      {
        id: "kwanzasniper",
        name: "KwanzaSniper",
        detail: "Kalunga Esports · Fortnite",
        votes: 1840,
      },
      { id: "fireboss", name: "FireBoss", detail: "Cuanza Crew · Free Fire", votes: 1610 },
      { id: "tropafc", name: "TropaFC", detail: "Luanda Lions · EA Sports FC", votes: 1290 },
      { id: "coldshot", name: "ColdShot", detail: "Talatona Titans · Call of Duty", votes: 980 },
    ],
  },
  {
    id: "fortnite-do-ano",
    name: "Jogador de Fortnite do Ano",
    nominees: [
      { id: "kwanzasniper", name: "KwanzaSniper", detail: "Kalunga Esports", votes: 2100 },
      { id: "zerolatency", name: "ZeroLatency", detail: "Kalunga Esports", votes: 1450 },
      { id: "mutugg", name: "MutuGG", detail: "Palanca Gaming", votes: 1120 },
    ],
  },
  {
    id: "fc-do-ano",
    name: "Jogador de EA Sports FC do Ano",
    nominees: [
      { id: "tropafc", name: "TropaFC", detail: "Luanda Lions", votes: 1730 },
      { id: "golodeouro", name: "GolodeOuro", detail: "Luanda Lions", votes: 1310 },
      { id: "fckota", name: "FCKota", detail: "Namibe Sharks", votes: 870 },
    ],
  },
  {
    id: "free-fire-do-ano",
    name: "Jogador de Free Fire do Ano",
    nominees: [
      { id: "fireboss", name: "FireBoss", detail: "Cuanza Crew", votes: 1980 },
      { id: "chamaboy", name: "ChamaBoy", detail: "Palanca Gaming", votes: 1420 },
      { id: "missff", name: "MissFF", detail: "Muxima Queens", votes: 1360 },
    ],
  },
  {
    id: "cod-do-ano",
    name: "Jogador de Call of Duty do Ano",
    nominees: [
      { id: "coldshot", name: "ColdShot", detail: "Talatona Titans", votes: 1240 },
      { id: "warzoneao", name: "WarzoneAO", detail: "Cabinda Raptors", votes: 1010 },
      { id: "silentaim", name: "SilentAim", detail: "Namibe Sharks", votes: 780 },
    ],
  },
  {
    id: "melhor-equipa",
    name: "Melhor Equipa",
    nominees: [
      { id: "kalunga", name: "Kalunga Esports", detail: "Luanda", votes: 2240 },
      { id: "palanca", name: "Palanca Gaming", detail: "Benguela", votes: 1580 },
      { id: "luanda-lions", name: "Luanda Lions", detail: "Luanda", votes: 1490 },
    ],
  },
  {
    id: "melhor-organizacao",
    name: "Melhor Organização",
    nominees: [
      { id: "kalunga-org", name: "Kalunga Esports", detail: "Multi-jogo", votes: 1870 },
      { id: "titans-org", name: "Talatona Titans", detail: "Academia própria", votes: 1330 },
      { id: "muxima-org", name: "Muxima Queens", detail: "Organização feminina", votes: 1260 },
    ],
  },
  {
    id: "melhor-streamer",
    name: "Melhor Streamer",
    nominees: [
      { id: "kandengue", name: "KandenguePlays", detail: "Twitch · 41k", votes: 1690 },
      { id: "valgirl", name: "ValGirlAO", detail: "Twitch · 18k", votes: 1040 },
      { id: "snipercast", name: "SniperCast", detail: "Twitch · 22k", votes: 960 },
    ],
  },
  {
    id: "melhor-criador",
    name: "Melhor Criador de Conteúdo",
    nominees: [
      { id: "nzingaff", name: "NzingaFF", detail: "TikTok · 128k", votes: 2020 },
      { id: "biazinha", name: "Biazinha", detail: "TikTok · 93k", votes: 1550 },
      { id: "kotagamer", name: "KotaGamer", detail: "YouTube · 76k", votes: 1180 },
    ],
  },
  {
    id: "revelacao",
    name: "Revelação do Ano",
    nominees: [
      { id: "kimbo", name: "Kimbo", detail: "Cuanza Crew · Fortnite", votes: 1120 },
      { id: "viperao", name: "ViperAO", detail: "Muxima Queens · Valorant", votes: 1080 },
      { id: "kianda", name: "Kianda", detail: "Cabinda Raptors · Free Fire", votes: 930 },
    ],
  },
  {
    id: "melhor-evento",
    name: "Melhor Evento Gamer",
    nominees: [
      { id: "lan-benguela", name: "Angola Gamers LAN Benguela", detail: "Benguela", votes: 1460 },
      { id: "fc-lan", name: "FC LAN Luanda", detail: "Luanda", votes: 1220 },
      { id: "huambo-game-day", name: "Huambo Game Day", detail: "Huambo", votes: 890 },
    ],
  },
];

export const AWARDS_YEAR = 2026;
export const AWARDS_DEADLINE = "2026-12-13T18:00:00Z";

export const hallOfFame: Record<number, { category: string; winner: string; detail: string }[]> = {
  2024: [
    { category: "Gamer do Ano", winner: "ZeroLatency", detail: "Kalunga Esports · Fortnite" },
    { category: "Melhor Jogador Mobile", winner: "ChamaBoy", detail: "Palanca Gaming · Free Fire" },
    { category: "Melhor Equipa", winner: "Luanda Lions", detail: "EA Sports FC" },
    { category: "Melhor Criador", winner: "KotaGamer", detail: "YouTube" },
  ],
  2025: [
    { category: "Gamer do Ano", winner: "FireBoss", detail: "Cuanza Crew · Free Fire" },
    { category: "Melhor Jogador de Fortnite", winner: "KwanzaSniper", detail: "Kalunga Esports" },
    { category: "Melhor Equipa", winner: "Kalunga Esports", detail: "Multi-jogo" },
    { category: "Melhor Criador", winner: "NzingaFF", detail: "TikTok" },
  ],
  2026: [],
};

export type TeamAd = {
  id: string;
  author: string;
  game: GameSlug;
  rank: string;
  platform: string;
  province: string;
  mode: string;
  message: string;
};

export const teamAds: TeamAd[] = [
  {
    id: "ad-1",
    author: "BitZulu",
    game: "fortnite",
    rank: "Champion",
    platform: "PC",
    province: "Huíla",
    mode: "Duos",
    message: "Procuro dupla para as próximas cash cups. Treino diário a partir das 20h.",
  },
  {
    id: "ad-2",
    author: "Kianda",
    game: "free-fire",
    rank: "Heroico",
    platform: "Mobile",
    province: "Cabinda",
    mode: "Squad",
    message: "Squad de Cabinda precisa de mais um jogador para a liga nacional.",
  },
  {
    id: "ad-3",
    author: "PenaltiKing",
    game: "ea-sports-fc",
    rank: "Divisão 2",
    platform: "Consola",
    province: "Malanje",
    mode: "1v1",
    message: "Procuro adversários regulares para treinar antes da jornada 8.",
  },
  {
    id: "ad-4",
    author: "WarzoneAO",
    game: "call-of-duty",
    rank: "Diamante",
    platform: "PC",
    province: "Cabinda",
    mode: "Trios",
    message: "Trio a formar para o Angola Clash. Comunicação obrigatória em Discord.",
  },
  {
    id: "ad-5",
    author: "ViperAO",
    game: "valorant",
    rank: "Ascendente",
    platform: "PC",
    province: "Luanda",
    mode: "5v5",
    message: "Equipa feminina procura duelista para o Valorant Angola Open.",
  },
  {
    id: "ad-6",
    author: "Kimbo",
    game: "fortnite",
    rank: "Elite",
    platform: "PC",
    province: "Huambo",
    mode: "Trios",
    message: "Trio do Huambo procura terceiro jogador com disponibilidade ao fim de semana.",
  },
];

export const seedPosts = [
  {
    id: "seed-1",
    author: "KandenguePlays",
    content: "Live hoje às 20h a analisar as jogadas da Fortnite Cup #11. Apareçam!",
    game: "fortnite",
    created_at: "2026-08-30T18:00:00Z",
    likes: 42,
  },
  {
    id: "seed-2",
    author: "MissFF",
    content:
      "Procuramos mais uma jogadora para o roster de Free Fire da Muxima Queens. Requisito: disponibilidade para treinar 3x por semana.",
    game: "free-fire",
    created_at: "2026-08-29T15:20:00Z",
    likes: 87,
  },
  {
    id: "seed-3",
    author: "TropaFC",
    content: "Jornada 8 da Liga FC este fim de semana. Quem acham que leva o título?",
    game: "ea-sports-fc",
    created_at: "2026-08-28T09:10:00Z",
    likes: 65,
  },
];

export const stats = {
  players: 1000,
  tournaments: 50,
  teams: 20,
  games: 10,
};

export const badgeList = [
  "TOURNAMENT WINNER",
  "TOP PLAYER",
  "RISING STAR",
  "PRO PLAYER",
  "COMMUNITY LEGEND",
  "ANGOLA GAMERS CHAMPION",
];

export function gameName(slug: string) {
  return games.find((g) => g.slug === slug)?.name ?? slug;
}

export function formatKz(value: number) {
  return new Intl.NumberFormat("pt-AO", { maximumFractionDigits: 0 }).format(value) + " Kz";
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-AO", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
