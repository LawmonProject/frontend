// signup.tsx
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import './index.css';

export default function Signup() {
  const [formData, setFormData] = useState({
    nickname: '',
    username: '',
    password: '',
    confirmPassword: '',
    introduction: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const signupMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        email: formData.username, // username → email
        password: formData.password,
        name: formData.nickname, // nickname → name
        role: 'USER',
        specialty: formData.introduction, // introduction → specialty
        licenseNumber: '12345678', // 임의 값 or 별도 필드 추가 가능
        category: 'REAL_ESTATE',
      };

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        },
      );

      if (!res.ok) {
        throw new Error('회원가입 실패');
      }

      return res.text(); // 또는 .json() 형태일 수도 있음
    },
    onSuccess: (data) => {
      alert('회원가입 성공');
      console.log('응답:', data);
    },
    onError: (error) => {
      console.error('에러:', error);
      alert('회원가입 중 오류가 발생했습니다');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    signupMutation.mutate();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-purple-100 font-sans">
      <h1 className="title text-[36px] w-full mb-6 text-center">LAWMON</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-transparent p-8 rounded-lg w-full max-w-md flex flex-col gap-4"
      >
        <label className="text-gray-700 mb-2">닉네임</label>
        <input
          type="text"
          name="nickname"
          placeholder="입력하세요 ..."
          value={formData.nickname}
          onChange={handleChange}
          className="input-field w-64"
        />

        <label className="text-gray-700 mb-2">아이디</label>
        <div className="flex gap-2">
          <input
            type="text"
            name="username"
            placeholder="입력하세요 ..."
            value={formData.username}
            onChange={handleChange}
            className="input-field flex-1"
          />
          <button type="button" className="btn-check">
            중복 확인
          </button>
        </div>

        <label className="text-gray-700 mb-2">비밀번호</label>
        <input
          type="password"
          name="password"
          placeholder="입력하세요 ..."
          value={formData.password}
          onChange={handleChange}
          className="input-field w-64"
        />

        <label className="text-gray-700 mb-2">비밀번호 확인</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="입력하세요 ..."
          value={formData.confirmPassword}
          onChange={handleChange}
          className="input-field w-64"
        />

        <label className="text-gray-700 mb-2">소개 문구</label>
        <input
          type="text"
          name="introduction"
          placeholder="입력하세요 ..."
          value={formData.introduction}
          onChange={handleChange}
          className="input-field w-64"
        />

        <button
          type="submit"
          className="btn-submit mt-6"
          disabled={signupMutation.isPending}
        >
          {signupMutation.isPending ? '가입 중...' : '다음'}
        </button>
      </form>
    </div>
  );
}
