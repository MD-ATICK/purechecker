"use client"

import { deleteApiToken } from '@/app/(user)/user/api/actions'
import deleteImage from '@/assets/delete.png'
import LoadingButton from "@/components/LoadingButton"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { toast } from "sonner"

export default function AdminApiTokenTableActionButton({ apiTokenId }: { apiTokenId: string }) {

    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const handleDelete = async () => {
        startTransition(async () => {
            const data = await deleteApiToken(apiTokenId)
            if (data.success) {
                toast.success('Api Token Deleted Successfully')
                router.refresh()
            }
            if (data.error) {
                toast.error(data.error)
            }
        })

    }

    return (
        <div className="flex items-center justify-center gap-2">
            <LoadingButton size={'icon'} isPending={isPending} variant={'destructive'} disabled={isPending} onClick={handleDelete}>
                <Image className=' invert' alt="" src={deleteImage} height={15} />
            </LoadingButton>
        </div>
    )
}
