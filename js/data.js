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
    participants: ["STX7", "Gatólico", "BuChuDin"],
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
    participants: ["STX7", "Gatólico", "BuChuDin"],
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
    chooser: "Gatólico",
    participants: ["STX7", "Gatólico", "BuChuDin"],
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
        author: "Gatólico",
        avatarSeed: "Gatólico",
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
    participants: ["STX7", "Gatólico", "BuChuDin"],
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
    chooser: "Gatólico",
    participants: ["STX7", "Gatólico", "BuChuDin", "Mamaco Gelado"],
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
        author: "Gatólico",
        avatarSeed: "Gatólico",
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
    participants: ["STX7", "Gatólico", "BuChuDin", "Gustvbr", "Mistake"],
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
    participants: ["STX7", "ediisu", "BuChuDin", "pekonino"],
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
    chooser: "Gatólico",
    participants: ["Gatólico", "BuChuDin", "STX7", "Gustvbr"],
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
        author: "Gatólico",
        avatarSeed: "Gatólico",
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
    participants: ["BuChuDin", "STX7", "Mamaco Gelado", "Gatólico", "Mistake"],
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
        author: "Gatólico",
        avatarSeed: "Gatólico",
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
    chooser: "Gatólico",
    participants: ["BuChuDin", "Gatólico", "STX7", "Gustvbr", "pekonino", "pamonhadesal"],
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
        author: "Gatólico",
        avatarSeed: "Gatólico",
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
    participants: ["BuChuDin", "STX7", "Gatólico", "Gustvbr"],
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
    videoUrl: "https://youtu.be/16OTjrPWUbQ",
    comments: []
  },
  {
    id: "deadlock",
    title: "Deadlock",
    genre: "Hero Shooter / MOBA",
    date: "2026-07-13",
    chooser: "BuChuDin",
    participants: ["BuChuDin", "STX7", "Gustvbr", "Gatólico", "Mamaco Gelado", "pekonino", "Chicão da Massa"],
    specialParticipants: [],
    platform: "PC (Steam)",
    rating: 4.7,
    developer: "Valve",
    description: "Deadlock é um jogo multijogador 6v6 de tiro em terceira pessoa com fortes elementos de MOBA (como rotas, tropas, torres, chefes e compra de itens), desenvolvido pela Valve. O jogo combina a ação rápida e o uso de habilidades dos hero shooters com a estratégia e a progressão de partidas de defesa de base, tudo ambientado em uma versão alternativa de Nova York com temática ocultista e fantasia urbana da década de 1930.",
    banner: "img/deadlock/banner.png",
    gallery: [
        "img/deadlock/deadlock-1.jpeg",
        "img/deadlock/deadlock-2.jpeg",
        "img/deadlock/deadlock-3.jpeg"
    ],
    videoUrl: "https://www.youtube.com/watch?v=-JtupkqFhuo&feature=youtu.be",
    comments: [
      {
        author: "BuChuDin",
        avatarSeed: "BuChuDin",
        time: "Final da Semana",
        text: "É tipo Overwatch só que bom"
      },
      {
        author: "STX7",
        avatarSeed: "STX7",
        time: "Final da Semana",
        text: "É legal, só falta aprender a farmar, montar build, conhecer o mapa, conhecer os heróis, melhorar a mira, micro, macro, rotação de wave, skill issues"
      },
      {
        author: "Gustvbr",
        avatarSeed: "Gustvbr",
        time: "Final da Semana",
        text: "Jogável"
      },
      {
        author: "mamaco gelado",
        avatarSeed: "mamaco gelado",
        time: "Final da Semana",
        text: "Muito bom, só que ainda tá no BETA"
      },
      {
        author: "Chicão da Massa",
        avatarSeed: "Chicão da Massa",
        time: "Final da Semana",
        text: "O que tá acontecendo?"
      }
    ]
  },
  {
    id: "battlefield-1-revolution",
    title: "Battlefield 1 Revolution",
    genre: "FPS / Multiplayer / Primeira Guerra",
    date: "2026-07-20",
    chooser: "Edisontoptop",
    participants: ["STX7", "Edisontoptop", "BuChuDin", "Mamaco Gelado", "Gustvbr", "Chicão da Massa"],
    specialParticipants: [],
    platform: "PC",
    rating: 4.5,
    developer: "DICE",
    description: "A ação épica da Primeira Guerra Mundial em 64 jogadores. Destrua ambientes, pilotem veículos e use gadgets militares clássicos em mapas massivos. Comentário marcante: Até parece que eu tô na guerra mesmo",
    banner: "img/battlefield-1-revolution/20260721215954_1.jpg",
    gallery: ["img/battlefield-1-revolution/20260721215954_1.jpg","img/battlefield-1-revolution/20260724210419_1.jpg","img/battlefield-1-revolution/20260724215217_1.jpg","img/battlefield-1-revolution/20260724230744_1.jpg","img/battlefield-1-revolution/20260725212936_1.jpg","img/battlefield-1-revolution/20260725212939_1.jpg","img/battlefield-1-revolution/20260726215454_1.jpg","img/battlefield-1-revolution/20260726215505_1.jpg","img/battlefield-1-revolution/20260726215508_1.jpg","img/bf1/bf1-1.jpeg","img/bf1/bf1-2.jpeg"],
    videoUrl: "",
    comments: [
      {
        author: "STX7",
        avatarSeed: "STX7",
        time: "Final da Semana",
        text: "Até parece que eu tô na guerra mesmo"
      },
      {
        author: "Edisontoptop",
        avatarSeed: "Edisontoptop",
        time: "Final da Semana",
        text: "Até parece que é a guerra"
      },
      {
        author: "BuChuDin",
        avatarSeed: "BuChuDin",
        time: "Final da Semana",
        text: "Até parece que eu tô na guerra"
      },
      {
        author: "mamaco gelado",
        avatarSeed: "mamaco gelado",
        time: "Final da Semana",
        text: "Até parece que tamo na guerra"
      },
      {
        author: "Gustvbr",
        avatarSeed: "Gustvbr",
        time: "Final da Semana",
        text: "Até parece que eu tô lá na guerra"
      },
      {
        author: "Chicão da Massa",
        avatarSeed: "Chicão da Massa",
        time: "Final da Semana",
        text: "Até parece que tô na guerra, irmão"
      }
    ]
  },
  {
    id: "minecraft-vanilla",
    title: "Minecraft Vanilla",
    genre: "Sandbox / Sobrevivência",
    date: "2026-07-27",
    chooser: "STX7",
    participants: ["BuChuDin", "STX7", "ediisu", "Gustvbr", "pekonino", "pamonhadesal"],
    specialParticipants: [],
    platform: "PC",
    rating: 4.0,
    developer: "Mojang",
    description: "Uma jornada clássica de sobrevivência no Minecraft em sua versão padrão, construindo abrigo, minerando e explorando o mundo.",
    banner: "img/minecraft-vanilla/2026-07-26_18.02.20.png",
    gallery: [
      "img/minecraft-vanilla/2026-07-26_18.02.20.png",
      "img/minecraft-vanilla/2026-07-26_18.07.26.png",
      "img/minecraft-vanilla/2026-07-26_18.10.50.png",
      "img/minecraft-vanilla/2026-07-28_22.15.56.png",
      "img/minecraft-vanilla/2026-07-28_22.15.57.png",
      "img/minecraft-vanilla/2026-07-28_22.42.50.png",
      "img/minecraft-vanilla/2026-07-29_20.32.32.png",
      "img/minecraft-vanilla/2026-07-29_22.17.22.png",
      "img/minecraft-vanilla/2026-08-02_13.06.34.png",
      "img/minecraft-vanilla/2026-08-02_13.06.42.png",
      "img/minecraft-vanilla/2026-08-02_14.01.18.png",
      "img/minecraft-vanilla/2026-08-02_14.16.02.png",
      "img/minecraft-vanilla/2026-08-02_14.27.14.png",
      "img/minecraft-vanilla/2026-08-02_14.43.57.png"
    ],
    videoUrl: "",
    comments: [
      {
        author: "BuChuDin",
        avatarSeed: "BuChuDin",
        time: "Final da Semana",
        text: "porque tem um bloco de comando aqui?"
      },
      {
        author: "pekonino",
        avatarSeed: "pekonino",
        time: "Final da Semana",
        text: "Odeio concreto branco."
      },
      {
        author: "pamonhadesal",
        avatarSeed: "pamonhadesal",
        time: "Final da Semana",
        text: "E essa vila aqui?"
      },
      {
        author: "Gustvbr",
        avatarSeed: "Gustvbr",
        time: "Final da Semana",
        text: "..."
      },
      {
        author: "STX7",
        avatarSeed: "STX7",
        time: "Final da Semana",
        text: "desde a 1.5 bla bla bla ..."
      }
    ]
  },
  {
    id: "deadlock-2",
    title: "Deadlock (Sessão 2)",
    genre: "Hero Shooter / MOBA",
    date: "2026-08-03",
    chooser: "BuChuDin",
    participants: ["Gatólico", "STX7", "Mamaco Gelado", "Chicão da Massa", "BuChuDin"],
    specialParticipants: [],
    platform: "PC (Steam)",
    rating: 4.0,
    developer: "Valve",
    description: "Gabriel foi viajar e o grupo aproveitou para disputar partidas de Deadlock.",
    banner: "img/deadlock/sessao2-1.jpg",
    gallery: [
      "img/deadlock/sessao2-1.jpg",
      "img/deadlock/sessao2-2.jpg",
      "img/deadlock/sessao2-3.jpg",
      "img/deadlock/sessao2-4.jpg",
      "img/deadlock/sessao2-5.jpg",
      "img/deadlock/sessao2-6.jpg",
      "img/deadlock/sessao2-7.jpg"
    ],
    videoUrl: "",
    comments: [
      {
        author: "STX7",
        avatarSeed: "STX7",
        time: "Final da Semana",
        text: "peteco peteco peteco"
      },
      {
        author: "Mamaco Gelado",
        avatarSeed: "Mamaco Gelado",
        time: "Final da Semana",
        text: "Uiiiiihhh,Iupiiiiiiii!!!"
      },
      {
        author: "BuChuDin",
        avatarSeed: "BuChuDin",
        time: "Final da Semana",
        text: "O cara instalou hoje"
      },
      {
        author: "Gatólico",
        avatarSeed: "Gatólico",
        time: "Final da Semana",
        text: "até semana que vem"
      }
    ]
  },
  {
    id: "valorant",
    title: "Valorant",
    genre: "FPS / Competitivo / Hero Shooter",
    date: "2026-08-10",
    chooser: "Gatólico",
    participants: ["BuChuDin", "Mamaco Gelado", "Gatólico", "STX7", "pamonhadesal"],
    specialParticipants: [],
    platform: "PC",
    rating: 3.7,
    developer: "Riot Games",
    description: "Disputa tática de tiro em primeira pessoa 5v5 focado em personagens e habilidades.",
    banner: "img/valorant/images.jpg",
    gallery: ["img/valorant/valorant.jpeg"],
    videoUrl: "",
    comments: [
      {
        author: "STX7",
        avatarSeed: "STX7",
        time: "Final da Semana",
        text: "a melhor parte é a de desinstalar."
      }
    ]
  },
  {
    id: "minecraft-all-the-mods-11",
    title: "Minecraft: All The Mods 11",
    genre: "Sandbox / Modded / RPG",
    date: "2026-08-17",
    chooser: "STX7",
    participants: ["STX7", "ediisu", "BuChuDin", "Gustvbr"],
    specialParticipants: [],
    platform: "PC",
    rating: 4.2,
    developer: "Comunidade ATM",
    description: "Mais nova iteração do pacote All The Mods para Minecraft, trazendo as modificações mais recentes e atualizadas da comunidade.",
    banner: "img/atm11/2026-08-18_20.20.40.png",
    gallery: [
      "img/atm11/2026-08-18_20.20.40.png",
      "img/atm11/2026-08-18_20.20.44.png",
      "img/atm11/2026-08-20_21.08.41.png",
      "img/atm11/2026-08-20_21.42.04.png",
      "img/atm11/2026-08-22_22.34.01.png",
      "img/atm11/2026-08-23_21.01.56.png",
      "img/atm11/2026-09-10_20.49.20.png",
      "img/atm11/2026-09-10_20.49.28.png",
      "img/atm11/2026-09-10_20.49.41.png",
      "img/atm11/2026-09-10_20.53.44.png",
      "img/atm11/2026-09-10_20.53.48.png",
      "img/atm11/2026-09-10_20.53.49.png"
    ],
    videoUrl: "",
    comments: [
      {
        author: "BuChuDin",
        avatarSeed: "BuChuDin",
        time: "Final da semana",
        text: "Ta no beta ainda"
      },
      {
        author: "ediisu",
        avatarSeed: "ediisu",
        time: "Final da semana",
        text: "Não tem Mekanism, não tem Mahou, não tem create, não tem iron spells, não tem ...."
      },
      {
        author: "STX7",
        avatarSeed: "STX7",
        time: "Final da semana",
        text: "SANGUE INFINITO FODA-SE KKKKKKKKK"
      }
    ]
  },
  {
    id: "deadlock-3",
    title: "Deadlock (Sessão 3)",
    genre: "Hero Shooter / MOBA",
    date: "2026-08-24",
    chooser: "BuChuDin",
    participants: ["Gatólico", "STX7", "Mamaco Gelado", "BuChuDin"],
    specialParticipants: [],
    platform: "PC (Steam)",
    rating: 4.1,
    developer: "Valve",
    description: "BuChuDin tava sem ideias, mas dessa vez sabemos jogar.",
    banner: "img/deadlock/banner.png",
    gallery: ["img/deadlock/deadlock-sessao3.png"],
    videoUrl: "",
    comments: [
      {
        author: "Gatólico",
        avatarSeed: "Gatólico",
        time: "Final da Semana",
        text: "De novo não"
      },
      {
        author: "mamaco gelado",
        avatarSeed: "mamaco gelado",
        time: "Final da Semana",
        text: "Meu porteiro"
      },
      {
        author: "STX7",
        avatarSeed: "STX7",
        time: "Final da Semana",
        text: "Ahhhhhhhhh"
      },
      {
        author: "BuChuDin",
        avatarSeed: "BuChuDin",
        time: "Final da Semana",
        text: "é o deads é o locks"
      }
    ]
  },
  {
    id: "how-to-fish",
    title: "How to Fish",
    genre: "Ação, Casual, Indie, Simulação",
    date: "2026-08-31",
    chooser: "Gatólico",
    participants: ["STX7", "Gatólico", "BuChuDin", "Gustvbr"],
    specialParticipants: [],
    platform: "PC",
    rating: 5.0,
    developer: "Dazed Games",
    description: "How to Fish é um simulador de pesca baseado em física para 1-4 jogadores. Enquanto bebia e navegava, você acaba batendo em uma pequena ilha. Para conseguir voltar para casa, você precisa aprender a pescar.",
    banner: "img/how-to-fish/How-to-fish.jpg",
    gallery: ["img/how-to-fish/How-to-fish.jpg","img/how-to-fish/How-to-fish-1.jpg","img/how-to-fish/How-to-fish-2.jpg","img/how-to-fish/How-to-fish-3.jpg","img/how-to-fish/How-to-fish-4.jpg","img/how-to-fish/How-to-fish-5.jpg","img/how-to-fish/How-to-fish-6.jpg","img/how-to-fish/How-to-fish-7.jpg","img/how-to-fish/How-to-fish-8.jpg"],
    videoUrl: "",
    comments: [
      {
        author: "Gatólico",
        avatarSeed: "Gatólico",
        time: "Final da Semana",
        text: "Atiraram em mim de novo"
      },
      {
        author: "BuChuDin",
        avatarSeed: "BuChuDin",
        time: "Final da Semana",
        text: "Depois de fazer tudo n tem mais oq fazer"
      },
      {
        author: "STX7",
        avatarSeed: "STX7",
        time: "Final da Semana",
        text: "Aposta tudo no verde"
      },
    ],
  },
  {
    id: "7-days-to-die-1",
    title: "7 Days to Die",
    genre: "Sobrevivência / Zumbis",
    date: "2026-09-07",
    chooser: "STX7",
    participants: ["STX7", "Mamaco gelado", "Gatólico", "BuChuDin"],
    specialParticipants: [],
    platform: "PC",
    rating: 4.5,
    developer: "The Fun Pimps",
    description: "Sobrevivência em um mundo apocalíptico repleto de zumbis, com construção de bases e hordas a cada sete dias.",
    banner: "img/7-days-to-die-1/2021C01.JPG",
    gallery: ["img/7-days-to-die-1/2021C01.JPG","img/7-days-to-die-1/20260907202220_1.jpg","img/7-days-to-die-1/20260907221153_1.jpg","img/7-days-to-die-1/20260908234025_1.jpg","img/7-days-to-die-1/20260910225521_1.jpg","img/7-days-to-die-1/20260911223904_1.jpg","img/7-days-to-die-1/20260912011640_1.jpg","img/7-days-to-die-1/2026092.JPG","img/7-days-to-die-1/20AC0F1.JPG","img/7-days-to-die-1/20BA651.JPG","img/7-days-to-die-1/20BC5A1.JPG","img/7-days-to-die-1/image.png"],
    videoUrl: "",
    comments: [
      { author: "STX7", avatarSeed: "STX7", time: "Final da Semana", text: "A vagabunda que grita me odeia >:(" },
      { author: "Gatólico", avatarSeed: "Gatólico", time: "Final da Semana", text: "Não da pra mais de um abrir bau ao mesmo tempo?" }
    ]
  },
  {
    id: "valheim",
    title: "Valheim",
    genre: "Sobrevivência / Exploração",
    date: "2026-09-14",
    chooser: "Mistake",
    participants: ["STX7", "Mistake", "BuChuDin", "Gatólico", "Mamaco Gelado"],
    specialParticipants: [],
    platform: "PC",
    rating: 4.0,
    developer: "Iron Gate Studio",
    description: "Sobrevivência cooperativa inspirada na mitologia nórdica. Escolha de Mistake (convidado).",
    banner: "img/valheim/20260914195007_1.jpg",
    gallery: ["img/valheim/2026091.JPG","img/valheim/20260914192416_1.jpg","img/valheim/20260914195007_1.jpg","img/valheim/20260914205018_1.jpg","img/valheim/20260915220239_1.jpg","img/valheim/2026092.JPG","img/valheim/image.png","img/valheim/image3.png","img/valheim/image4.png","img/valheim/image5.png"],
    videoUrl: "",
    comments: [
      { author: "STX7", avatarSeed: "STX7", time: "Final da Semana", text: "MADEIRAAAAAAAAAAAAA!!!!" },
      { author: "Mistake", avatarSeed: "Mistake", time: "Final da Semana", text: "Mano, oque ele ta fazendo" },
      { author: "Mamaco Gelado", avatarSeed: "Mamaco Gelado", time: "Final da Semana", text: "É fazenda de Ogro, tem que ter Ogro lá fora" }
    ]
  },
  {
    id: "dont-starve-together",
    title: "Don't Starve Together",
    genre: "Sobrevivência / Cooperativo",
    date: "2026-09-21",
    chooser: "BuChuDin",
    participants: ["STX7", "BuChuDin", "Mamaco Gelado", "Gustvbr", "Gatólico"],
    specialParticipants: [],
    platform: "PC",
    rating: 4.2,
    developer: "Klei Entertainment",
    description: "Sobrevivência em um mundo sombrio e peculiar, agora em cooperativo.",
    banner: "img/dont-starve-togheter/dont-banner.webp",
    gallery: ["img/dont-starve-togheter/dont1.jpg", "img/dont-starve-togheter/dont2.jpg", "img/dont-starve-togheter/dont3.jpg", "img/dont-starve-togheter/dont4.jpg"],
    videoUrl: "",
    comments: [
      { author: "STX7", avatarSeed: "STX7", time: "Final da Semana", text: "Don't Starve não é muito together assim" },
      { author: "BuChuDin", avatarSeed: "BuChuDin", time: "Final da Semana", text: "Cadê as carnes?" },
      { author: "Gatólico", avatarSeed: "Gatólico", time: "Final da Semana", text: "Gente, não deixa carne no chão, as aranhas comem" },
      { author: "Mamaco Gelado", avatarSeed: "Mamaco Gelado", time: "Final da Semana", text: "500 madeiras e um sonho" }
    ]
  },
  {
    id: "minecraft-vanilla-2",
    title: "Minecraft Vanilla (Sessão 2)",
    genre: "Sandbox / Sobrevivência",
    date: "2026-09-28",
    chooser: "Ediisu",
    participants: ["BuChuDin", "Ediisu", "STX7", "Gustvbr", "Pekonino"],
    specialParticipants: [],
    platform: "PC",
    rating: 4.0,
    developer: "Mojang Studios",
    description: "Mais uma semana no mundo de blocos. Escolha de Ediisu.",
    banner: "img/minecraft-vanilla-2/2026-10-02_23.50.10_2.png",
    gallery: ["img/minecraft-vanilla-2/2026-10-02_23.50.10_2.png","img/minecraft-vanilla-2/2026-10-02_23.52.46.png","img/minecraft-vanilla-2/2026-10-02_23.55.10.png"],
    videoUrl: "",
    comments: [
      { author: "BuChuDin", avatarSeed: "BuChuDin", time: "Final da Semana", text: "Ja ta melhor que os biomas do ATM 11" },
      { author: "Ediisu", avatarSeed: "Ediisu", time: "Final da Semana", text: "A composteira emite 8 de carga de redstone?" },
      { author: "STX7", avatarSeed: "STX7", time: "Final da Semana", text: "Porque o Enderman é o unico mob que rouba blocos?" },
      { author: "Gustvbr", avatarSeed: "Gustvbr", time: "Final da Semana", text: "..." }
    ]
  },
  {
    id: "7-days-to-die-2",
    title: "7 Days to Die (Sessão 2)",
    genre: "Sobrevivência / Zumbis",
    date: "2026-10-05",
    chooser: "STX7",
    participants: ["STX7", "Mamaco gelado", "Gatólico", "BuChuDin"],
    specialParticipants: [],
    platform: "PC",
    rating: 4.7,
    developer: "The Fun Pimps",
    description: "A volta do apocalipse zumbi com mais construção, hordas e muitas armas improvisadas.",
    banner: "img/7-days-to-die-2/image2.png",
    gallery: ["img/7-days-to-die-2/20261009195536_1.jpg","img/7-days-to-die-2/20261009220642_1.jpg","img/7-days-to-die-2/20261010165123_1.jpg","img/7-days-to-die-2/image.png","img/7-days-to-die-2/image2.png","img/7-days-to-die-2/image3.png","img/7-days-to-die-2/image4.png","img/7-days-to-die-2/image5.png","img/7-days-to-die-2/image6.jpg", "img/7-days-to-die-2/20261010162724_1.jpg"],
    videoUrl: "",
    comments: [
      { author: "STX7", avatarSeed: "STX7", time: "Final da Semana", text: "A volta dos que não foram" },
      { author: "Mamaco Gelado", avatarSeed: "Mamaco Gelado", time: "Final da Semana", text: "É fazenda de zumbi, tem que ter zumbi lá fora" },
      { author: "Gatólico", avatarSeed: "Gatólico", time: "Final da Semana", text: "Faca ak47, a arma perfeita pro combate" },
      { author: "BuChuDin", avatarSeed: "BuChuDin", time: "Final da Semana", text: "Não vão pegar meu drone >:( , pegaram meu drone :'(" }
    ]
  }
];

/**
 * Aliases de jogadores para o placar (chave: minúscula, sem acento).
 * Gatólico = Ediisu = Edisontoptop (nick da conta EA no Battlefield 1).
 * Nas páginas dos jogos continua sendo exibido o nick usado naquele jogo;
 * apenas o placar de participantes unifica tudo no nome canônico.
 * Obs.: no Minecraft, "Ediisu" não pode usar o nick "Gatólico".
 */
const PLAYER_ALIASES = {
  "gatolico": "Gatólico",
  "ediisu": "Gatólico",
  "edisontoptop": "Gatólico",
  "mamaco gelado": "Mamaco Gelado",
  "stx7": "STX7",
  "buchudin": "BuChuDin",
  "gustvbr": "Gustvbr",
  "mistake": "Mistake",
  "pekonino": "pekonino",
  "pamonhadesal": "pamonhadesal"
};

/**
 * Catálogo de categorias/gêneros/tags da Steam.
 * `blocked` = categoria que não pode ser escolhida segundo as regras do site:
 *  - Regra 5: sem conteúdo explícito (hentai); Regra 6: sem jogos de navegador;
 *  - Regras 12/13: precisa ter multiplayer (só singleplayer é proibido); Regra 16: sem jogos de celular.
 */
const STEAM_CATEGORIES = [
  { name: "Ação" }, { name: "Aventura" }, { name: "Casual" }, { name: "Indie" },
  { name: "RPG" }, { name: "Simulação" }, { name: "Estratégia" }, { name: "Corrida" },
  { name: "Esportes" }, { name: "Gratuito" }, { name: "Acesso Antecipado" },
  { name: "Multijogador Massivo (MMO)" },
  { name: "FPS" }, { name: "Hero Shooter" }, { name: "MOBA" }, { name: "Battle Royale" },
  { name: "Luta" }, { name: "Plataforma" }, { name: "Quebra-cabeça" }, { name: "Party Game" },
  { name: "Roguelike" }, { name: "Tower Defense" }, { name: "Construção de Cidades" },
  { name: "Gerenciamento" }, { name: "Cartas" }, { name: "Ritmo" }, { name: "Furtividade" },
  { name: "Mundo Aberto" }, { name: "Sandbox" }, { name: "Craft" }, { name: "Sobrevivência" },
  { name: "Terror" }, { name: "Zumbis" }, { name: "Guerra" }, { name: "Espaço" },
  { name: "Cooperativo" }, { name: "PvP" }, { name: "Competitivo" }, { name: "Dirigir/Pilotar" },
  { name: "Single-player", blocked: true, rule: "12 e 13" },
  { name: "Conteúdo Adulto / Hentai", blocked: true, rule: 5 },
  { name: "Jogo de Navegador", blocked: true, rule: 6 },
  { name: "Mobile", blocked: true, rule: 16 }
];

/**
 * Categorias (Steam) de cada jogo já jogado, por id.
 */
const GAME_CATEGORIES = {
  "rust-1": ["Ação", "Sobrevivência", "Mundo Aberto", "Craft", "PvP"],
  "rust-2": ["Ação", "Sobrevivência", "Mundo Aberto", "Craft", "PvP"],
  "rust-3": ["Ação", "Sobrevivência", "Mundo Aberto", "Craft", "PvP"],
  "left-4-dead-2": ["Ação", "FPS", "Cooperativo", "Zumbis"],
  "counter-strike-2": ["Ação", "FPS", "PvP", "Competitivo", "Gratuito"],
  "enshrouded": ["Ação", "RPG", "Sobrevivência", "Mundo Aberto", "Craft", "Cooperativo"],
  "rocket-league": ["Esportes", "Corrida", "PvP", "Competitivo", "Gratuito"],
  "minecraft-cobbleverse": ["Sandbox", "Aventura", "RPG", "Craft", "Mundo Aberto"],
  "minecraft-all-the-mods-10": ["Sandbox", "Aventura", "RPG", "Craft", "Mundo Aberto"],
  "minecraft-all-the-mods-11": ["Sandbox", "Aventura", "RPG", "Craft", "Mundo Aberto"],
  "the-forest": ["Ação", "Aventura", "Sobrevivência", "Terror", "Mundo Aberto", "Craft", "Cooperativo"],
  "mecha-chamelon": ["Ação", "Indie", "Cooperativo"],
  "devour": ["Terror", "Cooperativo", "Sobrevivência", "Indie"],
  "deadlock": ["Ação", "Hero Shooter", "MOBA", "PvP", "Gratuito"],
  "deadlock-2": ["Ação", "Hero Shooter", "MOBA", "PvP", "Gratuito"],
  "deadlock-3": ["Ação", "Hero Shooter", "MOBA", "PvP", "Gratuito"],
  "battlefield-1-revolution": ["Ação", "FPS", "PvP", "Guerra"],
  "minecraft-vanilla": ["Sandbox", "Sobrevivência", "Craft", "Mundo Aberto"],
  "minecraft-vanilla-2": ["Sandbox", "Sobrevivência", "Craft", "Mundo Aberto"],
  "valorant": ["Ação", "FPS", "Hero Shooter", "PvP", "Competitivo", "Gratuito"],
  "how-to-fish": ["Ação", "Casual", "Indie", "Simulação", "Cooperativo"],
  "7-days-to-die-1": ["Ação", "Sobrevivência", "Zumbis", "Mundo Aberto", "Craft", "Cooperativo"],
  "7-days-to-die-2": ["Ação", "Sobrevivência", "Zumbis", "Mundo Aberto", "Craft", "Cooperativo"],
  "valheim": ["Ação", "Aventura", "Sobrevivência", "Mundo Aberto", "Craft", "Cooperativo"],
  "dont-starve-together": ["Aventura", "Indie", "Sobrevivência", "Craft", "Cooperativo"]
};

const SITE_RULES = [
  {
    number: 1,
    title: "Cumprimento Obrigatório",
    description: "As regras não podem ser descumpridas sob nenhuma circunstância."
  },
  {
    number: 2,
    title: "Tempo de Espera para Escolha",
    description: "Deve-se esperar 2 semanas a partir do último dia jogado para escolher o mesmo jogo novamente."
  },
  {
    number: 3,
    title: "Escolha de Jogos Pagos",
    description: "A semana de jogos só pode começar após os 5 primeiros dias úteis do mês. Se passar desses 5 dias, não serão aceitos jogos pagos.",
    hoverNote: {
      author: "Gatólico",
      text: "Se os membros quiserem, o jogo pago pode ser jogado depois dos 5 dias úteis."
    }
  },
  {
    number: 4,
    title: "Troca de Semanas",
    description: "Caso alguém queira trocar a semana de escolha com outro membro, a troca pode ser feita livremente."
  },
  {
    number: 5,
    title: "Restrição de Conteúdo Explícito",
    description: "Não são permitidos jogos hentai (todo jogo que mostrar um mamilozinho ou xerequinha explícita).",
    hoverNote: {
      author: "BuChuDin",
      text: "Rust não se aplica a essa regra! Por padrão o jogo já vem com censura, e quem desabilita é o usuário."
    }
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
    title: "Tempo Mínimo Juntos",
    description: "Todos os membros devem obrigatoriamente jogar o jogo escolhido naquela semana por pelo menos cinco horas juntos."
  },
  {
    number: 20,
    title: "Jogabilidade Inviável",
    description: "Se o jogo se provar impossível de ser jogado em grupo, então deverá ser escolhido outro jogo."
  },
  {
    number: 21,
    title: "Unanimidade para Alterações",
    description: "Uma regra só pode ser alterada se todos os membros concordarem."
  },
  {
    number: 22,
    title: "Escolha por Convidados",
    description: "Convidados podem escolher uma semana mediante aprovação dos membros. Naquela semana ele estará sujeito às regras, mas somente durante aquela semana."
  }
];

const ABOUT_INFO = {
  description: "O projeto 'Jogo da Semana' nasceu da necessidade de um grupo de amigos de combater o famoso 'backlog' (a lista de jogos comprados e nunca jogados) e criar uma rotina divertida para manter a jogatina conjunta ativa. A cada semana, um membro é sorteado ou segue a fila para escolher um título. Todos jogam e se reúnem para discutir, avaliar e registrar as memórias no site oficial.",
  stats: {
    get totalGames() {
      return GAMES_DATA.length;
    },
    get activeMembers() {
      const coreMembers = new Set(["STX7", "Gatólico", "BuChuDin"]);
      return coreMembers.size;
    },
    get averageRating() {
      const ratedGames = GAMES_DATA.filter(g => typeof g.rating === "number" && !isNaN(g.rating));
      if (ratedGames.length === 0) return "0.00";
      const sum = ratedGames.reduce((acc, g) => acc + g.rating, 0);
      return (sum / ratedGames.length).toFixed(2);
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
    get platinados() {
      return GAMES_DATA.filter(g => g.isPlatinado === true).length;
    },
    get worstGame() {
      const ratedGames = GAMES_DATA.filter(g => typeof g.rating === "number" && !isNaN(g.rating));
      if (ratedGames.length === 0) return "Nenhum";
      let worst = null;
      let minRating = Infinity;
      ratedGames.forEach(g => {
        if (g.rating < minRating) {
          minRating = g.rating;
          worst = g;
        }
      });
      return worst ? `${worst.title} (Nota: ${worst.rating.toFixed(1)})` : "Nenhum";
    }
  }
};
