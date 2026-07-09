# Jogo da Semana (GameWeek)

O **Jogo da Semana** (anteriormente chamado *GameWeek*) é um site estático e responsivo desenvolvido sob a arquitetura **Model-View-Controller (MVC)**. O projeto serve para registrar o histórico de jogos semanais decididos por um grupo de amigos, listando quem escolheu o jogo, quem participou das sessões, as notas médias, capturas de tela e comentários semanais. 

O site foi construído para ser altamente portável e compatível diretamente com o **GitHub Pages**, funcionando 100% offline (abrindo localmente do navegador) sem necessidade de servidores de banco de dados ou requisições que quebrem as políticas de CORS do navegador.

---

## 🎨 Principais Recursos Visuais e Funcionalidades

1. **Arquitetura MVC no Frontend**:
   * **Model** (`js/model.js`): Controla as regras de negócios, ordenação de dados, busca textual e paginação dinâmica.
   * **View** (`js/view.js`): Controla a injeção do DOM, criação de elementos, componentes compartilhados (cabeçalho/rodapé), o modal lightbox de imagens e alertas.
   * **Controller** (`js/controller.js`): Coordena os eventos da página inicial, navegação, inputs de digitação e roteamento por parâmetros da URL.

2. **Tema de Cores Dinâmico e Persistente (`js/theme.js`)**:
   * O site sorteia aleatoriamente um dos **8 temas de destaque vibrantes** (Roxo, Ciano, Esmeralda, Rosa, Índigo, Laranja, Violeta, Verde-Azulado) no primeiro acesso ou ao **recarregar a página (F5)**.
   * O tema de cores sorteado persiste na navegação entre as páginas do menu através de gravação no **`sessionStorage`**, garantindo transições harmoniosas.
   * Configura o **Tailwind CSS** dinamicamente sob o namespace `brand` e injeta variáveis CSS nativas no documento (`--brand-color-500`, etc.) para colorir a barra de rolagem e cores de seleção de texto que acompanham o tema sorteado.

3. **Lista de Jogos Dinâmica com Filtro e Paginação**:
   * A página inicial exibe uma listagem limpa (em formato de tabela) com o nome do jogo, badge de notas, selector e data.
   * Possui **busca em tempo real** integrada por título, seletor ou jogadores e **ordenação de data** (mais recentes ou mais antigos).
   * **Paginação de 10 jogos por página** criada e gerenciada dinamicamente via JS.

4. **Página de Detalhes Completa (`jogo.html`)**:
   * Identifica o jogo selecionado através do parâmetro `?id=slug-do-jogo` na URL.
   * **Carrossel de Imagens Interativo**: Navegue pelas screenshots da semana e clique em qualquer foto para abrir o modal **Lightbox** em tela cheia.
   * **Seção de Vídeo e Galeria Resilientes**: Se o jogo não possuir vídeo ou screenshots associadas (como o *All themods*), exibe-se um aviso visual com cara triste (`😞 Não foi gravado`) em vez de quebrar a página.
   * **Ficha Técnica & Feed de Comentários**: Lista dados do jogo (desenvolvedor, plataforma, nota) e renderiza avatares dinâmicos para cada comentário da semana.

5. **Melhores do Mês (`melhores.html`)**:
   * Agrupa os jogos jogados por mês de início e ordena-os em um pódio de 1º, 2º e 3º lugar.
   * Destaque com efeito de **brilho neon elétrico (pulsação animada por CSS)** na coroa dourada do primeiro colocado do mês.

6. **Regras da Comunidade (`regras.html`)**:
   * Painel de visualização das 22 regras fundamentais seguidas pelos membros oficiais do grupo.

7. **Painel de Estatísticas (`sobre.html`)**:
   * Dashboard interativo com dados consolidados da comunidade:
     * Total de Jogos Registrados.
     * Membros Ativos Oficiais (Fixo em 3 jogadores core: `STX7`, `gatólico` e `BuChuDin`).
     * Média Geral de Notas de todo o histórico.
     * Gênero Mais Jogado no grupo.
     * Jogo Mais Escolhido (frequência de repetição do título no banco).
     * Jogo com Mais Pessoas (total de membros e convidados em uma única sessão).
     * Pior Jogo Já Jogado (com menor nota histórica, destacado com design de alerta em vermelho).

---

## 📂 Estrutura de Diretórios do Projeto

```text
Site JOGO/
│
├── css/                     # Estilização estática e páginas específicas
│   ├── style.css            # Estilos globais (rolagem suave, scrollbars e seleção)
│   ├── index.css            # Efeitos hover e transições da Home
│   ├── jogo.css             # Transições do modal lightbox e do carrossel
│   ├── melhores.css         # Animação neon glow da coroa de destaque
│   ├── regras.css           # Micro-interações dos cartões de regras
│   └── sobre.css            # Efeitos hover dos cartões de estatísticas
│
├── js/                      # Lógica do projeto estruturado em MVC
│   ├── data.js              # Banco de dados centralizado (jogos, regras, estatísticas)
│   ├── theme.js             # Gerenciador de cores aleatórias e Tailwind dinâmico
│   ├── model.js             # Algoritmos de ordenação, paginação e filtros
│   ├── view.js              # Manipulador de DOM, injeção de HTML e carrossel
│   └── controller.js        # Roteamento de URLs e escuta de eventos/inputs
│
├── img/                     # Repositório de capturas e banners dos jogos
│   ├── the-forest/          # 11 screenshots de The Forest
│   ├── rust-3/              # 3 screenshots da sessão 3 de Rust
│   ├── mecha-chamelon/      # 3 screenshots de Mecha Chamelon
│   └── devour/              # 3 screenshots de Devour
│
├── index.html               # Página inicial (Listagem e Filtros)
├── jogo.html                # Página de Detalhes de cada Jogo
├── melhores.html            # Pódio mensal de melhores jogos
├── regras.html              # Regras oficiais da jogatina
├── sobre.html               # Informações e Estatísticas Dinâmicas
└── README.md                # Este documento de referência
```

---

## 🚀 Como Executar Localmente

Como o projeto é construído exclusivamente com arquivos estáticos no frontend, **não é necessário realizar compilação ou instalar servidores de desenvolvimento**:

1. Baixe os arquivos do projeto para o seu computador.
2. Dê um duplo clique no arquivo index.html para abri-lo diretamente em qualquer navegador moderno.
3. Para simular a experiência com caminhos limpos ou testar no servidor de forma síncrona, você pode usar qualquer ferramenta simples de servidor local (como a extensão Live Server do VS Code, ou rodar `npx serve .` no terminal).

---

## 🌐 Implantação (Deployment) no GitHub Pages

O site é projetado especificamente para ser hospedado no GitHub Pages gratuitamente:

1. Crie um repositório no seu GitHub.
2. Envie todos os arquivos do diretório raiz do projeto para o repositório (mantendo os caminhos relativos de `js/`, `css/`, `img/` e dos arquivos `.html`).
3. No GitHub, vá em **Settings** > **Pages**.
4. Sob **Build and deployment**, selecione a branch `main` (ou `master`) e a pasta raiz `/ (root)`.
5. Clique em **Save**. O GitHub fornecerá uma URL pública segura com HTTPS contendo o seu site totalmente funcional em instantes.
