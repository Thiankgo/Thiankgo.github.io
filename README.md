# Thiago Paiva Portfolio

Este é o repositório do **Portfolio**, uma aplicação web em React que exibe projetos com cards dinâmicos, mídia (imagens e vídeos), animações, e suporte a desktop e mobile.

## Tecnologias

* React (v18+)
* JavaScript (ES6+)
* CSS (Flexbox, Grid)
* [Vite](https://vitejs.dev/) ou Create React App
* Node.js (v16+)
* npm ou yarn

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

* [Node.js](https://nodejs.org/)
* [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## Estrutura de Pastas

```
├──├── public/             # Arquivos estáticos
│  │   └── index.html      # HTML base
│  ├── src/
│  │   ├── assets/         # Imagens, vídeos, SVGs e fontes
│  │   ├── components/     # Componentes React
│  │   ├── App.jsx         # Componente principal
│  │   ├── App.css         # Estilos globais
│  │   ├── index.js        # Entry point React
│  │   └── index.css       # Estilos base
│  ├── .gitignore          # Arquivos e pastas ignorados pelo Git
│  └── package.json        # Dependências e scripts
└───── README.md           # Este arquivo

```

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/Thiankgo/Thiankgo.github.io.git
   cd portfolio
   ```

2. Instale as dependências:

   ```bash
   # com npm
   npm install

   # ou com yarn
   yarn install
   ```

## Scripts Disponíveis

No diretório raiz do projeto, você pode rodar:

```bash
npm install gh-pages --save-dev

npm install three @react-three/fiber @react-three/drei

cd .\portfolio\ 

npm start # Compila o programa localmente

npm run deploy # Deploy no github pages
```

## Configurações Adicionais

* Fontes: verifique a importação de `InterBoldOutline.ttf` em `src/App.css`.
* Assets: coloque suas imagens, vídeos e SVGs em `src/assets`.
* Responsividade: existe um bloco de media queries em `App.css` para telas até 768px.

---

*Desenvolvido por Thiago Paiva*
