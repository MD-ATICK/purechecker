import csvImage from '@/assets/csv.png';
import pdfImage from '@/assets/pdf.png';
import xlsImage from '@/assets/xls.png';
import Loading from '@/components/Loading';
import { UploadFile, VerifyEmail } from '@prisma/client';
import Image from "next/image";
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import DownloadDialog from "../copy-paste/DownloadDialog";
import { getCheckEmailsByUploadFileId } from './actions';


export default function CompletedFileCard({ file, userId }: { file: UploadFile, userId: string }) {

    const [checkedEmails, setCheckedEmails] = useState<VerifyEmail[]>([]);
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        const getCheckedEmails = async () => {
            setIsPending(true)
            try {
                const data = await getCheckEmailsByUploadFileId(file.id, userId)
                if (data.checkedEmails) {
                    setCheckedEmails(data.checkedEmails)
                }
            } catch (error) {
                toast.error((error as Error).message)
            } finally {
                setIsPending(false)
            }
        }

        getCheckedEmails()
        // eslint-disable-next-line
    }, []);

    return (
        <div className=" h-20 border border-green-500 rounded-sm bg-secondary/80 p-2 md:p-4 flex justify-between items-center">

            {/* LEFT */}
            <div className="">
                <div className=" flex items-center justify-start gap-2 md:gap-4 px-2">
                    <Image alt='' height={25} width={25} src={file.fileName.includes('pdf') ? pdfImage : file.fileName.includes('csv') ? csvImage : xlsImage} />
                    <div className=" text-sm md:text-lg flex flex-col" title={file.fileName}>
                        {file.fileName.length > 25 ? file.fileName.slice(0, 25) + '...' : file.fileName}
                        <div className=" flex items-center gap-2">
                            <span className=' text-gray-500 text-sm'>({(file.fileSize / 1000).toFixed(1)}kb)</span>
                            <span className=" text-xs sm:text-sm whitespace-nowrap">({file.enterEmails.length} emails)</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* RIGHT */}
            <div className=' flex items-center gap-2'>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        {
                            isPending &&
                            <Loading />
                        }
                        {
                            !isPending && checkedEmails.length > 0 &&
                            <DownloadDialog checkEmails={checkedEmails} />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
