# Learning Biome 🚀

A comprehensive React project demonstrating **Biome** - the fast, modern toolchain that replaces both Prettier and ESLint with a single, unified tool.

## 📚 Table of Contents

- [What is Biome?](#what-is-biome)
- [Why Biome?](#why-biome)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Available Scripts](#available-scripts)
- [Configuration Details](#configuration-details)
- [Absolute Imports Setup](#absolute-imports-setup)
- [Biome vs Prettier & ESLint](#biome-vs-prettier--eslint)
- [Editor Integration](#editor-integration)
- [Migration Guide](#migration-guide)
- [Resources](#resources)

## 🎯 What is Biome?

**Biome** is a fast, all-in-one toolchain for web development that provides:

- **Formatting** (replaces Prettier)
- **Linting** (replaces ESLint)
- **Import Organization** (automatic import sorting)

Built with Rust for maximum performance, Biome is designed to be:

- ⚡ **Fast** - Up to 97% faster than ESLint
- 🔧 **Simple** - One tool instead of multiple
- 📦 **Zero Config** - Works out of the box with sensible defaults
- 🎨 **Consistent** - Unified formatting and linting rules

## 💡 Why Biome?

### Performance

- **35x faster** than Prettier
- **97% faster** than ESLint
- Written in Rust for native performance

### Simplicity

- **One configuration file** instead of multiple (`.prettierrc`, `.eslintrc`, etc.)
- **One dependency** instead of dozens of ESLint plugins
- **Unified tooling** - no conflicts between formatters and linters

### Developer Experience

- **Better error messages** with helpful suggestions
- **Automatic fixes** for most issues
- **Built-in import sorting** - no additional plugins needed
- **Fast feedback** - runs in milliseconds, not seconds

## 📦 Installation

This project already has Biome installed. To add Biome to a new project:

```bash
# Install Biome
npm install --save-dev --save-exact @biomejs/biome

# Initialize configuration
npx @biomejs/biome init
```

## ⚙️ Configuration

Biome is configured via [`biome.json`](./biome.json) in the project root. Our configuration includes:

### Formatting Settings

```json
{
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100,
    "lineEnding": "lf"
  }
}
```

### JavaScript/TypeScript Settings

```json
{
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "jsxQuoteStyle": "double",
      "semicolons": "always",
      "trailingCommas": "es5",
      "arrowParentheses": "always"
    }
  }
}
```

### Linting Rules

- **Accessibility (a11y)**: Ensures accessible React components
- **Complexity**: Prevents overly complex code
- **Correctness**: Catches common bugs and errors
- **Security**: Identifies security vulnerabilities
- **Style**: Enforces consistent code style
- **Suspicious**: Detects suspicious patterns

## 🚀 Usage

### Quick Commands

```bash
# Check formatting and linting
npm run check

# Fix all auto-fixable issues
npm run check:fix

# Format code only
npm run format:write

# Lint code only
npm run lint:fix
```

## 📜 Available Scripts

| Script             | Command                  | Description                       |
| ------------------ | ------------------------ | --------------------------------- |
| `dev`              | `vite`                   | Start development server          |
| `build`            | `tsc -b && vite build`   | Build for production              |
| `preview`          | `vite preview`           | Preview production build          |
| **`lint`**         | `biome lint .`           | Check for linting errors          |
| **`lint:fix`**     | `biome lint --write .`   | Fix linting errors                |
| **`format`**       | `biome format .`         | Check formatting                  |
| **`format:write`** | `biome format --write .` | Fix formatting                    |
| **`check`**        | `biome check .`          | Check both formatting and linting |
| **`check:fix`**    | `biome check --write .`  | Fix both formatting and linting   |
| **`ci`**           | `biome ci .`             | Run checks in CI mode (no fixes)  |

### Recommended Workflow

1. **During Development**: Use `npm run check:fix` to automatically fix issues
2. **Before Commit**: Run `npm run check` to verify everything is clean
3. **In CI/CD**: Use `npm run ci` for strict checking without modifications

## 🔧 Configuration Details

### File Ignoring

Biome automatically ignores common directories:

- `node_modules`
- `dist`, `build`
- `coverage`
- `.next`, `.cache`
- `*.min.js`

### VCS Integration

Biome integrates with Git and respects `.gitignore`:

```json
{
  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "useIgnoreFile": true,
    "defaultBranch": "main"
  }
}
```

### Custom Rules

You can customize any rule in `biome.json`:

```json
{
  "linter": {
    "rules": {
      "suspicious": {
        "noConsoleLog": "warn", // Warn instead of error
        "noDebugger": "warn"
      },
      "correctness": {
        "noUnusedVariables": "warn"
      }
    }
  }
}
```

## 📂 Absolute Imports Setup

The project is configured to support absolute imports using the `@/` prefix, which points to the `src` directory.

### 1. TypeScript Configuration (`tsconfig.app.json`)

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### 2. Vite Configuration (`vite.config.ts`)

```typescript
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

### 3. Biome Compatibility

Biome automatically respects the file structure. Since absolute imports are handled by the bundler (Vite) and TypeScript, Biome's linter and formatter work seamlessly with this setup.

### Usage Example

```tsx
// Using absolute import
import Button from "@/components/Button";

// instead of
import Button from "../../components/Button";
```

## ⚖️ Biome vs Prettier & ESLint

| Feature            | Biome                    | Prettier + ESLint          |
| ------------------ | ------------------------ | -------------------------- |
| **Speed**          | ⚡ Lightning fast (Rust) | 🐌 Slower (JavaScript)     |
| **Setup**          | ✅ One config file       | ❌ Multiple config files   |
| **Dependencies**   | ✅ One package           | ❌ Many packages + plugins |
| **Formatting**     | ✅ Built-in              | ✅ Prettier                |
| **Linting**        | ✅ Built-in              | ✅ ESLint                  |
| **Import Sorting** | ✅ Built-in              | ❌ Needs plugin            |
| **Auto-fix**       | ✅ Fast & reliable       | ⚠️ Can be slow             |
| **Error Messages** | ✅ Clear & helpful       | ⚠️ Sometimes cryptic       |
| **Configuration**  | ✅ Simple JSON           | ❌ Complex configs         |

### Performance Comparison

```
Formatting 100 files:
- Prettier: ~2000ms
- Biome:    ~60ms   (35x faster)

Linting 100 files:
- ESLint:   ~5000ms
- Biome:    ~150ms  (33x faster)
```

## 🎨 Editor Integration

### VS Code

Install the official Biome extension:

1. Search for "Biome" in VS Code extensions
2. Install "Biome - VS Code extension by Biome"
3. Add to `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "biomejs.biome",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "quickfix.biome": "explicit",
    "source.organizeImports.biome": "explicit"
  }
}
```

### Other Editors

Biome has extensions for:

- **IntelliJ IDEA / WebStorm**
- **Neovim**
- **Sublime Text**
- **Zed**

See [Biome Editor Integration](https://biomejs.dev/guides/editors/first-party-extensions/) for details.

## 🔄 Migration Guide

### From Prettier

Biome can automatically migrate your Prettier configuration:

```bash
npx @biomejs/biome migrate prettier --write
```

### From ESLint

Biome can migrate many ESLint rules:

```bash
npx @biomejs/biome migrate eslint --write
```

### Manual Migration Steps

1. **Remove old dependencies**:

```bash
npm uninstall prettier eslint eslint-config-* eslint-plugin-*
```

2. **Delete old config files**:

```bash
rm .prettierrc .eslintrc.js .eslintignore
```

3. **Install Biome**:

```bash
npm install --save-dev --save-exact @biomejs/biome
npx @biomejs/biome init
```

4. **Update package.json scripts**:

```json
{
  "scripts": {
    "format": "biome format --write .",
    "lint": "biome lint --write .",
    "check": "biome check --write ."
  }
}
```

## 📖 Resources

### Official Documentation

- [Biome Website](https://biomejs.dev/)
- [Getting Started Guide](https://biomejs.dev/guides/getting-started/)
- [Configuration Reference](https://biomejs.dev/reference/configuration/)
- [Linter Rules](https://biomejs.dev/linter/rules/)

### Community

- [GitHub Repository](https://github.com/biomejs/biome)
- [Discord Community](https://biomejs.dev/chat)
- [Twitter](https://twitter.com/biomejs)

### Comparison & Migration

- [Biome vs Prettier](https://biomejs.dev/blog/biome-wins-prettier-challenge/)
- [ESLint Migration Guide](https://biomejs.dev/guides/migrate-eslint/)
- [Prettier Migration Guide](https://biomejs.dev/guides/migrate-prettier/)

## 🎓 Key Takeaways

1. **Biome is fast** - Written in Rust, it's significantly faster than JavaScript-based tools
2. **Biome is simple** - One tool, one config, fewer dependencies
3. **Biome is modern** - Built from the ground up with modern web development in mind
4. **Biome is compatible** - Can migrate from Prettier and ESLint with minimal effort
5. **Biome is actively developed** - Regular updates and improvements from the community

## 🚀 Getting Started

1. **Install dependencies**:

```bash
npm install
```

2. **Start development server**:

```bash
npm run dev
```

3. **Try Biome commands**:

```bash
# Check your code
npm run check

# Auto-fix issues
npm run check:fix
```

4. **Explore the configuration** in [`biome.json`](./biome.json)

---

**Happy coding with Biome! 🎉**
