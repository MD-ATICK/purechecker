"use client"

import { checkHaveCreditForBulkCheck, emailCheck, reduceCredit } from "@/actions/emailVerify";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { extractEmails } from "@/lib/utils";
import { useCreditStore } from "@/store/useCreditStore";
import { useUserStore } from "@/store/useUserStore";
import { BulkDownloadEmailType } from "@/utils/BulkConvertFile";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import ResultPart from "./ResultPart";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";


export default function CopyPastePage() {

    const { user } = useUserStore()


    const [value, setValue] = useState("");
    const isPending = false;
    const { setCredit, credit } = useCreditStore()
    const [checkedEmails, setCheckedEmails] = useState<BulkDownloadEmailType[]>([]);

    const [completeValue, setCompleteValue] = useState<{ enter: number, checked: number } | undefined>();



    if (!user || !user.id) {
        return <Loading />
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!user.emailVerified) {
            return toast.error('Please verify your email first');
        }

        if (user.banned) {
            return toast.error('Your account is banned. Contact support for more information.')
        }

        const bulkEmails: string[] = extractEmails(value)
        if (!bulkEmails.length) {
            toast.error('please enter an email')
        }

        // * one method = const uniqueEmails = [...new Set(bulkEmails)] 

        const uniqueEmails = bulkEmails.filter((email, index) => (bulkEmails.indexOf(email) === index) && (!checkedEmails.find(ce => ce.email === email)))


        const haveCredit = await checkHaveCreditForBulkCheck(uniqueEmails.length, user.id!)
        if (!haveCredit.success) {
            return toast.error(haveCredit.error)
        }

        if (uniqueEmails.length === 0) {
            toast.error("Entered Duplicate Emails address")
            setCompleteValue(undefined)
            setValue('')
            return;
        }

        setCompleteValue({ enter: uniqueEmails.length, checked: 0 })
        uniqueEmails.map(async (email) => {
            const res = await emailCheck({ email, userId: user.id! });
            if (res.data) {
                setCompleteValue(prev => ({ enter: prev?.enter || 0, checked: prev?.checked ? prev.checked + 1 : 1 }));
                setCheckedEmails(prev => [...prev, {
                    email: res.data.email,
                    reason: res.data.reason || (res.data.isExist ? "OK" : "NOT OK"),
                    isExist: res.data.isExist,
                    isDisposable: res.data.isDisposable,
                    riskLevel: res.data.riskLevel,
                    free: res.data.free,
                    role: res.data.role,
                    isValidSyntax: res.data.isValidSyntax,
                    isValidDomain: res.data.isValidDomain,
                    mxRecords: res.data.mxRecords
                }])
            }
        })

        await reduceCredit(uniqueEmails.length, user.id!, haveCredit.creditId, haveCredit.credit)
        setCredit(credit - uniqueEmails.length)
        setCompleteValue(undefined)
        setValue('')
    }

    return (
        <div className=" p-4 relative h-full md:py-3 flex flex-col md:flex-row items-start justify-center gap-10">

            {/* PART - 1 */}
            <div className="  md:sticky top-3 left-0 flex-1">
                <div className="">
                    <h1 className=" text-2xl font-bold flex items-center gap-2"> <Link href="/user/verify-emails"><ChevronLeft className=" size-7 cursor-pointer" /></Link> Paste Your Email</h1>
                    <p className="  text-sm mb-2 text-muted-foreground">Paste your email addresses here to quickly verify their validity and ensure they’re ready for use.</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <Textarea disabled={isPending} value={value} onChange={(e) => setValue(e.target.value)} placeholder="Paste your emails here" rows={15} />
                    <div className=" py-2 flex justify-end items-center">
                        <Button disabled={completeValue !== undefined} type="submit">{
                            completeValue ? <>
                                {completeValue.checked}/{completeValue.enter} <Loading className=" text-white" />
                            </>
                                :
                                "Check"
                        }</Button>
                    </div>
                </form>
            </div>

            {/* PART - 2 */}
            <ResultPart isChecking={completeValue ? true : false} setCheckedEmails={setCheckedEmails} checkedEmails={checkedEmails} />
        </div>
    )
}
