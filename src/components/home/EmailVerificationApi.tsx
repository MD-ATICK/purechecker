import apiImage from '@/assets/Integration.png'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'

export default function EmailVerificationApi() {
    return (
        <div className='  bg-gradient-to-r from-blue-500 via-blue-700 to-blue-400 text-white'>
        <div className=' container mx-auto flex flex-col md:flex-row justify-center items-center py-10 md:py-16'>
            <div className=' flex-1 flex  w-full justify-center items-center'>
                <div className='w-full relative aspect-[16/11]'>
                    <Image alt='' src={apiImage} fill sizes='700px' className=' w-full object-cover rounded-xl' />
                </div>
            </div>
            <div className=' flex-1 w-full p-6 space-y-3'>
                <h2 className=' text-3xl md:text-5xl font-bold'>Email verification API </h2>
                <p className=' text-gray-200 text-base md:text-lg font-normal'>Stop bad emails in their tracks! Verify emails instantly before they enter your database. Integrate Pure Checker&apos;s real-time API into your website registration forms, newsletter signups, and any place you collect email addresses.</p>
                <br />
                <Link href={'/user/api'}>
                <Button variant={"outline"} className=' text-base font-bold'>Get Your Api Key  </Button>
                </Link>
            </div>
        </div>
        </div>
    )
}
