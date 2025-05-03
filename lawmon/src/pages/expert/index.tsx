import React, { useEffect } from 'react';
import './index.css';
import expertImage from '/src/assets/윾건이형.png'; // 전문가 프로필 이미지 예제
import smallStar from '/src/assets/작은별.svg'; // 보라색 채운 별 이미지 경로
import talk from '../../assets/상담하기.svg';
import { useQuery } from '@tanstack/react-query';
import { useContractStore } from 'shared/store/store';
import Loading from './Loading';

export default function Expert() {

  const category = useContractStore((state) => state.category);
//   const setCategory = useContractStore((state) => state.setCategory); // 지우기
//   useEffect(() => { //지우기
//     setCategory('REAL_ESTATE'); // 지우기
//   }, []);

  const { isPending, error, data } = useQuery({
    queryKey: ['experts', category],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/experts/category/${category}`,
      );
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    },
    enabled: !!category, // category가 있을 때만 쿼리 실행
  });
//   console.log('category : ', category);  //지우기
//   console.log('data :', data);  //지우기

  interface ExpertApiResponse {
    name: string;
    specialty: string;
    // 필요한 경우 rating, reviews, education, company1, company2 등 추가
  }


  // data가 배열인지 확인 후 map, 아니면 빈 배열 사용
  const experts = Array.isArray(data)
    ? data.map((item: ExpertApiResponse) => ({
        name: item.name,
        rating: 5, // 임시값, 실제 rating 필드가 오면 교체
        reviews: 0, // 임시값, 실제 reviews 필드가 오면 교체
        description: <b>{item.specialty}</b>, // specialty를 description으로 사용
        education: '', // 임시값
        company1: '', // 임시값
        company2: '', // 임시값
        image: expertImage,
      }))
    : [];

  return (
    <div className="expert-container flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white p-6">
      <h1 className="Law-title text-3xl font-bold text-blue-900 mb-4">
        LAWMON
      </h1>
      <h2 className="text-lg font-semibold text-gray-800 mb-8">
        실제 전문가와 편하게 상담하세요!
      </h2>
      <div className="expert-grid grid grid-cols-2 gap-10">
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
                    &nbsp; 후기 {expert.reviews}개
                </p>
              </div>
              <div className="flex justify-end ">
                <img
                  src={expert.image}
                  alt={expert.name}
                  style={{ width: '70px', height: '70px', marginLeft: '150px' }}
                  className="w-8 h-8 rounded-full "
                />
              </div>
            </div>
            <div className="flex justify-between items-center w-full">
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
