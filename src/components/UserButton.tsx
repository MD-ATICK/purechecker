
import userImage from '@/assets/girl.jpg'
import { Role } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import LogoutButton from './LogoutButton'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from './ui/dropdown-menu'

export default function UserButton({ name, role }: { name: string, role: Role }) {
    return (
        <DropdownMenu >
            <DropdownMenuTrigger className=' outline-none'>
                <Image height={55} className=' rounded-full object-cover shadow-sm aspect-square' src={userImage} alt='' />
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuLabel>
                    Hi, @{name || "John Due"}
                </DropdownMenuLabel>
                <Link href={`/${role === "ADMIN" ? "admin" : "user"}/dashboard`}>
                    <DropdownMenuItem>
                        Dashboard
                    </DropdownMenuItem>
                </Link>
                <LogoutButton />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
