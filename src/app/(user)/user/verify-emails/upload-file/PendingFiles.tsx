import { UploadFile } from "@prisma/client";
import PendingFileCard from "./PendingFileCard";
import { processingEmailProps } from "./UploadFileCo";


export interface PendingFilesProps {
  userId: string,
  processingEmails : processingEmailProps[]
  setProcessingEmails: React.Dispatch<React.SetStateAction<processingEmailProps[]>>
  pendingFiles: UploadFile[],
  setPendingFiles: React.Dispatch<React.SetStateAction<UploadFile[]>>
  setCompletedFiles: React.Dispatch<React.SetStateAction<UploadFile[]>>
}
export default function PendingFiles({ pendingFiles, userId, processingEmails, setCompletedFiles, setPendingFiles, setProcessingEmails }: PendingFilesProps) {
  return (
    pendingFiles.length > 0 && (
      <div className=" space-y-2">
        {/* <h2>Pending History</h2>
        <p className=' text-gray-500 text-sm font-medium'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur quod architecto aliquam reprehenderit sit ducimus?</p>
        <br /> */}
        {
          pendingFiles.map((file, index) => (
            <PendingFileCard key={index} processingEmails={processingEmails} file={file} userId={userId} setCompletedFiles={setCompletedFiles} setPendingFiles={setPendingFiles} setProcessingEmails={setProcessingEmails} />
          ))
        }
      </div>
    )
  )
}
