import React from 'react';
import './index.css';
import expertImage from '/src/assets/윾건이형.png'; // 전문가 프로필 이미지 예제
import smallStar from '/src/assets/작은별.svg'; // 보라색 채운 별 이미지 경로
import talk from '../../assets/상담하기.svg';

export default function Expert() {
  const experts = [
    {
      name: '현우진',
      rating: 5,
      reviews: 18,
      description: (
        <b>'20년 경력의 계약 전문가, 당신의 신뢰를 지키는 파트너입니다.'</b>
      ),
      education: '(미) 스탠포드대학교 수학과 학사',
      company1: '대찬학원',
      company2: '메가스터디',
      image: expertImage,
    },
    // 추가 전문가 데이터를 원하면 여기에 객체 추가 가능
  ];

  return (
    <div className="expert-container flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white p-6">
      <h1 className="Law-title text-3xl font-bold text-blue-900 mb-4">
        LAWMON
      </h1>
      <h2 className="text-lg font-semibold text-gray-800 mb-8">
        실제 전문가와 편하게 상담하세요!
      </h2>
      <div className="expert-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experts.map((expert, index) => (
          <div
            key={index}
            className="expert-card bg-white shadow-md rounded-2xl p-6 flex flex-col items-start space-y-4 border border-blue-200"
          >
            <div className="flex space-x-4">
              <div className="flex-1">
                {' '}
                {/* 텍스트가 왼쪽에 배치될 공간을 확보 */}
                <h3 className="text-lg font-bold text-gray-900">
                  {expert.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {/* 별을 이미지로 채우기 */}
                  <span>
                    {[...Array(expert.rating)].map((_, starIndex) => (
                      <img
                        key={starIndex}
                        src={smallStar}
                        alt="별"
                        className="star-image"
                      />
                    ))}
                  </span>
                  후기 {expert.reviews}개
                </p>
              </div>
              <div className="flex justify-end">
                <img
                  src={expert.image}
                  alt={expert.name}
                  className="w-10 h-10 rounded-full"
                />
              </div>
            </div>
            <div className="flex justify-between items-start w-full">
              {/* 왼쪽: 경력 정보 */}
              <div className="flex-1">
                <p className="text-gray-700">"{expert.description}"</p>
                <ul className="expert-info text-gray-600 text-sm list-disc pl-5">
                  <li>{expert.education}</li>
                  <li>{expert.company1}</li>
                  <li>{expert.company2}</li>
                </ul>
              </div>

              {/* 오른쪽: 챗 버튼 */}
              <button className="chat-button w-12 h-12 flex items-center justify-center rounded-full bg-blue-500 transition duration-300 hover:bg-blue-700 self-end ">
                <img src={talk} alt="상담하기" className="w-6 h-6" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
