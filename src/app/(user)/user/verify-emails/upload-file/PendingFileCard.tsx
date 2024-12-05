import { bulkEmailVerify, checkHaveCreditForBulkCheck, reduceCredit } from "@/actions/emailVerify";
import Loading from "@/app/loading";
import csvImage from '@/assets/csv.png';
import pdfImage from '@/assets/pdf.png';
import xlsImage from '@/assets/xls.png';
import { useCreditStore } from "@/store/useCreditStore";
import { useFileStore } from "@/store/useFileStore";
import { UploadFile } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getUploadFilesById, uploadUploadFileStatus } from "./actions";
import { processingEmailProps } from "./UploadFileCo";

export interface PendingFileCardProps {
  userId: string,
  file: UploadFile,
}

export default function PendingFileCard({ file, userId }: PendingFileCardProps) {

  const { credit, setCredit } = useCreditStore()
  const { setPendingFiles, setCompletedFiles, completedFiles, pendingFiles } = useFileStore()
  const [processingEmails, setProcessingEmails] = useState<processingEmailProps[]>([]);

  useEffect(() => {
    const fileEmailVerifyHandler = async () => {
      try {

        if (!file.enterEmails.length) {
          return toast.error('please enter an email')
        }

        if (file.enterEmails.length > 100) {
          return toast.error('You can only check 100 emails at a time')
        }

        const haveCredit = await checkHaveCreditForBulkCheck(file.enterEmails.length, userId)
        if (!haveCredit.success) {
          return toast.error(haveCredit.error)
        }

        setProcessingEmails(prev => [...prev, { uploadFileId: file.id, enter: file.enterEmails.length, checked: 0, status: "PENDING" }])

        for (const email of file.enterEmails) {
          console.count(file.id);
          const res = await bulkEmailVerify(email, userId, file.id);
          console.count('res');
  
          if (res.data) {
            setProcessingEmails((prev) =>
              prev.map((pe) =>
                pe.uploadFileId === file.id
                  ? { ...pe, checked: pe.checked + 1, status: 'PENDING' }
                  : pe
              )
            );
          }
        }



        await reduceCredit(file.enterEmails.length, userId, haveCredit.creditId, haveCredit.credit)
        await uploadUploadFileStatus(file.id)
        const res = await getUploadFilesById(file.id)
        if (res.uploadFile?.checkedEmails) {
          setCompletedFiles([...completedFiles, res.uploadFile])
        }
        setCredit(credit - file.enterEmails.length)
        setPendingFiles(pendingFiles.filter(pe => pe.id !== file.id))
        setProcessingEmails(prev => prev.map((pe) => pe.uploadFileId === file.id ? { ...pe, status: "COMPLETED" } : pe))

      } catch (error) {
        toast.error((error as Error).message)
      }
    }
 

    fileEmailVerifyHandler(); // Call the handler once

    // eslint-disable-next-line
  }, [file.enterEmails, file.id, userId]);

  return (
    <div className=" h-20 rounded-sm bg-secondary/80 p-4 flex justify-between items-center">

      {/* LEFT */}
      <div className="">
        <div className=" flex items-center justify-start gap-4 px-2">
          <Image alt='' height={25} width={25} src={file.fileName.includes('pdf') ? pdfImage : file.fileName.includes('csv') ? csvImage : xlsImage} />
          <p className="">{file.fileName} <span className=' text-gray-500 text-sm'>({(file.fileSize / 1000).toFixed(1)}kb)</span> </p>
          <p>({file.enterEmails.length} emails)</p>
        </div>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <p>{processingEmails.find(pe => pe.uploadFileId === file.id)?.checked || 0}/{file.enterEmails.length}</p>
        <div className="flex items-center gap-2">
          <Loading className=" h-8" />
          <p className=" text-sm text-gray-400">Processing</p>
        </div>
      </div>
    </div>
  )
}
