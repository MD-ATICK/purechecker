import csvImage from '@/assets/csv.png';
import pdfImage from '@/assets/pdf.png';
import xlsImage from '@/assets/xls.png';
import { useFileStore } from "@/store/useFileStore";
import Image from "next/image";
import DownloadDialog from "../copy-paste/DownloadDialog";

export default function CompletedFiles({ }: { userId : string}) {

  const {completedFiles} = useFileStore()

  return (
    completedFiles.length > 0 && (
      <div className=" space-y-2">
        {
          completedFiles.map((file, index) => (
            <div key={index} className=" h-20 border border-green-500 rounded-sm bg-secondary/80 p-4 flex justify-between items-center">

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
                <div className="flex items-center gap-2">
                  <DownloadDialog checkEmails={file.checkedEmails || []} />
                </div>
              </div>
            </div>
          ))
        }
      </div>
    )
  )
}
