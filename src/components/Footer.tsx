"use client"
import emailImage from '@/assets/email.png';
import locationImage from '@/assets/location.png';
import logo from '@/assets/logo.png';
import viberImage from '@/assets/viber.png';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';



export default function Footer() {

    const pathname = usePathname();
    const hideFooter = pathname?.includes('/user') || pathname?.includes('/admin');

    return (
        <>
            {!hideFooter &&
                <div className=" bg-secondary">
                    <div className=" container mx-auto px-3">
                        <div className="flex flex-col md:flex-row gap-6 justify-between items-start w-full py-[2vw]">
                            <div className=' space-y-2 flex-1'>
                                <div className='flex items-center gap-2'>
                                    <Image alt='' src={logo} height={35} />
                                    <h1 className=" font-bold text-2xl md:text-2xl">PureChecker</h1>
                                </div>
                                <div className=' space-y-2 md:space-y-4 md:py-8'>
                                    <div className="flex items-center gap-3">
                                        <Image alt="" src={locationImage} height={22} />
                                        <p className=" text-xs md:text-sm">1700, Surabari, kashimpur, Gazipur, Bangladesh</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Image alt="" src={viberImage} height={22} />
                                        <p className=" text-xs md:text-sm">8801710115441</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Image alt="" src={emailImage} height={22} />
                                        <p className=" text-xs md:text-sm">support@purechecker.com</p>
                                    </div>

                                </div>
                                <p className=' text-sm md:text-[15px] leading-6 text-muted-foreground'>Our email checker tool is designed to help you verify the validity of email addresses and improve the deliverability of your emails. By using our service, you agree to our terms and conditions privacy policy.</p>
                            </div>
                            <div className=' flex-[0.6] flex justify-center items-center'>
                                <div className=' space-y-6'>
                                    <h1 className=' text-xl font-bold'>Pages</h1>
                                    <div className=' gap-y-2 md:gap-y-4 flex flex-col'>
                                        <Link href={'/blog'} className=' text-gray-500 text-sm md:text-[15px] font-medium hover:text-white hover:underline'>Blog</Link>
                                        <Link href={'/faq'} className=' text-gray-500 text-sm md:text-[15px] font-medium hover:text-white hover:underline'>FAQS</Link>
                                        <Link href={'/docs'} className=' text-gray-500 text-sm md:text-[15px] font-medium hover:text-white hover:underline'>Docs</Link>
                                        <Link href={'/contact-us'} className=' text-gray-500 text-sm md:text-[15px] font-medium hover:text-white hover:underline'>Contact Us</Link>
                                    </div>
                                </div>
                            </div>
                            <div className=' flex-[0.6] flex justify-center items-center'>
                                <div className=' space-y-6'>
                                    <h1 className=' text-xl font-bold'>Legal</h1>
                                    <div className=' gap-y-2 md:gap-y-4 flex flex-col '>
                                        <Link href={'/privacy-policy'} className=' text-gray-500 text-sm md:text-[15px] font-medium hover:text-white hover:underline'>Privacy & Policy</Link>
                                        <Link href={'/terms'} className=' text-gray-500 text-sm md:text-[15px] font-medium hover:text-white hover:underline'>Terms of Use</Link>
                                        <Link href={'/refund-policy'} className=' text-gray-500 text-sm md:text-[15px] font-medium hover:text-white hover:underline'>Refund Policy</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" h-[1px] mt-4 w-full bg-sky-600"></div>
                        <p className=" text-muted-foreground text-center text-sm py-6">©2025 <Link className=' hover:underline text-blue-700' href={'https://purechecker.com'}>Purechecker.com</Link>. All rights reserved.</p>
                    </div>
                </div>
            }
        </>
    )
}
