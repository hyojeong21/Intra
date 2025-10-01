import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { teams as initialTeamsData } from "../data/teams";
import { result as resultsData } from "../data/results";
import TeamCard from "../components/TeamCard";
import Header from "../components/Header";
import ColorThief from "colorthief";
import "../styles/TeamList.css";

const isAchromatic = (color) => {
  const [r, g, b] = color;
  if (r < 25 && g < 25 && b < 25) return true;
  if (r > 230 && g > 230 && b > 230) return true;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  if (max - min < 20) return true;
  return false;
};

export default function TeamPage() {
  const { teamName } = useParams();
  const [teamsWithColors, setTeamsWithColors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("농구");
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    const colorThief = new ColorThief();
    const categoryNames = Object.keys(initialTeamsData);
    setCategories(categoryNames);

    setSelectedCategory("농구");

    const extractAllColors = async () => {
      const allTeams = Object.entries(initialTeamsData).flatMap(
        ([category, teams]) => teams.map((team) => ({ ...team, category }))
      );

      const processedTeams = await Promise.all(
        allTeams.map(async (team) => {
          const getDominantColor = (imgSrc) =>
            new Promise((resolve) => {
              const img = new Image();
              img.crossOrigin = "Anonymous";
              img.src = imgSrc;
              img.onload = () => {
                const palette = colorThief.getPalette(img, 5);
                const firstValidColor = palette.find(
                  (color) => !isAchromatic(color)
                );
                resolve(firstValidColor || palette[0]);
              };
              img.onerror = () => resolve([128, 128, 128]);
            });

          const cardColor = await getDominantColor(team.logo);
          return { ...team, cardColor };
        })
      );
      setTeamsWithColors(processedTeams);
    };

    extractAllColors();
  }, []);

  useEffect(() => {
    if (teamsWithColors.length > 0 && selectedCategory) {
      let firstTeamInCategory = teamsWithColors.find(
        (team) => team.category === selectedCategory
      );
      
      if (teamName) {
        const matchedTeam = teamsWithColors.find(
          (team) =>
            team.category === selectedCategory && team.name === teamName
        );
        if (matchedTeam) {
          firstTeamInCategory = matchedTeam;
        }
      }

      setSelectedTeam(firstTeamInCategory);
    }
  }, [teamsWithColors, selectedCategory, teamName]);

  const currentTeams = teamsWithColors.filter(
    (team) => team.category === selectedCategory
  );

  let teamResults = [];
  if (selectedTeam && resultsData[selectedTeam.category]) {
    const foundTeamResults = resultsData[selectedTeam.category].find(
      (team) => team.name === selectedTeam.name
    );
    if (foundTeamResults) teamResults = foundTeamResults.results;
  }

  return (
    <div className="team-list-page">
      {/* 상단바 */}
      <Header />

      <h1
        style={{
          textAlign: "center",
          margin: "100px 0 20px 0",
          fontSize: "36px",
          fontWeight: "bold",
        }}
      >
        팀소개
      </h1>

      {/* 카테고리 선택 버튼 */}
      <div className="category-bar">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 팀 목록 */}
      <div className="team-list">
        {currentTeams.map((team) => (
          <button
            key={team.name}
            onClick={() => setSelectedTeam(team)}
            className={`team-button ${
              selectedTeam?.name === team.name ? "selected" : ""
            }`}
          >
            {team.name}
          </button>
        ))}
      </div>

      {/* 선택된 팀 카드 */}
      <div className="team-display">
        {selectedTeam && <TeamCard team={selectedTeam} results={teamResults} />}
      </div>
    </div>
  );
}
