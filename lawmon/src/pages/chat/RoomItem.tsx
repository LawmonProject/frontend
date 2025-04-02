import React from 'react';
import peopleicon from '../../assets/people.svg';
import Ellipse from '../../assets/Ellipse.svg';
import MesIcon from '../../assets/chat.svg';
import EllipseSM from '../../assets/EllipseSM.svg';
import './RoomItem.css';

/** 익명 프로필 이미지 컴포넌트 */
function PersonImg() {
  return (
    <div className="relative w-10 h-10 flex-shrink-0">
      <img src={Ellipse} alt="Ellipse" className="w-full h-full" />
      <img
        src={peopleicon}
        alt="people icon"
        className="w-4 h-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-3/5"
      />
    </div>
  );
}
/** 메세지 이미티콘 컴포넌트 */
function MessageImg() {
  return (
    <div className="relative flex-shrink-0 MessImg">
      <img src={EllipseSM} alt="EllipseSM" className="w-full h-full" />
      <img
        src={MesIcon}
        alt="MesIcon"
        className="w-4 h-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-4/8"
      />
    </div>
  );
}

// props 타입 정의
interface RoomItemProps {
  id?: string;
  roomName?: string;
  lastMessage?: string;
  timestamp?: string;
  onClick?: () => void;
}

export default function RoomItem({
  id = '12',
  roomName = '채팅방',
  lastMessage = 'Last Chatting',
  timestamp = '17:30',
  onClick,
}: RoomItemProps) {
  return (
    <div
      className="flex RoomContainer items-center p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
      onClick={onClick}
    >
      <div className='flex gap-[30px]'>
        <PersonImg />
        <div className="mess">
          <p className="chattingID  ">Chatting ID : {id}</p>
          <p className="lastMessage  text-gray-500">{lastMessage}</p>
        </div>
      </div>
      <div className="text-xs text-gray-400 whitespace-nowrap ml-2">
        <MessageImg />
      </div>
    </div>
  );
}
