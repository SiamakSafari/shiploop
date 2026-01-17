import { createElement, HTMLAttributes } from 'react'
import { typography } from '@/lib/design-system'
import { cn } from '@/lib/utils'

// Heading Component (h1-h6)
interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  variant?: 'display' | 'h1' | 'h2' | 'h3' | 'h4'
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export function Heading({
  level,
  variant,
  as,
  className,
  children,
  ...props
}: HeadingProps) {
  const tag = as || `h${level || 2}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  const typographyVariant = variant || (level ? `h${level}` as keyof typeof typography : 'h2')

  const style = typography[typographyVariant as keyof typeof typography]
  const classes = cn(
    Object.values(style).join(' '),
    className
  )

  return createElement(
    tag,
    { className: classes, ...props },
    children
  )
}

// Text Component (body text)
interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  variant?: 'body' | 'bodySmall'
  as?: 'p' | 'span' | 'div'
}

export function Text({
  variant = 'body',
  as = 'p',
  className,
  children,
  ...props
}: TextProps) {
  const style = typography[variant]
  const classes = cn(
    Object.values(style).join(' '),
    className
  )

  return createElement(
    as,
    { className: classes, ...props },
    children
  )
}

// Caption Component (small text)
interface CaptionProps extends HTMLAttributes<HTMLElement> {
  as?: 'p' | 'span' | 'div'
}

export function Caption({
  as = 'p',
  className,
  children,
  ...props
}: CaptionProps) {
  const style = typography.caption
  const classes = cn(
    Object.values(style).join(' '),
    className
  )

  return createElement(
    as,
    { className: classes, ...props },
    children
  )
}

// Overline Component (labels/tags)
interface OverlineProps extends HTMLAttributes<HTMLElement> {
  as?: 'span' | 'div' | 'label'
}

export function Overline({
  as = 'span',
  className,
  children,
  ...props
}: OverlineProps) {
  const style = typography.overline
  const classes = cn(
    Object.values(style).join(' '),
    className
  )

  return createElement(
    as,
    { className: classes, ...props },
    children
  )
}

// Micro Component (very small text)
interface MicroProps extends HTMLAttributes<HTMLElement> {
  as?: 'span' | 'div' | 'p'
}

export function Micro({
  as = 'span',
  className,
  children,
  ...props
}: MicroProps) {
  const style = typography.micro
  const classes = cn(
    Object.values(style).join(' '),
    className
  )

  return createElement(
    as,
    { className: classes, ...props },
    children
  )
}

// NumberDisplay Component (large/medium/small numbers with Space Grotesk)
interface NumberDisplayProps extends HTMLAttributes<HTMLElement> {
  variant?: 'large' | 'medium' | 'small'
  as?: 'span' | 'div' | 'p'
}

export function NumberDisplay({
  variant = 'medium',
  as = 'span',
  className,
  children,
  ...props
}: NumberDisplayProps) {
  const variantMap = {
    large: typography.numberLarge,
    medium: typography.numberMedium,
    small: typography.numberSmall,
  }

  const style = variantMap[variant]
  const classes = cn(
    Object.values(style).join(' '),
    className
  )

  return createElement(
    as,
    { className: classes, ...props },
    children
  )
}
