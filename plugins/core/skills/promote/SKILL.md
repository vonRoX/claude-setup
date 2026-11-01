---
name: promote
description: Generalize a lesson from this project and open a PR that refactors principles.md in vonRoX/claude-setup
argument-hint: <rule or lesson>
disable-model-invocation: true
allowed-tools: Bash(gh api repos/vonRoX/claude-setup/*)
---

Turn one lesson from this project into a pull request on the shared principles. All calls go through `gh api repos/vonRoX/claude-setup/...` (repo-scoped REST only). Write nothing anywhere else.

1. **Candidate.** Use the rule or lesson the user named in the arguments, or one listed by /core:retro. If there is none, ask for one and stop.
2. **Generalize.** Strip repo names, paths, people and values that change. If the lesson is not true in every repo, say so and stop.
3. **Read the target.** `GET repos/vonRoX/claude-setup/contents/plugins/core/principles.md`. Decode the base64 `content` and keep the `sha`. In v0.1 this file is the only target. List any other fitting target (a skill, an agent, a hook) as a follow-up in the PR text.
4. **Refactor, don't append.** Merge the lesson into existing lines and remove what it makes redundant. Note what changed. If the file already says this, say so and stop without a PR. If the result has more than about 35 non-blank lines, propose a cut in the same PR.
5. **Open the PR.** Use these calls in order:
   a. `POST .../labels` with name `promotion`. Ignore a 422 (label exists).
   b. `GET .../git/ref/heads/main` to get the base commit.
   c. `POST .../git/refs` with `refs/heads/promote/<slug>-<short-random>`. On 422 pick a new suffix once.
   d. `PUT .../contents/plugins/core/principles.md` with the new base64 content, the `sha` and the `branch`. On 409, re-read the file and its `sha` once, re-apply the change and retry. If it fails again, stop and report.
   e. `POST .../pulls` with the new branch as head and main as base.
   f. `POST .../issues/<n>/labels` with `promotion`, where `<n>` is the PR number.
6. **PR body.** Use these headings:
   - Source: the repo and commit the lesson came from.
   - Original: the lesson as first stated.
   - Generalized: the new wording.
   - Why: the reason, including what went wrong without it.
   - Removed or merged: lines that were cut or combined.
   - After merge: a checklist item to delete the copy from the project's CLAUDE.md and auto memory.
7. **Report** the PR link. Never merge your own PR.

If any call returns 403, say that vonRoX/claude-setup must be attached to the cloud session, and stop.
