import React, { useState, useEffect } from "react";

function ChattingComponent({ nickname, chatting, time, isMe }: any) {
  const [chatNick, setChatNick] = useState("");

  useEffect(() => {
    setChatNick(isMe ? "나" : nickname);
  }, [isMe, nickname]);

  return (
    <>
      {isMe ? (
        // Tailwind CSS에서 justify-end는 오른쪽 정렬을 뜻함.
        <div className="flex justify-end my-5">
          <div className="flex flex-col justify-end mr-3">
            <p className="text-xs text-black">{time}</p>
          </div>
          <div className="mr-3">
            <div className="flex justify-end">
              <p className="text-xs text-white">{chatNick}</p>
            </div>
            <div className="p-3 bg-white rounded-md mt-2">
              <span className="text-xs text-black">{chatting}</span>
            </div>
          </div>
        </div>
      ) : (
        // CSS 기본정렬은 왼쪽이므로, justify-end 삭제.
        <div className="flex my-5">
          <div className="ml-3">
            <p className="text-xs text-white">{chatNick}</p>
            <div className="p-3 bg-white rounded-md mt-2">
              <span className="text-xs text-black">{chatting}</span>
            </div>
          </div>
          <div id='' className="flex flex-col justify-end ml-3">
            <p className="text-xs text-black">{time}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default ChattingComponent;