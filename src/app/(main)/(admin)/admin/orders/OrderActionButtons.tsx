"use client"

import deleteImage from '@/assets/delete.png';
import LoadingButton from "@/components/LoadingButton";
import Image from 'next/image';
import { useTransition } from 'react';

export default function OrderActionButtons({ userId }: { userId: string }) {

    const [isPending, startTransition] = useTransition();

    const onclick = async () => {
        startTransition(async () => {
            console.log('click', userId)
        })
    }

    return (
        <div className=' flex items-center justify-center gap-2'>
        <LoadingButton size={'icon'} className=' bg-red-600' disabled={isPending} isPending={isPending} onClick={onclick}>
            <Image alt='' className=' invert-0 dark:invert' src={deleteImage} height={20} />
        </LoadingButton>
        </div>
    )
}
