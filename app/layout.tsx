import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Geist } from "next/font/google";

const GeistSans = Geist({ subsets: ['latin'], weight: ['100', '400', '700'] })
const GeistMono = Geist({ subsets: ['latin'], weight: ['400', '700'], style: ['normal'] })

export const metadata: Metadata = {
  title: 'Oemonline',
  description: 'Created with v0',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.className} ${GeistMono.className}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
