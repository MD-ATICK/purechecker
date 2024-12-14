"use client"

import { checkHaveCreditForBulkCheck, reduceCredit, singleBulkEmailVerify } from "@/actions/emailVerify";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { extractEmails } from "@/lib/utils";
import { useCreditStore } from "@/store/useCreditStore";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import ResultPart from "./ResultPart";


export default function CopyPastePage({ userId }: { userId: string }) {


    const [value, setValue] = useState("atick@gamil.com\nmdatick866@gmail.com\njaif@gmail.com");
    const isPending = false;
    const { setCredit, credit } = useCreditStore()
    const [checkedEmails, setCheckedEmails] = useState<{ email: string, reason: string, isExist: boolean, isDisposable: boolean }[]>([]);

    const [completeValue, setCompleteValue] = useState<{ enter: number, checked: number } | undefined>();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const bulkEmails = extractEmails(value)
        if (!bulkEmails.length) {
            toast.error('please enter an email')
        }
        if (bulkEmails.length > 50) {
            return toast.error('You can only check 50 emails at a time')
         }
        const haveCredit = await checkHaveCreditForBulkCheck(bulkEmails.length, userId)
        if (!haveCredit.success) {
            return toast.error(haveCredit.error)
        }

        setCompleteValue({ enter: bulkEmails.length, checked: 0 })

        bulkEmails.map(async (email) => {
            const res = await singleBulkEmailVerify(email, userId);
            if (res.data) {
                setCompleteValue(prev => ({ enter: prev?.enter || 0, checked: prev?.checked ? prev.checked + 1 : 1 }));
                setCheckedEmails(prev => [...prev, { email: res.data.email, reason: res.data.reason, isExist: res.data.isExist, isDisposable: res.data.isDisposable }])
            }
        })
        await reduceCredit(bulkEmails.length, userId, haveCredit.creditId, haveCredit.credit)
        setCredit(credit - bulkEmails.length)
        setCompleteValue(undefined)
        setValue('')
    }

    return (
        <div className=" p-4 relative h-full md:py-3 flex flex-col md:flex-row items-start justify-center gap-10">

            {/* PART - 1 */}
            <div className="  md:sticky top-3 left-0 flex-1">
                <div className="">
                    <h1 className=" text-2xl font-bold">Paste Your Email</h1>
                    <p className="  text-xs text-muted-foreground">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum maxime quos libero vel magni cupiditate.</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <Textarea disabled={isPending} value={value} onChange={(e) => setValue(e.target.value)} placeholder="Paste your emails here" rows={15} />
                    <div className=" py-2 flex justify-end items-center">
                        <Button disabled={completeValue !== undefined} type="submit">{
                            completeValue ?
                                `${completeValue.checked}/${completeValue.enter}`
                                :
                                "Check"
                        }</Button>
                    </div>
                </form>
            </div>

            {/* PART - 2 */}
            <ResultPart setCheckedEmails={setCheckedEmails} checkedEmails={checkedEmails} />
        </div>
    )
}
