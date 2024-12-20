import apiImage from '@/assets/verification-api.png'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'

export default function EmailVerificationApi() {
    return (
        <div className=' container mx-auto flex flex-col md:flex-row justify-center items-center py-6 md:py-8'>
            <div className=' flex-1 flex justify-center items-center'>
                <div className='w-full relative aspect-[16/11]'>
                    <Image alt='' src={apiImage} fill sizes='700px' className=' w-full object-cover rounded-xl' />
                </div>
            </div>
            <div className=' flex-1 w-full p-6 space-y-3'>
                <h2>Email verification API </h2>
                <p className=' text-muted-foreground text-sm'>Catch bad emails before they get to
                    Verify emails before they get to your database. Implement ELV is real-time API into your website registration process, newsletter sign up form and everywhere else you ask for emails.</p>
                <br />
                <Link href={'/user/api'}>
                <Button variant={"default"}>Get Your Api Key</Button>
                </Link>
            </div>
        </div>
    )
}
