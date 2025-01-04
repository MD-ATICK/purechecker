import NotFound from '@/app/not-found'
import { auth } from '@/auth'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import UserSideBar from './UserSideBar'

export default async function layout({ children }: { children: React.ReactNode }) {


    const session = await auth()

    return (
        <SessionProvider session={session}>
            {
                session?.user && session.user.role === "USER" ?
                    (<div className='flex items-start'>
                        <UserSideBar user={session?.user} className=' min-w-[50px] lg:min-w-[300px] border-r-2 h-screen sticky top-0 left-0' />
                        <div id='hide-scrollbar' className=' flex-grow max-w-[calc(100%-50px)] overflow-auto '>
                            {children}
                        </div>
                    </div>) : <NotFound />
            }
        </SessionProvider>

    )
}
