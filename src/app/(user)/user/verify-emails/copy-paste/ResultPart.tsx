"use client"
import reload from '@/assets/reload.png'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { BulkDownloadEmailType } from '@/utils/BulkConvertFile'
import Image from 'next/image'
import DownloadDialog from './DownloadDialog'

export default function ResultPart({checkedEmails, setCheckedEmails}: {checkedEmails : BulkDownloadEmailType[], setCheckedEmails: React.Dispatch<React.SetStateAction<BulkDownloadEmailType[]>>}) {


    if(checkedEmails.length === 0){
        return null
    }

    return (
        <div className=" flex-1 w-full">
            <div className=" flex gap-6 items-center justify-between">
                <div className="">
                    <h1 className=" text-lg md:text-2xl font-bold">Download Your Email</h1>
                    {/* <p className="  text-xs text-muted-foreground">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum maxime quos libero vel magni cupiditate.</p> */}
                </div>
                {
                    checkedEmails.length > 0 && (
                        <div className=" flex items-center gap-2">
                            <DownloadDialog checkEmails={checkedEmails} />
                            <Button className=' hidden md:block' variant={'destructive'} onClick={() => setCheckedEmails([])}>Reset</Button>
                            <Button className=' md:hidden ' size={'icon'} variant={'destructive'} onClick={() => setCheckedEmails([])}>
                                <Image alt='' src={reload} className=' invert' height={15} />
                            </Button>
                        </div>
                    )
                }
            </div>
            <div className=" flex flex-col">
                {checkedEmails.map((check, index) => (
                    <div key={index} className="flex h-7 items-center gap-x-6 justify-start">
                        <p className=" text-sm"> {index + 1}. {check.email}</p>
                        <p className={cn("text-xs", check.isExist ? "text-green-500" : "text-red-500")}> {check.isExist ? "Exists" : "Not Exists"}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
