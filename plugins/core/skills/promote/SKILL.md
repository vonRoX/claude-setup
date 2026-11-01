---
name: promote
description: Generalize a lesson from this project and open a PR that refactors principles.md in vonRoX/claude-setup
argument-hint: <rule or lesson>
disable-model-invocation: true
allowed-tools: Bash(gh api repos/vonRoX/claude-setup/*), Bash(base64 *), Write
---

Turn one lesson from this project into a pull request on the shared principles. All calls go through `gh api repos/vonRoX/claude-setup/...` (repo-scoped REST only). Write nothing anywhere else except one temp file. In every `gh api` call put the path first, then `--method X`, then the fields, so the permission pattern matches.

1. **Candidate.** Use this: $ARGUMENTS. If it is empty, use a lesson listed by /core:retro, or ask for one and stop.
2. **Generalize.** Strip repo names, paths, people and values that change. If the lesson is not true in every repo, say so and stop.
3. **Read the target.** Decode the file with `gh api repos/vonRoX/claude-setup/contents/plugins/core/principles.md --jq '.content | gsub("\n";"") | @base64d'`. The output ends with one extra newline from `gh`; drop it so the file keeps a single final newline. Get the blob sha with the same path and `--jq .sha`. In v0.1 this file is the only target. List any other fitting target (a skill, an agent, a hook) as a follow-up in the PR text.
4. **Refactor, don't append.** Merge the lesson into existing lines and remove what it makes redundant. Note what changed. If the file already says this, say so and stop without a PR. If the result has more than about 35 non-blank lines, propose a cut in the same PR.
5. **Open the PR.** Use these calls in order:
   a. `POST .../labels` with `-f name=promotion`. Ignore a 422 (label exists).
   b. `GET .../git/ref/heads/main` with `--jq .object.sha` for the base commit.
   c. `POST .../git/refs` with both `-f ref=refs/heads/promote/<slug>-<short-random>` and `-f sha=<base commit>`. On 422 pick a new suffix once.
   d. Write the new file text to a temp file with Write, run `base64 -w0 <file>`, then `PUT .../contents/plugins/core/principles.md` with `-f message=...`, `-f content=<that output>`, `-f sha=<file blob sha>` and `-f branch=<new branch>`. On 409, re-read the file and its sha with `?ref=<branch>` appended to the path, re-apply the change and retry once. If it fails again, stop and report.
   e. `POST .../pulls` with `-f title=...`, `-f head=<new branch>`, `-f base=main` and `-f body=...`.
   f. `POST .../issues/<n>/labels` with `-f 'labels[]=promotion'`, where `<n>` is the PR number.
6. **PR body.** Use these headings:
   - Source: the repo and commit the lesson came from. Take them from the session context, or ask the user.
   - Original: the lesson as first stated.
   - Generalized: the new wording.
   - Why: the reason, including what went wrong without it.
   - Removed or merged: lines that were cut or combined.
   - After merge: a checklist item to delete the copy from the project's CLAUDE.md and auto memory.
7. **Report** the PR link. Never merge your own PR.

If any call returns 403, say that vonRoX/claude-setup must be attached to the cloud session, and stop. If the branch from step 5c already exists, say that an orphan branch is left and name it.
