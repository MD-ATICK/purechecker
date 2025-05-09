"use client";
import dashboardImage from "@/assets/dashboard.png";
import { useUserStore } from "@/store/useUserStore";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

export default function HowToUse() {
	const { user } = useUserStore();

	return (
		<div className='bg-sky-50 overflow-hidden'>
			<div className=' container z-10  md:py-[3.4vw] mx-auto text-center'>
				<div className=' text-center w-full p-4 md:w-3/5 mx-auto space-y-6'>
					<h1 className=' text-3xl md:text-5xl font-bold leading-10'>
						How to Use PureChecker&apos;s <br />{" "}
						<span className=' text-primary'>Bulk Email</span> Checker
					</h1>
					<p className=' text-xs text-muted-foreground sm:text-base'>
						Never waste time with undeliverable emails again! Pure Checker’s
						bulk email checker helps you validate a large list of email
						addresses in seconds.
					</p>
				</div>
				<br />
				<div className='flex z-0 py-4 md:py-20 w-full px-2 md:px-[4vw] flex-col-reverse md:flex-row gap-y-12 items-center justify-center'>
					<div className='  w-full md:flex-[0.6] space-y-8 md:space-y-12 text-start flex flex-col'>
						<div className=' space-y-3'>
							<div className='  flex items-center gap-3 font-bold text-2xl md:text-3xl'>
								<div className=' h-7 md:h-10 aspect-square flex justify-center items-center text-primary bg-blue-100 font-bold text-lg md:text-2xl rounded-full'>
									1
								</div>
								Create a FREE account
							</div>
							<p className=' text-xs md:text-sm text-muted-foreground'>
								Get 100 email verifications for FREE.
							</p>
						</div>
						<div className=' space-y-3'>
							<div className='  flex items-center gap-3 font-bold text-2xl md:text-3xl'>
								<div className=' h-7 md:h-10 aspect-square flex justify-center items-center text-primary bg-blue-100 font-bold text-lg md:text-2xl rounded-full'>
									2
								</div>
								Upload your dirty list
							</div>
							<p className=' text-xs md:text-sm text-muted-foreground'>
								We accept CSV, XLS, TXT and other formats
							</p>
						</div>
						<div className=' space-y-3'>
							<div className='  flex items-center gap-3 font-bold text-2xl md:text-3xl'>
								<div className=' h-7 md:h-10 aspect-square flex justify-center items-center text-primary bg-blue-100 font-bold text-lg md:text-2xl rounded-full'>
									3
								</div>
								Download a clean list
							</div>
							<p className=' text-xs md:text-sm text-muted-foreground'>
								You will be notified within a few minutes
							</p>
						</div>
						<Link
							href={
								user
									? `${
											user.role === "USER"
												? "/user/dashboard"
												: "/admin/dashboard"
									  }`
									: "/login"
							}
						>
							<Button className=' w-2/3 h-12 '>Try It Now</Button>
						</Link>
					</div>
					<motion.div
						initial={{ opacity: 0, x: 80 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
						className=' flex-1 w-full aspect-[16/9] relative'
					>
						<Image
							alt=''
							fill
							sizes='800px'
							className=' z-0 object-cover'
							src={dashboardImage}
						/>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
