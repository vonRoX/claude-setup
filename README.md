# claude-setup

A personal [Claude Code](https://code.claude.com) setup, shared as a plugin marketplace.
`core` is a short instruction file plus `/core:promote` and `/core:retro`. `recommended` installs official [Anthropic plugins](https://github.com/anthropics/claude-plugins-official).

## Install (local)

Works from any shell. No CLI login is needed.
```sh
claude plugin marketplace add vonRoX/claude-setup
claude plugin install core@claude-setup
claude plugin install recommended@claude-setup
```

Then add this line at the top of `~/.claude/CLAUDE.md`, and keep what is already there:
```
@~/.claude/plugins/marketplaces/claude-setup/plugins/core/principles.md
```

Then turn on auto-update: `/plugin` > Marketplaces > claude-setup, or set `"autoUpdate": true` on the `claude-setup` entry under `extraKnownMarketplaces` in `~/.claude/settings.json`.
The desktop app can browse plugins (+ > Add plugins), but it has no add-marketplace screen.

## Install (cloud)

The environment setup script must exit 0, so every step ends with `|| true`.
```sh
mkdir -p ~/.claude
curl -fsSL https://raw.githubusercontent.com/vonRoX/claude-setup/main/plugins/core/principles.md -o ~/.claude/CLAUDE.md || true
claude plugin marketplace add vonRoX/claude-setup || true
claude plugin install core@claude-setup || true
```

<!-- cloud lines pending issue #1 -->
Cloud refreshes this when its snapshot is rebuilt, within about 7 days.

## Update

Run `claude plugin marketplace update claude-setup`, then `claude plugin update core@claude-setup`, then `/reload-plugins` or restart Claude Code.

## Per project

- A repo's `CLAUDE.md` can narrow or extend any line. It wins where it differs.
- To switch the plugin off in one repo, put `"enabledPlugins": {"core@claude-setup": false}` in its `.claude/settings.json`.
- To let Claude push and merge in a repo, add one line to that repo's `CLAUDE.md`, for example: "Claude may commit, push, open and merge PRs here without asking."
- Optional: stop the merge prompt with `{ "permissions": { "allow": ["Bash(gh pr merge:*)"] } }` in `.claude/settings.json`.

## Writing a project CLAUDE.md
- Say what the project is, why it exists, and how to build, test and verify it.
- Keep it under about 60 lines. Include only what is true for every task in that repo.
- Point to a file and line instead of pasting code.
- Leave style to linters, and run them from a hook.
- Treat `/init` output as a draft and trim it by hand.

Credit: [HumanLayer](https://www.humanlayer.dev/blog/writing-a-good-claude-md) and the official [best practices](https://code.claude.com/docs/en/best-practices).

## Promoting a lesson
1. The project session edits its own files first.
2. `/core:promote <lesson>` opens a PR labelled `promotion`.
3. A maintainer session refactors it, and the owner merges. Merged rules reach every project on the next update.

Merged rules reach every project on the next update.

## Companion tools

`recommended` skips plugins that are already installed. All come from [claude-plugins-official](https://github.com/anthropics/claude-plugins-official).

| Plugin | Use it when |
| --- | --- |
| [claude-md-management](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/claude-md-management) | you want to audit or update a `CLAUDE.md` |
| [claude-code-setup](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/claude-code-setup) | you want advice on hooks, skills and MCP for a repo |
| [feature-dev](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/feature-dev) | you build a larger feature step by step |
| [frontend-design](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/frontend-design) | you build UI that should not look generic |
| [code-review](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/code-review) | you want a review of a pull request |

## Design rule
The same outcome local and cloud; only the worker may differ.
