import { processingEmailProps } from "@/app/(main)/(user)/user/verify-emails/upload-file-old/UploadFileCo";
import { UploadFile } from "@prisma/client";
import { create } from "zustand";

interface useFileStoreProps {
	selectedFiles: File[];
	setSelectedFiles: (files: File[]) => void;
	pendingFiles: UploadFile[];
	setPendingFile: (file: UploadFile) => void;
	setPendingFiles: (files: UploadFile[]) => void;
	completedFiles: UploadFile[];
	setCompletedFile: (file: UploadFile) => void;
	setCompletedFiles: (files: UploadFile[]) => void;
	processingEmails: processingEmailProps[];
	setProcessingEmails: (files: processingEmailProps[]) => void;
	removePendingFile: (fileId: string) => void;
}

export const useFileStore = create<useFileStoreProps>(set => ({
	selectedFiles: [],
	pendingFiles: [],
	completedFiles: [],
	processingEmails: [],
	setPendingFile: file =>
		set(state => ({ pendingFiles: [...state.pendingFiles, file] })),
	setCompletedFile: file =>
		set(state => ({ completedFiles: [...state.completedFiles, file] })),
	setSelectedFiles: files => set({ selectedFiles: files }),
	removePendingFile: fileId =>
		set(state => ({
			pendingFiles: state.pendingFiles.filter(file => file.id !== fileId),
		})),
	setPendingFiles: files => set({ pendingFiles: files }),
	setCompletedFiles: files => set({ completedFiles: files }),
	setProcessingEmails: files => set({ processingEmails: files }),
}));
