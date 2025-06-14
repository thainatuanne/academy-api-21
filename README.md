
# 🚀 Academy API

API REST desenvolvida para gerenciamento acadêmico, permitindo cadastro de alunos, turmas, avaliações, projetos, matrículas e autenticação.

---

## 🧠 **Descrição do Projeto**

Este projeto foi desenvolvido como parte de um desafio prático, utilizando arquitetura limpa e boas práticas de desenvolvimento backend com Node.js, TypeScript, Express e Prisma ORM.

A API permite:

- Cadastro e autenticação de alunos
- Gerenciamento de turmas
- Gerenciamento de avaliações
- Gerenciamento de projetos
- Matrículas de alunos em turmas
- Proteção de rotas via autenticação JWT e autorização por tipo

---

## 🚀 **Tecnologias Utilizadas**

- Node.js
- TypeScript
- Express
- Prisma ORM
- PostgreSQL (ou outro banco relacional)
- JWT (JSON Web Token)
- Jest (testes unitários e integração)
- Swagger (documentação da API)

---

## 📦 **Instalação e Execução Local**

1. **Clone o repositório:**

```bash
git clone https://github.com/thainatuanne/academy-api-21.git
cd seu-repositorio
```

2. **Instale as dependências:**

```bash
npm install
```

3. **Configure o arquivo `.env`:**

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
JWT_SECRET="seu_segredo"
```

4. **Rode as migrations do banco:**

```bash
npx prisma migrate dev --name init
```

5. **Execute o projeto:**

```bash
npm run dev
```

---

## 🧪 **Rodar os Testes**

```bash
npm run test
```

Ou com coverage:

```bash
npm run test -- --coverage
```

---

## 📑 **Documentação da API — Swagger**

Acesse a documentação Swagger rodando localmente:

```
http://localhost:3000/api-docs
```

---

## 🏗️ **Estrutura das Rotas**

| Verbo | Endpoint            | Descrição                        | Protegido? |
|-------|----------------------|-----------------------------------|-------------|
| POST  | `/auth/signup`       | Cadastrar aluno                  | ❌          |
| POST  | `/auth/login`        | Login (retorna token)            | ❌          |
| POST  | `/auth/logout`       | Logout                           | ✅          |
| GET   | `/alunos`            | Listar alunos                    | ✅          |
| POST  | `/alunos`            | Criar aluno                      | ✅          |
| GET   | `/alunos/:id`        | Buscar aluno por ID              | ✅          |
| PUT   | `/alunos/:id`        | Atualizar aluno                  | ✅          |
| DELETE| `/alunos/:id`        | Deletar aluno                    | ✅          |
| GET   | `/turmas`            | Listar turmas                    | ✅          |
| POST  | `/turmas`            | Criar turma                      | ✅          |
| GET   | `/turmas/:id`        | Buscar turma por ID              | ✅          |
| PUT   | `/turmas/:id`        | Atualizar turma                  | ✅          |
| DELETE| `/turmas/:id`        | Deletar turma                    | ✅          |
| GET   | `/projetos`          | Listar projetos                  | ✅          |
| POST  | `/projetos`          | Criar projeto                    | ✅          |
| ...   |                      | (Avaliações e matrículas seguem mesma lógica) | ✅ |

---

## 🔒 **Autenticação & Autorização**

- ✅ **JWT Token:** obrigatório para acessar rotas protegidas.
- ✅ **Autorização por Tipo:** apenas usuários com determinados tipos podem acessar algumas rotas (`M`, `T`, `F`).

---

## 🗂️ **Estrutura de Pastas**

```
/src
  /controllers
  /database
  /middlewares
  /routes
  /services
  /tests
  /utils
  app.ts
  index.ts
```

---
