import defaultUserImage from '@/assets/girl.jpg'
import priceTag from '@/assets/price-tag.png'
import unfold from '@/assets/unfold.png'
import CreditBox from '@/components/CreditBox'
import LogoutButton from '@/components/LogoutButton'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { db } from '@/lib/prisma'
import { ExtendedUser } from '@/types/nextauth'
import { differenceInCalendarDays, formatDate } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function PlanBox({ user }: { user: ExtendedUser }) {

    if (!user || !user?.id) {
        return notFound()
    }
    const subscription = user.subscriptionId ? await db.subscription.findUnique({ where: { id: user.subscriptionId } , include: {volume: true}}) : undefined

    return (
        <DropdownMenu >
            <DropdownMenuTrigger className=' outline-none w-full'>
                <div className=' cursor-pointer flex md:px-3 max-h-fit justify-between gap-4 hover:bg-secondary/80 mb-2 items-center rounded-lg w-full'>
                    <Image src={user.image || defaultUserImage} height={35} className=' rounded-md object-cover aspect-square' width={35} alt='' />
                    <div className=' hidden md:flex w-full items-center justify-between'>
                        <div className=' text-start'>
                            <p className=' font-semibold text-sm'>{user.name}</p>
                            <p className=' font-semibold -mt-2 text-xs'>{user.email}</p>
                        </div>
                        <Image alt='' src={unfold} height={15} width={15} className=' invert' />
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className=' p-2 bg-background min-w-[250px] ' >
                <div className=' cursor-pointer flex md:px-3 max-h-fit justify-between gap-4  items-center rounded-lg w-full'>
                    <Image src={user.image || defaultUserImage} height={35} className=' rounded-md object-cover aspect-square' width={35} alt='' />
                    <div className=' flex w-full items-center justify-between'>
                        <div className=' text-start'>
                            <p className=' font-semibold text-sm'>{user.name}</p>
                            <p className=' font-semibold -mt-2 text-xs'>{user.email}</p>
                        </div>
                        <Image alt='' src={unfold} height={15} width={15} className=' invert' />
                    </div>
                </div>
                <Separator />
                {
                    !user.subscriptionId &&
                    <Link href={'/pricing'}>
                        <DropdownMenuItem className='flex h-9 items-center gap-3'>
                            <Image alt='' src={priceTag} height={15} width={15} className=' invert' />
                            <p className=' text-start text-sm'>Buy Credit</p>
                        </DropdownMenuItem>
                    </Link>
                }
                {
                    subscription && <DropdownMenuItem className=' flex flex-col gap-0'>
                        <CreditBox userId={user.id} dashboard={true} />
                        <div className='flex items-center justify-between w-full'>
                            <p className=' text-xs'>Per Day Credit :  </p>
                            <p className=' text-xs'>{subscription.volume.dailyCredit || (subscription.volume.credit / Number(process.env.NEXT_PUBLIC_SUBSCRIPTION_DAY_LENGTH || 30))}</p>
                        </div>
                        <div className='flex items-center justify-between w-full'>
                            <p className=' text-xs'>Subscription Type :  </p>
                            <p className=' text-xs'>Monthly</p>
                        </div>
                        <div className='flex items-center justify-between w-full'>
                            <p className=' text-xs'>Left :  </p>
                            <p className=' text-xs'>{differenceInCalendarDays( new Date(),subscription.currentPeriodStart)} days</p>
                        </div>
                        <div className='flex items-center justify-between w-full'>
                            <p className=' text-xs'>End At :  </p>
                            <p className=' text-xs'>{formatDate(subscription.currentPeriodEnd, "MMMM d, yyyy")}</p>
                        </div>
                    </DropdownMenuItem>
                }
                <Separator />
                <LogoutButton />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
