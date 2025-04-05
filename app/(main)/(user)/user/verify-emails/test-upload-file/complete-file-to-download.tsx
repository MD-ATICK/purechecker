"use client";
import { CheckCheck } from "lucide-react";
import DownloadFileDrawer from "./components/download-file-drawer";

export default function CompleteFileToDownload({ fileId }: { fileId: string }) {

  return (
    <div>
      <div className="flex items-center gap-2 text-green-600">
        <CheckCheck />
        Completed
      </div>
      <br />
      <DownloadFileDrawer fileId={fileId} />
    </div>
  );
}
