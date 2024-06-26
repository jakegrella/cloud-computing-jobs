import React from 'react'
import { Inter as FontSans } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import './globals.css'
import logo from '../../../public/ccj-logo.svg'
// import { cn } from '@/lib/utils'

const fontSans = FontSans({
  subsets: ['latin'],
  display: 'swap',
})
/* Our app sits here to not cause any conflicts with payload's root layout  */
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html>
      <body className='h-screen px-4 py-8'>
        <header className='flex flex-nowrap justify-between items-center mb-8'>
          <Link href='/'>
            <div className='flex flex-nowrap gap-2'>
              <Image src={logo} alt='Cloud Computing Jobs logo' />
              <h2>Cloud Computing Jobs</h2>
            </div>
          </Link>
          <Button asChild>
            <Link href="/hire">Post a job for $199</Link>
          </Button>
        </header>
        {children}
      </body>
    </html>
  )
}

export default Layout
