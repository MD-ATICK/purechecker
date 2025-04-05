"use client";
import { Button } from "@/components/ui/button";
import { generateXLSX } from "@/utils/BulkConvertFile";
import { CheckCheck } from "lucide-react";
import React, { useTransition } from "react";
import { getVerifyEmailsByFileId } from "./actions";
import DownloadFileDrawer from "./components/download-file-drawer";

export default function CompleteFileToDownload({ fileId }: { fileId: string }) {
  const randomTenDigit = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
  };

  const [isPending, startTransaction] = useTransition();

  const handleDownload = async () => {
    startTransaction(async () => {
      const { data } = await getVerifyEmailsByFileId(fileId);
      if (data) {
        generateXLSX(randomTenDigit(), data);
      }
    });
  };

  return (
    <div>
      <div className="flex items-center gap-2 text-green-600">
        <CheckCheck />
        Completed
      </div>

      <Button onClick={handleDownload} disabled={isPending}>
        {isPending ? "Downloading..." : "skip"}
      </Button>
      <DownloadFileDrawer fileId={fileId} />
    </div>
  );
}
