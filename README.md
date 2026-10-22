<div align="center">🇬🇧 English</div>

---

# Task Manager

Task management application built with Next.js and tRPC. The backend exposes operations via tRPC and keeps tasks in memory. The frontend consumes that API with end-to-end typing, without needing to write types manually.

## How it works

The project is a monorepo with two apps:

- `apps/backend` — Next.js running on port 3000, exposes tRPC routes at `/api/trpc`
- `apps/frontend` — Next.js running on port 3001, consumes the backend via tRPC

The task list is preloaded on the server (SSR) and displayed immediately on the page. When the user scrolls to the end of the list, the frontend fetches the next page automatically (infinite scroll with cursor-based pagination).

## How to run

Install dependencies at the project root:

```bash
npm install
```

Start both apps at the same time:

```bash
npm run dev
```

Open `http://localhost:3001` in your browser.

> Tasks are kept in memory. Restarting the server resets the list.

## Available operations

- Create task
- List tasks (with pagination)
- Edit task
- Delete task

## Technologies

- [Next.js 16](https://nextjs.org)
- [tRPC v11](https://trpc.io)
- [TanStack Query](https://tanstack.com/query)
- [Zod](https://zod.dev)

---

<div align="center">🇧🇷 Português</div>

---

# Gerenciador de Tarefas

Aplicação de gerenciamento de tarefas construída com Next.js e tRPC. O backend expõe as operações via tRPC e mantém as tarefas em memória. O frontend consome esse API com tipagem de ponta a ponta, sem precisar escrever tipos manualmente.

## Como funciona

O projeto é um monorepo com dois apps:

- `apps/backend` — Next.js rodando na porta 3000, expõe as rotas tRPC em `/api/trpc`
- `apps/frontend` — Next.js rodando na porta 3001, consome o backend via tRPC

A lista de tarefas é pré-carregada no servidor (SSR) e exibida imediatamente na página. Quando o usuário rola até o final da lista, o frontend busca a próxima página automaticamente (infinite scroll com paginação por cursor).

## Como executar

Instale as dependências na raiz do projeto:

```bash
npm install
```

Inicie os dois apps ao mesmo tempo:

```bash
npm run dev
```

Acesse `http://localhost:3001` no navegador.

> As tarefas ficam em memória. Reiniciar o servidor zera a lista.

## Operações disponíveis

- Criar tarefa
- Listar tarefas (com paginação)
- Editar tarefa
- Deletar tarefa

## Tecnologias

- [Next.js 16](https://nextjs.org)
- [tRPC v11](https://trpc.io)
- [TanStack Query](https://tanstack.com/query)
- [Zod](https://zod.dev)
