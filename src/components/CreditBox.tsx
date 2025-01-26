"use client"

import { getSubCredit } from "@/actions/users"
import rocket from '@/assets/flash.png'
import Loading from "@/components/Loading"
import { useCreditStore } from "@/store/useCreditStore"
import Image from "next/image"
import { useEffect, useTransition } from "react"

interface props {
    userId: string,
    dashboard?: boolean
}
export default function CreditBox({ userId, dashboard }: props) {

    const { credit, setCredit } = useCreditStore()
    const [isPending, startTransition] = useTransition()


    useEffect(() => {
        const getCredit = async () => {
            startTransition(async () => {
                const credit = await getSubCredit(userId)
                setCredit(credit || 0)
            })
        }
        getCredit()
    }, [userId, setCredit]);

    return (
        <>
            {
                !dashboard && (
                    <div>
                        <div className='text-sm text-muted-foreground flex items-center gap-2'>
                            <Image alt="" src={rocket} height={17} className=" " />
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
