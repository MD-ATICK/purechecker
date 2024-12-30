import Link from 'next/link'

export default function page() {
    return (
        <div className='flex flex-col justify-center items-center text-center'>
            <p className=' text-red-500'>Something went wrong!</p>
            <br />
            <Link href={'/login'}>Back to login</Link>

        </div>
    )
}
