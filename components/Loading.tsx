import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

export default function Loading({ className }: { className?: string }) {
    return (
        <div className={cn('w-full h-10 flex text-muted-foreground justify-center items-center', className)}>
            <Loader2 className=' size-4 animate-spin' />
        </div>
    )
}