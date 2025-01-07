"use client"
import apisImage from '@/assets/api.png';
import ordersImage from '@/assets/checkout.png';
import dashboardImage from '@/assets/dashboard-small.png';
import historyImage from '@/assets/history.png';
import pricingImage from '@/assets/price-tag.png';
import settingImage from '@/assets/setting.png';
import emailImage from '@/assets/verify-email.png';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Use for getting the current path

export default function SideBarRoute() {
    const currentPath = usePathname(); // Get the current path

    // Helper function to check if the current route matches the button's route
    const isActive = (route: string) => currentPath === route ? "bg-muted" : "";

    return (
        <div className="w-full flex flex-col gap-2">
            <Button variant={'secondary'} className={`gap-2 p-2.5 h-10 lg:h-14 w-full ${isActive('/user/dashboard')}`}>
                <Link href={'/user/dashboard'} className='h-full w-full flex justify-start items-center gap-4'>
                    <Image alt='' className='invert-0 dark:invert' src={dashboardImage} height={20} />
                    <p className='hidden lg:block'>Dashboard</p>
                </Link>
            </Button>

            <Button variant={'secondary'} className={`gap-2 p-2.5 h-10 lg:h-14 w-full ${isActive('/user/verify-emails')}`}>
                <Link href={'/user/verify-emails'} className='h-full w-full flex justify-start items-center gap-4'>
                    <Image alt='' className='invert-0 dark:invert' src={emailImage} height={20} />
                    <p className='hidden lg:block'>Verify Emails</p>
                </Link>
            </Button>

            <Button variant={'secondary'} className={`gap-2 p-2.5 h-10 lg:h-14 w-full ${isActive('/user/orders')}`}>
                <Link href={'/user/orders'} className='h-full w-full flex justify-start items-center gap-4'>
                    <Image alt='' className='invert-0 dark:invert' src={ordersImage} height={20} />
                    <p className='hidden lg:block'>Orders</p>
                </Link>
            </Button>

            <Button variant={'secondary'} className={`gap-2 p-2.5 h-10 lg:h-14 w-full ${isActive('/user/credit-history')}`}>
                <Link href={'/user/credit-history'} className='h-full w-full flex justify-start items-center gap-4'>
                    <Image alt='' className='invert-0 dark:invert' src={historyImage} height={20} />
                    <p className='hidden lg:block'>Credit History</p>
                </Link>
            </Button>

            <Button variant={'secondary'} className={`gap-2 p-2.5 h-10 lg:h-14 w-full ${isActive('/user/pricing')}`}>
                <Link href={'/user/pricing'} className='h-full w-full flex justify-start items-center gap-4'>
                    <Image alt='' className='invert-0 dark:invert' src={pricingImage} height={20} />
                    <p className='hidden lg:block'>Pricing</p>
                </Link>
            </Button>

            <Button variant={'secondary'} className={`gap-2 p-2.5 h-10 lg:h-14 w-full ${isActive('/user/api')}`}>
                <Link href={'/user/api'} className='h-full w-full flex justify-start items-center gap-4'>
                    <Image alt='' className='invert-0 dark:invert' src={apisImage} height={20} />
                    <p className='hidden lg:block'>API</p>
                </Link>
            </Button>

            <Button variant={'secondary'} className={`gap-2 p-2.5 h-10 lg:h-14 w-full ${isActive('/user/settings')}`}>
                <Link href={'/user/settings'} className='h-full w-full flex justify-start items-center gap-4'>
                    <Image alt='' className='invert-0 dark:invert' src={settingImage} height={20} />
                    <p className='hidden lg:block'>Settings</p>
                </Link>
            </Button>
        </div>
    );
}
