import { create } from 'zustand'


interface CreditState {
    credit: number,
    setCredit: (credit: number) => void
}


export const useCreditStore = create<CreditState>((set) => ({
    credit: 0,
    setCredit: (credit) => set({ credit })
}))