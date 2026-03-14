# Section 6 Prompts

## Prisma Setup Prompt

```text
Add a new current feature to @context/current-feature.md to implement Neon PostgreSQL and Prisma. Check @context/features/database-spec.md for requirements.
```

```text
Open a new branch and implement the current feature. Pay special attention to the details about Prisma 7.
```

```text
The .env has our development branch connection string. Go ahead and run the initial migration. Never run db push. Always run a migration so we can replicate in production and keep the dbs synced.
```

## Testing Script Prompt

```text
Create a folder called 'scripts' and a file called 'test-db.ts' to test the database? Don't forget we need to install dotenv to access the env vars from the script
```

```
have you added test db script command in package json?
```

## Seed Data Feature Prompt

```text
Add a new current feature to the @context/current-feature.md to seed some data. Reference the @context/features/seed-spec.md to get the data that should be added. You can overwrite what is in the current seed file.
```

```
Update the @scripts/test-db.ts to fetch the demo data and display and amke sure eveyrthing works.
```

```text
Read the @context/current-feature.md file and implement the feature.
```

```text
Test to see if the data was added using the test script.
```

```text
Mark the feature as complete. Commit, merge, push and delete feature branch.
```

## Show Collections In Dash Prompt

```text
Add a new feature to the @context/current-feature.md file. Use the feature specs from @context/features/dashboard-collections-spec.md
```

```text
Create a new branch and implement the feature in the @context/current-feature.md file
```

```text
Mark this feature as completed then commit, merge and push
```
