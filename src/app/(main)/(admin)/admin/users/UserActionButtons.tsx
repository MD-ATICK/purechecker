"use client"

import banUserImage from '@/assets/ban-user.png';
import unBanUserImage from '@/assets/unban-user.png';
import LoadingButton from "@/components/LoadingButton";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { userBannedToggle } from './actions';

export default function UserActionButtons({ userId, banned }: { userId: string, banned: boolean }) {

    const [isPending, startTransition] = useTransition();
    const router = useRouter()

    const onclick = async () => {
        startTransition(async () => {
            const { success, error, message } = await userBannedToggle(userId, banned)
            if (success) {
                toast.success(message)
                router.refresh()
            }
            if (error) {
                toast.error(error)
            }
        })
    }

    if (banned) {
        return (
            // <div className=' flex items-center justify-center gap-2'>
            <LoadingButton size={'icon'} className=' bg-green-600' disabled={isPending} isPending={isPending} onClick={onclick}>
                <Image alt='' className='invert' src={unBanUserImage} height={18} />
            </LoadingButton>
            // </div>
        )
    }

    if (!banned) {
        return (
            // <div className=' flex items-center justify-center gap-2'>
            <LoadingButton size={'icon'} className=' bg-red-600' disabled={isPending} isPending={isPending} onClick={onclick}>
                <Image alt='' className='invert' src={banUserImage} height={18} />
            </LoadingButton>
            // </div>
        )
    }

}
