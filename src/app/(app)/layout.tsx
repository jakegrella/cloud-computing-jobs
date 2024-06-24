import React from 'react'
import './globals.css'
import { Inter as FontSans } from 'next/font/google'
// import { cn } from '@/lib/utils'

const fontSans = FontSans({
  subsets: ['latin'],
  display: 'swap',
})

/* Our app sits here to not cause any conflicts with payload's root layout  */
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}

export default Layout
