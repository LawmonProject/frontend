import './index.css';
import RoomItem from './RoomItem';
import { useNavigate } from 'react-router-dom';

  // 채팅방 더미 데이터
const chatRooms = [
    {
      id: '1',
      roomName: '법률 상담 채팅방',
      lastMessage: '안녕하세요, 계약서 검토 부탁드립니다.',
      timestamp: '17:30'
    },
    {
      id: '2',
      roomName: '채용 계약 문의',
      lastMessage: '수정된 내용 확인해 주세요.',
      timestamp: '16:45'
    },
    {
      id: '3',
      roomName: '부동산 계약서 검토',
      lastMessage: '계약서 3페이지 조항에 대해 문의드립니다.',
      timestamp: '어제'
    },
    {
      id: '4',
      roomName: '이혼 소송 상담',
      lastMessage: '자료 검토 후 회신 드리겠습니다.',
      timestamp: '월요일'
    },
    {
      id: '5',
      roomName: '개인정보보호법 관련',
      lastMessage: '추가 자료가 필요합니다. 첨부해주시겠어요?',
      timestamp: '2월 15일'
    },
    {
      id: '6',
      roomName: '회사 설립 문의',
      lastMessage: '설립 절차 관련 문서를 보내드렸습니다.',
      timestamp: '2월 10일'
    }
  ];

export default function Chat() {
    const navigate = useNavigate();

    const handleRoomClick = (roomId: string) => {
        navigate(`/chat/${roomId}`);
      };

  return (
    <div>
      <h1 className="Law-title text-3xl font-bold text-blue-900 mb-4">LAWMON</h1>
      <p className="mx-auto w-fit text-3xl text-gray-500 chatting-title">법률 상담 채팅 목록</p>
      <div className="overflow-y-auto flex-1">
        {chatRooms.map((room) => (
          <RoomItem
            key={room.id}
            id={room.id}
            roomName={room.roomName}
            lastMessage={room.lastMessage}
            timestamp={room.timestamp}
            onClick={() => handleRoomClick(room.id)}
          />
        ))}
      </div>
    </div>
  );
}
