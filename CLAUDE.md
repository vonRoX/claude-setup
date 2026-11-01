# claude-setup
A Claude Code plugin marketplace and the master of the global setup: what
ships here reaches every session that installs it.

Promotion queue: a maintainer session reviews open PRs labelled `promotion`.
Check each change is generic, refactor it in place (never just append), and
leave the merge to the owner.

Shipped files never name a project, path, person, account or version (the
`vonRoX` owner fields are the only exception).

Checks: `claude plugin validate .`, `node --test "scripts/*.test.mjs"`,
`node scripts/check-principles.mjs plugins/core/principles.md`.
