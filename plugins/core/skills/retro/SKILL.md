---
name: retro
description: Look back at a session and turn what it cost into a grant list and a few lasting lessons. Use after a long or expensive session, or when the same blocker keeps coming back.
argument-hint: [session or lesson]
disable-model-invocation: true
---

Run a short retrospective on this session: $ARGUMENTS. If that is empty, use the current session. Assume no repo is open; the session may not have been about code.

1. **Find work done around missing access.** Read `references/capability-gaps.md` and scan the session for its detection signals. For each chain, note what it cost and whether later work built on its output.
2. **Give the grant list.** Output the table from the reference, one row per gap, with the narrowest grant and a way to do it now. If you found no gaps, say so plainly and stop that part. Do not invent any.
3. **Pick the lessons.** Keep only lessons the user stated, or that happened at least twice. Drop one-off slips and anything you would only be guessing at.
4. **Choose the lightest fix.** Prefer a check or a hook over a rule, because a check cannot be forgotten. Write a rule only when nothing can check it, and keep it to one line.
5. **Hand off the edits.** Do not rewrite CLAUDE.md yourself. If the `revise-claude-md` skill from the claude-md-management plugin is installed, pass it the lessons that belong in CLAUDE.md. If it is not, list them and let the user apply them.
6. **Suggest promotion.** For each lesson that is true in every repo, suggest `/core:promote` with the wording.

End with what you left out and why, so the next session stays lean. Do not fix the work the session produced; report any defect you saw and let the user decide.
