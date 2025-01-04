import { ExtendedUser } from '@/types/nextauth';
import { create } from 'zustand';

interface useFileStoreProps {
    user: ExtendedUser | null,
    setUser: (user: ExtendedUser) => void,
    setNullUser: () => void
}

export const useUserStore = create<useFileStoreProps>((set) => ({
    user: null,
    setUser: (user) => set((state) => ({ ...state, user })),
    setNullUser: () => set((state) => ({ ...state, user: null }))
}))