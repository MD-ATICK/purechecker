import { useFileStore } from "@/store/useFileStore";
import PendingFileCard from "./PendingFileCard";


export interface PendingFilesProps {
  userId: string,
}
export default function PendingFiles({ userId }: PendingFilesProps) {

  const {pendingFiles} = useFileStore()

  return (
    pendingFiles.length > 0 && (
      <div className=" space-y-2">
        {
          pendingFiles.map((file, index) => (
            <PendingFileCard key={index} file={file} userId={userId} />
          ))
        }
      </div>
    )
  )
}
