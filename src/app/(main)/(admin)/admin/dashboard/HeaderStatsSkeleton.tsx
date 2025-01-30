import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";


export default function HeaderStatsSkeleton({ type }: { type: "ADMIN" | "USER" }) {
  return (
    <div className={cn('gap-6 px-3', type === 'ADMIN'? 'grid grid-cols-4 w-full h-36' : 'flex flex-col h-[90vh]  sticky top-0 right-0 w-[300px]')}>
      <div className=" py-4 space-y-6 border-r-2 pr-6">
        <Skeleton className=" h-10 rounded-sm" />
        <div className=" flex items-center justify-between">
          <Skeleton className=" h-10 w-[65%] rounded-sm" />
          <Skeleton className=" h-10 w-[30%] rounded-sm" />
        </div>
      </div>
      <div className=" py-4 space-y-6 border-r-2 pr-6">
        <Skeleton className=" h-10 rounded-sm" />
        <div className=" flex items-center justify-between">
          <Skeleton className=" h-10 w-[65%] rounded-sm" />
          <Skeleton className=" h-10 w-[30%] rounded-sm" />
        </div>
      </div>
      {
        type === 'ADMIN' && (
          <div className=" py-4 space-y-6 border-r-2 pr-6">
            <Skeleton className=" h-10 rounded-sm" />
            <div className=" flex items-center justify-between">
              <Skeleton className=" h-10 w-[65%] rounded-sm" />
              <Skeleton className=" h-10 w-[30%] rounded-sm" />
            </div>
          </div>
        )
      }
      <div className=" py-4 space-y-6 pr-6">
        <Skeleton className=" h-10 rounded-sm" />
        <div className=" flex items-center justify-between">
          <Skeleton className=" h-10 w-[65%] rounded-sm" />
          <Skeleton className=" h-10 w-[30%] rounded-sm" />
        </div>
      </div>
    </div>
  )
}
