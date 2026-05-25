# Start AI — Build smarter from day one.

> An AI-powered multi-agent platform that helps founders create and optimize startups using coordinated agent workflows, LangGraph orchestration, and persistent organizational memory.

![Stack](https://img.shields.io/badge/stack-FastAPI%20%7C%20React%20%7C%20LangGraph-informational)

---

## Overview

Start AI is an organizational intelligence system for startups. It coordinates multiple specialized AI agents to deliver technical, financial, hiring, and marketing insights — either from scratch or by analyzing existing startup documents.

**Core capabilities:**

- Create a startup from a name, domain, and description
- Optimize an existing startup by uploading pitch decks or reports
- Generate recommendations across architecture, finance, hiring, and marketing
- Maintain persistent startup organizational memory across sessions

---

## AI Agents

| Agent | Responsibility |
|---|---|
| **CTO Agent** | Architecture design and scalability analysis |
| **Finance Agent** | Burn rate modeling and financial optimization |
| **Hiring Agent** | Team planning and talent acquisition strategy |
| **Marketing Agent** | GTM strategy and growth recommendations |

All agents collaboratively reason over a shared startup context using LangChain + LangGraph orchestration.

---

## System Architecture

```
User
 └─▶ Firebase Authentication
       └─▶ FastAPI Backend (JWT Verification)
             ├─▶ [Workflow A] Create Startup
             │     └─▶ Name + Domain + Description
             └─▶ [Workflow B] Optimize Startup
                   └─▶ PDF Upload → Context Extraction
                         │
                         ▼
               LangChain + LangGraph Orchestration
                         │
               ┌──────────────────────┐
               │  CTO · Finance       │
               │  Hiring · Marketing  │
               └──────────────────────┘
                         │
               Shared Organizational Reasoning
                         │
               Startup Workspace Memory
                         │
               PostgreSQL Database
```

---

## Workflows

### 1. Create a Startup

**Input:** Startup name, domain, and description

**Output:**
- Technical architecture strategy
- Financial planning recommendations
- Hiring roadmap
- Marketing and GTM insights

### 2. Optimize a Startup

**Input:** PDF documents — pitch decks, startup reports, or architecture docs

**Output:**
- Extracted startup context
- Structured organizational memory
- Strategic recommendations from all four agents

---

## Tech Stack

### Frontend
- React + Vite
- TailwindCSS
- Firebase Authentication

### Backend
- FastAPI
- LangChain + LangGraph
- SQLAlchemy
- PostgreSQL

### AI / LLM
- Gemini

### Infrastructure
- Docker + Docker Compose
- Frontend deployed on **Vercel**
- Backend deployed on **Render**

---

## Authentication

The platform uses Firebase Authentication with the following features:

- Google Login
- Email / Password Authentication
- JWT Token Verification
- Protected Routes
- User-Specific Workspaces

**Flow:**

1. User authenticates via Firebase
2. Frontend sends JWT token to FastAPI backend
3. Backend verifies token using Firebase Admin SDK
4. Workspace ownership is linked to the authenticated user

---

## Database Schema

Each startup workspace stores:

| Field | Description |
|---|---|
| `id` | Unique workspace identifier |
| `startup_name` | Name of the startup |
| `mode` | Workflow mode (create / optimize) |
| `domain` | Startup domain |
| `startup_description` | Description provided by the founder |
| `startup_state` | Current AI-generated organizational state |
| `user_uid` | Firebase user UID |
| `user_email` | Authenticated user email |
| `user_name` | Authenticated user display name |
| `created_at` | Workspace creation timestamp |

---

## Project Structure

```
backend/
├── agents/           # CTO, Finance, Hiring, Marketing agents
├── orchestrator/     # LangGraph workflow orchestration
├── memory/           # Persistent startup memory layer
├── models/           # SQLAlchemy database models
├── services/         # Business logic and utilities
├── uploads/          # PDF upload handling
├── main.py
└── requirements.txt

frontend/
├── components/       # Reusable UI components
├── pages/            # Route-level page components
├── context/          # React context providers
├── services/         # API service layer
├── firebase.js       # Firebase configuration
└── App.jsx
```

---

## Docker Architecture

The application is fully containerized using Docker and Docker Compose.

| Container | Service |
|---|---|
| Frontend Container | React + Vite app |
| Backend Container | FastAPI server |
| PostgreSQL Container | Persistent database |

---

## Getting Started

### Prerequisites

- Docker and Docker Compose installed

### Run Locally

```bash
docker compose up --build
```

### Local Endpoints

| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:8005 |
| Swagger API Docs | http://localhost:8005/docs |

---

## Deployment

| Service | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Render |
| Database | PostgreSQL |

---

## Feature Summary

- Multi-agent AI orchestration via LangGraph
- Startup creation workflow
- Startup optimization workflow with PDF intelligence pipeline
- Firebase Authentication with user-specific workspaces
- Persistent organizational memory
- Fully Dockerized architecture
- PostgreSQL persistence

---

## Author

**Akula Lakshmi Venkata Sahith**

Website: [sahithakula.space](https://sahithakula.space)
