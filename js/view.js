/**
 * Jogo da Semana - View (MVC)
 * Controla a manipulação do DOM e renderização do HTML de forma dinâmica.
 */

class GameView {
  constructor() {
    this.currentCarouselIndex = 0;
  }

  /**
   * Esconde o skeleton loader quando o conteúdo está pronto
   */
  hideSkeleton() {
    const skeleton = document.getElementById("skeleton-loader");
    if (skeleton) {
      skeleton.style.transition = "opacity 0.3s ease-out";
      skeleton.style.opacity = "0";
      setTimeout(() => {
        skeleton.style.display = "none";
      }, 300);
    }
  }

  formatRating(rating) {
    return typeof rating === "number" && !isNaN(rating) ? rating.toFixed(1) : "—";
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
              <a href="participantes.html" class="${getActive("participantes.html")} inline-flex items-center gap-1"><span>Participantes</span><span class="text-[9px] px-1.5 py-0.2 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 font-bold uppercase tracking-wider">Vergonha</span></a>
              <a href="categorias.html" class="${getActive("categorias.html")}">Categorias</a>
              <a href="sorteio.html" class="${getActive("sorteio.html")}">Sorteio</a>
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
            <div class="flex justify-center gap-4 text-xs font-semibold">
              <a href="index.html" class="hover:text-brand-400 transition-colors">Jogos</a>
              <span>&bull;</span>
              <a href="melhores.html" class="hover:text-brand-400 transition-colors">Melhores</a>
              <span>&bull;</span>
              <a href="regras.html" class="hover:text-brand-400 transition-colors">Regras</a>
              <span>&bull;</span>
              <a href="participantes.html" class="hover:text-brand-400 transition-colors">Participantes</a>
              <span>&bull;</span>
              <a href="categorias.html" class="hover:text-brand-400 transition-colors">Categorias</a>
              <span>&bull;</span>
              <a href="sorteio.html" class="hover:text-brand-400 transition-colors">Sorteio</a>
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

    const targetRows = 10;
    const visibleGames = Array.isArray(games) ? games.slice(0, targetRows) : [];
    const fillerRows = Math.max(0, targetRows - visibleGames.length);

    let html = `
      <div class="overflow-x-auto bg-gray-900 rounded-xl border border-gray-800 shadow-xl">
        <table class="w-full text-left border-collapse table-fixed">
          <thead>
            <tr class="border-b border-gray-800 bg-gray-950/50 text-xs font-bold uppercase tracking-wider text-brand-400">
              <th class="py-4 px-6 w-[50%]">Jogo</th>
              <th class="py-4 px-6 w-[22%]">Quem Escolheu</th>
              <th class="py-4 px-6 w-[14%]">Data de Início</th>
              <th class="py-4 px-6 w-[14%] text-right">Ação</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-800 text-sm">
    `;

    if (visibleGames.length === 0) {
      html += `
        <tr class="h-16">
          <td colspan="4" class="py-4 px-6 text-center text-gray-400">
            <i class="fa-regular fa-folder-open text-2xl text-gray-600 mb-2 block"></i>
            Nenhum jogo encontrado para os filtros selecionados.
          </td>
        </tr>
      `;
    }

    visibleGames.forEach((game) => {
      // Formata a data (AAAA-MM-DD para DD/MM/AAAA)
      let formattedDate = game.date;
      if (game.date && game.date !== "Data inválida") {
        const parts = game.date.split('-');
        formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
      }

      const ratingBadge = `
        <span class="ml-2 text-xs font-semibold bg-brand-950/60 text-brand-300 border border-brand-800/50 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
          <i class="fa-solid fa-star text-yellow-500 text-[10px]"></i> ${this.formatRating(game.rating)}
        </span>
      `;

      html += `
        <tr class="h-16 hover:bg-gray-800/40 transition-colors group">
          <td class="h-16 py-4 px-6 font-bold text-white align-middle overflow-hidden">
            <div class="flex items-center gap-3 min-w-0">
              <a href="jogo.html?id=${game.id}" class="hover:text-brand-400 transition-colors flex items-center gap-1.5 min-w-0 max-w-full">
                <span class="truncate block">${game.title}</span>
              </a>
              ${ratingBadge}
            </div>
          </td>
          <td class="h-16 py-4 px-6 text-gray-300 font-medium align-middle overflow-hidden">
            <span class="inline-flex items-center gap-1.5 max-w-full truncate align-middle">
              <img src="https://api.dicebear.com/7.x/bottts/svg?seed=${game.chooser}" loading="lazy" decoding="async" class="w-5 h-5 rounded-md bg-brand-900/30 p-0.5" alt="Avatar de ${game.chooser}">
              <span class="truncate">${game.chooser}</span>
            </span>
          </td>
          <td class="h-16 py-4 px-6 text-gray-400 font-mono align-middle whitespace-nowrap overflow-hidden text-ellipsis">
            ${formattedDate}
          </td>
          <td class="h-16 py-4 px-6 text-right align-middle whitespace-nowrap">
            <a href="jogo.html?id=${game.id}" class="inline-flex items-center gap-1.5 bg-gray-800 hover:bg-brand-600 hover:text-white text-gray-300 text-xs font-bold px-3 py-1.5 rounded-lg border border-gray-700 hover:border-brand-500 transition-all">
              Detalhes <i class="fa-solid fa-arrow-right text-[10px] group-hover:translate-x-0.5 transition-transform"></i>
            </a>
          </td>
        </tr>
      `;
    });

    for (let i = 0; i < fillerRows; i++) {
      html += `
        <tr class="h-16">
          <td class="h-16 py-4 px-6 text-transparent select-none align-middle">&nbsp;</td>
          <td class="h-16 py-4 px-6 text-transparent select-none align-middle">&nbsp;</td>
          <td class="h-16 py-4 px-6 text-transparent select-none align-middle">&nbsp;</td>
          <td class="h-16 py-4 px-6 text-transparent select-none align-middle">&nbsp;</td>
        </tr>
      `;
    }

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

    // Adiciona escuta aos botões utilizando Delegação de Eventos no container pai
    container.onclick = (e) => {
      const button = e.target.closest("button[data-page]");
      if (!button || button.disabled) return;
      const page = parseInt(button.getAttribute("data-page"), 10);
      if (!isNaN(page) && page !== currentPage && page >= 1 && page <= totalPages) {
        onPageClick(page);
      }
    };
  }

  /**
   * Converte links do YouTube em código de incorporação (embed)
   * @param {string} url 
   * @returns {string|null} URL do embed ou null se inválida
   */
  parseYoutubeEmbed(url) {
    if (!url) return null;
    try {
      const normalizedUrl = /^https?:\/\//i.test(url) ? url : `https://${url}`;
      let videoId = null;
      // Casos do link padrão: https://www.youtube.com/watch?v=dQw4w9WgXcQ
      if (normalizedUrl.includes("youtube.com/watch")) {
        const urlParams = new URLSearchParams(new URL(normalizedUrl).search);
        videoId = urlParams.get("v");
      }
      // Casos do link encurtado: https://youtu.be/dQw4w9WgXcQ
      else if (normalizedUrl.includes("youtu.be/")) {
        const parts = normalizedUrl.split("youtu.be/");
        if (parts.length > 1) {
          videoId = parts[1].split(/[?#]/)[0];
        }
      }
      // Casos do link embed direto: https://www.youtube.com/embed/dQw4w9WgXcQ
      else if (normalizedUrl.includes("youtube.com/embed/")) {
        const parts = normalizedUrl.split("youtube.com/embed/");
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
            <img src="https://api.dicebear.com/7.x/bottts/svg?seed=${p}" loading="lazy" decoding="async" class="w-5 h-5 rounded-md bg-brand-500/20" alt="Avatar de ${p}">
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
      const formattedRating = this.formatRating(game.rating);
      techRating.innerHTML = formattedRating === "—"
        ? `<i class="fa-solid fa-star text-yellow-500 text-xs"></i> Sem avaliação`
        : `<i class="fa-solid fa-star text-yellow-500 text-xs"></i> ${formattedRating} / 5.0`;
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
          <img src="${imgUrl}" loading="lazy" decoding="async" class="w-full h-full object-cover hover:scale-105 transition duration-500" alt="Captura de Tela" onerror="this.src='https://picsum.photos/id/1067/800/450'">
        `;
        slide.addEventListener("click", () => this.openLightbox(imgUrl));
        track.appendChild(slide);
      });
      // Reseta a transição do carrossel
      track.style.transform = `translateX(0%)`;
    }

    // Configura os botões do carrossel sem reconstruir/clonar nós do DOM
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
        prevBtn.onclick = () => this.navigateCarousel(-1, totalSlides);
      }
      if (nextBtn) {
        nextBtn.classList.remove("hidden");
        nextBtn.onclick = () => this.navigateCarousel(1, totalSlides);
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
          loading="lazy" 
          decoding="async" 
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
              <span class="text-sm font-bold text-yellow-500 flex items-center gap-1"><i class="fa-solid fa-star"></i> ${this.formatRating(game.rating)}</span>
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
      const note = rule.hoverNote;
      card.className = "group relative " + (note ? "" : "overflow-hidden ") + "bg-gradient-to-br from-gray-900 via-gray-900/95 to-brand-950/40 border border-gray-800/80 rounded-3xl p-5 hover:border-brand-500/30 transition-all duration-300 flex gap-4 shadow-lg";
      const bubble = note ? `
        <div class="pointer-events-none absolute left-6 bottom-full mb-3 w-72 max-w-[85vw] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 z-20">
          <div class="relative bg-gray-800 border border-brand-500/40 rounded-2xl p-3 shadow-xl flex gap-3 items-start">
            <img src="https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(note.author)}" alt="Avatar de ${note.author}" class="w-9 h-9 rounded-lg bg-brand-500/20 shrink-0">
            <div>
              <p class="text-xs font-bold text-brand-400">${note.author}</p>
              <p class="text-sm text-gray-200 leading-snug">${note.text}</p>
            </div>
            <span class="absolute left-6 -bottom-1.5 w-3 h-3 bg-gray-800 border-r border-b border-brand-500/40 rotate-45"></span>
          </div>
        </div>` : "";
      card.innerHTML = `
        ${bubble}
        <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/40 to-transparent"></div>
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
    const platinadosEl = document.querySelector("#stat-platinados span");

    if (aboutInfo.stats) {
      if (totalGamesEl) totalGamesEl.textContent = aboutInfo.stats.totalGames;
      if (activeMembersEl) activeMembersEl.textContent = aboutInfo.stats.activeMembers;
      if (avgRatingEl) avgRatingEl.textContent = `${aboutInfo.stats.averageRating} / 5.0`;
      if (topGenreEl) topGenreEl.textContent = aboutInfo.stats.primaryGenre;
      if (mostPlayedEl) mostPlayedEl.textContent = aboutInfo.stats.mostPlayedGame;
      if (mostPlayersEl) mostPlayersEl.textContent = aboutInfo.stats.gameWithMostPlayers;
      if (worstGameEl) worstGameEl.textContent = aboutInfo.stats.worstGame;
      if (platinadosEl) platinadosEl.textContent = aboutInfo.stats.platinados;
    }
  }

  /**
   * Posiciona as palavras da nuvem de forma aleatória, sem sobreposição.
   * Usa espiral a partir de um ponto aleatório + checagem de colisão entre retângulos.
   * @param {HTMLElement} cloud Container
   * @param {Array} words Array de {name, count}
   */
  _layoutWordCloud(cloud, words) {
    const colors = ["text-brand-400", "text-yellow-400", "text-emerald-400", "text-sky-400", "text-pink-400", "text-orange-400", "text-violet-400"];
    const max = Math.max(...words.map(s => s.count));
    const min = Math.min(...words.map(s => s.count));
    const minPx = 14, maxPx = 64, pad = 6;

    const width = Math.max(cloud.clientWidth || cloud.parentElement.clientWidth - 64, 280);
    let height = Math.max(320, Math.round(width * 0.5));

    // Medição de texto
    const ctx = document.createElement("canvas").getContext("2d");
    const items = [...words]
      .sort((a, b) => b.count - a.count)
      .map(s => {
        const ratio = max === min ? 1 : (s.count - min) / (max - min);
        const size = Math.round(minPx + ratio * (maxPx - minPx));
        ctx.font = `900 ${size}px sans-serif`;
        const textW = ctx.measureText(s.name).width;
        const rotated = ratio < 0.5 && Math.random() < 0.25; // palavras menores às vezes na vertical
        return {
          ...s, size, ratio, rotated,
          w: (rotated ? size : textW) + pad,
          h: (rotated ? textW : size) + pad,
          tilt: rotated ? 0 : (Math.random() * 16 - 8)
        };
      });

    const placed = [];
    const hits = (x, y, it) => placed.some(p =>
      x < p.x + p.w && x + it.w > p.x && y < p.y + p.h && y + it.h > p.y);

    const place = (it) => {
      const cx = width / 2, cy = height / 2;
      // Ponto de partida aleatório; espiral expande até achar espaço livre
      const startAngle = Math.random() * Math.PI * 2;
      const jitterX = (Math.random() - 0.5) * width * 0.5;
      const jitterY = (Math.random() - 0.5) * height * 0.5;
      for (let step = 0; step < 4000; step++) {
        const angle = startAngle + step * 0.35;
        const r = step * 0.6;
        const x = cx + jitterX + Math.cos(angle) * r * 1.6 - it.w / 2;
        const y = cy + jitterY + Math.sin(angle) * r - it.h / 2;
        if (x < 0 || y < 0 || x + it.w > width || y + it.h > height) continue;
        if (!hits(x, y, it)) { it.x = x; it.y = y; placed.push(it); return true; }
      }
      return false;
    };

    // Se não couber, aumenta a altura e tenta de novo
    let ok = false;
    for (let attempt = 0; attempt < 6 && !ok; attempt++) {
      placed.length = 0;
      ok = items.every(place);
      if (!ok) height = Math.round(height * 1.2);
    }

    cloud.style.position = "relative";
    cloud.style.display = "block";
    cloud.style.width = "100%";
    cloud.style.height = height + "px";
    cloud.innerHTML = items.map((it, i) => {
      if (it.x === undefined) return "";
      const weight = it.ratio > 0.5 ? "font-black" : "font-bold";
      const transform = it.rotated ? "writing-mode:vertical-rl;" : `transform:rotate(${it.tilt.toFixed(1)}deg);`;
      return `<span class="${colors[Math.floor(Math.random() * colors.length)]} ${weight} cursor-default hover:brightness-125 transition-all" style="position:absolute;left:${Math.round(it.x)}px;top:${Math.round(it.y)}px;font-size:${it.size}px;line-height:1;white-space:nowrap;padding:${pad / 2}px;${transform}" title="${it.name}: ${it.count}x">${it.name}</span>`;
    }).join("");
  }

  /**
   * Renderiza a página de Categorias (nuvem de palavras + tabela)
   * @param {Array} stats Array de {name, count, games, status, rule}
   */
  renderCategoriesPage(stats) {
    const cloud = document.getElementById("categories-cloud");
    const tbody = document.getElementById("categories-table-body");
    const summary = document.getElementById("categories-summary");
    if (!cloud || !tbody) return;

    const played = stats.filter(s => s.count > 0);
    const available = stats.filter(s => s.status === "available").length;

    if (summary) {
      summary.textContent = `${played.length} jogadas • ${available} ainda não jogadas e permitidas • ${stats.filter(s => s.status === "blocked").length} bloqueadas pelas regras`;
    }

    // Nuvem de palavras: tamanho proporcional à frequência, posições aleatórias
    if (played.length === 0) {
      cloud.innerHTML = `<p class="text-gray-500 text-sm">Nenhuma categoria jogada ainda.</p>`;
    } else {
      const layoutCloud = () => this._layoutWordCloud(cloud, played);
      layoutCloud();
      if (!this._cloudResizeBound) {
        this._cloudResizeBound = true;
        let t;
        window.addEventListener("resize", () => {
          clearTimeout(t);
          t = setTimeout(layoutCloud, 200);
        });
      }
    }

    // Tabela completa
    tbody.innerHTML = stats.map(s => {
      let badge;
      if (s.count > 0) {
        badge = `<span class="text-xs font-bold px-2 py-1 rounded-md bg-brand-500/10 text-brand-400 border border-brand-500/20">Já jogada</span>`;
      } else if (s.status === "blocked") {
        badge = `<span class="text-xs font-bold px-2 py-1 rounded-md bg-red-500/10 text-red-400 border border-red-500/20">Bloqueada (regra ${s.rule})</span>`;
      } else {
        badge = `<span class="text-xs font-bold px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Disponível</span>`;
      }
      const games = s.games.length ? s.games.join(", ") : "—";
      return `
        <tr class="border-t border-gray-800 hover:bg-gray-800/40">
          <td class="px-4 py-3 font-semibold text-white">${s.name}</td>
          <td class="px-4 py-3 text-center font-black ${s.count > 0 ? "text-brand-400" : "text-gray-600"}">${s.count}</td>
          <td class="px-4 py-3">${badge}</td>
          <td class="px-4 py-3 text-xs text-gray-500 hidden md:table-cell">${games}</td>
        </tr>`;
    }).join("");
  }

  /**
   * Renderiza a página de Participantes
   * @param {Array} ranking Array de {name, count}
   */
  renderParticipantsPage(ranking) {
    const container = document.getElementById("participants-container");
    if (!container) return;

    if (!ranking || ranking.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-16 text-center">
          <p class="text-gray-500 font-medium">Nenhum participante encontrado.</p>
        </div>
      `;
      return;
    }

    // Lógica para empates (Ranking Denso)
    let currentRank = 1;
    let currentScore = ranking[0].count;

    const html = ranking.map((p, index) => {
      // Se a pontuação for menor que a do anterior, aumenta o rank em apenas 1 (Top 2, Top 3, etc)
      // Independentemente de quantas pessoas estão empatadas no rank anterior.
      if (p.count < currentScore) {
        currentRank++;
        currentScore = p.count;
      }

      // Diferenciar visualmente o pódio
      let rankColor = "text-gray-500";
      let rankBg = "bg-gray-800/50";
      let icon = "";

      if (currentRank === 1) {
        rankColor = "text-yellow-400";
        rankBg = "bg-yellow-400/10 border border-yellow-400/20";
        icon = '<i class="fa-solid fa-crown text-yellow-400 ml-2"></i>';
      } else if (currentRank === 2) {
        rankColor = "text-gray-300";
        rankBg = "bg-gray-300/10 border border-gray-300/20";
      } else if (currentRank === 3) {
        rankColor = "text-amber-600";
        rankBg = "bg-amber-600/10 border border-amber-600/20";
      }

      return `
        <div class="flex items-center justify-between p-4 rounded-xl transition-all duration-300 hover:shadow-lg ${rankBg} ${currentRank > 3 ? 'bg-gray-900 border border-gray-800' : ''}">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-700 bg-gray-800 flex items-center justify-center shrink-0">
              <img src="https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(p.name)}&backgroundColor=1f2937" loading="lazy" decoding="async" alt="Avatar de ${p.name}" class="w-full h-full object-cover">
            </div>
            <div>
              <h3 class="text-lg font-bold text-gray-100 flex items-center">${p.name} ${icon}</h3>
              <p class="text-xs text-brand-400 font-semibold uppercase tracking-wider">Top ${currentRank}</p>
            </div>
          </div>
          <div class="text-right">
            <span class="text-2xl font-black text-white">${p.count}</span>
            <span class="text-xs text-gray-500 block uppercase font-bold tracking-widest">Jogos</span>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = html;
  }

  /**
   * Renderiza o Quadro da Vergonha na página de Participantes
   * @param {Array} shameList 
   */
  renderShameBoard(shameList) {
    const container = document.getElementById("shame-board-container");
    if (!container) return;

    if (!shameList || shameList.length === 0) {
      container.innerHTML = `
        <div class="py-12 px-6 text-center rounded-2xl bg-gray-900/40 border border-gray-800">
          <div class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-400 mb-3 border border-emerald-500/20">
            <i class="fa-solid fa-shield-halved text-2xl"></i>
          </div>
          <h3 class="text-base font-bold text-gray-200">Nenhum infrator registrado</h3>
          <p class="text-xs text-gray-500 mt-1 max-w-md mx-auto">
            Todos os participantes estão cumprindo rigorosamente as regras da jogatina... por enquanto.
          </p>
        </div>
      `;
      return;
    }

    const html = shameList.map(item => {
      let formattedDate = item.date || "";
      if (item.date && item.date.includes("-")) {
        const parts = item.date.split("-");
        formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
      }

      const isGrave = item.severity === "grave";
      const isCleanPenalty = (item.penalty || "").toLowerCase().includes("sem penalidade");

      let severityBadge = "";
      if (isGrave) {
        severityBadge = `<span class="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/40 shadow-[0_0_10px_rgba(239,68,68,0.2)]">Infração Grave</span>`;
      } else if (item.severity === "media") {
        severityBadge = `<span class="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40">Infração Média</span>`;
      } else {
        severityBadge = `<span class="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/40">Advertência</span>`;
      }

      const penaltyIcon = isCleanPenalty ? "fa-circle-info text-yellow-400" : "fa-gavel text-red-400";
      const penaltyBg = isCleanPenalty ? "bg-yellow-950/20 border-yellow-900/30" : "bg-red-950/40 border-red-900/50";
      const penaltyHeaderColor = isCleanPenalty ? "text-yellow-300" : "text-red-300";
      const penaltyTextColor = isCleanPenalty ? "text-gray-400 italic" : "text-red-200 font-semibold";

      return `
        <div class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-950/30 via-gray-900/80 to-gray-900/80 border ${isGrave ? 'border-red-600/50 shadow-[0_0_20px_rgba(239,68,68,0.15)]' : 'border-red-900/40 hover:border-red-600/50'} p-5 transition-all duration-300 shadow-lg group">
          <!-- Faixa lateral de destaque -->
          <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${isGrave ? 'from-red-500 via-rose-600 to-red-800' : 'from-yellow-500 via-amber-600 to-red-700'}"></div>

          <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-gray-800/80">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 rounded-full overflow-hidden border-2 ${isGrave ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.35)]' : 'border-red-600/50'} bg-red-950/60 flex items-center justify-center shrink-0">
                <img src="https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(item.participant)}&backgroundColor=450a0a" loading="lazy" decoding="async" alt="Avatar de ${item.participant}" class="w-full h-full object-cover">
              </div>
              <div>
                <div class="flex items-center gap-2 flex-wrap">
                  <h3 class="text-xl font-black text-white tracking-tight">${item.participant}</h3>
                  ${severityBadge}
                </div>
                <div class="flex items-center gap-3 mt-1 text-xs text-gray-400 flex-wrap">
                  <span class="inline-flex items-center gap-1.5 text-red-400 font-semibold">
                    <i class="fa-solid fa-triangle-exclamation"></i> Regra #${item.ruleNumber}: ${item.ruleTitle}
                  </span>
                  <span>&bull;</span>
                  <span class="inline-flex items-center gap-1 text-gray-400">
                    <i class="fa-solid fa-gamepad text-gray-500"></i> ${item.game}
                  </span>
                  <span>&bull;</span>
                  <span class="inline-flex items-center gap-1 text-gray-400">
                    <i class="fa-regular fa-calendar text-gray-500"></i> ${formattedDate}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Descrição do Incidente -->
          <div class="mt-3.5 bg-gray-950/70 rounded-xl p-3.5 border border-red-950/50">
            <div class="text-xs font-bold uppercase tracking-wider text-red-400/90 mb-1 flex items-center gap-1.5">
              <i class="fa-solid fa-file-circle-exclamation"></i> Motivo da Advertência
            </div>
            <p class="text-sm text-gray-300 leading-relaxed font-normal">
              ${item.incident}
            </p>
          </div>

          <!-- Punição / Sentença -->
          <div class="mt-3 flex items-start gap-2.5 text-xs ${penaltyBg} px-3.5 py-2.5 rounded-xl border">
            <i class="fa-solid ${penaltyIcon} text-sm mt-0.5 shrink-0"></i>
            <div>
              <strong class="font-bold ${penaltyHeaderColor} uppercase tracking-wider text-[11px] block">Penalidade / Situação:</strong>
              <span class="${penaltyTextColor}">${item.penalty}</span>
            </div>
          </div>
        </div>
      `;
    }).join("");

    container.innerHTML = html;
  }

  /**
   * =========================================================================
   * Métodos da Página de Sorteio (Loot Box / Roleta CS:GO)
   * =========================================================================
   */

  /**
   * Toca som sintético de tick/clique da roleta do CS:GO usando Web Audio API
   */
  playSorteioTickSound() {
    try {
      if (!this._audioCtx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this._audioCtx = new AudioCtx();
      }
      if (!this._audioCtx) return;
      if (this._audioCtx.state === 'suspended') {
        this._audioCtx.resume();
      }
      const osc = this._audioCtx.createOscillator();
      const gain = this._audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(650, this._audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, this._audioCtx.currentTime + 0.035);
      gain.gain.setValueAtTime(0.08, this._audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this._audioCtx.currentTime + 0.035);
      osc.connect(gain);
      gain.connect(this._audioCtx.destination);
      osc.start();
      osc.stop(this._audioCtx.currentTime + 0.035);
    } catch (e) {
      // Ignora falhas de áudio silenciosamente
    }
  }

  /**
   * Renderiza a lista de chances e probabilidades dos jogos ativos
   * @param {Array} itemsWithChances 
   * @param {number} totalTickets 
   * @param {boolean} allEqual 
   */
  renderSorteioChancesList(itemsWithChances, totalTickets, allEqual) {
    const container = document.getElementById("chances-list-container");
    const totalEl = document.getElementById("total-tickets-display");
    if (!container) return;

    if (totalEl) {
      totalEl.textContent = `${itemsWithChances.length} jogo(s) ativo(s) • ${totalTickets} chance(s) total`;
    }

    if (itemsWithChances.length === 0) {
      container.innerHTML = `
        <div class="py-12 text-center text-gray-500 text-sm">
          <i class="fa-solid fa-triangle-exclamation text-2xl mb-2 text-yellow-500/50 block"></i>
          Nenhum jogo selecionado para o sorteio. Adicione jogos ou marque títulos da lista.
        </div>
      `;
      return;
    }

    const html = itemsWithChances.map(item => {
      let badgeColor = "bg-gray-800 text-gray-300 border-gray-700";
      let barColor = "bg-gray-500";
      let rarityLabel = "50% - 99% (Comum)";

      if (allEqual) {
        badgeColor = "bg-brand-950/60 text-brand-300 border-brand-800/40";
        barColor = "bg-brand-500";
        rarityLabel = "Chances Iguais";
      } else if (item.rarity === "legendary") {
        badgeColor = "bg-yellow-500/10 text-yellow-400 border-yellow-500/30";
        barColor = "bg-yellow-400 shadow-[0_0_10px_#facc15]";
        rarityLabel = "< 9% (Lendário • Dourado)";
      } else if (item.rarity === "epic") {
        badgeColor = "bg-purple-500/10 text-purple-400 border-purple-500/30";
        barColor = "bg-purple-400 shadow-[0_0_10px_#c084fc]";
        rarityLabel = "10% - 29% (Épico • Roxo)";
      } else if (item.rarity === "rare") {
        badgeColor = "bg-blue-500/10 text-blue-400 border-blue-500/30";
        barColor = "bg-blue-400 shadow-[0_0_10px_#60a5fa]";
        rarityLabel = "30% - 49% (Raro • Azul)";
      }

      return `
        <div class="p-3 rounded-2xl bg-gray-950/70 border border-gray-800/80 hover:border-gray-700 transition flex flex-col gap-2">
          <div class="flex items-center justify-between gap-3">
            <div class="flex items-center gap-2.5 min-w-0">
              ${item.banner ? `<img src="${item.banner}" alt="${item.title}" class="w-8 h-8 rounded-lg object-cover shrink-0 border border-gray-800" onerror="this.style.display='none'">` : `<div class="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center shrink-0 text-gray-500 text-xs"><i class="fa-solid fa-gamepad"></i></div>`}
              <div class="truncate">
                <span class="font-bold text-sm text-white block truncate">${item.title}</span>
                <span class="text-[11px] text-gray-500 block truncate">${item.genre || 'Sorteio'}</span>
              </div>
            </div>
            <div class="text-right shrink-0">
              <span class="text-sm font-black text-white">${item.percentage}%</span>
              <span class="text-[10px] text-gray-400 block font-semibold">${item.tickets} chance(s)</span>
            </div>
          </div>
          <!-- Barra de probabilidade visual -->
          <div class="w-full bg-gray-900 rounded-full h-1.5 overflow-hidden">
            <div class="${barColor} h-full rounded-full transition-all duration-500" style="width: ${Math.min(100, Math.max(3, item.percentage))}%;"></div>
          </div>
          <div class="flex items-center justify-between text-[10px] text-gray-500">
            <span>Raridade:</span>
            <span class="font-semibold px-2 py-0.5 rounded-full border ${badgeColor}">${rarityLabel}</span>
          </div>
        </div>
      `;
    }).join("");

    container.innerHTML = html;
  }

  /**
   * Renderiza a grade de jogos já jogados com checkboxes e controles de peso (+/-)
   * @param {Array} playedGames 
   * @param {string} filterText 
   */
  renderSorteioPlayedGamesList(playedGames, filterText = "") {
    const container = document.getElementById("played-games-list");
    if (!container) return;

    const query = (filterText || "").toLowerCase().trim();
    const filtered = playedGames.filter(g => !query || g.title.toLowerCase().includes(query));

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-8 text-center text-gray-500 text-xs">
          Nenhum jogo encontrado com o termo informado.
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(game => {
      const activeClass = game.active !== false ? "border-brand-500/40 bg-gray-950/80" : "border-gray-800/60 bg-gray-950/30 opacity-50";

      return `
        <div class="p-2.5 rounded-2xl border ${activeClass} transition flex items-center justify-between gap-2" data-game-id="${game.id}">
          <label class="flex items-center gap-2.5 min-w-0 cursor-pointer flex-1">
            <input type="checkbox" class="played-game-toggle rounded border-gray-700 text-brand-500 focus:ring-0 cursor-pointer bg-gray-900" data-game-id="${game.id}" ${game.active !== false ? 'checked' : ''}>
            ${game.banner ? `<img src="${game.banner}" alt="${game.title}" class="w-8 h-8 rounded-lg object-cover shrink-0 border border-gray-800" onerror="this.style.display='none'">` : `<div class="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center shrink-0 text-gray-500 text-xs"><i class="fa-solid fa-gamepad"></i></div>`}
            <span class="text-xs font-bold text-gray-200 truncate select-none">${game.title}</span>
          </label>
          <!-- Controles de Tickets (+ / -) -->
          <div class="flex items-center gap-1 shrink-0 bg-gray-900 px-1.5 py-1 rounded-xl border border-gray-800">
            <button type="button" class="btn-ticket-minus w-5 h-5 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-bold transition disabled:opacity-30" data-game-id="${game.id}" ${(game.tickets || 1) <= 1 ? 'disabled' : ''}>
              -
            </button>
            <span class="w-5 text-center text-xs font-black text-brand-400">${game.tickets || 1}</span>
            <button type="button" class="btn-ticket-plus w-5 h-5 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-bold transition" data-game-id="${game.id}">
              +
            </button>
          </div>
        </div>
      `;
    }).join("");
  }

  /**
   * Preenche a esteira horizontal da roleta com itens
   * @param {Array} itemsWithChances 
   */
  setupSorteioReel(itemsWithChances) {
    const track = document.getElementById("csgo-roulette-track");
    if (!track) return;

    if (!itemsWithChances || itemsWithChances.length === 0) {
      track.style.transition = "none";
      track.style.transform = "translateX(0px)";
      track.innerHTML = `
        <div class="w-full flex items-center justify-center px-8 text-gray-500 text-sm italic">
          Adicione jogos acima para montar a caixa de sorteio
        </div>
      `;
      return;
    }

    // Preenche com uma prévia bonita de itens alternados
    const previewItems = [];
    for (let i = 0; i < 20; i++) {
      previewItems.push(itemsWithChances[i % itemsWithChances.length]);
    }

    track.style.transition = "none";
    track.style.transform = "translateX(0px)";
    track.innerHTML = previewItems.map(item => this._createRouletteCardHtml(item)).join("");
  }

  /**
   * Gera o HTML de um card na esteira da roleta CS:GO
   */
  _createRouletteCardHtml(item) {
    let rarityBorder = "border-gray-800";
    let bottomStrip = "bg-gray-700";

    if (item.rarity === "legendary") {
      rarityBorder = "border-yellow-500/80 bg-gradient-to-b from-gray-900 to-yellow-950/30";
      bottomStrip = "bg-yellow-400 shadow-[0_0_12px_#facc15]";
    } else if (item.rarity === "epic") {
      rarityBorder = "border-purple-500/80 bg-gradient-to-b from-gray-900 to-purple-950/30";
      bottomStrip = "bg-purple-500 shadow-[0_0_12px_#c084fc]";
    } else if (item.rarity === "rare") {
      rarityBorder = "border-blue-500/80 bg-gradient-to-b from-gray-900 to-blue-950/30";
      bottomStrip = "bg-blue-500 shadow-[0_0_12px_#60a5fa]";
    }

    return `
      <div class="csgo-card shrink-0 w-36 md:w-44 h-40 md:h-48 mx-1.5 rounded-2xl bg-gray-900 border-2 ${rarityBorder} overflow-hidden flex flex-col justify-between shadow-lg relative select-none">
        <!-- Imagem / Arte do Jogo -->
        <div class="relative w-full flex-grow overflow-hidden bg-gray-950 flex items-center justify-center">
          ${item.banner ? `<img src="${item.banner}" alt="${item.title}" class="w-full h-full object-cover pointer-events-none" onerror="this.style.display='none'">` : `<i class="fa-solid fa-gamepad text-4xl text-gray-700"></i>`}
          <span class="absolute top-2 right-2 text-[10px] font-black px-1.5 py-0.5 rounded bg-black/75 text-white backdrop-blur-sm border border-white/10">
            ${item.percentage || item.tickets}x
          </span>
        </div>
        <!-- Nome do Jogo -->
        <div class="p-2 text-center bg-gray-900/95 border-t border-gray-800">
          <p class="text-xs font-black text-white truncate">${item.title}</p>
        </div>
        <!-- Faixa inferior de raridade estilo CS:GO -->
        <div class="w-full h-1.5 ${bottomStrip}"></div>
      </div>
    `;
  }

  /**
   * Executa a animação de giro da esteira estilo abertura de caixa do CS:GO
   * @param {Object} winner Jogo vencedor
   * @param {Array} itemsWithChances 
   * @param {boolean} allEqual 
   * @param {Function} onComplete 
   */
  animateSorteioRoll(winner, itemsWithChances, allEqual, onComplete) {
    const track = document.getElementById("csgo-roulette-track");
    const container = track ? track.parentElement : null;
    if (!track || !container) {
      if (onComplete) onComplete(winner);
      return;
    }

    // Configurações físicas da esteira
    const totalCards = 80;
    const winnerIndex = 65; // Card vencedor posicionado longe para uma corrida emocionante

    // Gera lista de cards na fita com o vencedor exatamente na posição winnerIndex
    const reelItems = [];
    for (let i = 0; i < totalCards; i++) {
      if (i === winnerIndex) {
        reelItems.push(winner);
      } else {
        // Escolhe outros itens proporcionalmente
        const randItem = itemsWithChances[Math.floor(Math.random() * itemsWithChances.length)];
        reelItems.push(randItem);
      }
    }

    track.innerHTML = reelItems.map(item => this._createRouletteCardHtml(item)).join("");

    // Garante layout sincronizado
    const cardElements = track.querySelectorAll(".csgo-card");
    if (cardElements.length === 0) {
      if (onComplete) onComplete(winner);
      return;
    }

    const firstCard = cardElements[0];
    const cardRect = firstCard.getBoundingClientRect();
    const cardWidth = cardRect.width;
    const cardMargin = 12; // mx-1.5 = 6px de cada lado = 12px
    const stepWidth = cardWidth + cardMargin;

    // Reseta posição da esteira instantaneamente
    track.style.transition = "none";
    track.style.transform = "translateX(0px)";

    // Força reflow no navegador
    void track.offsetWidth;

    // Calcula onde a esteira precisa parar para o card vencedor ficar no centro exato da linha
    const containerWidth = container.offsetWidth;
    const targetCardCenter = (winnerIndex * stepWidth) + (stepWidth / 2);
    const containerCenter = containerWidth / 2;

    // Jitter aleatório realista dentro do card (ex: +/- 35% da largura do card)
    const jitter = (Math.random() - 0.5) * (cardWidth * 0.7);
    const targetTranslateX = -(targetCardCenter - containerCenter + jitter);

    // Easing de abertura de caixa: arranque rápido e desaceleração suave estilo CS:GO
    const durationMs = 7500;
    track.style.transition = `transform ${durationMs}ms cubic-bezier(0.08, 0.9, 0.12, 1)`;
    track.style.transform = `translateX(${targetTranslateX}px)`;

    // Sistema de som a cada card que passa pelo ponteiro central
    let lastCardIndexPassed = -1;
    let animRunning = true;
    const startTime = performance.now();

    const checkPointerCross = () => {
      if (!animRunning) return;
      const computedMatrix = window.getComputedStyle(track).transform;
      if (computedMatrix && computedMatrix !== 'none') {
        const matrixValues = computedMatrix.match(/matrix.*((.+))/);
        if (matrixValues) {
          const parts = matrixValues[1].split(', ');
          const currentX = Math.abs(parseFloat(parts[4]) || 0);
          const currentCardPassed = Math.floor((currentX + containerCenter) / stepWidth);
          if (currentCardPassed !== lastCardIndexPassed) {
            lastCardIndexPassed = currentCardPassed;
            this.playSorteioTickSound();
          }
        }
      }

      if (performance.now() - startTime < durationMs + 200) {
        requestAnimationFrame(checkPointerCross);
      }
    };

    requestAnimationFrame(checkPointerCross);

    // Conclusão do giro
    setTimeout(() => {
      animRunning = false;
      if (onComplete) onComplete(winner);
    }, durationMs + 250);
  }

  /**
   * Abre o Modal de Vitória configurado com os efeitos visuais das regras
   * @param {Object} winner 
   * @param {boolean} allEqual 
   */
  openWinnerModal(winner, allEqual) {
    const modal = document.getElementById("winner-modal");
    const card = document.getElementById("modal-winner-card");
    const rays = document.getElementById("modal-gold-rays");
    const titleEl = document.getElementById("modal-winner-title");
    const imgEl = document.getElementById("modal-winner-img");
    const placeholderEl = document.getElementById("modal-winner-placeholder");
    const chanceEl = document.getElementById("modal-winner-chance");
    const badgeEl = document.getElementById("modal-rarity-badge");
    
    if (!modal || !card) return;

    // Reseta classes de animações anteriores
    card.classList.remove("victory-blue-card", "victory-purple-card", "victory-gold-card");
    if (rays) rays.classList.add("hidden");

    // Preenche informações do jogo
    if (titleEl) titleEl.textContent = winner.title;
    if (chanceEl) chanceEl.textContent = `Chance de vitória: ${winner.percentage}% (${winner.tickets} chance(s))`;

    if (winner.banner && imgEl) {
      imgEl.src = winner.banner;
      imgEl.classList.remove("hidden");
      if (placeholderEl) placeholderEl.classList.add("hidden");
    } else {
      if (imgEl) imgEl.classList.add("hidden");
      if (placeholderEl) placeholderEl.classList.remove("hidden");
    }

    // Regras de Animação de Vitória:
    // 1. "se todos os jogos tiverem a mesma chance, não tem animação, somente o giro"
    // 2. "Se o jogo tiver chance de 99% até 50%, não tem animação"
    // 3. "Se o jogo tiver chance de 49% até 30%, ele tem uma animação azul de vitória"
    // 4. "Se o jogo tiver chance de 29% até 10%, ele tem uma animação Roxa e pulsante de vitória"
    // 5. "Se o jogo tiver chance menor que 9% ele tem uma animação Dourada e pulsante e com efeitos de blur de vitória"

    if (allEqual) {
      if (badgeEl) {
        badgeEl.textContent = "Chances Iguais";
        badgeEl.className = "inline-block text-xs uppercase font-extrabold px-3 py-1 rounded-full bg-brand-950/70 text-brand-300 border border-brand-800 tracking-wider";
      }
          } else if (winner.rarity === "legendary" || winner.percentage < 10) {
      // Dourada e pulsante com efeitos de blur de vitória
      card.classList.add("victory-gold-card");
      if (rays) rays.classList.remove("hidden");
      if (badgeEl) {
        badgeEl.textContent = "★ Lendário (Menor que 9%) ★";
        badgeEl.className = "inline-block text-xs uppercase font-black px-3.5 py-1.5 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.5)] tracking-wider";
      }
          } else if (winner.rarity === "epic" || (winner.percentage >= 10 && winner.percentage < 30)) {
      // Roxa e pulsante de vitória
      card.classList.add("victory-purple-card");
      if (badgeEl) {
        badgeEl.textContent = "✦ Épico (10% até 29%) ✦";
        badgeEl.className = "inline-block text-xs uppercase font-extrabold px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400 shadow-[0_0_15px_rgba(192,132,252,0.4)] tracking-wider";
      }
          } else if (winner.rarity === "rare" || (winner.percentage >= 30 && winner.percentage < 50)) {
      // Azul de vitória
      card.classList.add("victory-blue-card");
      if (badgeEl) {
        badgeEl.textContent = "◆ Raro (30% até 49%) ◆";
        badgeEl.className = "inline-block text-xs uppercase font-bold px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400 tracking-wider";
      }
          } else {
      // 50% até 99%: sem animação
      if (badgeEl) {
        badgeEl.textContent = "Comum (50% até 99%)";
        badgeEl.className = "inline-block text-xs uppercase font-bold px-3 py-1 rounded-full bg-gray-800 text-gray-300 border border-gray-700 tracking-wider";
      }
          }

    modal.classList.remove("hidden");
  }

  /**
   * Fecha o modal de vitória
   */
  closeWinnerModal() {
    const modal = document.getElementById("winner-modal");
    if (modal) {
      modal.classList.add("hidden");
    }
  }
}
