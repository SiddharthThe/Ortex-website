# Ortex

### Cross-Platform Context Orchestrator for Large Language Models

## Run locally

Requirements: Node.js 20 or Bun.

Using Bun (recommended):

```bash
bun install
bun run dev
```

Using npm:

```bash
npm install
npm run dev
```

The development server is available at `http://localhost:3000`. To create and
preview a production build:

```bash
bun run build
bun run preview
```

Replace `bun` with `npm run` for the equivalent npm commands.

> **Move context, not copy-paste.**

Ortex is a Chromium browser extension designed to synchronize and transfer conversation context between different Large Language Model (LLM) interfaces such as **ChatGPT, Claude, and Gemini**.

Instead of manually copying conversation history, requirements, code, decisions, and other context from one AI platform to another, Ortex provides a local-first orchestration layer that captures, normalizes, processes, and transfers context between supported interfaces.

---

## Why Ortex?

Modern developers frequently switch between multiple AI assistants.

A typical workflow looks like:

```text
ChatGPT
   ↓
Copy conversation
   ↓
Switch tabs
   ↓
Paste
   ↓
Fix formatting
   ↓
Explain missing context
   ↓
Continue working
```

This creates:

- Context loss
- Repetitive explanations
- Token duplication
- Manual copy-paste
- Broken conversation continuity
- Increased friction when switching AI tools

Ortex changes this workflow to:

```text
        ┌───────────┐
        │ ChatGPT   │
        └─────┬─────┘
              │
              ▼
       ┌──────────────┐
       │    Ortex     │
       │              │
       │ Capture      │
       │ Normalize    │
       │ Process      │
       │ Transfer     │
       └──────┬───────┘
              │
        ┌─────┴─────┐
        ▼           ▼
   ┌─────────┐ ┌─────────┐
   │ Claude  │ │ Gemini  │
   └─────────┘ └─────────┘
```

---

# Features

### Context Capture

Extract conversation context from supported LLM interfaces directly from the browser.

### Context Normalization

Convert platform-specific conversation structures into a common internal representation.

```ts
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}
```

### Cross-Platform Transfer

Move context from one supported AI interface to another.

Example:

```text
ChatGPT
   ↓
Ortex
   ↓
Claude
```

### Context Processing

Ortex can prepare context before transferring it.

Supported processing modes:

- Full context
- Smart/truncated context
- Summarized context

### Token Awareness

Token estimation helps determine how much context is being transferred and provides a foundation for future context optimization.

### Local-First Architecture

Conversation context is designed to remain on the user's machine rather than requiring a mandatory cloud backend.

### Platform Adapters

Each supported AI platform uses a dedicated adapter.

```text
PlatformAdapter
      │
      ├── ChatGPTAdapter
      ├── ClaudeAdapter
      └── GeminiAdapter
```

This isolates platform-specific DOM and interaction logic from the rest of the system.

---

# Architecture

Ortex follows an event-driven browser-extension architecture based on **Chrome Manifest V3**.

```text
┌────────────────────────────────────────────────────┐
│                 LLM Web Interfaces                 │
│                                                    │
│   ChatGPT          Claude           Gemini         │
└───────┬──────────────┬──────────────┬──────────────┘
        │              │              │
        ▼              ▼              ▼
┌────────────────────────────────────────────────────┐
│                  Content Scripts                   │
│                                                    │
│     DOM Observation + Platform Interaction        │
└────────────────────────┬───────────────────────────┘
                         │
                         ▼
┌────────────────────────────────────────────────────┐
│                Platform Adapters                   │
│                                                    │
│ ChatGPTAdapter │ ClaudeAdapter │ GeminiAdapter     │
└────────────────────────┬───────────────────────────┘
                         │
                         ▼
┌────────────────────────────────────────────────────┐
│             Manifest V3 Service Worker             │
│                                                    │
│        Central Event / Message Coordinator         │
└───────────────┬───────────────────┬────────────────┘
                │                   │
                ▼                   ▼
       ┌────────────────┐   ┌────────────────────┐
       │ Context Engine │   │ Local Persistence  │
       │                │   │                    │
       │ Normalize      │   │ chrome.storage     │
       │ Process        │   │ IndexedDB          │
       │ Token Estimate │   │                    │
       └────────┬───────┘   └────────────────────┘
                │
                ▼
       ┌────────────────────┐
       │ Destination Adapter│
       │                    │
       │ Locate Composer    │
       │ Inject Context     │
       └─────────┬──────────┘
                 │
                 ▼
          Target LLM Interface
```

---

# Core Components

## 1. Content Scripts

Content scripts run inside supported LLM web interfaces.

Responsibilities include:

- Detecting the current platform
- Observing dynamic page changes
- Extracting conversation content
- Locating the message composer
- Injecting transferred context

Dynamic interfaces are monitored using the browser's `MutationObserver` API where appropriate.

---

## 2. Platform Adapter Layer

Different AI platforms have different DOM structures and interaction models.

Instead of coupling the entire application to one platform, Ortex uses adapters.

```ts
interface PlatformAdapter {
  detect(): boolean;
  extractMessages(): Promise<Message[]>;
  locateComposer(): HTMLElement | null;
  injectContext(context: string): Promise<boolean>;
}
```

Example:

```text
adapters/
├── chatgpt/
│   └── ChatGPTAdapter.ts
│
├── claude/
│   └── ClaudeAdapter.ts
│
└── gemini/
    └── GeminiAdapter.ts
```

> Third-party AI interfaces can change their DOM structure at any time. Platform adapters therefore require maintenance and fallback strategies.

---

## 3. Background Service Worker

The Manifest V3 service worker acts as the central coordinator.

Responsibilities include:

- Receiving messages from content scripts
- Managing extension state
- Coordinating tabs
- Routing context
- Managing cross-component communication
- Coordinating persistence
- Triggering context processing

Conceptually:

```text
Content Script
      │
      │ chrome.runtime
      ▼
Service Worker
      │
      ├── Storage
      ├── Context Engine
      ├── Tab Coordination
      └── Destination
```

---

## 4. Context Engine

The Context Engine prepares conversation data for transfer.

Possible processing pipeline:

```text
Raw Conversation
       │
       ▼
Normalization
       │
       ▼
Token Estimation
       │
       ├───────────────┐
       │               │
       ▼               ▼
   Full Context    Optimization
                       │
                       ▼
                  Summarization
                       │
                       ▼
                Transfer Package
```

---

## 5. Local Storage

Ortex follows a local-first approach.

### `chrome.storage.local`

Used for lightweight extension state such as:

- Settings
- Preferences
- Active session information
- Small metadata

### IndexedDB

Used for larger structured data such as:

- Conversation history
- Context packages
- Processed context
- Cached platform information

---

# Context Data Model

Ortex converts platform-specific conversations into a normalized structure.

```ts
export type Platform =
  | "chatgpt"
  | "claude"
  | "gemini";

export type MessageRole =
  | "user"
  | "assistant";

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
}

export interface Conversation {
  id: string;
  platform: Platform;
  title?: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}

export interface ContextPackage {
  sourcePlatform: string;
  targetPlatform: string;
  conversationId: string;
  messages: Message[];
  tokenEstimate: number;
  processingMethod:
    | "raw"
    | "truncated"
    | "summarized";
  createdAt: number;
}
```

---

# Tech Stack

| Technology | Purpose |
|---|---|
| TypeScript | Application development |
| React | Popup UI |
| Tailwind CSS | UI styling |
| Plasmo | Browser extension framework |
| Chrome Manifest V3 | Extension architecture |
| Chrome Runtime API | Component messaging |
| Chrome Tabs API | Tab coordination |
| Chrome Storage API | Lightweight local state |
| IndexedDB | Conversation/context storage |
| DOM API | Interface interaction |
| MutationObserver | Dynamic DOM observation |
| tiktoken | Token estimation |
| Transformers.js | Optional local processing |
| Hugging Face | Local model ecosystem |
| Git | Version control |
| GitHub | Collaboration and source control |

---

# Project Structure

```text
Ortex/
│
├── src/
│   │
│   ├── adapters/
│   │   ├── chatgpt/
│   │   ├── claude/
│   │   └── gemini/
│   │
│   ├── background/
│   │   └── service-worker.ts
│   │
│   ├── contents/
│   │   ├── chatgpt.ts
│   │   ├── claude.ts
│   │   └── gemini.ts
│   │
│   ├── lib/
│   │   ├── context/
│   │   ├── storage/
│   │   └── messaging/
│   │
│   └── types/
│       └── context.ts
│
├── assets/
│
├── docs/
│   ├── architecture.md
│   ├── product-context.md
│   └── development-log.md
│
├── tests/
│
├── popup.tsx
├── package.json
├── tsconfig.json
├── README.md
└── .gitignore
```

> The exact structure may evolve during development.

---

# Getting Started

## Prerequisites

Make sure you have:

- Node.js
- npm
- Google Chrome or another Chromium-based browser
- Git

## Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/ortex.git
cd ortex
```

## Install Dependencies

```bash
npm install
```

## Start Development

```bash
npm run dev
```

Plasmo will generate the development extension build.

## Load the Extension

1. Open Chrome.
2. Navigate to:

```text
chrome://extensions
```

3. Enable **Developer mode**.
4. Select **Load unpacked**.
5. Choose:

```text
build/chrome-mv3-dev
```

6. Open a supported LLM interface.
7. Open the Ortex extension popup.

---

# Privacy & Security

Ortex follows a **local-first** architecture.

The core design does not require:

- A mandatory cloud backend
- A project-owned user database
- Paid LLM APIs
- Sending conversations to an Ortex server

Conversation context is intended to remain within the user's browser environment unless the user explicitly uses an external service or integration.

Ortex does not claim absolute security. Browser extensions interact with sensitive web content, so permissions, content-script scope, storage mechanisms, and platform-specific behavior must be carefully reviewed throughout development.

---


# Documentation

Additional technical documentation:

- `docs/product-context.md` — Product definition and design direction
- `docs/architecture.md` — Technical architecture
- `docs/development-log.md` — Development progress and decisions

---

# Ortex

> **Your workflow shouldn't forget.**

**Move context, not copy-paste.**
