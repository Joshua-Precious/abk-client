# ABK Client

A premium, modern web frontend client for the **ABK** event portal. Designed with rich visual aesthetics, including glassmorphism UI components, fluid micro-animations, chromatic-edge highlights, and dynamic layouts.

---

## 🚀 Tech Stack

- **Core Framework:** React 19 + TypeScript
- **Bundler & Dev Server:** Vite 8
- **Routing:** React Router 7
- **Styling:** Tailwind CSS v4 (configured with fluid custom styles)
- **Icons:** Iconify (`@iconify/react`)
- **HTTP Client:** Axios & native Fetch API
- **Package Manager & Runtime:** Bun

---

## ✨ Features

- **Immersive Landing Page:** Highlights a dynamic Hero showcase, a functional countdown clock to the main event, a timeline schedule, partners, and media trailers.
- **Dynamic Registration Flow:** Multi-field team registration form with real-time client-side validation and API integration.
- **Hall of Fame & Gallery:** A showcase of winners, high-resolution media galleries with smooth hover transformations and transitions.
- **Interactive FAQ:** Accordion-style layout for answering common event questions.
- **Admin Dashboard:** A secured administration control panel allowing managers to track and review event registrations in real time.

---

## 🛠️ Getting Started

### Prerequisites

You need [Bun](https://bun.sh/) installed locally on your system.

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   cd abk-client
   ```

2. Install the project dependencies:
   ```bash
   bun install
   ```

3. Configure your local environment:
   Create a `.env` file in the root directory and define the backend API URL:
   ```env
   VITE_API_URL=http://localhost:3000
   ```

### Scripts

- **Development Server:** Runs the application in development mode with hot-reloading.
  ```bash
  bun run dev
  ```
- **Build:** Compiles and builds the production bundle.
  ```bash
  bun run build
  ```
- **Linting:** Analyzes codebase for errors or warnings.
  ```bash
  bun run lint
  ```
- **Preview Production Build:** Previews the built application locally.
  ```bash
  bun run preview
  ```

---

## 📂 Project Structure

```text
abk-client/
├── public/              # Static assets (images, logos, etc.)
└── src/
    ├── components/
    │   ├── blocks/      # Modular section layouts (Header, Footer, Hero, Timeline, RegistrationForm)
    │   └── ui/          # Reusable styled wrappers (GlassyCard, GlassyContainer, ScrollToTop)
    ├── routes/          # Page route definitions (Home, About, FAQ, Register, Admin)
    ├── styles/          # Tailwind configuration & global CSS rules
    ├── types/           # Global TypeScript interfaces & types
    ├── root.tsx         # Entry point mounting BrowserRouter and routes
    └── routes.tsx       # Route mapping setup
```
