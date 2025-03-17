import React, { useState, useRef, useEffect } from 'react';
import './index.css';
import ChattingComponent from './ChattingComponent';
import UserImage from '../../assets/윾건이형.png';
import send from '../../assets/로우몬제출이모티콘.svg';

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
      nickname: 'LAWMON',
      profileImage: UserImage,
      chatting: `안녕하세요! LAWMON 챗봇입니다. 무엇을 도와드릴까요?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: false,
    },
  ]);
  /* textarea 값 input으로 정의 */
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // GPT API 호출 함수
  const fetchGptResponse = async (message: string) => {
    try {
      setIsLoading(true);
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are LAWMON, a helpful assistant for legal information. Respond briefly and professionally.'
            },
            {
              role: 'user',
              content: message
            }
          ],
          max_tokens: 500
        })
      });

      const data = await response.json();
      
      if (data.choices && data.choices.length > 0) {
        const botResponse = data.choices[0].message.content;
        
        setChattings(prevChattings => [
          ...prevChattings,
          {
            id: prevChattings[prevChattings.length - 1].id + 1,
            nickname: 'LAWMON',
            profileImage: UserImage,
            chatting: botResponse,
            time: getCurrentTime(),
            isMe: false,
          }
        ]);
      }
    } catch (error) {
      console.error('Error fetching GPT response:', error);
      
      setChattings(prevChattings => [
        ...prevChattings,
        {
          id: prevChattings[prevChattings.length - 1].id + 1,
          nickname: 'LAWMON',
          profileImage: UserImage,
          chatting: '죄송합니다, 응답을 가져오는 중에 오류가 발생했습니다. 나중에 다시 시도해 주세요.',
          time: getCurrentTime(),
          isMe: false,
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  /* sendMessage 함수*/
  const handleSendMessage = () => {
    if (input.trim() && !isLoading) {
      const currentInput = input;
      setInput('');
      
      // 사용자 메시지 추가
      setChattings(prevMessages => {
        const newId = prevMessages[prevMessages.length - 1].id + 1;
        return [
          ...prevMessages,
          {
            id: newId,
            nickname: '사용자',
            profileImage: 'me',
            chatting: currentInput,
            time: getCurrentTime(),
            isMe: true,
          },
        ];
      });

      // GPT 응답 요청
      fetchGptResponse(currentInput);
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
            {isLoading && (
              <div className="flex items-center ml-2 mt-4">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-2">
                  <img src={UserImage} alt="LAWMON" className="w-10 h-10 rounded-full" />
                </div>
                <div className="bg-white p-3 rounded-lg shadow max-w-[70%]">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
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
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            <button 
              className={`chatting-button ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`} 
              onClick={handleSendMessage}
              disabled={isLoading}
            >
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