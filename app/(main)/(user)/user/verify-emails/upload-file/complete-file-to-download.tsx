"use client";
import DownloadFileDrawer from "./components/download-file-drawer";

export default function CompleteFileToDownload({ fileId }: { fileId: string }) {

  return (
    <div>
      <DownloadFileDrawer fileId={fileId} />
    </div>
  );
}
