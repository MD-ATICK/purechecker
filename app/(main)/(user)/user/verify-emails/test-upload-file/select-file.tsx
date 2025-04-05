"use client";

import { toast } from "sonner";
import { acceptedFileType } from "./utils";
import { useRef, useState } from "react";
import SelectedFileShow from "./components/selected-file-show";

export default function SelectFile() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return toast.error("Select A File!");

    Array.from(files).map((file) => {
      const { error } = acceptedFileType(file.type);
      if (error) return toast.error(error);

      setSelectedFiles((prev) => [...prev, file]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    });
  };

  return (
    <div className=" space-y-2">
      <input
        id="file"
        ref={fileInputRef}
        type="file"
        accept=".xlsx, .xls, .csv"
        multiple
        onChange={handleFileChange}
      />
      <SelectedFileShow
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
      />
    </div>
  );
}
