import { auth } from "@/auth";
import React from "react";
import { getFiles } from "./actions";
import PendingFileToComplete from "./pending-file-to-complete";
import CompleteFileToDownload from "./complete-file-to-download";

export default async function UploadFile() {
  const session = await auth();
  const { files, error } = await getFiles(session?.user.id);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className=" space-y-3">
      <p>Upload file</p>
      <br />
      {files &&
        files.map((file) => {
          return (
            <div
              key={file.id}
              className=" border-2 border-red-500 p-3 rounded-xl"
            >
              <p>fileId : {file.id}</p>
              <p>file Size : {file.fileSize / 1000}</p>
              <p>Status : {file.status} </p>
              <p>Emails  : {file.enterEmails.length} </p>
              {file.status === "COMPLETED" && (
                <CompleteFileToDownload fileId={file.id} />
              )}
              {file.status === "PENDING" && session?.user.id && (
                <PendingFileToComplete
                  userId={session?.user.id}
                  enterEmails={file.enterEmails}
                  fileId={file.id}
                />
              )}
            </div>
          );
        })}
    </div>
  );
}
