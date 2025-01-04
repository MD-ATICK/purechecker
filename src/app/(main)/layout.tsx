

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'


export default async function Layout({ children }: { children: React.ReactNode }) {




  return (
    <div className=' relative'>
      {/* <SessionProvider session={session}> */}
      <Navbar />
      {children}
      <Footer />
      {/* </SessionProvider> */}
    </div>
  )
}
