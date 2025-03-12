import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ChattingComponent from './ChattingComponent';
import search from '../../assets/윾건이형.png';

//Chatting 인터페이스 정의
interface Chatting {
  id: number;
  nickname: string;
  profile: string;
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
      profile: 'People',
      chatting: `안녕하세요 프론트엔드 팀원 여러분,
                  다음 주 수요일에 예정된 정기 회의 관련 공지드립니다.

                  이번 회의에서는 각 부서별로 발표가 있을 예정입니다. 주요
                  내용은 아래와 같습니다:

                  1. 운영팀: 최근 배달 효율성 개선 프로젝트 진행 상황 보고
                  2. 마케팅팀: 신규 프로모션 캠페인 계획 및 기대 효과 발표
                  3. 기술팀: 앱 업데이트 및 새로운 기능 소개
                  4. 고객지원팀: 고객 만족도 조사 결과 및 개선 방안 발표

                  우리 프론트엔드 팀에서는 새로운 사용자 인터페이스 개선 사항과
                  현재 진행 중인 프로젝트의 진척도를 공유할 예정입니다. 각
                  팀원은 본인의 작업 부분에 대해 간단한 업데이트를 준비해
                  주세요.`,
      time: '17:06',
      isMe: false,
    },
    {
      id: 2,
      nickname: '아무개',
      profile: 'People',
      chatting: `신규 개발 중인 개인정보 수정 탭의 사이드 탭의 UI 개발 을 맡고
                  있는 해당 팀원 분들은 저에게 진척 사항 공유 부탁드립니다~ 발표
                  자료에 포함시킬 예정입니다.`,
      time: '17:07',
      isMe: true,
    },
    {
      id: 3,
      nickname: '김민수',
      profile: 'People',
      chatting: `저랑 이지현 팀원이 개발 중에 있습니다! 진척 상황 노션에
                  정리하여 곧 공유드리겠습니다!`,
      time: '17:08',
      isMe: false,
    },
    {
      id: 4,
      nickname: '아무게',
      profile: 'People',
      chatting: `신규 개발 중인 개인정보 수정 탭의 사이드 탭의 UI 개발 을 맡고
                  있는 해당 팀원 분들은 저에게 진척 사항 공유 부탁드립니다~ 발표
                  자료에 포함시킬 예정입니다.`,
      time: '17:09',
      isMe: true,
    },
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chattings])

  return (
    <div className="flex">
      <div
        className="bg-chatting min-h-screen flex flex-col p-6"
        style={{ width: 'calc(100vw - 24rem)' }}
      >
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold text-white"># FRONTEND</p>
          <img className="w-5 h-5" src={search} alt="" />
        </div>
        <div
          id="chatContanier"
          className="mt-6 px-2 overflow-y-auto"
          style={{ height: 'calc(100vh - 172px)' }}
        >
          {chattings.map(({ id, nickname, chatting, time, isMe }) => (
            <ChattingComponent
              key={id}
              nickname={nickname}
              chatting={chatting}
              time={time}
              isMe={isMe}
            />
          ))}
          <div className='h-5' ref={chatEndRef} />
        </div>
        <div className="w-full h-12 bg-white flex items-center justify-between mt-6 rounded-lg px-3">
          <textarea
            className="w-full h-12 mx-3 focus:outline-none resize-none flex-1"
            style={{ resize: 'none' }}
            placeholder="메세지를 입력해주세요."
          />
          <button>입력</button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
