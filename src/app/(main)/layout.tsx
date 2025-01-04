

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'


export default async function Layout({ children }: { children: React.ReactNode }) {


  // const session = await auth()


  return (
    <div className=' relative'>
      {/* <SessionProvider session={session}> */}
      {/* <Suspense fallback={<Skeleton className=' h-14 w-full sticky top-0 z-50 border-b' />}> */}
        <Navbar />
      {/* </Suspense> */}
      {children}
      <Footer />
      {/* </SessionProvider> */}
    </div>
  )
}
