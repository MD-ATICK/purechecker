"use client"

import deleteImage from '@/assets/delete.png';
import LoadingButton from "@/components/LoadingButton";
import { Volume } from '@prisma/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { deleteVolume } from './actions';
import VolumeDialog from './VolumeDialog';

export default function VolumeActionButtons({ volume }: { volume: Volume }) {

    const [isPending, startTransition] = useTransition();
    const router = useRouter()

    const onDelete = async () => {
        startTransition(async () => {
            const data = await deleteVolume(volume.id)
            if (data.success) {
                toast.success('Volume Deleted Successfully')
                router.refresh()
            }
            if (data.error) {
                toast.error(data.error)
            }
        })
    }

    return (
        <div className=' flex items-center justify-center gap-2'>
            <VolumeDialog volume={volume} userId={volume.userId} />
            <LoadingButton size={'icon'} className=' bg-red-600' disabled={isPending} isPending={isPending} onClick={onDelete}>
                <Image alt='' className='  invert' src={deleteImage} height={20} />
            </LoadingButton>
        </div>
    )
}
