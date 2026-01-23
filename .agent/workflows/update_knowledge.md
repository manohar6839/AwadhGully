---
description: How to capture project progress, technical learnings, and rule updates.
---

# Update Knowledge Workflow

Use this workflow at the end of a significant task or session to ensure the `.agent` brain and project documentation remain up-to-date.

## 1. Identify New Knowledge
Review the current session or task. Ask:
- **Did we fix a bug?** What was the root cause? (Add to `troubleshooting.md`)
- **Did we find a new constraint?** (e.g., "System runs out of memory without swap") (Add to `project_rules.md`)
- **Did we change the architecture?** (Add to `architecture.md`)
- **Did we create a new standard process?** (Create a new workflow)

## 2. Update Documentation Files
Update the following files based on your findings:

### `.agent/docs/troubleshooting.md`
- Add new error messages and their specific fixes.
- Format: `### Error Message` -> `**Cause**` -> `**Fix**`.

### `.agent/rules/project_rules.md`
- Update tech stack versions.
- Update "Best Practices" if we decided on a new coding standard (e.g., "Always use `Intl` for currency").

### `gemini.md` (Legacy Context)
- Append a new entry under `## 🧠 Recent Technical Learnings & Fixes`.
- Include the date, the issue, and the solution.
- *Note: We are gradually migrating this to `.agent/docs`, but keep it updated for now.*

## 3. Commit Changes
After updating the markdown files, commit them to git so the knowledge is persistent.

```bash
git add .agent gemini.md
git commit -m "docs: update project knowledge and learnings"
```
