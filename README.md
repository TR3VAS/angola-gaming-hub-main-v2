# Remix of Angola Gaming Hub

CRIAÇÃO DA PLATAFORMA ANGOLA GAMERS

Cria uma aplicação web completa chamada ANGOLA GAMERS, uma plataforma gamer e esports para a comunidade de jogadores de Angola.

Usa o conceito, estrutura de navegação e nível de acabamento de plataformas como GoGamers (gogamers.gg) como inspiração, mas NÃO copies o site. Não copies código, textos, imagens, logotipo, identidade visual ou layout exato.

Quero uma plataforma original com aparência profissional de uma grande comunidade de gaming/esports angolana.

OBJETIVO

A Angola Gamers deve ser o principal hub online da comunidade gamer angolana.

A plataforma deve reunir:

Jogadores

Equipas

Torneios

Rankings

Notícias

Eventos

Criadores de conteúdo

Comunidade

Clips

Angola Gamers Awards

Jogos suportados inicialmente:

Fortnite

EA Sports FC

Free Fire

Call of Duty

Valorant

PUBG

O Fortnite deve receber maior destaque na primeira versão, principalmente na área competitiva.

IDENTIDADE DA MARCA

Nome:

ANGOLA GAMERS

Slogan:

LEVEL UP ANGOLA

Criar uma identidade visual própria.

Estética:

Premium

Gamer

Esports

Moderna

Futurista

Competitiva

Dark

Tecnológica

Usar uma paleta baseada em:

Preto

Cinza escuro

Branco

Vermelho inspirado em Angola

Dourado para prémios e rankings

Não utilizar excessivamente as cores da bandeira.

O resultado deve parecer uma plataforma profissional de esports e não um simples blog gamer.

TECNOLOGIA

Utiliza preferencialmente:

React

TypeScript

Tailwind CSS

Supabase

Utilizar:

Supabase Database

Supabase Authentication

Supabase Storage

Criar estrutura preparada para futuras integrações com APIs externas.

Se o Supabase ainda não estiver configurado, criar a aplicação utilizando dados mockados e deixar a estrutura preparada para conectar ao Supabase.

Não colocar secrets diretamente no código.

ESTRUTURA PRINCIPAL

Criar estas páginas:

/
/games
/games/fortnite
/games/ea-sports-fc
/games/free-fire
/games/call-of-duty
/tournaments
/tournaments/:id
/rankings
/players
/players/:username
/teams
/teams/:id
/news
/news/:slug
/events
/creators
/creators/:id
/awards
/awards/:year
/community
/clips
/login
/register
/profile
/dashboard
/admin

Todas as páginas devem estar conectadas através da navegação.

NAVBAR

Criar uma navbar moderna e fixa.

Logo:

ANGOLA GAMERS

Menu:

Início
Jogos
Torneios
Rankings
Jogadores
Equipas
Notícias
Eventos
Criadores
Awards

Adicionar:

Pesquisar

Entrar

Criar conta

Depois do login:

Avatar

Username

Dashboard

Perfil

Sair

No mobile utilizar menu hamburger.

HOMEPAGE

Criar uma homepage visualmente impressionante.

HERO

Criar uma grande seção hero.

Texto:

THE HOME OF ANGOLAN GAMING

Subtexto:

"A comunidade gamer e esports de Angola."

Botões:

EXPLORAR TORNEIOS

JUNTAR-ME À COMUNIDADE

Utilizar uma imagem/arte de esports/gaming como background.

A imagem deve ter aparência profissional.

Se não existir uma imagem adequada, utilizar um background abstrato gamer com gradientes e elementos tecnológicos.

Adicionar pequenas estatísticas no hero:

+1.000 Jogadores
+50 Torneios
+20 Equipas
+10 Jogos

Utilizar números de demonstração inicialmente.

JOGOS EM DESTAQUE

Título:

JOGOS EM DESTAQUE

Criar cards grandes para:

FORTNITE
EA SPORTS FC
FREE FIRE
CALL OF DUTY
VALORANT
PUBG

Cada card deve possuir:

Imagem

Logo

Nome

Número de jogadores

Número de torneios

Botão

Dar destaque especial ao Fortnite.

TORNEIOS

Criar seção:

TORNEIOS EM DESTAQUE

Mostrar cards:

Nome
Jogo
Data
Hora
Prize Pool
Participantes
Status

Status:

LIVE
OPEN
UPCOMING
FINISHED

Adicionar botão:

VER TODOS OS TORNEIOS

PÁGINA DE TORNEIOS

Criar:

/tournaments

Adicionar:

Pesquisa

Filtros

Cards

Paginação

Filtros:

Jogo
Estado
Data

Criar botão:

CRIAR TORNEIO

Este botão deve aparecer apenas para administradores.

DETALHES DO TORNEIO

Criar:

/tournaments/:id

Mostrar:

Banner

Nome

Jogo

Data

Hora

Prize Pool

Formato

Regras

Participantes

Classificação

Bracket

Resultados

Botão:

INSCREVER-ME

Se não estiver autenticado:

FAZER LOGIN PARA PARTICIPAR

FORTNITE

Criar uma página dedicada:

/games/fortnite

Esta deve ser uma das páginas mais importantes da plataforma.

Seções:

FORTNITE ANGOLA

RANKING

TOP PLAYERS

TORNEIOS

RESULTADOS

EQUIPAS

NOTÍCIAS

ESTATÍSTICAS

Criar tabela de ranking:

POS
PLAYER
TEAM
POINTS
WINS
TOP 3
TOURNAMENTS
PRIZE MONEY

Criar filtros:

Season
Solo
Duos
Squads

Criar estrutura preparada para futuramente conectar uma API de estatísticas de Fortnite.

Enquanto não existir API configurada, utilizar dados demo.

RANKINGS

Criar:

/rankings

Título:

ANGOLA GAMERS RANKING

Criar tabs:

Fortnite
EA Sports FC
Free Fire
Call of Duty

Tabela:

Posição
Jogador
Equipa
Pontos
Vitórias
Torneios
Prize Money

Criar destaque visual para:

#1
#2
#3

Criar filtros:

Jogo
Temporada
Província

JOGADORES

Criar:

/players

Mostrar cards dos jogadores.

Cada card:

Avatar

Nickname

Nome

Equipa

Jogo principal

Ranking

Pontos

Criar pesquisa.

Criar filtros por jogo.

PERFIL DO JOGADOR

Criar:

/players/:username

Mostrar:

Avatar

Nickname

Nome

Província

Equipa

Bio

Redes sociais

Estatísticas

Ranking

Vitórias

Torneios

Prize Money

Conquistas

Criar gráfico de performance.

Adicionar botão:

SEGUIR

EQUIPAS

Criar:

/teams

Mostrar equipas angolanas.

Cada card:

Logo
Nome
Jogos
Jogadores
Ranking

Criar:

/teams/:id

Mostrar:

Logo

Nome

Descrição

Roster

Jogos

Ranking

Torneios

Conquistas

NOTÍCIAS

Criar:

/news

Design semelhante a um portal moderno de esports.

Categorias:

Gaming Angola
Esports
Fortnite
EA Sports FC
Free Fire
Call of Duty
Tecnologia
Eventos

Cada notícia:

Imagem
Título
Resumo
Categoria
Autor
Data

Criar:

/news/:slug

Página completa da notícia.

Não utilizar lorem ipsum.

Criar conteúdo demo relacionado com gaming e esports em Angola.

EVENTOS

Criar:

/events

Mostrar:

Torneios

LAN parties

Meetups

Eventos gaming

Competições

Eventos universitários

Criar visualização em lista e calendário.

CRIADORES

Criar:

/creators

Mostrar:

Streamers

YouTubers

TikTokers

Criadores de conteúdo gamer

Cada card:

Foto
Nome
Username
Plataforma
Seguidores
Jogos

Criar perfil individual.

ANGOLA GAMERS AWARDS

Criar uma seção especial:

/awards

Título:

ANGOLA GAMERS AWARDS

Subtítulo:

"Celebrando os melhores talentos da comunidade gamer angolana."

Criar edição atual:

ANGOLA GAMERS AWARDS 2026

Categorias:

Gamer do Ano
Jogador de Fortnite do Ano
Jogador de EA Sports FC do Ano
Jogador de Free Fire do Ano
Jogador de Call of Duty do Ano
Melhor Equipa
Melhor Organização
Melhor Streamer
Melhor Criador de Conteúdo
Revelação do Ano
Melhor Evento Gamer

Mostrar:

Nomeados

Fotos

Equipa

Jogo

Número de votos

Percentagem

Adicionar botão:

VOTAR

Criar sistema que permita apenas utilizadores autenticados votarem.

Impedir votos duplicados.

Criar countdown para encerramento das votações.

HALL OF FAME

Criar:

ANGOLA GAMERS AWARDS

2024
2025
2026

Mostrar vencedores anteriores.

Criar cards para:

Gamer do Ano
Melhor Jogador
Melhor Equipa
Melhor Criador
etc.

COMUNIDADE

Criar:

/community

Criar um feed semelhante a uma rede social gamer.

Os utilizadores poderão:

Criar posts

Curtir

Comentar

Partilhar

Seguir jogadores

Procurar teammates

Criar:

COMMUNITY FEED

Cada post deve mostrar:

Avatar
Username
Data
Texto
Imagem opcional
Likes
Comentários

CLIPS

Criar:

/clips

Área para clips gamers.

Categorias:

Fortnite
FC
Free Fire
COD
Outros

Mostrar:

Thumbnail

Username

Jogo

Visualizações

Likes

Criar página para visualizar o clip.

FIND A TEAM

Criar funcionalidade:

FIND YOUR TEAM

Permitir jogadores procurarem outros jogadores.

Filtros:

Jogo
Rank
Plataforma
Província
Modo de jogo

Exemplo:

"Procuro jogadores de Fortnite para competir em torneios."

AUTENTICAÇÃO

Criar:

/login
/register

Permitir:

Email + Password

Preparar OAuth:

Google
Discord

Após login:

Dashboard

DASHBOARD

Criar:

/dashboard

Mostrar:

Olá, [username]

Cards:

Meu Ranking
Meus Torneios
Minha Equipa
Meus Clips
Meus Posts
Minhas Badges

GAMER TAG

Cada jogador deve possuir um identificador único.

Exemplo:

ANG#000124

Mostrar no perfil.

BADGES

Criar sistema de badges.

Exemplos:

TOURNAMENT WINNER
TOP PLAYER
RISING STAR
PRO PLAYER
COMMUNITY LEGEND
ANGOLA GAMERS CHAMPION

Mostrar badges no perfil.

ADMIN DASHBOARD

Criar:

/admin

Apenas administradores podem acessar.

Dashboard com:

Utilizadores
Jogadores
Equipas
Torneios
Notícias
Eventos
Criadores
Awards
Votos

Criar menu:

Dashboard
Users
Players
Teams
Games
Tournaments
Rankings
News
Events
Creators
Awards
Settings

Administradores podem:

Criar
Editar
Eliminar
Publicar
Suspender
Moderar

DATABASE

Criar estrutura Supabase/PostgreSQL.

Tabelas:

profiles
players
teams
team_members
games
tournaments
tournament_participants
matches
match_results
rankings
news
events
creators
posts
comments
likes
clips
awards
award_categories
award_nominees
award_votes
badges
player_badges
followers

Criar relações e constraints.

Garantir que:

Username é único

Email é único

Gamer Tag é único

Um utilizador não consegue votar duas vezes na mesma categoria

SEGURANÇA

Utilizar Supabase Row Level Security.

Regras:

Utilizador comum pode:

Editar o próprio perfil

Criar posts

Comentar

Curtir

Votar

Admin pode:

Gerir toda a plataforma

Nunca permitir que um utilizador comum edite dados de outro jogador.

PESQUISA GLOBAL

Criar pesquisa no header.

Pesquisar:

Jogadores
Equipas
Torneios
Notícias
Eventos
Criadores

Mostrar resultados agrupados.

DESIGN DOS CARDS

Todos os cards devem ter:

Background escuro

Border subtil

Hover effect

Pequena animação

Imagem

Informação clara

Adicionar efeitos:

scale
glow
fade
slide

Não exagerar nas animações.

MOBILE

Garantir excelente experiência mobile.

No smartphone:

Navbar → hamburger

Grids → 1 coluna

Rankings → tabela scrollável

Cards → responsivos

Hero → adaptado

Dashboard → vertical

SEO

Adicionar:

Title
Description
OpenGraph
Favicon
Sitemap
Robots.txt

Homepage:

Title:

Angola Gamers — A Comunidade Gamer de Angola

Description:

"A Angola Gamers é a plataforma da comunidade gamer e esports de Angola. Descubra torneios, rankings, jogadores, equipas, notícias e eventos."

DADOS DEMO

Adicionar dados realistas para demonstração.

Criar:

20 jogadores
8 equipas
6 jogos
10 torneios
15 notícias
10 eventos
10 criadores
Awards 2024
Awards 2025
Awards 2026

Usar nomes fictícios.

Adicionar uma indicação interna de que são dados de demonstração.

FOOTER

Criar footer completo.

ANGOLA GAMERS

LEVEL UP ANGOLA

Links:

Sobre nós
Contacto
Termos
Privacidade
Torneios
Rankings
Comunidade
Awards

Social:

Discord
Instagram
TikTok
YouTube
Facebook
X

REQUISITO MAIS IMPORTANTE

Não criar apenas uma interface bonita.

Quero uma aplicação funcional.

Os dados devem estar estruturados para utilizar Supabase.

Os botões devem funcionar.

As páginas devem estar ligadas.

Login deve funcionar.

Registo deve funcionar.

Pesquisa deve funcionar.

Filtros devem funcionar.

Perfil deve funcionar.

Sistema de votação deve funcionar.

Admin Panel deve funcionar.

Criar loading states.

Criar empty states.

Criar error states.

Criar notificações.

Criar validação de formulários.

PRIORIDADE DE DESENVOLVIMENTO

Desenvolver nesta ordem:

FASE 1:

Design system

Navbar

Homepage

Supabase

Authentication

Database

FASE 2:

Jogos

Fortnite

Jogadores

Equipas

Rankings

FASE 3:

Torneios

Inscrições

Resultados

Brackets

FASE 4:

Notícias

Eventos

Criadores

FASE 5:

Angola Gamers Awards

Votação

Hall of Fame

FASE 6:

Comunidade

Posts

Comentários

Likes

Clips

Find a Team

FASE 7:

Admin Panel

Segurança

SEO

Performance

Responsividade

RESULTADO ESPERADO

Quero que a Angola Gamers pareça uma verdadeira plataforma nacional de gaming e esports.

Não quero uma simples página institucional.

Quero um produto semelhante em conceito a uma plataforma profissional de gaming, mas totalmente adaptado para Angola.

A experiência deve transmitir:

GAMING
ESPORTS
COMPETIÇÃO
COMUNIDADE
ANGOLA

O principal objetivo é criar um lugar onde um jogador angolano possa pensar:

"Este é o lugar onde encontro tudo sobre gaming competitivo em Angola."

Começa pela implementação da aplicação e não apenas pelo design.

Depois de cada grande fase, verifica se existem erros e corrige-os antes de avançar.

No final, garante que a aplicação está funcional, responsiva e pronta para continuar a ser desenvolvida.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1fd3c614-9c74-443e-887b-b32c0d8a349b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
