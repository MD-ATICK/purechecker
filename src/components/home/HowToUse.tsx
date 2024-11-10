import dashboardImage from '@/assets/dashboard.png'
import Image from 'next/image'
import { Button } from '../ui/button'

export default function HowToUse() {
    return (
        <div className=' container md:py-[4vw] mx-auto text-center'>
            <div className=' text-center w-full p-4 md:w-2/3 mx-auto space-y-3'>
                <h1 className=' text-3xl md:text-4xl font-bold'>How to Use Pure Checker&apos;s <span className=' text-primary'>Bulk Email</span> Checker</h1>
                <p className=' text-xs text-muted-foreground sm:text-sm'>Never waste time with undeliverable emails again! Pure Checker’s bulk email checker helps you validate a large list of email addresses in seconds. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum, ad!</p>
            </div>
            <br />
            <div className='flex py-4 md:py-20 w-full px-2 md:px-[4vw] flex-col-reverse md:flex-row gap-y-8 items-center justify-center'>
                <div className='  w-full md:flex-1 space-y-12 text-start flex flex-col'>
                    <div className=' space-y-3'>
                        <div className='  flex items-center gap-3 font-bold text-xl md:text-3xl'>
                            <div className=' h-8 md:h-11 aspect-square rounded-full bg-blue-50 text-primary flex justify-center items-center '>1</div>
                            Create a FREE account
                        </div>
                        <p className=' text-xs md:text-sm text-muted-foreground'>Get 100 email verifications for FREE.</p>
                    </div>
                    <div className=' space-y-3'>
                        <div className='  flex items-center gap-3 font-bold text-xl md:text-3xl'>
                            <div className=' h-8 md:h-11 aspect-square rounded-full bg-blue-50 text-primary flex justify-center items-center '>2</div>
                            Upload your dirty list</div>
                        <p className=' text-xs md:text-sm text-muted-foreground'>We accept CSV, XLS, TXT and other formats</p>
                    </div>
                    <div className=' space-y-3'>
                        <div className='  flex items-center gap-3 font-bold text-xl md:text-3xl'>
                            <div className=' h-8 md:h-11 aspect-square rounded-full bg-blue-50 text-primary flex justify-center items-center '>3</div>
                            Download a clean list
                        </div>
                        <p className=' text-xs md:text-sm text-muted-foreground'>You will be notified within a few minutes</p>
                    </div>
                    <Button className=' w-2/3 h-12 '>Try It Now</Button>
                </div>
                <div className=' flex-1 w-full aspect-[16/10] relative'>
                    <Image alt='' fill sizes='800px' className=' object-cover rounded-xl' src={dashboardImage} />
                </div>
            </div>
        </div>
    )
}
