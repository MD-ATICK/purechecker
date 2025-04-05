"use client"

import Loading from "@/components/Loading"

// import { BounceLoader } from 'react-spinners'
export default function LoadingMain() {
    return (
        <div className=' h-screen w-full flex justify-center py-10'>
            {/* <BounceLoader size={35} color="blue" /> */}
            <Loading />
        </div>
    )
}


