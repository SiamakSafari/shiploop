import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ShipLoop - The Indie Hacker Operating System',
    short_name: 'ShipLoop',
    description: 'Stop building in the dark. Ship with confidence. Track your Ship Score, maintain streaks, and compete with indie hackers worldwide.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0f',
    theme_color: '#E8945A',
    orientation: 'portrait-primary',
    categories: ['productivity', 'business', 'developer tools'],
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
