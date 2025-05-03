import React from "react";
import Image from "next/image";
import Link from "next/link";
import { integrationsItems } from "@/lib/contants";
import mailchimp from "@/assets/mailchimp-show.svg";
import invision from "@/assets/invision-show.svg";
import tnw from "@/assets/tnw.svg";
import shopify from "@/assets/shopify.svg";
import rackspace from "@/assets/rackspace.svg";
import EmailVerificationApi from "@/components/home/EmailVerificationApi";

export default function page() {
	const columns = 4; // grid-cols-4
	const rows = Math.ceil(integrationsItems.length / columns);

	return (
		<div className=' bg-gray-100'>
			<div className='container mx-auto  py-20 space-y-20 px-2'>
				<div className='  mx-auto text-center space-y-4'>
					<h1 className=' text-4xl text-primary font-bold md:text-6xl'>
						Seamless email service integrations
					</h1>
					<p className=' text-muted-foreground max-w-6xl mx-auto text-lg lg:text-xl'>
						Verify your email list directly in the tool that you use for sending
						sending newsletters, email notifications or marketing campaigns. We
						support all favorite email services such as zapier.
					</p>
				</div>
				<div className='grid grid-cols-2 md:grid-cols-4'>
					{integrationsItems.map((item, i) => {
						const isLastRow = Math.floor(i / columns) === rows - 1;
						const isLastInRow = (i + 1) % columns === 0;
						const isLastItemBefore = i === integrationsItems.length - 2;

						return (
							<div
								key={i}
								className={`
            flex justify-center items-center flex-col font-medium gap-4 text-muted-foreground
            w-full aspect-square
            ${!isLastInRow ? "border-r border-gray-300" : ""}
            ${!isLastRow ? "border-b border-gray-300" : ""}
          `}
							>
								{item.icon && (
									<div className=' h-32 rounded-md shadow-sm aspect-square bg-white flex justify-center items-center'>
										<Image
											src={item.icon}
											alt={item.name}
											height={50}
											width={50}
										/>
									</div>
								)}
								{isLastItemBefore ? (
									<Link
										className=' text-primary underline'
										href={
											"https://zapier.com/developer/public-invite/223735/48caaacb25d04e8b65c33cb87f96419b/"
										}
									>
										{item.name}
									</Link>
								) : (
									<p className=' text-xl px-0 md:px-20 text-center'>
										{item.name}
									</p>
								)}
							</div>
						);
					})}
				</div>
			</div>
			<EmailVerificationApi />
			<div className=' max-w-6xl text-center mx-auto px-2 py-28 md:py-40 space-y-14'>
				<h2 className=' text-primary font-bold text-3xl md:text-5xl'>
					You are in a good company
				</h2>
				<div className=' grid grid-cols-2 md:grid-cols-5 gap-4 place-items-center'>
					<Image src={mailchimp} alt='mailchimp' height={150} width={150} />

					<Image src={invision} alt='invision' height={150} width={150} />

					<Image src={tnw} alt='tnw' height={150} width={150} />

					<Image src={shopify} alt='shopify' height={150} width={150} />

					<Image
						src={rackspace}
						alt='rackspace'
						className=' col-span-2 md:col-span-1'
						height={150}
						width={150}
					/>
				</div>
			</div>
		</div>
	);
}
