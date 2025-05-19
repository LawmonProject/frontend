import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import Button from '../../shared/ui/Button';
import Input from '../../shared/ui/Input';
import './index.css';

interface LoginRequest {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 로그인 API 요청 (React Query useMutation)
  const loginMutation = useMutation({
    mutationFn: async (loginData: LoginRequest) => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
        },
      );

      if (!res.ok) {
        throw new Error('로그인 실패');
      }

      return res.text(); // 토큰 반환 (Swagger 문서 기준)
    },
    onSuccess: (token) => {
      localStorage.setItem('token', token); // 토큰 저장
      navigate('/profile'); // 로그인 성공 시 이동
    },
    onError: (error) => {
      alert(error instanceof Error ? error.message : '로그인 중 오류 발생');
    },
  });

  const handleLogin = () => {
    if (!email || !password) {
      alert('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-[20px]4">
      <h1 className="title text-[36px] w-full">LAWMON</h1>
      <section className="flex flex-col Lg mb-[50px]">
        <span className="SpanColor">ID</span>
        <Input
          placeholder="ID 를 입력하세요 ...."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <span className="SpanColor">Password</span>
        <Input
          type="password"
          placeholder="비밀번호를 입력하세요 ..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </section>
      <section className="flex flex-col Losec mb-[16px]">
        <Button className="w-[380px] h-[54px] px-[125px]" onClick={handleLogin}>
          {loginMutation.isPending ? '로그인 중...' : '로그인'}
        </Button>
        <Button className="w-[380px] h-[54px] px-[125px]">회원가입</Button>
      </section>
    </div>
  );
}
