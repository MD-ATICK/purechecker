import Loading from '@/components/Loading'
import { cn } from '@/lib/utils'
export default function AdminLoading({ className }: { className?: string }) {
    return (
        <div className={cn('w-full h-10 flex justify-center items-center', className)}>
            <Loading />
        </div>
    )
}