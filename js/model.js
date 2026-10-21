/**
 * Jogo da Semana - Model (MVC)
 * Gerencia a manipulação de dados, ordenação, busca, paginação e validações.
 */

class GameModel {
  constructor() {
    this.rawGames = GAMES_DATA || [];
    this.rules = SITE_RULES || [];
    this.about = ABOUT_INFO || {};
    this.shameBoard = (typeof SHAME_BOARD !== "undefined" && Array.isArray(SHAME_BOARD)) ? SHAME_BOARD : [];

    // Pré-validação e higienização dos jogos no momento da instanciação do Model
    this.games = this.rawGames
      .map(g => this.validateGame(g))
      .filter(g => g !== null);

    // Cache interno de dados processados
    this._bestGamesCache = null;
    this._participantsRankingCache = null;
  }

  /**
   * Valida e higieniza um objeto de jogo
   * @param {Object} game 
   * @returns {Object} Jogo validado com defaults se houver campos ausentes
   */
  validateGame(game) {
    if (!game) return null;
    
    // Tratamento de erros de dados ausentes/corrompidos
    return {
      id: game.id || "sem-id",
      title: game.title || "Jogo Sem Nome",
      genre: game.genre || "Gênero não informado",
      date: this.isValidDate(game.date) ? game.date : "Data inválida",
      chooser: game.chooser || "Ninguém",
      participants: Array.isArray(game.participants) ? game.participants : [],
      specialParticipants: Array.isArray(game.specialParticipants) ? game.specialParticipants : [],
      platform: game.platform || "Não especificada",
      rating: typeof game.rating === 'number' && !isNaN(game.rating) ? game.rating : null,
      developer: game.developer || "Independente",
      description: game.description || "Sem descrição disponível.",
      banner: game.banner || "https://picsum.photos/id/1067/1920/1080",
      gallery: Array.isArray(game.gallery) ? game.gallery : [],
      videoUrl: game.videoUrl || game.videourl || "",
      comments: Array.isArray(game.comments) ? game.comments : []
    };
  }

  /**
   * Verifica se uma string de data é válida (AAAA-MM-DD)
   * @param {string} dateString 
   * @returns {boolean}
   */
  isValidDate(dateString) {
    if (!dateString) return false;
    const regEx = /^\d{4}-\d{2}-\d{2}$/;
    if(!dateString.match(regEx)) return false;  // Formato inválido
    const d = new Date(dateString);
    const dNum = d.getTime();
    if(!dNum && dNum !== 0) return false; // Data inválida (ex: 2026-02-30)
    return d.toISOString().slice(0,10) === dateString;
  }

  /**
   * Obtém um jogo específico pelo ID
   * @param {string} id 
   * @returns {Object|null}
   */
  getGameById(id) {
    try {
      if (!id) return null;
      return this.games.find(g => g.id === id) || null;
    } catch (error) {
      console.error("Erro ao recuperar jogo por ID:", error);
      return null;
    }
  }

  /**
   * Filtra, ordena e pagina os jogos de acordo com os parâmetros
   * @param {Object} options 
   * @param {string} options.search Query de pesquisa (título ou quem escolheu)
   * @param {string} options.sort Critério de ordenação ('mais_recente' | 'mais_antigo')
   * @param {number} options.page Número da página (1-based)
   * @param {number} options.limit Limite por página (padrão: 10)
   * @returns {Object} { items: Array, totalItems: number, totalPages: number, currentPage: number }
   */
  getGamesList({ search = "", sort = "mais_recente", page = 1, limit = 10 } = {}) {
    try {
      let filtered = [...this.games];

      // 1. Pesquisa por título ou quem escolheu (case-insensitive)
      if (search.trim()) {
        const query = search.toLowerCase().trim();
        filtered = filtered.filter(g => 
          (g.title && g.title.toLowerCase().includes(query)) ||
          (g.chooser && g.chooser.toLowerCase().includes(query))
        );
      }

      // 2. Ordenação por data (utilizando ordenação léxica ISO YYYY-MM-DD para velocidade sem instanciar new Date())
      if (sort === "mais_recente") {
        filtered.sort((a, b) => b.date.localeCompare(a.date));
      } else if (sort === "mais_antigo") {
        filtered.sort((a, b) => a.date.localeCompare(b.date));
      }

      // 3. Paginação
      const totalItems = filtered.length;
      const totalPages = Math.ceil(totalItems / limit);
      const currentPage = Math.max(1, Math.min(page, totalPages || 1));
      
      const startIndex = (currentPage - 1) * limit;
      const paginatedItems = filtered.slice(startIndex, startIndex + limit);

      return {
        items: paginatedItems,
        totalItems,
        totalPages,
        currentPage
      };
    } catch (error) {
      console.error("Erro no processamento da lista de jogos no Model:", error);
      return { items: [], totalItems: 0, totalPages: 1, currentPage: 1, error: true };
    }
  }

  /**
   * Agrupa os jogos por mês e ordena por nota (melhores do mês)
   * @returns {Object} Objeto com chaves no formato 'Mês Ano' e valores como arrays de jogos ordenados
   */
  getBestGamesByMonth() {
    if (this._bestGamesCache) return this._bestGamesCache;

    try {
      const grouped = {};
      const monthsBr = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
      ];

      // Filtrar e ordenar jogos válidos por data recente primeiro
      const sortedGames = this.games
        .filter(g => g.date !== "Data inválida")
        .sort((a, b) => b.date.localeCompare(a.date));

      sortedGames.forEach(game => {
        const dateObj = new Date(game.date + 'T00:00:00'); // Evita timezone offset shift
        const monthIndex = dateObj.getMonth();
        const year = dateObj.getFullYear();
        const monthName = `${monthsBr[monthIndex]} de ${year}`;

        if (!grouped[monthName]) {
          grouped[monthName] = [];
        }
        grouped[monthName].push(game);
      });

      // Ordenar jogos de cada mês por nota (rating) decrescente
      for (const month in grouped) {
        grouped[month].sort((a, b) => {
          const ratingA = typeof a.rating === "number" && !isNaN(a.rating) ? a.rating : -1;
          const ratingB = typeof b.rating === "number" && !isNaN(b.rating) ? b.rating : -1;
          return ratingB - ratingA;
        });
      }

      this._bestGamesCache = grouped;
      return grouped;
    } catch (error) {
      console.error("Erro ao agrupar melhores do mês no Model:", error);
      return {};
    }
  }

  /**
   * Retorna o ranking de participantes e o número de vezes que jogaram
   * @returns {Array} Array de objetos { name, count } ordenados por count
   */
  getParticipantsRanking() {
    if (this._participantsRankingCache) return this._participantsRankingCache;

    const stats = {};
    this.games.forEach(game => {
      if (!game.participants) return;
      // Normaliza para o nome canônico antes de deduplicar (mesma pessoa conta 1x por jogo)
      const allPlayers = [...new Set(
        [...game.participants, ...(game.specialParticipants || [])]
          .map(p => GameModel.canonicalName(p))
      )];
      
      allPlayers.forEach(player => {
        if (!stats[player]) stats[player] = 0;
        stats[player]++;
      });
    });

    this._participantsRankingCache = Object.entries(stats)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    return this._participantsRankingCache;
  }

  /**
   * Chave de comparação: minúsculas, sem acentos e sem espaços nas pontas.
   */
  static normalizeKey(name) {
    return String(name || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();
  }

  /**
   * Retorna o nome canônico (usado no placar) de um nick.
   * Regras: Gatólico/Ediisu/Edisontoptop => "Gatólico". Demais nomes: case-insensitive,
   * exibindo a grafia canônica conhecida (ex.: "mamaco gelado" => "Mamaco Gelado").
   */
  static canonicalName(name) {
    const key = GameModel.normalizeKey(name);
    if (!key) return name;
    if (PLAYER_ALIASES[key]) return PLAYER_ALIASES[key];
    return String(name).trim();
  }


  /**
   * Estatísticas de categorias (estilo Steam): quantas vezes cada uma foi jogada
   * e se as ainda não jogadas são permitidas pelas regras.
   * @returns {Array} { name, count, games, status: 'played'|'available'|'blocked', rule }
   */
  getCategoriesStats() {
    const stats = new Map();
    const ensure = (name) => {
      if (!stats.has(name)) stats.set(name, { name, count: 0, games: [], status: "available", rule: null });
      return stats.get(name);
    };

    // Catálogo completo (inclui categorias ainda não jogadas e as proibidas pelas regras)
    (typeof STEAM_CATEGORIES !== "undefined" ? STEAM_CATEGORIES : []).forEach(c => {
      const s = ensure(c.name);
      if (c.blocked) { s.status = "blocked"; s.rule = c.rule; }
    });

    // Contagem por jogo (cada categoria conta 1x por jogo/semana)
    this.games.forEach(game => {
      const cats = (typeof GAME_CATEGORIES !== "undefined" && GAME_CATEGORIES[game.id])
        || String(game.genre || "").split(/\s*[\/,]\s*/).filter(Boolean);
      [...new Set(cats)].forEach(name => {
        const s = ensure(name);
        s.count++;
        s.games.push(game.title);
      });
    });

    const order = { played: 0, available: 1, blocked: 2 };
    const list = [...stats.values()].map(s => ({ ...s, status: s.count > 0 ? "played" : s.status }));
    return list.sort((a, b) =>
      order[a.status] - order[b.status] || b.count - a.count || a.name.localeCompare(b.name, "pt-BR")
    ).map(s => (s.count > 0 ? { ...s, status: "played" } : s));
  }

  /**
   * Retorna as regras do site
   */
  /**
   * Retorna os registros do Quadro da Vergonha
   * @returns {Array}
   */
  getShameBoard() {
    return (typeof SHAME_BOARD !== "undefined" && Array.isArray(SHAME_BOARD)) ? SHAME_BOARD : (this.shameBoard || []);
  }

  getRules() {
    return this.rules;
  }

  /**
   * Retorna os dados sobre o site
   */
  getAboutInfo() {
    return this.about;
  }

  /**
   * =========================================================================
   * Sistema de Sorteio de Jogos (Loot Box / Roleta CS:GO)
   * =========================================================================
   */

  /**
   * Normaliza o nome do jogo desconsiderando semanas/sessões (ex: "Rust (Sessão 2)" -> "Rust")
   * @param {string} title
   * @returns {string}
   */
  static cleanGameTitle(title) {
    if (!title || typeof title !== 'string') return '';
    return title.replace(/\s*\((?:sess[aã]o|parte|temporada|semana)\s*\d*\)/gi, '').trim();
  }

  /**
   * Retorna os jogos únicos do histórico (sem repetição de semanas/sessões)
   * @returns {Array} [{ id, title, banner, genre, tickets: 1, active: true }]
   */
  getRafflePlayedGames() {
    const seenTitles = new Set();
    const result = [];

    this.games.forEach(g => {
      // Normaliza o título para que jogos repetidos em semanas diferentes apareçam somente uma vez
      const cleanTitle = GameModel.cleanGameTitle(g.title);
      const key = cleanTitle.toLowerCase();

      if (!seenTitles.has(key)) {
        seenTitles.add(key);
        result.push({
          id: 'played-' + key.replace(/[^a-z0-9]/gi, '-'),
          title: cleanTitle,
          banner: g.banner || '',
          genre: g.genre || 'Gênero não informado',
          tickets: 1,
          active: true
        });
      } else {
        // Se a ocorrência anterior não tinha banner mas esta tem, aproveita o banner
        const existing = result.find(r => r.title.toLowerCase() === key);
        if (existing && !existing.banner && g.banner) {
          existing.banner = g.banner;
        }
      }
    });

    // Ordena alfabeticamente para facilitar a seleção no filtro do sorteio
    result.sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'));

    return result;
  }

  /**
   * Processa texto com jogos separados por vírgula e calcula frequências
   * Se um jogo se repete, a quantidade de tickets (chances) dele aumenta
   * @param {string} text 
   * @returns {Array} [{ id, title, banner, tickets, active: true }]
   */
  parseCommaSeparatedGames(text) {
    if (!text || typeof text !== 'string') return [];

    const rawNames = text.split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const counts = new Map();
    rawNames.forEach(raw => {
      const key = raw.toLowerCase();
      if (!counts.has(key)) {
        counts.set(key, { title: raw, count: 0 });
      }
      counts.get(key).count++;
    });

    const playedMap = new Map();
    this.games.forEach(g => {
      const cleanKey = GameModel.cleanGameTitle(g.title).toLowerCase();
      if (g.banner && !playedMap.has(cleanKey)) {
        playedMap.set(cleanKey, g.banner);
      }
      // Mantém também o título completo para match direto
      const rawKey = g.title.toLowerCase().trim();
      if (g.banner && !playedMap.has(rawKey)) {
        playedMap.set(rawKey, g.banner);
      }
    });

    return Array.from(counts.values()).map((item, idx) => {
      const cleanItemKey = GameModel.cleanGameTitle(item.title).toLowerCase();
      const rawItemKey = item.title.toLowerCase();
      const banner = playedMap.get(cleanItemKey) || playedMap.get(rawItemKey) || '';
      return {
        id: 'custom-' + idx + '-' + encodeURIComponent(item.title),
        title: item.title,
        banner: banner,
        genre: banner ? 'Jogo do histórico' : 'Jogo personalizado',
        tickets: item.count,
        active: true
      };
    });
  }

  /**
   * Calcula as probabilidades, porcentagens e classificação de raridade de cada item
   * @param {Array} items Lista de itens { tickets, active, ... }
   * @returns {Object} { itemsWithChances: Array, totalTickets: number, allEqual: boolean }
   */
  calculateRaffleChances(items) {
    const activeItems = (items || []).filter(it => it.active !== false && it.tickets > 0);
    const totalTickets = activeItems.reduce((acc, it) => acc + (Number(it.tickets) || 0), 0);

    if (activeItems.length === 0 || totalTickets === 0) {
      return { itemsWithChances: [], totalTickets: 0, allEqual: false };
    }

    // Verifica se todos os itens têm a mesma quantidade de chances
    const firstTickets = activeItems[0].tickets;
    const allEqual = activeItems.every(it => it.tickets === firstTickets);

    const itemsWithChances = activeItems.map(it => {
      const tickets = Number(it.tickets) || 1;
      const probability = tickets / totalTickets;
      const percentage = Number((probability * 100).toFixed(1));

      // Determina a raridade/efeito visual conforme as regras:
      // - Se todos tiverem a mesma chance: 'equal' (sem animação, apenas giro)
      // - 50% até 99%: 'common' (sem animação)
      // - 30% até 49%: 'rare' (azul de vitória)
      // - 10% até 29%: 'epic' (roxa e pulsante de vitória)
      // - Menor que 10% (<= 9%): 'legendary' (dourada e pulsante com blur de vitória)
      let rarity = 'common';
      if (allEqual) {
        rarity = 'equal';
      } else if (percentage < 10) {
        rarity = 'legendary';
      } else if (percentage < 30) {
        rarity = 'epic';
      } else if (percentage < 50) {
        rarity = 'rare';
      } else {
        rarity = 'common';
      }

      return {
        ...it,
        tickets,
        probability,
        percentage,
        rarity
      };
    });

    itemsWithChances.sort((a, b) => b.percentage - a.percentage || a.title.localeCompare(b.title));

    return {
      itemsWithChances,
      totalTickets,
      allEqual
    };
  }

  /**
   * Sorteia um vencedor com base nos tickets (probabilidade ponderada)
   * @param {Array} itemsWithChances
   * @returns {Object|null}
   */
  drawWeightedWinner(itemsWithChances) {
    if (!itemsWithChances || itemsWithChances.length === 0) return null;

    const totalTickets = itemsWithChances.reduce((acc, it) => acc + it.tickets, 0);
    const randomTicket = Math.random() * totalTickets;

    let cumulative = 0;
    for (const item of itemsWithChances) {
      cumulative += item.tickets;
      if (randomTicket <= cumulative) {
        return item;
      }
    }

    return itemsWithChances[itemsWithChances.length - 1];
  }
}
