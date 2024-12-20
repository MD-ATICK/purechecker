"use client"

import Loading from "@/app/loading";
import { VerificationToken } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { verifyToken } from "../actions";

export default function VerificationTokenPage() {

    const searchParams = useSearchParams()
    const token = searchParams.get('token')



    const [verificationToken, setVerificationToken] = useState<VerificationToken | undefined>(undefined);
    const [isPending, startTransaction] = useTransition()
    const [error, setError] = useState("");

    const onsubmit = useCallback(async () => {

        if (!token) {
            toast.error('token not found')
            return;
        }

        startTransaction(async () => {
            const data = await verifyToken(token)

            if (data.success) {
                setVerificationToken(data.verificationToken)
            }

            if (data.error) {
                setError(data.error)
            }
        })

    }, [token])

    useEffect(() => {
        onsubmit()
    }, [onsubmit]);

    return (
        <div className="flex justify-center items-center flex-col">
            {
                isPending && <Loading />
            }
            {verificationToken && (
                <div className=" text-center h-60 py-10 aspect-square space-y-3">
                    <h1 className=" text-green-500">Successfully Verified!🎉</h1>
                    <h2 className="text-white">{verificationToken.email}</h2>
                    <p className=" text-xs">Your <span className=" text-sm text-primary">{verificationToken.email}</span> is verified Successfully. Now You can do anything whatever you want. Thanks you for stay with us.💝</p>
                </div>
            )}


            {
                !isPending && error && (
                    <div className=" text-center py-3 text-red-500">
                        <p className=" text-sm">{error}</p>
                    </div>
                )
            }

        </div>
    )
}
