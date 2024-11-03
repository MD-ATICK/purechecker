"use client"

import { getSubCredit } from "@/actions/users"
import Loading from "@/app/loading"
import { formatNumber } from "@/lib/utils"
import { useCreditStore } from "@/store/useCreditStore"
import { useEffect, useState } from "react"

interface props {
    userId: string
}
export default function CreditBox({ userId }: props) {

    const { credit, setCredit } = useCreditStore()
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        const getCredit = async () => {
            setIsPending(true)
            const credit = await getSubCredit(userId)
            setIsPending(false)
            setCredit(credit || 0)
        }
        getCredit()
    }, [userId, setCredit]);

    return (
        <div>
            <p className=' text-sm text-muted-foreground flex items-center gap-1'>Credit :
                {
                    isPending ?
                        <span> <Loading /></span>
                        :
                        <span className=' text-xl font-bold text-primary'>{formatNumber(credit)}</span>
                }
            </p>
        </div>
    )
}
