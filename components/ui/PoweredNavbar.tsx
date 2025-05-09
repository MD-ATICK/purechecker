"use client";
import { logout } from "@/actions/logout";
import { getUserById } from "@/actions/users";
import logo from "@/assets/logo.png";
import { getUser } from "@/lib/getUser";
import { useUserStore } from "@/store/useUserStore";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CreditBox from "../CreditBox";
import MenuSheet from "../MenuSheet";
import UserButton from "../UserButton";
import { Button } from "./button";
import Loading from "../Loading";
import { navRoutes } from "@/lib/contants";

export default function PoweredNavbar() {
	const pathname = usePathname();
	const hideNavbar = pathname?.includes("user") || pathname?.includes("admin");

	const { setUser, user, isAuthPending } = useUserStore();
	const [isPending, setIsPending] = useState(true);

	useEffect(() => {
		const call = async () => {
			const user = await getUser();
			if (user && user.id) {
				const getUser = await getUserById(user.id);
				if (!getUser) {
					await logout();
				} else if (getUser && user) {
					setUser(user);
				}
				setIsPending(false);
			}
			setIsPending(false);
		};
		call();
	}, [setUser]);

	const currentPath = usePathname();
	//   const isActive = (path: string) =>
	//     currentPath === path ? "bg-primary text-white" : "";
	return (
		<>
			{!hideNavbar && (
				<div className=' sticky top-0 left-0 px-2 w-full backdrop-blur-lg bg-white z-50 dark:bg-secondary shadow-lg h-16 md:h-20 flex justify-between items-center'>
					<main className=' container mx-auto flex items-center justify-between'>
						{/* LOGO */}
						<Link href={"/"} className='flex font-sans items-center gap-2'>
							<Image alt='' src={logo} height={30} />
							<p className=' font-bold text-2xl'>PureChecker</p>
						</Link>

						{/* NAV ITEMS */}
						<nav className=' hidden lg:flex items-center gap-2'>
							{navRoutes.map(route => {
								const isActive = currentPath === route.href;
								return (
									<Link
										key={route.label}
										href={route.href}
										className='font-medium'
									>
										<Button
											variant={"ghost"}
											className={`w-[100px] text-[15px] ${
												isActive && "bg-primary text-white"
											}`}
										>
											{route.label}
										</Button>
									</Link>
								);
							})}
						</nav>
						<div className=' flex items-center gap-2'>
							<MenuSheet className=' lg:hidden' />

							{user && user.id && (
								<div className=' flex items-center justify-center gap-2 sm:gap-4'>
									<CreditBox userId={user.id} />
									<UserButton
										userId={user.id}
										image={user.image!}
										role={user.role}
										name={user.name || "John Due"}
									/>
								</div>
							)}
							{(isPending || isAuthPending) && <Loading />}
							{!isPending && !isAuthPending && !user && (
								<div className='md:flex hidden items-center gap-3'>
									<Link href={"/login"}>
										<Button variant={"secondary"}>Login</Button>
									</Link>
									<Link href={"/signup"}>
										<Button>Sign Up</Button>
									</Link>
								</div>
							)}
							{!isPending && !user && (
								<div className='flex md:hidden items-center gap-2'>
									<Link href={"/login"}>
										<Button variant={"outline"} size={"sm"}>
											Login
										</Button>
									</Link>
									<Link href={"/signup"}>
										<Button size={"sm"}>Sign Up</Button>
									</Link>
								</div>
							)}
						</div>
					</main>
				</div>
			)}
		</>
	);
}
