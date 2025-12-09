# VárzeaPro ⚽

> O **Tinder do futebol amador**. Conecte-se com times e jogadores na sua região.

VárzeaPro é uma plataforma web que conecta jogadores amadores a times de futebol de várzea que precisam de reforços. Com uma interface estilo card/swipe, a experiência é rápida, visual e intuitiva.

## 🚀 Tech Stack

- **Framework:** Next.js 16 + React 19
- **Autenticação:** Better Auth
- **Banco de Dados:** MySQL 8.4 + Drizzle ORM
- **Validação:** Zod + React Hook Form
- **Estado:** Zustand
- **Estilização:** TailwindCSS 4 + shadcn/ui
- **Infraestrutura:** Docker

---

## 📋 Pré-requisitos

- [Node.js](https://nodejs.org/) 18+
- [pnpm](https://pnpm.io/) (gerenciador de pacotes)
- [Docker](https://www.docker.com/) e Docker Compose

---

## 🛠️ Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/varzeapro/web.git
cd web
```

### 2. Instale as dependências

```bash
pnpm install
```

### 3. Configure as variáveis de ambiente

```bash
cp .env.example .env
```

O arquivo `.env` já vem configurado para desenvolvimento local:

```env
DATABASE_URL="mysql://root:root@localhost:3306/varzeapro"
BETTER_AUTH_SECRET=lPvVE6mvCyR2OwHtEPlQbpFHJFGlJLQb
BETTER_AUTH_URL=http://localhost:3000
```

### 4. Suba o banco de dados com Docker

```bash
docker compose up -d
```

Isso irá iniciar um container MySQL 8.4 com:

- **Host:** localhost
- **Porta:** 3306
- **Usuário:** root
- **Senha:** root
- **Database:** varzeapro

### 5. Execute as migrations

```bash
pnpm drizzle-kit push
```

### 6. Popule o banco com dados iniciais (seed)

```bash
pnpm tsx src/db/seed.ts
```

> ⚠️ **Importante:** O seed cria as posições de jogadores (Goleiro, Zagueiro, Lateral, Meio-Campo, Atacante) que são necessárias para o onboarding.

---

## ▶️ Rodando o projeto

```bash
pnpm dev
```

Acesse [http://localhost:3000](http://localhost:3000)

---

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── (auth)/           # Páginas de autenticação (sign-in, sign-up)
│   ├── (onboarding)/     # Wizard de onboarding (welcome, setup)
│   ├── (protected)/      # Páginas protegidas (dashboards)
│   ├── actions/          # Server actions
│   └── api/              # API routes
├── components/
│   ├── onboarding/       # Componentes do wizard de onboarding
│   └── ui/               # Componentes shadcn/ui
├── db/
│   ├── index.ts          # Conexão do banco
│   ├── schema.ts         # Schema do Drizzle
│   └── seed.ts           # Seed de dados iniciais
├── lib/
│   ├── auth.ts           # Configuração do Better Auth
│   ├── auth-client.ts    # Cliente de autenticação
│   └── auth-guard.ts     # Proteção de rotas
└── store/
    └── onboarding-store.ts  # Estado do wizard (Zustand)
```

---

## 🔒 Fluxo de Autenticação

1. **Cadastro/Login** (`/sign-up`, `/sign-in`)
2. **Seleção de Perfil** (`/welcome`) - Jogador ou Time
3. **Onboarding Progressivo** - Wizard em 4 etapas:
   - **Jogador:** Foto → Posição → Localização/Raio → Nível
   - **Time:** Escudo → Localização → Dias de Jogo → Nível
4. **Dashboard** (`/player/dashboard` ou `/team/dashboard`)

---

## 🧪 Comandos Úteis

| Comando                   | Descrição                            |
| ------------------------- | ------------------------------------ |
| `pnpm dev`                | Inicia o servidor de desenvolvimento |
| `pnpm build`              | Gera o build de produção             |
| `pnpm lint`               | Executa o linter                     |
| `pnpm drizzle-kit push`   | Aplica o schema no banco             |
| `pnpm drizzle-kit studio` | Abre o Drizzle Studio (GUI)          |
| `pnpm tsx src/db/seed.ts` | Executa o seed do banco              |

---

## 📄 Licença

Este projeto é parte de um Trabalho de Conclusão de Curso (TCC).

---

**Feito com ❤️ por Diogo, Lucas e Patrick**
