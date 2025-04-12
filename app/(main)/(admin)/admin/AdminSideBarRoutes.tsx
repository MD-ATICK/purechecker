"use client";
import { Button } from "@/components/ui/button";
import { adminDashboardRoutes } from "@/lib/contants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Use for getting the current path

export default function AdminSideBarRoutes() {
	const currentPath = usePathname(); // Get the current path

	return (
		<div className='w-full flex flex-col gap-2'>
			{adminDashboardRoutes.map(({ href, icon, label }) => {
				const isActive = currentPath.includes(href);

				return (
					<Button
						key={label}
						variant={"outline"}
						className={cn(
							"gap-2 p-2.5 h-10 lg:h-14 w-full hover:bg-primary hover:text-white duration-300 transition-all ease-linear",
							isActive && "bg-primary text-white",
						)}
					>
						<Link
							href={href}
							className='h-full w-full flex justify-start items-center gap-4'
						>
							{/* <Image alt="" className="" src={dashboardImage} height={20} /> */}
							{icon}
							<p className='hidden lg:block'>{label}</p>
						</Link>
					</Button>
				);
			})}
		</div>
	);
}
