/**
 * Jogo da Semana - Controller (MVC)
 * Escuta eventos da UI, atualiza o Model e orquestra a View.
 */

class GameController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    
    // Estado da listagem na Home
    this.listState = {
      search: "",
      sort: "mais_recente",
      page: 1,
      limit: 10
    };

    // Inicializa a aplicação ao carregar o DOM
    document.addEventListener("DOMContentLoaded", () => this.init());
  }

  /**
   * Ponto de entrada da aplicação
   */
  init() {
    try {
      // 1. Renderiza elementos globais (Navbar e Footer)
      this.view.renderHeaderAndFooter();

      // 2. Roteamento simples baseado na presença de elementos chave no DOM
      if (document.getElementById("games-list")) {
        this.initHomePage();
      } else if (document.getElementById("game-details-page")) {
        this.initDetailPage();
      } else if (document.getElementById("best-games-container")) {
        this.initBestGamesPage();
      } else if (document.getElementById("rules-container")) {
        this.initRulesPage();
      } else if (document.getElementById("about-container")) {
        this.initAboutPage();
      }
    } catch (error) {
      console.error("Erro fatal durante a inicialização do Controller:", error);
    }
  }

  /**
   * Inicializa a Página Inicial (Listagem, Filtros, Busca, Paginação)
   */
  initHomePage() {
    const searchInput = document.getElementById("search-input");
    const sortSelect = document.getElementById("sort-select");

    // Lógica de busca instantânea (ao digitar)
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.listState.search = e.target.value;
        this.listState.page = 1; // Reseta para a primeira página
        this.refreshGamesList();
      });
    }

    // Lógica de ordenação (ao alterar select)
    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        this.listState.sort = e.target.value;
        this.listState.page = 1; // Reseta para a primeira página
        this.refreshGamesList();
      });
    }

    // Primeira renderização da lista
    this.refreshGamesList();
  }

  /**
   * Recarrega e renderiza a lista de jogos com base no estado atual de busca/filtro/paginação
   */
  refreshGamesList() {
    const result = this.model.getGamesList({
      search: this.listState.search,
      sort: this.listState.sort,
      page: this.listState.page,
      limit: this.listState.limit
    });

    // Renderiza a lista na tela
    this.view.renderGamesList(result.items);

    // Renderiza os botões de paginação, passando o callback para mudança de página
    this.view.renderPagination(result.totalPages, result.currentPage, (newPage) => {
      this.listState.page = newPage;
      this.refreshGamesList();
      // Rola suavemente até o topo da lista
      const listHeading = document.getElementById("list-heading");
      if (listHeading) {
        listHeading.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  /**
   * Inicializa a Página de Detalhes (?id=slug)
   */
  initDetailPage() {
    // 1. Obtém o parâmetro 'id' da URL
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get("id");

    if (!gameId) {
      this.view.renderGameDetails(null);
      return;
    }

    // 2. Busca os dados no Model
    const game = this.model.getGameById(gameId);

    // 3. Renderiza os detalhes na View
    this.view.renderGameDetails(game);

    // 4. Configura ouvintes de eventos para o Modal Lightbox se houver galeria
    if (game && game.gallery && game.gallery.length > 0) {
      const modal = document.getElementById("imageModal");
      const closeBtn = document.getElementById("close-lightbox");

      if (closeBtn) {
        closeBtn.addEventListener("click", () => this.view.closeLightbox());
      }
      
      // Fecha ao clicar fora da imagem
      if (modal) {
        modal.addEventListener("click", () => this.view.closeLightbox());
      }

      // Fecha ao pressionar ESC
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal && !modal.classList.contains("hidden")) {
          this.view.closeLightbox();
        }
      });
    }
  }

  /**
   * Inicializa a Página de Melhores do Mês
   */
  initBestGamesPage() {
    const groupedGames = this.model.getBestGamesByMonth();
    this.view.renderMelhoresJogos(groupedGames);
  }

  /**
   * Inicializa a Página de Regras
   */
  initRulesPage() {
    const rules = this.model.getRules();
    this.view.renderRules(rules);
  }

  /**
   * Inicializa a Página Sobre
   */
  initAboutPage() {
    const aboutInfo = this.model.getAboutInfo();
    this.view.renderAbout(aboutInfo);
  }
}

// Cria e expõe as instâncias globais para funcionamento das páginas
const appModel = new GameModel();
const appView = new GameView();
const appController = new GameController(appModel, appView);
