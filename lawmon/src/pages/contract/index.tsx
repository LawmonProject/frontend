import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
import contractImage from '/src/assets/계약서이미지.svg';
import { useMutation } from '@tanstack/react-query';
import { useContractStore } from '../../shared/store/store'

export default function Contract() {
  const [selectedFile, setSelectedFile] = useState< File | null>(null);
  const [category, setCategory] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const setContractURL = useContractStore((state) => state.setContractURL);

  const uploadContract = async ({ file, category }: { file: File, category: string }) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/contracts/upload?title=${encodeURIComponent(file.name)}&category=${encodeURIComponent(category)}`,
      {
        method: 'POST',
        body: formData,
      }
    );
    if (!res.ok) throw new Error('업로드 실패');
    return res.json();
  };

  const mutation = useMutation({
    mutationFn: uploadContract,
    onSuccess: (data) => {
      setContractURL(data.url);
      alert('업로드 성공! S3 URL: ' + data.url);
    },
    onError: () => {
      alert('파일 업로드에 실패했습니다.');
    }
  });
  
  type Category = 'RealEstate' | 'Labor' | 'Insurance';

  const handleCategoryClick = (cat : Category)  => {
    setCategory(cat);
    document.getElementById('fileInput')?.click();
  };

const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);
};

  const handleUpload = () => {
    if (!selectedFile || !category) {
      alert('파일과 계약서 종류를 선택해 주세요.');
      return;
    }
    mutation.mutate({ file: selectedFile, category });
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

        <button
          className="mt-4 px-6 py-2 bg-green-500 text-white rounded"
          onClick={handleUpload}
          disabled={uploading}
        >
          {uploading ? '업로드 중...' : '업로드'}
        </button>
      </div>
    </>
  );
}
