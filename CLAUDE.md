# agentic-ai-systems — Quarto course-site rules

This repo publishes a five-day course as a [Quarto](https://quarto.org) website to
GitHub Pages. It pairs a readable lesson (`.qmd`) with a runnable Colab twin
(`.ipynb` in `notebooks/`) for several lessons, plus a handful of standalone
`.ipynb` lessons rendered directly into the site (see `_quarto.yml`'s `render:`
list). Everything below was learned the hard way from two post-launch audit
passes (`git log --oneline` in this repo — the link-audit and Colab-badge
commits) and should be treated as binding for any new course site built the
same way, not just this one.

## Before touching anything: render, don't just read source

A `.qmd`/`.ipynb` file looking correct in the editor proves nothing. Quarto's
pandoc pass changes markdown structure in ways that are invisible in source
and only show up in the rendered HTML. **Always verify against `_site/`
output**, not the source file, for anything link- or layout-related:

```
quarto render
```

then inspect the actual `<a>`/`<img>` tags in `_site/**/*.html`, or open the
preview and check the DOM.

## The Colab-badge trap (pandoc implicit-figures)

Never write a linked image as its own paragraph in markdown:

```md
[![Open In Colab](badge.svg)](https://colab.research.google.com/...)
```

Quarto's implicit-figures pass silently drops the enclosing `<a>` when a
linked image is the only thing in its paragraph — the image still renders
(so it looks fine in preview), but the click target is gone. This is a
root-cause pandoc behavior, not a one-off typo; it will recur on any new
badge/linked-image written this way. Always write badges as raw HTML instead:

```html
<a href="https://colab.research.google.com/github/<user>/<repo>/blob/master/notebooks/<name>.ipynb" target="_blank" rel="noopener"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"></a>
```

## Links: audit the rendered site, not just grep source

Do a full link audit (every `<a href>` and `<img src>` on every rendered
page — internal targets exist, fragment anchors resolve, external URLs
return non-error status) before publishing, and periodically afterward since
upstream docs move. Concretely:

- **Root-relative links copied from another site's docs are dead weight,
  not a typo.** Content copied verbatim from e.g. LangChain's own docs often
  contains `/oss/python/...`-style paths that resolve fine on *their* domain
  and go nowhere on yours. Rewrite to the full external URL and verify it
  live before committing.
- **External docs reorganize.** A link that was correct when the lesson was
  written can 404 later because the upstream page was removed or merged into
  another. Re-check periodically, not just once at launch.
- **Before "fixing" a flagged link, confirm it's real.** An audit tool will
  produce false positives — e.g. a string that *looks* like a root-relative
  link but is actually quoted content inside a captured tool-output cell
  (not a real `<a href>` in the rendered page), or a fragment anchor that
  the audit didn't find but genuinely exists. Check whether the match is in
  cell *output* vs. source, and whether it renders as an actual link, before
  editing.

## Notebook twins (`notebooks/*.ipynb`) need their own link pass

A notebook meant to be opened standalone in Colab cannot use links that only
make sense inside the rendered Quarto site:

- No relative cross-references to other `.qmd` files (`09_langgraph.qmd`) —
  they go nowhere once the notebook is opened outside the site. Point at the
  live published page instead (e.g. `https://<user>.github.io/<repo>/...`).
- No self-referential "Open in Colab" badge (a notebook linking to itself).
  Replace it with something that's actually useful standalone, e.g. a
  "Full lesson with explanations" link back to the readable page.

## Keep the `.qmd` lesson and its `.ipynb` Colab twin in sync

When you actually *run* a notebook (not just read it) and hit something that
needed a fix — an API that changed, a version conflict, an environment quirk
— port that fix back into the paired `.qmd` lesson page too, so the "read
it" and "run it" versions of a lesson never diverge. Concretely from past
fixes in this repo:

- APIs drift underneath a lesson (e.g. `create_react_agent` → `create_agent`,
  which stopped accepting the same `prompt=` kwarg). Trust an actually
  executed run over what "should" work from reading the library's docs.
- If a run surfaces multi-step tool behavior that isn't obvious from the
  code (e.g. a handoff that's really two separate calls under the hood),
  document the real shape, not the simplified one.
- If a workaround was needed to make a Colab environment behave (dependency
  version pins, etc.), note it inline where the run needed it.
- If real output looks confusing out of context (e.g. fake/stub embeddings
  producing duplicate-looking results), add a callout explaining *why*, so
  the reader isn't left thinking something is broken — and point at the
  real thing to use when it matters (e.g. real embeddings for production).

## `_quarto.yml` gotchas

- **`notebooks/` ships without saved outputs** (they're the runnable twins,
  meant to be executed fresh in Colab) — exclude it from the project render
  list (`"!notebooks/"`) or Quarto will fail trying to render un-executed
  notebooks under `execute: enabled: false`.
- **Don't add `revealjs` as a project-level format.** Listing it alongside
  `html` makes Quarto render every page twice, and both outputs claim the
  same `<name>.html` — the whole project render dies with a "NotFound ...
  rename" race. If a page needs slides, render that one file explicitly:
  `quarto render <page>.qmd --to revealjs`, with the slide options in that
  page's own front matter.
- **`execute: enabled: false` at the project level** is deliberate when
  notebooks already contain saved outputs from a real run with real API
  keys — students building the site locally won't have those keys, so the
  site must render from saved outputs, not re-execute.
- When editing this file with a scripted tool (`sed`, bulk find/replace), a
  partial edit can strand orphaned child keys under a since-deleted parent
  block (this happened after a `revealjs:` key line was removed but its
  indented children weren't). After any scripted YAML edit, re-read the
  whole block and check for now-parentless keys, not just the line you
  targeted.

## General rule

Before calling a page "done," always confirm end-to-end against the
**rendered** output: re-render clean, re-run the link audit, and check the
Colab badges are still real `<a>` links — not just that the source markdown
looks right.
