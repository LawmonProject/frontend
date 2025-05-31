import React, { useEffect } from 'react';
import './index.css';
import expertImage from '/src/assets/윾건이형.png'; // 전문가 프로필 이미지 예제
import smallStar from '/src/assets/작은별.svg'; // 보라색 채운 별 이미지 경로
import talk from '../../assets/상담하기.svg';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useContractStore } from 'shared/store/store';
import Loading from './Loading';
import { useNavigate } from 'react-router-dom'; // 라우터 네비게이션을 위해 추가

export default function Expert() {
  const navigate = useNavigate();
//   const category = useContractStore((state) => state.category); // 예시 수행 후 풀기
    const category = "REAL_ESTATE"; // 예시로 고정된 카테고리, 
  // memberId를 store에서 가져오거나 localStorage에서 가져옵니다
  const memberId = useContractStore((state) => state.memberId); // store에 memberId가 있다고 가정

  const setMemberId = useContractStore((state) => state.setMemberId); // store에서 memberId 설정 함수 예시 수행 후 삭제

  useEffect(() => {
    setMemberId?.(1); // 예시로 1번 멤버 ID 설정

  }, [setMemberId]);
  

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
  console.log('category : ', category);  //지우기
  console.log('data :', data);  //지우기

  interface ExpertApiResponse {
    name: string;
    specialty: string;
    id: number;
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
        id: item.id, // 전문가 ID 추가
      }))
    : [];

  // 채팅방 생성 API 호출을 위한 mutation
  const createChatRoomMutation = useMutation({
    mutationFn: async ({ expertId, memberId }: { expertId: number; memberId: number }) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/chat/rooms/expert?expertId=${expertId}&memberId=${memberId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      if (!response.ok) {
        throw new Error('채팅방 생성에 실패했습니다.');
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      // 채팅방 생성 성공 시 채팅방으로 이동
      console.log('채팅방 생성 성공:', data);
      // 채팅방 페이지로 이동 (라우트는 프로젝트 구조에 맞게 수정하세요)
      navigate(`/chat/${data.name}`, {
        state: {
          roomId: data.roomId,
          roomName: data.name
        }
      });
    },
    onError: (error) => {
      console.error('채팅방 생성 실패:', error);
      alert('채팅방 생성에 실패했습니다. 다시 시도해주세요.');
    },
  });

  // 상담하기 버튼 클릭 핸들러
  const handleStartConsultation = (expertId: number) => {
    if (!memberId) {
      alert('로그인이 필요합니다.');
      return;
    }

    createChatRoomMutation.mutate({ expertId, memberId });
  };

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
                <h3 className="text-lg font-bold text-gray-900">
                  {expert.name}
                </h3>
                <p className="text-sm text-gray-600">
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
              <div className="flex-1">
                <p className="text-gray-700">"{expert.description}"</p>
                <ul className="expert-info text-gray-600 text-sm list-disc pl-5">
                  <li>{expert.education}</li>
                  <li>{expert.company1}</li>
                  <li>{expert.company2}</li>
                </ul>
              </div>

              <button 
                className={`chat-button w-12 h-12 flex items-center justify-center rounded-full transition duration-300 self-end ${
                  createChatRoomMutation.isPending 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-500 hover:bg-blue-700'
                }`}
                onClick={() => handleStartConsultation(expert.id)}
                disabled={createChatRoomMutation.isPending}
              >
                {createChatRoomMutation.isPending ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <img src={talk} alt="상담하기" className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
