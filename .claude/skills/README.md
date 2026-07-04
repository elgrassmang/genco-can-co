# Project Skills

Skills vendored into this repo so they load automatically in any Claude Code
session (web or local) that opens `key-west-on-demand`. Claude discovers any
`SKILL.md` under `.claude/skills/` and activates it when relevant.

## Bundled skills

### `frontend-design/`
Guidance for distinctive, intentional visual design when building or reshaping
UI — aesthetic direction, typography, and choices that avoid templated defaults.
- Source: https://github.com/anthropics/skills/tree/main/skills/frontend-design
- License: see `frontend-design/LICENSE.txt`

### `ui-ux-pro-max/`
UI/UX design intelligence: 84 styles, 161 color palettes, font pairings, chart
types, and UX guidelines across many stacks. Backed by searchable CSV data and
Python query scripts (`scripts/search.py`).
- Source: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
- License: MIT (see `ui-ux-pro-max/LICENSE`)
- This is the headline skill from the upstream plugin. The plugin also ships
  `ui-styling`, `design`, `brand`, `design-system`, `slides`, and
  `banner-design`, which were not vendored here to keep the repo lean.

## Updating

These are point-in-time copies. To refresh, re-clone the upstream repos and copy
the skill folders back over the ones here.

## Using them everywhere (not just this repo)

Vendoring here only covers sessions on this repo. To make them active in *every*
project on a local machine, install them into your personal Claude:

- **ui-ux-pro-max** (as a plugin, auto-updates):
  `/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill`
  then `/plugin install ui-ux-pro-max`
- **frontend-design** (as a personal skill):
  copy `frontend-design/` into `~/.claude/skills/frontend-design/`
