import PlanBox from '@/app/(user)/PlanBox';
import apiImage from '@/assets/api.png';
import blogImage from '@/assets/blog.png';
import ordersImage from '@/assets/checkout.png';
import dashboardImage from '@/assets/dashboard-small.png';
import usersImage from '@/assets/group.png';
import jobImage from '@/assets/job.png';
import logo from '@/assets/logo.png';
import pricingImage from '@/assets/price-tag.png';
import { Button } from '@/components/ui/button';
import { getUser } from '@/lib/getUser';
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function AdminSideBar({ className }: { className?: string }) {

    const user = await getUser()
    if (!user) {
        return notFound()
    }



    return (
        <div className={cn(className, " lg:p-[1vw] min-w-[50px] p-1 z-50 bg-background flex flex-col justify-between items-start")}>
            <Link href={'/'} className='flex items-center gap-2 p-1 py-2'>
                <Image alt='' src={logo} height={30} />
                <h1 className=" hidden lg:block font-bold text-2xl">PureChecker</h1>
            </Link>
            <div className=' w-full flex flex-col gap-3'>
                <Button variant={'secondary'} className=' gap-2 p-2.5 h-10 lg:h-14 w-full'>
                    <Link href={'/admin/dashboard'} className=' h-full w-full flex justify-start items-center gap-4'>
                        <Image alt='' className=' invert-0 dark:invert' src={dashboardImage} height={20} />
                        <p className=' hidden  lg:block'>Dashboard</p>
                    </Link>
                </Button>
                <Button variant={'secondary'} className=' gap-2 p-2.5 h-10 lg:h-14 w-full'>
                    <Link href={'/admin/users'} className=' h-full w-full flex justify-start items-center gap-4'>
                        <Image alt='' className=' invert-0 dark:invert' src={usersImage} height={20} />
                        <p className=' hidden  lg:block'>Users</p>
                    </Link>
                </Button>
                <Button variant={'secondary'} className=' gap-2 p-2.5 h-10 lg:h-14 w-full'>
                    <Link href={'/admin/orders'} className=' h-full w-full flex justify-start items-center gap-4'>
                        <Image alt='' className=' invert-0 dark:invert' src={ordersImage} height={20} />
                        <p className=' hidden  lg:block'>Orders</p>
                    </Link>
                </Button>
                <Button variant={'secondary'} className=' gap-2 p-2.5 h-10 lg:h-14 w-full'>
                    <Link href={'/admin/jobs'} className=' h-full w-full flex justify-start items-center gap-4'>
                        <Image alt='' className=' invert-0 dark:invert' src={jobImage} height={20} />
                        <p className=' hidden  lg:block'>Jobs</p>
                    </Link>
                </Button>
                <Button variant={'secondary'} className=' gap-2 p-2.5 h-10 lg:h-14 w-full'>
                    <Link href={'/admin/blogs'} className=' h-full w-full flex justify-start items-center gap-4'>
                        <Image alt='' className=' invert-0 dark:invert' src={blogImage} height={20} />
                        <p className=' hidden  lg:block'>Blogs</p>
                    </Link>
                </Button>
                {/* <Button variant={'secondary'} className=' gap-2 p-2.5 h-10 lg:h-14 w-full'>
                    <Link href={'/admin/verify-emails'} className=' h-full w-full flex justify-start items-center gap-4'>
                        <Image alt='' className=' invert-0 dark:invert' src={emailImage} height={20} />
                        <p className=' hidden  lg:block'>Verify Emails</p>
                    </Link>
                </Button> */}
                <Button variant={'secondary'} className=' gap-2 p-2.5 h-10 lg:h-14 w-full'>
                    <Link href={'/admin/pricing'} className=' h-full w-full flex justify-start items-center gap-4'>
                        <Image alt='' className=' invert-0 dark:invert' src={pricingImage} height={20} />
                        <p className=' hidden  lg:block'>Pricing</p>
                    </Link>
                </Button>
                <Button variant={'secondary'} className=' gap-2 p-2.5 h-10 lg:h-14 w-full'>
                    <Link href={'/admin/apis'} className=' h-full w-full flex justify-start items-center gap-4'>
                        <Image alt='' className=' invert-0 dark:invert' src={apiImage} height={20} />
                        <p className=' hidden  lg:block'>Api</p>
                    </Link>
                </Button>
                {/* <Button variant={'secondary'} className=' gap-2 p-2.5 h-10 lg:h-14 w-full'>
                    <Link href={'/admin/apis'} className=' h-full w-full flex justify-start items-center gap-4'>
                        <Image alt='' className=' invert-0 dark:invert' src={apisImage} height={20} />
                        <p className=' hidden  lg:block'>Apis</p>
                    </Link>
                </Button> */}
            </div>
            <PlanBox user={user} />

        </div>

    )
}
