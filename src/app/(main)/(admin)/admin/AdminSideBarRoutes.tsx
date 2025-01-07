"use client"
import apisImage from '@/assets/api.png';
import blogImage from '@/assets/blog.png'; // Assuming this image exists
import ordersImage from '@/assets/checkout.png';
import dashboardImage from '@/assets/dashboard-small.png';
import historyImage from '@/assets/history.png';
import jobImage from '@/assets/job.png'; // Assuming this image exists
import pricingImage from '@/assets/price-tag.png';
import usersImage from '@/assets/user.png';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // To get the current path

export default function AdminSideBarRoutes() {
    const currentPath = usePathname(); // Get the current path

    // Helper function to check if the current route matches the button's route
    const isActive = (route: string) => currentPath === route ? "bg-muted" : "";

    return (
        <div className='w-full flex flex-col gap-2'>
            <Button variant={'secondary'} className={`gap-2 p-2.5 h-10 lg:h-12 w-full ${isActive('/admin/dashboard')}`}>
                <Link href={'/admin/dashboard'} className='h-full w-full flex justify-start items-center gap-4'>
                    <Image alt='' className='invert-0 dark:invert' src={dashboardImage} height={20} />
                    <p className='hidden lg:block'>Dashboard</p>
                </Link>
            </Button>

            <Button variant={'secondary'} className={`gap-2 p-2.5 h-10 lg:h-12 w-full ${isActive('/admin/users')}`}>
                <Link href={'/admin/users'} className='h-full w-full flex justify-start items-center gap-4'>
                    <Image alt='' className='' src={usersImage} height={20} />
                    <p className='hidden lg:block'>Users</p>
                </Link>
            </Button>

            <Button variant={'secondary'} className={`gap-2 p-2.5 h-10 lg:h-12 w-full ${isActive('/admin/orders')}`}>
                <Link href={'/admin/orders'} className='h-full w-full flex justify-start items-center gap-4'>
                    <Image alt='' className='invert-0 dark:invert' src={ordersImage} height={20} />
                    <p className='hidden lg:block'>Orders</p>
                </Link>
            </Button>

            <Button variant={'secondary'} className={`gap-2 p-2.5 h-10 lg:h-12 w-full ${isActive('/admin/credit-history')}`}>
                <Link href={'/admin/credit-history'} className='h-full w-full flex justify-start items-center gap-4'>
                    <Image alt='' className='invert-0 dark:invert' src={historyImage} height={20} />
                    <p className='hidden lg:block'>Credit History</p>
                </Link>
            </Button>

            <Button variant={'secondary'} className={`gap-2 p-2.5 h-10 lg:h-12 w-full ${isActive('/admin/jobs')}`}>
                <Link href={'/admin/jobs'} className='h-full w-full flex justify-start items-center gap-4'>
                    <Image alt='' className='invert-0 dark:invert' src={jobImage} height={20} />
                    <p className='hidden lg:block'>Jobs</p>
                </Link>
            </Button>

            <Button variant={'secondary'} className={`gap-2 p-2.5 h-10 lg:h-12 w-full ${isActive('/admin/blogs')}`}>
                <Link href={'/admin/blogs'} className='h-full w-full flex justify-start items-center gap-4'>
                    <Image alt='' className='invert-0 dark:invert' src={blogImage} height={20} />
                    <p className='hidden lg:block'>Blogs</p>
                </Link>
            </Button>

            <Button variant={'secondary'} className={`gap-2 p-2.5 h-10 lg:h-12 w-full ${isActive('/admin/pricing')}`}>
                <Link href={'/admin/pricing'} className='h-full w-full flex justify-start items-center gap-4'>
                    <Image alt='' className='invert-0 dark:invert' src={pricingImage} height={20} />
                    <p className='hidden lg:block'>Pricing</p>
                </Link>
            </Button>

            <Button variant={'secondary'} className={`gap-2 p-2.5 h-10 lg:h-12 w-full ${isActive('/admin/apis')}`}>
                <Link href={'/admin/apis'} className='h-full w-full flex justify-start items-center gap-4'>
                    <Image alt='' className='invert-0 dark:invert' src={apisImage} height={20} />
                    <p className='hidden lg:block'>Api List</p>
                </Link>
            </Button>
        </div>
    );
}
