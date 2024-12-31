import awesomeImage from '@/assets/awesome.png'
import { Button } from '@/components/ui/button'
import { getUser } from '@/lib/getUser'
import { formatDate } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
interface SuccessPageProps {
    searchParams: Promise<{ transactionId: string }>
}


export default async function SuccessPage({ searchParams }: SuccessPageProps) {

    const user = await getUser()
    const { transactionId } = await searchParams


    if (!transactionId) {
        return (
            <div className=' text-center mx-auto container flex justify-center items-center flex-col'>
                <div className=' space-y-4 py-10'>
                    <h1 className=' text-3xl md:text-4xl text-red-500 font-bold'>Failed</h1>
                    <p className=' text-sm text-muted-foreground'>Something went wrong with your transaction. Please try again or contact our support team for assistance.</p>
                    <p className=' text-sm'>No transaction happened!</p>
                </div>
            </div>
        )
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_PADDLE_SANDBOX_API}/transactions/${transactionId}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PADDLE_API_KEY}`,
        }
    })

    const { data } = await res.json()

    if (!res.ok) {
        return (
            <div className=' text-center h-screen mx-auto container flex justify-center items-center flex-col'>
                <div className=' space-y-4 '>
                    <h1 className=' text-3xl md:text-4xl text-red-500 font-bold'>Failed</h1>
                    <p className=' text-sm text-muted-foreground'>Your transaction was successful! Credits have been added to your account, and you&apos;re ready to start verifying emails.</p>
                    <p className=' text-sm'>No transaction found!</p>

                    <div className='flex items-center justify-center gap-3'>
                        <Button>
                            <Link href={'/'}>
                                Go Home
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className=' text-center h-screen mx-auto container flex justify-center items-center flex-col'>
            <div className=' space-y-4 w-full p-2 md:w-1/2 flex flex-col items-center justify-center'>
                <Image alt='' src={awesomeImage} height={250} width={250} />
                <h1 className=' text-2xl md:text-3xl text-green-500 font-bold'>Purchase Successful! 🎉</h1>
                <p className='  text-muted-foreground'>Thank you for your purchase! Your transaction was successful, and the credits have been added to your account. You can now start verifying emails with your newly acquired credits seamlessly.</p>
                <p className=' text-sm'>transactionId: {transactionId}</p>
                <p className=' text-sm text-gray-500 font-medium'>Created At : {formatDate(data.created_at, " dd MMMM yyyy HH:mm a")}</p>
                <div className='flex items-center justify-center gap-3'>
                    <Button variant={'secondary'}>
                        <Link href={'/'}>
                            Go Home
                        </Link>
                    </Button>
                    <Button>
                        <Link href={`${user?.role === "ADMIN" ? "/admin/orders" : "/user/orders"}`}>
                            See Order
                        </Link>
                    </Button>

                </div>

            </div>
        </div>
    )
}
