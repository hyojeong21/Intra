import React from "react";
import "../styles/TeamCard.css";

const getMatchResult = (score) => {
  if (!score || !score.includes("-")) return null;
  const [myScore, opponentScore] = score.split("-").map(Number);
  if (isNaN(myScore) || isNaN(opponentScore)) return null;
  return myScore > opponentScore ? "승" : myScore < opponentScore ? "패" : "무";
};

const getMatchResult2 = (score) => {
  if (!score || !score.includes("vs")) return "무";
  const [score1Str, score2Str] = score.split("vs").map((s) => s.trim());
  const score1 = parseInt(score1Str, 10);
  const score2 = parseInt(score2Str, 10);
  if (isNaN(score1) || isNaN(score2)) return "무";
  return score1 > score2 ? "승" : score1 < score2 ? "패" : "무";
};

const lightenColor = (rgb, percent) => {
  if (!rgb || rgb.length !== 3) return 'rgb(249, 250, 251)';
  let [r, g, b] = rgb;
  r = Math.min(255, r + (255 - r) * (percent / 100));
  g = Math.min(255, g + (255 - g) * (percent / 100));
  b = Math.min(255, b + (255 - b) * (percent / 100));
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
};

export default function TeamCard({ team, results }) {
  if (!team) return null;

  const matchResult = getMatchResult(team.score);
  const lightBgColor = lightenColor(team.cardColor, 85);
  const transparentDominantColor = team.cardColor
    ? `rgba(${team.cardColor[0]}, ${team.cardColor[1]}, ${team.cardColor[2]}, 0.6)`
    : 'rgba(128,128,128,0.7)';

  return (
    <div className="team-card" style={{ backgroundColor: lightBgColor }}>
      <div className="team-header" style={{ backgroundColor: transparentDominantColor }}>
        <div className="logo-container">
          <img src={team.logo} alt={`${team.name} 로고`} className="team-logo" />
          <div className="recent-records">
            최근 5경기 :{" "}
            {team.recent.map((r, i) => (
              <span key={i} className={`record ${r === "승" ? "win" : r === "패" ? "lose" : "draw"}`}>{r}</span>
            ))}
          </div>
        </div>
        <div className="team-info">
          <h2>{team.name}</h2>
          <p>{team.info}</p>
          <p className="rank"><strong>{team.rank}</strong></p>
        </div>
      </div>

      <div className="match-info">
        {team.score && (
          <div className="match-info-line">
            <span className="match-description">vs {team.lastOpponent}</span>
            <div className={`match-result ${matchResult === "승" ? "win" : matchResult === "패" ? "lose" : "draw"}`}>
              {matchResult} ({team.score})
            </div>
          </div>
        )}
        {team.nextGame && (
          <div className="match-info-line">
            <span className="match-description">vs {team.nextOpponent}</span>
            <span className="match-detail">{team.nextGame}</span>
          </div>
        )}
      </div>

      <div className="team-members">
        <h3 className="section-title">팀 명단</h3>
        <div className="member header">
          <div>이름</div>
          <div>번호</div>
          <div>학번</div>
          <div>학년</div>
        </div>
        {team.members.map((member, i) => (
          <div className="member" key={i}>
            <div>{member.name}</div>
            <div>{member.number}</div>
            <div>{member.id || "N/A"}</div>
            <div>{member.grade}</div>
          </div>
        ))}
      </div>

      <div className="team-results">
        <h3 className="section-title">경기 결과</h3>
        <div className="result-header">
          <div>날짜</div>
          <div>시간</div>
          <div>상대</div>
          <div>점수</div>
          <div>결과</div>
        </div>
        {results?.sort((a,b) => new Date(b.date) - new Date(a.date)).map((game, i) => {
          const result = getMatchResult2(game.score);
          return (
            <div className="result-row" key={i}>
              <div>{game.date}</div>
              <div>{game.time}</div>
              <div>vs {game.opponent}</div>
              <div>{game.score.replace("vs","-")}</div>
              <div className={`result-badge ${result==="승"?"win":result==="패"?"lose":"draw"}`}>{result}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
