"use client";
import {
  checkHaveCreditForBulkCheck,
  emailCheck,
  reduceCredit,
} from "@/actions/emailVerify";
import { sendEmail } from "@/actions/sendMail";
import csvImage from "@/assets/csv.png";
import pdfImage from "@/assets/pdf.png";
import reloadImage from "@/assets/reload.png";
import xlsImage from "@/assets/xls.png";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import UploadedFileMail from "@/emails/UploadedFileMail";
import { useCreditStore } from "@/store/useCreditStore";
import { useFileStore } from "@/store/useFileStore";
import { UploadFile } from "@prisma/client";
import { render } from "@react-email/components";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { getUploadFilesById, uploadUploadFileStatus } from "./actions";
import { processingEmailProps } from "./UploadFileCo";

export interface PendingFileCardProps {
  userId: string;
  file: UploadFile;
}

export default function PendingFileCard({
  file,
  userId,
}: PendingFileCardProps) {
  const { credit, setCredit } = useCreditStore();
  const { removePendingFile, setCompletedFile } = useFileStore();
  const [processingEmails, setProcessingEmails] = useState<
    processingEmailProps[]
  >([]);
  const [click, setClick] = useState(false);
  const isCancelLoop = useRef(false);

  const fileEmailVerifyHandler = async () => {
    try {
      if (!file.enterEmails.length) {
        return toast.error("please enter an email");
      }

      isCancelLoop.current = false;
      setClick(true);

      const haveCredit = await checkHaveCreditForBulkCheck(
        file.enterEmails.length,
        userId
      );
      if (!haveCredit.success) {
        setClick(false);
        return toast.error(haveCredit.error);
      }

      setProcessingEmails((prev) => [
        ...prev,
        {
          uploadFileId: file.id,
          enter: file.enterEmails.length,
          checked: 0,
          status: "PENDING",
        },
      ]);

      for (const email of file.enterEmails) {
        const res = await emailCheck({
          email: email.trim(),
          userId,
          uploadFileId: file.id,
        });
        if (isCancelLoop.current) {
          return;
        }
        if (res.data) {
          setProcessingEmails((prev) =>
            prev.map((pe) =>
              pe.uploadFileId === file.id
                ? { ...pe, checked: pe.checked + 1, status: "PENDING" }
                : pe
            )
          );
        }
      }

      if (isCancelLoop.current) {
        return;
      }

      await reduceCredit(
        file.enterEmails.length,
        userId,
        haveCredit.creditId,
        haveCredit.credit
      );
      await uploadUploadFileStatus(file.id);
      const res = await getUploadFilesById(file.id);
      setCredit(credit - file.enterEmails.length);
      setProcessingEmails((prev) =>
        prev.map((pe) =>
          pe.uploadFileId === file.id ? { ...pe, status: "COMPLETED" } : pe
        )
      );
      if (res.uploadFile?.checkedEmails) {
        const totalCheck = res.uploadFile.checkedEmails.length;
        const disposableEmails = res.uploadFile.checkedEmails.filter(
          (email) => email.isDisposable
        ).length;
        const deliverableEmails = res.uploadFile.checkedEmails.filter(
          (email) => email.isExist
        ).length;
        const unDeliverableEmails = res.uploadFile.checkedEmails.filter(
          (email) => !email.isExist
        ).length;
        const fileName = res.uploadFile.fileName;
        const html = await render(
          <UploadedFileMail
            name={res.uploadFile.User?.name || "John"}
            totalCheck={totalCheck}
            disposable={disposableEmails}
            deliverable={deliverableEmails}
            undeliverable={unDeliverableEmails}
            fileName={fileName}
          />
        );
        const subject = `${fileName} - File Upload Summary`;
        await sendEmail({
          to: res.uploadFile.User?.email || "atick.bussiness.info@gmail.com",
          html,
          subject,
          type: "info",
        });

        setCompletedFile(res.uploadFile);
        removePendingFile(file.id);
      }

      setClick(false);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleBeforeUpload = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = "";
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUpload);
    fileEmailVerifyHandler();

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUpload);
    };
  }, []);

  return (
    <div className=" h-20 rounded-sm bg-secondary/80 p-2 md:p-4 flex justify-between items-center">
      {/* LEFT */}
      <div className="">
        <div className=" flex items-center justify-start gap-2 md:gap-4 px-2">
          <Image
            alt=""
            height={25}
            width={25}
            src={
              file.fileName.includes("pdf")
                ? pdfImage
                : file.fileName.includes("csv")
                ? csvImage
                : xlsImage
            }
          />
          <div
            className=" text-sm md:text-lg flex flex-col"
            title={file.fileName}
          >
            {file.fileName.length > 20
              ? file.fileName.slice(0, 20) + "..."
              : file.fileName}
            <div className=" flex items-center gap-2">
              <span className=" text-gray-500 text-sm">
                ({(file.fileSize / 1000).toFixed(1)}kb)
              </span>
              <span className=" text-xs sm:text-sm whitespace-nowrap">
                ({file.enterEmails.length} emails)
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* RIGHT */}
      <div className=" flex items-center gap-3">
        {click ? (
          <div className="flex items-center gap-4">
            <p>
              {processingEmails.find((pe) => pe.uploadFileId === file.id)
                ?.checked || 0}
              /{file.enterEmails.length}
            </p>
            <div className="flex items-center gap-2">
              <Loading className=" h-8" />
              <p className=" text-sm text-gray-400 hidden md:block">
                Processing
              </p>
            </div>

            <Button
              size={"icon"}
              variant={"destructive"}
              onClick={() => {
                // removePendingFile(file.id)
                isCancelLoop.current = true;
                setClick(false);
                setProcessingEmails((prev) =>
                  prev.filter((pe) => pe.uploadFileId !== file.id)
                );
              }}
            >
              <X />
            </Button>
          </div>
        ) : (
          <>
            <Button
              onClick={fileEmailVerifyHandler}
              className=" hidden md:block"
            >
              Check
            </Button>
            <Button
              onClick={fileEmailVerifyHandler}
              size={"icon"}
              className=" md:hidden flex justify-center items-center"
            >
              <Image
                alt=""
                src={reloadImage}
                className=" dark:invert"
                height={15}
                width={15}
              />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
