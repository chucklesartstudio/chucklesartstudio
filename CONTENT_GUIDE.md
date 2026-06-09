# Content Guide — Chuckles Studio

Adding new content to the site takes one step: **create a single `.mdx` file in the right folder.**
No code changes needed. The site picks it up automatically.

---

## Where files live

```
artifacts/chuckles/
└── content/
    ├── projects/     →  /work/[slug]
    ├── practice/     →  /practice/[slug]
    └── thinking/     →  /thinking/[slug]
```

The filename becomes the URL slug.
`content/thinking/on-visual-grammar.mdx` → `/thinking/on-visual-grammar`

---

## Adding a new project

Create `content/projects/your-project-name.mdx`:

```mdx
---
title: "Project Title"
slug: "your-project-name"
year: "2026"
scope: "Brand Identity, Print"
tagline: "One sentence that captures the spirit of the work."
deliverables:
  - Logo system
  - Brand guidelines
  - Stationery
---

## The Challenge

What problem were you solving? What did the client need?

## Approach

How did you think about it? What made your direction distinctive?

## The Outcome

What did it become? Any notable results, quotes, or reception?

> "A quote from the client or brand guidelines, if there is one."
> — Source
```

Live at: `/work/your-project-name`

---

## Adding a new essay

Create `content/thinking/your-essay-title.mdx`:

```mdx
---
title: "Essay Title"
slug: "your-essay-title"
date: "2026-06-01"
tag: "Identity · Craft"
preview: "One or two sentences shown in the listing and under the headline. Make it earn its place."
---

Opening paragraph. No heading needed here — just begin.

The preview field above appears both on the Thinking index page and as the
sub-headline on the essay itself, so write it as a standalone thought.

---

Second section begins after a horizontal rule, or use a heading:

## A heading if you need one

Body continues here.
```

Live at: `/thinking/your-essay-title`

---

## Adding a practice entry

Create `content/practice/entry-name.mdx`:

```mdx
---
title: "Entry Title"
slug: "entry-name"
date: "2026-05-20"
medium: "Oil on linen"
dimensions: "30 × 40 cm"
tagline: "One line. What you were looking for, or what you found."
---

Write freely. This is the private side of the practice — no brief, no client.

Describe the session, the observation, the material decision, the failure.
Anything that feels worth noting down.
```

Live at: `/practice/entry-name`

---

## Frontmatter field reference

### Projects (`content/projects/`)

| Field | Required | Notes |
|---|---|---|
| `title` | Yes | Shown in the header |
| `slug` | Yes | Must match the filename |
| `year` | No | Shown in the meta row |
| `scope` | No | e.g. `"Brand Identity, Print"` |
| `tagline` | No | Italic sub-headline in the header |
| `deliverables` | No | List — shown in the meta row |

### Essays (`content/thinking/`)

| Field | Required | Notes |
|---|---|---|
| `title` | Yes | Shown in the header |
| `slug` | Yes | Must match the filename |
| `date` | No | ISO format: `YYYY-MM-DD` |
| `tag` | No | Category label, e.g. `"Identity · Craft"` |
| `preview` | No | Shown on the listing page and as the sub-headline |

### Practice entries (`content/practice/`)

| Field | Required | Notes |
|---|---|---|
| `title` | Yes | Shown in the header |
| `slug` | Yes | Must match the filename |
| `date` | No | ISO format: `YYYY-MM-DD` |
| `medium` | No | e.g. `"Oil on linen"` |
| `dimensions` | No | e.g. `"40 × 50 cm"` |
| `tagline` | No | Italic sub-headline in the header |

---

## Slug conventions

- Lowercase, hyphen-separated: `on-visual-grammar`, `mooi-identity`, `painting-04`
- No spaces, no underscores, no special characters
- The slug in the frontmatter must exactly match the filename (without `.mdx`)

---

## The Lavou case study

`/work/lavou` uses a custom hand-built layout (`src/pages/LavouCaseStudy.tsx`).
It is not driven by MDX. Do not create `content/projects/lavou.mdx` expecting
it to replace the custom page — the hardcoded route always takes priority.

The `content/projects/lavou.mdx` file that exists is a reference template only.

---

## MDX basics

MDX is Markdown with the option to use React components. For most content,
standard Markdown is all you need:

```md
# Heading 1
## Heading 2

Regular paragraph text.

**Bold**, _italic_, `inline code`

> Blockquote

---

- List item one
- List item two
```

All standard Markdown elements are automatically styled to match the site.
