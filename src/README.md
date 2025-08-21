Visão Geral: Você deverá criar uma aplicação em React que consuma a API do TMDB (ou OMDb) para permitir que usuários busquem filmes, vejam detalhes e montem uma lista de favoritos.

Funcionalidades Obrigatórias

1. Página de Busca:
    Um campo de texto para o usuário digitar o termo.
    Exibir lista de resultados com pôster, título, ano e botão para ver detalhes.

2. Paginação:
    Permitir navegar pelas páginas de resultados.

3. Página de Detalhes:
    Exibir informações completas (diretor, elenco, sinopse, avaliação) ao clicar em um filme.

4. Lista de Favoritos:
    Botão para adicionar/remover filmes da lista de favoritos.
    Persistir favoritos em localStorage.

5. Tratamento de Erros & Loading:
    Exibir indicador enquanto aguarda resposta e mensagens de erro quando necessário.
---------------------------------------------------------------------=====================================================================---------------------------------------------------------------------

# Meu Projeto React

Uma breve descrição do que o seu projeto é e o que ele faz.

## 🚀 Tecnologias

- **Framework Frontend:** React
- **Build:** Vite
- **Roteamento:** React Router DOM
- **Hooks:** React Use

## 💻 Primeiros Passos

Siga estes passos para obter uma cópia local funcionando.

### Pré-requisitos

Certifique-se de ter o Node.js e o npm instalados em sua máquina.
*   [Node.js](https://nodejs.org/) (que vem com o npm)

### Instalação

1.  **Clone o repositório**
    ```bash
    git clone https://github.com/seu-username/seu-nome-de-repositorio.git
    cd seu-nome-de-repositorio
    ```

2.  **Instale os pacotes NPM**
    Este projeto usa Vite e requer dependências específicas. Execute:
    ```bash
    npm install
    ```
    *Isso instalará todos os pacotes necessários, incluindo:*
    - `react-router-dom` para roteamento.
    - `react-use` para hooks adicionais.

3.  **Inicie o servidor de desenvolvimento**
    ```bash
    npm run dev
    ```
    Abra o link do localhost fornecido pelo terminal [http://localhost:5137] em seu navegador para visualizar a aplicação.

## 📜 Scripts Disponíveis

No diretório do projeto, você pode executar:

- `npm run dev` - Inicia o servidor de desenvolvimento com Vite.
- `npm run build` - Constrói o aplicativo para produção na pasta `dist`.
- `npm run preview` - Pré-visualiza a build de produção localmente.