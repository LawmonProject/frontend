import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
import contractImage from '/src/assets/계약서이미지.svg';
import { useMutation } from '@tanstack/react-query';
import { useContractStore } from '../../shared/store/store';
import Loading from './Loading';
import { AnimatePresence, motion } from 'framer-motion';

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

  const CATEGORY_MAP = {
    REAL_ESTATE: 'RealEstate',
    LABOR:      'Labor',
    INSURANCE:  'Insurance',
  } as const;

  const uploadContract = async ({
    file,
    category,
  }: {
    file: File;
    category: keyof typeof CATEGORY_MAP;
  }) => {
    const mappedCategory = CATEGORY_MAP[category];
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/contracts/upload?title=${encodeURIComponent(file.name)}&category=${encodeURIComponent(mappedCategory)}`,
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
        const storeCategory = (Object.keys(CATEGORY_MAP) as Array<keyof typeof CATEGORY_MAP>)
      .find(k => CATEGORY_MAP[k] === data.category)!;
      setContractID(data.contractId);
      setTitle(data.title);
      setCategoryStore(storeCategory);
      setContractURL(data.pdfUrl);
      alert('업로드 성공! S3 URL: ' + data.url);

      // 업로드 성공 후 계약서 분석 페이지로 이동 && 콘솔에 전역변수 출력 해보기
      console.log('Contract ID', useContractStore.getState().contractID);
      console.log('Title', useContractStore.getState().title);
      console.log('category', useContractStore.getState().category);
      console.log('Contract URL', useContractStore.getState().ContractURL);

      navigate('/chatgpt');
    },
    onError: () => {
      alert('파일 업로드에 실패했습니다.');
    },
  });

  type Category = 'REAL_ESTATE' | 'LABOR' | 'INSURANCE';

  const handleCategoryClick = (cat: Category) => {
    setCategory(cat);
    document.getElementById('fileInput')?.click();
  };

  // 임시로 로딩만 확인
  const handleFakeLoading = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      navigate('/chatgpt');
    }, 2000); // 2초 동안 로딩
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
    // 이 부분 gpt api 연동 후 pending 부분에 넣기
  if (uploading) {
    return (
      <div>
        <AnimatePresence>
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            style={{
              width: '100vw',
              height: '100vh',
              position: 'fixed',
              top: 0,
              left: 0,
              zIndex: 1000,
            }}
          >
            <Loading />
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  if (mutation.isPending) {// 2초 동안 로딩
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <>
      <button
        className="expert-start fixed top-6 right-6"
        onClick={handleFakeLoading} // 임시로 이 버튼 클릭 시 로딩
      >
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
            onClick={() => handleCategoryClick('REAL_ESTATE')}
          >
            <img src={contractImage} alt="계약서" className="w-10 h-10" />
            <span>부동산 계약서</span>
          </button>
          <button
            className="contract-button flex flex-col items-center justify-center space-y-2 p-4 bg-blue-500 rounded-lg text-white"
            onClick={() => handleCategoryClick('LABOR')}
          >
            <img src={contractImage} alt="계약서" className="w-10 h-10" />
            <span>근로 계약서</span>
          </button>
          <button
            className="contract-button flex flex-col items-center justify-center space-y-2 p-4 bg-blue-500 rounded-lg text-white"
            onClick={() => handleCategoryClick('INSURANCE')}
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
