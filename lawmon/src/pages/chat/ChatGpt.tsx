import React, { useState, useRef, useEffect } from 'react';
import ChattingComponent from './ChattingComponent';
import send from '../../assets/로우몬제출이모티콘.svg';
import GPTimg from '../../assets/Gpt_img.svg';
import { useContractStore } from 'shared/store/store';
import { useNavigate } from 'react-router-dom';

// Chatting 인터페이스 정의
interface Chatting {
  id: number;
  nickname: string;
  profileImage?: string;
  chatting: string;
  time: string;
  isMe: boolean;
}

export default function ChatGpt() {
  const [chattings, setChattings] = useState<Chatting[]>([]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();


  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chattings]);

  // 임시 GPT 답변 함수 (API 나오면 이 부분만 교체)
  const getGptAnswer = async (userMessage: string) => {
    return new Promise<string>((resolve) => {
      setTimeout(() => resolve('이것은 GPT의 임시 답변입니다.'), 1000);
    });
  };

  const handleSendMessage = async () => {
    if (input.trim()) {
      const currentInput = input;
      setInput('');
      setChattings((prevMessages) => {
        const newId =
          prevMessages.length > 0
            ? prevMessages[prevMessages.length - 1].id + 1
            : 1;
        return [
          ...prevMessages,
          {
            id: newId,
            nickname: '나',
            profileImage: 'me',
            chatting: currentInput,
            time: new Date().toLocaleTimeString(),
            isMe: true,
          },
        ];
      });

      // GPT 답변 추가
      const gptReply = await getGptAnswer(currentInput);
      setChattings((prevMessages) => {
        const newId =
          prevMessages.length > 0
            ? prevMessages[prevMessages.length - 1].id + 1
            : 1;
        return [
          ...prevMessages,
          {
            id: newId,
            nickname: 'GPT',
            profileImage: GPTimg,
            chatting: gptReply,
            time: new Date().toLocaleTimeString(),
            isMe: false,
          },
        ];
      });
    }
  };

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

  const handleSummary = () => {
    navigate('/result')
  };

  return (
    <>
      <div className="flex justify-between items-center title mb-[10px]">
        <h1 className="Law-title text-3xl font-bold text-blue-900 mb-4">
          LAWMON
        </h1>
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
            <button onClick={handleSummary}> 요약하기 </button>
            <textarea
              className="w-full h-12 mx-3 focus:outline-none resize-none flex-1 chatting-input"
              style={{ resize: 'none' }}
              placeholder="GPT에게 무엇이든 물어보세요..."
              onKeyDown={handleKeyDown}
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
