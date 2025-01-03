

import { auth } from '@/auth'
import BannedMessage from '@/components/BannedMessage'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import NotVerifiedMessage from '@/components/NotVerifiedMessage'
import { Skeleton } from '@/components/ui/skeleton'
import { SessionProvider } from 'next-auth/react'
import React, { Suspense } from 'react'


export default async function Layout({ children }: { children: React.ReactNode }) {


  const session = await auth()


  return (
    <div>
      <SessionProvider session={session}>
        <Suspense fallback={<div>
          <Skeleton className=' h-14 w-full sticky top-0 z-50 border-b' />
        </div>}>
          <Navbar />
        </Suspense>
        {children}
        <Footer />
        {
          session && session.user.email && !session.user.emailVerified &&
          <NotVerifiedMessage email={session.user.email} />
        }
        {
          session && session?.user.banned &&
          <BannedMessage />
        }
      </SessionProvider>
    </div>
  )
}
