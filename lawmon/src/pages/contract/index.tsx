import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
import contractImage from '/src/assets/계약서이미지.svg';

export default function Contract() {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    console.log('선택된 파일:', file);
  };

  const handleNavigate = () => {
    if (selectedFile) {
      navigate('/contract-analysis');
    } else {
      alert('먼저 파일을 업로드 해 주세요!');
    }
  };

  // 파일 탐색기를 열기 위한 함수
  const handleButtonClick = () => {
    document.getElementById('fileInput').click(); // hidden input을 클릭
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
            onClick={handleButtonClick}
          >
            <img src={contractImage} alt="계약서" className="w-10 h-10" />
            <span>부동산 계약서</span>
          </button>
          <button
            className="contract-button flex flex-col items-center justify-center space-y-2 p-4 bg-blue-500 rounded-lg text-white"
            onClick={handleButtonClick}
          >
            <img src={contractImage} alt="계약서" className="w-10 h-10" />
            <span>근로 계약서</span>
          </button>
          <button
            className="contract-button flex flex-col items-center justify-center space-y-2 p-4 bg-blue-500 rounded-lg text-white"
            onClick={handleButtonClick}
          >
            <img src={contractImage} alt="계약서" className="w-10 h-10" />
            <span>보험 계약서</span>
          </button>
        </div>

        {/* 파일 입력 요소 (숨겨짐) */}
        <input
          id="fileInput"
          type="file"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

        {/* 선택한 파일 이름 표시 */}
        {selectedFile && (
          <p className="text-lg text-gray-700">{selectedFile.name}</p>
        )}
      </div>
    </>
  );
}
