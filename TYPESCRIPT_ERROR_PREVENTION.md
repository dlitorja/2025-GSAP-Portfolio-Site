# TypeScript Error Prevention Guide

This guide helps you proactively find and fix TypeScript errors before they cause build failures.

## Quick Commands

### Check for All TypeScript Errors
```bash
npm run type-check
```

This runs `tsc --noEmit` which checks all TypeScript files without building.

### Build and Check
```bash
npm run build
```

The build process also runs TypeScript checking, so this will catch errors too.

## Common TypeScript Issues in This Codebase

### 1. Prismic KeyTextField Can Be Null

**Problem:** `KeyTextField` can be `null`, but many places expect `string | undefined`.

**Fix Pattern:**
```typescript
// ❌ Bad
alt={image.alt || title}

// ✅ Good
alt={image.alt || title || 'Fallback text'}
```

**Files to Check:**
- All `alt` attributes using `KeyTextField`
- All places where `KeyTextField` is used in string contexts

### 2. Prismic RichTextField Node Access

**Problem:** Rich text nodes don't always have a `text` property (can be images, embeds, etc.).

**Fix Pattern:**
```typescript
// ❌ Bad
{richText[0]?.text || ''}

// ✅ Good
{richText[0] && 'text' in richText[0]
  ? richText[0].text
  : ''}
```

**Files to Check:**
- `src/app/blog/page.tsx` - excerpt access
- `src/app/projects/page.tsx` - description access
- `src/app/gallery/page.tsx` - description access

### 3. Missing Document ID Property

**Problem:** Prismic documents have an `id` property, but our custom types might not include it.

**Fix:** Ensure all document types include:
```typescript
export interface DocumentType {
  id: string
  uid: string
  data: { ... }
}
```

**Files to Check:**
- `src/types/prismic.ts` - All document interfaces

### 4. Prismic Content Type Assertions

**Problem:** TypeScript doesn't know about custom Prismic content types.

**Fix Pattern:**
```typescript
// ✅ Use 'as any' for content type strings
await client.getByUID('blog_post' as any, uid)
await client.getAllByType('project' as any)
```

**Files to Check:**
- All files using `getByUID` or `getAllByType` with custom types

## Automated Checks

### Pre-commit Hook (Optional)

You can add a pre-commit hook to automatically check types:

```bash
# Install husky (if not already installed)
npm install --save-dev husky

# Add pre-commit hook
npx husky add .husky/pre-commit "npm run type-check"
```

### CI/CD Integration

The GitHub Actions workflow already includes type checking:
- `.github/workflows/ci.yml` runs `npx tsc --noEmit`

## Proactive Error Detection

### Run Before Committing

1. **Type Check:**
   ```bash
   npm run type-check
   ```

2. **Build Check:**
   ```bash
   npm run build
   ```

3. **Lint Check:**
   ```bash
   npm run lint
   ```

### Common Error Patterns to Search For

```bash
# Find direct KeyTextField usage without fallback
grep -r "\.title\s*\|\|" src/
grep -r "\.alt\s*\|\|" src/

# Find RichTextField direct access
grep -r "\[0\]\?\.text" src/

# Find missing type assertions
grep -r "getByUID('[^']*'," src/
grep -r "getAllByType('[^']*'," src/
```

## Files Already Fixed

✅ `src/app/blog/page.tsx` - excerpt access, alt attributes
✅ `src/app/blog/[uid]/page.tsx` - excerpt access, alt attributes
✅ `src/app/projects/page.tsx` - description access, alt attributes
✅ `src/app/gallery/page.tsx` - description access
✅ `src/types/prismic.ts` - Added `id` to all document types
✅ `src/lib/__tests__/prismic-helpers.test.ts` - Fixed type assertions

## Best Practices

1. **Always provide fallbacks** for `KeyTextField` when used as strings
2. **Use type guards** when accessing RichTextField nodes
3. **Include `id` property** in all document type interfaces
4. **Use `as any`** for Prismic content type strings (not the data)
5. **Run type-check before pushing** to catch errors early

## Troubleshooting

### "Property 'X' does not exist on type 'Y'"
- Check if the property is optional (`?`)
- Verify the type definition matches the actual data structure
- Use type guards or type assertions if needed

### "Type 'null' is not assignable to type 'string'"
- Add a fallback value: `value || 'fallback'`
- Use nullish coalescing: `value ?? 'fallback'`

### "Argument of type 'X' is not assignable to parameter of type 'Y'"
- Check if you need a type assertion
- Verify the function signature matches your usage

