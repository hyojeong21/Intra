import React, { useState, useEffect } from 'react';
import PredictionBar from '../components/PredictionBar';
import initialPredictionData from '../data/PredictionData';
import ColorThief from 'colorthief';

// 무채색 판별 함수
const isAchromatic = (color) => {
  const [r, g, b] = color;
  if (r < 25 && g < 25 && b < 25) return true;
  if (r > 230 && g > 230 && b > 230) return true;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  if (max - min < 20) return true;
  return false;
};

export default function PredictionPage() {
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    const colorThief = new ColorThief();

    const extractColors = async () => {
      const predictionsWithColors = await Promise.all(
        initialPredictionData.map(async (data) => {
          const getDominantColor = (imgSrc) => {
            return new Promise((resolve) => {
              const img = new Image();
              img.crossOrigin = "Anonymous";
              img.src = imgSrc;
              img.onload = () => {
                const palette = colorThief.getPalette(img, 5);
                const firstValidColor = palette.find(color => !isAchromatic(color));
                const finalColor = firstValidColor || palette[0];
                resolve(`rgb(${finalColor[0]}, ${finalColor[1]}, ${finalColor[2]})`);
              };
            });
          };

          const leftColor = await getDominantColor(data.leftLogo);
          const rightColor = await getDominantColor(data.rightLogo);

          return {
            ...data,
            leftVotes: 0,
            rightVotes: 0,
            leftColor,
            rightColor,
          };
        })
      );
      
      const storedPredictions = localStorage.getItem('predictions');
      if (storedPredictions) {
        const storedData = JSON.parse(storedPredictions);
        const finalData = predictionsWithColors.map(p => {
          const stored = storedData.find(s => s.id === p.id);
          return stored ? { ...p, leftVotes: stored.leftVotes, rightVotes: stored.rightVotes } : p;
        });
        setPredictions(finalData);
      } else {
        setPredictions(predictionsWithColors);
      }
    };

    extractColors();
  }, []);

  useEffect(() => {
    if (predictions.length > 0) {
      localStorage.setItem('predictions', JSON.stringify(predictions));
    }
  }, [predictions]);

  const handleVote = (id, side) => {
    setPredictions(prevPredictions =>
      prevPredictions.map(p => {
        if (p.id === id) {
          if (side === 'left') {
            return { ...p, leftVotes: p.leftVotes + 1 };
          }
          if (side === 'right') {
            return { ...p, rightVotes: p.rightVotes + 1 };
          }
        }
        return p;
      })
    );
  };

  return (
    <div>
      {predictions.map(game => (
        <PredictionBar
          key={game.id}
          {...game}
          onVote={handleVote} 
        />
      ))}
    </div>
  );
}
