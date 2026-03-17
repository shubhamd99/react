# UI Component Playground: Shadcn/UI + HeroUI

A high-performance, aesthetically pleasing playground for experimenting with and comparing two of the most popular React component libraries: **shadcn/ui** and **HeroUI**.

## 📸 Previews

| Tab 1: Shadcn/UI | Tab 2: HeroUI |
| :---: | :---: |
| ![Shadcn Preview](./preview/01.png) | ![HeroUI Preview](./preview/02.png) |

## 🚀 Overview

This project serves as a technical showcase and revision tool for modern frontend architectures. It integrates two distinct component philosophies:

- **shadcn/ui**: Copy-paste components built on top of **Base UI** (formerly Radix UI) for maximum flexibility and accessibility.
- **HeroUI**: A library formerly known as NextUI, focused on premium aesthetic and developer experience with a unified, opinionated design system.

---

## 🛠️ Tech Stack & Packages Used

| Package | Purpose | Documentation / Link |
| :--- | :--- | :--- |
| **React 19** | Core UI framework with improved concurrent rendering and transitions. | [react.dev](https://react.dev) |
| **Vite** | Next-generation frontend tooling for rapid development and optimized builds. | [vite.dev](https://vite.dev) |
| **Tailwind CSS v3.4** | Utility-first CSS framework for rapid UI development and design system tokens. | [tailwindcss.com](https://tailwindcss.com) |
| **shadcn/ui** | Accessible and customizable components built with Radix Primitive logic. | [ui.shadcn.com](https://ui.shadcn.com) |
| **HeroUI (NextUI)** | Stunning, accessible React UI library with a focus on modern aesthetics. | [heroui.com](https://heroui.com) |
| **Framer Motion** | Production-ready motion library for React, powering HeroUI's animations. | [framer.com/motion](https://www.framer.com/motion/) |
| **Base UI** | Unstyled React primitives that power the shadcn/ui components in this project. | [base-ui.com](https://base-ui.com) |
| **Lucide React** | Beautifully simple, open-source icon toolkit. | [lucide.dev](https://lucide.dev) |
| **Zustand** | Modular, action-based state management (recommended pattern for complexity). | [docs.pmnd.rs/zustand](https://docs.pmnd.rs/zustand) |
| **OKLCH Colors** | Modern color space used for semantic design tokens and extreme precision. | [oklch.com](https://oklch.com) |

---

## 🏗️ Architecture Principles

Following the **Shubham Dhage Playbook**:
- **Atomic Design**: Components are structured into modular, reusable units.
- **Strict TypeScript**: Type safety is enforced across the codebase to ensure maintainability.
- **Performance Driven**: Minimized bundle size and optimized rendering paths.
- **No Magic Numbers**: Design tokens are centralized in `tailwind.config.js` and `index.css`.

## ⚙️ Development

```bash
# Install dependencies (respects peer dependency requirements)
npm install --legacy-peer-deps

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 🔧 Component Implementation Notes

### Shadcn/UI Components
Located in `src/components/ui`. These components are built with `@base-ui/react` to provide industry-standard accessibility (WAI-ARIA) while allowing full control over the visual presentation via Tailwind CSS.

### HeroUI Components
Directly imported from `@heroui/react`. These provide a "premium by default" experience with built-in animations and complex interactions.

---

## 📝 Definition of Done
- [x] Zero CSS syntax errors in production build.
- [x] Consistent layout across mobile and desktop.
- [x] Accessible interaction patterns for all UI triggers.
