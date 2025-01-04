"use client"
import apisImage from '@/assets/api.png';
import ordersImage from '@/assets/checkout.png';
import dashboardImage from '@/assets/dashboard-small.png';
import historyImage from '@/assets/history.png';
import logo from '@/assets/logo.png';
import pricingImage from '@/assets/price-tag.png';
import settingImage from '@/assets/setting.png';
import emailImage from '@/assets/verify-email.png';
import { Button } from '@/components/ui/button';
import { cn } from "@/lib/utils";
import { useUserStore } from '@/store/useUserStore';
import Image from "next/image";
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PlanBox from './PlanBox';

export default function UserSideBar({ className }: { className?: string }) {

    const {user} = useUserStore()
    if (!user) {
        return notFound()
    }

    return (
        <div className={cn(className, " lg:px-2 min-w-[50px] overflow-hidden h-screen p-1 z-50 bg-background flex flex-col justify-between items-start")}>
            <Link href={'/'} className='flex items-center gap-2 p-1 '>
                <Image alt='' src={logo} height={30} />
                <h1 className=" hidden lg:block font-bold pb-2 text-2xl">PureChecker</h1>
            </Link>
            <div className=' w-full flex flex-col gap-3'>
                <Button variant={'secondary'} className=' gap-2 p-2.5 h-10 lg:h-14 w-full'>
                    <Link href={'/user/dashboard'} className=' h-full w-full flex justify-start items-center gap-4'>
                        <Image alt='' className=' invert-0 dark:invert' src={dashboardImage} height={20} />
                        <p className=' hidden  lg:block'>Dashboard</p>
                    </Link>
                </Button>
                {/* {
                    user.subscriptionId && */}
                <Button variant={'secondary'} className=' gap-2 p-2.5 h-10 lg:h-14 w-full'>
                    <Link href={'/user/verify-emails'} className=' h-full w-full flex justify-start items-center gap-4'>
                        <Image alt='' className=' invert-0 dark:invert' src={emailImage} height={20} />
                        <p className=' hidden  lg:block'>Verify Emails</p>
                    </Link>
                </Button>
                {/* } */}
                <Button variant={'secondary'} className=' gap-2 p-2.5 h-10 lg:h-14 w-full'>
                    <Link href={'/user/orders'} className=' h-full w-full flex justify-start items-center gap-4'>
                        <Image alt='' className=' invert-0 dark:invert' src={ordersImage} height={20} />
                        <p className=' hidden  lg:block'>Orders</p>
                    </Link>
                </Button>
                <Button variant={'secondary'} className=' gap-2 p-2.5 h-10 lg:h-14 w-full'>
                    <Link href={'/user/credit-history'} className=' h-full w-full flex justify-start items-center gap-4'>
                        <Image alt='' className=' invert-0 dark:invert' src={historyImage} height={20} />
                        <p className=' hidden  lg:block'>Credit History</p>
                    </Link>
                </Button>
                <Button variant={'secondary'} className=' gap-2 p-2.5 h-10 lg:h-14 w-full'>
                    <Link href={'/user/pricing'} className=' h-full w-full flex justify-start items-center gap-4'>
                        <Image alt='' className=' invert-0 dark:invert' src={pricingImage} height={20} />
                        <p className=' hidden  lg:block'>Pricing</p>
                    </Link>
                </Button>

                <Button variant={'secondary'} className=' gap-2 p-2.5 h-10 lg:h-14 w-full'>
                    <Link href={'/user/api'} className=' h-full w-full flex justify-start items-center gap-4'>
                        <Image alt='' className=' invert-0 dark:invert' src={apisImage} height={20} />
                        <p className=' hidden  lg:block'>Api</p>
                    </Link>
                </Button>

                <Button variant={'secondary'} className=' gap-2 p-2.5 h-10 lg:h-14 w-full'>
                    <Link href={'/user/settings'} className=' h-full w-full flex justify-start items-center gap-4'>
                        <Image alt='' className=' invert-0 dark:invert' src={settingImage} height={20} />
                        <p className=' hidden  lg:block'>Settings</p>
                    </Link>
                </Button>
            </div>
            <PlanBox user={user} />
        </div>

    )
}
