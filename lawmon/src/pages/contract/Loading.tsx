import React from 'react';
import './Loading.css';

export default function Loading() {
  return (
    <div>
        <h1 className="Law-title">LAWMON</h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <div className="loading-dots">
          <div className="dot purple"></div>
          <div className="dot purple"></div>
          <div className="dot purple"></div>
        </div>
        <h1>계약서 분석 중 입니다</h1>
      </div>
    </div>
  );
}
