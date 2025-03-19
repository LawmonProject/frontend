import React from 'react';
import './index.css';
import Button from 'shared/ui/Button';

export default function Result() {
  return (
    <div>
        <h1>LAWMON</h1>
      <div className="result_container">
        <section className='result_inner'>
          <div className="consult">상담내용</div>
          {/* 구분선 */}
          <div className="divider"></div>
          <div className="analist">분석 내용</div>
        </section>
      </div>
      <div className="buttons">
        <Button>전문가와 상담하기</Button>
        <Button>과거 판례 찾아보기</Button>
      </div>
    </div>
  );
}
