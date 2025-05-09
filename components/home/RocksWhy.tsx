import cheapPrice from "@/assets/cheap-price.png";
import optimized from "@/assets/optimizedformarketers.png";
import secure from "@/assets/reliable-sucure.png";
import Image from "next/image";

export default function RocksWhy() {
	return (
		<div className=' container md:pb-32 px-4 pt-16 space-y-6 md:space-y-16 mx-auto text-center flex justify-center items-center flex-col'>
			<h1 className=' w-full md:w-1/2 font-bold text-2xl md:text-4xl mx-auto'>
				PureChecker R@cks (Here&apos;s Why)
			</h1>

			<div className=' flex flex-col md:flex-row items-center gap-10'>
				<div className='  md:space-y-4 flex flex-col justify-center items-center'>
					<Image
						alt=''
						src={secure}
						height={300}
						className=' aspect-[16/11]  object-cover'
					/>

					<h1 className=' font-bold text-xl md:text-2xl'>
						Reliable and Secure
					</h1>
					<p className=' text-xs md:text-sm text-muted-foreground'>
						Your data is safe with us—top-notch security protocols ensure
						complete privacy.
					</p>
				</div>
				<div className='  md:space-y-4 flex flex-col justify-center items-center'>
					<Image
						alt=''
						src={optimized}
						height={300}
						className=' aspect-[16/11]  object-cover'
					/>

					<h1 className=' font-bold text-xl md:text-2xl'>
						Optimized for Marketers
					</h1>
					<p className=' text-xs md:text-sm text-muted-foreground'>
						Built with digital marketers in mind, our tool makes list cleaning
						easy and fast.
					</p>
				</div>
				<div className='  md:space-y-4 flex flex-col justify-center items-center'>
					<Image
						alt=''
						src={cheapPrice}
						height={300}
						className=' aspect-[16/11]  object-cover'
					/>

					<h1 className=' font-bold text-xl md:text-2xl'>Cheap Prices</h1>
					<p className=' text-xs md:text-sm text-muted-foreground'>
						Get professional email verification without breaking the bank. Our
						affordable plans fit every budget.
					</p>
				</div>
				{/* <div className='  md:space-y-4 flex flex-col justify-center items-center'>
                    <Image alt='' src={support} height={150} />
                    <br />
                    <h1 className=' font-bold text-xl md:text-2xl whitespace-nowrap'>Exceptional Support</h1>
                    <p className=' text-xs md:text-sm text-muted-foreground'>Questions? Our team is here to help, 24/7.</p>
                </div> */}
			</div>
		</div>
	);
}
