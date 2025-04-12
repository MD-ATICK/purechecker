import { auth } from "@/auth";
import React from "react";
import { getFiles } from "./actions";
import PendingFileToComplete from "./pending-file-to-complete";
import CompleteFileToDownload from "./complete-file-to-download";
import { CalendarDays, History } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import pdfImage from "@/assets/pdf.png";
import Image from "next/image";
import { format } from "date-fns";

export default async function UploadFile() {
  const session = await auth();
  const { files, error } = await getFiles(session?.user.id);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className=" space-y-3">
      <div>
        <div className="flex items-center gap-3">
          <div className=" h-8 aspect-square rounded-md flex justify-center items-center bg-primary/10 text-primary">
            <History size={18} />
          </div>
          <h1 className=" font-bold text-xl">Upload History</h1>
        </div>
        <p className=" font-medium text-gray-500">
          View the history of your uploaded files and Remember Those File
          history auto remove after{" "}
          <span className=" text-primary font-semibold">14 days.</span>{" "}
        </p>
      </div>

      <br />
      {files &&
        files.map((file) => {
          if (file.status === "COMPLETED") {
            return (
              <div
                className=" flex items-center justify-between rounded-xl p-4 bg-green-500/10"
                key={file.id}
              >
                <div className=" flex items-center gap-3">
                  <Image src={pdfImage} height={30} width={30} alt="pdf" />
                  <div>
                    <p className=" font-semibold ">
                      {file.fileName}{" "}
                      <span className=" text-primary">
                        ({file.enterEmails.length} emails)
                      </span>
                    </p>
                    <p className=" font-[600] text-sm text-gray-500">
                      <span className=" text-black flex items-center gap-1">
                        {" "}
                        <CalendarDays size={16} className=" text-primary" /> {format(file.createdAt, "dd MMM yyyy")}
                      </span> {" "}
                      ({(file.fileSize / 1000).toFixed(1)} KB)
                    </p>
                  </div>
                </div>
                <CompleteFileToDownload fileId={file.id} />
              </div>
            );
          }

          if (file.status === "PENDING" && session?.user.id) {
            return (
              <Skeleton
                key={file.id}
                className=" p-4 rounded-xl flex justify-between items-center"
              >
                <div className=" flex items-center gap-3">
                  <Image src={pdfImage} height={30} width={30} alt="pdf" />
                  <div>
                    <p className=" font-semibold ">
                      {file.fileName}{" "}
                      <span className=" text-primary">
                        ({file.enterEmails.length} emails)
                      </span>
                    </p>
                    <p className=" font-[600] text-sm text-gray-500">
                      ({(file.fileSize / 1000).toFixed(1)} kb)
                    </p>
                  </div>
                </div>
                <PendingFileToComplete
                  userId={session?.user.id}
                  enterEmails={file.enterEmails}
                  fileId={file.id}
                />
              </Skeleton>
            );
          }
        })}
    </div>
  );
}
