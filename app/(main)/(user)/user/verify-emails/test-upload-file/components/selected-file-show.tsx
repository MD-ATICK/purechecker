import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import React, { Dispatch, SetStateAction, useTransition } from "react";
import { createUploadFile } from "../../upload-file/actions";
import { useUserStore } from "@/store/useUserStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Delete } from "lucide-react";

export default function SelectedFileShow({
  selectedFiles,
  setSelectedFiles,
}: {
  selectedFiles: File[];
  setSelectedFiles: Dispatch<SetStateAction<File[]>>;
}) {
  const { user } = useUserStore();
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const uploadSelectedFiles = () => {
    startTransition(async () => {
      if (user?.id) {
        for (const file of selectedFiles) {
          const formData = new FormData();
          formData.set("file", file);
          const { uploadFile, error } = await createUploadFile(
            formData,
            user?.id
          );
          if (uploadFile) {
            toast.success("add upload file" + uploadFile.fileName);
            setSelectedFiles([]);
            router.refresh();
          }
          if (error) {
            toast.error(error);
          }
        }
      }
    });
  };

  return (
    <div className=" space-y-4">
      <div className=" space-y-4">
        {selectedFiles.map((file) => {
          return (
            <div
              key={file.name}
              className=" p-4 bg-gray-100 border-2 rounded-xl"
            >
              <p>{file.name}</p>
              <p>{(file.size / 1000).toFixed(1)} kb</p>
              <p>{format(file.lastModified, "dd MM yyyy")}</p>
              <Button
                onClick={() =>
                  setSelectedFiles((prev) =>
                    prev.filter((pv) => pv.name !== file.name)
                  )
                }
              >
                <Delete />
              </Button>
            </div>
          );
        })}
      </div>
      <br />
      <Button
        variant={"destructive"}
        onClick={() => setSelectedFiles([])}
        disabled={isPending}
      >
        Remove All
      </Button>
      <br />
      <Button onClick={uploadSelectedFiles} disabled={isPending}>
        {isPending ? "Parsing" : "Upload"}
      </Button>
    </div>
  );
}
