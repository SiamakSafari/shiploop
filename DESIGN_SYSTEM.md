# ShipLoop Design System

A comprehensive design system for the ShipLoop indie hacker operating system. This document outlines typography, spacing, animations, colors, and component standards.

---

## Table of Contents

1. [Typography](#typography)
2. [Spacing](#spacing)
3. [Animations](#animations)
4. [Colors](#colors)
5. [Icons](#icons)
6. [Border Radius](#border-radius)
7. [Focus States](#focus-states)
8. [Usage Guidelines](#usage-guidelines)

---

## Typography

### Typography Scale

Our typography system provides semantic variants for consistent text hierarchy across the application.

#### Display & Headings

- **Display**: `text-5xl font-bold leading-tight tracking-tight`
  - Use for: Hero sections, primary landing page headings

- **H1**: `text-3xl font-bold leading-tight tracking-tight`
  - Use for: Page titles, main section headers

- **H2**: `text-2xl font-semibold leading-snug tracking-tight`
  - Use for: Section headers, card titles

- **H3**: `text-lg font-semibold leading-snug`
  - Use for: Subsection headers, prominent labels

- **H4**: `text-base font-semibold leading-normal`
  - Use for: Small section headers, group labels

#### Body Text

- **Body**: `text-base font-normal leading-relaxed`
  - Use for: Main content, descriptions, paragraphs

- **Body Small**: `text-sm font-normal leading-relaxed`
  - Use for: Secondary content, supporting text

#### Small Text

- **Caption**: `text-sm font-medium leading-normal`
  - Use for: Labels, secondary headings, button text

- **Micro**: `text-xs font-normal leading-tight`
  - Use for: Timestamps, metadata, tiny labels

- **Overline**: `text-xs font-medium leading-tight tracking-wide uppercase`
  - Use for: Category labels, section tags

#### Numbers (Space Grotesk Font)

- **Number Large**: `text-5xl font-bold font-space-grotesk leading-none tracking-tight`
  - Use for: Primary metrics, ship score

- **Number Medium**: `text-3xl font-bold font-space-grotesk leading-none`
  - Use for: Stat cards, key numbers

- **Number Small**: `text-xl font-bold font-space-grotesk leading-none`
  - Use for: Secondary metrics, inline numbers

### Typography Components

Import from `@/components/ui/typography`:

```tsx
import { Heading, Text, Caption, Micro, Overline, NumberDisplay } from '@/components/ui/typography'

// Examples
<Heading level={1}>Page Title</Heading>
<Heading level={3} className="text-primary">Ship Score</Heading>
<Text variant="body">This is body text</Text>
<Caption className="text-slate-600">Label text</Caption>
<NumberDisplay variant="large" className="text-primary">100</NumberDisplay>
<Micro className="text-slate-500">Timestamp</Micro>
<Overline>Category</Overline>
```

---

## Spacing

### Component Spacing

#### Padding

- **XS**: `p-3` (12px) - Small badges, compact buttons
- **SM**: `p-4` (16px) - Buttons, small cards
- **MD**: `p-5` (20px) - Medium cards (stat cards, quick actions)
- **LG**: `p-6` (24px) - Large cards (ship score, activity feed)

#### Gap

- **XS**: `gap-2` (8px) - Tight inline elements
- **SM**: `gap-3` (12px) - Related items
- **MD**: `gap-4` (16px) - Card content sections
- **LG**: `gap-6` (24px) - Grid items, major sections

### Layout Spacing

- **Section**: `space-y-6` (24px) - Between major sections
- **Page**: `space-y-4` (16px) - Page-level spacing
- **Card**: `space-y-3` (12px) - Inside cards

### Grid Spacing

- **Tight**: `gap-4` (16px) - Dense layouts
- **Normal**: `gap-6` (24px) - Standard grids (recommended)
- **Loose**: `gap-8` (32px) - Spacious layouts

### Card Padding Standards

- Small cards (badges, buttons): `p-4`
- Medium cards (stats, quick actions): `p-5`
- Large cards (ship score, activity feed): `p-6`

---

## Animations

### Duration

Use CSS variables for consistent timing:

- **Fast**: `var(--duration-fast)` = 150ms - Hover effects, micro-interactions
- **Normal**: `var(--duration-normal)` = 250ms - Standard transitions
- **Slow**: `var(--duration-slow)` = 400ms - Page transitions, complex animations

Or use Tailwind classes:

- `duration-150` - Fast
- `duration-250` - Normal
- `duration-400` - Slow

### Easing

- **Default**: `var(--ease-out)` = `cubic-bezier(0, 0, 0.2, 1)`
- **In-Out**: `var(--ease-in-out)` = `cubic-bezier(0.4, 0, 0.2, 1)`
- **Bounce**: `var(--ease-bounce)` = `cubic-bezier(0.68, -0.55, 0.265, 1.55)`

### Transition Presets

Available from design system:

```tsx
import { animations } from '@/lib/design-system'

// Use in className
className={animations.hover}  // transition-all duration-150 ease-out
className={animations.fade}   // transition-opacity duration-250 ease-out
className={animations.slide}  // transition-transform duration-250 ease-out
className={animations.scale}  // transition-transform duration-150 ease-out
```

### Hover Effects

```css
.hover-lift {
  transition: transform var(--duration-fast) var(--ease-out);
  will-change: transform;
}

.hover-lift:hover {
  transform: translateY(-2px);
}
```

**Performance Note**: Prefer `transform` and `opacity` for animations (GPU-accelerated). Avoid animating `box-shadow` directly.

### Named Animations

From `@/lib/design-system`:

- `firePulse` - Pulsing fire animation
- `pulseGlow` - Glowing pulse effect
- `shimmer` - Shimmer effect
- `bounceIn` - Bounce-in entrance
- `slideUp` - Slide up entrance
- `fadeIn` - Fade in entrance
- `bounceGentle` - Gentle bounce
- `wiggle` - Wiggle animation
- `shimmerPurple` - Purple shimmer
- `scalePop` - Scale pop effect
- `glowPulsePurple` - Purple glow pulse

---

## Colors

### Primary Palette

```css
--primary: #8b5cf6;          /* Purple accent */
--primary-foreground: #ffffff;
```

Use `text-primary` or `bg-primary` in JSX (not hard-coded hex values).

### Grayscale

```css
--foreground: #000000;       /* True black */
--background: #ffffff;       /* Pure white */
--muted: #f5f5f5;           /* Ultra light gray */
--muted-foreground: #737373; /* Medium gray */
--border: #e5e5e5;          /* Light gray border */
```

### Functional Colors

```css
--destructive: #ef4444;     /* Red for errors */
```

Success: Use Tailwind's `text-success` for green (#22c55e)
Warning: Use Tailwind's `text-warning` for amber (#f59e0b)

### Usage

**Always use CSS variables or Tailwind classes:**

```tsx
// ✅ Good
<div className="text-primary bg-white">
<span className="text-slate-600">

// ❌ Bad - Don't hard-code hex values
<div className="text-[#8b5cf6] bg-[#ffffff]">
```

---

## Icons

### Icon Sizes

Use standardized icon sizes from `@/lib/design-system`:

```tsx
import { iconSizes } from '@/lib/design-system'

// Or use directly in className
<Icon className="h-4 w-4" />  // sm - Inline with text, buttons
<Icon className="h-5 w-5" />  // md - Section headers
<Icon className="h-6 w-6" />  // lg - Card icons, emphasis
<Icon className="h-8 w-8" />  // xl - Large actions
```

### Size Conventions

- **XS** (`h-3 w-3` / 12px) - Tiny indicators
- **SM** (`h-4 w-4` / 16px) - Inline with text, buttons
- **MD** (`h-5 w-5` / 20px) - Section headers
- **LG** (`h-6 w-6` / 24px) - Card icons, emphasis
- **XL** (`h-8 w-8` / 32px) - Large actions

---

## Border Radius

### Standards

- **Small** (badges, buttons): `rounded-lg` (8px)
- **Medium** (cards): `rounded-xl` (12px)
- **Large** (prominent cards): `rounded-2xl` (16px)
- **Circular**: `rounded-full`

### Usage

```tsx
// Buttons, small badges
<button className="rounded-lg">

// Standard cards
<div className="rounded-xl">

// Featured cards (ship score, activity feed)
<div className="rounded-2xl">
```

---

## Focus States

All interactive elements should have visible focus states for accessibility.

### Focus Ring

Add the `focus-ring` class to custom buttons and interactive elements:

```tsx
<button className="focus-ring">
  Click me
</button>
```

The `.focus-ring` utility provides:
- Outline removal
- 3px purple ring on `:focus-visible`
- Smooth transition

### Built-in Components

UI components from `@/components/ui` already include proper focus states. No additional classes needed.

---

## Usage Guidelines

### Do's ✅

1. **Use typography components** for all text
   ```tsx
   <Heading level={2}>Title</Heading>
   <Caption className="text-slate-600">Label</Caption>
   ```

2. **Use CSS variables** for colors
   ```tsx
   className="text-primary bg-white"
   ```

3. **Use standardized spacing**
   ```tsx
   className="p-5 space-y-3 gap-6"
   ```

4. **Use duration variables**
   ```tsx
   className="transition-all duration-250"
   ```

5. **Use semantic icon sizes**
   ```tsx
   <Icon className="h-5 w-5" />
   ```

### Don'ts ❌

1. **Don't hard-code text sizes**
   ```tsx
   // ❌ Bad
   <p className="text-sm font-medium">

   // ✅ Good
   <Caption>
   ```

2. **Don't hard-code hex colors**
   ```tsx
   // ❌ Bad
   className="text-[#8b5cf6]"

   // ✅ Good
   className="text-primary"
   ```

3. **Don't use arbitrary spacing**
   ```tsx
   // ❌ Bad
   className="p-7 space-y-5"

   // ✅ Good
   className="p-6 space-y-6"
   ```

4. **Don't use custom durations**
   ```tsx
   // ❌ Bad
   className="duration-300"

   // ✅ Good
   className="duration-250"
   ```

5. **Don't mix icon sizes inconsistently**
   ```tsx
   // ❌ Bad - random sizes
   <Icon className="h-7 w-7" />

   // ✅ Good - standardized
   <Icon className="h-6 w-6" />
   ```

---

## Component Examples

### Stat Card

```tsx
<div className="glass hover-lift rounded-xl p-5 space-y-2">
  <Caption className="text-slate-600">Total MRR</Caption>
  <NumberDisplay variant="medium" className="text-slate-900">
    $5,420
  </NumberDisplay>
  <Caption as="div" className="flex items-center gap-1.5 text-emerald-600">
    <TrendingUp className="h-4 w-4" />
    <span>+12.5%</span>
  </Caption>
</div>
```

### Section Header

```tsx
<Heading level={3} className="flex items-center gap-2 text-slate-900">
  <Activity className="h-5 w-5 text-primary" />
  Recent Activity
</Heading>
```

### Button with Focus

```tsx
<button className="flex items-center gap-2 rounded-lg px-4 py-2 bg-primary text-white transition-all duration-150 hover:scale-105 focus-ring">
  <Plus className="h-4 w-4" />
  <Caption className="text-white">Add Project</Caption>
</button>
```

---

## Getting Started

### Import Design System

```tsx
import {
  typography,
  spacing,
  animations,
  iconSizes
} from '@/lib/design-system'
```

### Import Typography Components

```tsx
import {
  Heading,
  Text,
  Caption,
  Micro,
  Overline,
  NumberDisplay
} from '@/components/ui/typography'
```

### Use Helper Functions

```tsx
import { getTypography } from '@/lib/design-system'

// Get typography classes as string
const classes = getTypography('h2') // Returns all classes for h2
```

---

## Maintenance

When adding new components:

1. ✅ Use typography components from `@/components/ui/typography`
2. ✅ Use standardized spacing (p-4, p-5, p-6, gap-6)
3. ✅ Use `text-primary` instead of hex colors
4. ✅ Use `duration-150`, `duration-250`, `duration-400`
5. ✅ Use icon sizes: h-4, h-5, h-6
6. ✅ Use border radius: rounded-lg, rounded-xl, rounded-2xl
7. ✅ Add `focus-ring` class to custom buttons

---

## Resources

- Typography Components: `src/components/ui/typography.tsx`
- Design System: `src/lib/design-system.ts`
- Global Styles: `src/app/globals.css`
- Color Tokens: `:root` in `globals.css`

---

**Version**: 1.0
**Last Updated**: January 2026
**Maintained by**: ShipLoop Team
