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
      } else if (document.getElementById("participants-container")) {
        this.initParticipantsPage();
      } else if (document.getElementById("categories-container")) {
        this.initCategoriesPage();
      } else if (document.getElementById("sorteio-container")) {
        this.initSorteioPage();
      }

      // 3. Esconde o skeleton loader após o conteúdo estar pronto
      this.view.hideSkeleton();
    } catch (error) {
      console.error("Erro fatal durante a inicialização do Controller:", error);
      this.view.hideSkeleton();
    }
  }

  /**
   * Função utilitária de debounce para adiar execuções repetitivas de eventos
   * @param {Function} func 
   * @param {number} wait Tempo de espera em ms
   */
  debounce(func, wait = 150) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  /**
   * Inicializa a Página Inicial (Listagem, Filtros, Busca, Paginação)
   */
  initHomePage() {
    const searchInput = document.getElementById("search-input");
    const sortSelect = document.getElementById("sort-select");

    // Lógica de busca otimizada com Debounce e Proteção Anti-XSS
    if (searchInput) {
      const handleSearch = this.debounce((e) => {
        const rawInput = e.target.value;
        const sanitizedInput = rawInput.replace(/[<>"'&]/g, (match) => {
          const map = {
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            '&': '&amp;'
          };
          return map[match];
        });

        this.listState.search = sanitizedInput;
        this.listState.page = 1; // Reseta para a primeira página
        this.refreshGamesList();
      }, 150);

      searchInput.addEventListener("input", handleSearch);
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

  /**
   * Inicializa a Página de Participantes
   */
  initParticipantsPage() {
    const ranking = this.model.getParticipantsRanking();
    this.view.renderParticipantsPage(ranking);
    const shameBoard = this.model.getShameBoard();
    this.view.renderShameBoard(shameBoard);

    // Contadores dinâmicos nos botões das abas
    const badgeRanking = document.getElementById("badge-count-ranking");
    const badgeShame = document.getElementById("badge-count-shame");
    if (badgeRanking) badgeRanking.textContent = ranking ? ranking.length : 0;
    if (badgeShame) badgeShame.textContent = shameBoard ? shameBoard.length : 0;

    // Gerenciador de visualização responsivo (Lado a Lado / Apenas Ranking / Apenas Vergonha)
    const tabAll = document.getElementById("tab-btn-all");
    const tabRanking = document.getElementById("tab-btn-ranking");
    const tabShame = document.getElementById("tab-btn-shame");
    const secRanking = document.getElementById("section-ranking");
    const secShame = document.getElementById("section-shame");
    const gridWrapper = document.getElementById("participants-grid-wrapper");

    const activeClass = "flex-1 min-w-[100px] py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 bg-brand-600 text-white shadow-md";
    const inactiveClass = "flex-1 min-w-[100px] py-2 px-3 rounded-xl text-xs font-semibold transition-all text-gray-400 hover:text-white flex items-center justify-center gap-1.5";

    const setViewMode = (mode) => {
      if (tabAll) tabAll.className = (mode === "all") ? activeClass : inactiveClass;
      if (tabRanking) tabRanking.className = (mode === "ranking") ? activeClass : inactiveClass;
      if (tabShame) tabShame.className = (mode === "shame") ? activeClass : inactiveClass;

      if (!secRanking || !secShame || !gridWrapper) return;

      if (mode === "all") {
        secRanking.classList.remove("hidden");
        secShame.classList.remove("hidden");
        gridWrapper.className = "grid grid-cols-1 lg:grid-cols-2 gap-8 items-start";
      } else if (mode === "ranking") {
        secRanking.classList.remove("hidden");
        secShame.classList.add("hidden");
        gridWrapper.className = "grid grid-cols-1 gap-8 items-start max-w-2xl mx-auto";
      } else if (mode === "shame") {
        secRanking.classList.add("hidden");
        secShame.classList.remove("hidden");
        gridWrapper.className = "grid grid-cols-1 gap-8 items-start max-w-2xl mx-auto";
      }
    };

    if (tabAll) tabAll.addEventListener("click", () => setViewMode("all"));
    if (tabRanking) tabRanking.addEventListener("click", () => setViewMode("ranking"));
    if (tabShame) tabShame.addEventListener("click", () => setViewMode("shame"));

    // Verifica parâmetros de URL ou hash (ex: participantes.html?tab=shame ou #section-shame)
    const urlParams = new URLSearchParams(window.location.search);
    const hash = window.location.hash;
    if (urlParams.get("tab") === "shame" || hash.includes("shame")) {
      if (window.innerWidth < 1024) {
        setViewMode("shame");
      } else {
        setViewMode("all");
        setTimeout(() => {
          if (secShame) secShame.scrollIntoView({ behavior: "smooth" });
        }, 200);
      }
    } else {
      setViewMode("all");
    }
  }

  /**
   * Inicializa a Página de Categorias
   */
  initCategoriesPage() {
    const stats = this.model.getCategoriesStats();
    this.view.renderCategoriesPage(stats);
  }

  /**
   * =========================================================================
   * Inicialização da Página de Sorteio de Jogos
   * =========================================================================
   */
  initSorteioPage() {
    this.sorteioState = {
      mode: "custom", // "custom" | "played"
      customText: "Phasmophobia, Lethal Company, Phasmophobia, Terraria, Phasmophobia, Helldivers 2",
      playedGames: this.model.getRafflePlayedGames(),
      playedFilter: "",
      isSpinning: false,
      currentChancesResult: null
    };

    const tabCustom = document.getElementById("tab-custom-mode");
    const tabPlayed = document.getElementById("tab-played-mode");
    const panelCustom = document.getElementById("panel-custom-mode");
    const panelPlayed = document.getElementById("panel-played-mode");
    const customInput = document.getElementById("custom-games-input");
    const btnSpin = document.getElementById("btn-spin-roulette");
    const btnExample = document.getElementById("btn-example-custom");
    const btnClear = document.getElementById("btn-clear-custom");
    const searchPlayed = document.getElementById("played-search-input");
    const btnSelectAll = document.getElementById("btn-select-all-played");
    const btnDeselectAll = document.getElementById("btn-deselect-all-played");
    const btnResetTickets = document.getElementById("btn-reset-tickets-played");
    const modalWinner = document.getElementById("winner-modal");
    const modalBtnClose = document.getElementById("modal-btn-close");
    const modalBtnSpinAgain = document.getElementById("modal-btn-spin-again");

    const updateRaffle = () => {
      let rawItems = [];
      if (this.sorteioState.mode === "custom") {
        const text = customInput ? customInput.value : "";
        rawItems = this.model.parseCommaSeparatedGames(text);
      } else {
        rawItems = this.sorteioState.playedGames.filter(g => g.active !== false);
      }

      const chancesResult = this.model.calculateRaffleChances(rawItems);
      this.sorteioState.currentChancesResult = chancesResult;

      this.view.renderSorteioChancesList(
        chancesResult.itemsWithChances,
        chancesResult.totalTickets,
        chancesResult.allEqual
      );

      this.view.setupSorteioReel(chancesResult.itemsWithChances);

      if (btnSpin) {
        btnSpin.disabled = chancesResult.itemsWithChances.length === 0 || this.sorteioState.isSpinning;
      }
    };

    const switchMode = (newMode) => {
      this.sorteioState.mode = newMode;
      if (newMode === "custom") {
        tabCustom.className = "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all bg-brand-600 text-white shadow-md";
        tabPlayed.className = "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all text-gray-400 hover:text-white";
        panelCustom.classList.remove("hidden");
        panelPlayed.classList.add("hidden");
      } else {
        tabPlayed.className = "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all bg-brand-600 text-white shadow-md";
        tabCustom.className = "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all text-gray-400 hover:text-white";
        panelPlayed.classList.remove("hidden");
        panelCustom.classList.add("hidden");
        this.view.renderSorteioPlayedGamesList(this.sorteioState.playedGames, this.sorteioState.playedFilter);
      }
      updateRaffle();
    };

    if (tabCustom) tabCustom.addEventListener("click", () => switchMode("custom"));
    if (tabPlayed) tabPlayed.addEventListener("click", () => switchMode("played"));

    if (customInput) {
      customInput.value = this.sorteioState.customText;
      const handleInput = this.debounce(() => updateRaffle(), 150);
      customInput.addEventListener("input", handleInput);
    }

    if (btnExample) {
      btnExample.addEventListener("click", () => {
        if (customInput) {
          customInput.value = "Rust, CS2, Rust, Minecraft, Rust, Valorant, Left 4 Dead 2, Rust, How to Fish";
          updateRaffle();
        }
      });
    }

    if (btnClear) {
      btnClear.addEventListener("click", () => {
        if (customInput) {
          customInput.value = "";
          updateRaffle();
        }
      });
    }

    if (searchPlayed) {
      const handleSearch = this.debounce((e) => {
        this.sorteioState.playedFilter = e.target.value;
        this.view.renderSorteioPlayedGamesList(this.sorteioState.playedGames, this.sorteioState.playedFilter);
      }, 100);
      searchPlayed.addEventListener("input", handleSearch);
    }

    const playedContainer = document.getElementById("played-games-list");
    if (playedContainer) {
      playedContainer.addEventListener("click", (e) => {
        const toggle = e.target.closest(".played-game-toggle");
        const btnPlus = e.target.closest(".btn-ticket-plus");
        const btnMinus = e.target.closest(".btn-ticket-minus");

        if (toggle) {
          const gameId = toggle.getAttribute("data-game-id");
          const game = this.sorteioState.playedGames.find(g => g.id === gameId);
          if (game) {
            game.active = toggle.checked;
            this.view.renderSorteioPlayedGamesList(this.sorteioState.playedGames, this.sorteioState.playedFilter);
            updateRaffle();
          }
        } else if (btnPlus) {
          const gameId = btnPlus.getAttribute("data-game-id");
          const game = this.sorteioState.playedGames.find(g => g.id === gameId);
          if (game) {
            game.tickets = (game.tickets || 1) + 1;
            this.view.renderSorteioPlayedGamesList(this.sorteioState.playedGames, this.sorteioState.playedFilter);
            updateRaffle();
          }
        } else if (btnMinus) {
          const gameId = btnMinus.getAttribute("data-game-id");
          const game = this.sorteioState.playedGames.find(g => g.id === gameId);
          if (game && (game.tickets || 1) > 1) {
            game.tickets = (game.tickets || 1) - 1;
            this.view.renderSorteioPlayedGamesList(this.sorteioState.playedGames, this.sorteioState.playedFilter);
            updateRaffle();
          }
        }
      });
    }

    if (btnSelectAll) {
      btnSelectAll.addEventListener("click", () => {
        this.sorteioState.playedGames.forEach(g => { g.active = true; });
        this.view.renderSorteioPlayedGamesList(this.sorteioState.playedGames, this.sorteioState.playedFilter);
        updateRaffle();
      });
    }

    if (btnDeselectAll) {
      btnDeselectAll.addEventListener("click", () => {
        this.sorteioState.playedGames.forEach(g => { g.active = false; });
        this.view.renderSorteioPlayedGamesList(this.sorteioState.playedGames, this.sorteioState.playedFilter);
        updateRaffle();
      });
    }

    if (btnResetTickets) {
      btnResetTickets.addEventListener("click", () => {
        this.sorteioState.playedGames.forEach(g => { g.tickets = 1; });
        this.view.renderSorteioPlayedGamesList(this.sorteioState.playedGames, this.sorteioState.playedFilter);
        updateRaffle();
      });
    }

    const triggerSpin = () => {
      if (this.sorteioState.isSpinning) return;
      const chances = this.sorteioState.currentChancesResult;
      if (!chances || !chances.itemsWithChances || chances.itemsWithChances.length === 0) {
        alert("Adicione pelo menos um jogo para realizar o sorteio!");
        return;
      }

      this.sorteioState.isSpinning = true;
      if (btnSpin) {
        btnSpin.disabled = true;
        btnSpin.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Abrindo Caixa...';
      }

      const statusBadge = document.getElementById("raffle-status-badge");
      if (statusBadge) {
        statusBadge.textContent = "Girando...";
        statusBadge.className = "text-xs px-2.5 py-1 rounded-full bg-brand-500/20 text-brand-300 font-bold border border-brand-500/30 animate-pulse";
      }

      const winner = this.model.drawWeightedWinner(chances.itemsWithChances);

      this.view.animateSorteioRoll(winner, chances.itemsWithChances, chances.allEqual, (finalWinner) => {
        this.sorteioState.isSpinning = false;
        if (btnSpin) {
          btnSpin.disabled = false;
          btnSpin.innerHTML = '<i class="fa-solid fa-play mr-2"></i> Abrir Caixa';
        }
        if (statusBadge) {
          statusBadge.textContent = "Sorteio concluído!";
          statusBadge.className = "text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30";
        }
        this.view.openWinnerModal(finalWinner, chances.allEqual);
      });
    };

    if (btnSpin) {
      btnSpin.addEventListener("click", triggerSpin);
    }

    if (modalBtnClose) {
      modalBtnClose.addEventListener("click", () => this.view.closeWinnerModal());
    }
    if (modalBtnSpinAgain) {
      modalBtnSpinAgain.addEventListener("click", () => {
        this.view.closeWinnerModal();
        setTimeout(() => triggerSpin(), 300);
      });
    }

    if (modalWinner) {
      modalWinner.addEventListener("click", (e) => {
        if (e.target === modalWinner) {
          this.view.closeWinnerModal();
        }
      });
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modalWinner && !modalWinner.classList.contains("hidden")) {
        this.view.closeWinnerModal();
      }
    });

    updateRaffle();
  }
}

// Cria e expõe as instâncias globais para funcionamento das páginas
const appModel = new GameModel();
const appView = new GameView();
const appController = new GameController(appModel, appView);
