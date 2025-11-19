# Testing Guide

This project uses **Vitest** as the testing framework with **React Testing Library** for component testing.

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm test -- --coverage
```

## Test Structure

Tests are organized alongside the code they test:

```
src/
├── lib/
│   ├── __tests__/
│   │   ├── rate-limit.test.ts
│   │   ├── prismic-helpers.test.ts
│   │   └── utils.test.ts
│   └── rate-limit.ts
├── components/
│   ├── __tests__/
│   │   ├── contact-form.test.tsx
│   │   └── scroll-reveal.test.tsx
│   └── contact-form.tsx
└── app/
    └── api/
        └── contact/
            ├── __tests__/
            │   └── route.test.ts
            └── route.ts
```

## Test Coverage

### Current Test Suites

1. **Rate Limiting** (`src/lib/__tests__/rate-limit.test.ts`)
   - Tests rate limit enforcement
   - Tests IP extraction from headers
   - Tests time window expiration

2. **Prismic Helpers** (`src/lib/__tests__/prismic-helpers.test.ts`)
   - Tests site settings fetching
   - Tests link URL extraction
   - Tests rich text extraction

3. **Contact Form Component** (`src/components/__tests__/contact-form.test.tsx`)
   - Tests form validation
   - Tests form submission
   - Tests error handling
   - Tests rate limit error display

4. **Contact API Route** (`src/app/api/contact/__tests__/route.test.ts`)
   - Tests successful submissions
   - Tests rate limiting
   - Tests validation errors
   - Tests error handling

5. **Scroll Reveal Component** (`src/components/__tests__/scroll-reveal.test.tsx`)
   - Tests component rendering
   - Tests GSAP integration (mocked)

6. **Utils** (`src/lib/__tests__/utils.test.ts`)
   - Tests className utility function

## Writing New Tests

### Component Test Example

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MyComponent } from '../my-component'

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})
```

### API Route Test Example

```typescript
import { describe, it, expect, vi } from 'vitest'
import { POST } from '../route'
import { NextRequest } from 'next/server'

describe('API Route', () => {
  it('should handle requests', async () => {
    const request = new NextRequest('http://localhost:3000/api/endpoint', {
      method: 'POST',
      body: JSON.stringify({ data: 'test' }),
    })

    const response = await POST(request)
    expect(response.status).toBe(200)
  })
})
```

### Utility Function Test Example

```typescript
import { describe, it, expect } from 'vitest'
import { myFunction } from '../my-function'

describe('myFunction', () => {
  it('should work correctly', () => {
    const result = myFunction('input')
    expect(result).toBe('expected output')
  })
})
```

## Best Practices

1. **Test Behavior, Not Implementation**: Focus on what the component/function does, not how it does it.

2. **Use Descriptive Test Names**: Test names should clearly describe what is being tested.

3. **Keep Tests Isolated**: Each test should be independent and not rely on other tests.

4. **Mock External Dependencies**: Use `vi.mock()` to mock external services, APIs, and libraries.

5. **Test Edge Cases**: Don't just test the happy path - test error cases, boundary conditions, and edge cases.

6. **Clean Up**: Use `beforeEach` and `afterEach` to set up and tear down test state.

## Mocking

### Mocking Modules

```typescript
vi.mock('../module', () => ({
  functionName: vi.fn(),
}))
```

### Mocking Fetch

```typescript
global.fetch = vi.fn().mockResolvedValue({
  ok: true,
  json: async () => ({ data: 'test' }),
})
```

### Mocking Environment Variables

```typescript
process.env.MY_VAR = 'test-value'
```

## Continuous Integration

Tests should be run in CI/CD pipelines. Add this to your CI configuration:

```yaml
- name: Run tests
  run: npm test
```

## Coverage Goals

- Aim for at least 80% code coverage
- Focus on critical paths and user-facing features
- Don't sacrifice code quality for coverage numbers

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

