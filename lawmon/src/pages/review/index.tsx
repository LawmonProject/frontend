import React, { useState } from 'react';
import './index.css';
import emptyStar from '../../assets/빈별.svg';
import filledStar from '../../assets/찬별.svg';
import send from '../../assets/로우몬제출이모티콘.svg';

let sf= 2;
export default function Review() {
  const [rating, setRating] = useState(0);

  const handleStarClick = (starValue: number) => {
    setRating(starValue);
  };

  return (
    <div className="review-container">
      <h1 className="Law-title">LAWMON</h1>
      <div>
        <h2 className="send_message" style={{textAlign: 'center'}}>
          도움이 되셨다면
          <br /> <span > 후기를 남겨주세요!</span>
        </h2>
        <div className="star-container">
          {[1, 2, 3, 4, 5].map((starValue) => (
            <img
              src={starValue <= rating ? filledStar : emptyStar}
              key={starValue}
              className="star"
              alt={`별점 ${starValue}`}
              onClick={() => handleStarClick(starValue)}
            />
          ))}
        </div>
        <div className="reviewinput">
          <div className="textarea-wrapper">
            <textarea
              placeholder="후기를 작성해주세요."
              className="review-textarea"
              id="review-input-part"
            />
            <button className="submit-button">
              <img src={send} alt="제출하기버튼" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
