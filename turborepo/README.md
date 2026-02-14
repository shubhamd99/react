# Turborepo Project

This repository is a monorepo managed by [Turborepo](https://turbo.build/repo). It contains a Next.js application and shared configuration/component packages.

## 📂 Project Structure

```text
.
├── apps
│   └── web                  # Main Next.js application
├── packages
│   ├── ui                   # Shared React component library
│   ├── eslint-config        # Shared ESLint configurations
│   └── typescript-config    # Shared TypeScript configurations
├── package.json             # Root scripts and workspace configuration
└── turbo.json               # Turborepo pipeline configuration
```

## 🚀 Quick Start

1.  **Install dependencies**:

    ```bash
    npm install
    ```

2.  **Start the development server**:

    ```bash
    npm run dev
    ```

    This starts the `web` application at `http://localhost:3000`.

3.  **Build the project**:
    ```bash
    npm run build
    ```

## 📦 Packages & Apps

### Apps

- **`apps/web`**: A [Next.js](https://nextjs.org/) application. It consumes components from `@repo/ui` and configurations from `@repo/config`.

### Packages

- **`packages/ui`**: A shared React component library.
  - **Exports**: Components are exported from `src/` (e.g., `src/button.tsx`).
  - **Usage**: Import in apps like `import { Button } from "@repo/ui/button";`.
- **`packages/eslint-config`**: Shared ESLint configuration to ensure consistent code style.
- **`packages/typescript-config`**: Shared `tsconfig.json` bases (e.g., `base.json`, `nextjs.json`, `react-library.json`).

## 🛠 Turborepo Concepts

### 1. Caching

Turborepo caches the output of your tasks (`dist` folders, logs, etc.) to save time.

- **Try it**: Run `npm run build`. Then run it again immediately.
- **Result**: The second run should be nearly instant and show `FULL TURBO` because no files changed.

### 2. Pipelines

Pipelines define the dependency graph between tasks in `turbo.json`.

- **`build`**: Depends on `^build` (build dependencies first). Output: `.next/**`.
- **`lint`**: Runs linting in all packages.
- **`dev`**: Runs dev servers. `cache: false` ensures it's always live.

### 3. Workspaces

We use **npm workspaces** to manage dependencies.

- Dependencies can be installed in the root (`npm install -w root-package`) or in specific workspaces (`npm install react -w apps/web`).

## ⚡ Advanced Features Implemented

### A. Filtering (Scoping)

You can run tasks for specific parts of the monorepo using filters.

- **`npm run dev:web`**: Runs `turbo run dev --filter=web`. Starts _only_ the web app.
- **`npm run build:web`**: Runs `turbo run build --filter=web`. Builds _only_ the web app.

### B. Environment Variables

Turborepo detects changes in environment variables to invalidate the cache.

- **Configuration**: `turbo.json` has `"globalEnv": ["NEXT_PUBLIC_API_URL"]`.
- **Usage**: Changing this variable in `.env.local` or your system will trigger a rebuild.

### C. Scoped Tasks

You can define tasks that only exist in some packages.

- **`special-task`**: Defined in `turbo.json`.
- **Implementation**: Only `apps/web` implements this script in its `package.json`.
- **Run it**: `npx turbo special-task`. It will execute for `web` and ignore other packages without error.

## 🤝 Contributing

1.  Add new components to `packages/ui`.
2.  Import them in `apps/web`.
3.  Run `npm run build` to verify integration.
