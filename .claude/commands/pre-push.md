---
disable-model-invocation: true
---

# Pre-Push Checklist

Run the following checks before pushing:

## 1. Build verification
```bash
npm run build
```
Expected: Build completes with 0 errors

## 2. TypeScript verification
```bash
npx tsc --noEmit
```
Expected: No TypeScript errors

## 3. Check git status
```bash
git status
```
Expected: No untracked or uncommitted files

## 4. Review commits to push
```bash
git log --oneline -3
```
Expected: Verify commit messages are correct

## Summary
- ✅ Build passed
- ✅ TypeScript check passed
- ✅ No forgotten files
- ✅ Commits reviewed

**Only push if ALL steps pass.**
