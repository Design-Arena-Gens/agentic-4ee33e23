import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Horror YouTube SEO Agent | Daily Viral Keywords & Titles',
  description: 'Professional YouTube SEO & Trend Research AI Agent for Horror Stories, Real Horror, Paranormal, and Scary Stories niche. Generate daily high-ranking, viral, and searchable YouTube SEO data.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
