import dashboardImage from '@/assets/dashboard.png'
import Image from 'next/image'
import { Button } from '../ui/button'

export default function HowToUse() {
    return (
        <div className=' container py-[4vw] mx-auto text-center'>
            <div className=' text-center w-2/3 mx-auto space-y-3'>
                <h1 className=' text-4xl font-bold'>How to Use Pure Checker&apos;s <span className=' text-primary'>Bulk Email</span> Checker</h1>
                <p className=' text-muted-foreground text-smb'>Never waste time with undeliverable emails again! Pure Checker’s bulk email checker helps you validate a large list of email addresses in seconds. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum, ad!</p>
            </div>
            <br />
            <div className='flex py-20 px-[4vw] items-center justify-center'>
                <div className=' flex-1 space-y-12 text-start flex flex-col'>
                    <div className=' space-y-3'>
                        <h1 className=' font-bold text-3xl'> <span className=' text-primary bg-blue-100 px-4 py-1 rounded-full'>1</span> Create a FREE account</h1>
                        <p className=' text-muted-foreground'>Get 100 email verifications for FREE.</p>
                    </div>
                    <div className=' space-y-3'>
                        <h1 className=' font-bold text-3xl'><span className=' text-primary bg-blue-100 px-4 py-1 rounded-full'>2</span> Upload your dirty list</h1>
                        <p className=' text-muted-foreground'>We accept CSV, XLS, TXT and other formats</p>
                    </div>
                    <div className=' space-y-3'>
                        <h1 className=' font-bold text-3xl'><span className=' text-primary bg-blue-100 px-4 py-1 rounded-full'>3</span> Download a clean list</h1>
                        <p className=' text-muted-foreground'>You will be notified within a few minutes</p>
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
