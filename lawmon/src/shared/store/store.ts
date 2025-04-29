import { create } from 'zustand';

interface ContractState {
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
}

export const useContractStore = create<ContractState>((set) => ({
  selectedFile: null,
  setSelectedFile: (file) => set({ selectedFile: file }),
}));