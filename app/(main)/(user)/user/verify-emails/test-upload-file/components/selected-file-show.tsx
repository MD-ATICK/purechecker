import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import React, { useTransition } from "react";
import { createUploadFile } from "../../upload-file/actions";
import { useUserStore } from "@/store/useUserStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SelectedFileShow({
  selectedFiles,
}: {
  selectedFiles: File[];
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
    <div>
      <div className=" space-y-4">
        {selectedFiles.map((file) => {
          return (
            <div
              key={file.name}
              className=" p-4 bg-gray-100 border-2 rounded-xl"
            >
              <p>{file.name}</p>
              <p>{file.size / 1000}</p>
              <p>{format(file.lastModified, "dd MM yyyy")}</p>
            </div>
          );
        })}
      </div>
      <br />
      <Button onClick={uploadSelectedFiles} disabled={isPending}>
        {isPending ? "Parsing" : "Upload"}
      </Button>
    </div>
  );
}
