## Mandatory workflow rules

### Before every commit
- ALWAYS run `npm run build` and verify 0 errors before committing
- ALWAYS create a feature branch before coding. NEVER commit directly to main
- NEVER use `git checkout --ours` or `--theirs` without manually reviewing conflicts
- Run `/clear` between major tasks or when context drops below 30%

### Git
- Branch naming: fix/, feat/, chore/ + descriptive name
- One scope per session (max 5-6 modified files)
- Always check `git status` before committing to avoid including unwanted files

### Deployment
- After pushing, verify Vercel deployment status before declaring "done"
- Never create empty commits to trigger deploys — fix the actual problem
