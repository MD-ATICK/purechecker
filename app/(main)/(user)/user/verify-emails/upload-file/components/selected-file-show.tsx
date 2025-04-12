<<<<<<< HEAD
import { Button } from "@/components/ui/button";
import React, { Dispatch, SetStateAction, useTransition } from "react";
import { useUserStore } from "@/store/useUserStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Trash, Upload } from "lucide-react";
import Image from "next/image";
import pdfImage from "@/assets/pdf.png";
import { createUploadFile } from "../../upload-file-old/actions";

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
      <div className=" space-y-2">
        {selectedFiles.map((file) => {
          return (
            <div
              key={file.name}
              className=" bg-primary/10 p-4 rounded-xl flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <Image src={pdfImage} height={30} width={30} alt="pdf" />
                <div>
                  <p className=" font-semibold ">{file.name}</p>
                  <p className=" font-[600] text-sm text-gray-500">
                    ({(file.size / 1000).toFixed(1)} kb)
                  </p>
                </div>
              </div>
              <Button
                size={"icon"}
                variant={"destructive"}
                onClick={() =>
                  setSelectedFiles((prev) =>
                    prev.filter((pv) => pv.name !== file.name)
                  )
                }
              >
                <Trash />
              </Button>
            </div>
          );
        })}
      </div>
      {selectedFiles.length > 0 && (
        <div className=" flex items-center gap-2 justify-end w-full">
          <Button
            variant={"destructive"}
            onClick={() => setSelectedFiles([])}
            disabled={isPending}
          >
            <Trash />
            Remove All
          </Button>
          <br />
          <Button onClick={uploadSelectedFiles} disabled={isPending}>
            {isPending ? (
              "Parsing"
            ) : (
              <span className="flex items-center gap-2">
                {" "}
                <Upload /> Upload
              </span>
            )}
          </Button>
        </div>
      )}
    </div>
  );
=======
import pdfImage from "@/assets/pdf.png";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/useUserStore";
import { Trash, Upload } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useTransition } from "react";
import { toast } from "sonner";
import { createUploadFile } from "../../upload-file-old/actions";

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
						user?.id,
					);
					if (uploadFile) {
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
		<div className=' space-y-4'>
			<div className=' space-y-2'>
				{selectedFiles.map(file => {
					return (
						<div
							key={file.name}
							className=' bg-primary/10 p-4 rounded-xl flex justify-between items-center'
						>
							<div className='flex items-center gap-4'>
								<Image src={pdfImage} height={30} width={30} alt='pdf' />
								<div>
									<p className=' font-semibold '>{file.name}</p>
									<p className=' font-[600] text-sm text-gray-500'>
										({(file.size / 1000).toFixed(1)} kb)
									</p>
								</div>
							</div>
							<Button
								size={"icon"}
								variant={"destructive"}
								onClick={() =>
									setSelectedFiles(prev =>
										prev.filter(pv => pv.name !== file.name),
									)
								}
							>
								<Trash />
							</Button>
						</div>
					);
				})}
			</div>
			{selectedFiles.length > 0 && (
				<div className=' flex items-center gap-2 justify-end w-full'>
					<Button
						variant={"destructive"}
						onClick={() => setSelectedFiles([])}
						disabled={isPending}
					>
						<Trash />
						Remove All
					</Button>
					<br />
					<Button onClick={uploadSelectedFiles} disabled={isPending}>
						{isPending ? (
							"Parsing"
						) : (
							<span className='flex items-center gap-2'>
								{" "}
								<Upload /> Upload
							</span>
						)}
					</Button>
				</div>
			)}
		</div>
	);
>>>>>>> fa713f7 (update almost done without blog)
}
