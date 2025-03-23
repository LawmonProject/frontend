import Button from '../../shared/ui/Button';
import { useNavigate } from 'react-router-dom';

export default function Expert() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-between min-h-screen text-center p-5 text-[#3A4374] space-y-[200px]">
      <div className="mt-[400px]">
        <h1 className="text-[6rem] font-bold mb-5">LAWMON</h1>
        <h2 className="text-4xl">
          당신의 계약서, 믿을 수 있는 분석 파트너와 함께하세요!
        </h2>
      </div>

      <div className="flex gap-[100px] mb-[300px] ">
        <Button
          className="w-[380px] h-[54px] px-[125px]"
          onClick={() => {
            navigate('/');
          }}
        >
          시작하기
        </Button>
        <Button
          className="w-[30px] h-[54px] px-[110px]"
          onClick={() => {
            navigate('/login');
          }}
        >
          전문가로 시작하기
        </Button>
      </div>
    </div>
  );
}
