import React, {useEffect, useState} from 'react';
import './index.css';
import Button from 'shared/ui/Button';
import { useMutation } from '@tanstack/react-query';
import { useContractStore } from 'shared/store/store';
import Loading from './Loading';
import { useNavigate } from 'react-router-dom';

const contents = {
  consult: {
    title: '상담내용',
    content:
      '임시 상담내용 입니다',
  },
  analist: {
    title: '계약서 분석 내용',
    content: 'dd- 계약서 분석 내용임',
  },
};

export default function Result() {
    const navigate = useNavigate();
    const [done, setDone] = useState(false);

  const contractID = useContractStore((state) => state.contractID);


  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/gpt/contracts/${contractID}/summary`,
        { method: 'POST' }
      );
      if (!res.ok) throw new Error('분석 실패');
      return res.json();
    },
    // onSuccess, onError 등 필요시 추가
  });
  useEffect(() => {
    if (contractID) {
      mutation.mutate();
    }
  }, [contractID]);
    
  if (mutation.isPending) {
    return <Loading />;

  }
  // 분석 내용 렌더링 함수
  const renderAnalistContent = () => {
    if (mutation.isPending) return '분석 결과를 불러오는 중입니다...';
    if (mutation.isError) return '분석 결과를 불러오지 못했습니다.';
    if (!mutation.data) return '분석 결과가 없습니다.';

    const { summary, legalRisks } = mutation.data;

    

    return (
      <div>
        <div>
          <strong>계약 유형:</strong> {summary.contractType}
        </div>
        <div>
          <strong>주요 조항:</strong>
          <ul>
            {summary.mainClauses?.map((clause: string, idx: number) => (
              <li key={idx}>{clause}</li>
            ))}
          </ul>
        </div>
        <div>
          <strong>특약 사항:</strong>
          <ul>
            {summary.specialConditions?.map((cond: string, idx: number) => (
              <li key={idx}>{cond}</li>
            ))}
          </ul>
        </div>
        <div>
          <strong>법적 리스크:</strong>
          <ul>
            {legalRisks?.map(
              (
                risk: { issue: string; reason: string; severity: string },
                idx: number,
              ) => (
                <li key={idx}>
                  <b>{risk.issue}</b> ({risk.severity})<br />
                  <span style={{ color: '#666', fontSize: '0.95em' }}>
                    {risk.reason}
                  </span>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h1 className="Law-title">LAWMON</h1>
      <div className="result_container">
        <section className="result_inner">
          <div className="consult">
            <div className="consult_part">
              <span className="consult_title">{contents.consult.title}</span>
              <div className="consult_content">{contents.consult.content}</div>
            </div>
          </div>
          {/* 구분선 */}
          <div className="divider"></div>
          <div className="analist">
            <div className="analist_part">
              <span className="analist_title">{contents.analist.title}</span>
              <div className="analist_content">{renderAnalistContent()}</div>
            </div>
          </div>
        </section>
      </div>
      <div className="flex gap-[100px] mt-[40px] btn">
        <Button className="w-[540px] h-[76px] px-[180px] py-[24px] dirbtn" onClick={() => {navigate('/expert')}}>
          전문가와 상담하기
        </Button>
        <Button className="w-[540px] h-[76px] px-[180px] py-[24px] dirbtn" onClick={() => {navigate('/past')}}>
          과거 판례 찾아보기
        </Button>
      </div>
    </div>
  );
}
