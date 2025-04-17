import React from 'react';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token?: string;
  user?: string;
  message?: string;
  // 필요한 응답 데이터 타입 추가
}

export default async function fetchLogin(
  credentials: LoginRequest,
): Promise<LoginResponse> {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      },
    );

    const contentType = response.headers.get('content-type');
    let data;

    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      // JWT 토큰만 오는 경우
      const token = await response.text();
      data = { token };
      console.log('JWT 토큰:', token);
    }

    if (!response.ok) {
      throw new Error(data.message || '로그인에 실패했습니다.');
    }

    return data;
  } catch (error) {
    console.error('로그인 오류:', error);
    throw error;
  }
}
