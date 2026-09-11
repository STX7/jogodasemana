/**
 * Jogo da Semana - Tema Dinâmico
 * Sorteia uma cor base (paleta de marca) a cada acesso ou recarga de página.
 * Configura o Tailwind CSS dinamicamente sob o namespace 'brand' usando Variáveis CSS.
 */

// Define o objeto global do Tailwind antes de carregar o script do CDN
window.tailwind = window.tailwind || {};
window.tailwind.config = window.tailwind.config || {};
window.tailwind.config.theme = window.tailwind.config.theme || {};
window.tailwind.config.theme.extend = window.tailwind.config.theme.extend || {};

// Mapeia a paleta 'brand' para Variáveis CSS Nativas no documento
window.tailwind.config.theme.extend.colors = window.tailwind.config.theme.extend.colors || {};
window.tailwind.config.theme.extend.colors.brand = {
  300: 'var(--brand-300)',
  400: 'var(--brand-400)',
  500: 'var(--brand-500)',
  600: 'var(--brand-600)',
  700: 'var(--brand-700)',
  800: 'var(--brand-800)',
  900: 'var(--brand-900)',
  950: 'var(--brand-950)'
};

// Temas vibrantes cuidadosamente selecionados com excelente contraste sobre fundo escuro
const COLOR_THEMES = {
  purple: {
    300: '#e9d5ff', 400: '#c084fc', 500: '#a855f7', 600: '#9333ea',
    700: '#7e22ce', 800: '#6b21a8', 900: '#581c87', 950: '#3b0764'
  },
  cyan: {
    300: '#cffafe', 400: '#22d3ee', 500: '#06b6d4', 600: '#0891b2',
    700: '#0e7490', 800: '#155e75', 900: '#164e63', 950: '#083344'
  },
  emerald: {
    300: '#d1fae5', 400: '#34d399', 500: '#10b981', 600: '#059669',
    700: '#047857', 800: '#065f46', 900: '#064e3b', 950: '#022c22'
  },
  pink: {
    300: '#fce7f3', 400: '#f472b6', 500: '#ec4899', 600: '#db2777',
    700: '#be185d', 800: '#9d174d', 900: '#831843', 950: '#500724'
  },
  indigo: {
    300: '#e0e7ff', 400: '#818cf8', 500: '#6366f1', 600: '#4f46e5',
    700: '#4338ca', 800: '#3730a3', 900: '#312e81', 950: '#1e1b4b'
  },
  orange: {
    300: '#ffedd5', 400: '#fb923c', 500: '#f97316', 600: '#ea580c',
    700: '#c2410c', 800: '#9a3412', 900: '#7c2d12', 950: '#431407'
  },
  violet: {
    300: '#ddd6fe', 400: '#a78bfa', 500: '#8b5cf6', 600: '#7c3aed',
    700: '#6d28d9', 800: '#5b21b6', 900: '#4c1d95', 950: '#2e1065'
  },
  teal: {
    300: '#ccfbf1', 400: '#2dd4bf', 500: '#14b8a6', 600: '#0d9488',
    700: '#0f766e', 800: '#115e59', 900: '#134e4a', 950: '#042f2e'
  }
};

(function() {
  // Detecta se a página foi recarregada (F5 / Botão de Atualizar)
  const navigation = window.performance && window.performance.getEntriesByType && window.performance.getEntriesByType("navigation")[0];
  const isReload = navigation && navigation.type === "reload";

  let selectedThemeName = localStorage.getItem("sessionColor");

  // Se recarregar a página ou se for o primeiro acesso na sessão, sorteamos uma cor
  if (isReload || !selectedThemeName || !COLOR_THEMES[selectedThemeName]) {
    const themeNames = Object.keys(COLOR_THEMES);
    let newThemeName = themeNames[Math.floor(Math.random() * themeNames.length)];

    if (isReload && newThemeName === selectedThemeName && themeNames.length > 1) {
      const filteredNames = themeNames.filter(name => name !== selectedThemeName);
      newThemeName = filteredNames[Math.floor(Math.random() * filteredNames.length)];
    }

    selectedThemeName = newThemeName;
    localStorage.setItem("sessionColor", selectedThemeName);
  }

  // Aplica as variáveis CSS de marca nativamente no elemento raiz (<html>)
  const themeColors = COLOR_THEMES[selectedThemeName];
  const root = document.documentElement;

  Object.keys(themeColors).forEach(shade => {
    root.style.setProperty(`--brand-${shade}`, themeColors[shade]);
  });

  // Mantém aliases legados para compatibilidade com folhas CSS personalizadas
  root.style.setProperty('--brand-color-400', themeColors[400]);
  root.style.setProperty('--brand-color-500', themeColors[500]);
  root.style.setProperty('--brand-color-600', themeColors[600]);
  root.style.setProperty('--brand-color-950', themeColors[950]);
})();
