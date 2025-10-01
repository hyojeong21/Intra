import { useState } from "react";
import { todaysMatches } from "../data/matchData";
import { rankings } from "../data/rankingData";
import { notices } from "../data/notices";
import PredictionPage from "./PredictionPage";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes";
import Header from "../components/Header";
import "../styles/TeamList.css"; // category-bar, category-button 스타일 적용

export default function LandingPage() {
  const [selectedSportForMatches, setSelectedSportForMatches] = useState("농구");
  const [selectedSportForRanking, setSelectedSportForRanking] = useState("농구");
  const sports = ["농구", "풋살", "야구", "테니스", "피구"];
  const navigate = useNavigate();

  const titleStyle = {
    textAlign: "center",
    margin: "100px 0 20px 0",
    fontSize: "36px",
    fontWeight: "bold",
  };

  const sectionBorder = {
    borderTop: "1.5px solid #636363",
    width: "10%",
    margin: "20px auto 0",
  };

  const boxStyle = {
    backgroundColor: "#f0f0f0",
    padding: "50px",
    borderRadius: "15px",
    maxWidth: "1000px",
    margin: "30px auto 0"
  };

  return (
    <div className="home-page">
      <Header />

      {/* --- 오늘의 경기 섹션 --- */}
      <section>
        <h1 style={titleStyle}>오늘의 경기</h1>
      </section>

      <div className={sectionBorder}></div>

      {/* 스포츠 선택 버튼 */}
      <div className="category-bar" style={{ marginTop: "20px" }}>
        {sports.map((sport) => (
          <button
            key={sport}
            className={`category-button ${
              selectedSportForMatches === sport ? "active" : ""
            }`}
            onClick={() => setSelectedSportForMatches(sport)}
          >
            {sport}
          </button>
        ))}
      </div>

      {/* 오늘의 경기 카드 */}
      {selectedSportForMatches && (
        <div style={boxStyle}>
          {/* Team A */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ textAlign: "center", width: "30%" }}>
              <img
                src={todaysMatches[selectedSportForMatches].teamA.logo}
                alt={`${todaysMatches[selectedSportForMatches].teamA.name} 로고`}
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: "10px",
                }}
              />
              <div style={{ marginBottom: "15px", fontSize: "18px" }}>
                {todaysMatches[selectedSportForMatches].teamA.record.map((r, i) => (
                  <span
                    key={i}
                    style={{
                      color:
                        r === "승" ? "blue" : r === "패" ? "red" : r === "무" ? "gray" : "black",
                      marginRight: "8px",
                    }}
                  >
                    {r}
                  </span>
                ))}
              </div>
              <button
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#333',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#555')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#333')}
                onClick={() =>
                  navigate(
                    ROUTES.TEAM_DETAIL(todaysMatches[selectedSportForMatches].teamA.name)
                  )
                }
              >
                팀 정보
              </button>
            </div>

            {/* 중앙 경기 정보 */}
            <div style={{ textAlign: "center", width: "30%" }}>
              <div style={{ fontSize: "18px", marginBottom: "8px" }}>
                {todaysMatches[selectedSportForMatches].status}
              </div>
              <div style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "8px" }}>
                {todaysMatches[selectedSportForMatches].teamA.name} VS{" "}
                {todaysMatches[selectedSportForMatches].teamB.name}
              </div>
              <div style={{ fontSize: "18px", marginBottom: "8px" }}>
                {todaysMatches[selectedSportForMatches].time}
              </div>
              <div style={{ fontSize: "18px" }}>
                위치: {todaysMatches[selectedSportForMatches].location}
              </div>
            </div>

            {/* Team B */}
            <div style={{ textAlign: "center", width: "30%" }}>
              <img
                src={todaysMatches[selectedSportForMatches].teamB.logo}
                alt={`${todaysMatches[selectedSportForMatches].teamB.name} 로고`}
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: "10px",
                }}
              />
              <div style={{ marginBottom: "15px", fontSize: "18px" }}>
                {todaysMatches[selectedSportForMatches].teamB.record.map((r, i) => (
                  <span
                    key={i}
                    style={{
                      color:
                        r === "승" ? "blue" : r === "패" ? "red" : r === "무" ? "gray" : "black",
                      marginRight: "8px",
                    }}
                  >
                    {r}
                  </span>
                ))}
              </div>
              <button
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#333',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#555')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#333')}
                onClick={() =>
                  navigate(
                    ROUTES.TEAM_DETAIL(todaysMatches[selectedSportForMatches].teamA.name)
                  )
                }
              >
                팀 정보
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- 순위 섹션 --- */}
      <section>
        <h1 style={titleStyle}>순위</h1>
      </section>
      <div className={sectionBorder}></div>

      {/* 순위 스포츠 선택 버튼 */}
      <div className="category-bar" style={{ marginTop: "20px" }}>
        {sports.map((sport) => (
          <button
            key={sport}
            className={`category-button ${
              selectedSportForRanking === sport ? "active" : ""
            }`}
            onClick={() => setSelectedSportForRanking(sport)}
          >
            {sport}
          </button>
        ))}
      </div>

      {/* 순위 카드 */}
      {selectedSportForRanking && (
        <div style={boxStyle}>
          {Object.entries(rankings[selectedSportForRanking]).map(([group, teams]) => (
            <div key={group} style={{ width: "100%", maxWidth: "800px", margin: "0 auto 50px auto" }}>
              <h2 style={{ textAlign: "center", marginBottom: "25px" }}>{group}</h2>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                  backgroundColor: "#ddd",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  marginBottom: "10px",
                }}
              >
                <span>순위</span>
                <span>팀명</span>
                <span>경기수</span>
                <span>승</span>
                <span>무</span>
                <span>패</span>
                <span>승점</span>
              </div>
              <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px" }}>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {teams.map((team) => (
                    <li
                      key={team.rank}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "10px 0",
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      <span>{team.rank}</span>
                      <span>{team.team}</span>
                      <span>{team.games}</span>
                      <span>{team.win}</span>
                      <span>{team.draw}</span>
                      <span>{team.lose}</span>
                      <span>{team.points}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- 승부 예측 섹션 --- */}
      <section>
        <h1 style={titleStyle}>승부 예측</h1>
      </section>
      <div className={sectionBorder}></div>

      <div style={{ borderTop: "1px solid #e5e7eb", width: "100%", margin: "20px 0" }}></div>

    
      <PredictionPage />

      {/* --- 공지사항 섹션 --- */}
      <section>
        <h1 style={titleStyle}>공지사항</h1>
      </section>
      <div className={sectionBorder}></div>

    <div style={{ marginBottom: "60px" }}>
      <div style={boxStyle}>
        <div
          style={{
            backgroundColor: "#fff",
            padding: "40px",
            borderRadius: "10px",
            maxWidth: "90%",
            margin: "0 auto",
            minHeight: "300px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <ul style={{ listStyle: "none", padding: 0, width: "100%", fontSize: "18px" }}>
            {notices.map((notice, idx) => (
              <li
                key={idx}
                style={{
                  padding: "15px 0",
                  borderBottom: idx === notices.length - 1 ? "none" : "1px solid #eee",
                }}
              >
                {notice}
              </li>
            ))}
          </ul>

          <div style={{ textAlign: "right", marginTop: "20px" }}></div>
          <button
            style={{
              padding: "8px 16px",
              fontSize: "14px",
              backgroundColor: "#555",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => navigate(ROUTES.NOTICES)}
          >
            더보기
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}