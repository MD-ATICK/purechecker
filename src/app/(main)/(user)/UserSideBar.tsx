import logo from '@/assets/logo.png';
import { cn } from "@/lib/utils";
import { ExtendedUser } from '@/types/nextauth';
import Image from "next/image";
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PlanBox from './PlanBox';
import SideBarRoute from './SideBarRoute';

export default function UserSideBar({ className, user }: { className?: string, user: ExtendedUser }) {

    if (!user || !user.id) {
        return notFound()
    }

    return (
        <div className={cn(className, " lg:px-2 min-w-[50px] overflow-hidden h-screen p-1 z-50 bg-secondary flex flex-col justify-between items-start")}>
            <Link href={'/'} className='flex items-center gap-2 p-1 '>
                <Image alt='' src={logo} height={30} />
                <h1 className=" hidden lg:block font-bold pb-2 text-2xl">PureChecker</h1>
            </Link>
           <SideBarRoute />
            <PlanBox user={user} />
        </div>

    )
}
