import logo from '@/assets/logo.png'
import { Metadata } from "next"
import Image from "next/image"
import Link from 'next/link'
import LoginForm from './LoginForm'


export const metadata: Metadata = {
    title: 'Login'
}

export default function SignUpPage() {
    return (
        <main className=" flex h-full md:h-screen items-center justify-center md:p-5 font-medium text-sm">
            <div className=" shadow-2xl flex flex-col-reverse md:flex-row h-full md:max-h-[90%] w-full max-w-[64rem] md:rounded-2xl overflow-hidden md:bg-card">
                <div className=' w-full md:w-1/2 h-full p-[5vw] md:p-[2vw] flex flex-col gap-4'>
                    <div className=' space-y-2'>
                        <Link href={'/'}>
                            <Image alt='' src={logo} width={40} height={40} className=' object-cover' />
                        </Link>
                        <h1 className=' font-bold text-2xl md:text-3xl'>Login</h1>
                        <p className=' text-sm md:text-[15px] text-gray-400'>Login to your PureChecker account</p>
                    </div>
                    <LoginForm />
                    <Link href={'/signup'} className=' text-sm text-center w-full '>haven&apos;t any account? Sign up</Link>
                </div>
                <div className=" w-full aspect-[10/9] md:w-1/2 bg-gradient-to-r p-12 flex-col gap-2 to-blue-700 from-blue-800 flex justify-center items-center text-center md:h-full relative">
                    <h1 className=" font-bold leading-[55px] text-5xl">Login to verify your emails effortlessly.</h1>
                </div>
            </div>
        </main>
    )
}