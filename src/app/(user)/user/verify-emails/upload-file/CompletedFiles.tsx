import { useFileStore } from "@/store/useFileStore";
import CompletedFileCard from './CompletedFileCard';

export default function CompletedFiles({ userId }: { userId: string }) {

  const { completedFiles } = useFileStore()

  return (
    completedFiles.length > 0 && (
      <div className=" space-y-2">
        {
          completedFiles.map((file, index) => (
            <CompletedFileCard key={index} file={file} userId={userId} />
          ))
        }
      </div>
    )
  )
}
