import { processingEmailProps } from '@/app/(user)/user/verify-emails/upload-file/UploadFileCo';
import { UploadFile } from '@prisma/client';
import { create } from 'zustand';

interface useFileStoreProps {
    selectedFiles: File[];
    setSelectedFiles: (files: File[]) => void
    pendingFiles: UploadFile[]
    setPendingFile: (file: UploadFile) => void
    setPendingFiles: (files: UploadFile[]) => void
    completedFiles: UploadFile[],
    setCompletedFile: (file: UploadFile) => void
    setCompletedFiles: (files: UploadFile[]) => void
    processingEmails: processingEmailProps[],
    setProcessingEmails: (files: processingEmailProps[]) => void
}

export const useFileStore = create<useFileStoreProps>((set) => ({
    selectedFiles: [],
    pendingFiles: [],
    completedFiles: [],
    processingEmails: [],
    setPendingFile: (file) => set((state) => ({ pendingFiles: [...state.pendingFiles, file] })),
    setCompletedFile: (file) => set((state) => ({ completedFiles: [...state.pendingFiles, file] })),
    setSelectedFiles: (files) => set({ selectedFiles: files }),
    setPendingFiles: (files) => set({ pendingFiles: files }),
    setCompletedFiles: (files) => set({ completedFiles: files }),
    setProcessingEmails: (files) => set({ processingEmails: files }),
}))