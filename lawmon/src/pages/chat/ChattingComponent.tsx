import React, { useState, useEffect } from 'react';
import './ChattingComponent.css';
type Props = {
  nickname: string;
  chatting: string;
  time: string;
  isMe: boolean;
  profileImage?: string;
};
function ChattingComponent({
  nickname,
  chatting,
  time,
  isMe,
  profileImage,
}: Props) {
  const [chatNick, setChatNick] = useState('');

  useEffect(() => {
    setChatNick(isMe ? '나' : nickname);
  }, [isMe, nickname]);

  return (
    <>
      {isMe ? (
        // Tailwind CSS에서 justify-end는 오른쪽 정렬을 뜻함.
        <div className="flex justify-end my-5">
          <div className="mr-3">
            <div className="flex justify-end ">
              <p className="text-xs text-black">{time}</p>
              <p className="text-xs text-white">{chatNick}</p>
            </div>

            <div className="p-3 chat-text-me rounded-md mt-2">
              <span className="text-xs text-black text-span">{chatting}</span>
            </div>
          </div>
        </div>
      ) : (
        // CSS 기본정렬은 왼쪽이므로, justify-end 삭제.
        <div className="flex my-5">
          <div className="ml-3 ">
            <div className="flex">
              <p className="text-xs text-white">{chatNick}</p>
              <p className="text-xs text-black">{time}</p>
            </div>
            <div className='flex gap-[44px]'>
              <img
                className="w-[72px] h-[72px]"
                src={profileImage}
                alt="이미지"
              />

              <div className="p-3  rounded-md mt-2 chat-text-you">
                <span className="text-xs text-black">{chatting}</span>
              </div>
            </div>
          </div>
          <div id="" className="flex flex-col justify-end ml-3"></div>
        </div>
      )}
    </>
  );
}

export default ChattingComponent;
