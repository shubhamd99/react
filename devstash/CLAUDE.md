# DevStash

A developer knowledge hub for snippets, commands, prompts, notes, files, images, links and custom types.

## Context Files

Read the following to get the full context of the project:

- @context/project-overview.md
- @context/coding-standards.md
- @context/ai-interaction.md
- @context/current-feature.md

## Commands

- **Dev server**: `npm run dev` (localhost:3000)
- **Build**: `npm run build`
- **Start production**: `npm run start`
- **Lint**: `npm run lint` (ESLint 9 flat config with Next.js core-web-vitals + TypeScript rules)

## Neon Database

- **Project ID**: `little-shadow-42291493` (devstash)
- **Development branch**: `br-raspy-band-adl8vz6o` — always use this branch for all Neon MCP operations
- **Production branch**: `br-little-mud-add2fow9` — NEVER use unless explicitly instructed
- When using `mcp__neon__run_sql` or any Neon MCP tool, always pass `branchId: "br-raspy-band-adl8vz6o"` and `projectId: "little-shadow-42291493"`
