import PlanBox from "@/app/(main)/(user)/PlanBox";
import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";
import { ExtendedUser } from "@/types/nextauth";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdminSideBarRoutes from "./AdminSideBarRoutes";

export default function AdminSideBar({
	className,
	user,
}: {
	className?: string;
	user: ExtendedUser;
}) {
	// const { user } = useUserStore()
	// const user = await getUser()
	if (!user) {
		return notFound();
	}

	return (
		<div
			className={cn(
				className,
				" lg:px-2 min-w-[50px] overflow-hidden h-screen p-1 z-50 bg-white bg-gradient-to-tr to-white via-sky-100 from-white flex flex-col justify-between items-start",
			)}
		>
			<Link href={"/"} className='flex items-center gap-2 p-1 '>
				<Image alt='' src={logo} height={30} />
				<h1 className=' hidden lg:block font-bold pb-2 text-2xl'>
					PureChecker
				</h1>
			</Link>
			<AdminSideBarRoutes />
			<PlanBox user={user} />
		</div>
	);
}
