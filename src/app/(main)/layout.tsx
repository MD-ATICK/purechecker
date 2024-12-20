

import { auth } from '@/auth'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import NotVerifiedMessage from '@/components/NotVerifiedMessage'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

export default async function Layout({ children }: { children: React.ReactNode }) {


  const session = await auth()
  console.log(session?.user)

  return (
    <div>
      <SessionProvider session={session}>
        <Navbar />
        {children}
        <Footer />
        {
          session && session.user.email && !session.user.emailVerified &&
          <NotVerifiedMessage email={session.user.email} />
        }
      </SessionProvider>
    </div>
  )
}
