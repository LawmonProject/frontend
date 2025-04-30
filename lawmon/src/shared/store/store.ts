import { create } from 'zustand';

interface ContractState {
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
  contractID: number | null;
  setContractID: (id: number | null) => void;
  title: string | null;
  setTitle: (title: string | null) => void;
  category: string | null;
  setCategory: (category: string | null) => void;
  ContractURL: string | null;
  setContractURL: (url: string | null) => void;
}

export const useContractStore = create<ContractState>((set) => ({
  contractID: null,
  setContractID: (id) => set({ contractID: id }),
  title: null,
  setTitle: (title) => set({ title }),
  category: null,
  setCategory: (category) => set({ category }),
  selectedFile: null,
  setSelectedFile: (file) => set({ selectedFile: file }),
  ContractURL: null,
  setContractURL: (url) => set({ ContractURL: url }),
}));
