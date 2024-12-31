import { User } from '@prisma/client';
import { create } from 'zustand';

interface useFileStoreProps {
    user: User | null,
    setUser: (user: User) => void
}

export const useUserStore = create<useFileStoreProps>((set) => ({
    user: null,
    setUser: (user) => set((state) => ({ ...state, user })),
}))