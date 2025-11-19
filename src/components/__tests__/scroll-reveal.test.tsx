import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render } from '@testing-library/react'
import { ScrollReveal, ScrollStagger } from '../scroll-reveal'

// Mock GSAP
vi.mock('gsap', () => ({
  gsap: {
    registerPlugin: vi.fn(),
    fromTo: vi.fn(() => ({
      vars: { scrollTrigger: 'mock-trigger-id' },
      kill: vi.fn(),
    })),
    to: vi.fn(() => ({
      vars: { scrollTrigger: 'mock-trigger-id' },
      kill: vi.fn(),
    })),
    set: vi.fn(),
  },
}))

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    getAll: vi.fn(() => []),
    getById: vi.fn(() => null),
    refresh: vi.fn(),
  },
}))

describe('ScrollReveal', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render children', () => {
    const { container } = render(
      <ScrollReveal>
        <div>Test Content</div>
      </ScrollReveal>
    )

    expect(container.textContent).toContain('Test Content')
  })

  it('should apply default direction class', () => {
    const { container } = render(
      <ScrollReveal>
        <div>Test</div>
      </ScrollReveal>
    )

    const element = container.firstChild as HTMLElement
    expect(element).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    const { container } = render(
      <ScrollReveal className="custom-class">
        <div>Test</div>
      </ScrollReveal>
    )

    const element = container.firstChild as HTMLElement
    expect(element.className).toContain('custom-class')
  })

  it('should handle different directions', () => {
    const directions = ['up', 'down', 'left', 'right', 'fade'] as const

    directions.forEach(direction => {
      const { container } = render(
        <ScrollReveal direction={direction}>
          <div>Test</div>
        </ScrollReveal>
      )

      expect(container.firstChild).toBeInTheDocument()
    })
  })
})

describe('ScrollStagger', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render children', () => {
    const { container } = render(
      <ScrollStagger>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </ScrollStagger>
    )

    expect(container.textContent).toContain('Item 1')
    expect(container.textContent).toContain('Item 2')
    expect(container.textContent).toContain('Item 3')
  })

  it('should apply custom className', () => {
    const { container } = render(
      <ScrollStagger className="custom-stagger">
        <div>Item 1</div>
      </ScrollStagger>
    )

    const element = container.firstChild as HTMLElement
    expect(element.className).toContain('custom-stagger')
  })
})

