"use client";

import { checkHaveCreditForBulkCheck, reduceCredit, singleBulkEmailVerify } from "@/actions/emailVerify";
import Loading from "@/app/loading";
import { Button } from "@/components/ui/button";
import { useCreditStore } from "@/store/useCreditStore";
import { extractEmailsFromFile } from "@/utils/BulkConvertFile";
import { useState } from "react";
import { toast } from "sonner";
import ResultPart from "../copy-paste/ResultPart";

export default function UploadFilePage({ userId }: { userId: string }) {

    const { setCredit, credit } = useCreditStore()
    const [checkedEmails, setCheckedEmails] = useState<{ email: string, reason: string, isExist: boolean, isDisposable: boolean }[]>([]);

    const [completeValue, setCompleteValue] = useState<{ enter: number, checked: number } | undefined>();


    const fileUploadHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Check the MIME type of the file to make sure it's a supported type
        const fileType = file.type;
        const acceptedTypes = [
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
            'application/vnd.ms-excel', // .xls
            'text/csv', // .csv
        ];

        if (!acceptedTypes.includes(fileType)) {
            console.error('Unsupported file type:', fileType);
            return;
        }

        try {
            const bulkEmails = await extractEmailsFromFile(file);
            if (!bulkEmails.length) {
                return toast.error('please enter an email')
            }

            if (bulkEmails.length > 50) {
                return toast.error('You can only check 50 emails at a time')
            }
            const haveCredit = await checkHaveCreditForBulkCheck(bulkEmails.length, userId)
            if (!haveCredit.success) {
                return toast.error(haveCredit.error)
            }

            setCompleteValue({ enter: bulkEmails.length, checked: 0 })


            for (const email of bulkEmails) {
                const res = await singleBulkEmailVerify(email, userId);
                if (res.data) {
                    setCompleteValue(prev => ({ enter: prev?.enter || 0, checked: prev?.checked ? prev.checked + 1 : 1 }));
                    setCheckedEmails(prev => [...prev, { email: res.data.email, reason: res.data.reason, isExist: res.data.isExist, isDisposable: res.data.isDisposable }])
                }
            }
            await reduceCredit(bulkEmails.length, userId, haveCredit.creditId, haveCredit.credit)
            setCredit(credit - bulkEmails.length)
            setCompleteValue(undefined)
        } catch (error) {
            console.error('Error extracting emails:', error);
        }
    };

    return (
        <div className=" p-4 relative h-full md:py-3 flex flex-col md:flex-row items-start justify-center gap-10">

            {/* PART - 1 */}
            <div className=" sticky top-3 left-0 flex-1 space-y-6">
                <div className="">
                    <h1 className="text-2xl font-bold">Upload File</h1>
                    <p className="text-xs text-muted-foreground">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum maxime quos libero vel magni cupiditate.
                    </p>
                </div>
                <div className=" w-full h-52 border-2 border-dashed flex justify-center items-center rounded-lg">
                    <Button disabled={completeValue !== undefined} variant={"secondary"}>
                        <label htmlFor="file" className=" cursor-pointer">
                            {
                                completeValue ? (
                                    <div className=" flex items-center gap-2">
                                        <p>{completeValue.checked}/{completeValue.enter}</p>
                                        <Loading />
                                    </div>
                                ) : 'Choose File'
                            }
                        </label>
                    </Button>
                    <input id="file" className=" hidden" type="file" onChange={fileUploadHandler}
                        accept=".xlsx, .xls, .csv"
                    />
                </div>
            </div>

            {/* PART -2 */}
            <ResultPart setCheckedEmails={setCheckedEmails} checkedEmails={checkedEmails} />
        </div>
    );
}
