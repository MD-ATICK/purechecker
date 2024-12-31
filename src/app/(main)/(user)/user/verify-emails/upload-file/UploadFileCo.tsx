"use client";

import Loading from '@/app/loading';
import csvImage from '@/assets/csv.png';
import deleteImage from '@/assets/delete.png';
import pdfImage from '@/assets/pdf.png';
import xlsImage from '@/assets/xls.png';
import LoadingButton from '@/components/LoadingButton';
import { Button } from "@/components/ui/button";
import { useFileStore } from '@/store/useFileStore';
import { UploadFile, VerifyEmail } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState, useTransition } from "react";
import { toast } from 'sonner';
import { createUploadFile, getUploadFilesByUserId } from './actions';
import CompletedFiles from './CompletedFiles';
import PendingFiles from './PendingFiles';

export interface processingEmailProps {
  uploadFileId: string,
  enter: number,
  checked: number,
  status: "PENDING" | "COMPLETED"
}

export interface ExtendedUploadFile extends UploadFile {
  checkedEmails: VerifyEmail[]
}

export default function UploadFileCo({ userId }: { userId: string }) {

  const { selectedFiles, setSelectedFiles, setPendingFiles, setPendingFile, setCompletedFiles } = useFileStore()

  const [isPending, setIsPending] = useState(false);

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

    setSelectedFiles([...selectedFiles, file]);
  };


  const handleUploadSelectedFiles = async () => {
    try {

      setIsPending(true)

      for (const file of selectedFiles) {
        const formData = new FormData()
        formData.set('file', file)
        const data = await createUploadFile(formData, userId)
        if (data.uploadFile) {
          toast.success('add upload file' + data.uploadFile.fileName)
          setPendingFile(data.uploadFile)
        }
        if (data.error) {
          toast.error(data.error)
        }
      }

      setIsPending(false)
      setSelectedFiles([])

    } catch (error) {
      toast.error((error as Error).message)
    }
  }


  const [isFileGetPending, startTransition] = useTransition()

  useEffect(() => {
    const getAllFiles = async () => {
      startTransition(async () => {
        const data = await getUploadFilesByUserId(userId)
        if (data.uploadFiles) {
          setPendingFiles(data.uploadFiles.filter(file => file.status === "PENDING"))
          setCompletedFiles(data.uploadFiles.filter(file => file.status === "COMPLETED"))
        }
      })
    }

    getAllFiles()
    // eslint-disable-next-line
  }, [userId]);

  return (
    <div className=" p-4 relative h-full md:py-3 flex flex-col md:flex-row items-start justify-center gap-10">

      {/* PART - 1 */}
      <div className=" sticky top-3 left-0 flex-1 space-y-6">

        {/* TITLE AND DESC */}
        <div className="">
          <h1 className="text-2xl font-bold">Upload File</h1>
          <p className="text-xs text-muted-foreground">
            Upload your <b>.pdf</b>, <b>.csv</b>, or <b>.xlsx</b> file to easily verify email addresses in bulk and receive detailed results.
          </p>
        </div>

        {/* FILE INPUT */}
        <div className=" w-full h-52 border-2 border-dashed flex justify-center items-center rounded-lg">
          <Button variant={"secondary"}>
            <label htmlFor="file" className=" cursor-pointer">
              Choose File
            </label>
          </Button>
          <input id="file" className=" hidden" type="file" onChange={fileUploadHandler}
            accept=".xlsx, .xls, .csv"
          />
        </div>


        {/* SELECTED FILES */}
        <div className='flex flex-col justify-end items-end gap-3'>
          <div className=' space-y-2 w-full'>
            {
              selectedFiles.map((file, index) => (
                <div key={index} className=" h-16 rounded-sm bg-secondary/80 p-2 md:p-4 flex justify-between items-center">
                  <div className=" flex items-center gap-2 md:gap-4 p-2">
                    <Image alt='' height={25} width={25} src={file.name.includes('pdf') ? pdfImage : file.name.includes('csv') ? csvImage : xlsImage} />
                    <p className=" text-xs md:text-sm flex flex-col">{file.name} <span className=' text-gray-500 text-sm'>({(file.size / 1000).toFixed(1)}kb)</span> </p>
                  </div>
                  <Button variant={"destructive"} size={'icon'} onClick={() => setSelectedFiles(selectedFiles.filter((f, i) => i !== index))}>
                    <Image alt="" src={deleteImage} className=' dark:invert' height={15} width={15} />
                  </Button>
                </div>
              ))
            }
          </div>
          {/* UPLOAD BUTTONS */}
          <div className='flex items-center gap-2'>
            <Button disabled={selectedFiles.length === 0 || isPending} variant={'destructive'} onClick={() => setSelectedFiles([])}>Remove All</Button>
            <LoadingButton isPending={isPending} disabled={selectedFiles.length === 0 || isPending} onClick={handleUploadSelectedFiles}>Upload</LoadingButton>
          </div>
        </div>

        {/* UPLOADED FILES */}
        <div className=' space-y-6'>
          <div>
            <h2>Upload History</h2>
            <p className=' text-gray-500 text-sm font-medium'>View the history of your uploaded files, including previous email verification lists and their results, for easy reference and tracking.</p>
          </div>
          <PendingFiles userId={userId} />
          {
            isFileGetPending && (
              <div className=" w-full h-10 flex items-center justify-center">
                <Loading />
              </div>
            )
          }
          <CompletedFiles userId={userId} />
        </div>

      </div>
    </div >
  );
}
