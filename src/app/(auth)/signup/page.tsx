import signUpImage from '@/assets/sign-up.png'
import { Metadata } from "next"
import Image from "next/image"
import Link from 'next/link'
import SignUpForm from './SignUpForm'


export const metadata: Metadata = {
    title: 'Sign Up'
}

export default function SignUpPage() {
    return (
        <main className=" flex h-full md:h-screen items-center justify-center md:p-5 font-medium text-sm">
            <div className=" shadow-2xl bg-secondary flex flex-col-reverse md:flex-row h-full md:max-h-[95%] w-full max-w-[64rem] md:rounded-2xl overflow-hidden border">
                <div className=' w-full md:w-1/2 h-full p-[6vw] md:p-[3vw] flex flex-col gap-4'>
                    <div className=' space-y-1'>
                        {/* <Link href={'/'}> */}
                            <Image alt='' src={signUpImage} width={60} height={60} className=' object-cover' />
                        {/* </Link> */}
                        <h1 className=' font-bold text-2xl md:text-3xl'>Sign Up</h1>
                        <p className=' text-sm md:text-[15px] text-gray-400'>Sign up and get 100 free Credit</p>
                    </div>
                    <SignUpForm />
                    <Link href={'/login'} className=' text-sm text-center w-full '>Already have an account? Log in</Link>
                </div>
                {/* right */}
                <div className=" w-full aspect-[10/9] md:w-1/2 bg-gradient-to-r p-6 flex-col gap-2 to-blue-700 from-blue-800 flex justify-center items-center text-center md:h-full relative">
                    <h1 className=" font-bold leading-[55px] text-5xl">Get <span className=' text-green-400'>100 FREE Credit</span> to verify emails seamlessly!</h1>
                    <p className=" text-gray-300">Sign up now, no credit card required.</p>
                </div>
            </div>
        </main>
    )
}