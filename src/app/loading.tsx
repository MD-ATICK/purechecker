"use client"

import Loading from "@/components/Loading"

// import { BounceLoader } from 'react-spinners'
export default function LoadingRoot() {
    return (
        <div className=' h-screen w-full flex justify-center py-10'>
            {/* <BounceLoader size={30} color="blue" /> */}
            <Loading />
        </div>
    )
}

