# llm-eval-harness

A self-hosted platform for evaluating and comparing large language model outputs. Run structured experiments across multiple models, score outputs with ROUGE and BERTScore metrics, and compare results side-by-side in a React UI.

## Architecture

This is a npm workspace monorepo with three packages:

```
packages/
├── api/        Express + TypeScript REST API, Prisma ORM
├── web/        React 18 + Vite frontend
└── scorer/     Python FastAPI microservice (ROUGE, BERTScore)
```

**API** (`packages/api`) — Express + TypeScript + Prisma + Zod. Manages experiments, datasets, and runs. Provides an SSE endpoint for live run progress streaming.

**Web** (`packages/web`) — React 18 + Vite + React Router. Dashboard, experiment list, new experiment form, and a live results view with SSE connection.

**Scorer** (`packages/scorer`) — Python FastAPI with rouge-score and bert-score libraries. Isolated as a microservice so heavy ML dependencies don't affect the Node build.

## Quickstart

### Docker Compose (recommended)

```bash
git clone https://github.com/allitnils/llm-eval-harness
cd llm-eval-harness
docker compose up
```

Services start on:
- Web UI: http://localhost:3000
- API: http://localhost:3001
- Scorer: http://localhost:8001

### Local development

**Prerequisites:** Node 20, npm 10, Python 3.11, PostgreSQL 16, Redis 7

```bash
# Install Node deps
npm install

# Start API (set DATABASE_URL first)
export DATABASE_URL="postgresql://user:pass@localhost:5432/llmeval"
npm run dev -w packages/api

# Start Web (in another terminal)
npm run dev -w packages/web

# Start Scorer (in another terminal)
cd packages/scorer
pip install -r requirements.txt
uvicorn main:app --port 8001
```

## Creating a Dataset

POST to `/api/datasets`:

```json
{
  "name": "Summarisation benchmark",
  "description": "CNN/DailyMail subset",
  "items": [
    {
      "input": "Article text here...",
      "expected": "Reference summary here..."
    }
  ]
}
```

## Running an Experiment

POST to `/api/experiments`:

```json
{
  "name": "GPT-4o vs Claude Sonnet",
  "datasetId": "ds_abc123",
  "models": [
    {
      "id": "gpt4o",
      "name": "GPT-4o",
      "provider": "openai",
      "modelId": "gpt-4o",
      "apiKey": "sk-...",
      "temperature": 0.0
    },
    {
      "id": "claude",
      "name": "Claude Sonnet 4.6",
      "provider": "anthropic",
      "modelId": "claude-sonnet-4-6",
      "apiKey": "sk-ant-..."
    }
  ]
}
```

## Model Configuration

Supported providers:

| Provider | Models |
|----------|--------|
| `openai` | gpt-4o, gpt-4o-mini, gpt-4-turbo, gpt-3.5-turbo |
| `anthropic` | claude-sonnet-4-6, claude-haiku-4-5-20251001 |
| `google` | gemini-1.5-pro, gemini-1.5-flash |
| `ollama` | llama3, mistral, phi3, gemma2 (local) |
| `custom` | Any OpenAI-compatible endpoint via `baseUrl` |

## Scoring Metrics

The scorer microservice computes:

- **ROUGE-1** — unigram overlap between hypothesis and reference
- **ROUGE-2** — bigram overlap
- **ROUGE-L** — longest common subsequence
- **BERTScore** — contextual embedding similarity (F1) via `bert-score`

Request scoring directly:

```bash
curl -X POST http://localhost:8001/score \
  -H 'Content-Type: application/json' \
  -d '{
    "hypothesis": "The cat sat on the mat.",
    "reference": "A cat was sitting on a mat.",
    "metrics": ["rouge1", "rouge2", "rougeL", "bertscore"]
  }'
```

## API Reference

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/experiments` | List all experiments |
| POST | `/api/experiments` | Create experiment |
| GET | `/api/experiments/:id` | Get experiment |
| DELETE | `/api/experiments/:id` | Delete experiment |
| GET | `/api/datasets` | List datasets |
| POST | `/api/datasets` | Upload dataset |
| GET | `/api/runs/:id` | Get run status |
| GET | `/api/runs/:id/stream` | SSE: live run progress |
| POST | `/api/runs/:id/cancel` | Cancel run |
| GET | `/api/models` | List supported providers |

## UI

The React frontend provides:

- **Dashboard** — experiment count, quick stats
- **Experiments list** — all experiments with status
- **New Experiment** — form to configure models and dataset
- **Results view** — live SSE progress, side-by-side output comparison, score table

## Contributing

1. Fork and clone
2. `npm install`
3. `npm run typecheck` — must pass before any PR
4. `npm run build` — must exit 0
5. Submit PR to `main`

TypeScript strict mode is enforced across both packages. Python scorer uses FastAPI + Pydantic v2.
