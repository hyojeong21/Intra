// src/data/PredictionData.js

// public/images 폴더 안의 이미지 경로를 문자열로 지정
const TeamA = '/images/ds.svg';
const TeamB = '/images/hw.svg';
const TeamC = '/images/sa.svg';
const TeamD = '/images/ki.svg';
const TeamE = '/images/lo.svg';
const TeamF = '/images/ka.svg';

// 경기 데이터 배열
const predictionData = [
  {
    id: 1,
    title: "경기 1 실시간 예측",
    leftRate: 40,
    rightRate: 60,
    leftLogo: TeamA,
    rightLogo: TeamB,
    teamLeft: "두산베어스",
    teamRight: "한화이글스"
  },
  {
    id: 2,
    title: "경기 2 실시간 예측",
    leftRate: 90,
    rightRate: 10,
    leftLogo: TeamC,
    rightLogo: TeamD,
    teamLeft: "삼성라이온즈",
    teamRight: "키움히어로즈"
  },
  {
    id: 3,
    title: "경기 3 실시간 예측",
    leftRate: 45,
    rightRate: 55,
    leftLogo: TeamE,
    rightLogo: TeamF,
    teamLeft: "롯데자이언츠",
    teamRight: "기아타이거즈"
  }
];

// 다른 파일에서 import 가능하도록 export
export default predictionData;
