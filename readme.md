Start AI

An AI-powered multi-agent startup intelligence platform that helps founders create and optimize startups using coordinated AI workflows, LangGraph orchestration, and persistent organizational memory.

Overview

Start AI is designed as an organizational intelligence system for startups.

The platform allows users to:

Create a startup using AI agents
Optimize existing startups using PDF analysis
Generate technical, financial, hiring, and marketing insights
Maintain persistent startup organizational memory

The system uses multiple AI agents collaboratively through LangChain and LangGraph orchestration.

System Architecture
User
   ↓

Firebase Authentication
   ↓

FastAPI Backend
(Authentication Middleware + JWT Verification)
   ↓

──────────────────────────────────────
         TWO WORKFLOWS
──────────────────────────────────────

1. Create a Startup
   ↓
Founder enters:
- startup name
- domain
- startup description

OR

2. Optimize a Startup
   ↓
PDF Upload
   ↓
Context Extraction

──────────────────────────────────────

Both workflows enter:

LangChain + LangGraph Orchestration
   ↓

AI Agents
- CTO Agent
- Finance Agent
- Hiring Agent
- Marketing Agent

   ↓

Shared Organizational Reasoning
   ↓

Startup Workspace Memory
   ↓

PostgreSQL Database
AI Agents
Agent	Responsibility
CTO Agent	Architecture and scalability analysis
Finance Agent	Burn rate and financial optimization
Hiring Agent	Team planning and hiring strategy
Marketing Agent	GTM and growth recommendations

All agents collaboratively reason over shared startup context.

Tech Stack
Frontend
React
Vite
TailwindCSS
Firebase Authentication
Backend
FastAPI
LangChain
LangGraph
PostgreSQL
SQLAlchemy
AI / LLM
Gemini
Infrastructure
Docker
Docker Compose
Authentication Flow

The platform uses Firebase Authentication.

Features:

Google Login
Email/Password Authentication
JWT Token Verification
Protected Routes
User-Specific Workspaces

After login:

Firebase generates JWT tokens
Frontend sends token to backend
FastAPI verifies token using Firebase Admin SDK
Workspace ownership is linked to authenticated users
Database Model

Each startup workspace stores:

id
startup_name
mode
domain
startup_description
startup_state

user_uid
user_email
user_name

created_at
Workflows
1. Create a Startup

Users enter:

startup name
startup domain
startup description

The system generates:

architecture strategy
finance planning
hiring recommendations
marketing insights

using multi-agent orchestration.

2. Optimize a Startup

Users upload startup PDFs such as:

pitch decks
startup reports
architecture documents

The system:

extracts startup context
builds structured organizational memory
runs AI orchestration
generates strategic recommendations
Backend Structure
backend/
│
├── agents/
├── orchestrator/
├── memory/
├── models/
├── services/
├── uploads/
├── main.py
└── requirements.txt
Frontend Structure
frontend/
│
├── components/
├── pages/
├── context/
├── services/
├── firebase.js
└── App.jsx
Docker Architecture

The application is fully containerized using Docker and Docker Compose.

Containers:

Frontend Container
Backend Container
PostgreSQL Container

Docker Compose helps orchestrate all services together using a single command.

Running the Project
Start the System
docker compose up --build
Frontend
http://localhost:5173
Backend
http://localhost:8005
Swagger API Docs
http://localhost:8005/docs
Deployment
Service	Platform
Frontend	Vercel
Backend	Render
Database	PostgreSQL
Core Features
Multi-agent AI orchestration
Startup creation workflow
Startup optimization workflow
PDF intelligence pipeline
Firebase Authentication
User-specific workspaces
Persistent organizational memory
Dockerized architecture
LangGraph orchestration
PostgreSQL persistence
Author

Akula Lakshmi Venkata Sahith

Website : sahithakula.space