# Jogo da Semana (GameWeek)

O **Jogo da Semana** é um portal web estático, responsivo e de alta performance desenvolvido sob a arquitetura **Model-View-Controller (MVC)**. O projeto registra e celebra todo o histórico de jogatinas de um grupo de amigos: quem escolheu cada jogo, quem participou das sessões, avaliações, estatísticas, regras oficiais, rankings da comunidade, o temido mural de infratores e um sistema de sorteio de jogos estilo *loot box*.

O site foi construído para ser 100% estático, ultra-rápido e compatível diretamente com o **GitHub Pages**, funcionando perfeitamente sem necessidade de servidores backend ou bancos de dados externos.

---

## 🎨 Principais Recursos e Funcionalidades

### 1. Arquitetura MVC no Frontend
* **Model (`js/model.js`)**: Centraliza as regras de negócio, ordenação, busca textual, deduplicação canônica de participantes, cálculo de probabilidades de sorteio e registros do Quadro da Vergonha.
* **View (`js/view.js`)**: Gerencia o DOM, componentes compartilhados (header dinâmico com navegação e rodapé), carrossel de fotos, animações da roleta CS:GO, modal lightbox e renderização de cards.
* **Controller (`js/controller.js`)**: Coordena eventos, abas responsivas, inputs de busca, filtros, acionamento da roleta e roteamento por parâmetros de URL.

### 2. Sorteio de Jogos Estilo CS:GO Loot Box (`sorteio.html`)
* **Dois Modos de Sorteio**:
  * **Modo Personalizado**: Campo de texto para digitar jogos separados por vírgula. Nomes repetidos aumentam proporcionalmente as chances do jogo ser sorteado.
  * **Modo Jogos Já Jogados**: Catálogo deduplicado de jogos já jogados pelo grupo (desconsiderando semanas/sessões para que cada título apareça uma única vez), com filtros de ativação/desativação e ajuste de chances (tickets).
* **Roleta Dinâmica**: Esteira horizontal com ponteiro centralizador e efeitos sonoros sintéticos (*tick*) em tempo real via **Web Audio API**.
* **Animações de Vitória e Raridades (Lentas e Suaves)**:
  * **Chances Iguais ou Alta Probabilidade (50% a 99%)**: Vitória padrão com giro suave.
  * **Raro (30% até 49%)**: Animação azul contínua com glow envolvente.
  * **Épico (10% até 29%)**: Animação roxa pulsante suave.
  * **Lendário (< 9%)**: Pulso dourado suave com raios rotativos em blur hipnótico.
* **Modal de Vitória**: Exibição limpa e direta do jogo contemplado, sua probabilidade e opções para girar novamente.

### 3. Ranking de Jogadores & Quadro da Vergonha (`participantes.html`)
* **Visão Lado a Lado no Desktop (`lg:grid-cols-2`)**: O ranking oficial de presença dos membros e o mural público de infratores ficam visíveis simultaneamente.
* **Controle de Abas Responsivo para Mobile**: Botões interativos (`Lado a Lado`, `Ranking`, `Vergonha`) com contadores dinâmicos para alternar o foco no celular com um único toque, sem necessidade de rolagem excessiva.
* **Mural de Infrações**: Registro com avatar, identificação da regra oficial violada, jogo, data, motivo da advertência e penalidade aplicada.
* **Menções Integradas**: Tag de alerta no menu de navegação, link no rodapé e banner informativo de conscientização em `regras.html`.

### 4. Melhores do Mês & Pódio (`melhores.html`)
* Agrupa os jogos jogados por mês de início e ordena-os em um pódio de 1º, 2º e 3º lugar com efeito neon pulse na coroa dourada do campeão mensal.

### 5. Catálogo de Categorias (`categorias.html`)
* Estatísticas completas dos gêneros e categorias Steam já jogadas pelo grupo, categorias ainda disponíveis para escolha e categorias proibidas pelas regras do site (com citação da regra correspondente).

### 6. Regras da Comunidade (`regras.html`)
* Painel com as 22 regras oficiais acordadas pelo grupo para escolha, frequência, limites de conteúdo e convivência.

### 7. Detalhes de Cada Jogo (`jogo.html`)
* Rota dinâmica por ID (`?id=slug-do-jogo`), carrossel de fotos, visualização expandida em Lightbox, notas, ficha técnica e feed de comentários semanais com avatares dinâmicos.

### 8. Painel de Estatísticas (`sobre.html`)
* Métricas consolidadas: total de jogos jogados, membros oficiais, média de notas, gêneros predominantes, jogo mais escolhido, recorde de jogadores em sessão e pior jogo já jogado.

### 9. Tema de Cores Dinâmico (`js/theme.js`)
* Sorteia aleatoriamente um dos **8 temas vibrantes** (Roxo, Ciano, Esmeralda, Rosa, Índigo, Laranja, Violeta, Verde-Azulado) persistidos no `sessionStorage` para navegação harmoniosa.

---

## ⚡ Otimização e Performance

* **Imagens em WebP**: Todas as imagens e capturas de tela do repositório foram convertidas para o formato `.webp`, reduzindo o peso total em mais de 70% mantendo alta fidelidade visual.
* **Tailwind CSS Compilado**: O Tailwind CSS não roda mais em runtime via CDN; os estilos são previamente compilados e minificados em `css/tailwind.css` (`npm run build:css`), garantindo carregamento instantâneo.

---

## 📂 Estrutura de Diretórios do Projeto

```text
jogodasemana/
│
├── css/                     # Folhas de estilo compiladas e customizadas
│   ├── tailwind.css         # Tailwind CSS compilado e minificado
│   ├── style.css            # Estilos globais e animações da roleta CS:GO
│   ├── index.css            # Micro-interações da Home
│   ├── jogo.css             # Lightbox e carrossel
│   ├── melhores.css         # Efeito neon da coroa de campeão
│   ├── regras.css           # Estilos dos cartões de regras
│   └── sobre.css            # Estilos dos cartões de métricas
│
├── js/                      # Lógica do projeto estruturado em MVC
│   ├── data.js              # Banco de dados centralizado (GAMES_DATA, SITE_RULES, SHAME_BOARD, etc.)
│   ├── theme.js             # Gerenciador de cores randômicas e persistência de sessão
│   ├── model.js             # Lógica de negócio, estatísticas, probabilidades e filtros
│   ├── view.js              # Injeção no DOM, componentes, roleta e modal de vitória
│   └── controller.js        # Orquestrador de eventos, inputs e abas responsivas
│
├── img/                     # Imagens e capturas dos jogos em formato .webp otimizado
│
├── src/                     # Arquivos fonte do Tailwind CSS
│   └── tailwind.css         # Configuração base de diretivas Tailwind
│
├── index.html               # Página inicial (Histórico de Jogos e Busca)
├── jogo.html                # Detalhes do jogo selecionado (Carrossel e Comentários)
├── melhores.html            # Pódio mensal de melhores jogos
├── participantes.html       # Ranking de Presença & Quadro da Vergonha
├── categorias.html          # Categorias e tags Steam
├── regras.html              # Regras oficiais da jogatina
├── sorteio.html             # Sistema de sorteio de jogos (Loot Box CS:GO)
├── sobre.html               # Estatísticas globais do grupo
├── package.json             # Scripts de build do Tailwind CSS
└── README.md                # Documentação do projeto
```

---

## 🚀 Como Executar Localmente

Como o projeto é construído exclusivamente com tecnologias web estáticas:

1. Clone ou baixe o repositório.
2. Dê um duplo clique no arquivo `index.html` para abri-lo diretamente no navegador, ou use um servidor local simples:
   ```bash
   npx serve .
   ```
3. Para recompilar o Tailwind CSS após editar classes utilitárias:
   ```bash
   npm run build:css
   ```

---

## 🌐 Publicação no GitHub Pages

O projeto está configurado para publicação automática e sem custos no **GitHub Pages**:

1. Suba as alterações para a branch `main` do repositório no GitHub.
2. No repositório, acesse **Settings** > **Pages**.
3. Em **Build and deployment**, selecione a branch `main` e a pasta raiz `/ (root)`.
4. O site estará disponível em instantes na URL fornecida pelo GitHub.
