# Flashcards Quiz

A flashcard study app with AI-powered deck generation, progress tracking, and learning statistics.

## Features

- **Deck Library** — Browse and select flashcard decks
- **Study Mode** — Navigate cards, filter by learned/unlearned, mark progress
- **Statistics** — Visual learning progress charts per deck
- **AI Generation** — Generate flashcard decks from any topic
- **Card Management** — Add, edit, and delete cards within a deck

## Tech Stack

| Layer      | Technology                     |
| ---------- | ------------------------------ |
| Framework  | React 19 + TypeScript          |
| Routing    | React Router DOM 7             |
| State      | Zustand 5                      |
| Styling    | Tailwind CSS + Framer Motion   |
| Charts     | Recharts                       |
| Build      | Vite 7                         |
| Unit Tests | Vitest + React Testing Library |
| E2E Tests  | Playwright                     |

## Getting Started

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`

## Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
npm run test       # Run unit tests (Vitest)
```

## Testing

### Unit & Component Tests

```bash
npm run test                   # run all unit tests
```

### E2E Tests

```bash
npx playwright test                    # run all e2e tests
npx playwright test --headed           # run with browser visible
npx playwright test stats              # run specific test file
```

> E2E tests require the dev server running. Playwright starts it automatically via `webServer` config.

## Project Structure

```
src/
├── api/              # AI generation integration
├── components/       # UI components organized by feature
│   ├── appComponents/
│   ├── deckLibraryComponents/
│   ├── generateComponents/
│   ├── homeComponents/
│   ├── layout/
│   └── ui/
├── constants/        # UI text constants
├── enums/            # Filter options
├── hooks/            # Custom React hooks
├── pages/            # Route-level pages
├── store/            # Zustand store
├── types/            # TypeScript interfaces
└── test/             # Test setup

integration/          # Playwright E2E tests
├── pages/            # Page Object Models
├── fixtures.ts       # Shared test fixtures
└── labels.ts         # UI label constants
```

## Test Coverage

| Layer                | Tool         | Tests  |
| -------------------- | ------------ | ------ |
| Unit — Zustand store | Vitest       | 6      |
| Unit — custom hooks  | Vitest + RTL | 7      |
| Component            | Vitest + RTL | 11     |
| E2E                  | Playwright   | 39     |
| **Total**            |              | **63** |

## AI Generation Setup

The Generate feature uses [OpenRouter](https://openrouter.ai/) to create flashcard decks from any topic.

### Steps

1. Create a free account at [openrouter.ai](https://openrouter.ai/)
2. Go to **Keys** and generate an API key
3. Create a `.env` file in the project root:

```bash
VITE_OPENROUTER_API_KEY=your_api_key_here
```

4. Restart the dev server — the Generate page will now work

> The app uses the `openai/gpt-oss-120b:free` model by default which is available on the free tier.

> Never commit your `.env` file — it's already in `.gitignore`.
