import React, { useState, useRef, useEffect } from 'react';
import './ChatRoom.css';
import ChattingComponent from './ChattingComponent';
import UserImage from '/src/assets/윾건이형.png';
import send from '../../assets/로우몬제출이모티콘.svg';
import { useParams, useLocation } from 'react-router-dom';
import SockJS from 'sockjs-client';
import Stomp, { Client } from 'stompjs';
import { useContractStore } from 'shared/store/store';

// 메시지 인터페이스 정의
interface ChatMessage {
  type: 'ENTER' | 'TALK' | 'LEAVE';
  roomId: string;
  sender: string;
  message: string;
  timestamp: string;
}

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
  const { roomName } = useParams();
  const location = useLocation();
  const { roomId } = location.state || {};
  
  // Zustand store에서 memberId 가져오기
  const memberId = useContractStore((state) => state.memberId);
  
  // WebSocket 관련 상태
  const [ws, setWs] = useState<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [reconnectCount, setReconnectCount] = useState(0);
  
  //chattings 상태 변수와 setChattings 함수 정의
  const [chattings, setChattings] = useState<Chatting[]>([]);
  
  /* textarea 값 input으로 정의 */
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // WebSocket 연결 함수 - 타입 오류 수정
  const connect = () => {
    if (!roomId || !memberId) {
      console.log('Missing roomId or memberId', { roomId, memberId });
      return;
    }
    
    console.log('Attempting to connect to WebSocket...');
    const sock = new SockJS('http://localhost:8080/ws-stomp');
    const stompClient = Stomp.over(sock);
    
    // 타입 오류 해결: any로 캐스팅하거나 정확한 타입 사용
    stompClient.connect(
      {}, // 빈 헤더 객체
      (frame?: any) => { // frame을 optional로 처리
        console.log('Connected: ', frame);
        setIsConnected(true);
        setReconnectCount(0); // 연결 성공 시 재연결 카운트 리셋
        
        // 채팅방 구독
        stompClient.subscribe(`/sub/chat/room/${roomId}`, (message: any) => {
          const recv: ChatMessage = JSON.parse(message.body);
          
          // 받은 메시지를 Chatting 형태로 변환
          const newChatting: Chatting = {
            id: Date.now(),
            nickname: recv.sender,
            profileImage: UserImage,
            chatting: recv.message,
            time: new Date(recv.timestamp).toLocaleTimeString('ko-KR', { 
              hour: '2-digit', 
              minute: '2-digit' 
            }),
            isMe: recv.sender === String(memberId)
          };
          
          // ENTER, LEAVE 메시지는 시스템 메시지로 처리
          if (recv.type === 'ENTER' || recv.type === 'LEAVE') {
            if (recv.message) {
              setChattings(prev => [...prev, {
                ...newChatting,
                nickname: '[알림]',
                isMe: false
              }]);
            }
          } else if (recv.type === 'TALK') {
            setChattings(prev => [...prev, newChatting]);
          }
        });
        
        // 입장 메시지 전송
        stompClient.send("/pub/chat/message", {}, JSON.stringify({
          type: 'ENTER',
          roomId: roomId,
          sender: String(memberId),
          message: `${memberId}님이 입장했습니다.`,
          timestamp: new Date().toISOString()
        }));
        
        setWs(stompClient);
      },
      (error?: any) => { // error도 optional로 처리
        console.error('WebSocket connection error:', error);
        setIsConnected(false);
        
        // 재연결 횟수 제한 (최대 3회)
        if (reconnectCount < 3) {
          setTimeout(() => {
            console.log(`Attempting to reconnect... (${reconnectCount + 1}/3)`);
            setReconnectCount(prev => prev + 1);
            connect();
          }, 5000);
        } else {
          console.log('Max reconnection attempts reached. Please check backend server.');
        }
      }
    );
  };

  // 컴포넌트 마운트 시 WebSocket 연결
  useEffect(() => {
    connect();
    
    // 컴포넌트 언마운트 시 연결 해제
    return () => {
      if (ws && isConnected) {
        // 퇴장 메시지 전송
        try {
          ws.send("/pub/chat/message", {}, JSON.stringify({
            type: 'LEAVE',
            roomId: roomId,
            sender: String(memberId),
            message: `${memberId}님이 퇴장했습니다.`,
            timestamp: new Date().toISOString()
          }));
          
          // disconnect 호출 시 타입 오류 방지
          if (ws && typeof ws.disconnect === 'function') {
            ws.disconnect(() => {
              console.log('Disconnected');
            });
          }
        } catch (error) {
          console.error('Error during disconnect:', error);
        }
      }
    };
  }, [roomId, memberId]);

  // 채팅 자동 스크롤
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

  /* sendMessage 함수*/
  const handleSendMessage = () => {
    if (input.trim() && ws && isConnected) {
      const messageData: ChatMessage = {
        type: 'TALK',
        roomId: roomId,
        sender: String(memberId),
        message: input.trim(),
        timestamp: new Date().toISOString()
      };
      
      // WebSocket으로 메시지 전송
      ws.send("/pub/chat/message", {}, JSON.stringify(messageData));
      
      setInput('');
    }
  };

  return (
    <>
      <div className="flex justify-between items-center title mb-[10px]">
        <h1 className="Law-title text-3xl font-bold text-blue-900 mb-4">
          LAWMON - {roomName}
        </h1>
        <div className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
          {isConnected ? '🟢 연결됨' : '🔴 연결 끊김'}
        </div>
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
              placeholder={isConnected ? "메시지를 입력하세요..." : "연결 중..."}
              onKeyDown={handleKeyDown}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={!isConnected}
            />
            <button 
              className={`chatting-button ${!isConnected ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleSendMessage}
              disabled={!isConnected}
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
