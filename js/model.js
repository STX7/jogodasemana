/**
 * Jogo da Semana - Model (MVC)
 * Gerencia a manipulação de dados, ordenação, busca, paginação e validações.
 */

class GameModel {
  constructor() {
    this.games = GAMES_DATA || [];
    this.rules = SITE_RULES || [];
    this.about = ABOUT_INFO || {};
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
      rating: typeof game.rating === 'number' && !isNaN(game.rating) ? game.rating : 0.0,
      developer: game.developer || "Independente",
      description: game.description || "Sem descrição disponível.",
      banner: game.banner || "https://picsum.photos/id/1067/1920/1080",
      gallery: Array.isArray(game.gallery) ? game.gallery : [],
      videoUrl: game.videoUrl || "",
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
      const game = this.games.find(g => g.id === id);
      if (!game) return null;
      return this.validateGame(game);
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
   * @returns {Object} { items: Array, totalItems: number, totalPages: number }
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

      // 2. Ordenação por data
      if (sort === "mais_recente") {
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
      } else if (sort === "mais_antigo") {
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
      }

      // Validação de segurança nos itens filtrados
      filtered = filtered.map(g => this.validateGame(g)).filter(g => g !== null);

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
    try {
      const grouped = {};
      const monthsBr = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
      ];

      // Ordenar todos os jogos por data decrescente primeiro
      const sortedGames = [...this.games]
        .map(g => this.validateGame(g))
        .filter(g => g !== null && g.date !== "Data inválida")
        .sort((a, b) => new Date(b.date) - new Date(a.date));

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
        grouped[month].sort((a, b) => b.rating - a.rating);
      }

      return grouped;
    } catch (error) {
      console.error("Erro ao agrupar melhores do mês no Model:", error);
      return {};
    }
  }

  /**
   * Retorna as regras do site
   */
  getRules() {
    return this.rules;
  }

  /**
   * Retorna os dados sobre o site
   */
  getAboutInfo() {
    return this.about;
  }
}
