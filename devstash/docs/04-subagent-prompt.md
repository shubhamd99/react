# Section 7 Prompts

## Subagent Prompt

```text
Scan this Next.js codebase for:
- Security issues
- Performance problems
- Code quality
- Code that can be broken up into seperate files/components

Only report actual issues. DO NOT report things that are not implemented yet. If there is no authentication, don't report as an issue.

Report findings grouped by severity (critical, high, medium, low) with file paths, line numbers, and suggested fixes.

The .env file is in the .gitignore. You always seem to report that it is not. Be aware of that.
```

```
Use the code-scanner subagent to check the entire codebase and report your findings
```

## Add Quick Wins As A Feature

```text
Add a new feature to @context/current-feature.md with any quick wins from the list, meaning little to no risk. I want the N+1 issue. Authentication has not been implmeneted yet so do not add that.
```

```text
Leave the mock data file and for the N+1, Dont use any raw SQL, stick to Prisma convention
```

```text
Make sure you use migrations for the indexes because we need to sync the db and prod branches. Continue
```

```text
check the error in RecentItems - Error: Cannot create components during render
```
