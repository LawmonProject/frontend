import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가
import './index.css';
import Button from '../../shared/ui/Button';

export default function Contract() {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    console.log('선택된 파일:', file);
  };

  // 파일 업로드 후 이동할 페이지로 네비게이션
  const handleNavigate = () => {
    if (selectedFile) {
      // 파일이 선택된 경우, 예를 들어 계약서 분석 페이지로 이동
      navigate('/contract-analysis'); // 예시 경로, 필요한 경로로 수정
    } else {
      // 파일이 선택되지 않은 경우, 경고 메시지 표시
      alert('먼저 파일을 업로드 해 주세요!');
    }
  };

  return (
    <>
      {/* 전문가와 상담하기 버튼은 바깥 div로 이동 */}
      <button className="expert-start fixed top-6 right-6">
        전문가와 상담하기
      </button>

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-6 relative">
        {/* 로고 추가 */}
        <h1 className="Law-title">LAWMON</h1>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-800">
            어떤 계약서가 궁금하신가요?
          </h2>
        </div>

        {/* 계약서 선택 버튼 */}
        <div className="button-container">
          <button className="contract-button">부동산 계약서</button>
          <button className="contract-button">근로 계약서</button>
          <button className="contract-button">보험 계약서</button>
        </div>

        {/* 선택한 파일 이름 표시 */}
        {selectedFile && (
          <p className="text-lg text-gray-700">{selectedFile.name}</p>
        )}
      </div>
    </>
  );
}
