"use client"

import verifiedImage from '@/assets/verified.png';
import Loading from '@/components/Loading';
import { VerificationToken } from "@prisma/client";
import Image from "next/image";
import Link from 'next/link';
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
                <div className=" text-center w-full p-2 space-y-3 h-screen flex flex-col justify-center items-center md:w-2/4">
                    <Image alt='' src={verifiedImage} height={150} width={150} />
                    <h2 className=" text-xl md:text-3xl text-green-500 font-bold">Account Verified 🎉</h2>
                    <p className="  text-xs md:text-sm">Your <span className=" text-sm text-primary">{verificationToken.email}</span> Account is verified Successfully. Now You can do anything whatever you want. Thanks you for stay with us.💝</p>
                    <Link href={'/'} className=' hover:underline mt-3'>Back to Home</Link>
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
