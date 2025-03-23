import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-6">
      {/* ✅ 전문가와 상담하기 버튼 (완전 우측 상단 고정) */}
      <Button className="fixed top-0 right-0 z-50 m-4 px-6 py-3 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600">
        전문가와 상담하기
      </Button>

      <h2 className="text-xl font-bold text-gray-800">
        어떤 계약서가 궁금하신가요?
      </h2>

      {/* 계약서 선택 버튼 */}
      <div className="flex gap-4">
        <Button className="w-[200px] h-[90px] text-lg">부동산 계약서</Button>
        <Button className="w-[200px] h-[70px] text-lg">근로 계약서</Button>
        <Button className="w-[200px] h-[70px] text-lg">보험 계약서</Button>
      </div>

      {/* 파일 업로드 버튼 */}
      <input
        type="file"
        id="fileUpload"
        className="hidden"
        onChange={handleFileChange}
      />
      <label htmlFor="fileUpload">
        <Button className="w-[380px] h-[54px] px-[125px] cursor-pointer">
          파일 업로드
        </Button>
      </label>

      {/* 선택한 파일 이름 표시 */}
      {selectedFile && (
        <p className="text-lg text-gray-700">{selectedFile.name}</p>
      )}
    </div>
  );
}
