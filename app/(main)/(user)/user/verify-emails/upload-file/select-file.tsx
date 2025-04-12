"use client";

import { toast } from "sonner";
import { acceptedFileType } from "./utils";
import { useRef, useState } from "react";
import SelectedFileShow from "./components/selected-file-show";
import { ArrowLeft, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <div className=" space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <div className=" h-8 aspect-square rounded-md flex justify-center items-center bg-primary/10 text-primary">
            <ArrowLeft size={18} />
          </div>
          <h1 className=" font-bold text-xl">Upload File</h1>
        </div>
        <p className=" font-medium text-gray-500">
          Upload your{" "}
          <span className=" text-primary font-semibold">
            .pdf, .csv, or .xlsx
          </span>{" "}
          file to easily verify email addresses in bulk and receive detailed
          results.
        </p>
      </div>

      {/* Input Section */}
      <div className=" flex justify-center items-center flex-col w-full aspect-[16/5] bg-primary/10 hover:bg-primary/20 border-dashed border-2 border-primary rounded-xl">
        <Upload className=" text-primary" size={60} />
        <h1 className=" text-xl">
          Upload Your{" "}
          <span className=" font-bold text-primary">PDF, XSLX , CSV</span> File
        </h1>
        <Button className=" mt-4">
          <label htmlFor="file" className="flex items-center gap-2 cursor-pointer">
            {" "}
            <Upload /> Browse Your File
          </label>
        </Button>
        <input
          id="file"
          className=" hidden"
          ref={fileInputRef}
          type="file"
          accept=".xlsx, .xls, .csv"
          multiple
          onChange={handleFileChange}
        />
      </div>
      
      <SelectedFileShow
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
      />
    </div>
  );
}
