# Roxen Dynamics — AI Agent: Publish a New Pulse Post

## What you receive
A topic and optionally some context or talking points from Arsalan.

## What you produce (fully autonomous — Arsalan touches nothing)
1. A new post HTML file in `docs/posts/` (e.g. `docs/posts/ehr-vendor-selection-checklist.html`)
2. A new entry added to the top of `docs/posts/posts.json`
3. A git commit and push of both files to `origin main`

---

## Step 1 — Choose a filename (SEO slug)

Generate a descriptive, SEO-friendly kebab-case slug from the article title —
3–6 words, lowercase, hyphen-separated, no stop words if avoidable.

- Example: "Why Your EHR Implementation Will Fail Before It Starts" →
  `ehr-implementation-fails.html`
- Example: "Your Smartwatch Just Became a Health Coach" →
  `smartwatch-health-coach-ai.html`

Check `docs/posts/` to confirm this filename doesn't already exist. If it
does, adjust the slug slightly (e.g. add a distinguishing word).

All post files live in `docs/posts/`. Never put them anywhere else.

---

## Step 2 — Choose the tags

A post can have **one or more tags**. Pick all that genuinely apply — don't force extra tags if only one fits.

| Tag value | Label | Use for |
|---|---|---|
| `health` | Digital Health | EHR, interoperability, FHIR, clinical systems, patient data |
| `arch` | Architecture | Enterprise architecture, current state, assessments, roadmaps |
| `ai` | AI & Technology | AI/ML in healthcare or enterprise, automation, data platforms |
| `strategy` | Leadership | Executive strategy, change management, governance, decisions |

The first tag in your list is the **primary tag** — it's the one shown on
the Pulse hero/mini cards (which only have room for one badge). Order your
tags with the most relevant one first.

You will use these tag values in the post HTML (`.pulse-tags` spans, using
class `pulse-tag--{value}`) and in the `posts.json` entry (`tags` array).

---

## Step 3 — Write the article

Write a full article (~700–1000 words) based on the topic and context provided.

**Voice:** Always use "we / our / us" — never "I / my". The article represents Roxen Dynamics.

**Structure (use this order):**
1. Opening paragraph (`post-lead`) — the hook. State the core problem or insight immediately. No preamble.
2. 3–4 `<h2>` sections with body paragraphs
3. At least one `<blockquote class="post-quote">` — either an attributed quote from an anonymised healthcare leader, or a sharp unattributed statement
4. At least one `<ul class="post-list">` — 4–6 items, each with `<strong>Bold label</strong> — explanation` format
5. A closing section that ends with a clear, confident statement — not a question

**Tone:** Direct. Practitioner-level. No filler phrases. Write as someone who has done the work.

**Read time:** Estimate 200 words per minute. Aim for 5–7 min (1000–1400 words total).

---

## Step 4 — Create the post HTML file

Copy `docs/posts/post-template.html` as your starting point. Save the new
file as `docs/posts/{your-slug}.html` (from Step 1). Replace every
`{{PLACEHOLDER}}` with real content. No `{{...}}` tokens should remain in
the finished file.

All paths inside post files are already relative to `docs/posts/` (CSS, JS, and nav links all use `../`). Do not change these path prefixes.

### Head placeholders

| Placeholder | What to write |
|---|---|
| `{{ARTICLE_TITLE}}` | The article headline |
| `{{META_DESCRIPTION}}` | 1–2 sentences, ~150 chars, for search engines |
| `{{OG_DESCRIPTION}}` | 1 punchy sentence for social sharing |

### Post hero placeholders

| Placeholder | What to write |
|---|---|
| `{{TAG_CLASS_1}}` | e.g. `health`, `arch`, `ai`, or `strategy` |
| `{{TAG_LABEL_1}}` | e.g. `Digital Health` |
| `{{ARTICLE_TITLE}}` | Same headline |
| `{{ARTICLE_DECK}}` | 1–2 sentences expanding the headline |
| `{{PUBLISH_DATE}}` | Today's date, e.g. `June 10, 2026` |
| `{{READ_TIME}}` | Estimated minutes, e.g. `6` |

**Single tag** — leave only one `<span>` inside `.pulse-tags`:
```html
<div class="pulse-tags">
  <span class="pulse-tag pulse-tag--health">Digital Health</span>
</div>
```

**Multiple tags** — add one `<span>` per tag:
```html
<div class="pulse-tags">
  <span class="pulse-tag pulse-tag--health">Digital Health</span>
  <span class="pulse-tag pulse-tag--arch">Architecture</span>
</div>
```

### Article body

Replace all `{{SECTION_*}}`, `{{OPENING_PARAGRAPH}}`, `{{PULL_QUOTE}}`, `{{LIST_ITEM_*}}`, and `{{CLOSING_*}}` placeholders with the article written in Step 4. Add or remove `<h2>` sections as needed — the template structure is a guide, not a constraint.

### Post CTA placeholders

Customise to feel directly relevant to this article's topic — not generic.

| Placeholder | What to write |
|---|---|
| `{{CTA_EYEBROW}}` | Context-specific hook, e.g. `Navigating an EHR selection?` |
| `{{CTA_TITLE}}` | Action-oriented headline |
| `{{CTA_BODY}}` | 1–2 sentences on how Roxen Dynamics helps with this specific problem |

### Related articles placeholders

Pick 3 existing posts that are most topically relevant. Do not link the article to itself.

**Check `docs/posts/posts.json` for the full, current list of posts** — it
is the source of truth and may contain posts beyond this table.

| File | Title | Tag | Read time |
|---|---|---|---|
| `ehr-implementation-fails.html` | Why Your EHR Implementation Will Fail Before It Starts | `health` | 6 |
| `current-state-assessment-cost.html` | The Hidden Cost of Skipping Current State Assessments | `arch` | 5 |
| `ai-healthcare-leaders-get-wrong.html` | AI in Healthcare: What Leaders Actually Get Wrong | `ai` | 7 |
| `future-state-roadmap-executive-buyin.html` | Building a Future State Roadmap Executives Actually Approve | `strategy` | 4 |
| `canada-health-data-backbone-vital.html` | Canada's $100-Million Bet on a National Health Data Backbone | `health`, `arch` | 5 |
| `smartwatch-health-coach-ai.html` | Your Smartwatch Just Became a Health Coach — Is Your Health System Ready? | `ai`, `health` | 5 |

For each related slot, fill `{{RELATED_N_FILE}}`, `{{RELATED_N_TAG_CLASS}}`, `{{RELATED_N_TAG_LABEL}}`, `{{RELATED_N_TITLE}}`, `{{RELATED_N_READ_TIME}}`.

**Do not change** the author bio block. Leave it exactly as it appears in the template.

---

## Step 5 — Add an entry to `docs/posts/posts.json`

The Pulse page (`pulse.html`) is rendered dynamically from
`docs/posts/posts.json` — newest first. To publish your new post, add a new
object to the **top** of the JSON array (it's an array, keep it valid JSON):

```json
{
  "file": "{your-slug}.html",
  "title": "{Article Title}",
  "excerpt": "{2-3 sentence excerpt, same as the post deck}",
  "tags": ["{primary-tag}", "{secondary-tag-if-any}"],
  "date": "{YYYY-MM-DD, today's date}",
  "displayDate": "{Month D, YYYY}",
  "displayDateShort": "{Mon D}",
  "readTime": {N}
}
```

- `tags[0]` is the primary tag — it determines which badge shows on the Pulse
  hero/mini cards.
- `date` drives sort order. The page always shows the 5 most recent posts in
  the hero (1 featured + 4 mini cards) and all posts in the list below —
  nothing else needs to change in `pulse.html` itself.
- Double-check the JSON is valid (matching brackets/commas) before saving.

---

## Removing a post

If asked to retire/remove a post:
1. Delete its file from `docs/posts/`.
2. Remove its entry from `docs/posts/posts.json`.
3. Search other posts' "Related articles" sections (`{{RELATED_N_FILE}}` /
   `href="..."` links in `.post-related`) for links to the removed file, and
   replace each with another relevant post from `posts.json`.

Once its `posts.json` entry is gone, it disappears from Pulse automatically
on next page load — no other Pulse changes are needed.

---

## Step 6 — Commit and push

From the repo root, run:
```
git add docs/posts/{your-slug}.html docs/posts/posts.json
git commit -m "Add new Pulse post: {Article Title}"
git push origin main
```

(If removing a post, also `git add` the deleted file and any edited related-article files.)

**Before you push**, double check:
- No `{{PLACEHOLDER}}` tokens remain in the new post file.
- `docs/posts/posts.json` is valid JSON and the new entry is at the top.
- The `file` value matches the saved filename **exactly**, including case —
  GitHub Pages is case-sensitive even though your Mac's filesystem isn't.
- All links inside the new post use `../` for site-root assets
  (`../style.css`, `../index.html`, `../logo-white.png`, `../pulse.html`)
  and bare filenames for sibling posts (e.g. `current-state-assessment-cost.html`).
- Any images referenced (e.g. `arsalan_profile2.png`) already exist in `docs/` —
  don't introduce a new image filename without adding the file alongside it.

Do not push if any of the above checks fail — fix first.

---

## Final checklist

- [ ] New file exists at `docs/posts/{slug}.html` with a descriptive SEO slug
- [ ] All `{{PLACEHOLDER}}` tokens replaced — none remaining in the file
- [ ] `<head>` metadata complete (title, description, og:title, og:description)
- [ ] Article body uses we/our/us voice throughout
- [ ] Tags use `.pulse-tags` wrapper with one `<span>` per tag
- [ ] Post CTA is contextual to this article's topic
- [ ] Related articles section has 3 posts — none linking to itself
- [ ] New entry added to the top of `docs/posts/posts.json`, valid JSON, `file` matches the saved filename's case exactly
- [ ] Changes committed and pushed to `origin main`
