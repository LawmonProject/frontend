import React from 'react';
import './index.css';
import good from '../../assets/따봉.svg';
import { useQuery } from '@tanstack/react-query';
import { useContractStore } from 'shared/store/store';

export default function Past() {
    const titleFromStore = useContractStore(state => state.title);

    // 파일명에서 확장자 제거하는 로직
    let searchQuery = null;
    if (titleFromStore && typeof titleFromStore === 'string') {
        const lastDotIndex = titleFromStore.lastIndexOf('.');
        let baseName = '';
        if (lastDotIndex > 0) { // '.'이 있고, 파일명의 첫 글자가 아닌 경우
            baseName = titleFromStore.substring(0, lastDotIndex);
        } else {
            baseName = titleFromStore; // 확장자가 없는 경우 그대로 사용
        }
        // 문자열을 NFC 형식으로 정규화
        searchQuery = baseName.normalize('NFC');
    }

    const { isLoading, error, data } = useQuery({
        queryKey: ['pasts', searchQuery], // 가공된 searchQuery를 queryKey로 사용
        queryFn: async () => {
            if (!searchQuery) { // searchQuery가 없으면 요청하지 않음
                return Promise.resolve(null); // 또는 적절한 기본값 반환
            }
            // 이제 searchQuery는 NFC 형식이므로, Swagger와 동일한 인코딩 결과가 나올 것입니다.
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/v1/law/search?query=${encodeURIComponent(searchQuery)}`
            );
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        },
        enabled: !!searchQuery, // 가공된 searchQuery가 있을 때만 쿼리 실행
    });

    console.log('Original title from store: ', titleFromStore); // 원본 제목
    console.log('Search query: ', searchQuery); // 가공된 검색어
    console.log("Data: ", data);

    // const pastss = data || []; // API 응답 데이터를 사용하거나, 없을 경우 빈 배열 사용


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
        {data && data.map((past: any, index: number) => (
          <div
            key={index}
            className="past-card bg-transparent border border-blue-300 rounded-xl p-6 flex flex-col justify-between min-h-[350px] w-[300px]"
          >
            <div className="text-left">
              <h3 className="text-lg font-bold text-blue-900 mb-1">
                {past.description}
              </h3>
              <p className="text-sm text-gray-500">{past["사건번호"]}</p>
              <p className="text-gray-700 mt-2">{past["사건명"]}</p>
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
