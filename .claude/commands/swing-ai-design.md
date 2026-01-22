# Swing AI Design System

You are generating UI for the Swing AI design system. Follow these guidelines exactly to create consistent, polished interfaces.

---

## Tech Stack

- **Framework**: Next.js 16+ with App Router
- **Styling**: Tailwind CSS v4 with PostCSS
- **Components**: shadcn/ui (New York style) with Radix UI primitives
- **Variants**: CVA (class-variance-authority) for component variants
- **Fonts**: Geist (sans) + Geist Mono
- **Icons**: Lucide React + custom Golf icons (see Section 8)
- **Animations**: Lottie for complex animations, CSS for UI transitions

---

## Color System

### Dark Mode (Default)

**Backgrounds:**
```css
--bg-primary: #1A1F2E;     /* Main background */
--bg-secondary: #242A3A;   /* Cards, sections */
--bg-tertiary: #2E3546;    /* Elevated surfaces */
--bg-elevated: #383F52;    /* Highest elevation */
```

**Text:**
```css
--text-primary: #FFFFFF;    /* Headings, important text */
--text-secondary: #B8C4D0;  /* Body text */
--text-tertiary: #8B9AAF;   /* Muted text, placeholders */
```

**Accents:**
```css
--accent-purple: #E8945A;   /* Primary accent (warm orange) */
--accent-blue: #7CB4C4;     /* Secondary accent (soft teal) */
--accent-cyan: #4AABA8;     /* Tertiary accent (cyan) */
--accent-green: #6BBF8A;    /* Success states */
--accent-orange: #E8945A;   /* Same as purple - warm tone */
--accent-gold: #D4AF37;     /* Premium, special highlights */
--accent-pink: #F0A878;     /* Soft warm accent */
```

**Status Colors:**
```css
--status-good: #6BBF8A;     /* Success, positive */
--status-warning: #E8945A;  /* Warning, caution */
--status-error: #E86B6B;    /* Error, destructive */
```

### Light Mode

**Backgrounds:**
```css
--bg-primary: #E8EDF2;
--bg-secondary: #DCE4EC;
--bg-tertiary: #D0DAE4;
--bg-elevated: #F2F6FA;
```

**Text:**
```css
--text-primary: #1A1F2E;
--text-secondary: #3A4254;
--text-tertiary: #5A6478;
```

**Accents (slightly muted):**
```css
--accent-purple: #D4783A;
--accent-blue: #5A9AAA;
--accent-cyan: #3A9A98;
--accent-green: #5AAF7A;
--accent-gold: #D4AF37;
```

### Glass Morphism

```css
--glass-bg: rgba(124, 180, 196, 0.04);
--glass-border: rgba(124, 180, 196, 0.12);
--glass-hover: rgba(124, 180, 196, 0.08);
```

Apply with: `backdrop-filter: blur(20px);`

---

## Gradients

**Primary (Orange → Teal):**
```css
--gradient-primary: linear-gradient(135deg, #E8945A 0%, #7CB4C4 50%, #4AABA8 100%);
```

**Secondary (Blue → Cyan):**
```css
--gradient-secondary: linear-gradient(135deg, #7CB4C4 0%, #4AABA8 100%);
```

**Success (Green → Cyan):**
```css
--gradient-success: linear-gradient(135deg, #6BBF8A 0%, #4AABA8 100%);
```

**Tailwind usage:**
```jsx
className="bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-blue)]"
className="bg-gradient-to-br from-[var(--accent-purple)] via-[var(--accent-blue)] to-[var(--accent-cyan)]"
```

---

## Shadows & Glows

**Shadows:**
```css
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
--shadow-md: 0 4px 16px rgba(0, 0, 0, 0.4);
--shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.5);
--shadow-glow: 0 0 60px rgba(232, 148, 90, 0.15);
```

**Accent Glows:**
```css
--glow-purple: 0 0 40px rgba(232, 148, 90, 0.3);
--glow-blue: 0 0 40px rgba(124, 180, 196, 0.3);
--glow-cyan: 0 0 40px rgba(74, 171, 168, 0.3);
```

**Tailwind usage:**
```jsx
className="shadow-lg shadow-[var(--accent-purple)]/25"
className="shadow-xl shadow-[var(--accent-purple)]/30"
```

---

## Border Radius

**Base:** `--radius: 0.625rem` (10px)

**Scale:**
- `radius-sm`: 6px (buttons, small elements)
- `radius-md`: 8px
- `radius-lg`: 10px (base)
- `radius-xl`: 14px (cards)
- `radius-2xl`: 18px (modals)
- `radius-3xl`: 22px
- `radius-4xl`: 26px

**Common patterns:**
```jsx
className="rounded-xl"   // Cards, inputs
className="rounded-2xl"  // Modals, large containers
className="rounded-full" // Badges, avatars
className="rounded-lg"   // Buttons
```

---

## Typography

**Font Family:**
```jsx
fontFamily: {
  sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
  mono: ['var(--font-geist-mono)', 'monospace'],
}
```

**Responsive Sizes:**
```css
.text-responsive { font-size: clamp(14px, 4vw, 16px); }
.text-responsive-lg { font-size: clamp(18px, 5vw, 24px); }
.text-responsive-xl { font-size: clamp(24px, 6vw, 36px); }
```

**Font Weights:** 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

**Hierarchy:**
```jsx
// Hero headline
<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]">

// Section title
<h2 className="text-3xl md:text-4xl font-bold">

// Card title
<h3 className="text-[var(--text-primary)] font-bold text-2xl">

// Body text
<p className="text-[var(--text-secondary)] text-lg">

// Muted/helper text
<p className="text-[var(--text-tertiary)] text-sm">
```

---

## Animation System

### Entry Animations

**Fade In:**
```css
.animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
```

**Fade In Up:**
```css
.animate-fade-in-up { animation: fade-in-up 0.4s ease-out forwards; }
/* translateY(20px) → translateY(0) */
```

**Fade In Scale:**
```css
.animate-fade-in-scale { animation: fade-in-scale 0.3s ease-out forwards; }
/* scale(0.95) → scale(1) */
```

**Slide In Bottom:**
```css
.animate-slide-in-bottom { animation: slide-in-bottom 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
```

### Staggered Delays

```jsx
className="animate-fade-in-up animate-delay-75"   // 75ms
className="animate-fade-in-up animate-delay-100"  // 100ms
className="animate-fade-in-up animate-delay-150"  // 150ms
className="animate-fade-in-up animate-delay-200"  // 200ms
className="animate-fade-in-up animate-delay-300"  // 300ms
className="animate-fade-in-up animate-delay-500"  // 500ms
```

### Interactive Animations

**Hover Glow (Two-color edges):**
```css
.hover-glow:hover {
  box-shadow:
    -20px 0 25px -10px rgba(232, 148, 90, 0.7),
    20px 0 25px -10px rgba(124, 180, 196, 0.7);
}
```

**Button Hover Lift:**
```css
.btn-hover-lift:hover { transform: translateY(-2px); }
.btn-hover-lift:active { transform: translateY(0); }
```

**Card Hover Lift:**
```css
.card-hover-lift:hover { transform: translateY(-4px); }
```

**Smooth Transitions:**
```css
.transition-smooth { transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); }
.transition-bounce { transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
```

### Loading States

**Skeleton Shimmer:**
```jsx
<div className="skeleton h-6 w-32" />
```

**Pulse:**
```jsx
<span className="animate-pulse" />
```

---

## Component Patterns

### Glass Card

```jsx
<div className="glass-card p-6">
  {/* Content */}
</div>

// With hover effects
<div className="glass-card hover-glow p-6 hover:border-[var(--accent-purple)]/30 transition-all">
  {/* Content */}
</div>

// Static (no hover lift)
<div className="glass-card-static p-6">
  {/* Content */}
</div>
```

**CSS class provides:**
- `background: var(--glass-bg)`
- `backdrop-filter: blur(20px)`
- `border: 1px solid var(--glass-border)`
- `border-radius: 16px`
- Hover: `translateY(-2px)`, brighter border

### Primary Button

```jsx
<Button className="bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-blue)] hover:opacity-90 text-white font-semibold rounded-xl shadow-lg shadow-[var(--accent-purple)]/25 transition-all hover:shadow-[var(--accent-purple)]/40 hover:scale-[1.02]">
  Get Started
  <ArrowRight className="w-5 h-5 ml-2" />
</Button>
```

### Secondary/Outline Button

```jsx
<Button
  variant="outline"
  className="border-[var(--glass-border)] bg-[var(--glass-bg)] text-[var(--text-primary)] hover:bg-[var(--glass-hover)] hover:border-[var(--accent-purple)]/50 rounded-xl"
>
  <Camera className="w-4 h-4 mr-2" />
  Record
</Button>
```

### Input

```jsx
<input
  className="flex h-12 w-full rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 py-2 text-base text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-purple)]/50 focus:border-[var(--accent-purple)] transition-all"
  placeholder="Enter text..."
/>
```

### AccentBadge

**Variants:** default, purple, blue, cyan, green, orange, gold, gradient, success, warning, error

```jsx
import AccentBadge, { ProBadge, NewBadge, LiveBadge, AiBadge, StatusBadge } from '@/components/AccentBadge';

// Basic
<AccentBadge variant="purple">Label</AccentBadge>

// With icon
<AccentBadge variant="gold" icon="star" size="xs" glow>PRO</AccentBadge>

// Pre-built
<ProBadge />        // Gold star PRO badge
<NewBadge />        // Cyan pulse NEW badge
<LiveBadge />       // Green pulse LIVE badge
<AiBadge />         // Gradient AI-Powered badge
<StatusBadge status="success">Active</StatusBadge>
```

### Custom Golf Icons

```jsx
import { FlagPin, GolfBall, GolfClub, SwingArc, Diamond, Star, Checkmark, ArrowRight, AccentDot, SectionDivider, BulletItem } from '@/components/GolfIcons';

// Sizes: xs (12px), sm (16px), md (20px), lg (24px)
// Variants: default, gradient, muted, gold, green, success, warning

<FlagPin size="md" variant="gradient" />
<GolfBall size="lg" variant="gold" />
<Diamond size="xs" variant="gold" />
<Star size="sm" variant="gold" />

// Decorative elements
<SectionDivider />
<BulletItem variant="gradient">List item text</BulletItem>
```

---

## Layout Patterns

### Page Structure

```jsx
<div className="min-h-screen bg-[var(--bg-primary)] overflow-hidden">
  {/* Background orbs (fixed, behind content) */}
  <div className="fixed inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#E8945A] rounded-full blur-[150px] opacity-20" />
    <div className="absolute top-1/3 -left-40 w-[400px] h-[400px] bg-[#7CB4C4] rounded-full blur-[130px] opacity-15" />
    <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-[#4AABA8] rounded-full blur-[120px] opacity-15" />
  </div>

  {/* Header */}
  <header className="relative z-20 border-b border-[var(--glass-border)] bg-[var(--bg-primary)]/60 backdrop-blur-xl sticky top-0">
    <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
      {/* Logo + Nav */}
    </div>
  </header>

  {/* Main content */}
  <main className="relative z-10 max-w-4xl mx-auto px-6 py-8 pb-28 md:pb-20">
    {/* Page content */}
  </main>

  {/* Bottom nav (mobile) */}
  <BottomNav />
</div>
```

### Container Widths

```jsx
max-w-md    // 448px - Modals, narrow forms
max-w-lg    // 512px - Small containers
max-w-4xl   // 896px - App content
max-w-6xl   // 1152px - Landing pages
```

### Grid Patterns

**Features (3-column):**
```jsx
<div className="grid md:grid-cols-3 gap-6">
  <FeatureCard />
  <FeatureCard />
  <FeatureCard />
</div>
```

**Stats (2-column):**
```jsx
<div className="grid grid-cols-2 gap-3">
  <StatCard />
  <StatCard />
</div>
```

### Mobile Considerations

```jsx
// Safe areas for notched devices
className="safe-top"    // padding-top: env(safe-area-inset-top)
className="safe-bottom" // padding-bottom: env(safe-area-inset-bottom)

// Touch-friendly targets (minimum 44px)
className="touch-target" // min-height: 44px; min-width: 44px;

// Hide scrollbars
className="scrollbar-hide"

// Prevent overscroll
className="no-overscroll"
```

---

## Common UI Patterns (Code Snippets)

### Feature Card

```jsx
<div className="relative group">
  <div className="glass-card hover-glow p-8 hover:border-[var(--accent-purple)]/30 transition-all">
    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--accent-purple)]/20 to-[var(--accent-blue)]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      <Upload className="w-7 h-7 text-[var(--accent-purple)]" />
    </div>
    <h3 className="text-[var(--text-primary)] font-bold text-2xl mb-2">
      Feature Title
    </h3>
    <p className="text-[var(--text-tertiary)] text-lg">
      Feature description text
    </p>
  </div>
</div>
```

### List Item Card (Clickable Row)

```jsx
<button className="w-full glass-card p-4 flex items-center gap-4 hover:border-[var(--accent-purple)]/30 transition-all group text-left hover-glow">
  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--accent-purple)]/20 to-[var(--accent-blue)]/20 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
    <Icon className="w-6 h-6 text-[var(--accent-purple)]" />
  </div>
  <div className="flex-1 min-w-0">
    <div className="flex items-center gap-2">
      <h3 className="text-[var(--text-primary)] font-semibold">Title</h3>
      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[var(--accent-purple)]/20 text-[var(--accent-purple)]">
        New
      </span>
    </div>
    <p className="text-[var(--text-tertiary)] text-sm">Description text</p>
  </div>
  <ChevronRight className="w-5 h-5 text-[var(--text-tertiary)] group-hover:text-[var(--accent-purple)] transition-colors flex-shrink-0" />
</button>
```

### Empty State

```jsx
<div className="empty-state">
  <div className="empty-state-icon">
    <Inbox className="w-10 h-10" />
  </div>
  <h3 className="empty-state-title">No items yet</h3>
  <p className="empty-state-description">
    Get started by creating your first item
  </p>
</div>
```

### Modal/Full-Screen Dialog

```jsx
<div className="fixed inset-0 z-50 bg-[var(--bg-primary)] flex flex-col animate-fade-in">
  {/* Sticky glass header */}
  <header className="sticky top-0 z-10 border-b border-[var(--glass-border)] bg-[var(--bg-primary)]/80 backdrop-blur-xl safe-top">
    <div className="flex items-center justify-between px-6 py-4">
      <h1 className="text-xl font-bold text-[var(--text-primary)]">Modal Title</h1>
      <button
        onClick={onClose}
        className="p-2 rounded-lg hover:bg-[var(--glass-bg)] text-[var(--text-tertiary)] transition-colors"
      >
        <X className="w-6 h-6" />
      </button>
    </div>
  </header>

  {/* Scrollable content */}
  <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar-hide">
    {/* Content */}
  </div>
</div>
```

### Hero Section

```jsx
<section className="max-w-6xl mx-auto px-6 pt-16 md:pt-24 pb-20">
  <div className="text-center lg:text-left">
    <div className="mb-6 animate-fade-in-up inline-block">
      <AiBadge />
    </div>

    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--text-primary)] mb-6 tracking-tight leading-[1.1] animate-fade-in-up animate-delay-100">
      Your headline
      <span className="block gradient-text pb-1">with gradient.</span>
    </h1>

    <p className="text-[var(--text-secondary)] text-lg md:text-xl max-w-lg mx-auto lg:mx-0 mb-8 animate-fade-in-up animate-delay-200">
      Supporting description text that explains the value proposition.
    </p>

    <div className="animate-fade-in-up animate-delay-300">
      <Button className="group h-14 px-8 text-lg bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-blue)] hover:opacity-90 text-white font-semibold rounded-xl shadow-xl shadow-[var(--accent-purple)]/30">
        Call to Action
        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  </div>
</section>
```

### Stats Grid

```jsx
<div className="grid grid-cols-2 gap-3">
  <div className="glass-card p-4 text-center">
    <div className="flex items-center justify-center gap-2 mb-1">
      <Star className="w-4 h-4 text-[var(--accent-gold)]" />
      <span className="text-2xl font-bold text-[var(--text-primary)]">87</span>
    </div>
    <p className="text-[var(--text-tertiary)] text-xs">Swing Score</p>
  </div>
  <div className="glass-card p-4 text-center">
    <div className="flex items-center justify-center gap-2 mb-1">
      <TrendingUp className="w-4 h-4 text-[var(--accent-green)]" />
      <span className="text-2xl font-bold text-[var(--text-primary)]">+12%</span>
    </div>
    <p className="text-[var(--text-tertiary)] text-xs">Improvement</p>
  </div>
</div>
```

### Progress Bar

```jsx
<div className="progress-bar">
  <div className="progress-bar-fill" style={{ width: '75%' }} />
</div>

// Or with Tailwind:
<div className="h-1.5 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
  <div
    className="h-full bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-cyan)] rounded-full transition-all"
    style={{ width: '75%' }}
  />
</div>
```

### Gradient Text

```jsx
<span className="gradient-text">Gradient text here</span>

// Or explicit:
<span className="bg-gradient-to-r from-[var(--accent-purple)] via-[var(--accent-blue)] to-[var(--accent-cyan)] bg-clip-text text-transparent">
  Gradient text
</span>
```

---

## Accessibility

**Focus States:**
```jsx
className="focus-ring" // Custom purple outline on focus-visible

// Or explicit:
className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-purple)]/50 focus-visible:ring-offset-2"
```

**Reduced Motion:**
The design system automatically respects `prefers-reduced-motion` and disables animations.

**Aria Labels:**
Always include appropriate aria-labels for interactive elements and icons.

---

## Dark/Light Mode Toggle

```jsx
const [theme, setTheme] = useState<'dark' | 'light'>('dark');

const toggleTheme = () => {
  const newTheme = theme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
  localStorage.setItem('theme', newTheme);
  document.documentElement.classList.toggle('light', newTheme === 'light');
};
```

The design uses a `dark` class by default. Add `light` class to `<html>` for light mode.

---

## File Organization

```
src/
├── app/
│   ├── globals.css       # All CSS variables and utility classes
│   ├── page.tsx          # Landing page
│   └── app/
│       └── page.tsx      # Main app dashboard
├── components/
│   ├── ui/               # shadcn/ui components (button, card, input, etc.)
│   ├── AccentBadge.tsx   # Badge component with variants
│   ├── GolfIcons.tsx     # Custom icon components
│   └── ...
└── lib/
    └── utils.ts          # cn() utility for className merging
```

---

## Quick Reference

| Element | Classes |
|---------|---------|
| Page background | `bg-[var(--bg-primary)]` |
| Card | `glass-card p-6` |
| Primary button | `bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-blue)]` |
| Heading | `text-[var(--text-primary)] font-bold` |
| Body text | `text-[var(--text-secondary)]` |
| Muted text | `text-[var(--text-tertiary)]` |
| Input | `h-12 rounded-xl border-[var(--glass-border)] bg-[var(--glass-bg)]` |
| Border | `border border-[var(--glass-border)]` |
| Hover glow | `hover-glow` |
| Animation | `animate-fade-in-up animate-delay-100` |

---

When generating UI, always:
1. Use CSS variables (not hardcoded colors)
2. Apply glass morphism for cards and overlays
3. Use gradient backgrounds and buttons for primary actions
4. Include hover effects and transitions
5. Support both dark and light modes
6. Follow the responsive patterns (mobile-first)
7. Use the animation system for entry effects
