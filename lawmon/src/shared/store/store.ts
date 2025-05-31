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
  memberId?: number; // 선택적 속성으로 memberId 추가
  setMemberId?: (id: number) => void; // memberId를 설정하는 함수
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
  memberId: undefined,
  setMemberId: (id) => set({ memberId: id }),
}));
