---
name: promote
description: Generalize a lesson from this project and open a PR that refactors principles.md in vonRoX/claude-setup
argument-hint: <rule or lesson>
disable-model-invocation: true
allowed-tools: Bash(mktemp *), Bash(git clone *), Bash(git -C *), Bash(gh api repos/vonRoX/claude-setup/*), Read, Edit
---

Turn one lesson from this project into a pull request on the shared principles. Work in a fresh temp clone and write nothing anywhere else. Branches go through `git push`, because cloud sessions block `gh api` writes to `git/refs` and `contents`. Run each command on its own, and in every `gh api` call put the path first, then `--method X`, then the fields, so the permission patterns match.

1. **Candidate.** Use this: $ARGUMENTS. If it is empty, use a lesson listed by /core:retro, or ask for one and stop.
2. **Generalize.** Strip repo names, paths, people and values that change. If the lesson is not true in every repo, say so and stop.
3. **Read the target.** Run `mktemp -d`, then `git clone --depth 1 --branch main https://github.com/vonRoX/claude-setup <dir>`, then Read `<dir>/plugins/core/principles.md`. In v0.1 this file is the only target. List any other fitting target (a skill, an agent, a hook) as a follow-up in the PR text.
4. **Refactor, don't append.** Merge the lesson into existing lines and remove what it makes redundant. Note what changed. If the file already says this, say so and stop without a PR. Otherwise Edit the file in the clone. If the result has more than about 35 non-blank lines, propose a cut in the same PR.
5. **Open the PR.** Use these calls in order:
   a. `git -C <dir> switch -c promote/<slug>-<short-random>`.
   b. `git -C <dir> commit -am "<message>"`, then `git -C <dir> push -u origin HEAD`. If the branch name is taken, pick a new suffix once.
   c. `POST .../labels` with `-f name=promotion`. Ignore a 422 (label exists).
   d. `POST .../pulls` with `-f title=...`, `-f head=<new branch>`, `-f base=main` and `-f body=...`.
   e. `POST .../issues/<n>/labels` with `-f 'labels[]=promotion'`, where `<n>` is the PR number.
6. **PR body.** Use these headings:
   - Source: the repo and commit the lesson came from. Take them from the session context, or ask the user.
   - Original: the lesson as first stated.
   - Generalized: the new wording.
   - Why: the reason, including what went wrong without it.
   - Removed or merged: lines that were cut or combined.
   - After merge: a checklist item to delete the copy from the project's CLAUDE.md and auto memory.
7. **Report** the PR link. Never merge your own PR.

In a cloud session, if the clone, the push or an API call is refused, say that vonRoX/claude-setup must be attached to the session, and stop. If the push worked but a later call failed, name the branch that is left over.
