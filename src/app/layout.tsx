import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import './globals.css'

const noto = Noto_Sans_KR({ subsets: ['latin'], weight: ['500', '800'] })

export const metadata: Metadata = {
  title: 'My First ToDo App',
  description: 'Learn Next.js',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='kr'>
      <body className={noto.className}>{children}</body>
    </html>
  )
}
