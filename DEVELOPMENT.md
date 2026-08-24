# Development Guide

Read this before you start pushing stuff.

---

## Prerequisites

### Required Tools

#### Tool Manager: mise

**[mise](https://mise.jdx.dev/)** manages all project tools with consistent versions across local and CI environments.
think: nix flakes but higher-level and lightweight

```bash
# Install mise
curl https://mise.run | sh
eval "$(mise activate bash)"  # Add to your shell config

mise install # install project tooling
```

#### Tools Installed by mise

The `.mise.toml` file defines exact versions for reproducible builds:

<table>
  <tr>
    <td>Tool</td>
    <td>Purpose</td>
  </tr>
  <tr>
    <td>Node</td>
    <td>Javascript Runtime</td>
  </tr>
  <tr>
    <td>pnpm</td>
    <td>Node package manager</td>
  </tr>
  <tr>
    <td>gitleaks</td>
    <td>Secret detection and protection tool</td>
  </tr>
</table>

after installing all these tools with `mise install`, run `pnpm install` on project root to install all the necessary dependencies.

---

## Project Structure

```
Prescript.daily/
└── apps/
    ├── frontend/                      # Frontend application — Astro UI, client-side logic, styling, assets, and routes
    │   ├── public/                    # Publicly served resources — static files available directly to the browser
    │   │   ├── assets/                # Brand and interface assets — logos, emblems, icons, and images
    │   │   ├── fonts/                 # Bundled font files used by the application
    │   │   └── sounds/                # Audio resources used by the interface
    │   └── src/                       # Frontend source code
    │       ├── components/            # Reusable UI components
    │       │   └── react/              # React-based interactive components embedded in Astro
    │       ├── layouts/               # Shared Astro page layouts and structural page wrappers
    │       ├── lib/                   # Shared frontend logic, utilities, integrations, and application helpers
    │       ├── pages/                 # Application routes and page entry points
    │       │   └── api/                # Frontend API routes and server-side request handlers
    │       ├── scripts/               # Frontend scripts and browser-side functionality
    │       │   └── ts/                 # TypeScript script modules
    │       ├── styles/                # Application styling and stylesheet organization
    │       │   └── sass/               # Sass source files and style modules
    │       └── types/                 # Shared TypeScript type definitions and declarations
    │
    └── backend/                       # Backend application — server-side services and database integration
        └── db/                        # Database-related configuration, schema, and migration management
            └── supabase/              # Supabase project configuration and database resources
                └── migrations/        # Versioned database schema migrations

```

---

## Available Commands

### Root

**All** commands are run through `pnpm`

<table>
  <tr>
    <td>Command</td>
    <td>Description</td>
  </tr>
  <tr>
    <td>`prepare`</td>
    <td>Installs and sets up husky for pre-commit and pre-push hooks</td>
  </tr>
  <tr>
    <td>`release`</td>
    <td>triggers semantic release workflow, it'll trigger in dry run mode if it's not in a CI environment</td>
  </tr>
  <tr>
    <td>`dev:frontend`</td>
    <td>Triggers astro's development environment on the frontend directory</td>
  </tr>
  <tr>
    <td>`preview:frontend`</td>
    <td>Previews the built dist/ output</td>
  </tr>
  <tr>
    <td>`build`</td>
    <td>Builds the application on all workspace directories (only works on frontend for now)</td>
  </tr>
  <tr>
    <td>`lint`</td>
    <td>Dry runs and checks the code conventions on every file to see if they need linting (only works on frontend for now)</td>
  </tr>
  <tr>
    <td>`lint:fix`</td>
    <td>Fixes all linting issues</td>
  </tr>
  <tr>
    <td>`format`</td>
    <td>Formats all code files with Prettier</td>
  </tr>
  <tr>
    <td>`format:check`</td>
    <td>Only checks if the files follow the formatting guidelines listed in the prettier config file</td>
  </tr>
  <tr>
    <td>`typecheck`</td>
    <td>Runs typescript compiler on dry run mode</td>
  </tr>
  <tr>
    <td>`lint-staged`</td>
    <td>Lints any staged files (through git) with Prettier</td>
  </tr>
</table>

---

## Workflow

Always make your own branch when contributing, never push to `main` or `dev`.

- `main` — Stable, tested, working code only.
- `dev` — Approved and merged features and patches are thoroughly tested here.
- `your-username/branch` — This is where you'll be mainly working at.

When dev is stable and tested, we merge it into main together.

## Pull Requests

No pushing directly to main. Everything goes through a PR so at least one other person has eyes on it before it merges.

Keep PRs small and focused. A PR that does one thing is easy to review. A PR that rewrites half the project is a nightmare. If your feature is big, break it into smaller chunks.

Write a short description in the PR — what does it do, why, anything the reviewer should pay attention to. You don't need to write an essay, just enough context so the reviewer isn't flying blind.

btw don't SQUASH AND MERGE, so semantic-release bot can track the commits.

---

If something's wrong or missing, bring it up. this doc can change.
