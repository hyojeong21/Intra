import React from 'react';
import '../styles/PredictionBar.css';

// 헬퍼 함수
const createGradientStyle = (rgbColor) => {
    if (!rgbColor) return {};
    const lightColor = rgbColor.replace(')', ', 0.5)').replace('rgb', 'rgba');
    return {
      background: `linear-gradient(to right, ${rgbColor}, ${lightColor})`,
    };
};
  
const createGradientStyleRight = (rgbColor) => {
    if (!rgbColor) return {};
    const lightColor = rgbColor.replace(')', ', 0.5)').replace('rgb', 'rgba');
    return {
      background: `linear-gradient(to left, ${rgbColor}, ${lightColor})`,
    };
};

function PredictionBar({ id, title, leftLogo, rightLogo, teamLeft, teamRight, leftVotes, rightVotes, leftColor, rightColor, onVote }) {
  
  const totalVotes = leftVotes + rightVotes;
  const leftPercentage = totalVotes > 0 ? Math.round((leftVotes / totalVotes) * 100) : 0;
  const rightPercentage = totalVotes > 0 ? 100 - leftPercentage : 0;

  const leftBarStyle = createGradientStyle(leftColor);
  const rightBarStyle = createGradientStyleRight(rightColor);

  const bothSidesVoted = leftVotes > 0 && rightVotes > 0;

  return (
    <div className="Main-warp">
      <div className="Prediction-warp">
        <h4 className="Header">{title}</h4>
        <div className={`prediction-bar ${bothSidesVoted ? 'show-divider' : ''}`}>
          {totalVotes === 0 ? (
            <div className="empty-bar-message">
              아직 투표가 이뤄지지 않았어요,
              투표로 본인의 팀을 응원해보세요!
            </div>
          ) : (
            <>
              {leftVotes > 0 && (
                <div
                  className="bar-left"
                  style={{ ...leftBarStyle, width: `${leftPercentage}%` }}
                >
                  <span className="prediction-rate-text">{leftPercentage}% ({leftVotes})</span>
                </div>
              )}
    
              {rightVotes > 0 && (
                <div
                  className="bar-right"
                  style={{ ...rightBarStyle, width: `${rightPercentage}%` }}
                >
                  <span className='prediction-rate-text'>({rightVotes}) {rightPercentage}%</span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      <div className='button-container'>
        <button 
          className="predict-button"
          style={{ '--team-color': leftColor }}
          onClick={() => onVote(id, 'left')}
        >
          <img
            src={leftLogo}
            alt={`${teamLeft} 로고`}
            className="logo-left"
          />
          {teamLeft}
        </button>
        <button 
          className="predict-button"
          style={{ '--team-color': rightColor }}
          onClick={() => onVote(id, 'right')}
        >
          {teamRight}
          <img
            src={rightLogo}
            alt={`${teamRight} 로고`}
            className="logo-right"
          />
        </button>
      </div>
    </div>
  );
}
  
export default PredictionBar;
