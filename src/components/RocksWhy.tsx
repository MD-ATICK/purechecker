import image1 from '@/assets/result.png'
import Image from 'next/image'


export default function RocksWhy() {
    return (
        <div className=' container pb-32 space-y-20 mx-auto text-center flex justify-center items-center flex-col'>
            <h1 className=' w-1/2 font-bold text-4xl mx-auto'>Pure Checker R@cks (Here&apos;s Why)</h1>

            <div className=' flex items-center gap-8'>
                <div className=' space-y-4 flex flex-col justify-center items-center'>
                    <Image alt='' src={image1} height={150} />
                    <br />
                    <h1 className=' font-bold text-2xl'>Save Money on Emails</h1>
                    <p className=' text-sm text-muted-foreground'>Spend Less, Get More Send emails only to real people. Save money, improve your delivery rates, and boost your email success.</p>
                </div>
                <div className=' space-y-4 flex flex-col justify-center items-center'>
                    <Image alt='' src={image1} height={150} />
                    <br />
                    <h1 className=' font-bold text-2xl'>Save Money on Emails</h1>
                    <p className=' text-sm text-muted-foreground'>Spend Less, Get More Send emails only to real people. Save money, improve your delivery rates, and boost your email success.</p>
                </div>
                <div className=' space-y-4 flex flex-col justify-center items-center'>
                    <Image alt='' src={image1} height={150} />
                    <br />
                    <h1 className=' font-bold text-2xl'>Save Money on Emails</h1>
                    <p className=' text-sm text-muted-foreground'>Spend Less, Get More Send emails only to real people. Save money, improve your delivery rates, and boost your email success.</p>
                </div>
            </div>
        </div>
    )
}
