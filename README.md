# AAWZ - Sistema de Cadastro de Usuários

Este é um projeto Vue.js desenvolvido como parte do desafio front-end, que implementa um sistema de cadastro de usuários.

## Tecnologias Utilizadas

- Vue.js 3
- Vite
- Pinia (Gerenciamento de Estado)
- Vue Router
- Vuetify (Componentes UI)
- Axios (Requisições HTTP)
- Chart.js (Gráficos)

## Credenciais de Teste

Para acessar a área de estatísticas, utilize:
- Email: admin@teste.com
- Senha: admin123

## Observações

- Os dados são armazenados em memória (Pinia Store)
- A integração com ViaCEP requer conexão com internet


## Requisitos

- Node.js (versão 14 ou superior)
- NPM ou Yarn

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/robertorozario/AAWZ-teste.git

cd AAWZ-teste
```

2. Instale as dependências:
```bash
npm install
```

## Executando o Projeto

1. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

2. Acesse o projeto no navegador:
- O projeto estará disponível em `http://localhost:5173`

## Funcionalidades

### 1. Formulário de Cadastro
- Cadastro de usuários com validação de campos
- Integração com a API ViaCEP para autopreenchimento de endereço
- Campos para informações pessoais e endereço
- Seleção de origem (Digital/Físico)

### 2. Visualização de Estatísticas
- Gráfico de distribuição de usuários por estado
- Gráfico de distribuição por origem (Digital/Físico)
- Tabela com listagem completa dos usuários cadastrados

### 3. Sistema de Autenticação
- Página de login para acesso às estatísticas
- Proteção de rotas para usuários não autenticados

## Estrutura do Projeto

- `/src/components/`: Componentes Vue
  - `UserForm.vue`: Formulário de cadastro de usuários
  - `UserStats.vue`: Visualização de estatísticas e tabela de usuários
  - `LoginForm.vue`: Formulário de login
  - `NavBar.vue`: Barra de navegação

- `/src/stores/`: Gerenciamento de Estado
  - `userStore.js`: Estado e lógica dos usuários
  - `authStore.js`: Estado e lógica de autenticação

- `/src/router/`: Configuração de rotas

## Credenciais de Teste

Para acessar a área de estatísticas, utilize:
- Email: admin@teste.com
- Senha: admin123

## Observações

- Os dados são armazenados em memória (Pinia Store)
- A integração com ViaCEP requer conexão com internet

