# Capability gaps and the workarounds that hide them

A capability gap is a missing grant: a folder the session cannot read, a tool
call the user declined, an MCP server that is not reachable, a CLI that is not
installed, a blocked host, a missing credential.

Gaps are cheap to fix. They are expensive because a capable agent usually gets
past one without fixing it. A gap that was worked around leaves no error in the
log, only a longer, stranger path through the work.

They repeat, they hide because a workaround reports as success, and they compound
because later work builds on whatever the half-working route produced.

## Detection signals

Any one is worth a look. Two on the same goal confirm a gap.

1. **Mechanism switching.** One goal pursued through two or more routes in a
   short time: an MCP tool, then a CLI, then raw shell. One switch can be a fair
   fallback. A second means the first was never diagnosed.
2. **A declined tool call followed by the same goal through another door.** A
   denial is the user's decision about the route. Look for a denial, no question
   to the user, and work continuing anyway.
3. **Territory drift.** Work moving away from its natural place: output in a
   temp folder, a second clone of the repo, files copied out so they can be
   read elsewhere.
4. **Named access errors.** Permission denied, read-only file system, a missing
   path that does exist, HTTP 401/403, a 404 from an endpoint that should exist,
   proxy 407, "command not found" for an installed tool, TLS verification
   failures.
5. **Privilege reaching.** `sudo`, `chmod`, `--force`, `--no-verify`, `--insecure`,
   switching off certificate checks, unsetting a proxy, disabling a sandbox.
   Each is both a workaround and a security finding. Flag it as both.
6. **Reimplementation.** Code that duplicates what the missing tool would have
   done: a hand-made HTTP client for an MCP server that was not set up, a
   scraper for a missing API token. Usually the most expensive shape.
7. **Narration tells.** "As a workaround", "since that didn't work", "let me try
   a different approach", "it seems I don't have access to X, so" right before a
   switch.

A chain is the goal, the first failure, each route tried, and what later work built on the result.

## Costing a gap

For each chain, note what it cost this session:

- **Turns** from the first failure until work resumed.
- **Repair radius.** Did later work build on the workaround's output, and did
  that need fixing? Usually larger than the recovery cost.
- **Recurrence.** Will it happen again on the next similar session? Almost always.

## The grant list

The result is a table the user can act on in a few minutes:

| Grant | What it unblocks | Cost this session | How to grant |
|---|---|---|---|
| Read and write on `<folder>` | Writing output directly; removes the copy-via-temp chain | N turns; output landed in the wrong place | Add the folder with `/add-dir`, or allow the specific commands in settings |
| The `gh` CLI, or the GitHub MCP server | PR and CI inspection; removes hand-made REST calls | N turns plus rate-limit failures that looked like flakes | Install and sign in to `gh`, or configure the MCP server |
| Network access to `<host>` | Dependency installs; removes the vendored copy | N turns plus a stale dependency | Add the host to the environment's allowed hosts |

Rules:

- **Minimal.** Name the narrowest grant that removes the problem. Never propose
  a broad permission mode for one gap.
- **Concrete.** The last column is something the user can do now.
- **Costed.** Without the cost column the list is a wish list.
- **Honest about refusals.** If the user declined a call on purpose, it does not
  belong in the list. Say the declined route needs an approved alternative and
  ask what it should be.

## Prevent the next one

Turn each confirmed grant into a read-only check that runs at session start and
only reports. Keep it fast. If it is slow or changes anything, it will be
deleted.
