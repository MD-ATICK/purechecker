import { ExtendedUploadFile, processingEmailProps } from '@/app/(user)/user/verify-emails/upload-file/UploadFileCo';
import { UploadFile } from '@prisma/client';
import { create } from 'zustand';

interface useFileStoreProps {
    selectedFiles: File[];
    setSelectedFiles: (files: File[]) => void
    pendingFiles: UploadFile[]
    setPendingFiles: (files: UploadFile[]) => void
    completedFiles: ExtendedUploadFile[],
    setCompletedFiles: (files: ExtendedUploadFile[]) => void
    processingEmails: processingEmailProps[],
    setProcessingEmails: (files: processingEmailProps[]) => void
}

export const useFileStore = create<useFileStoreProps>((set) => ({
    selectedFiles: [],
    pendingFiles: [],
    completedFiles: [],
    processingEmails: [],
    setSelectedFiles: (files) => set({ selectedFiles: files }),
    setPendingFiles: (files) => set({ pendingFiles: files }),
    setCompletedFiles: (files) => set({ completedFiles: files }),
    setProcessingEmails: (files) => set({ processingEmails: files }),
}))