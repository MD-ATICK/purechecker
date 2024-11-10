
import logo from '@/assets/logo.png'
import Image from 'next/image'

export default function Footer() {
    return (
        <div className=" bg-background">
            <div className=" container mx-auto px-3 ">
                <div className="flex flex-col md:flow-row justify-between items-start gap-8 w-full py-[5vw]">
                    <div className=' space-y-6 flex-1'>
                        <div className='flex items-center gap-2'>
                            <Image alt='' src={logo} height={40} />
                            <h1 className=" font-bold text-2xl md:text-3xl">PureChecker</h1>
                        </div>
                        <p className=' text-xs md:text-sm text-muted-foreground'>Our email checker tool is designed to help you verify the validity of email addresses and improve the deliverability of your emails. By using our service, you agree to our terms and conditions privacy policy.</p>
                    </div>
                    <div className=' flex-1 flex justify-center items-center'>
                        <div>
                            <h1 className=' text-xl font-bold'>Pages</h1>
                        </div>
                    </div>
                    <div className=' flex-1 flex justify-center items-center'>
                        <h1 className=' text-xl font-bold'>Pages</h1>
                    </div>
                </div>
                <div className=" h-0.5 w-full bg-gray-300"></div>
                <p className=" text-muted-foreground text-center text-sm py-6">@copyrights for 2024 form development</p>
            </div>
        </div>
    )
}
