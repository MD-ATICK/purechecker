
import menuImage from '@/assets/menu-white.png'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet"
import { cn } from '@/lib/utils'
import Image from "next/image"
import Link from 'next/link'
import { Button } from "./ui/button"



export default function MenuSheet({ className }: { className?: string }) {
    return (
        <div className={cn(className, '')}>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant={'outline'} className='' size={'icon'}>
                        <Image alt="" src={menuImage} height={18} />
                    </Button>
                </SheetTrigger>
                <SheetContent className=' flex justify-center gap-4 items-center flex-col'>
                    <Link href={'/'} className=' text-sm hover:underline font-medium'>
                        <SheetClose>
                            Home
                        </SheetClose>
                    </Link>
                    <Link href={'/blog'} className=' text-sm hover:underline font-medium'>
                        <SheetClose>
                            Blog
                        </SheetClose>
                    </Link>
                    <Link href={'/pricing'} className=' text-sm hover:underline font-medium'>
                        <SheetClose>
                            Pricing
                        </SheetClose>
                    </Link>
                    <Link href={'/contact-us'} className=' text-sm hover:underline font-medium'>
                        <SheetClose>
                            Contact Us
                        </SheetClose>
                    </Link>
                    <Link href={'/docs'} className=' text-sm hover:underline font-medium'>
                        <SheetClose>
                            Docs
                        </SheetClose>
                    </Link>
                </SheetContent>
            </Sheet>

        </div>
    )
}
