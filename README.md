# GrCars - Next.js Frontend

A modern, performant Next.js 16 application for GrCars's car dealership website. Built with React 19, TypeScript, Tailwind CSS, and integrated with Typesense for vehicle search.

## 🚀 Quick Start

### Prerequisites

- **Node.js**: v18.17.0 or higher (v20+ recommended)
- **npm**: v9+ or **yarn** v3.6+ or **pnpm** v8+

### Installation & Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd GrCars-fe
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

Specific packages the AI search feature relies on:

```bash
# If you ever need to install them individually:
npm install openai@^7.9.0    # OpenAI GPT-4o client (server-side API route)
npm install zod@^4.3.6       # JSON response validation
npm install typesense@^3.0.6 # Direct Typesense queries in the API route
```

### Environment variable required

```env
OPENAI_API_KEY=sk-...
```

Without this key the `/api/ai-search` endpoint returns a 500 and the UI shows a graceful error message. The rest of the site (normal search, filters, inventory) is completely unaffected.

### Chat persistence (IndexedDB)

`lib/aiChatStorage.ts` uses the browser's native **IndexedDB** API — no extra package needed. It stores:
- Chat message history (`id`, `role`, `text`)
- The last active result snapshot (so results survive a page reload)

It is dynamically imported (never runs during SSR) and silently no-ops if IndexedDB is unavailable.

---

## 🏗️ Architecture

### Folder Structure

```
app/
├── api/
│   └── ai-search/route.ts   # AI Search API endpoint
├── inventory/
│   └── page.tsx             # Main inventory page (InstantSearch + AI mode)
├── layout.tsx
└── page.tsx

components/
├── inventory/
│   ├── AISearch/
│   │   └── AISearchPanel.tsx  # All AI Search UI + useAISearch hook
│   ├── HitCard.tsx
│   ├── HitCardSkeleton.tsx
│   └── index.ts
├── layout/                  # Header, Footer
└── common/                  # Shared components (GetInTouch, etc.)

lib/
├── aiChatStorage.ts         # IndexedDB persistence for AI chat
├── appConfig.ts             # Runtime app / Typesense config
├── typesense.ts             # Typesense client factory
└── inventoryRouting.ts      # react-instantsearch URL routing
```

### Path Aliases

| Alias | Resolves to |
|-------|------------|
| `@/app` | `app/` |
| `@/components` | `components/` |
| `@/lib` | `lib/` |
| `@/assets` | `assets/` |
| `@/constants` | `constants/` |
| `@/types` | `types/` |
| `@/context` | `context/` |

---

## �️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build (uses `--webpack` flag) |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 📦 Build & Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel (Recommended)

1. Push to GitHub
2. Connect repository to [Vercel](https://vercel.com)
3. Add environment variables in the Vercel dashboard:
   - `OPENAI_API_KEY` — required for AI Search
   - Any Typesense / app config variables your `lib/appConfig.ts` reads
4. Vercel auto-detects Next.js — no extra config needed
5. Deploys on every push to `main`

### Environment Variables on Vercel

Go to **Project → Settings → Environment Variables** and add:

| Variable | Required | Notes |
|----------|----------|-------|
| `OPENAI_API_KEY` | ✅ Yes | AI Search will be broken without this |

---

## 🐛 Troubleshooting

### AI Search returns errors / not working

1. Check `OPENAI_API_KEY` is set in `.env.local` and has GPT-4o access
2. Check server logs — the route logs all errors with prefix `AI Search Error:`
3. Verify Typesense connection — the AI route also queries Typesense directly for facet values

### Port 3000 already in use

```bash
# Next.js will automatically try the next available port
npm run dev
```

### Build errors

```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Dependency issues

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### IndexedDB not persisting chat history

IndexedDB requires a secure context (HTTPS or localhost). On non-secure origins the storage silently no-ops — the chat still works, it just won't survive a reload.

---

## 🎯 Key Features

- ✅ Server-side rendering with Next.js 16 App Router
- ✅ Type-safe development with TypeScript
- ✅ Responsive design with Tailwind CSS v4
- ✅ Real-time faceted search with Typesense + react-instantsearch
- ✅ **AI-powered natural-language search** with OpenAI GPT-4o (Dora Assistant)
- ✅ AI chat history persisted across reloads via IndexedDB
- ✅ Mobile swipeable vehicle carousel with dot navigation
- ✅ Client-side state management with React Query
- ✅ Runtime validation with Zod
- ✅ Accessibility-focused components
- ✅ Image optimisation with Next.js Image component
- ✅ Dark mode support with next-themes

---

## 📄 License

This project is proprietary to GrCars. All rights reserved.

---

**Last Updated:** September 2026  
**Next.js Version:** 16.2.4  
**Node.js Minimum:** v18.17.0  
**AI Model:** OpenAI GPT-4o
