# skills

Personal Claude Code skills, meant to live at `~/.claude/skills/` (one
subdirectory per skill, symlinked in) so every project on this machine shares
the same up-to-date version instead of drifting copies per repo.

## Skills

| Skill | Purpose |
| --- | --- |
| [`git-commit-helper`](git-commit-helper/) | Generate commit messages following a consistent gitmoji + conventional-commit-ish format |

## Usage

```bash
git clone https://github.com/jyje/skills ~/repo/jyje/skills
ln -s ~/repo/jyje/skills/git-commit-helper ~/.claude/skills/git-commit-helper
```

Repeat the `ln -s` for any other skill subdirectory you want active.
