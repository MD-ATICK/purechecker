"use client"

import { logout } from "@/actions/logout"
import { getSubCredit, getUserById } from "@/actions/users"
import Loading from "@/app/loading"
import rocket from '@/assets/flash.png'
import { useCreditStore } from "@/store/useCreditStore"
import { useUserStore } from "@/store/useUser"
import Image from "next/image"
import { useEffect, useState } from "react"

interface props {
    userId: string,
    dashboard?: boolean
}
export default function CreditBox({ userId, dashboard }: props) {

    const { credit, setCredit } = useCreditStore()
    const { setUser } = useUserStore()
    const [isPending, setIsPending] = useState(false);


    useEffect(() => {
        const getCredit = async () => {
            setIsPending(true)
            const getUser = await getUserById(userId)
            if (!getUser) {
                await logout()
                setIsPending(false)
                return;
            }
            const credit = await getSubCredit(userId)
            if (getUser) {
                setUser(getUser)
            }
            setCredit(credit || 0)
            setIsPending(false)
        }
        getCredit()
    }, [userId, setCredit, setUser]);

    return (
        <>
            {
                !dashboard && (
                    <div>
                        <div className='text-sm text-muted-foreground flex items-center gap-2'>
                            <Image alt="" src={rocket} height={17} className="invert" />
                            {isPending ? (
                                <span> <Loading /></span>
                            ) : (
                                <span className='sm:text-lg font-bold text-primary'>
                                    {credit !== undefined ? credit : 'Loading...'}
                                </span>
                            )}
                        </div>
                    </div>
                )
            }
            {
                dashboard &&
                <div className='flex items-center py-2 justify-between w-full'>
                    <div className=' text-xs'>Credits :  </div>
                    <div className='text-xs text-sky-500 font-semibold'>
                        {credit !== undefined ? credit : 'Loading...'}
                    </div>
                </div>
            }
        </>
    )
}
