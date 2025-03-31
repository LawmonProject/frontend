import React from 'react';
import './index.css';
import good from '../../assets/따봉.svg';

export default function Past() {
  const pasts = [
    {
      description: '계약 조건의 불명확성',
      company1: (
        <span style={{ color: 'rgba(118,123,179,1)' }}>
          20명이 도움을 받았어요!
        </span>
      ),
      company2:
        '요약내용입니다요약내용입니다요약내용입니다요약내용입니다요약내용입니다요약내용입니다',
    },
    {
      description: '계약 조건의 불명확성',
      company1: (
        <span style={{ color: 'rgba(118,123,179,1)' }}>
          20명이 도움을 받았어요!
        </span>
      ),
      company2:
        '요약내용입니다요약내용입니다요약내용입니다요약내용입니다요약내용입니다요약내용입니다',
    },
    {
      description: '계약 조건의 불명확성',
      company1: (
        <span style={{ color: 'rgba(118,123,179,1)' }}>
          20명이 도움을 받았어요!
        </span>
      ),
      company2:
        '요약내용입니다요약내용입니다요약내용입니다요약내용입니다요약내용입니다요약내용입니다',
    },
  ];

  return (
    <div className="past-container flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white p-6">
      <h1 className="Law-title text-3xl font-bold text-blue-900 mb-4">
        LAWMON
      </h1>
      <h2 className="text-lg font-semibold text-gray-800 mb-8">
        과거에 비슷한 고민이 있었어요!
      </h2>
      <div className="past-grid grid grid-cols-3 gap-6">
        {pasts.map((past, index) => (
          <div
            key={index}
            className="past-card bg-transparent border border-blue-300 rounded-xl p-6 flex flex-col justify-between min-h-[350px] w-[300px]"
          >
            <div className="text-left">
              <h3 className="text-lg font-bold text-blue-900 mb-1">
                {past.description}
              </h3>
              <p className="text-sm text-gray-500">{past.company1}</p>
              <p className="text-gray-700 mt-2">{past.company2}</p>
            </div>

            {/* 하단 버튼 컨테이너 */}
            <div className="flex items-center justify-between mt-4">
              <button className="good-button w-10 h-10 flex items-center justify-center rounded-full border border-blue-300 transition duration-300 hover:bg-blue-100">
                <img src={good} alt="따봉" className="w-5 h-5" />
              </button>
              <button className="bg-transparent border-none text-[rgba(118,123,179,1)] text-sm font-medium hover:underline p-0 m-0">
                더 읽어보기 &gt;
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
