import React, { useState, useRef, useEffect } from 'react';
import './ChatRoom.css';
import ChattingComponent from './ChattingComponent';
import UserImage from '/src/assets/윾건이형.png';
import send from '../../assets/로우몬제출이모티콘.svg';
import { useParams } from 'react-router-dom';

//Chatting 인터페이스 정의
interface Chatting {
  id: number;
  nickname: string;
  profileImage?: string;
  chatting: string;
  time: string;
  isMe: boolean;
}

function Chat() {
  //chattings 상태 변수와 setChattings 함수 정의
  const [chattings, setChattings] = useState<Chatting[]>([
    {
      id: 1,
      nickname: '양준석(팀장)',
      profileImage: UserImage,
      chatting: `안녕하세요 프론트엔드 팀원 여러분,. 안녕하세요 프론트엔드 팀원 여러분,. 안녕하세요 프론트엔드 팀원 여러분,. 안녕하세요 프론트엔드 팀원 여러분,. 안녕하세요 프론트엔드 팀원 여러분,. 안녕하세요 프론트엔드 팀원 여러분,. 안녕하세요 프론트엔드 팀원 여러분,. 안녕하세요 프론트엔드 팀원 여러분,. 안녕하세요 프론트엔드 팀원 여러분,. 안녕하세요 프론트엔드 팀원 여러분,. 안녕하세요 프론트엔드 팀원 여러분,. `,
      time: '17:06',
      isMe: false,
    },
    {
      id: 2,
      nickname: '아무개',
      profileImage: UserImage,
      chatting: `신규 개발 중인 개인정보 수정 탭의 사이드 탭의 UI 개발 을 맡고
                  있는 해당 팀원 분들은 저에게 진척 사항 공유 부탁드립니다~.`,
      time: '17:07',
      isMe: true,
    },
    {
      id: 3,
      nickname: '김민수',
      profileImage: UserImage,
      chatting: `저랑 이현빈 팀원이 개발 중에 있습니다! 진척 상황 노션에
                  정리하여 곧 공유드리겠습니다!`,
      time: '17:08',
      isMe: false,
    },
    {
      id: 4,
      nickname: '아무게',
      profileImage: UserImage,
      chatting: `신규 개발 중인 개인정보 수정 탭의 사이드 탭의 UI 개발 을 맡고
                  있는 해당 팀원 분들은 저에게 진척 사항 공유 부탁드립니다~ `,
      time: '17:09',
      isMe: true,
    },
  ]);
  /* textarea 값 input으로 정의 */
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chattings]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      e.key === 'Enter' &&
      !e.shiftKey &&
      e.nativeEvent.isComposing === false
    ) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  //   const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
  //     if (e.key === 'Enter' && !e.shiftKey) {
  //       e.preventDefault();
  //       handleSendMessage();
  //     }
  //   };

  /* sendMessage 함수*/
  const handleSendMessage = () => {
    if (input.trim()) {
      const currentInput = input;
      setInput('');
      setChattings((prevMessages) => {
        //이전 메세지 배열이 비어 있는지 확인하고, 비어 있지 않으면 마지막 메세지의 id를 가져옴
        const newId =
          prevMessages.length > 0
            ? prevMessages[prevMessages.length - 1].id + 1
            : 1;
        return [
          ...prevMessages,
          {
            id: newId,
            nickname: '아무게',
            profileImage: 'me',
            chatting: currentInput,
            time: new Date().toLocaleTimeString(),
            isMe: true,
          },
        ];
      });
      //   console.log(chattings);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center title mb-[10px]">
        <p className="text-xl font-bold pt-[10px]">LAWMON</p>
      </div>
      <div className="flex Chat-container">
        <div
          className="bg-chatting min-h-screen flex flex-col p-6"
          style={{ width: 'calc(100vw - 24rem)' }}
        >
          <div
            id="chatContanier"
            className="mt-[25px] px-2 overflow-y-auto"
            style={{ height: 'calc(100vh - 182px)' }}
          >
            {chattings.map(
              ({ id, nickname, chatting, time, isMe, profileImage }) => (
                <ChattingComponent
                  key={id}
                  nickname={nickname}
                  chatting={chatting}
                  time={time}
                  isMe={isMe}
                  profileImage={profileImage}
                />
              ),
            )}
            <div className="h-5" ref={chatEndRef} />
          </div>
          <div
            id="chatting-input-part"
            className="w-full h-12 bg-white flex items-center justify-between rounded-lg px-3 mb-[10px] "
          >
            <textarea
              className="w-full h-12 mx-3 focus:outline-none resize-none flex-1 chatting-input"
              style={{ resize: 'none' }}
              placeholder="Ask Anything..."
              onKeyDown={handleKeyDown}
              // onKeyUp={handleKeyUp}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="chatting-button" onClick={handleSendMessage}>
              <img src={send} alt="SendBtn" />
            </button>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}

export default Chat;
