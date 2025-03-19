import React from 'react';
import './index.css';
import Button from 'shared/ui/Button';



const contents = {
    consult : {
        title: '상담내용',
        content: 'dd- 상담 내용임@@@@@@@@@@dd- 상담 내용임@@@@@@@@@@dd- 상담 내용임@@@@@@@@@@dd- 상담 내용임@@@@@@@@@@dd- 상담 내용임@@@@@@@@@@dd- 상담 내용임@@@@@@@@@@dd- 상담 내용임@@@@@@@@@@dd- 상담 내용임@@@@@@@@@@dd- 상담 내용임@@@@@@@@@@dd- 상담 내용임@@@@@@@@@@dd- 상담 내용임@@@@@@@@@@dd- 상담 내용임@@@@@@@@@@dd- 상담 내용임@@@@@@@@@@dd- 상담 내용임@@@@@@@@@@dd- 상담 내용임@@@@@@@@@@dd- 상담 내용임@@@@@@@@@@dd- 상담 내용임@@@@@@@@@@dd- 상담 내용임@@@@@@@@@@dd- 상담 내용임@@@@@@@@@@dd- 상담 내용임@@@@@@@@@@dd- 상담 내용임@@@@@@@@@@dd- 상담 내용임@@@@@@@@@@dd- 상담 내용임@@@@@@@@@@dd- 상담 내용임@@@@@@@@@@dd- 상담 내용임@@@@@@@@@@dd- 상담 내용임@@@@@@@@@@.'
    },
    analist : {
        title: '계약서 분석 내용',
        content: 'dd- 계약서 분석 내용임dd- 계약서 분석 내용임dd- 계약서 분석 내용임dd- 계약서 분석 내용임dd- 계약서 분석 내용임dd- 계약서 분석 내용임dd- 계약서 분석 내용임dd- 계약서 분석 내용임dd- 계약서 분석 내용임dd- 계약서 분석 내용임dd- 계약서 분석 내용임dd- 계약서 분석 내용임dd- 계약서 분석 내용임dd- 계약서 분석 내용임dd- 계약서 분석 내용임dd- 계약서 분석 내용임dd- 계약서 분석 내용임dd- 계약서 분석 내용임dd- 계약서 분석 내용임dd- 계약서 분석 내용임dd- 계약서 분석 내용임dd- 계약서 분석 내용임dd- 계약서 분석 내용임dd- 계약서 분석 내용임dd- 계약서 분석 내용임dd- 계약서 분석 내용임dd- 계약서 분석 내용임dd- 계약서 분석 내용임dd- 계약서 분석 내용임dd- 계약서 분석 내용임dd- 계약서 분석 내용임.'
    }
}

export default function Result() {
  return (
    <div>
      <h1 className='Law-title'>LAWMON</h1>
      <div className="result_container">
        <section className="result_inner">
          <div className="consult">
            <div className='consult_part'>
              <span className="consult_title">{contents.consult.title}</span>
              <div className="consult_content">{contents.consult.content}</div>
            </div>
          </div>
          {/* 구분선 */}
          <div className="divider"></div>
          <div className="analist">
            <div className="analist_part">
              <span className="analist_title">{contents.analist.title}</span>
              <div className="analist_content">{contents.analist.content}</div>
            </div>
          </div>
        </section>
      </div>
      <div className="flex gap-[100px] mt-[40px] btn">
        <Button className='w-[540px] h-[76px] px-[180px] py-[24px] dirbtn'>전문가와 상담하기</Button>
        <Button className='w-[540px] h-[76px] px-[180px] py-[24px] dirbtn'>과거 판례 찾아보기</Button>
      </div>
    </div>
  );
}
