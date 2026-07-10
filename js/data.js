/**
 * Jogo da Semana - Banco de Dados Estático (Importado do Site Antigo)
 * Contém informações sobre os jogos jogados, regras e informações institucionais.
 */

const GAMES_DATA = [
  {
    id: "rust-1",
    title: "Rust",
    genre: "Ação / Sobrevivência",
    date: "2026-04-20",
    chooser: "BuChuDin",
    participants: ["STX7", "gatólico", "BuChuDin"],
    specialParticipants: [],
    platform: "PC",
    rating: 5.0,
    developer: "Facepunch Studios",
    description: "A sobrevivência definitiva. Os jogadores precisam gerenciar recursos, construir bases e defender seus pertences contra invasões inimigas. Comentário marcante da semana: PQP!!!! RAIDARAM A BASE",
    banner: "img/rust/1.jpeg",
    gallery: ["img/rust/1.jpeg"],
    videoUrl: "",
    comments: [
      {
        author: "BuChuDin",
        avatarSeed: "BuChuDin",
        time: "Final da semana",
        text: "PQP!!!! RAIDARAM A BASE"
      }
    ]
  },
  {
    id: "left-4-dead-2",
    title: "Left 4 Dead 2",
    genre: "FPS / Coop / Zumbis",
    date: "2026-04-27",
    chooser: "STX7",
    participants: ["STX7", "gatólico", "BuChuDin"],
    specialParticipants: [],
    platform: "PC",
    rating: 4.8,
    developer: "Valve",
    description: "Ação clássica cooperativa de tiro em primeira pessoa contra hordas de infectados. O trabalho em equipe é fundamental para a sobrevivência do grupo. Comentário marcante: Nunca deixe molotov na mão do BuChuDin",
    banner: "img/left-4-dead-2/2.jpg",
    gallery: ["img/left-4-dead-2/2.jpg"],
    videoUrl: "",
    comments: [
      {
        author: "STX7",
        avatarSeed: "STX7",
        time: "Final da semana",
        text: "Nunca deixe molotov na mão do BuChuDin"
      }
    ]
  },
  {
    id: "counter-strike-2",
    title: "Counter Strike 2",
    genre: "FPS / Competitivo",
    date: "2026-05-04",
    chooser: "gatólico",
    participants: ["STX7", "gatólico", "BuChuDin"],
    specialParticipants: [],
    platform: "PC",
    rating: 4.0,
    developer: "Valve",
    description: "O ápice do tiro tático competitivo 5v5. O clássico embate de terroristas contra contra-terroristas com gráficos e mecânicas atualizadas na Source 2. Comentário marcante: Perdemos para o Meu Pau, Microsoft Office Excel PRO 2003, Jalim Habei, Thilas Karu Otobah e JunimGameplay123",
    banner: "img/counter-strike-2/3.jpeg",
    gallery: ["img/counter-strike-2/3.jpeg"],
    videoUrl: "",
    comments: [
      {
        author: "gatólico",
        avatarSeed: "gatolico",
        time: "Final da semana",
        text: "Perdemos para o Meu Pau, Microsoft Office Excel PRO 2003, Jalim Habei, Thilas Karu Otobah e JunimGameplay123"
      }
    ]
  },
  {
    id: "enshrouded",
    title: "Enshrouded",
    genre: "Action RPG / Survival / Crafting",
    date: "2026-05-11",
    chooser: "BuChuDin",
    participants: ["STX7", "gatólico", "BuChuDin"],
    specialParticipants: [],
    platform: "PC",
    rating: 2.0,
    developer: "Keen Games",
    description: "Desperte e enfrente a névoa corrompida neste RPG de ação e sobrevivência. Explore um reino vasto construindo bases monumentais e enfrentando chefes temíveis. Comentário marcante: Deu nem tempo de terminar a base e fui assediado",
    banner: "img/enshrouded/4.jpeg",
    gallery: ["img/enshrouded/4.jpeg"],
    videoUrl: "",
    comments: [
      {
        author: "BuChuDin",
        avatarSeed: "BuChuDin",
        time: "Final da semana",
        text: "Deu nem tempo de terminar a base e fui assediado"
      }
    ]
  },
  {
    id: "rust-2",
    title: "Rust (Sessão 2)",
    genre: "Ação / Sobrevivência",
    date: "2026-05-18",
    chooser: "gatólico",
    participants: ["STX7", "gatólico", "BuChuDin", "Mamaco Gelado"],
    specialParticipants: [],
    platform: "PC",
    rating: 4.5,
    developer: "Facepunch Studios",
    description: "Mais uma semana caótica de sobrevivência em Rust. Novas alianças, construções e tentativas frustradas de raidar bases inimigas. Comentário marcante: Amanhã a gente raida denovo (spoiler: fomos raidados)",
    banner: "img/rust/5.jfif",
    gallery: ["img/rust/5.jfif"],
    videoUrl: "",
    comments: [
      {
        author: "gatólico",
        avatarSeed: "gatolico",
        time: "Final da semana",
        text: "Amanhã a gente raida denovo (spoiler: fomos raidados)"
      }
    ]
  },
  {
    id: "rocket-league",
    title: "Rocket League",
    genre: "Esporte / Futebol de Carros",
    date: "2026-05-25",
    chooser: "STX7",
    participants: ["STX34", "edisontoptop", "BuChuDin", "Gustvbr", "Mistake"],
    specialParticipants: [],
    platform: "PC / Consoles",
    rating: 5.0,
    developer: "Psyonix",
    description: "O esporte caótico definitivo. Partidas eletrizantes de futebol disputadas com carros movidos a jato. Acrobacias aéreas e competitividade de alto nível. Comentário marcante: Show de bola",
    banner: "img/rocket-league/6.png",
    gallery: ["img/rocket-league/6.png"],
    videoUrl: "",
    comments: [
      {
        author: "STX7",
        avatarSeed: "STX7",
        time: "Final da semana",
        text: "Show de bola"
      }
    ]
  },
  {
    id: "minecraft-cobbleverse",
    title: "Minecraft: Cobbleverse",
    genre: "Sandbox / Modded / RPG",
    date: "2026-06-01",
    chooser: "BuChuDin",
    participants: ["STX7", "gatólico", "BuChuDin", "pekonino"],
    specialParticipants: [],
    platform: "PC",
    rating: 4.2,
    developer: "Mojang / Comunitário",
    description: "Uma jornada mágica onde Minecraft encontra o universo modificado de Pokémon. Capture, treine e enfrente criaturas fantásticas em um mundo infinito de blocos. Comentário marcante: Eu capturei um Pokemón Batman",
    banner: "img/minecraft-cobbleverse/7.png",
    gallery: ["img/minecraft-cobbleverse/7.png"],
    videoUrl: "",
    comments: [
      {
        author: "BuChuDin",
        avatarSeed: "BuChuDin",
        time: "Final da semana",
        text: "Eu capturei um Pokemón Batman"
      }
    ]
  },
  {
    id: "the-forest",
    title: "The Forest",
    genre: "Ação / Sobrevivência / Horror",
    date: "2026-06-08",
    chooser: "gatólico",
    participants: ["gatólico", "BuChuDin", "STX7", "Gustvbr"],
    specialParticipants: [],
    platform: "PC",
    rating: 5.0,
    developer: "Endnight Games",
    description: "Sobreviva em uma floresta misteriosa repleta de perigos, construindo abrigos e enfrentando uma sociedade de mutantes canibais. Comentário marcante: Viriginia e o Zé Felipe.",
    banner: "img/the-forest/The Forest (1).jpeg",
    gallery: [
      "img/the-forest/The Forest (1).jpeg",
      "img/the-forest/The Forest (2).jpeg",
      "img/the-forest/The Forest (3).jpeg",
      "img/the-forest/The Forest (4).jpeg",
      "img/the-forest/The Forest (5).jpeg",
      "img/the-forest/The Forest (6).jpeg",
      "img/the-forest/The Forest (7).jpeg",
      "img/the-forest/The Forest (8).jpeg",
      "img/the-forest/The Forest (9).jpeg",
      "img/the-forest/The Forest (10).jpeg",
      "img/the-forest/The Forest (11).jpeg"
    ],
    videoUrl: "",
    comments: [
      {
        author: "gatólico",
        avatarSeed: "gatolico",
        time: "Final da semana",
        text: "Viriginia e o Zé Felipe."
      },
      {
        author: "STX7",
        avatarSeed: "STX7",
        time: "Final da semana",
        text: "MADEIRA INFINITA, FODA-SE kkkkkkkkkk"
      }
    ]
  },
  {
    id: "rust-3",
    title: "Rust (Sessão 3)",
    genre: "Ação / Sobrevivência",
    date: "2026-06-15",
    chooser: "STX7",
    participants: ["BuChuDin", "STX7", "mamaco gelado", "gatólico", "Mistake"],
    specialParticipants: [],
    platform: "PC",
    rating: 3.5,
    developer: "Facepunch Studios",
    description: "Mais uma semana caótica no deserto impiedoso de Rust, repleta de combates armados e intrigas na vizinhança. Comentários marcantes: A bala aqui não é perdida / Lugar tranquilo e super seguro.",
    banner: "img/rust/RustS3 (1).jpeg",
    gallery: [
      "img/rust/RustS3 (1).jpeg",
      "img/rust/RustS3 (2).jpeg",
      "img/rust/RustS3 (3).jpeg"
    ],
    videoUrl: "",
    comments: [
      {
        author: "BuChuDin",
        avatarSeed: "BuChuDin",
        time: "Final da semana",
        text: "A bala aqui não é perdida."
      },
      {
        author: "mamaco gelado",
        avatarSeed: "mamaco",
        time: "Final da semana",
        text: "Lugar tranquilo e super seguro."
      },
      {
        author: "gatólico",
        avatarSeed: "gatolico",
        time: "Final da semana",
        text: "Ótimos vizinhos."
      }
    ]
  },
  {
    id: "minecraft-all-the-mods-10",
    title: "Minecraft: All The Mods 10",
    genre: "Sandbox / Modded / RPG",
    date: "2026-06-22",
    chooser: "BuChuDin",
    participants: ["BuChuDin", "STX7", "ediisu", "Gustvbr", "pekonino", "pamonhadesal"],
    specialParticipants: [],
    platform: "PC",
    rating: 4.0,
    developer: "Comunidade ATM",
    description: "Exploração massiva em um pacote gigantesco contendo centenas de modificações para o Minecraft, abrangendo magia, tecnologia e novas dimensões de aventura.",
    banner: "",
    gallery: [],
    videoUrl: "",
    comments: []
  },
  {
    id: "mecha-chamelon",
    title: "Mecha Chamelon",
    genre: "Ação / Cooperativo / Indie",
    date: "2026-06-29",
    chooser: "gatólico",
    participants: ["BuChuDin", "gatólico", "STX7", "Gustvbr", "pekonino", "pamonhadesal"],
    specialParticipants: [],
    platform: "PC",
    rating: 5.0,
    developer: "Indie / Comunitário",
    description: "Batalhas caóticas de robôs mecânicos em arenas virtuais destrutíveis. Comentários marcantes: Bora fazer uma cópia desse jogo? / Assobia se for macho.",
    banner: "img/mecha-chamelon/image.webp",
    gallery: [
      "img/mecha-chamelon/image.webp",
      "img/mecha-chamelon/image (1).webp",
      "img/mecha-chamelon/image (2).webp",
      "img/mecha-chamelon/image (3).webp",
      "img/mecha-chamelon/image (4).webp",
      "img/mecha-chamelon/image (5).webp",
      "img/mecha-chamelon/image (6).webp",
      "img/mecha-chamelon/Mecha Chameleon (1).jpeg",
      "img/mecha-chamelon/Mecha Chameleon (2).jpeg",
      "img/mecha-chamelon/Mecha Chameleon (3).jpeg"
    ],
    videoUrl: "",
    comments: [
      {
        author: "BuChuDin",
        avatarSeed: "BuChuDin",
        time: "Final da semana",
        text: "Bora fazer uma cópia desse jogo só que melhor?"
      },
      {
        author: "pekonino",
        avatarSeed: "pekonino",
        time: "Final da semana",
        text: "Nunca vão me achar (estava fora do mapa)."
      },
      {
        author: "gatólico",
        avatarSeed: "gatolico",
        time: "Final da semana",
        text: "Assobia se for macho."
      }
    ]
  },
  {
    id: "devour",
    title: "Devour",
    genre: "Coop / Terror / Sobrevivência",
    date: "2026-07-06",
    chooser: "STX7",
    participants: ["BuChuDin", "STX7", "Gustvbr"],
    specialParticipants: [],
    platform: "PC",
    rating: 4.7,
    developer: "Straight Back Games",
    description: "Jogo cooperativo de sobrevivência e terror extremo. Trabalhe em equipe para impedir que sectários possuídos arrastem vocês para o inferno.",
    banner: "img/devour/Devour (1).jpeg",
    gallery: [
      "img/devour/Devour (1).jpeg",
      "img/devour/Devour (2).jpeg",
      "img/devour/Devour (3).jpeg"
    ],
    videoUrl: "",
    comments: []
  }
];

const SITE_RULES = [
  {
    number: 1,
    title: "Cumprimento Obrigatório",
    description: "As regras não podem ser descumpridas sob nenhuma circunstância."
  },
  {
    number: 2,
    title: "Tempo de Espera para Escolha",
    description: "Deve-se esperar 2 semanas para escolher novamente o mesmo jogo."
  },
  {
    number: 3,
    title: "Escolha de Jogos Pagos",
    description: "Jogo pago que os membros ainda não possuam só pode ser escolhido em início de mês."
  },
  {
    number: 4,
    title: "Troca de Semanas",
    description: "Caso alguém queira trocar a semana de escolha com outro membro, a troca pode ser feita livremente."
  },
  {
    number: 5,
    title: "Restrição de Conteúdo Explícito",
    description: "Não são permitidos jogos hentai (todo jogo que mostrar um mamilozinho ou xerequinha explícita)."
  },
  {
    number: 6,
    title: "Restrição de Jogos de Navegador",
    description: "Não são permitidos jogos de navegador."
  },
  {
    number: 7,
    title: "Regra para Convidados",
    description: "Pode-se convidar outros membros de fora, contudo eles não têm direito a voto e não estão sujeitos a estas regras."
  },
  {
    number: 8,
    title: "Permanência do Escolhedor",
    description: "A pessoa que escolheu o jogo deve obrigatoriamente ser a última a parar de jogar."
  },
  {
    number: 9,
    title: "Ausência por Viagem",
    description: "Em caso de viagem, se for a vez da pessoa escolher, ela perde a vez naquela semana e outra pessoa escolhe."
  },
  {
    number: 10,
    title: "Sem Desculpas Subjetivas",
    description: "Não serão aceitas desculpas como 'eu tenho medo', 'eu não gosto desse tipo de jogo' ou qualquer outra desculpa. Todos os membros devem jogar."
  },
  {
    number: 11,
    title: "Ajuda de Acesso ao Jogo",
    description: "Caso o membro não tenha o jogo, os demais membros (principalmente aquele que escolheu) devem ajudar a obter o jogo mediante empréstimo ou conta compartilhada."
  },
  {
    number: 12,
    title: "Jogos Singleplayer Proibidos",
    description: "Não são válidos jogos que só uma pessoa pode jogar."
  },
  {
    number: 13,
    title: "Multiplayer Obrigatório",
    description: "O jogo escolhido deve obrigatoriamente possuir modo multiplayer."
  },
  {
    number: 14,
    title: "Ajuda em Jogos de Nível (RPG)",
    description: "Em jogos de upar nível, a pessoa com o nível mais alto deve obrigatoriamente ajudar os membros com níveis mais baixos."
  },
  {
    number: 15,
    title: "Suporte do Computador",
    description: "Se o computador de algum membro não suporta o jogo escolhido, deverá ser escolhido outro jogo."
  },
  {
    number: 16,
    title: "Restrição de Jogos de Celular",
    description: "Jogos de celular não serão aceitos."
  },
  {
    number: 17,
    title: "Validade do Tempo de Jogo",
    description: "O tempo de gameplay é válido durante toda aquela semana, não limitado somente ao final de semana."
  },
  {
    number: 18,
    title: "Definição do Jogo na Segunda",
    description: "Todo jogo deve ser definido e anunciado na segunda-feira."
  },
  {
    number: 19,
    title: "Período para Repetir Título",
    description: "Deve-se esperar 2 semanas a partir do último dia jogado para escolher o mesmo jogo novamente."
  },
  {
    number: 20,
    title: "Tempo Mínimo Juntos",
    description: "Todos os membros devem obrigatoriamente jogar o jogo escolhido naquela semana por pelo menos cinco horas juntos."
  },
  {
    number: 21,
    title: "Jogabilidade Inviável",
    description: "Se o jogo se provar impossível de ser jogado em grupo, então deverá ser escolhido outro jogo."
  },
  {
    number: 22,
    title: "Unanimidade para Alterações",
    description: "Uma regra só pode ser alterada se todos os membros concordarem."
  }
];

const ABOUT_INFO = {
  description: "O projeto 'Jogo da Semana' nasceu da necessidade de um grupo de amigos de combater o famoso 'backlog' (a lista de jogos comprados e nunca jogados) e criar uma rotina divertida para manter a jogatina conjunta ativa. A cada semana, um membro é sorteado ou segue a fila para escolher um título. Todos jogam e se reúnem para discutir, avaliar e registrar as memórias no site oficial.",
  stats: {
    get totalGames() {
      return GAMES_DATA.length;
    },
    get activeMembers() {
      const coreMembers = new Set(["STX7", "gatólico", "BuChuDin"]);
      return coreMembers.size;
    },
    get averageRating() {
      if (GAMES_DATA.length === 0) return 0;
      const sum = GAMES_DATA.reduce((acc, g) => acc + g.rating, 0);
      return (sum / GAMES_DATA.length).toFixed(2);
    },
    get primaryGenre() {
      if (GAMES_DATA.length === 0) return "Nenhum";
      const counts = {};
      GAMES_DATA.forEach(g => {
        const primary = g.genre.split(" / ")[0];
        counts[primary] = (counts[primary] || 0) + 1;
      });
      let bestGenre = "";
      let maxCount = 0;
      for (const genre in counts) {
        if (counts[genre] > maxCount) {
          maxCount = counts[genre];
          bestGenre = genre;
        }
      }
      return bestGenre;
    },
    get mostPlayedGame() {
      if (GAMES_DATA.length === 0) return "Nenhum";
      const counts = {};
      GAMES_DATA.forEach(g => {
        // Limpa o nome do jogo para agrupar (ex: "Rust (Sessão 2)" vira "Rust")
        const baseName = g.title.split(/[(\-:]/)[0].trim();
        counts[baseName] = (counts[baseName] || 0) + 1;
      });
      let bestGame = "";
      let maxCount = 0;
      for (const game in counts) {
        if (counts[game] > maxCount) {
          maxCount = counts[game];
          bestGame = game;
        }
      }
      return bestGame ? `${bestGame} (${maxCount}x escolhido)` : "Nenhum";
    },
    get gameWithMostPlayers() {
      if (GAMES_DATA.length === 0) return "Nenhum";
      let bestGame = null;
      let maxCount = -1;
      GAMES_DATA.forEach(g => {
        const count = g.participants.length;
        if (count > maxCount) {
          maxCount = count;
          bestGame = g;
        }
      });
      return bestGame ? `${bestGame.title} (${maxCount} pessoas)` : "Nenhum";
    },
    get worstGame() {
      if (GAMES_DATA.length === 0) return "Nenhum";
      let worst = null;
      let minRating = Infinity;
      GAMES_DATA.forEach(g => {
        if (g.rating < minRating) {
          minRating = g.rating;
          worst = g;
        }
      });
      return worst ? `${worst.title} (Nota: ${worst.rating.toFixed(1)})` : "Nenhum";
    }
  }
};
