import Button from '../../shared/ui/Button';
import Input from '../../shared/ui/Input';
import './index.css';

import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-[20px]4">
      <h1 className="title text-[36px]  w-full">LAWMON</h1>
      <section className="flex flex-col Lg mb-[50px]">
        <span className="SpanColor">ID</span>
        <Input placeholder="ID 를 입력하세요 ...." />
        <span className="SpanColor">Password</span>
        <Input placeholder="비밀번호를 입력하세요 ..." />
      </section>
      <section className="flex flex-col Losec mb-[16px]">
        <Button
          className="w-[380px] h-[54px] px-[125px]"
          onClick={() => {
            navigate('/profile');
          }}
        >
          로그인
        </Button>
        <Button className="w-[380px] h-[54px] px-[125px]">회원가입</Button>
        {/* <Button
          onClick={() => {
            navigate('/chat');
          }}
        >
          임시 채팅 가기 버튼
        </Button> */}
      </section>
    </div>
  );
}
