<div align="center">

# jyje/skills

<img width="150" src="https://raw.githubusercontent.com/jyje/profile/main/assets/img/logo.png" alt="jyje" title="jyje"/>

🧠 Personal Claude Code skills, shared across every project on this machine

[![GitHub Repo stars](https://img.shields.io/github/stars/jyje/skills?style=social)](https://github.com/jyje/skills)

</div>

Meant to live at `~/.claude/skills/` (one subdirectory per skill, symlinked
in) so every project on this machine shares the same up-to-date version
instead of drifting copies per repo.

## Skills

| Skill | Purpose |
| --- | --- |
| [`git-commit-helper`](git-commit-helper/) | Generate commit messages following a consistent gitmoji + conventional-commit-ish format |
| [`centered-readme`](centered-readme/) | Format a README's header as a centered hero block (title, logo, tagline, badges) |
| [`python-lint`](python-lint/) | Lint/format with ruff, type-check with ty, and run pytest before calling a Python change done |

## Usage

```bash
git clone https://github.com/jyje/skills ~/repo/jyje/skills
ln -s ~/repo/jyje/skills/git-commit-helper ~/.claude/skills/git-commit-helper
```

Repeat the `ln -s` for any other skill subdirectory you want active.
