import defaultUserImage from "@/assets/testimonial-user.png";
import { Role } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Clipboard, LayoutDashboard } from "lucide-react";
import { Separator } from "./ui/separator";

export default function UserButton({
	name,
	role,
	image,
}: {
	userId: string;
	name: string;
	role: Role;
	image?: string;
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className=' outline-none'>
				<Image
					src={image || defaultUserImage}
					height={35}
					className=' rounded-md object-cover aspect-square'
					width={35}
					alt=''
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuLabel>Hi, @{name || "John Due"}</DropdownMenuLabel>
				<Separator />
				{role === "ADMIN" && (
					<div className=' text-xs py-1 px-2 my-2 rounded-full bg-primary/10 text-primary w-fit'>
						Admin
					</div>
				)}
				<Link href={`/${role === "ADMIN" ? "admin" : "user"}/dashboard`}>
					<DropdownMenuItem>
						<LayoutDashboard /> Dashboard
					</DropdownMenuItem>
				</Link>
				<Link href={`/billing`}>
					<DropdownMenuItem>
						<Clipboard /> Billing
					</DropdownMenuItem>
				</Link>
				<LogoutButton />
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
