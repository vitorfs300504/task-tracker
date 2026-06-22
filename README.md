# TaskTracker 📋

Aplicação web para gerenciamento e análise de tarefas diárias, desenvolvida como desafio técnico para a vaga de Desenvolvedor Júnior Full-Stack.

---

## 🚀 Como rodar o projeto localmente

### Pré-requisitos

- Node.js 18 ou superior
- npm

### Passo a passo

1. Clone o repositório:
```bash
   git clone https://github.com/vitorfs300504/task-tracker.git
   cd task-tracker
```

2. Instale as dependências:
```bash
   npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
   npm run dev
```

4. Acesse no navegador:
http://localhost:3000/

> Não é necessário configurar variáveis de ambiente ou banco de dados externo.

---

## 🏗️ Arquitetura

O projeto utiliza **Next.js 15 com App Router**, o que permite ter frontend e backend na mesma aplicação, sem necessidade de um servidor separado.

src/

├── app/

│   ├── api/

│   │   └── tasks/

│   │       ├── route.ts         # GET (listar) e POST (criar)

│   │       ├── [id]/route.ts    # PUT (editar) e DELETE (deletar)

│   │       └── stats/route.ts   # GET (estatísticas)

│   ├── page.tsx                 # Página principal

│   ├── layout.tsx

│   └── globals.css

├── components/

│   ├── TaskCard.tsx             # Card individual de tarefa

│   ├── TaskList.tsx             # Grid de tarefas

│   ├── TaskForm.tsx             # Formulário de criação/edição

│   ├── StatsPanel.tsx           # Painel de analytics

│   ├── LoadingState.tsx         # Estado de carregamento

│   └── EmptyState.tsx           # Estado de lista vazia

├── lib/

│   ├── types.ts                 # Tipos compartilhados (Task, Status, Priority)

│   ├── validations.ts           # Schemas de validação com Zod

│   └── db.ts                    # Camada de acesso aos dados (JSON)

└── data/

└── tasks.json               # Banco de dados em arquivo JSON

---

## 🛠️ Principais bibliotecas utilizadas

| Biblioteca | Uso |
|-----------|-----|
| Next.js 15 | Framework fullstack (frontend + API Routes) |
| TypeScript | Tipagem estática em todo o projeto |
| Tailwind CSS | Estilização da interface |
| Zod | Validação de dados nas rotas da API |

---

## 💾 Persistência de dados

O projeto utiliza **persistência em arquivo JSON local** (`src/data/tasks.json`).

Essa escolha foi feita para simplificar a configuração e execução local, sem necessidade de instalar ou configurar um banco de dados externo. O arquivo começa vazio (`[]`) e é atualizado automaticamente conforme as tarefas são criadas, editadas ou deletadas.

---

## 🔌 Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/tasks` | Lista todas as tarefas |
| POST | `/api/tasks` | Cria uma nova tarefa |
| PUT | `/api/tasks/:id` | Atualiza uma tarefa existente |
| DELETE | `/api/tasks/:id` | Remove uma tarefa |
| GET | `/api/tasks/stats` | Retorna estatísticas calculadas |

---

## ✅ Funcionalidades

- Criação, edição e exclusão de tarefas
- Status: Pendente, Em Andamento, Concluída
- Prioridade: Alta, Média, Baixa
- Painel de analytics com progresso geral e distribuição por prioridade
- Estados de loading e lista vazia
- Interface responsiva para dispositivos móveis
- Validação de dados no backend com Zod
- Tratamento de erros (ex: tarefa não encontrada retorna 404) 