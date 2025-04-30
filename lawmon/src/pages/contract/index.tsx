import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
import contractImage from '/src/assets/계약서이미지.svg';
import { useMutation } from '@tanstack/react-query';
import { useContractStore } from '../../shared/store/store';

export default function Contract() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [category, setCategory] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  /* zustand에서 지역변수 설정 */
  const setContractID = useContractStore((state) => state.setContractID);
  const setTitle = useContractStore((state) => state.setTitle);
  const setCategoryStore = useContractStore((state) => state.setCategory);
  const setContractURL = useContractStore((state) => state.setContractURL);

  /* zustand에서 지역변수 값 읽기 */
  const contractID = useContractStore((state) => state.contractID);
  const title = useContractStore((state) => state.title);
  const categories = useContractStore((state) => state.category);
  const contractUrl = useContractStore((state) => state.ContractURL);

  const uploadContract = async ({
    file,
    category,
  }: {
    file: File;
    category: string;
  }) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/contracts/upload?title=${encodeURIComponent(file.name)}&category=${encodeURIComponent(category)}`,
      {
        method: 'POST',
        body: formData,
      },
    );
    if (!res.ok) throw new Error('업로드 실패');
    return res.json();
  };

  const mutation = useMutation({
    mutationFn: uploadContract,
    onSuccess: (data) => {
      setContractID(data.contractId);
      setTitle(data.title);
      setCategoryStore(data.category);
      setContractURL(data.pdfUrl);
      alert('업로드 성공! S3 URL: ' + data.url);

      // 업로드 성공 후 계약서 분석 페이지로 이동 && 콘솔에 전역변수 출력 해보기
      console.log('Contract ID', useContractStore.getState().contractID);
      console.log('Title', useContractStore.getState().title);
      console.log('category', useContractStore.getState().category);
      console.log('Contract URL', useContractStore.getState().ContractURL);

    },
    onError: () => {
      alert('파일 업로드에 실패했습니다.');
    },
  });

  type Category = 'RealEstate' | 'Labor' | 'Insurance';

  const handleCategoryClick = (cat: Category) => {
    setCategory(cat);
    document.getElementById('fileInput')?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);
    if (file && category) {
      mutation.mutate({ file, category });
    } else if (!category) {
      alert('먼저 계약서 종류를 선택해 주세요.');
    }
  };

  return (
    <>
      <button className="expert-start fixed top-6 right-6">
        전문가와 상담하기
      </button>

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-6 relative">
        <h1 className="Law-title">LAWMON</h1>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-800">
            어떤 계약서가 궁금하신가요?
          </h2>
        </div>

        <div className="button-container flex flex-row items-center space-y-4">
          <button
            className="contract-button flex flex-col items-center justify-center space-y-2 p-4 bg-blue-500 rounded-lg text-white"
            onClick={() => handleCategoryClick('RealEstate')}
          >
            <img src={contractImage} alt="계약서" className="w-10 h-10" />
            <span>부동산 계약서</span>
          </button>
          <button
            className="contract-button flex flex-col items-center justify-center space-y-2 p-4 bg-blue-500 rounded-lg text-white"
            onClick={() => handleCategoryClick('Labor')}
          >
            <img src={contractImage} alt="계약서" className="w-10 h-10" />
            <span>근로 계약서</span>
          </button>
          <button
            className="contract-button flex flex-col items-center justify-center space-y-2 p-4 bg-blue-500 rounded-lg text-white"
            onClick={() => handleCategoryClick('Insurance')}
          >
            <img src={contractImage} alt="계약서" className="w-10 h-10" />
            <span>보험 계약서</span>
          </button>
        </div>

        <input
          id="fileInput"
          type="file"
          style={{ display: 'none' }}
          accept="application/pdf"
          onChange={handleFileChange}
        />

        {selectedFile && (
          <p className="text-lg text-gray-700">{selectedFile.name}</p>
        )}
      </div>
    </>
  );
}
