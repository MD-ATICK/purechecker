import { acceptedTypes } from "@/lib/contants";

export const acceptedFileType = (fileType: string) => {
  if (!acceptedTypes.includes(fileType)) {
    return { error: "Unsupported file type" };
  }
  return {success : 'Supported'}
};
