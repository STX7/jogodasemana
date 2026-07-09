/**
 * Jogo da Semana - View (MVC)
 * Controla a manipulação do DOM e renderização do HTML de forma dinâmica.
 */

class GameView {
  constructor() {
    this.currentCarouselIndex = 0;
  }

  /**
   * Injeta o cabeçalho e o rodapé padrão da aplicação.
   * Isso evita duplicação de HTML entre as páginas.
   */
  renderHeaderAndFooter() {
    const headerContainer = document.getElementById("header-container");
    const footerContainer = document.getElementById("footer-container");

    const currentPath = window.location.pathname;
    const getActive = (pageName) => currentPath.includes(pageName) ? "text-brand-400 font-bold border-b-2 border-brand-500 pb-1" : "text-gray-300 hover:text-brand-400 transition-colors";

    // Header simples e elegante (não fixado, sem glassmorphism)
    if (headerContainer) {
      headerContainer.innerHTML = `
        <header class="bg-gray-900 border-b border-gray-800 py-5">
          <div class="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <!-- Logo -->
            <a href="index.html" class="flex items-center gap-3 group">
              <div class="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-lg shadow-brand-500/20 group-hover:bg-brand-500 transition-all duration-300">
                <i class="fa-solid fa-gamepad text-lg"></i>
              </div>
              <div>
                <span class="text-xl font-black tracking-wider text-white">JOGO DA SEMANA</span>
                <p class="text-[10px] text-gray-500 font-medium tracking-widest uppercase">Histórico Gamer</p>
              </div>
            </a>

            <!-- Navegação -->
            <nav class="flex items-center gap-6 text-sm font-semibold mt-2 md:mt-0">
              <a href="index.html" class="${getActive("index.html") || (!currentPath.includes(".html") ? "text-brand-400 font-bold border-b-2 border-brand-500 pb-1" : "")}">Jogos</a>
              <a href="melhores.html" class="${getActive("melhores.html")}">Melhores do Mês</a>
              <a href="regras.html" class="${getActive("regras.html")}">Regras</a>
              <a href="sobre.html" class="${getActive("sobre.html")}">Sobre</a>
            </nav>
          </div>
        </header>
      `;
    }

    if (footerContainer) {
      footerContainer.innerHTML = `
        <footer class="bg-gray-900 border-t border-gray-800 py-8 mt-16 text-center text-sm text-gray-500">
          <div class="max-w-6xl mx-auto px-4 space-y-4">
            <div class="flex items-center justify-center gap-2 text-gray-400 font-semibold">
              <i class="fa-solid fa-gamepad text-brand-500"></i> Jogo da Semana &copy; ${new Date().getFullYear()}
            </div>
            <p class="text-xs max-w-md mx-auto text-gray-600">
              Site estático para registrar o histórico de jogos jogados semanalmente. Desenvolvido para funcionar no GitHub Pages.
            </p>
            <div class="flex justify-center gap-4 text-xs font-semibold">
              <a href="index.html" class="hover:text-brand-400 transition-colors">Jogos</a>
              <span>&bull;</span>
              <a href="melhores.html" class="hover:text-brand-400 transition-colors">Melhores</a>
              <span>&bull;</span>
              <a href="regras.html" class="hover:text-brand-400 transition-colors">Regras</a>
              <span>&bull;</span>
              <a href="sobre.html" class="hover:text-brand-400 transition-colors">Sobre</a>
            </div>
          </div>
        </footer>
      `;
    }
  }

  /**
   * Renderiza a lista de jogos simples (nome, quem escolheu, data)
   * @param {Array} games 
   */
  renderGamesList(games) {
    const listContainer = document.getElementById("games-list");
    if (!listContainer) return;

    if (games.length === 0) {
      listContainer.innerHTML = `
        <div class="bg-gray-900 rounded-xl border border-gray-800 p-8 text-center text-gray-400">
          <i class="fa-regular fa-folder-open text-4xl text-gray-600 mb-3"></i>
          <p>Nenhum jogo encontrado para os filtros selecionados.</p>
        </div>
      `;
      return;
    }

    let html = `
      <div class="overflow-x-auto bg-gray-900 rounded-xl border border-gray-800 shadow-xl">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-gray-800 bg-gray-950/50 text-xs font-bold uppercase tracking-wider text-brand-400">
              <th class="py-4 px-6">Jogo</th>
              <th class="py-4 px-6">Quem Escolheu</th>
              <th class="py-4 px-6">Data de Início</th>
              <th class="py-4 px-6 text-right">Ação</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-800 text-sm">
    `;

    games.forEach((game, index) => {
      // Formata a data (AAAA-MM-DD para DD/MM/AAAA)
      let formattedDate = game.date;
      if (game.date && game.date !== "Data inválida") {
        const parts = game.date.split('-');
        formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
      }

      const ratingBadge = `
        <span class="ml-2 text-xs font-semibold bg-brand-950/60 text-brand-300 border border-brand-800/50 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
          <i class="fa-solid fa-star text-yellow-500 text-[10px]"></i> ${game.rating.toFixed(1)}
        </span>
      `;

      html += `
        <tr class="hover:bg-gray-800/40 transition-colors group">
          <td class="py-4 px-6 font-bold text-white">
            <div class="flex items-center gap-3">
              <a href="jogo.html?id=${game.id}" class="hover:text-brand-400 transition-colors flex items-center gap-1.5">
                ${game.title}
              </a>
              ${ratingBadge}
            </div>
          </td>
          <td class="py-4 px-6 text-gray-300 font-medium">
            <span class="inline-flex items-center gap-1.5">
              <img src="https://api.dicebear.com/7.x/bottts/svg?seed=${game.chooser}" class="w-5 h-5 rounded-md bg-brand-900/30 p-0.5" alt="Avatar">
              ${game.chooser}
            </span>
          </td>
          <td class="py-4 px-6 text-gray-400 font-mono">
            ${formattedDate}
          </td>
          <td class="py-4 px-6 text-right">
            <a href="jogo.html?id=${game.id}" class="inline-flex items-center gap-1.5 bg-gray-800 hover:bg-brand-600 hover:text-white text-gray-300 text-xs font-bold px-3 py-1.5 rounded-lg border border-gray-700 hover:border-brand-500 transition-all">
              Detalhes <i class="fa-solid fa-arrow-right text-[10px] group-hover:translate-x-0.5 transition-transform"></i>
            </a>
          </td>
        </tr>
      `;
    });

    html += `
          </tbody>
        </table>
      </div>
    `;

    listContainer.innerHTML = html;
  }

  /**
   * Renderiza os controles de paginação
   * @param {number} totalPages 
   * @param {number} currentPage 
   * @param {function} onPageClick 
   */
  renderPagination(totalPages, currentPage, onPageClick) {
    const container = document.getElementById("pagination-container");
    if (!container) return;

    if (totalPages <= 1) {
      container.innerHTML = "";
      return;
    }

    let html = `<div class="flex items-center justify-center gap-2 mt-8">`;

    // Botão Anterior
    const prevDisabled = currentPage === 1;
    html += `
      <button 
        data-page="${currentPage - 1}" 
        ${prevDisabled ? "disabled" : ""} 
        class="flex items-center justify-center w-10 h-10 bg-gray-900 border border-gray-800 hover:bg-brand-600 disabled:hover:bg-gray-900 disabled:opacity-40 text-gray-300 disabled:text-gray-600 rounded-xl transition-all"
        title="Página Anterior"
      >
        <i class="fa-solid fa-chevron-left text-xs"></i>
      </button>
    `;

    // Páginas numéricas
    for (let i = 1; i <= totalPages; i++) {
      const activeClass = i === currentPage 
        ? "bg-brand-600 text-white border-brand-500 font-bold shadow-lg shadow-brand-500/20" 
        : "bg-gray-900 text-gray-400 hover:text-white border-gray-800 hover:border-brand-500/50 hover:bg-gray-800";
      
      html += `
        <button 
          data-page="${i}" 
          class="w-10 h-10 border rounded-xl flex items-center justify-center text-sm font-semibold transition-all ${activeClass}"
        >
          ${i}
        </button>
      `;
    }

    // Botão Próximo
    const nextDisabled = currentPage === totalPages;
    html += `
      <button 
        data-page="${currentPage + 1}" 
        ${nextDisabled ? "disabled" : ""} 
        class="flex items-center justify-center w-10 h-10 bg-gray-900 border border-gray-800 hover:bg-brand-600 disabled:hover:bg-gray-900 disabled:opacity-40 text-gray-300 disabled:text-gray-600 rounded-xl transition-all"
        title="Próxima Página"
      >
        <i class="fa-solid fa-chevron-right text-xs"></i>
      </button>
    `;

    html += `</div>`;
    container.innerHTML = html;

    // Adiciona escuta aos botões
    container.querySelectorAll("button[data-page]").forEach(button => {
      button.addEventListener("click", (e) => {
        const page = parseInt(e.currentTarget.getAttribute("data-page"));
        if (!isNaN(page) && page !== currentPage && page >= 1 && page <= totalPages) {
          onPageClick(page);
        }
      });
    });
  }

  /**
   * Converte links do YouTube em código de incorporação (embed)
   * @param {string} url 
   * @returns {string|null} URL do embed ou null se inválida
   */
  parseYoutubeEmbed(url) {
    if (!url) return null;
    try {
      let videoId = null;
      // Casos do link padrão: https://www.youtube.com/watch?v=dQw4w9WgXcQ
      if (url.includes("youtube.com/watch")) {
        const urlParams = new URLSearchParams(new URL(url).search);
        videoId = urlParams.get("v");
      }
      // Casos do link encurtado: https://youtu.be/dQw4w9WgXcQ
      else if (url.includes("youtu.be/")) {
        const parts = url.split("youtu.be/");
        if (parts.length > 1) {
          videoId = parts[1].split(/[?#]/)[0];
        }
      }
      // Casos do link embed direto: https://www.youtube.com/embed/dQw4w9WgXcQ
      else if (url.includes("youtube.com/embed/")) {
        const parts = url.split("youtube.com/embed/");
        if (parts.length > 1) {
          videoId = parts[1].split(/[?#]/)[0];
        }
      }

      if (videoId && videoId.trim().length > 0 && videoId.trim().length <= 15) {
        return `https://www.youtube.com/embed/${videoId.trim()}`;
      }
      return null;
    } catch (e) {
      console.error("Erro ao converter URL do Youtube:", e);
      return null;
    }
  }

  /**
   * Renderiza os detalhes de um jogo na tela de jogo.html
   * @param {Object} game 
   */
  renderGameDetails(game) {
    if (!game) {
      this.renderGameNotFoundError();
      return;
    }

    // Set page title
    document.title = `${game.title} - Jogo da Semana`;

    // 1. Título e Categoria do Banner
    const gameTitleElement = document.getElementById("game-title");
    const gameGenreElement = document.getElementById("game-genre");
    const headerBannerElement = document.getElementById("header-banner");

    if (gameTitleElement) gameTitleElement.textContent = game.title;
    if (gameGenreElement) gameGenreElement.textContent = game.genre;
    if (headerBannerElement && game.banner) {
      headerBannerElement.style.backgroundImage = `url('${game.banner}')`;
    }

    // 2. Data da Semana
    const gameDateElement = document.getElementById("game-date");
    if (gameDateElement && game.date !== "Data inválida") {
      const parts = game.date.split('-');
      const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
      gameDateElement.innerHTML = `<i class="fa-regular fa-calendar-days text-brand-400"></i> Semana de ${formattedDate}`;
    }

    // 3. Quem Escolheu
    const chooserAvatarElement = document.getElementById("chooser-avatar");
    const chooserNameElement = document.getElementById("chooser-name");
    if (chooserNameElement) chooserNameElement.textContent = game.chooser;
    if (chooserAvatarElement) {
      chooserAvatarElement.src = `https://api.dicebear.com/7.x/bottts/svg?seed=${game.chooser}`;
    }

    // 4. Quem Participou (Membros)
    const participantsContainer = document.getElementById("participants-list");
    if (participantsContainer) {
      participantsContainer.innerHTML = "";
      if (game.participants.length > 0) {
        game.participants.forEach(p => {
          const div = document.createElement("div");
          div.className = "flex items-center gap-1.5 bg-gray-950/60 px-2 py-1 rounded-lg border border-gray-800";
          div.innerHTML = `
            <img src="https://api.dicebear.com/7.x/bottts/svg?seed=${p}" class="w-5 h-5 rounded-md bg-brand-500/20" alt="Avatar">
            <span class="text-white font-semibold text-xs">${p}</span>
          `;
          participantsContainer.appendChild(div);
        });
      } else {
        participantsContainer.innerHTML = `<span class="text-xs text-gray-500">Sem participantes registados.</span>`;
      }
    }

    // 5. Participações Especiais
    const specialContainer = document.getElementById("special-participants-section");
    const specialList = document.getElementById("special-participants-list");
    if (specialContainer && specialList) {
      if (game.specialParticipants && game.specialParticipants.length > 0) {
        specialContainer.classList.remove("hidden");
        specialList.innerHTML = "";
        game.specialParticipants.forEach(sp => {
          const li = document.createElement("li");
          li.className = "flex items-center gap-2 text-sm text-gray-300 bg-brand-950/10 border border-brand-900/30 p-2 rounded-lg";
          li.innerHTML = `<i class="fa-solid fa-star text-brand-400 text-xs"></i> <span>${sp}</span>`;
          specialList.appendChild(li);
        });
      } else {
        specialContainer.classList.add("hidden");
      }
    }

    // 6. Sidebar Ficha Técnica
    const techDev = document.getElementById("tech-developer");
    const techRating = document.getElementById("tech-rating");
    const techPlatform = document.getElementById("tech-platform");
    
    if (techDev) techDev.textContent = game.developer;
    if (techPlatform) techPlatform.textContent = game.platform;
    if (techRating) {
      techRating.innerHTML = `<i class="fa-solid fa-star text-yellow-500 text-xs"></i> ${game.rating.toFixed(1)} / 5.0`;
    }

    // 7. Descrição
    const descElement = document.getElementById("game-description");
    if (descElement) descElement.textContent = game.description;

    // 8. Galeria de Imagens (Carrossel Lightbox)
    this.renderGallery(game.gallery);

    // 9. Trailer do YouTube
    this.renderVideo(game.videoUrl);

    // 10. Comentários/Avaliações
    this.renderComments(game.comments);
  }

  /**
   * Renderiza a galeria de fotos (carrossel)
   * @param {Array} gallery 
   */
  renderGallery(gallery) {
    const gallerySection = document.getElementById("gallery-section");
    const track = document.getElementById("carouselTrack");
    
    if (!gallerySection) return;

    if (!gallery || gallery.length === 0) {
      // Se não há imagens, oculta o carrossel e mostra aviso triste
      if (track) track.innerHTML = "";
      gallerySection.innerHTML = `
        <h2 class="text-xl font-bold flex items-center gap-2 text-brand-400">
          <i class="fa-solid fa-images"></i> Galeria de Capturas
        </h2>
        <div class="bg-gray-950/40 rounded-xl border border-gray-800 p-8 text-center text-gray-500 text-sm">
          <div class="text-4xl mb-2">😞</div>
          <p class="text-gray-400 font-bold">Não foi gravado</p>
        </div>
      `;
      return;
    }

    this.currentCarouselIndex = 0;
    if (track) {
      track.innerHTML = "";
      gallery.forEach((imgUrl) => {
        const slide = document.createElement("div");
        slide.className = "min-w-full aspect-video cursor-pointer overflow-hidden";
        slide.innerHTML = `
          <img src="${imgUrl}" class="w-full h-full object-cover hover:scale-105 transition duration-500" alt="Captura de Tela" onerror="this.src='https://picsum.photos/id/1067/800/450'">
        `;
        slide.addEventListener("click", () => this.openLightbox(imgUrl));
        track.appendChild(slide);
      });
      // Reseta a transição do carrossel
      track.style.transform = `translateX(0%)`;
    }

    // Configura os botões do carrossel
    const prevBtn = document.getElementById("carousel-prev");
    const nextBtn = document.getElementById("carousel-next");
    const totalSlides = gallery.length;

    // Oculta botões se houver apenas 1 imagem
    if (totalSlides <= 1) {
      if (prevBtn) prevBtn.classList.add("hidden");
      if (nextBtn) nextBtn.classList.add("hidden");
    } else {
      if (prevBtn) {
        prevBtn.classList.remove("hidden");
        // Clone para limpar event listeners antigos
        const newPrev = prevBtn.cloneNode(true);
        prevBtn.parentNode.replaceChild(newPrev, prevBtn);
        newPrev.addEventListener("click", () => this.navigateCarousel(-1, totalSlides));
      }
      if (nextBtn) {
        nextBtn.classList.remove("hidden");
        // Clone para limpar event listeners antigos
        const newNext = nextBtn.cloneNode(true);
        nextBtn.parentNode.replaceChild(newNext, nextBtn);
        newNext.addEventListener("click", () => this.navigateCarousel(1, totalSlides));
      }
    }
  }

  /**
   * Navega pelos slides do carrossel
   */
  navigateCarousel(direction, totalSlides) {
    const track = document.getElementById("carouselTrack");
    if (!track) return;
    this.currentCarouselIndex = (this.currentCarouselIndex + direction + totalSlides) % totalSlides;
    track.style.transform = `translateX(-${this.currentCarouselIndex * 100}%)`;
  }

  /**
   * Abre o modal Lightbox com a imagem expandida
   */
  openLightbox(src) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    if (!modal || !modalImg) return;

    modalImg.src = src;
    modal.classList.remove("hidden");
    // Pequeno delay para acionar a transição CSS de opacidade
    setTimeout(() => {
      modal.classList.remove("opacity-0");
      modalImg.classList.remove("scale-95");
    }, 10);
  }

  /**
   * Fecha o modal Lightbox
   */
  closeLightbox() {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    if (!modal || !modalImg) return;

    modal.classList.add("opacity-0");
    modalImg.classList.add("scale-95");
    setTimeout(() => {
      modal.classList.add("hidden");
      modalImg.src = "";
    }, 300);
  }

  /**
   * Renderiza o trailer do Youtube
   * @param {string} videoUrl 
   */
  renderVideo(videoUrl) {
    const videoSection = document.getElementById("video-section");
    const videoIframeContainer = document.getElementById("video-iframe-container");
    
    if (!videoSection) return;

    const embedUrl = this.parseYoutubeEmbed(videoUrl);

    if (!videoUrl || !embedUrl) {
      // Se não há vídeo, mostra o aviso personalizado com cara triste
      videoSection.innerHTML = `
        <h2 class="text-xl font-bold flex items-center gap-2 text-brand-400">
          <i class="fa-solid fa-video"></i> Vídeo
        </h2>
        <div class="bg-gray-950/40 rounded-xl border border-gray-800 p-8 text-center text-gray-500 text-sm">
          <div class="text-4xl mb-2">😞</div>
          <p class="text-gray-400 font-bold">Não foi gravado</p>
        </div>
      `;
      return;
    }

    if (videoIframeContainer) {
      videoIframeContainer.innerHTML = `
        <iframe 
          class="w-full h-full" 
          src="${embedUrl}" 
          title="YouTube video player" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowfullscreen
        ></iframe>
      `;
    }
  }

  /**
   * Renderiza a lista de comentários
   * @param {Array} comments 
   */
  renderComments(comments) {
    const container = document.getElementById("comments-list");
    if (!container) return;

    container.innerHTML = "";

    if (!comments || comments.length === 0) {
      container.innerHTML = `
        <div class="bg-gray-950/20 p-6 rounded-xl border border-gray-800 text-center text-gray-500 text-sm">
          <i class="fa-regular fa-comment-dots text-2xl mb-1 text-gray-700"></i>
          <p>Nenhuma avaliação ou comentário registrado para esta semana.</p>
        </div>
      `;
      return;
    }

    comments.forEach(comment => {
      const commentDiv = document.createElement("div");
      commentDiv.className = "bg-gray-950/40 p-4 rounded-xl border border-gray-800 flex gap-3.5 hover:border-gray-700/60 transition-colors";
      commentDiv.innerHTML = `
        <img 
          src="https://api.dicebear.com/7.x/bottts/svg?seed=${comment.avatarSeed || comment.author}" 
          class="w-10 h-10 rounded-xl bg-brand-500/10 p-1 border border-gray-800" 
          alt="Avatar de ${comment.author}"
        >
        <div class="flex-1">
          <div class="flex items-center justify-between">
            <span class="font-bold text-sm text-white">${comment.author}</span>
            <span class="text-xs text-gray-500">${comment.time}</span>
          </div>
          <p class="text-sm text-gray-300 mt-1.5 leading-relaxed">${comment.text}</p>
        </div>
      `;
      container.appendChild(commentDiv);
    });
  }

  /**
   * Renderiza mensagem de erro quando um jogo não é encontrado
   */
  renderGameNotFoundError() {
    const mainContent = document.querySelector("main");
    if (mainContent) {
      mainContent.innerHTML = `
        <div class="max-w-xl mx-auto my-12 text-center bg-gray-900 border border-gray-800 p-8 rounded-2xl shadow-2xl space-y-6">
          <div class="w-16 h-16 bg-red-950/40 text-red-500 border border-red-800/30 rounded-full flex items-center justify-center mx-auto">
            <i class="fa-solid fa-triangle-exclamation text-2xl"></i>
          </div>
          <h2 class="text-2xl font-black text-white">Jogo Não Encontrado</h2>
          <p class="text-sm text-gray-400 leading-relaxed">
            O jogo que você está procurando não existe no banco de dados ou a URL possui um ID incorreto.
          </p>
          <a href="index.html" class="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-brand-500/10">
            <i class="fa-solid fa-chevron-left text-xs"></i> Voltar para a Lista de Jogos
          </a>
        </div>
      `;
    }
  }

  /**
   * Renderiza os melhores jogos agrupados por mês (melhores.html)
   * @param {Object} groupedGames 
   */
  renderMelhoresJogos(groupedGames) {
    const container = document.getElementById("best-games-container");
    if (!container) return;

    container.innerHTML = "";

    if (Object.keys(groupedGames).length === 0) {
      container.innerHTML = `
        <div class="bg-gray-900 rounded-xl border border-gray-800 p-8 text-center text-gray-400">
          <p>Nenhum jogo registrado para classificar.</p>
        </div>
      `;
      return;
    }

    for (const monthName in groupedGames) {
      const games = groupedGames[monthName];
      const monthSection = document.createElement("section");
      monthSection.className = "bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4 shadow-xl";

      let headerHtml = `
        <h2 class="text-lg font-black text-brand-400 border-b border-gray-800 pb-3 flex items-center gap-2">
          <i class="fa-regular fa-calendar"></i> ${monthName}
        </h2>
        <div class="space-y-3">
      `;

      games.forEach((game, index) => {
        // Badges do pódio (1º, 2º e 3º colocados)
        let medalHtml = "";
        if (index === 0) {
          medalHtml = `<span class="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1"><i class="fa-solid fa-trophy"></i> 1º Lugar</span>`;
        } else if (index === 1) {
          medalHtml = `<span class="bg-slate-400/20 text-slate-300 border border-slate-400/30 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1"><i class="fa-solid fa-medal"></i> 2º Lugar</span>`;
        } else if (index === 2) {
          medalHtml = `<span class="bg-amber-700/20 text-amber-500 border border-amber-800/30 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1"><i class="fa-solid fa-medal"></i> 3º Lugar</span>`;
        } else {
          medalHtml = `<span class="bg-gray-850 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-full">${index + 1}º</span>`;
        }

        let formattedDate = game.date;
        if (game.date && game.date !== "Data inválida") {
          const parts = game.date.split('-');
          formattedDate = `${parts[2]}/${parts[1]}`;
        }

        headerHtml += `
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-gray-950/40 border border-gray-800 rounded-xl hover:border-gray-700 transition-colors gap-3">
            <div class="flex items-center gap-3">
              ${medalHtml}
              <div>
                <a href="jogo.html?id=${game.id}" class="font-bold text-white hover:text-brand-400 transition-colors text-sm">${game.title}</a>
                <p class="text-xs text-gray-500 mt-0.5">Escolha de <span class="text-gray-400 font-semibold">${game.chooser}</span> em ${formattedDate}</p>
              </div>
            </div>
            <div class="flex items-center gap-4 self-stretch sm:self-auto justify-between border-t border-gray-800/40 sm:border-0 pt-2 sm:pt-0">
              <span class="text-xs text-brand-400 font-medium px-2 py-0.5 bg-brand-950/30 border border-brand-900/30 rounded-md">${game.genre.split(" / ")[0]}</span>
              <span class="text-sm font-bold text-yellow-500 flex items-center gap-1"><i class="fa-solid fa-star"></i> ${game.rating.toFixed(1)}</span>
            </div>
          </div>
        `;
      });

      headerHtml += `</div>`;
      monthSection.innerHTML = headerHtml;
      container.appendChild(monthSection);
    }
  }

  /**
   * Renderiza a página de regras (regras.html)
   * @param {Array} rules 
   */
  renderRules(rules) {
    const container = document.getElementById("rules-container");
    if (!container) return;

    container.innerHTML = "";
    
    rules.forEach(rule => {
      const card = document.createElement("div");
      card.className = "bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-brand-500/20 transition-all duration-300 flex gap-4";
      card.innerHTML = `
        <div class="w-10 h-10 rounded-xl bg-brand-950/60 border border-brand-500/30 flex items-center justify-center text-brand-400 font-black text-sm shrink-0">
          0${rule.number}
        </div>
        <div class="space-y-1">
          <h3 class="font-bold text-white text-base">${rule.title}</h3>
          <p class="text-sm text-gray-400 leading-relaxed">${rule.description}</p>
        </div>
      `;
      container.appendChild(card);
    });
  }

  /**
   * Renderiza a página sobre (sobre.html)
   * @param {Object} aboutInfo 
   */
  renderAbout(aboutInfo) {
    const descElement = document.getElementById("about-description");
    if (descElement && aboutInfo.description) {
      descElement.textContent = aboutInfo.description;
    }

    // Injeta estatísticas
    const totalGamesEl = document.getElementById("stat-total-games");
    const activeMembersEl = document.getElementById("stat-active-members");
    const avgRatingEl = document.getElementById("stat-avg-rating");
    const topGenreEl = document.getElementById("stat-top-genre");
    const mostPlayedEl = document.getElementById("stat-most-played");
    const mostPlayersEl = document.getElementById("stat-most-players");
    const worstGameEl = document.getElementById("stat-worst-game");

    if (aboutInfo.stats) {
      if (totalGamesEl) totalGamesEl.textContent = aboutInfo.stats.totalGames;
      if (activeMembersEl) activeMembersEl.textContent = aboutInfo.stats.activeMembers;
      if (avgRatingEl) avgRatingEl.textContent = `${aboutInfo.stats.averageRating} / 5.0`;
      if (topGenreEl) topGenreEl.textContent = aboutInfo.stats.primaryGenre;
      if (mostPlayedEl) mostPlayedEl.textContent = aboutInfo.stats.mostPlayedGame;
      if (mostPlayersEl) mostPlayersEl.textContent = aboutInfo.stats.gameWithMostPlayers;
      if (worstGameEl) worstGameEl.textContent = aboutInfo.stats.worstGame;
    }
  }
}
